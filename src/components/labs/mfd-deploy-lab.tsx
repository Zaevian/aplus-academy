"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { LabStatus, useSolved } from "@/components/labs/lab-kit";

type Ticket = "adf" | "secureprint" | "printserver" | "ps";

const CHOICES: {
  id: string;
  label: string;
  fits: Ticket | null;
  note: string;
}[] = [
  {
    id: "adf-feeder",
    label: "ADF — multi-page stacks into the scanner path",
    fits: "adf",
    note: "Automatic Document Feeder pulls sheets. Flatbed is for books, passports, and fragile originals.",
  },
  {
    id: "secure-print",
    label: "Secure/held print — release at the panel with PIN/badge",
    fits: "secureprint",
    note: "Stops payroll sitting in the output tray. Auth at the device, then the job prints.",
  },
  {
    id: "print-server",
    label: "Dedicated print server / shared queue on Ethernet",
    fits: "printserver",
    note: "Department fleets need a server queue, not a USB share that sleeps with someone's PC.",
  },
  {
    id: "postscript-driver",
    label: "PostScript driver/queue — vector-heavy design output",
    fits: "ps",
    note: "PS (PostScript) for complex vector/graphics. PCL is the common Windows office language.",
  },
  {
    id: "flatbed-for-stacks",
    label: "Force every 40-page stack through the flatbed glass",
    fits: null,
    note: "Flatbed is one page at a time. Stacks belong on the ADF unless the original is bound/fragile.",
  },
  {
    id: "usb-share-dept",
    label: "Share from a USB-attached PC under a desk for the whole floor",
    fits: null,
    note: "USB shares die when the host sleeps. Ethernet + print server is the department pattern.",
  },
];

const TICKETS: { id: Ticket; title: string; hint: string }[] = [
  {
    id: "adf",
    title: "HR scans 30-page benefits packets every afternoon",
    hint: "Multi-page stacks — which hardware path?",
  },
  {
    id: "secureprint",
    title: "Payroll prints land in the tray for anyone to grab",
    hint: "Protect output until the owner is at the panel.",
  },
  {
    id: "printserver",
    title: "Floor printers drop offline whenever an intern's laptop sleeps",
    hint: "Queue host should not be someone's USB PC.",
  },
  {
    id: "ps",
    title: "Design shop: vectors look fine on screen, garble on PCL queue",
    hint: "Page-description language mismatch for creative work.",
  },
];

const WANT: Record<Ticket, string> = {
  adf: "adf-feeder",
  secureprint: "secure-print",
  printserver: "print-server",
  ps: "postscript-driver",
};

export function MfdDeployLab({ lab, onSolved }: LabSimProps) {
  void lab;
  const { solved, markSolved } = useSolved(onSolved);
  const [placed, setPlaced] = useState<Record<Ticket, string>>({
    adf: "",
    secureprint: "",
    printserver: "",
    ps: "",
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
      "ADF for stacks, secure/held print for payroll, print server for the floor, PostScript for design vectors. Flatbed-for-stacks and USB-under-desk shares stay unused.",
    );
    markSolved();
  }

  return (
    <div className="space-y-3 text-sm">
      <LabStatus
        solved={solved}
        mission="Match each MFD/printer deployment ticket. Leave flatbed-for-stacks and USB-share unused."
      />
      <p className="text-muted-foreground">
        CompTIA 3.7 is deploy-time: placement, PCL vs PostScript, firmware,
        connectivity, sharing, ADF vs flatbed, and secure print — not toner
        maintenance.
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
                <option value="">Select deploy choice</option>
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
        Check MFD deploy matches
      </Button>
      {msg ? <p className="text-sm leading-6">{msg}</p> : null}
    </div>
  );
}
