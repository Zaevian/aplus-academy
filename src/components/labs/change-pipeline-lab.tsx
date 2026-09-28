"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { LabStatus, useSolved } from "@/components/labs/lab-kit";

type ChangeKind = "standard" | "normal" | "emergency";

type Ticket = {
  id: string;
  title: string;
  detail: string;
  kind: ChangeKind;
  freezeOk: boolean;
  rollback: string;
};

const TICKETS: Ticket[] = [
  {
    id: "ram-sop",
    title: "Replace failed SODIMM on a known laptop model",
    detail:
      "Follow the published image SOP. Low risk, done weekly. Freeze week is active but this is the pre-approved RAM path.",
    kind: "standard",
    freezeOk: true,
    rollback: "Reseat the old known-good SODIMM from the antistatic bag.",
  },
  {
    id: "voip-vlan",
    title: "Add VLAN 40 for VoIP on wiring closet 2",
    detail:
      "New data-plane scope, affects the floor, needs CMDB owners and a Saturday window. Not an outage yet.",
    kind: "normal",
    freezeOk: false,
    rollback: "Delete VLAN 40 and restore the switch startup-config taken before the change.",
  },
  {
    id: "ransom-block",
    title: "Block C2 domain after confirmed ransomware beacon",
    detail:
      "Warehouse PCs are calling out now. Security duty manager is on the emergency bridge.",
    kind: "emergency",
    freezeOk: true,
    rollback: "Remove the emergency block rule and restore the prior firewall candidate config.",
  },
];

const KIND_OPTIONS: { id: ChangeKind; label: string }[] = [
  { id: "standard", label: "Standard — pre-approved SOP, still document" },
  { id: "normal", label: "Normal — CAB / change board before implement" },
  { id: "emergency", label: "Emergency — outage/exploit; paperwork catches up" },
];

const BAD_ROLLBACKS = [
  "We'll figure it out if something breaks.",
  "Reboot twice and hope DNS caches clear.",
  "Skip the backup — it slows the window.",
  "Open a second unapproved change during the freeze to 'fix the fix.'",
];

const GOOD_BY_TICKET: Record<string, string> = Object.fromEntries(
  TICKETS.map((t) => [t.id, t.rollback]),
);

export function ChangePipelineLab({ lab, onSolved }: LabSimProps) {
  void lab;
  const { solved, markSolved } = useSolved(onSolved);
  const [kinds, setKinds] = useState<Record<string, ChangeKind | "">>({
    "ram-sop": "",
    "voip-vlan": "",
    "ransom-block": "",
  });
  const [rollbacks, setRollbacks] = useState<Record<string, string>>({
    "ram-sop": "",
    "voip-vlan": "",
    "ransom-block": "",
  });
  const [msg, setMsg] = useState("");

  const rollbackChoices = useMemo(() => {
    const goods = TICKETS.map((t) => t.rollback);
    return [...goods, ...BAD_ROLLBACKS];
  }, []);

  function check() {
    const misses: string[] = [];
    for (const ticket of TICKETS) {
      if (kinds[ticket.id] !== ticket.kind) {
        misses.push(
          `${ticket.title}: wrong type — expect ${ticket.kind} (freeze-ok=${ticket.freezeOk ? "yes" : "only if emergency/standard SOP"}).`,
        );
      }
      if (rollbacks[ticket.id] !== GOOD_BY_TICKET[ticket.id]) {
        misses.push(
          `${ticket.title}: rollback must be a written reverse procedure, not hope.`,
        );
      }
    }
    // Freeze judgment: VoIP during freeze must stay normal (CAB waits), not emergency.
    if (kinds["voip-vlan"] === "emergency") {
      misses.push(
        "VoIP VLAN is not an emergency just because a freeze is inconvenient — wait for the window or true outage.",
      );
    }
    if (misses.length) {
      setMsg(misses.join(" "));
      return;
    }
    setMsg(
      "Standard RAM follows the SOP (document, freeze-safe). VoIP VLAN is a normal change — CAB, window, written rollback — and waits out a freeze. Ransomware block is emergency with a real reverse rule, then documentation.",
    );
    markSolved();
  }

  return (
    <div className="space-y-3 text-sm">
      <LabStatus
        solved={solved}
        mission="Classify each request (standard / normal / emergency), then pick a real rollback — not 'we'll figure it out.'"
      />
      <p className="text-muted-foreground">
        Change freeze is active for quarter-close. Only standard SOP work and true
        emergencies proceed; normal changes wait for a maintenance window and CAB.
      </p>
      <div className="space-y-3">
        {TICKETS.map((ticket) => (
          <fieldset key={ticket.id} className="rounded border p-3">
            <legend className="font-medium">{ticket.title}</legend>
            <p className="mt-1 text-xs text-muted-foreground">{ticket.detail}</p>
            <label className="mt-2 block text-xs font-medium" htmlFor={`${ticket.id}-kind`}>
              Change type
            </label>
            <select
              id={`${ticket.id}-kind`}
              className="mt-1 min-h-11 w-full rounded-md border bg-background px-2"
              value={kinds[ticket.id]}
              onChange={(e) =>
                setKinds((prev) => ({
                  ...prev,
                  [ticket.id]: e.target.value as ChangeKind | "",
                }))
              }
              aria-label={`Change type for ${ticket.title}`}
            >
              <option value="">Select type</option>
              {KIND_OPTIONS.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
            <label
              className="mt-2 block text-xs font-medium"
              htmlFor={`${ticket.id}-rb`}
            >
              Rollback plan
            </label>
            <select
              id={`${ticket.id}-rb`}
              className="mt-1 min-h-11 w-full rounded-md border bg-background px-2"
              value={rollbacks[ticket.id]}
              onChange={(e) =>
                setRollbacks((prev) => ({
                  ...prev,
                  [ticket.id]: e.target.value,
                }))
              }
              aria-label={`Rollback for ${ticket.title}`}
            >
              <option value="">Select rollback</option>
              {rollbackChoices.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </fieldset>
        ))}
      </div>
      <Button size="sm" className="min-h-11" onClick={check} disabled={solved}>
        Check change pipeline
      </Button>
      {msg ? <p className="text-sm leading-6">{msg}</p> : null}
    </div>
  );
}
