"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { LabStatus, useSolved } from "@/components/labs/lab-kit";

type Ticket = "degauss" | "wipe" | "shred" | "cod";

const CHOICES: {
  id: string;
  label: string;
  fits: Ticket | null;
  note: string;
}[] = [
  {
    id: "degauss-hdd",
    label: "Degauss — scramble magnetic domains on HDD/tape",
    fits: "degauss",
    note: "Works on magnetic media. Not a plan for flash/SSD controllers.",
  },
  {
    id: "secure-wipe",
    label: "Secure erase / multipass wipe before redeploy",
    fits: "wipe",
    note: "Reuse wants cryptographic/ATA erase or vetted wipe — not format alone.",
  },
  {
    id: "phys-shred",
    label: "Shred/crush/incinerate — physical destruction",
    fits: "shred",
    note: "When media must never return. Drill alone may be policy-insufficient.",
  },
  {
    id: "cert-dest",
    label: "Third-party Certificate of Destruction (CoD)",
    fits: "cod",
    note: "Chain of custody ends with signed proof the vendor destroyed the lot.",
  },
  {
    id: "quick-format",
    label: "Quick format and call the drive clean for regulated data",
    fits: null,
    note: "Quick format removes directory entries — not regulated sanitization.",
  },
  {
    id: "degauss-ssd",
    label: "Degauss the NVMe SSD — magnets fix flash too",
    fits: null,
    note: "Flash is not magnetic. Use crypto-erase/vendor sanitize or destroy.",
  },
];

const TICKETS: { id: Ticket; title: string; hint: string }[] = [
  {
    id: "degauss",
    title: "HR returns a magnetic HDD with regulated data",
    hint: "Magnetic media — erase the fields.",
  },
  {
    id: "wipe",
    title: "Reuse an SSD for another department after lease return",
    hint: "Logical sanitize when reuse is planned.",
  },
  {
    id: "shred",
    title: "Drives must be physically destroyed before dumpster",
    hint: "Physical destruction path.",
  },
  {
    id: "cod",
    title: "Vendor carts disks away — need proof of destruction",
    hint: "Certificate of Destruction paperwork.",
  },
];

const WANT: Record<Ticket, string> = {
  degauss: "degauss-hdd",
  wipe: "secure-wipe",
  shred: "phys-shred",
  cod: "cert-dest",
};

export function DataDestructionLab({ lab, onSolved }: LabSimProps) {
  void lab;
  const { solved, markSolved } = useSolved(onSolved);
  const [placed, setPlaced] = useState<Record<Ticket, string>>({
    degauss: "",
    wipe: "",
    shred: "",
    cod: "",
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
    setMsg("Degauss magnetic HDD/tape, wipe/secure-erase for reuse, shred for physical destroy, CoD for vendor proof. Quick-format and degauss-on-SSD stay unused.");
    markSolved();
  }

  return (
    <div className="space-y-3 text-sm">
      <LabStatus solved={solved} mission="Match each destruction ticket. Leave quick-format and degauss-SSD unused." />
      <p className="text-muted-foreground">CompTIA 2.9 is disposal: degauss, wipe/erase, shred/drill/incinerate, and Certificate of Destruction — matched to the media and the policy.</p>
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
        Check data destruction matches
      </Button>
      {msg ? <p className="text-sm leading-6">{msg}</p> : null}
    </div>
  );
}
