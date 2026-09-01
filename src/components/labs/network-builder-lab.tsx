"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { LabStatus, useSolved } from "@/components/labs/lab-kit";

const SLOTS = ["ISP", "ONT/modem", "Router/firewall", "Switch", "LAN edge"] as const;
const PALETTE = [
  "ISP cloud",
  "ONT/modem",
  "Router/firewall",
  "Switch",
  "AP",
  "PC",
  "Printer",
  "AP on WAN",
] as const;

const WANT: Record<(typeof SLOTS)[number], string[]> = {
  ISP: ["ISP cloud"],
  "ONT/modem": ["ONT/modem"],
  "Router/firewall": ["Router/firewall"],
  Switch: ["Switch"],
  "LAN edge": ["AP", "PC", "Printer"],
};

export function NetworkBuilderLab({ lab, onSolved }: LabSimProps) {
  void lab;
  const { solved, markSolved } = useSolved(onSolved);
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [msg, setMsg] = useState("");

  function check() {
    const misses: string[] = [];
    for (const slot of SLOTS) {
      const got = placed[slot];
      if (!got || !WANT[slot].includes(got)) {
        misses.push(slot);
      }
    }
    if (placed["LAN edge"] === "AP on WAN") {
      setMsg("An AP belongs on switched LAN, not the WAN port. The WAN handoff stops at the modem/ONT.");
      return;
    }
    if (placed.Switch === "Router/firewall" || placed["Router/firewall"] === "Switch") {
      setMsg("The router is the LAN gateway and NAT boundary. The switch fans out after it, not before.");
      return;
    }
    if (misses.length) {
      setMsg(
        `Wrong or empty: ${misses.join(", ")}. Path is ISP → ONT/modem → router/firewall → switch → AP/PC/printer.`,
      );
      return;
    }
    setMsg("Path is correct. WAN terminates at the ONT/modem. APs and PCs sit on the switched LAN.");
    markSolved();
  }

  return (
    <div className="space-y-3 text-sm">
      <LabStatus
        solved={solved}
        mission="Place ISP → ONT/modem → router/firewall → switch → AP or endpoint. AP on WAN is a miss."
      />
      <div className="grid gap-2">
        {SLOTS.map((slot) => (
          <label key={slot} className="flex min-h-11 items-center gap-2">
            <span className="w-36 shrink-0 font-medium">{slot}</span>
            <select
              className="min-h-11 flex-1 rounded-md border bg-background px-2"
              value={placed[slot] ?? ""}
              onChange={(e) =>
                setPlaced((p) => ({ ...p, [slot]: e.target.value }))
              }
            >
              <option value="">Select device</option>
              {PALETTE.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>
      <Button size="sm" className="min-h-11" onClick={check}>
        Check closet
      </Button>
      {msg ? <p className="text-muted-foreground">{msg}</p> : null}
    </div>
  );
}
