"use client";

import { useState } from "react";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { LabStatus, useSolved } from "@/components/labs/lab-kit";

const HOTSPOTS = [
  {
    id: "pc",
    label: "Desktop PC",
    x: "12%",
    y: "40%",
    body: "Local compute: CPU, RAM, storage, PSU, expansion. Core 1 hardware lives here. ESD before you open it.",
  },
  {
    id: "laptop",
    label: "Laptop",
    x: "32%",
    y: "28%",
    body: "Same ideas, worse serviceability. SODIMM, battery chemistry, antennas in the display bezel.",
  },
  {
    id: "closet",
    label: "Network closet",
    x: "52%",
    y: "38%",
    body: "ONT/modem, router, switch, patch panel, AP. Packets do not 'go to Wi-Fi' as a cloud — they hit a radio on a LAN port.",
  },
  {
    id: "printer",
    label: "Printer",
    x: "72%",
    y: "48%",
    body: "A networked computer that eats paper. Firmware, language (PCL/PS), and mechanical path all fail differently.",
  },
  {
    id: "phone",
    label: "Phone",
    x: "28%",
    y: "68%",
    body: "Radios, eSIM, MDM, and a battery that can swell. Treat it as a computer, not an accessory.",
  },
  {
    id: "cloud",
    label: "Cloud",
    x: "78%",
    y: "22%",
    body: "Someone else's computer, metered. Shared responsibility: you still own identity, data classification, and the endpoint.",
  },
];

export function LandscapeLab({ lab, onSolved }: LabSimProps) {
  void lab;
  const { solved, markSolved } = useSolved(onSolved);
  const [active, setActive] = useState(HOTSPOTS[0]!.id);
  const [seen, setSeen] = useState<string[]>([HOTSPOTS[0]!.id]);
  const current = HOTSPOTS.find((h) => h.id === active)!;

  function open(id: string) {
    setActive(id);
    setSeen((s) => {
      const next = s.includes(id) ? s : [...s, id];
      if (next.length === HOTSPOTS.length) markSolved();
      return next;
    });
  }

  return (
    <div className="space-y-3">
      <LabStatus
        solved={solved}
        mission="Click every hotspot. Each one must change the description below."
      />
      <div className="relative h-56 rounded-md border bg-muted/30">
        {HOTSPOTS.map((h) => (
          <button
            key={h.id}
            type="button"
            onClick={() => open(h.id)}
            style={{ left: h.x, top: h.y }}
            className={`absolute min-h-11 -translate-x-1/2 -translate-y-1/2 rounded-full border bg-background px-2 py-1 text-[11px] focus-visible:ring-3 focus-visible:ring-ring/50 ${
              active === h.id ? "ring-2 ring-foreground" : ""
            }`}
          >
            {h.label}
          </button>
        ))}
      </div>
      <p className="text-sm leading-6" data-testid="landscape-body">
        <span className="font-medium">{current.label}. </span>
        {current.body}
      </p>
      <p className="text-xs text-muted-foreground">
        Visited {seen.length}/{HOTSPOTS.length}
      </p>
    </div>
  );
}
