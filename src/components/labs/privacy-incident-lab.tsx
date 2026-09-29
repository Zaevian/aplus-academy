"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { LabStatus, useSolved } from "@/components/labs/lab-kit";

type Ticket = "coc" | "volatility" | "pii" | "aup";

const CHOICES: {
  id: string;
  label: string;
  fits: Ticket | null;
  note: string;
}[] = [
  {
    id: "chain-custody",
    label: "Chain of custody — who held evidence, when, why, sealed/hashed",
    fits: "coc",
    note: "Courts and management need an unbroken handoff log. A mystery USB in your pocket is not evidence.",
  },
  {
    id: "order-volatility",
    label: "Order of volatility — capture RAM/live state before disk before backups",
    fits: "volatility",
    note: "Powering off first can destroy the richest evidence. Document live state, then image disk.",
  },
  {
    id: "pii-handling",
    label: "Need-to-know PII handling + retention — not hallway screenshots",
    fits: "pii",
    note: "SSNs, health, payment, and government IDs follow policy and retention — not convenience chats.",
  },
  {
    id: "aup-policy",
    label: "Acceptable Use Policy — rules for systems/internet before access",
    fits: "aup",
    note: "AUP (and splash/EULA acceptance) sets the behavioral contract. NDA is confidentiality; AUP is use.",
  },
  {
    id: "reboot-first",
    label: "Reboot the suspect PC immediately so 'it is clean for imaging'",
    fits: null,
    note: "Reboot wipes volatile evidence. Image/live capture first when investigating.",
  },
  {
    id: "pii-slack",
    label: "Paste customer SSNs into a public Slack channel for 'fast help'",
    fits: null,
    note: "PII belongs in approved systems with access control — not blast channels.",
  },
];

const TICKETS: { id: Ticket; title: string; hint: string }[] = [
  {
    id: "coc",
    title: "HR needs the laptop drive admitted as evidence later",
    hint: "Prove who touched it and that it stayed sealed.",
  },
  {
    id: "volatility",
    title: "Live malware still in RAM; someone wants to pull the plug first",
    hint: "What disappears when power dies?",
  },
  {
    id: "pii",
    title: "Tech screenshots a patient's chart into a group chat",
    hint: "Identifiers and health data — policy, not speed.",
  },
  {
    id: "aup",
    title: "New hires stream torrents on corp Wi-Fi 'because nobody said no'",
    hint: "Behavioral contract for systems/internet use.",
  },
];

const WANT: Record<Ticket, string> = {
  coc: "chain-custody",
  volatility: "order-volatility",
  pii: "pii-handling",
  aup: "aup-policy",
};

export function PrivacyIncidentLab({ lab, onSolved }: LabSimProps) {
  void lab;
  const { solved, markSolved } = useSolved(onSolved);
  const [placed, setPlaced] = useState<Record<Ticket, string>>({
    coc: "",
    volatility: "",
    pii: "",
    aup: "",
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
      "Chain of custody for evidence, order of volatility before power-off, need-to-know PII handling, and AUP for acceptable use. Reboot-first and paste-PII-to-Slack stay unused.",
    );
    markSolved();
  }

  return (
    <div className="space-y-3 text-sm">
      <LabStatus
        solved={solved}
        mission="Match each privacy/incident ticket. Leave reboot-first and PII-to-Slack unused."
      />
      <p className="text-muted-foreground">
        CompTIA 4.6 is paperwork with teeth: chain of custody, order of
        volatility, PII/retention, EULA/DRM/licensing, AUP, and NDAs — not
        vibes.
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
                <option value="">Select control / process</option>
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
        Check privacy and incident matches
      </Button>
      {msg ? <p className="text-sm leading-6">{msg}</p> : null}
    </div>
  );
}
