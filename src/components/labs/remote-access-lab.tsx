"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { LabStatus, useSolved } from "@/components/labs/lab-kit";

type Ticket = "rdp" | "vnc" | "rmm" | "winrm";

const CHOICES: {
  id: string;
  label: string;
  fits: Ticket | null;
  note: string;
}[] = [
  {
    id: "rdp-gui",
    label: "RDP — Windows Remote Desktop (TCP 3389)",
    fits: "rdp",
    note: "Native Windows GUI remoting. Lock down NLA and network exposure.",
  },
  {
    id: "vnc-fb",
    label: "VNC — cross-platform remote framebuffer",
    fits: "vnc",
    note: "Encrypt or tunnel it; plain VNC is eavesdroppable.",
  },
  {
    id: "rmm-agent",
    label: "RMM platform — agent inventory, patch, remote control",
    fits: "rmm",
    note: "MSP scale: one pane for many machines, not one-off RDP.",
  },
  {
    id: "winrm-ps",
    label: "WinRM — PowerShell remoting / Windows Remote Management",
    fits: "winrm",
    note: "Automation channel. Pair with HTTPS listeners and constrained endpoints.",
  },
  {
    id: "spice-as-rdp",
    label: "Use SPICE on every corporate Windows laptop instead of RDP",
    fits: null,
    note: "SPICE is a virtualization display protocol, not the default Windows help-desk path.",
  },
  {
    id: "open-rdp-wan",
    label: "Forward RDP 3389 straight to the internet without VPN/NLA",
    fits: null,
    note: "Exposed RDP is ransomware candy. VPN, gateway, or zero-trust brokering.",
  },
];

const TICKETS: { id: Ticket; title: string; hint: string }[] = [
  {
    id: "rdp",
    title: "Help desk needs a full Windows desktop GUI on TCP 3389",
    hint: "Microsoft remote desktop.",
  },
  {
    id: "vnc",
    title: "Mixed Linux/Windows lab needs a simple cross-platform framebuffer",
    hint: "VNC family.",
  },
  {
    id: "rmm",
    title: "MSP manages hundreds of endpoints with agents and scripting",
    hint: "Remote Monitoring and Management.",
  },
  {
    id: "winrm",
    title: "Automate Windows config with PowerShell remoting",
    hint: "WinRM under the hood.",
  },
];

const WANT: Record<Ticket, string> = {
  rdp: "rdp-gui",
  vnc: "vnc-fb",
  rmm: "rmm-agent",
  winrm: "winrm-ps",
};

export function RemoteAccessLab({ lab, onSolved }: LabSimProps) {
  void lab;
  const { solved, markSolved } = useSolved(onSolved);
  const [placed, setPlaced] = useState<Record<Ticket, string>>({
    rdp: "",
    vnc: "",
    rmm: "",
    winrm: "",
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
    setMsg("RDP for Windows GUI, VNC for cross-platform framebuffer, RMM for MSP fleets, WinRM for PowerShell remoting. SPICE-as-default-RDP and naked 3389 stay unused.");
    markSolved();
  }

  return (
    <div className="space-y-3 text-sm">
      <LabStatus solved={solved} mission="Match each remote access ticket. Leave SPICE-as-RDP and open-3389 unused." />
      <p className="text-muted-foreground">CompTIA 4.9 chooses RDP, VPN, VNC, SSH, RMM, SPICE, or WinRM with the security tradeoff named.</p>
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
                <option value="">Select match</option>
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
        Check remote access matches
      </Button>
      {msg ? <p className="text-sm leading-6">{msg}</p> : null}
    </div>
  );
}
