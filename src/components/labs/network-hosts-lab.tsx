"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { LabStatus, useSolved } from "@/components/labs/lab-kit";

type Ticket = "aaa" | "utm" | "ntp" | "scada";

const CHOICES: {
  id: string;
  label: string;
  fits: Ticket | null;
  note: string;
}[] = [
  {
    id: "radius-aaa",
    label: "RADIUS/TACACS+ AAA — AP/VPN are clients of this box",
    fits: "aaa",
    note: "AAA answers who may connect. The AP or concentrator is a client of AAA, not AAA itself.",
  },
  {
    id: "utm-appliance",
    label: "UTM appliance — firewall + IPS + filter in one rack unit",
    fits: "utm",
    note: "Small offices buy one UTM instead of five boxes. Blast radius is the whole edge if it dies.",
  },
  {
    id: "ntp-time",
    label: "NTP time source — fix clocks after the outage",
    fits: "ntp",
    note: "Kerberos, certs, and logs rot when time is wrong. Random password failures after power loss can be NTP.",
  },
  {
    id: "scada-isolate",
    label: "Isolate SCADA/ICS on its own segment — not guest Wi-Fi",
    fits: "scada",
    note: "Plant/HMI hosts are not laptop VLANs. Putting SCADA on guest Wi-Fi is an incident.",
  },
  {
    id: "dns-as-aaa",
    label: "Point the AP at DNS and call that authentication",
    fits: null,
    note: "DNS answers names. It does not authorize Wi-Fi or VPN sessions.",
  },
  {
    id: "iot-on-scada",
    label: "Park lobby IoT cameras on the SCADA VLAN for 'easy routing'",
    fits: null,
    note: "IoT gets its own segment. Mixing cameras with plant controls widens blast radius.",
  },
];

const TICKETS: { id: Ticket; title: string; hint: string }[] = [
  {
    id: "aaa",
    title: "Corp Wi-Fi rejects users; AP config looks fine",
    hint: "Credentials fail at the edge. Which role says yes/no to the AP?",
  },
  {
    id: "utm",
    title: "SOHO wants one box for firewall, IPS, and web filter",
    hint: "Budget for one appliance, not a stack. Name the combined role.",
  },
  {
    id: "ntp",
    title: "After a blackout, domain logons flake until clocks catch up",
    hint: "Passwords 'wrong' across many apps. Time skew is the clue.",
  },
  {
    id: "scada",
    title: "Warehouse HMI was put on guest SSID for convenience",
    hint: "Industrial control host placement — not a printer share problem.",
  },
];

const WANT: Record<Ticket, string> = {
  aaa: "radius-aaa",
  utm: "utm-appliance",
  ntp: "ntp-time",
  scada: "scada-isolate",
};

export function NetworkHostsLab({ lab, onSolved }: LabSimProps) {
  void lab;
  const { solved, markSolved } = useSolved(onSolved);
  const [placed, setPlaced] = useState<Record<Ticket, string>>({
    aaa: "",
    utm: "",
    ntp: "",
    scada: "",
  });
  const [msg, setMsg] = useState("");

  const remaining = useMemo(() => {
    const used = new Set(Object.values(placed).filter(Boolean));
    return CHOICES.filter((c) => !used.has(c.id));
  }, [placed]);

  function assign(ticket: Ticket, choiceId: string) {
    setPlaced((prev) => {
      const next = { ...prev };
      (Object.keys(next) as Ticket[]).forEach((t) => {
        if (next[t] === choiceId) next[t] = "";
      });
      next[ticket] = choiceId;
      return next;
    });
    setMsg("");
  }

  function check() {
    const misses: string[] = [];
    for (const ticket of TICKETS) {
      const choiceId = placed[ticket.id];
      if (!choiceId) {
        misses.push(`${ticket.title}: empty`);
        continue;
      }
      if (WANT[ticket.id] !== choiceId) {
        const choice = CHOICES.find((c) => c.id === choiceId);
        misses.push(
          `${ticket.title}: ${choice?.label ?? choiceId} is wrong — ${choice?.note ?? ""}`,
        );
      }
    }
    if (misses.length) {
      setMsg(misses.join(" "));
      return;
    }
    setMsg(
      "AAA (RADIUS) for edge auth, UTM for combined SOHO security, NTP for post-outage clocks, SCADA isolated — not on guest Wi-Fi. DNS-as-auth and IoT-on-SCADA stay unused.",
    );
    markSolved();
  }

  return (
    <div className="space-y-3 text-sm">
      <LabStatus
        solved={solved}
        mission="Match each host/appliance ticket to the right role. Leave DNS-as-auth and IoT-on-SCADA unused."
      />
      <p className="text-muted-foreground">
        CompTIA 2.3 wants you to place DNS, DHCP, AAA, UTM, NTP, SCADA, and IoT
        as roles — and know which box should never share a guest SSID.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {TICKETS.map((ticket) => {
          const choice = CHOICES.find((c) => c.id === placed[ticket.id]);
          return (
            <fieldset key={ticket.id} className="rounded border p-2">
              <legend className="font-medium">{ticket.title}</legend>
              <p className="mt-1 text-xs text-muted-foreground">{ticket.hint}</p>
              <select
                className="mt-2 min-h-11 w-full rounded-md border bg-background px-2"
                value={placed[ticket.id]}
                onChange={(e) => assign(ticket.id, e.target.value)}
                aria-label={`Choice for ${ticket.title}`}
              >
                <option value="">Select role</option>
                {choice ? (
                  <option value={choice.id}>{choice.label}</option>
                ) : null}
                {remaining.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
              {choice ? (
                <p className="mt-2 text-xs text-muted-foreground">{choice.note}</p>
              ) : null}
            </fieldset>
          );
        })}
      </div>
      <div className="rounded border bg-muted/40 p-2">
        <p className="font-medium">Still on the bench</p>
        <ul className="mt-1 list-disc pl-5 text-xs text-muted-foreground">
          {remaining.length === 0 ? (
            <li>All choices assigned — verify before you check.</li>
          ) : (
            remaining.map((c) => (
              <li key={c.id}>
                {c.label} — {c.note}
              </li>
            ))
          )}
        </ul>
      </div>
      <Button size="sm" className="min-h-11" onClick={check} disabled={solved}>
        Check host and appliance matches
      </Button>
      {msg ? <p className="text-sm leading-6">{msg}</p> : null}
    </div>
  );
}
