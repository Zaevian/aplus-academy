"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { LabStatus, useSolved } from "@/components/labs/lab-kit";

type Ticket = "ups" | "surge" | "msds" | "humidity";

const CHOICES: {
  id: string;
  label: string;
  fits: Ticket | null;
  note: string;
}[] = [
  {
    id: "ups-battery",
    label: "UPS with battery runtime for brownout / short blackout",
    fits: "ups",
    note: "Surge strips do not ride through sag or outage. Servers and telco gear need a UPS.",
  },
  {
    id: "surge-only",
    label: "Surge suppressor for spike protection (no battery needed)",
    fits: "surge",
    note: "Printers/monitors on a clean desk often need surge only — do not waste UPS VA on every lamp.",
  },
  {
    id: "msds-toner",
    label: "Follow SDS/MSDS for toner/battery disposal + PPE",
    fits: "msds",
    note: "Toner and lithium are not office trash. SDS dictates PPE and disposal path.",
  },
  {
    id: "humidity-esd",
    label: "Raise humidity / control ESD in the dry closet; clear vents",
    fits: "humidity",
    note: "Very low humidity invites ESD; blocked vents cook gear. Environment before blind part swaps.",
  },
  {
    id: "daisy-chain",
    label: "Daisy-chain UPS into a power strip into another UPS",
    fits: null,
    note: "Daisy-chaining UPS/strips is a fire and warranty problem. Feed UPS from the wall circuit.",
  },
  {
    id: "water-on-battery",
    label: "Dump water on a lithium pack fire 'like Class A trash'",
    fits: null,
    note: "Lithium and toner incidents follow SDS/fire class — not office-plant watering.",
  },
];

const TICKETS: { id: Ticket; title: string; hint: string }[] = [
  {
    id: "ups",
    title: "Rack drops every time the HVAC compressor kicks on",
    hint: "Voltage sags, then recovers. Need ride-through for the hypervisor host — not a $12 strip.",
  },
  {
    id: "surge",
    title: "Front-desk PC near a noisy laser; no runtime requirement",
    hint: "Protect from spikes. Battery runtime is overkill for this endpoint budget.",
  },
  {
    id: "msds",
    title: "Bucket of spent toner and swollen laptop cells in the closet",
    hint: "Facilities wants them gone today. Policy document and PPE beat tossing in the dumpster.",
  },
  {
    id: "humidity",
    title: "Winter closet: static shocks; dust cakes the intake",
    hint: "Environment ticket: humidity/ESD and airflow before you order another PSU.",
  },
];

const WANT: Record<Ticket, string> = {
  ups: "ups-battery",
  surge: "surge-only",
  msds: "msds-toner",
  humidity: "humidity-esd",
};

export function EnvironmentControlsLab({ lab, onSolved }: LabSimProps) {
  void lab;
  const { solved, markSolved } = useSolved(onSolved);
  const [placed, setPlaced] = useState<Record<Ticket, string>>({
    ups: "",
    surge: "",
    msds: "",
    humidity: "",
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
      "UPS for brownout/blackout ride-through, surge suppressor when no battery is needed, SDS for toner/battery disposal, humidity/vents for ESD/dust. Daisy-chain and water-on-lithium stay unused.",
    );
    markSolved();
  }

  return (
    <div className="space-y-3 text-sm">
      <LabStatus
        solved={solved}
        mission="Match each environmental / power ticket to the right control. Leave daisy-chain and water-on-lithium unused."
      />
      <p className="text-muted-foreground">
        CompTIA 4.5 separates UPS from surge, SDS disposal from dumpster habits,
        and humidity/dust/ESD from blind FRU swaps.
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
                <option value="">Select control</option>
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
        Check environment matches
      </Button>
      {msg ? <p className="text-sm leading-6">{msg}</p> : null}
    </div>
  );
}
