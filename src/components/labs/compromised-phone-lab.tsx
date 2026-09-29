"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { LabStatus, useSolved } from "@/components/labs/lab-kit";

type Ticket = "sideload" | "jailbreak" | "data" | "adware";

const CHOICES: {
  id: string;
  label: string;
  fits: Ticket | null;
  note: string;
}[] = [
  {
    id: "remove-sideload",
    label: "Remove sideloaded/unofficial store apps; re-enable Play Protect / App Store only",
    fits: "sideload",
    note: "Unofficial APKs and sideload stores are the classic mobile malware path.",
  },
  {
    id: "wipe-jailbreak",
    label: "Isolate, document, then wipe / restore to stock (remove jailbreak/root)",
    fits: "jailbreak",
    note: "Root/jailbreak breaks the trust model; corporate devices usually wipe to stock.",
  },
  {
    id: "sort-data",
    label: "Sort cellular data by app; revoke the unexpected top talker",
    fits: "data",
    note: "High usage is a symptom — identify the app before you raise the carrier cap.",
  },
  {
    id: "remove-overlay",
    label: "Revoke overlay / accessibility abuse; uninstall scareware; scan",
    fits: "adware",
    note: "Home-screen ads and fake AV overlays are compromise symptoms, not 'bad websites.'",
  },
  {
    id: "battery-swap",
    label: "Replace the battery because the phone feels warm",
    fits: null,
    note: "Warmth from adware/CPU abuse is not a FIRST hardware FRU.",
  },
  {
    id: "raise-cap",
    label: "Raise the cellular data cap and close the ticket",
    fits: null,
    note: "Paying for the bleed does not remove the malicious app.",
  },
];

const TICKETS: { id: Ticket; title: string; hint: string }[] = [
  {
    id: "sideload",
    title: "APK from a 'free mods' site",
    hint: "Teen installed a game pack outside the official store. Now new icons appear overnight.",
  },
  {
    id: "jailbreak",
    title: "Corporate iPhone with Cydia-class tools",
    hint: "MDM flags unauthorized profiles and a jailbreak utility. PHI risk on a managed device.",
  },
  {
    id: "data",
    title: "Unexpected 8 GB cellular overnight",
    hint: "No travel, Wi-Fi was off. User wants a bigger plan. Find the talker first.",
  },
  {
    id: "adware",
    title: "Full-screen 'virus found — call this number'",
    hint: "Overlay stays above every app. Browser homepage also changed. Treat as compromise.",
  },
];

const WANT: Record<Ticket, string> = {
  sideload: "remove-sideload",
  jailbreak: "wipe-jailbreak",
  data: "sort-data",
  adware: "remove-overlay",
};

export function CompromisedPhoneLab({ lab, onSolved }: LabSimProps) {
  void lab;
  const { solved, markSolved } = useSolved(onSolved);
  const [placed, setPlaced] = useState<Record<Ticket, string>>({
    sideload: "",
    jailbreak: "",
    data: "",
    adware: "",
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
      "Sideload → remove unofficial apps. Jailbreak → isolate and wipe to stock. Data spike → sort by app. Scareware overlay → revoke overlay/uninstall. Battery-swap-first and raise-the-cap stay unused.",
    );
    markSolved();
  }

  return (
    <div className="space-y-3 text-sm">
      <LabStatus
        solved={solved}
        mission="Match mobile security triage actions to each symptom. Leave battery-swap-first and raise-the-cap unused."
      />
      <p className="text-muted-foreground">
        CompTIA mobile security symptoms: unofficial stores, root/jailbreak, data
        abuse, and overlay scareware — software FIRST, not hardware shopping.
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
                aria-label={`Action for ${ticket.title}`}
              >
                <option value="">Select FIRST action</option>
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
            <li>All actions assigned — verify software-first before you check.</li>
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
        Check mobile security plan
      </Button>
      {msg ? <p className="text-sm leading-6">{msg}</p> : null}
    </div>
  );
}
