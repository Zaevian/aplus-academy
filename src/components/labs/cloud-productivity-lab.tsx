"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { LabStatus, useSolved } from "@/components/labs/lab-kit";

type Ticket = "email" | "license" | "collab" | "sync";

const CHOICES: {
  id: string;
  label: string;
  fits: Ticket | null;
  note: string;
}[] = [
  {
    id: "mail-sync",
    label: "Cloud mailbox + modern auth sync to Outlook/mobile",
    fits: "email",
    note: "Exchange Online / Google Workspace style sync — not .pst sneaker-net.",
  },
  {
    id: "assign-sku",
    label: "Assign the correct productivity license/SKU to the user",
    fits: "license",
    note: "Unlicensed seats cannot open Teams/docs even if mail works.",
  },
  {
    id: "collab-suite",
    label: "Tenant collab apps — docs, chat, meetings in one directory",
    fits: "collab",
    note: "Co-authoring and IM live in the productivity suite, not a random USB share.",
  },
  {
    id: "files-sync",
    label: "Cloud file sync / Files On-Demand for offline folders",
    fits: "sync",
    note: "Sync client + selective folders beats emailing zip bombs.",
  },
  {
    id: "shared-password",
    label: "Share one cloud password across the whole help desk",
    fits: null,
    note: "Shared credentials break audit and MFA. Per-user identity only.",
  },
  {
    id: "local-only",
    label: "Keep everything on a local NAS and skip cloud identity",
    fits: null,
    note: "Objective is cloud productivity — identity sync and licensing are in scope.",
  },
];

const TICKETS: { id: Ticket; title: string; hint: string }[] = [
  {
    id: "email",
    title: "New hire mailbox must sync mail/calendar to phone and Outlook",
    hint: "Identity + email sync, not a PST on a stick.",
  },
  {
    id: "license",
    title: "Shared mailbox users hit unlicensed on Teams/docs",
    hint: "Correct seat/SKU assignment.",
  },
  {
    id: "collab",
    title: "Project needs co-authoring docs + chat in one tenant",
    hint: "Collaboration suite, not email alone.",
  },
  {
    id: "sync",
    title: "Offline field techs need cloud Files On-Demand folders",
    hint: "Storage sync/folder settings.",
  },
];

const WANT: Record<Ticket, string> = {
  email: "mail-sync",
  license: "assign-sku",
  collab: "collab-suite",
  sync: "files-sync",
};

export function CloudProductivityLab({ lab, onSolved }: LabSimProps) {
  void lab;
  const { solved, markSolved } = useSolved(onSolved);
  const [placed, setPlaced] = useState<Record<Ticket, string>>({
    email: "",
    license: "",
    collab: "",
    sync: "",
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
    setMsg("Mailbox sync for mail/calendar, assign SKUs for licenses, collab suite for co-authoring/chat, Files On-Demand for offline sync. Shared passwords and local-only skips stay unused.");
    markSolved();
  }

  return (
    <div className="space-y-3 text-sm">
      <LabStatus solved={solved} mission="Match each cloud productivity ticket. Leave shared-password and local-only unused." />
      <p className="text-muted-foreground">CompTIA 1.11 is cloud productivity: email, storage sync, identity, licensing, and collaboration tools for a fictional employee.</p>
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
        Check cloud productivity matches
      </Button>
      {msg ? <p className="text-sm leading-6">{msg}</p> : null}
    </div>
  );
}
