"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { LabStatus, useSolved } from "@/components/labs/lab-kit";

type Cause =
  | "source"
  | "burnin"
  | "deadpixel"
  | "lamp"
  | "thermal";

const CAUSES: { id: Cause; title: string; hint: string }[] = [
  {
    id: "source",
    title: "Wrong source / output mode",
    hint: "Input button, Win+P / mirroring, or PC-screen-only before you buy hardware.",
  },
  {
    id: "burnin",
    title: "Burn-in / image retention",
    hint: "Stable ghost of static UI on an emissive panel — not a moving artifact.",
  },
  {
    id: "deadpixel",
    title: "Dead / stuck pixel",
    hint: "Tiny fixed dots that never move; not a whole taskbar silhouette.",
  },
  {
    id: "lamp",
    title: "Lamp / bulb / hours",
    hint: "Whole image dim, pink, or will not strike — check lamp hours and filter.",
  },
  {
    id: "thermal",
    title: "Projector thermal shutdown",
    hint: "Runs a few minutes then dies hot — vents, filter, cool-down cycle.",
  },
];

const TICKETS: {
  id: string;
  label: string;
  fits: Cause | null;
  note: string;
}[] = [
  {
    id: "nosignal",
    label:
      "Room projector: 'No signal.' Laptop is on; Win+P was left on PC screen only last week.",
    fits: "source",
    note: "Cycle HDMI inputs and projection mode before RMA of the projector.",
  },
  {
    id: "taskbar-ghost",
    label:
      "OLED laptop shows a faint permanent ghost of the Windows taskbar after months of pinned icons.",
    fits: "burnin",
    note: "Burn-in is a stable UI ghost on emissive panels — not a cable fault.",
  },
  {
    id: "one-dot",
    label:
      "IPS monitor has one always-black pixel that never moves; the rest of the image is sharp.",
    fits: "deadpixel",
    note: "Dead pixels stay put. Reinstalling the GPU driver will not move them.",
  },
  {
    id: "dim-hours",
    label:
      "Ceiling projector is dim and slightly pink; lamp-hours counter is past the rated life.",
    fits: "lamp",
    note: "Dim whole-frame projector image with high hours points to lamp (and filter clean).",
  },
  {
    id: "hot-eight",
    label:
      "Projector looks fine for eight minutes, then shuts down; intake vents packed with dust.",
    fits: "thermal",
    note: "Thermal shutdown: cool down, clear filter/vents — do not loop power-cycles.",
  },
  {
    id: "new-gpu",
    label:
      "Buy a new discrete GPU first because the conference-room HDMI TV is black (laptop panel still works).",
    fits: null,
    note: "Internal panel OK isolates the room path — GPU is not FIRST.",
  },
  {
    id: "reimage",
    label:
      "Reimage Windows because a single fixed red pixel appeared in the corner of the panel.",
    fits: null,
    note: "OS reimage does not repair a dead/stuck subpixel.",
  },
  {
    id: "raid",
    label:
      "Initialize a new RAID 0 array to fix fuzzy non-native resolution on a 1440p monitor.",
    fits: null,
    note: "Softness from 720p on a 1440p panel is a resolution setting, not storage.",
  },
];

const WANT: Record<Cause, string> = {
  source: "nosignal",
  burnin: "taskbar-ghost",
  deadpixel: "one-dot",
  lamp: "dim-hours",
  thermal: "hot-eight",
};

export function DisplayFaultLab({ lab, onSolved }: LabSimProps) {
  void lab;
  const { solved, markSolved } = useSolved(onSolved);
  const [placed, setPlaced] = useState<Record<Cause, string>>({
    source: "",
    burnin: "",
    deadpixel: "",
    lamp: "",
    thermal: "",
  });
  const [msg, setMsg] = useState("");

  const remaining = useMemo(() => {
    const used = new Set(Object.values(placed).filter(Boolean));
    return TICKETS.filter((t) => !used.has(t.id));
  }, [placed]);

  function assign(cause: Cause, ticketId: string) {
    setPlaced((prev) => {
      const next = { ...prev };
      (Object.keys(next) as Cause[]).forEach((c) => {
        if (next[c] === ticketId) next[c] = "";
      });
      next[cause] = ticketId;
      return next;
    });
    setMsg("");
  }

  function check() {
    const misses: string[] = [];
    for (const cause of CAUSES) {
      const ticketId = placed[cause.id];
      if (!ticketId) {
        misses.push(`${cause.title}: empty`);
        continue;
      }
      if (WANT[cause.id] !== ticketId) {
        const ticket = TICKETS.find((t) => t.id === ticketId);
        misses.push(
          `${cause.title}: wrong — ${ticket?.note ?? ticketId}`,
        );
      }
    }
    if (misses.length) {
      setMsg(misses.join(" "));
      return;
    }
    setMsg(
      "Source gets no-signal/Win+P, burn-in gets the OLED taskbar ghost, dead pixel gets the fixed black/red dot, lamp gets dim/high-hours, thermal gets the dusty eight-minute shutdown. New-GPU-first, reimage-for-a-pixel, and RAID-for-softness stay unmatched.",
    );
    markSolved();
  }

  return (
    <div className="space-y-3 text-sm">
      <LabStatus
        solved={solved}
        mission="Match each display/projector cause to the ticket that fits. Leave GPU-first, reimage, and RAID distractors unused."
      />
      <p className="text-muted-foreground">
        Conference-room and panel tickets are usually source, cable, lamp,
        heat, burn-in, or a single dead pixel — not a new GPU or a reimage.
        Match the symptom language to the subsystem.
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {CAUSES.map((cause) => {
          const ticket = TICKETS.find((t) => t.id === placed[cause.id]);
          return (
            <fieldset key={cause.id} className="rounded border p-2">
              <legend className="font-medium">{cause.title}</legend>
              <p className="mt-1 text-xs text-muted-foreground">{cause.hint}</p>
              <select
                className="mt-2 min-h-11 w-full rounded-md border bg-background px-2"
                value={placed[cause.id]}
                onChange={(e) => assign(cause.id, e.target.value)}
                aria-label={`Ticket for ${cause.title}`}
              >
                <option value="">Select ticket</option>
                {ticket ? (
                  <option value={ticket.id}>{ticket.label}</option>
                ) : null}
                {remaining.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
              {ticket ? (
                <p className="mt-2 text-xs text-muted-foreground">{ticket.note}</p>
              ) : null}
            </fieldset>
          );
        })}
      </div>
      <div className="rounded border bg-muted/40 p-2">
        <p className="font-medium">Tickets still on the bench</p>
        <ul className="mt-1 list-disc pl-5 text-xs text-muted-foreground">
          {remaining.length === 0 ? (
            <li>
              All tickets assigned — verify each cause before you check.
            </li>
          ) : (
            remaining.map((t) => (
              <li key={t.id}>
                {t.label} — {t.note}
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
