"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { LabStatus, useSolved } from "@/components/labs/lab-kit";

type Ticket = "design" | "esports" | "oled" | "digitizer";

const CHOICES: {
  id: string;
  label: string;
  fits: Ticket | null;
  note: string;
}[] = [
  {
    id: "ips",
    label: "IPS panel — wide viewing angles, accurate color",
    fits: "design",
    note: "IPS keeps color when the client leans over the desk. TN washes out off-axis.",
  },
  {
    id: "tn-fast",
    label: "TN / high-refresh gaming panel",
    fits: "esports",
    note: "Esports cares about response and Hz first; color accuracy is secondary.",
  },
  {
    id: "oled",
    label: "OLED — true black, risk of burn-in",
    fits: "oled",
    note: "Self-emissive blacks and infinite contrast; static UI can burn in.",
  },
  {
    id: "digitizer",
    label: "Replace digitizer / touch assembly (image still OK)",
    fits: "digitizer",
    note: "Touch/pen layer can fail while the LCD/OLED image is fine — do not order a whole panel first.",
  },
  {
    id: "inverter",
    label: "CCFL inverter swap on a modern LED laptop",
    fits: null,
    note: "Inverters belong to CCFL backlights only. LED/OLED laptops do not use them.",
  },
  {
    id: "whole-panel",
    label: "Full LCD assembly because touch alone failed",
    fits: null,
    note: "If the image is correct and only touch is dead, dig into digitizer/service manual first.",
  },
];

const TICKETS: { id: Ticket; title: string; hint: string }[] = [
  {
    id: "design",
    title: "Agency design review wall",
    hint: "Art directors stand beside the desk and complain that reds shift. Need wide angles and sane color — not max Hz.",
  },
  {
    id: "esports",
    title: "Campus esports LAN",
    hint: "Team wants the fastest competitive panel they can afford. Color science is not the ticket.",
  },
  {
    id: "oled",
    title: "Dark-room film edit bay",
    hint: "Editor wants infinite blacks and no backlight bloom. Warn about static UI ghosts.",
  },
  {
    id: "digitizer",
    title: "2-in-1: picture fine, touch dead",
    hint: "Wallpaper looks perfect. Finger and stylus do nothing. Pick the FIRST hardware target.",
  },
];

const WANT: Record<Ticket, string> = {
  design: "ips",
  esports: "tn-fast",
  oled: "oled",
  digitizer: "digitizer",
};

export function DisplayMatchLab({ lab, onSolved }: LabSimProps) {
  void lab;
  const { solved, markSolved } = useSolved(onSolved);
  const [placed, setPlaced] = useState<Record<Ticket, string>>({
    design: "",
    esports: "",
    oled: "",
    digitizer: "",
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
      "IPS for the design wall, fast TN/high-refresh for esports, OLED for the dark bay, digitizer for touch-dead 2-in-1. CCFL inverter and whole-panel-for-touch stay unused.",
    );
    markSolved();
  }

  return (
    <div className="space-y-3 text-sm">
      <LabStatus
        solved={solved}
        mission="Match display technology / FRU choices to each ticket. Leave the CCFL inverter and whole-panel-for-touch distractors unused."
      />
      <p className="text-muted-foreground">
        Four tickets: agency viewing angles, esports refresh, OLED contrast, and a
        touch-dead 2-in-1 whose image is fine. CompTIA wants the attribute that
        matches the job — not a single &quot;best panel.&quot;
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
                <option value="">Select panel / FRU</option>
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
        Check display matches
      </Button>
      {msg ? <p className="text-sm leading-6">{msg}</p> : null}
    </div>
  );
}
