"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { LabStatus, useSolved } from "@/components/labs/lab-kit";

type Ticket = "cert" | "hash" | "private" | "dns";

const CHOICES: {
  id: string;
  label: string;
  fits: Ticket | null;
  note: string;
}[] = [
  {
    id: "cert-warn",
    label: "Stop — investigate certificate warnings; do not click through",
    fits: "cert",
    note: "MITM and bad hosts hide behind ignored cert errors.",
  },
  {
    id: "hash-check",
    label: "Compare published hash to the downloaded file before install",
    fits: "hash",
    note: "Hashing catches tampered installers even from the right URL.",
  },
  {
    id: "privacy-mode",
    label: "Private/InPrivate mode + clear cache on shared kiosks",
    fits: "private",
    note: "Keeps the next user from inheriting sessions and history.",
  },
  {
    id: "secure-dns",
    label: "Enable browser Secure DNS / DoH per org policy",
    fits: "dns",
    note: "Encrypts DNS to a trusted resolver when policy allows.",
  },
  {
    id: "ignore-cert",
    label: "Teach users Permanent exception on every red lock",
    fits: null,
    note: "Permanent exceptions train phishing success.",
  },
  {
    id: "disable-updates",
    label: "Disable browser updates so extensions stop breaking",
    fits: null,
    note: "Unpatched browsers are findings. Fix the extension, not the patch train.",
  },
];

const TICKETS: { id: Ticket; title: string; hint: string }[] = [
  {
    id: "cert",
    title: "Users click through red certificate warnings to make payroll work",
    hint: "Certificate trust — do not bypass.",
  },
  {
    id: "hash",
    title: "Vendor posts a SHA-256 for the installer you just downloaded",
    hint: "Verify integrity before run.",
  },
  {
    id: "private",
    title: "Kiosk must not leave cookies/history for the next visitor",
    hint: "Private browsing / clear data.",
  },
  {
    id: "dns",
    title: "Phish sites resolve on ISP DNS; harden name resolution in-browser",
    hint: "Secure DNS / DoH where policy allows.",
  },
];

const WANT: Record<Ticket, string> = {
  cert: "cert-warn",
  hash: "hash-check",
  private: "privacy-mode",
  dns: "secure-dns",
};

export function BrowserSecurityLab({ lab, onSolved }: LabSimProps) {
  void lab;
  const { solved, markSolved } = useSolved(onSolved);
  const [placed, setPlaced] = useState<Record<Ticket, string>>({
    cert: "",
    hash: "",
    private: "",
    dns: "",
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
    setMsg("Investigate cert warnings, hash installers, private mode on kiosks, Secure DNS when allowed. Click-through exceptions and disabling updates stay unused.");
    markSolved();
  }

  return (
    <div className="space-y-3 text-sm">
      <LabStatus solved={solved} mission="Match each browser security ticket. Leave ignore-cert and disable-updates unused." />
      <p className="text-muted-foreground">CompTIA 2.11 is browser hardening: cert warnings, hashing downloads, private mode, secure DNS, extensions, and pop-up/proxy settings.</p>
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
        Check browser security matches
      </Button>
      {msg ? <p className="text-sm leading-6">{msg}</p> : null}
    </div>
  );
}
