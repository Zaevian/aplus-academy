"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { LabStatus, useSolved } from "@/components/labs/lab-kit";

type Ticket = "crimp" | "punch" | "tone" | "analyze";

const CHOICES: {
  id: string;
  label: string;
  fits: Ticket | null;
  note: string;
}[] = [
  {
    id: "crimper",
    label: "RJ45 crimper + plugs — terminate the patch cable ends",
    fits: "crimp",
    note: "Crimpers put 8P8C plugs on stranded/solid patch ends. Wrong tool for a punchdown block.",
  },
  {
    id: "punchdown",
    label: "Punchdown tool on the patch panel / 110 block",
    fits: "punch",
    note: "Horizontal cable lands on IDC with a punchdown — not an RJ45 crimp at the panel.",
  },
  {
    id: "toner",
    label: "Toner + probe to find the unlabeled drop",
    fits: "tone",
    note: "Tone the run so you can hear which jack/panel port is the mystery cable.",
  },
  {
    id: "wifi-analyzer",
    label: "Wi-Fi analyzer for channel overlap / weak RSSI",
    fits: "analyze",
    note: "Spectrum and SSIDs — not a copper open. Use when RF is the complaint.",
  },
  {
    id: "loopback-for-wifi",
    label: "RJ45 loopback plug to fix overlapping 2.4 GHz channels",
    fits: null,
    note: "Loopback proves a NIC/port locally. It does nothing for Wi-Fi channel planning.",
  },
  {
    id: "tap-for-crimp",
    label: "Network tap / SPAN to terminate a new Cat6 drop",
    fits: null,
    note: "Taps copy packets for analysis. Termination needs crimper or punchdown, not a tap.",
  },
];

const TICKETS: { id: Ticket; title: string; hint: string }[] = [
  {
    id: "crimp",
    title: "Custom 3 ft patch — open on pin 3 after a hasty end",
    hint: "You cut the cord short at the desk. Need new plugs on both ends.",
  },
  {
    id: "punch",
    title: "Closet: horizontal cable sits loose above the panel",
    hint: "Solid cable must land on IDC. Grabbing RJ45 plugs for the panel is the common miss.",
  },
  {
    id: "tone",
    title: "Wall jack works; nobody labeled the patch panel",
    hint: "Find which panel port is this drop before you move VLANs. Hearing the tone is the point.",
  },
  {
    id: "analyze",
    title: "Lobby Wi-Fi slow; three APs on channel 6",
    hint: "Copper testers will look fine. You need RF evidence of overlap and weak signal.",
  },
];

const WANT: Record<Ticket, string> = {
  crimp: "crimper",
  punch: "punchdown",
  tone: "toner",
  analyze: "wifi-analyzer",
};

export function NetworkToolsLab({ lab, onSolved }: LabSimProps) {
  void lab;
  const { solved, markSolved } = useSolved(onSolved);
  const [placed, setPlaced] = useState<Record<Ticket, string>>({
    crimp: "",
    punch: "",
    tone: "",
    analyze: "",
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
      "Crimper for patch plugs, punchdown for panel IDC, toner for unlabeled runs, Wi-Fi analyzer for channel overlap. Loopback-for-Wi-Fi and tap-for-crimp stay unused.",
    );
    markSolved();
  }

  return (
    <div className="space-y-3 text-sm">
      <LabStatus
        solved={solved}
        mission="Match each networking-tools ticket to the right tool. Leave loopback-for-Wi-Fi and tap-for-crimp unused."
      />
      <p className="text-muted-foreground">
        CompTIA 2.8 is symptom → tool: terminate, punch, tone, test, loop back,
        analyze RF, or tap — not one toolbox for every fault.
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
                <option value="">Select tool</option>
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
        Check tool matches
      </Button>
      {msg ? <p className="text-sm leading-6">{msg}</p> : null}
    </div>
  );
}
