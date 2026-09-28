"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { LabStatus, useSolved } from "@/components/labs/lab-kit";

type Ticket = "swell" | "digitizer" | "liquid" | "charge";

const CHOICES: {
  id: string;
  label: string;
  fits: Ticket | null;
  note: string;
}[] = [
  {
    id: "power-off-pack",
    label: "Power off, do NOT charge, replace swollen OEM pack",
    fits: "swell",
    note: "A swollen cell is a fire risk. Stop charging and treat it as a hazardous FRU.",
  },
  {
    id: "digitizer-fru",
    label: "Digitizer / touch assembly — image still correct",
    fits: "digitizer",
    note: "If the picture is fine and touch/pen is dead, target the digitizer path first.",
  },
  {
    id: "liquid-safe",
    label: "Power off, do not charge, dry/inspect — no rice myths",
    fits: "liquid",
    note: "Liquid + power is how you etch boards. Safety before wipe or battery swap.",
  },
  {
    id: "known-good-cable",
    label: "Known-good cable/brick, inspect port debris, then battery health",
    fits: "charge",
    note: "Most 'won't charge' tickets are cable, brick, or lint — not a blind battery order.",
  },
  {
    id: "factory-first",
    label: "Factory reset as FIRST action on a swollen or wet phone",
    fits: null,
    note: "Reset does not deflate a cell or dry a board. Make it safe first.",
  },
  {
    id: "buy-phone",
    label: "Tell the user to buy a new phone before any inspect",
    fits: null,
    note: "Exam wants FIRST triage and safety, not an immediate procurement leap.",
  },
];

const TICKETS: { id: Ticket; title: string; hint: string }[] = [
  {
    id: "swell",
    title: "Back glass lifting off the frame",
    hint: "Phone sits uneven on a desk; case will not click. User still wants to 'top it off overnight.'",
  },
  {
    id: "digitizer",
    title: "Wallpaper perfect, touch dead",
    hint: "Display shows the lock screen. Finger and stylus do nothing. External mouse over USB-C works in a desktop mode dock.",
  },
  {
    id: "liquid",
    title: "Dropped in a sink, still powered",
    hint: "User fished it out and plugged a charger 'to dry it.' Stop the bad ideas.",
  },
  {
    id: "charge",
    title: "Won't take a charge after gym bag",
    hint: "Cable feels gritty in the port. Battery % was fine yesterday. Pick the BEST FIRST path.",
  },
];

const WANT: Record<Ticket, string> = {
  swell: "power-off-pack",
  digitizer: "digitizer-fru",
  liquid: "liquid-safe",
  charge: "known-good-cable",
};

export function MobileHardwareTsLab({ lab, onSolved }: LabSimProps) {
  void lab;
  const { solved, markSolved } = useSolved(onSolved);
  const [placed, setPlaced] = useState<Record<Ticket, string>>({
    swell: "",
    digitizer: "",
    liquid: "",
    charge: "",
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
      "Swell → power off / no charge / OEM pack. Digitizer when the image is fine. Liquid → power off, no charge. Charge path → known-good cable/port before battery. Factory-reset-first and buy-a-phone stay unused.",
    );
    markSolved();
  }

  return (
    <div className="space-y-3 text-sm">
      <LabStatus
        solved={solved}
        mission="Match FIRST mobile hardware actions to each ticket. Leave factory-reset-first and buy-a-phone unused."
      />
      <p className="text-muted-foreground">
        Physical mobile troubleshooting: swollen cells, digitizer vs panel, liquid
        safety, and charge-path triage before FRU shopping.
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
                aria-label={`Action for ${ticket.title}`}
              >
                <option value="">Select FIRST action</option>
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
            <li>All actions assigned — verify safety-first before you check.</li>
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
        Check mobile TS plan
      </Button>
      {msg ? <p className="text-sm leading-6">{msg}</p> : null}
    </div>
  );
}
