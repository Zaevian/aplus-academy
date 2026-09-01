"use client";

import { useState } from "react";
import type { Lab } from "@/content/schema";

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

export function LandscapeLab({ lab }: { lab: Lab }) {
  void lab;
  const [active, setActive] = useState(HOTSPOTS[0]!.id);
  const current = HOTSPOTS.find((h) => h.id === active)!;
  return (
    <div className="space-y-3">
      <div className="relative h-56 rounded-md border bg-muted/30">
        {HOTSPOTS.map((h) => (
          <button
            key={h.id}
            type="button"
            onClick={() => setActive(h.id)}
            style={{ left: h.x, top: h.y }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border bg-background px-2 py-1 text-[11px] ${
              active === h.id ? "ring-2 ring-foreground" : ""
            }`}
          >
            {h.label}
          </button>
        ))}
      </div>
      <p className="text-sm leading-6">
        <span className="font-medium">{current.label}. </span>
        {current.body}
      </p>
    </div>
  );
}
