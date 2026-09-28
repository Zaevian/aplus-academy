"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { LabStatus, useSolved } from "@/components/labs/lab-kit";

type Slot = "ram" | "battery" | "wlan";

const PARTS: { id: string; label: string; fits: Slot | null; note: string }[] = [
  {
    id: "sodimm-ddr4",
    label: "SODIMM DDR4-3200 (notebook)",
    fits: "ram",
    note: "Laptop memory is SODIMM, not full-size DIMM.",
  },
  {
    id: "dimm-ddr4",
    label: "DIMM DDR4-3200 (desktop)",
    fits: null,
    note: "Desktop DIMMs do not fit laptop SODIMM slots.",
  },
  {
    id: "li-ion-pack",
    label: "OEM Li-ion battery pack (swollen-safe replacement)",
    fits: "battery",
    note: "Replace a swollen pack; do not puncture or charge it further.",
  },
  {
    id: "cmos-coin",
    label: "CR2032 CMOS coin cell",
    fits: null,
    note: "CMOS keeps BIOS settings; it is not the main system battery.",
  },
  {
    id: "m2-wifi",
    label: "M.2 2230 Wi-Fi/Bluetooth card + antenna leads",
    fits: "wlan",
    note: "WLAN cards seat in M.2; antennas route to the display bezel.",
  },
  {
    id: "rj45-nic",
    label: "PCIe x1 desktop Ethernet NIC",
    fits: null,
    note: "A desktop PCIe NIC does not belong in a laptop WLAN slot.",
  },
];

const SLOTS: { id: Slot; title: string; hint: string }[] = [
  {
    id: "ram",
    title: "Memory bay",
    hint: "User wants more RAM after constant disk thrashing with many browser tabs.",
  },
  {
    id: "battery",
    title: "Battery bay",
    hint: "Chassis is slightly warped near the touchpad; battery is warm and swollen.",
  },
  {
    id: "wlan",
    title: "Wireless card",
    hint: "No networks listed after a drop; antennas still present in the lid.",
  },
];

const WANT: Record<Slot, string> = {
  ram: "sodimm-ddr4",
  battery: "li-ion-pack",
  wlan: "m2-wifi",
};

export function LaptopUpgradeLab({ lab, onSolved }: LabSimProps) {
  void lab;
  const { solved, markSolved } = useSolved(onSolved);
  const [placed, setPlaced] = useState<Record<Slot, string>>({
    ram: "",
    battery: "",
    wlan: "",
  });
  const [msg, setMsg] = useState("");

  const remaining = useMemo(() => {
    const used = new Set(Object.values(placed).filter(Boolean));
    return PARTS.filter((p) => !used.has(p.id));
  }, [placed]);

  function assign(slot: Slot, partId: string) {
    setPlaced((prev) => {
      const next = { ...prev };
      // Free any slot that already held this part.
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
      "SODIMM in the memory bay, OEM Li-ion pack in the battery bay, M.2 Wi-Fi with antennas on the WLAN slot. Desktop DIMM, CMOS coin, and PCIe NIC stay on the bench.",
    );
    markSolved();
  }

  return (
    <div className="space-y-3 text-sm">
      <LabStatus
        solved={solved}
        mission="Assign the correct field-replaceable unit to each laptop bay. Leave desktop-only parts unused."
      />
      <p className="text-muted-foreground">
        Ticket: upgrade a serviceable business laptop — more RAM, safe battery
        swap after swell, and a failed WLAN card. Match parts to bays; wrong form
        factors fail the check.
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
                aria-label={`Part for ${slot.title}`}
              >
                <option value="">Select part</option>
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
        <p className="font-medium">Parts still on the bench</p>
        <ul className="mt-1 list-disc pl-5 text-xs text-muted-foreground">
          {remaining.length === 0 ? (
            <li>All parts assigned — verify form factors before you check.</li>
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
        Check upgrade plan
      </Button>
      {msg ? <p className="text-sm leading-6">{msg}</p> : null}
    </div>
  );
}
