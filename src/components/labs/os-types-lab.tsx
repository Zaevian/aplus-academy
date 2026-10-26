"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { LabStatus, useSolved } from "@/components/labs/lab-kit";

type Ticket = "windows" | "linux" | "chromeos" | "macos";

const CHOICES: {
  id: string;
  label: string;
  fits: Ticket | null;
  note: string;
}[] = [
  {
    id: "win-domain",
    label: "Windows domain-joined laptop (NTFS system volume, Group Policy)",
    fits: "windows",
    note: "Corp desktops/laptops that must take GPO and domain auth are Windows territory on A+.",
  },
  {
    id: "linux-srv",
    label: "Linux server VM with ext4 (or XFS) data volume",
    fits: "linux",
    note: "Many on-prem services and appliances are Linux; ext4/XFS are the common Linux filesystems on the exam.",
  },
  {
    id: "chrome-kiosk",
    label: "ChromeOS managed kiosk / cloud-first shared station",
    fits: "chromeos",
    note: "ChromeOS is for web-first, often centrally managed, low local storage footprints.",
  },
  {
    id: "mac-apfs",
    label: "macOS creative workstation on APFS",
    fits: "macos",
    note: "Apple silicon / Mac creative seats use macOS with APFS — not NTFS as the system volume.",
  },
  {
    id: "ntfs-usb-mac",
    label: "Format the shared USB stick NTFS so the Mac designer can drop 8 GB files",
    fits: null,
    note: "macOS does not write NTFS by default. Use exFAT for large cross-OS flash.",
  },
  {
    id: "win7-eol",
    label: "Keep Windows 7 because it still boots and 'apps work'",
    fits: null,
    note: "EOL means no vendor security patches. Bootable is not supported.",
  },
];

const TICKETS: { id: Ticket; title: string; hint: string }[] = [
  {
    id: "windows",
    title: "Finance needs domain GPO + BitLocker inventory",
    hint: "Must join Active Directory, take Group Policy, and report encryption status like the rest of the fleet.",
  },
  {
    id: "linux",
    title: "Internal git forge on a VM — no GUI license budget",
    hint: "SSH admin, packages, long-uptime service. Filesystem should be a Linux native, not APFS.",
  },
  {
    id: "chromeos",
    title: "Lobby check-in: browser only, MDM wipeable",
    hint: "Shared station that lives in the browser with central management — not a full Windows image.",
  },
  {
    id: "macos",
    title: "Video editor on Apple Silicon, Final Cut native",
    hint: "Creative Mac seat. System volume expectations are Apple filesystem, not NTFS C:.",
  },
];

const WANT: Record<Ticket, string> = {
  windows: "win-domain",
  linux: "linux-srv",
  chromeos: "chrome-kiosk",
  macos: "mac-apfs",
};

export function OsTypesLab({ lab, onSolved }: LabSimProps) {
  void lab;
  const { solved, markSolved } = useSolved(onSolved);
  const [placed, setPlaced] = useState<Record<Ticket, string>>({
    windows: "",
    linux: "",
    chromeos: "",
    macos: "",
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
      "Windows for domain GPO, Linux+ext4/XFS for the forge VM, ChromeOS for the lobby kiosk, macOS+APFS for the editor. NTFS-on-Mac-USB and Win7-EOL stay unused.",
    );
    markSolved();
  }

  return (
    <div className="space-y-3 text-sm">
      <LabStatus
        solved={solved}
        mission="Match each OS / filesystem purpose to the ticket. Leave NTFS-shared-USB-for-Mac and Win7-EOL unused."
      />
      <p className="text-muted-foreground">
        Objective 1.1 is purpose and filesystem fit — Windows, Linux, macOS,
        ChromeOS — plus knowing EOL and cross-OS media limits.
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
                <option value="">Select OS / filesystem choice</option>
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
        <p className="font-medium">Still unmatched</p>
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
        Check OS matches
      </Button>
      {msg ? <p className="text-sm leading-6">{msg}</p> : null}
    </div>
  );
}
