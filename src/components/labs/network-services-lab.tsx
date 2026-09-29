"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { LabStatus, useSolved } from "@/components/labs/lab-kit";

type Ticket = "dns" | "dhcp" | "vlan" | "vpn";

const CHOICES: {
  id: string;
  label: string;
  fits: Ticket | null;
  note: string;
}[] = [
  {
    id: "dns-a",
    label: "Create/fix DNS A (or AAAA) so the name resolves to the host IP",
    fits: "dns",
    note: "Users type names; A/AAAA map name → address. Wrong A looks like 'the server is down.'",
  },
  {
    id: "dhcp-res",
    label: "DHCP reservation by MAC (scope already healthy)",
    fits: "dhcp",
    note: "Printers/keepers often get the same IP via reservation — not a static typed only on the device with a colliding pool.",
  },
  {
    id: "vlan-seg",
    label: "Place guest SSIDs / ports on a separate VLAN (router joins on purpose)",
    fits: "vlan",
    note: "VLANs split broadcast domains. Guests should not share the corp L2 segment.",
  },
  {
    id: "vpn-tun",
    label: "Client VPN tunnel into the corp network for the remote worker",
    fits: "vpn",
    note: "VPN encrypts remote access over the internet. It is not a VLAN tag and not a WAN port-forward.",
  },
  {
    id: "port-fwd",
    label: "Port-forward RDP on the home router and call it a corporate VPN",
    fits: null,
    note: "Port-forward exposes a service; it is not an enterprise VPN with auth and encryption policy.",
  },
  {
    id: "mask-as-vlan",
    label: "Change only the subnet mask on one PC to 'create a VLAN'",
    fits: null,
    note: "VLANs are switch/router segmentation. A lonely mask tweak is not a VLAN.",
  },
];

const TICKETS: { id: Ticket; title: string; hint: string }[] = [
  {
    id: "dns",
    title: "intranet.corp pings by IP, fails by name",
    hint: "Firewall and routes look fine. nslookup returns NXDOMAIN or an old address. Fix the name service first.",
  },
  {
    id: "dhcp",
    title: "Label printer IP keeps changing after lease expiry",
    hint: "Scope has free addresses. Warehouse scanners bookmark the old IP. Keep the same address without typing a static that collides with the pool.",
  },
  {
    id: "vlan",
    title: "Guest Wi-Fi can browse corp file shares",
    hint: "Same closet switch fabric. Guests must not share the corporate broadcast domain. Segmentation is the ticket.",
  },
  {
    id: "vpn",
    title: "Analyst on hotel Wi-Fi needs safe access to file servers",
    hint: "They are off-LAN. Need authenticated encrypted remote access — not opening RDP to the world.",
  },
];

const WANT: Record<Ticket, string> = {
  dns: "dns-a",
  dhcp: "dhcp-res",
  vlan: "vlan-seg",
  vpn: "vpn-tun",
};

export function NetworkServicesLab({ lab, onSolved }: LabSimProps) {
  void lab;
  const { solved, markSolved } = useSolved(onSolved);
  const [placed, setPlaced] = useState<Record<Ticket, string>>({
    dns: "",
    dhcp: "",
    vlan: "",
    vpn: "",
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
      "DNS A/AAAA for name resolution, DHCP reservation for the sticky printer, VLAN for guest isolation, VPN for the hotel worker. Port-forward-as-VPN and mask-as-VLAN stay unused.",
    );
    markSolved();
  }

  return (
    <div className="space-y-3 text-sm">
      <LabStatus
        solved={solved}
        mission="Match DNS, DHCP, VLAN, and VPN tickets. Leave port-forward-as-VPN and mask-as-VLAN unused."
      />
      <p className="text-muted-foreground">
        Objective 2.4 is concepts under pressure: name → address, lease/reservation,
        L2 segmentation, and encrypted remote access — not one tool for every symptom.
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
                <option value="">Select service / action</option>
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
        <p className="font-medium">Still in the queue</p>
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
        Check network service matches
      </Button>
      {msg ? <p className="text-sm leading-6">{msg}</p> : null}
    </div>
  );
}
