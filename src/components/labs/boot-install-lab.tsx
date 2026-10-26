"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { LabStatus, useSolved } from "@/components/labs/lab-kit";

type Ticket = "clean" | "image" | "zerotouch" | "gpt";

const CHOICES: {
  id: string;
  label: string;
  fits: Ticket | null;
  note: string;
}[] = [
  {
    id: "clean-wipe",
    label: "Clean install — wipe partitions, fresh OS, no prior user state",
    fits: "clean",
    note: "Surplus/unknown machines and malware rebuilds start clean. Do not in-place upgrade a stranger's image.",
  },
  {
    id: "image-deploy",
    label: "Image / clone deploy — gold master to identical hardware class",
    fits: "image",
    note: "Sysprep/image pipelines stamp many PCs the same. Wrong for one-off repair of yesterday's desktop.",
  },
  {
    id: "autopilot-zt",
    label: "Zero-touch / Autopilot — cloud join + apps with no tech at the desk",
    fits: "zerotouch",
    note: "Ship sealed; user signs in; policies land. Not a USB stick walk-up for a single broken PC.",
  },
  {
    id: "gpt-uefi",
    label: "GPT + UEFI boot mode — required for large disks / Secure Boot path",
    fits: "gpt",
    note: "MBR wastes capacity on big disks and fights UEFI-only firmware. Match partition style to firmware.",
  },
  {
    id: "inplace-malware",
    label: "In-place upgrade to 'fix' a clearly infected surplus PC",
    fits: null,
    note: "Infection and unknown prior admins call for clean wipe — not preserving the old system volume.",
  },
  {
    id: "mbr-uefi",
    label: "Force MBR on a UEFI-only board because 'BIOS legacy is simpler'",
    fits: null,
    note: "UEFI-only firmware will not boot an MBR system disk. Fix mode/partition style, do not wish legacy back.",
  },
];

const TICKETS: { id: Ticket; title: string; hint: string }[] = [
  {
    id: "clean",
    title: "Surplus laptop from unknown prior owner; needs trusted OS",
    hint: "You do not trust the old install. Protect data by not keeping it.",
  },
  {
    id: "image",
    title: "Fleet of identical desktops needs the same gold build tonight",
    hint: "Many machines, one validated master — not 40 interactive Setups.",
  },
  {
    id: "zerotouch",
    title: "Ship laptops to remote hires; no on-site tech",
    hint: "Cloud identity + enrollment should finish without a USB ceremony.",
  },
  {
    id: "gpt",
    title: "4 TB NVMe on UEFI board; installer defaulted to MBR",
    hint: "Firmware mode and partition style must agree — capacity is the clue.",
  },
];

const WANT: Record<Ticket, string> = {
  clean: "clean-wipe",
  image: "image-deploy",
  zerotouch: "autopilot-zt",
  gpt: "gpt-uefi",
};

export function BootInstallLab({ lab, onSolved }: LabSimProps) {
  void lab;
  const { solved, markSolved } = useSolved(onSolved);
  const [placed, setPlaced] = useState<Record<Ticket, string>>({
    clean: "",
    image: "",
    zerotouch: "",
    gpt: "",
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
      "Clean wipe for untrusted surplus, image for fleet gold masters, zero-touch for remote ship, GPT+UEFI for large modern disks. In-place-on-malware and MBR-on-UEFI stay unused.",
    );
    markSolved();
  }

  return (
    <div className="space-y-3 text-sm">
      <LabStatus
        solved={solved}
        mission="Match each install ticket to the right method. Leave in-place-on-malware and MBR-on-UEFI unused."
      />
      <p className="text-muted-foreground">
        CompTIA 1.2 wants clean vs upgrade vs image vs zero-touch — and GPT/UEFI
        versus legacy MBR mistakes that brick the first boot.
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
                <option value="">Select method</option>
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
        Check boot and install matches
      </Button>
      {msg ? <p className="text-sm leading-6">{msg}</p> : null}
    </div>
  );
}
