"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { LabStatus, useSolved } from "@/components/labs/lab-kit";

type Ticket = "power" | "firewall" | "indexing" | "explorer";

const CHOICES: {
  id: string;
  label: string;
  fits: Ticket | null;
  note: string;
}[] = [
  {
    id: "power-plan",
    label: "Power Options — balanced/high-performance, lid close, hibernate",
    fits: "power",
    note: "Docked overnight drain is often sleep vs hibernate and USB selective suspend.",
  },
  {
    id: "fw-profile",
    label: "Windows Firewall — private vs public profile rules",
    fits: "firewall",
    note: "Public is stricter. Wrong profile looks like a broken port.",
  },
  {
    id: "index-rebuild",
    label: "Indexing Options — include folders / rebuild catalog",
    fits: "indexing",
    note: "Huge unindexed trees make Start search crawl the disk every time.",
  },
  {
    id: "explorer-ext",
    label: "File Explorer Options — show file name extensions",
    fits: "explorer",
    note: "Hiding extensions is how .pdf.exe fools users. Show them.",
  },
  {
    id: "disable-fw",
    label: "Turn Windows Firewall off entirely for convenience",
    fits: null,
    note: "Never the A+ answer. Open the needed rule/profile instead.",
  },
  {
    id: "defrag-search",
    label: "Defrag the SSD nightly to speed Start search",
    fits: null,
    note: "SSDs do not want classic defrag; search needs indexing, not fragmentation theater.",
  },
];

const TICKETS: { id: Ticket; title: string; hint: string }[] = [
  {
    id: "power",
    title: "Laptop drains overnight on the dock",
    hint: "Sleep/hibernate and lid/power plans.",
  },
  {
    id: "firewall",
    title: "Home Wi-Fi blocks a needed game; corp profile was fine",
    hint: "Network profile + Windows Firewall rules.",
  },
  {
    id: "indexing",
    title: "File search is glacial after a big media dump",
    hint: "Search Indexer scope and rebuild.",
  },
  {
    id: "explorer",
    title: "Users cannot see extensions; malware .pdf.exe slips by",
    hint: "File Explorer Options — hidden extensions.",
  },
];

const WANT: Record<Ticket, string> = {
  power: "power-plan",
  firewall: "fw-profile",
  indexing: "index-rebuild",
  explorer: "explorer-ext",
};

export function WindowsSettingsLab({ lab, onSolved }: LabSimProps) {
  void lab;
  const { solved, markSolved } = useSolved(onSolved);
  const [placed, setPlaced] = useState<Record<Ticket, string>>({
    power: "",
    firewall: "",
    indexing: "",
    explorer: "",
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
    setMsg("Power plans for overnight drain, firewall profiles for home vs corp, indexing for slow search, show extensions against double extensions. Disable-firewall and SSD-defrag stay unused.");
    markSolved();
  }

  return (
    <div className="space-y-3 text-sm">
      <LabStatus solved={solved} mission="Match each Windows settings ticket. Leave disable-firewall and defrag-SSD unused." />
      <p className="text-muted-foreground">CompTIA 1.6 is Control Panel / Settings utilities: power, firewall profiles, indexing, and Explorer options techs actually change on tickets.</p>
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
        Check Windows settings matches
      </Button>
      {msg ? <p className="text-sm leading-6">{msg}</p> : null}
    </div>
  );
}
