"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { LabStatus, useSolved } from "@/components/labs/lab-kit";

type Ticket = "x86" | "vram" | "iso" | "impact";

const CHOICES: {
  id: string;
  label: string;
  fits: Ticket | null;
  note: string;
}[] = [
  {
    id: "wow64",
    label: "Install the 32-bit (x86) build — WoW64 on 64-bit Windows",
    fits: "x86",
    note: "64-bit Windows still runs many 32-bit apps. Match the vendor build.",
  },
  {
    id: "gpu-vram",
    label: "Check dedicated GPU + VRAM against the vendor matrix",
    fits: "vram",
    note: "Integrated graphics often fail CAD minimums even if CPU/RAM look fine.",
  },
  {
    id: "iso-media",
    label: "Mount or burn the ISO — offline/physical distribution",
    fits: "iso",
    note: "ISO is the image. Download vs USB vs volume image are different channels.",
  },
  {
    id: "change-window",
    label: "Schedule install in a change window — no mid-close reboot",
    fits: "impact",
    note: "Business impact: reboot, downtime, and who is blocked.",
  },
  {
    id: "force-x64",
    label: "Force the 64-bit MSI even when the vendor ships only x86",
    fits: null,
    note: "Wrong architecture fails or corrupts. Use the supported build.",
  },
  {
    id: "ignore-vram",
    label: "Skip VRAM checks — claim system RAM is the same thing",
    fits: null,
    note: "System RAM is not VRAM. GPU memory is a separate requirement.",
  },
];

const TICKETS: { id: Ticket; title: string; hint: string }[] = [
  {
    id: "x86",
    title: "Legacy 32-bit line-of-business app on a 64-bit Windows host",
    hint: "Architecture compatibility, not buy a new PC.",
  },
  {
    id: "vram",
    title: "CAD trial needs a dedicated GPU with enough VRAM",
    hint: "Graphics memory requirement before install.",
  },
  {
    id: "iso",
    title: "Offline installer delivered as a disk image file",
    hint: "ISO as distribution method.",
  },
  {
    id: "impact",
    title: "Finance says a silent install must not reboot mid-close",
    hint: "Business/operation impact of the install.",
  },
];

const WANT: Record<Ticket, string> = {
  x86: "wow64",
  vram: "gpu-vram",
  iso: "iso-media",
  impact: "change-window",
};

export function AppInstallLab({ lab, onSolved }: LabSimProps) {
  void lab;
  const { solved, markSolved } = useSolved(onSolved);
  const [placed, setPlaced] = useState<Record<Ticket, string>>({
    x86: "",
    vram: "",
    iso: "",
    impact: "",
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
    setMsg("x86/WoW64 for legacy 32-bit, dedicated GPU+VRAM for CAD, ISO for offline media, change window for business impact. Force-x64 and ignore-VRAM stay unused.");
    markSolved();
  }

  return (
    <div className="space-y-3 text-sm">
      <LabStatus solved={solved} mission="Match each app-install ticket. Leave force-x64 and ignore-VRAM unused." />
      <p className="text-muted-foreground">CompTIA 1.10 is prerequisites: 32/64-bit, GPU/VRAM, RAM/CPU/storage, tokens, OS compatibility, distribution method, and business impact.</p>
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
        Check application install matches
      </Button>
      {msg ? <p className="text-sm leading-6">{msg}</p> : null}
    </div>
  );
}
