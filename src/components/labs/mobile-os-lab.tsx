"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { LabStatus, useSolved } from "@/components/labs/lab-kit";

type TicketId = "app-crash" | "os-update" | "battery" | "rotate";

const ACTIONS: { id: string; label: string; note: string }[] = [
  {
    id: "force-stop-cache",
    label: "Force-stop the app, then clear cache (not data)",
    note: "One-app crash/launch: scoped, reversible steps before reinstall.",
  },
  {
    id: "free-space-charge",
    label: "Free several GB, plug in / charge, retry on Wi-Fi",
    note: "OS/app updates stall on storage, charge, or metered/captive Wi-Fi.",
  },
  {
    id: "battery-usage",
    label: "Open Battery usage and restrict the named greedy app",
    note: "Software drain shows on the OS battery screen — fix the app first.",
  },
  {
    id: "rotation-lock",
    label: "Toggle rotation lock / Control Center orientation lock off",
    note: "Number-one autorotate miss before sensors or digitizer guesses.",
  },
  {
    id: "factory-reset",
    label: "Factory reset immediately with no backup",
    note: "Last on the ladder; not FIRST for a single app or a software lock.",
  },
  {
    id: "replace-battery",
    label: "Replace the battery with no usage evidence",
    note: "Hardware swap after software inventory — not a blind FIRST.",
  },
  {
    id: "jailbreak",
    label: "Jailbreak / root so the 'fix' can apply",
    note: "Creates a 3.3 security incident; never an A+ mobile-OS fix.",
  },
  {
    id: "replace-digitizer",
    label: "Replace the digitizer / accelerometer FIRST",
    note: "Hardware after rotation lock, app scope, and case magnets.",
  },
];

const TICKETS: {
  id: TicketId;
  title: string;
  hint: string;
  want: string;
}[] = [
  {
    id: "app-crash",
    title: "Ticket A — single app crash",
    hint: "Only the banking app crashes on open. Mail and browser are fine. Storage has 12 GB free.",
    want: "force-stop-cache",
  },
  {
    id: "os-update",
    title: "Ticket B — OS update stall",
    hint: "iOS/Android update stuck at Preparing. Phone has 220 MB free and 18% battery on cellular.",
    want: "free-space-charge",
  },
  {
    id: "battery",
    title: "Ticket C — overnight drain",
    hint: "Dead by morning. Battery screen shows one mail client at 61% overnight; health is 94%.",
    want: "battery-usage",
  },
  {
    id: "rotate",
    title: "Ticket D — no autorotate",
    hint: "Every app stays portrait. User denies a drop. Control Center has not been checked.",
    want: "rotation-lock",
  },
];

export function MobileOsLab({ lab, onSolved }: LabSimProps) {
  void lab;
  const { solved, markSolved } = useSolved(onSolved);
  const [placed, setPlaced] = useState<Record<TicketId, string>>({
    "app-crash": "",
    "os-update": "",
    battery: "",
    rotate: "",
  });
  const [msg, setMsg] = useState("");

  const remaining = useMemo(() => {
    const used = new Set(Object.values(placed).filter(Boolean));
    return ACTIONS.filter((a) => !used.has(a.id));
  }, [placed]);

  function assign(ticket: TicketId, actionId: string) {
    setPlaced((prev) => {
      const next = { ...prev };
      (Object.keys(next) as TicketId[]).forEach((t) => {
        if (next[t] === actionId) next[t] = "";
      });
      next[ticket] = actionId;
      return next;
    });
    setMsg("");
  }

  function check() {
    const misses: string[] = [];
    for (const ticket of TICKETS) {
      const actionId = placed[ticket.id];
      if (!actionId) {
        misses.push(`${ticket.title}: empty`);
        continue;
      }
      if (ticket.want !== actionId) {
        const action = ACTIONS.find((a) => a.id === actionId);
        misses.push(
          `${ticket.title}: ${action?.label ?? actionId} is wrong — ${action?.note ?? ""}`,
        );
      }
    }
    if (misses.length) {
      setMsg(misses.join(" "));
      return;
    }
    setMsg(
      "One-app crash → force-stop/clear cache. Update stall → space + charge + Wi-Fi. Overnight drain → Battery usage on the named app. No rotate → rotation lock first. Factory reset, blind battery swap, jailbreak, and digitizer FIRST stay on the bench.",
    );
    markSolved();
  }

  return (
    <div className="space-y-3 text-sm">
      <LabStatus
        solved={solved}
        mission="Match each mobile OS symptom to the BEST FIRST software action. Leave destructive and hardware-first distractors unused."
      />
      <p className="text-muted-foreground">
        Help-desk queue: four phones, four complaints. Scope the app, name the
        radio or sensor setting, and read Battery usage before you wipe or
        replace parts.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {TICKETS.map((ticket) => {
          const action = ACTIONS.find((a) => a.id === placed[ticket.id]);
          return (
            <fieldset key={ticket.id} className="rounded border p-2">
              <legend className="font-medium">{ticket.title}</legend>
              <p className="mt-1 text-xs text-muted-foreground">{ticket.hint}</p>
              <select
                className="mt-2 min-h-11 w-full rounded-md border bg-background px-2"
                value={placed[ticket.id]}
                onChange={(e) => assign(ticket.id, e.target.value)}
                aria-label={`FIRST action for ${ticket.title}`}
              >
                <option value="">Select FIRST action</option>
                {action ? (
                  <option value={action.id}>{action.label}</option>
                ) : null}
                {remaining.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.label}
                  </option>
                ))}
              </select>
              {action ? (
                <p className="mt-2 text-xs text-muted-foreground">{action.note}</p>
              ) : null}
            </fieldset>
          );
        })}
      </div>
      <div className="rounded border bg-muted/40 p-2">
        <p className="font-medium">Actions still on the board</p>
        <ul className="mt-1 list-disc pl-5 text-xs text-muted-foreground">
          {remaining.length === 0 ? (
            <li>
              All actions assigned — verify scope (one app vs whole OS) before
              you check.
            </li>
          ) : (
            remaining.map((a) => (
              <li key={a.id}>
                {a.label} — {a.note}
              </li>
            ))
          )}
        </ul>
      </div>
      <Button size="sm" className="min-h-11" onClick={check} disabled={solved}>
        Check mobile triage
      </Button>
      {msg ? <p className="text-sm leading-6">{msg}</p> : null}
    </div>
  );
}
