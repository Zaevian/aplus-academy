"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { LabStatus, useSolved } from "@/components/labs/lab-kit";

type Ticket = "wattage" | "modular" | "atx24" | "rails";

const CHOICES: {
  id: string;
  label: string;
  fits: Ticket | null;
  note: string;
}[] = [
  {
    id: "size-watt",
    label: "Upsize wattage / headroom for GPU + drive load",
    fits: "wattage",
    note: "Undersized PSU brownouts under load. Spec continuous wattage with margin — not the sticker peak fantasy.",
  },
  {
    id: "semi-modular",
    label: "Semi/fully modular cabling — pull only what you need",
    fits: "modular",
    note: "Modular lets you omit unused PCIe/SATA runs for airflow. Non-modular forces every cable into the case.",
  },
  {
    id: "main-24",
    label: "ATX 24-pin (20+4) mainboard power — seat fully",
    fits: "atx24",
    note: "Primary board power is the 24-pin. A loose 24-pin looks like a dead motherboard.",
  },
  {
    id: "12v-rail",
    label: "Check 12V rail capacity for CPU/GPU EPS and PCIe",
    fits: "rails",
    note: "Modern builds starve on weak 12V. Rails matter more than a huge 5V rail nobody uses.",
  },
  {
    id: "open-psu",
    label: "Open the PSU chassis to 'inspect the rails' with a meter",
    fits: null,
    note: "Never open a PSU — capacitors hold lethal charge. Measure at connectors, not inside.",
  },
  {
    id: "ignore-vac",
    label: "Ignore 115/230 input switch — 'auto-detect always works'",
    fits: null,
    note: "Dual-voltage units with a wrong switch can let the smoke out. Confirm region input first.",
  },
];

const TICKETS: { id: Ticket; title: string; hint: string }[] = [
  {
    id: "wattage",
    title: "New GPU; system reboots only under 3D load",
    hint: "Idle is fine. Load collapses. Capacity class, not a bad OS driver first.",
  },
  {
    id: "modular",
    title: "SFF build: unused PCIe cables block airflow",
    hint: "You need the connectors you use — and freedom to omit the rest.",
  },
  {
    id: "atx24",
    title: "Board has no POST; CPU fan twitches once",
    hint: "Primary board power connector — not the GPU PCIe alone.",
  },
  {
    id: "rails",
    title: "EPS + dual PCIe draw; 5V rail is huge, 12V is thin",
    hint: "Which rail actually feeds modern CPU/GPU power?",
  },
];

const WANT: Record<Ticket, string> = {
  wattage: "size-watt",
  modular: "semi-modular",
  atx24: "main-24",
  rails: "12v-rail",
};

export function PsuMatchLab({ lab, onSolved }: LabSimProps) {
  void lab;
  const { solved, markSolved } = useSolved(onSolved);
  const [placed, setPlaced] = useState<Record<Ticket, string>>({
    wattage: "",
    modular: "",
    atx24: "",
    rails: "",
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
      "Wattage headroom under GPU load, modular for airflow, seated ATX 24-pin for POST, strong 12V for EPS/PCIe. Never open the PSU or ignore the input-voltage switch.",
    );
    markSolved();
  }

  return (
    <div className="space-y-3 text-sm">
      <LabStatus
        solved={solved}
        mission="Match each PSU ticket to the right fix. Leave open-chassis and ignore-VAC unused."
      />
      <p className="text-muted-foreground">
        CompTIA 3.6 wants wattage, modularity, the ATX 24-pin, and rail awareness —
        plus the safety rule that you do not crack open a live supply.
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
                <option value="">Select fix</option>
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
        Check PSU matches
      </Button>
      {msg ? <p className="text-sm leading-6">{msg}</p> : null}
    </div>
  );
}
