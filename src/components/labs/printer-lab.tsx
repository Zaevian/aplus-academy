"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { LabStatus, useSolved } from "@/components/labs/lab-kit";

const SAMPLES = [
  {
    id: "faded",
    title: "Faded page",
    visual: "Light gray text, even across the page",
    want: "toner",
    why: "Even fade is toner/density, not a drum circumference mark.",
  },
  {
    id: "marks",
    title: "Repeating marks",
    visual: "Dot every ~94 mm down the page",
    want: "drum",
    why: "Repeating interval follows drum circumference.",
  },
  {
    id: "ghost",
    title: "Ghosting",
    visual: "Faint second copy of the letterhead, offset down",
    want: "fuser",
    why: "A previous image ghost often implicates fuser/drum discharge — not OLED burn-in.",
  },
  {
    id: "garbled",
    title: "Garbled output",
    visual: "Symbols and wrong font, paper is fine",
    want: "driver",
    why: "Garbled language is PCL/PS/driver, not paper path.",
  },
] as const;

const CHOICES = [
  { id: "toner", label: "Toner / density" },
  { id: "drum", label: "Drum" },
  { id: "fuser", label: "Fuser / drum ghost" },
  { id: "driver", label: "Language / driver" },
  { id: "buy", label: "Buy a new printer" },
];

export function PrinterLab({ lab, onSolved }: LabSimProps) {
  void lab;
  const { solved, markSolved } = useSolved(onSolved);
  const [pick, setPick] = useState<Record<string, string>>({});
  const [msg, setMsg] = useState("");

  function check() {
    if (Object.values(pick).includes("buy")) {
      setMsg("Buying a printer is not a first action. Match the subsystem.");
      return;
    }
    const wrong = SAMPLES.filter((s) => pick[s.id] !== s.want);
    if (wrong.length) {
      setMsg(
        wrong.map((s) => `${s.title}: ${s.why}`).join(" "),
      );
      return;
    }
    setMsg("All four samples mapped. Maintenance follows the subsystem, not a new device.");
    markSolved();
  }

  return (
    <div className="space-y-3 text-sm">
      <LabStatus
        solved={solved}
        mission="Match each sample page to the subsystem. Do not start with 'buy a printer'."
      />
      <div className="grid gap-3 sm:grid-cols-2">
        {SAMPLES.map((s) => (
          <div key={s.id} className="rounded border p-2">
            <div className="mb-2 flex h-24 items-center justify-center rounded bg-zinc-100 text-xs dark:bg-zinc-900">
              {s.visual}
            </div>
            <p className="font-medium">{s.title}</p>
            <select
              className="mt-1 min-h-11 w-full rounded-md border bg-background px-2"
              value={pick[s.id] ?? ""}
              onChange={(e) => setPick((p) => ({ ...p, [s.id]: e.target.value }))}
            >
              <option value="">Subsystem</option>
              {CHOICES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <Button size="sm" className="min-h-11" onClick={check}>
        Check samples
      </Button>
      {msg ? <p className="text-muted-foreground">{msg}</p> : null}
    </div>
  );
}
