"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { LabStatus, useSolved } from "@/components/labs/lab-kit";

type Ticket = "home" | "pro" | "prows" | "enterprise";

const EDITIONS: {
  id: string;
  label: string;
  fits: Ticket | null;
  note: string;
}[] = [
  {
    id: "win-home",
    label: "Windows 11 Home",
    fits: "home",
    note: "Consumer SKU: Microsoft account / workgroup only. No AD join, no RDP host, no gpedit, no full BitLocker.",
  },
  {
    id: "win-pro",
    label: "Windows 11 Pro",
    fits: "pro",
    note: "Business baseline: domain/Entra join, RDP host, BitLocker, gpedit.msc, 2 TB RAM.",
  },
  {
    id: "win-pro-ws",
    label: "Windows 10 Pro for Workstations",
    fits: "prows",
    note: "Pro plus workstation hardware: 6 TB RAM, four sockets, ReFS, NVDIMM, SMB Direct.",
  },
  {
    id: "win-ent",
    label: "Windows 11 Enterprise (volume)",
    fits: "enterprise",
    note: "Volume-licensed corporate SKU: Pro feature set plus AppLocker, Credential Guard, LTSC options, 6 TB RAM.",
  },
  {
    id: "win-home-n",
    label: "Windows 11 Home N (media pack missing)",
    fits: null,
    note: "N editions omit bundled media features from antitrust remedies — not a domain or BitLocker SKU.",
  },
  {
    id: "chromeos",
    label: "ChromeOS managed Chromebook",
    fits: null,
    note: "Wrong OS family. ChromeOS is Google Admin / web-first, not an AD Windows edition.",
  },
];

const TICKETS: { id: Ticket; title: string; hint: string }[] = [
  {
    id: "home",
    title: "Household laptop",
    hint: "Parent wants OneDrive + Store apps. No domain, no inbound RDP, no Group Policy editor.",
  },
  {
    id: "pro",
    title: "Small-business desk PC",
    hint: "Must join AD, host Remote Desktop for the owner, and run BitLocker with manage-bde.",
  },
  {
    id: "prows",
    title: "CAD / media workstation",
    hint: "Ticket: four CPU sockets, ReFS data volume, and room for >2 TB RAM on Windows 10 list.",
  },
  {
    id: "enterprise",
    title: "Corporate image fleet",
    hint: "Volume licensing, AppLocker / Credential Guard, and LTSC servicing — not a retail Home upgrade path.",
  },
];

const WANT: Record<Ticket, string> = {
  home: "win-home",
  pro: "win-pro",
  prows: "win-pro-ws",
  enterprise: "win-ent",
};

export function WindowsEditionLab({ lab, onSolved }: LabSimProps) {
  void lab;
  const { solved, markSolved } = useSolved(onSolved);
  const [placed, setPlaced] = useState<Record<Ticket, string>>({
    home: "",
    pro: "",
    prows: "",
    enterprise: "",
  });
  const [msg, setMsg] = useState("");

  const remaining = useMemo(() => {
    const used = new Set(Object.values(placed).filter(Boolean));
    return EDITIONS.filter((e) => !used.has(e.id));
  }, [placed]);

  function assign(ticket: Ticket, editionId: string) {
    setPlaced((prev) => {
      const next = { ...prev };
      (Object.keys(next) as Ticket[]).forEach((t) => {
        if (next[t] === editionId) next[t] = "";
      });
      next[ticket] = editionId;
      return next;
    });
    setMsg("");
  }

  function check() {
    const misses: string[] = [];
    for (const ticket of TICKETS) {
      const editionId = placed[ticket.id];
      if (!editionId) {
        misses.push(`${ticket.title}: empty`);
        continue;
      }
      if (WANT[ticket.id] !== editionId) {
        const ed = EDITIONS.find((e) => e.id === editionId);
        misses.push(
          `${ticket.title}: ${ed?.label ?? editionId} is wrong — ${ed?.note ?? ""}`,
        );
      }
    }
    if (misses.length) {
      setMsg(misses.join(" "));
      return;
    }
    setMsg(
      "Home for the household, Pro for AD/RDP/BitLocker, Pro for Workstations for 6 TB/ReFS/four-socket CAD, Enterprise for volume AppLocker. Home N and ChromeOS stay on the shelf.",
    );
    markSolved();
  }

  return (
    <div className="space-y-3 text-sm">
      <LabStatus
        solved={solved}
        mission="Match each ticket to the Windows edition that actually unlocks the required features. Leave wrong SKUs unused."
      />
      <p className="text-muted-foreground">
        Purchasing queue: four PCs, four constraints. Editions are feature
        switches — domain join, RDP host, BitLocker, gpedit, RAM ceilings, and
        volume controls — not wallpaper themes.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {TICKETS.map((ticket) => {
          const ed = EDITIONS.find((e) => e.id === placed[ticket.id]);
          return (
            <fieldset key={ticket.id} className="rounded border p-2">
              <legend className="font-medium">{ticket.title}</legend>
              <p className="mt-1 text-xs text-muted-foreground">{ticket.hint}</p>
              <select
                className="mt-2 min-h-11 w-full rounded-md border bg-background px-2"
                value={placed[ticket.id]}
                onChange={(e) => assign(ticket.id, e.target.value)}
                aria-label={`Edition for ${ticket.title}`}
              >
                <option value="">Select edition</option>
                {ed ? <option value={ed.id}>{ed.label}</option> : null}
                {remaining.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.label}
                  </option>
                ))}
              </select>
              {ed ? (
                <p className="mt-2 text-xs text-muted-foreground">{ed.note}</p>
              ) : null}
            </fieldset>
          );
        })}
      </div>
      <div className="rounded border bg-muted/40 p-2">
        <p className="font-medium">Still on the shelf</p>
        <ul className="mt-1 list-disc pl-5 text-xs text-muted-foreground">
          {remaining.length === 0 ? (
            <li>
              All SKUs assigned — verify domain/RDP/BitLocker/RAM/volume features
              before you check.
            </li>
          ) : (
            remaining.map((e) => (
              <li key={e.id}>
                {e.label} — {e.note}
              </li>
            ))
          )}
        </ul>
      </div>
      <Button size="sm" className="min-h-11" onClick={check} disabled={solved}>
        Check edition plan
      </Button>
      {msg ? <p className="text-sm leading-6">{msg}</p> : null}
    </div>
  );
}
