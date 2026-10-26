"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { LabStatus, useSolved } from "@/components/labs/lab-kit";

type Ticket = "fiber" | "dsl" | "sat" | "san";

const CHOICES: {
  id: string;
  label: string;
  fits: Ticket | null;
  note: string;
}[] = [
  {
    id: "fiber-ont",
    label: "Fiber handoff / ONT — low latency, high throughput",
    fits: "fiber",
    note: "Fiber to the premise (ONT) is the preferred plant when interactive voice/video and big uploads matter.",
  },
  {
    id: "dsl-copper",
    label: "DSL over telephone copper — distance from the CO matters",
    fits: "dsl",
    note: "DSL shares the phone pair. Far from the CO, sync rates collapse. Not cable DOCSIS.",
  },
  {
    id: "satellite-link",
    label: "Satellite ISP — coverage everywhere, high latency",
    fits: "sat",
    note: "Great for remote sites with no terrestrial plant. Bad for VoIP/gaming because of RTT.",
  },
  {
    id: "san-block",
    label: "SAN — dedicated block-storage network, not a file share",
    fits: "san",
    note: "SAN presents LUNs/block to servers. NAS is files over SMB/NFS. Do not swap the acronyms.",
  },
  {
    id: "wlan-as-wan",
    label: "Call the ISP uplink a WLAN because it is wireless",
    fits: null,
    note: "WLAN is 802.11 LAN. A cellular or WISP uplink is still a WAN handoff, not a WLAN.",
  },
  {
    id: "wisp-as-wifi",
    label: "Treat WISP fixed wireless as the same as office Wi-Fi",
    fits: null,
    note: "WISP is a fixed-wireless ISP last mile. Office WLAN is local 802.11. Different roles.",
  },
];

const TICKETS: { id: Ticket; title: string; hint: string }[] = [
  {
    id: "fiber",
    title: "Clinic wants low-latency telehealth and big imaging uploads",
    hint: "Plant choice for interactive apps and fat uplink — not 'whatever is cheapest'.",
  },
  {
    id: "dsl",
    title: "Rural shop still on phone copper; speed worse farther from town",
    hint: "Copper last mile where distance from the exchange kills sync.",
  },
  {
    id: "sat",
    title: "Ranch with no cable/fiber; only sky coverage works",
    hint: "Coverage wins; accept the latency hit for VoIP.",
  },
  {
    id: "san",
    title: "Hypervisor cluster needs shared block LUNs, not SMB folders",
    hint: "Storage fabric role — not a department file server.",
  },
];

const WANT: Record<Ticket, string> = {
  fiber: "fiber-ont",
  dsl: "dsl-copper",
  sat: "satellite-link",
  san: "san-block",
};

export function NetworkTypesLab({ lab, onSolved }: LabSimProps) {
  void lab;
  const { solved, markSolved } = useSolved(onSolved);
  const [placed, setPlaced] = useState<Record<Ticket, string>>({
    fiber: "",
    dsl: "",
    sat: "",
    san: "",
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
      "Fiber/ONT for low-latency clinics, DSL when copper distance rules, satellite when only the sky works, SAN for block LUNs. WLAN-as-WAN and WISP-as-office-Wi-Fi stay unused.",
    );
    markSolved();
  }

  return (
    <div className="space-y-3 text-sm">
      <LabStatus
        solved={solved}
        mission="Match each connection/network-type ticket. Leave WLAN-as-WAN and WISP-as-Wi-Fi unused."
      />
      <p className="text-muted-foreground">
        CompTIA 2.7 is plant vs network-type vocabulary: fiber, cable, DSL,
        satellite, cellular, WISP, plus LAN/WAN/PAN/MAN/SAN/WLAN — not marketing
        speed claims.
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
                <option value="">Select connection / type</option>
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
        Check network type matches
      </Button>
      {msg ? <p className="text-sm leading-6">{msg}</p> : null}
    </div>
  );
}
