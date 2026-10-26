"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { LabStatus, useSolved } from "@/components/labs/lab-kit";

type Ticket = "harden" | "autorun" | "lockout" | "biospw";

const CHOICES: {
  id: string;
  label: string;
  fits: Ticket | null;
  note: string;
}[] = [
  {
    id: "bitlocker-patch",
    label: "Disk encryption + patch baseline + disable unused services",
    fits: "harden",
    note: "Baseline hardening before the user is phished: encrypt, patch, shrink attack surface.",
  },
  {
    id: "disable-autorun",
    label: "Disable AutoRun/AutoPlay for removable media",
    fits: "autorun",
    note: "AutoRun on USB is how malware walks in without a click. Kill it on managed workstations.",
  },
  {
    id: "account-lockout",
    label: "Account lockout threshold after failed password attempts",
    fits: "lockout",
    note: "Stops endless password guessing at the console/RDP. Pair with strong passwords — not instead of them.",
  },
  {
    id: "firmware-pw",
    label: "Firmware/BIOS supervisor password — block boot-order tampering",
    fits: "biospw",
    note: "Stops casual USB boot bypass of OS controls. OS passwords alone do not protect pre-boot.",
  },
  {
    id: "local-admin-share",
    label: "Share one local admin password across the whole floor",
    fits: null,
    note: "Shared local admin is lateral-movement candy. Unique/LAPS-style secrets, not hallway sticky notes.",
  },
  {
    id: "autorun-enable",
    label: "Re-enable AutoRun so 'training USBs work without clicks'",
    fits: null,
    note: "Convenience is not a control. Training media gets deliberate launch — not AutoRun.",
  },
];

const TICKETS: { id: Ticket; title: string; hint: string }[] = [
  {
    id: "harden",
    title: "New hire PC: default apps, no encryption, months behind on patches",
    hint: "Raise the whole baseline before mailbox access.",
  },
  {
    id: "autorun",
    title: "Worm walked in from a vendor USB without a double-click",
    hint: "Removable media executed itself. Which feature did that?",
  },
  {
    id: "lockout",
    title: "Nightly brute-force against a local account on a kiosk",
    hint: "Failed logons never stop. Policy should cut them off.",
  },
  {
    id: "biospw",
    title: "Intern changed boot order and bypassed BitLocker prompts",
    hint: "Pre-OS tampering. OS password was never in the path.",
  },
];

const WANT: Record<Ticket, string> = {
  harden: "bitlocker-patch",
  autorun: "disable-autorun",
  lockout: "account-lockout",
  biospw: "firmware-pw",
};

export function WorkstationHardenLab({ lab, onSolved }: LabSimProps) {
  void lab;
  const { solved, markSolved } = useSolved(onSolved);
  const [placed, setPlaced] = useState<Record<Ticket, string>>({
    harden: "",
    autorun: "",
    lockout: "",
    biospw: "",
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
      "Encrypt+patch+trim services for baseline harden, disable AutoRun, set lockout thresholds, and firmware passwords against boot tampering. Shared local admin and AutoRun-for-training stay unused.",
    );
    markSolved();
  }

  return (
    <div className="space-y-3 text-sm">
      <LabStatus
        solved={solved}
        mission="Match each hardening ticket to the right control. Leave shared-admin and AutoRun-enable unused."
      />
      <p className="text-muted-foreground">
        CompTIA 2.7 is the workstation baseline: encryption, passwords/lockout,
        firmware passwords, AutoRun off, and patching before the phishing email.
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
                <option value="">Select control</option>
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
        Check workstation hardening matches
      </Button>
      {msg ? <p className="text-sm leading-6">{msg}</p> : null}
    </div>
  );
}
