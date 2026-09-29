"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { LabStatus, useSolved } from "@/components/labs/lab-kit";

type Ticket = "nfc" | "dock" | "replicator" | "headset";

const CHOICES: {
  id: string;
  label: string;
  fits: Ticket | null;
  note: string;
}[] = [
  {
    id: "nfc-tap",
    label: "Enable NFC / tap-to-pair (short-range)",
    fits: "nfc",
    note: "NFC is centimeters, not rooms — badge taps and Android Beam–style pairing live here.",
  },
  {
    id: "tb-dock",
    label: "Thunderbolt / USB-C dock with PD charging + dual display + Ethernet",
    fits: "dock",
    note: "A real dock replaces the desk: power delivery, video, LAN, often a latch.",
  },
  {
    id: "port-rep",
    label: "USB hub / port replicator (ports only, no laptop charge)",
    fits: "replicator",
    note: "Multiplies ports; if the laptop still drains on the brick, it is not meeting PD as a dock.",
  },
  {
    id: "bt-headset",
    label: "Bluetooth headset — verify A2DP / Hands-Free profile + default device",
    fits: "headset",
    note: "Paired with no audio is usually profile or OS default output, not a dead WLAN card.",
  },
  {
    id: "wlan-for-pen",
    label: "Replace the M.2 WLAN card because the stylus draws offset",
    fits: null,
    note: "Pen offset is digitizer calibration — not a Wi-Fi FRU.",
  },
  {
    id: "lightning-android",
    label: "Lightning cable for a USB-C Android phone",
    fits: null,
    note: "Lightning is Apple proprietary. USB-C Android wants USB-C (or a correct adapter).",
  },
];

const TICKETS: { id: Ticket; title: string; hint: string }[] = [
  {
    id: "nfc",
    title: "Badge tap at the door reader",
    hint: "User holds the phone centimeters from a reader. Bluetooth stays on but the tap does nothing until a short-range radio is enabled.",
  },
  {
    id: "dock",
    title: "Standing desk: charge + two monitors + Ethernet",
    hint: "One cable must power the laptop, drive dual displays, and give wired LAN. A four-port hub will not cut it.",
  },
  {
    id: "replicator",
    title: "Travel hub: extra USB only, battery still drops",
    hint: "Need more ports on the plane. Laptop keeps discharging while 'docked.' Pick the accessory class that matches.",
  },
  {
    id: "headset",
    title: "Pairs but meeting audio is silent",
    hint: "Bluetooth shows connected. Built-in speakers still play. FIRST focus is profile / default output — not new antennas.",
  },
];

const WANT: Record<Ticket, string> = {
  nfc: "nfc-tap",
  dock: "tb-dock",
  replicator: "port-rep",
  headset: "bt-headset",
};

export function MobileAccessoriesLab({ lab, onSolved }: LabSimProps) {
  void lab;
  const { solved, markSolved } = useSolved(onSolved);
  const [placed, setPlaced] = useState<Record<Ticket, string>>({
    nfc: "",
    dock: "",
    replicator: "",
    headset: "",
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
      "NFC for the badge tap, Thunderbolt/USB-C dock for charge+displays+LAN, port replicator when ports multiply without PD, Bluetooth profile/default for silent headsets. WLAN-for-pen and Lightning-on-Android stay unused.",
    );
    markSolved();
  }

  return (
    <div className="space-y-3 text-sm">
      <LabStatus
        solved={solved}
        mission="Match each accessory / connectivity ticket to the right fix. Leave WLAN-for-pen and Lightning-on-Android unused."
      />
      <p className="text-muted-foreground">
        CompTIA 1.2 separates docks from port replicators, NFC from Bluetooth
        range, and accessory buses from FRUs that do not belong on the ticket.
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
                <option value="">Select accessory / action</option>
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
        Check accessory matches
      </Button>
      {msg ? <p className="text-sm leading-6">{msg}</p> : null}
    </div>
  );
}
