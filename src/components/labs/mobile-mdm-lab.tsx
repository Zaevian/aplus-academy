"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { LabStatus, useSolved } from "@/components/labs/lab-kit";

type Ticket = "esim" | "mdm" | "byod" | "cap";

const CHOICES: {
  id: string;
  label: string;
  fits: Ticket | null;
  note: string;
}[] = [
  {
    id: "esim-profile",
    label: "Install / activate the carrier eSIM profile (or reseat physical SIM)",
    fits: "esim",
    note: "No bars with Wi-Fi fine often means the cellular identity is missing — eSIM profile or SIM seat, not a new digitizer.",
  },
  {
    id: "mdm-enroll",
    label: "Enroll in MDM, push work profile / mail / passcode policy",
    fits: "mdm",
    note: "Corporate mail and compliance on a managed device start with enrollment, not a personal Gmail add-account.",
  },
  {
    id: "byod-selective",
    label: "Selective / work-container wipe — leave personal photos",
    fits: "byod",
    note: "BYOD departure: wipe the work container. Full-device wipe is for corporate-owned (or explicit consent).",
  },
  {
    id: "data-cap",
    label: "Check cellular data meter / hotspot cap; prefer Wi-Fi sync",
    fits: "cap",
    note: "Throttled or capped lines look like 'broken internet.' Syncing mail over cellular on a tiny plan creates the next ticket.",
  },
  {
    id: "full-wipe-byod",
    label: "Remote full-device wipe a personal BYOD phone without asking",
    fits: null,
    note: "Full wipe on BYOD destroys personal data. Prefer selective wipe / work profile remove unless policy + ownership say otherwise.",
  },
  {
    id: "wlan-for-gps",
    label: "Replace the M.2 WLAN card because maps show the wrong city",
    fits: null,
    note: "Location accuracy is GPS/location services (and Wi-Fi assist) — not a laptop WLAN FRU swap on a phone ticket.",
  },
];

const TICKETS: { id: Ticket; title: string; hint: string }[] = [
  {
    id: "esim",
    title: "New phone: Wi-Fi works, cellular data missing",
    hint: "Settings show no carrier name. Physical tray empty on an eSIM-capable model. FIRST identity fix, not a new screen.",
  },
  {
    id: "mdm",
    title: "Corp mail blocked until device is compliant",
    hint: "User added personal IMAP. Tenant requires passcode, encryption, and managed apps before Exchange.",
  },
  {
    id: "byod",
    title: "Contractor returns; personal photos must survive",
    hint: "Phone is theirs. Work profile had OneDrive and mail. Choose the wipe that matches ownership.",
  },
  {
    id: "cap",
    title: "Overnight sync blew the 2 GB hotspot plan",
    hint: "Mail and photos synced on cellular while camping. Meter and sync path matter more than a new SIM.",
  },
];

const WANT: Record<Ticket, string> = {
  esim: "esim-profile",
  mdm: "mdm-enroll",
  byod: "byod-selective",
  cap: "data-cap",
};

export function MobileMdmLab({ lab, onSolved }: LabSimProps) {
  void lab;
  const { solved, markSolved } = useSolved(onSolved);
  const [placed, setPlaced] = useState<Record<Ticket, string>>({
    esim: "",
    mdm: "",
    byod: "",
    cap: "",
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
      "eSIM/SIM for missing cellular identity, MDM enroll for corp compliance, selective wipe for BYOD return, data-cap/Wi-Fi sync for meter blowouts. Full-wipe-BYOD and WLAN-for-GPS stay unused.",
    );
    markSolved();
  }

  return (
    <div className="space-y-3 text-sm">
      <LabStatus
        solved={solved}
        mission="Match each mobile networking / MDM ticket to the right action. Leave full-wipe-BYOD and WLAN-for-GPS unused."
      />
      <p className="text-muted-foreground">
        CompTIA 1.3 separates radios and eSIM from MDM enrollment, BYOD
        selective wipe from corporate full wipe, and data caps from hardware FRUs.
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
                <option value="">Select action</option>
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
        Check MDM / cellular matches
      </Button>
      {msg ? <p className="text-sm leading-6">{msg}</p> : null}
    </div>
  );
}
