"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { LabStatus, useSolved } from "@/components/labs/lab-kit";

type Ticket = "esd" | "power" | "ppe" | "lift";

const CHOICES: {
  id: string;
  label: string;
  fits: Ticket | null;
  note: string;
}[] = [
  {
    id: "esd-strap",
    label: "ESD wrist strap + mat, grounded — then handle the RAM/board",
    fits: "esd",
    note: "Equal potential between you, bench, and part. Strap alone to the chassis paint is theater.",
  },
  {
    id: "disconnect",
    label: "Unplug PSU / remove main battery, hold power to drain — then open",
    fits: "power",
    note: "Disconnect and drain residual power before you dig inside. Hot-chassis work is how techs get hurt.",
  },
  {
    id: "goggles",
    label: "Safety goggles (and mask if toner/dust) before the messy job",
    fits: "ppe",
    note: "PPE is required for toner spills, compressed air, and debris — not optional fashion.",
  },
  {
    id: "team-lift",
    label: "Team lift / mechanical aid for the heavy UPS or rack server",
    fits: "lift",
    note: "Lift with legs, get help, use a cart. Solo-hero UPS carries are injury tickets.",
  },
  {
    id: "open-psu",
    label: "Open the PSU shell to clean the fan with a cotton swab",
    fits: null,
    note: "Do not service the inside of a PSU. Capacitors hold charge. Replace the unit.",
  },
  {
    id: "class-a",
    label: "Grab a Class A water extinguisher for an electrical cabinet fire",
    fits: null,
    note: "Electrical fires need Class C (or the rated multi-class) — water on live gear is how you escalate.",
  },
];

const TICKETS: { id: Ticket; title: string; hint: string }[] = [
  {
    id: "esd",
    title: "SODIMM upgrade on the ESD-marked bench",
    hint: "Board is out of the bag. Before you touch pins, equalize potential the right way.",
  },
  {
    id: "power",
    title: "Replace a CMOS battery in a desktop tower",
    hint: "Side panel is off next. FIRST make the chassis electrically safe.",
  },
  {
    id: "ppe",
    title: "Toner cloud after a dropped cartridge",
    hint: "Cleanup will kick dust. Protect eyes (and lungs) before you vacuum with the wrong tool.",
  },
  {
    id: "lift",
    title: "Move a 60 lb UPS under the rack",
    hint: "One tech, wet floor, 'I got it.' Pick the safe material-handling answer.",
  },
];

const WANT: Record<Ticket, string> = {
  esd: "esd-strap",
  power: "disconnect",
  ppe: "goggles",
  lift: "team-lift",
};

export function SafetyProceduresLab({ lab, onSolved }: LabSimProps) {
  void lab;
  const { solved, markSolved } = useSolved(onSolved);
  const [placed, setPlaced] = useState<Record<Ticket, string>>({
    esd: "",
    power: "",
    ppe: "",
    lift: "",
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
      "ESD strap+mat for the SODIMM, disconnect/drain before opening, PPE for toner, team lift for the UPS. Opening a PSU and Class A on electrical stay unused.",
    );
    markSolved();
  }

  return (
    <div className="space-y-3 text-sm">
      <LabStatus
        solved={solved}
        mission="Match each safety ticket to the correct control. Leave open-PSU and Class-A-on-electrical unused."
      />
      <p className="text-muted-foreground">
        Objective 4.4 is procedural safety: ESD, disconnect power, PPE, and
        lifting — not heroics inside a power supply.
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
                <option value="">Select safety action</option>
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
        <p className="font-medium">Still unmatched</p>
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
        Check safety matches
      </Button>
      {msg ? <p className="text-sm leading-6">{msg}</p> : null}
    </div>
  );
}
