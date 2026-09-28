"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { LabStatus, useSolved } from "@/components/labs/lab-kit";

type Slot = "desktop" | "laptop" | "server";

const PARTS: { id: string; label: string; fits: Slot | null; note: string }[] = [
  {
    id: "dimm-ddr4-kit",
    label: "Matched DIMM DDR4-3200 kit (2×16 GB, non-ECC)",
    fits: "desktop",
    note: "Desktop dual-channel wants matched full-size DIMMs of the board's DDR generation.",
  },
  {
    id: "sodimm-ddr4",
    label: "SODIMM DDR4-3200 (notebook)",
    fits: "laptop",
    note: "Laptops and many mini-PCs take SODIMM, not desktop DIMM.",
  },
  {
    id: "ecc-dimm",
    label: "ECC DIMM DDR4 (server/unbuffered or RDIMM per QVL)",
    fits: "server",
    note: "Hypervisor hosts need ECC modules on an ECC-capable CPU and board.",
  },
  {
    id: "dimm-ddr5",
    label: "DIMM DDR5-5600 (wrong generation for this DDR4 board)",
    fits: null,
    note: "DDR generations are keyed; DDR5 will not seat in a DDR4 slot.",
  },
  {
    id: "sodimm-in-tower",
    label: "SODIMM forced into a desktop DIMM slot with a web adapter",
    fits: null,
    note: "Form factors are not interchangeable with adapters.",
  },
  {
    id: "non-ecc-rgb",
    label: "Non-ECC RGB DIMM kit for a financial VM host",
    fits: null,
    note: "RGB speed does not replace ECC when the ticket asks for correctable memory errors.",
  },
];

const SLOTS: { id: Slot; title: string; hint: string }[] = [
  {
    id: "desktop",
    title: "Desktop dual-channel (A2/B2)",
    hint: "Tower board labeled DDR4. Manual paints A2 and B2 as the first dual-channel pair.",
  },
  {
    id: "laptop",
    title: "Serviceable laptop memory bay",
    hint: "Business notebook with a SODIMM door; user wants more RAM after disk thrash.",
  },
  {
    id: "server",
    title: "Hypervisor / database host",
    hint: "Ticket: 'correct single-bit memory errors.' CPU and board QVL list ECC support.",
  },
];

const WANT: Record<Slot, string> = {
  desktop: "dimm-ddr4-kit",
  laptop: "sodimm-ddr4",
  server: "ecc-dimm",
};

export function RamInstallLab({ lab, onSolved }: LabSimProps) {
  void lab;
  const { solved, markSolved } = useSolved(onSolved);
  const [placed, setPlaced] = useState<Record<Slot, string>>({
    desktop: "",
    laptop: "",
    server: "",
  });
  const [msg, setMsg] = useState("");

  const remaining = useMemo(() => {
    const used = new Set(Object.values(placed).filter(Boolean));
    return PARTS.filter((p) => !used.has(p.id));
  }, [placed]);

  function assign(slot: Slot, partId: string) {
    setPlaced((prev) => {
      const next = { ...prev };
      (Object.keys(next) as Slot[]).forEach((s) => {
        if (next[s] === partId) next[s] = "";
      });
      next[slot] = partId;
      return next;
    });
    setMsg("");
  }

  function check() {
    const misses: string[] = [];
    for (const slot of SLOTS) {
      const partId = placed[slot.id];
      if (!partId) {
        misses.push(`${slot.title}: empty`);
        continue;
      }
      if (WANT[slot.id] !== partId) {
        const part = PARTS.find((p) => p.id === partId);
        misses.push(
          `${slot.title}: ${part?.label ?? partId} is wrong — ${part?.note ?? ""}`,
        );
      }
    }
    if (misses.length) {
      setMsg(misses.join(" "));
      return;
    }
    setMsg(
      "Desktop gets the matched DDR4 DIMM kit in the channel pair, laptop gets SODIMM, server gets ECC. Wrong-generation DDR5, SODIMM adapters, and non-ECC RGB stay on the bench.",
    );
    markSolved();
  }

  return (
    <div className="space-y-3 text-sm">
      <LabStatus
        solved={solved}
        mission="Match RAM form factor, DDR generation, and ECC to each platform. Leave incompatible parts unused."
      />
      <p className="text-muted-foreground">
        Ticket queue: finish three memory installs — dual-channel desktop,
        laptop SODIMM upgrade, and ECC for a hypervisor host. Wrong form
        factor, wrong DDR generation, or non-ECC where ECC is required fails
        the check.
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        {SLOTS.map((slot) => {
          const part = PARTS.find((p) => p.id === placed[slot.id]);
          return (
            <fieldset key={slot.id} className="rounded border p-2">
              <legend className="font-medium">{slot.title}</legend>
              <p className="mt-1 text-xs text-muted-foreground">{slot.hint}</p>
              <select
                className="mt-2 min-h-11 w-full rounded-md border bg-background px-2"
                value={placed[slot.id]}
                onChange={(e) => assign(slot.id, e.target.value)}
                aria-label={`Module for ${slot.title}`}
              >
                <option value="">Select module</option>
                {part ? (
                  <option value={part.id}>{part.label}</option>
                ) : null}
                {remaining.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
              {part ? (
                <p className="mt-2 text-xs text-muted-foreground">{part.note}</p>
              ) : null}
            </fieldset>
          );
        })}
      </div>
      <div className="rounded border bg-muted/40 p-2">
        <p className="font-medium">Modules still on the bench</p>
        <ul className="mt-1 list-disc pl-5 text-xs text-muted-foreground">
          {remaining.length === 0 ? (
            <li>All modules assigned — verify form factor, DDR gen, and ECC before you check.</li>
          ) : (
            remaining.map((p) => (
              <li key={p.id}>
                {p.label} — {p.note}
              </li>
            ))
          )}
        </ul>
      </div>
      <Button size="sm" className="min-h-11" onClick={check} disabled={solved}>
        Check RAM plan
      </Button>
      {msg ? <p className="text-sm leading-6">{msg}</p> : null}
    </div>
  );
}
