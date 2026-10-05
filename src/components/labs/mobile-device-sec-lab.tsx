"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { LabStatus, useSolved } from "@/components/labs/lab-kit";

type Ticket = "wipe" | "lock" | "mdm" | "encrypt";

const CHOICES: {
  id: string;
  label: string;
  fits: Ticket | null;
  note: string;
}[] = [
  {
    id: "remote-wipe",
    label: "Remote wipe — erase corp data on a lost/stolen device",
    fits: "wipe",
    note: "Locator finds; wipe kills the data. Pair with backups so wipe is survivable.",
  },
  {
    id: "screen-lock",
    label: "Require PIN/biometric/pattern screen lock — not swipe",
    fits: "lock",
    note: "Swipe is not a control. PIN, biometric, or pattern + failed-attempt limits are.",
  },
  {
    id: "mdm-profile",
    label: "MDM configuration profile — enroll and enforce policy",
    fits: "mdm",
    note: "MDM pushes encryption, lock, wipe rights, and app allow-lists. BYOD vs corporate profiles differ.",
  },
  {
    id: "device-encrypt",
    label: "Full-device encryption before mailbox access",
    fits: "encrypt",
    note: "Lost phone with an unlocked filesystem is a breach. Encrypt at rest, then lock the screen.",
  },
  {
    id: "swipe-only",
    label: "Allow swipe-to-unlock so nurses can grab charts faster",
    fits: null,
    note: "Convenience is not authentication. Clinical devices still need a real lock factor.",
  },
  {
    id: "factory-no-mdm",
    label: "Skip MDM — just tell users to factory-reset if anything feels weird",
    fits: null,
    note: "Hope is not inventory. MDM enrolls, enforces, and can wipe without waiting for the user.",
  },
];

const TICKETS: { id: Ticket; title: string; hint: string }[] = [
  {
    id: "wipe",
    title: "Executive phone stolen at the airport with mail and SSO",
    hint: "Data must die remotely. Finding it later is optional.",
  },
  {
    id: "lock",
    title: "Lobby tablets unlock with a finger swipe for 'speed'",
    hint: "Anyone walking by gets the session. Raise the lock factor.",
  },
  {
    id: "mdm",
    title: "BYOD phones have no inventory, no policy, no wipe rights",
    hint: "Enrollment and profiles before corporate email.",
  },
  {
    id: "encrypt",
    title: "Lost phone had a lock screen but an unencrypted filesystem",
    hint: "Lock delays; encryption protects at rest if they bypass the UI.",
  },
];

const WANT: Record<Ticket, string> = {
  wipe: "remote-wipe",
  lock: "screen-lock",
  mdm: "mdm-profile",
  encrypt: "device-encrypt",
};

export function MobileDeviceSecLab({ lab, onSolved }: LabSimProps) {
  void lab;
  const { solved, markSolved } = useSolved(onSolved);
  const [placed, setPlaced] = useState<Record<Ticket, string>>({
    wipe: "",
    lock: "",
    mdm: "",
    encrypt: "",
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
      "Remote wipe for stolen devices, real screen locks (not swipe), MDM profiles for BYOD/corp, and full-device encryption at rest. Swipe-only and skip-MDM stay unused.",
    );
    markSolved();
  }

  return (
    <div className="space-y-3 text-sm">
      <LabStatus
        solved={solved}
        mission="Match each mobile security ticket. Leave swipe-only and skip-MDM unused."
      />
      <p className="text-muted-foreground">
        CompTIA 2.8 is phone hardening: encryption, screen locks, locator,
        remote wipe, failed-attempt limits, and MDM profiles for BYOD vs
        corporate-owned.
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
        Check mobile security matches
      </Button>
      {msg ? <p className="text-sm leading-6">{msg}</p> : null}
    </div>
  );
}
