"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { LabStatus, useSolved } from "@/components/labs/lab-kit";

type Ticket = "ps1" | "bat" | "py" | "risk";

const CHOICES: {
  id: string;
  label: string;
  fits: Ticket | null;
  note: string;
}[] = [
  {
    id: "powershell",
    label: ".ps1 PowerShell — Windows automation/cmdlets",
    fits: "ps1",
    note: "Preferred modern Windows admin scripting when execution policy allows.",
  },
  {
    id: "batch",
    label: ".bat/.cmd batch — simple legacy logon mappings",
    fits: "bat",
    note: "Still common for drive maps; limited compared to PowerShell.",
  },
  {
    id: "python",
    label: ".py Python — cross-platform parsing/API glue",
    fits: "py",
    note: "Great for data/API tasks; runtime must be present and trusted.",
  },
  {
    id: "script-risk",
    label: "Treat unsolicited scripts as malware — do not run",
    fits: "risk",
    note: "Email .ps1/.js/.vbs are classic payloads. Quarantine and report.",
  },
  {
    id: "run-blind",
    label: "Run the emailed script elevated so it just works",
    fits: null,
    note: "Elevation plus unknown script is an incident, not troubleshooting.",
  },
  {
    id: "ps1-as-bat",
    label: "Rename .ps1 to .bat and double-click for compatibility",
    fits: null,
    note: "Extension tricks do not make PowerShell into batch — and hide intent.",
  },
];

const TICKETS: { id: Ticket; title: string; hint: string }[] = [
  {
    id: "ps1",
    title: "Automate Windows inventory with structured cmdlets",
    hint: "PowerShell script type.",
  },
  {
    id: "bat",
    title: "Legacy logon map drives with a classic command script",
    hint: "Batch .bat/.cmd.",
  },
  {
    id: "py",
    title: "Cross-platform parse of CSV into a ticket API",
    hint: "Python use case.",
  },
  {
    id: "risk",
    title: "User double-clicks an unknown .ps1 from email",
    hint: "Script malware / risk awareness.",
  },
];

const WANT: Record<Ticket, string> = {
  ps1: "powershell",
  bat: "batch",
  py: "python",
  risk: "script-risk",
};

export function ScriptingBasicsLab({ lab, onSolved }: LabSimProps) {
  void lab;
  const { solved, markSolved } = useSolved(onSolved);
  const [placed, setPlaced] = useState<Record<Ticket, string>>({
    ps1: "",
    bat: "",
    py: "",
    risk: "",
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
    setMsg("PowerShell for Windows automation, batch for legacy maps, Python for cross-platform glue, and treat unsolicited scripts as malware. Run-blind and rename-ps1 stay unused.");
    markSolved();
  }

  return (
    <div className="space-y-3 text-sm">
      <LabStatus solved={solved} mission="Match each scripting ticket. Leave run-blind and rename-ps1 unused." />
      <p className="text-muted-foreground">CompTIA 4.8 recognizes .bat/.ps1/.vbs/.sh/.js/.py use cases and the risk of malware, config drift, and resource exhaustion — never execute learner code server-side.</p>
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
                <option value="">Select match</option>
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
        Check scripting basics matches
      </Button>
      {msg ? <p className="text-sm leading-6">{msg}</p> : null}
    </div>
  );
}
