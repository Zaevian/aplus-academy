"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { LabStatus, useSolved } from "@/components/labs/lab-kit";

type TicketId =
  | "send-mail"
  | "names-fail"
  | "apipa"
  | "encrypted-shell"
  | "windows-share"
  | "remote-desktop";

const TICKETS: {
  id: TicketId;
  title: string;
  clue: string;
}[] = [
  {
    id: "send-mail",
    title: "Sales cannot send",
    clue: "Outlook receives fine. New messages sit in Outbox with a timeout to smtp.company.example.",
  },
  {
    id: "names-fail",
    title: "Internet looks down",
    clue: "Users type names. Ping 8.8.8.8 works. Ping by FQDN fails on every station.",
  },
  {
    id: "apipa",
    title: "Whole floor on 169.254",
    clue: "Three new desks show APIPA. Same VLAN yesterday leased fine from the scope.",
  },
  {
    id: "encrypted-shell",
    title: "Replace cleartext admin",
    clue: "Switch still offers Telnet. Ticket: put an encrypted remote shell on the management VRF.",
  },
  {
    id: "windows-share",
    title: "Mapped drive path not found",
    clue: "\\\\filesrv\\sales fails with 'network path not found' after a firewall change. Name resolves.",
  },
  {
    id: "remote-desktop",
    title: "Help desk RDP timeout",
    clue: "mstsc hangs, then fails. Instant refuse is absent — long delay smells like a filter.",
  },
];

const ANSWERS: {
  id: string;
  label: string;
  fits: TicketId | null;
  note: string;
}[] = [
  {
    id: "smtp-25",
    label: "SMTP · TCP 25",
    fits: "send-mail",
    note: "Send path between mail servers; A+ number is 25.",
  },
  {
    id: "dns-53",
    label: "DNS · TCP/UDP 53",
    fits: "names-fail",
    note: "IP works, names fail — resolver or port 53.",
  },
  {
    id: "dhcp-67-68",
    label: "DHCP · UDP 67/68",
    fits: "apipa",
    note: "Server 67, client 68; APIPA means the lease never completed.",
  },
  {
    id: "ssh-22",
    label: "SSH · TCP 22",
    fits: "encrypted-shell",
    note: "Encrypted remote shell replaces Telnet 23.",
  },
  {
    id: "smb-445",
    label: "SMB/CIFS · TCP 445",
    fits: "windows-share",
    note: "Modern Windows file share; not NetBIOS 137–139 first.",
  },
  {
    id: "rdp-3389",
    label: "RDP · TCP 3389",
    fits: "remote-desktop",
    note: "Remote Desktop; long timeout often means 3389 filtered.",
  },
  {
    id: "telnet-23",
    label: "Telnet · TCP 23",
    fits: null,
    note: "Cleartext shell — a finding, not the replacement.",
  },
  {
    id: "http-80",
    label: "HTTP · TCP 80",
    fits: null,
    note: "Cleartext web; does not fix mail, names, leases, shell, share, or RDP.",
  },
  {
    id: "ftp-21",
    label: "FTP · TCP 20/21",
    fits: null,
    note: "Legacy file transfer — not the Windows share or mail send path.",
  },
];

const WANT: Record<TicketId, string> = {
  "send-mail": "smtp-25",
  "names-fail": "dns-53",
  apipa: "dhcp-67-68",
  "encrypted-shell": "ssh-22",
  "windows-share": "smb-445",
  "remote-desktop": "rdp-3389",
};

export function PortsDrillLab({ lab, onSolved }: LabSimProps) {
  void lab;
  const { solved, markSolved } = useSolved(onSolved);
  const [placed, setPlaced] = useState<Record<TicketId, string>>({
    "send-mail": "",
    "names-fail": "",
    apipa: "",
    "encrypted-shell": "",
    "windows-share": "",
    "remote-desktop": "",
  });
  const [msg, setMsg] = useState("");

  const remaining = useMemo(() => {
    const used = new Set(Object.values(placed).filter(Boolean));
    return ANSWERS.filter((a) => !used.has(a.id));
  }, [placed]);

  function assign(ticket: TicketId, answerId: string) {
    setPlaced((prev) => {
      const next = { ...prev };
      (Object.keys(next) as TicketId[]).forEach((t) => {
        if (next[t] === answerId) next[t] = "";
      });
      next[ticket] = answerId;
      return next;
    });
    setMsg("");
  }

  function check() {
    const misses: string[] = [];
    for (const ticket of TICKETS) {
      const answerId = placed[ticket.id];
      if (!answerId) {
        misses.push(`${ticket.title}: empty`);
        continue;
      }
      if (WANT[ticket.id] !== answerId) {
        const answer = ANSWERS.find((a) => a.id === answerId);
        misses.push(
          `${ticket.title}: ${answer?.label ?? answerId} is wrong — ${answer?.note ?? ""}`,
        );
      }
    }
    if (misses.length) {
      setMsg(misses.join(" "));
      return;
    }
    setMsg(
      "Send → SMTP 25. Names → DNS 53. APIPA floor → DHCP 67/68. Encrypted shell → SSH 22. Share path → SMB 445. RDP timeout → 3389. Telnet, HTTP, and FTP stay unused for these tickets.",
    );
    markSolved();
  }

  return (
    <div className="space-y-3 text-sm">
      <LabStatus
        solved={solved}
        mission="Match each help-desk ticket to the official 2.1 port/protocol. Leave Telnet, HTTP, and FTP unused for this queue."
      />
      <p className="text-muted-foreground">
        Closed list only: map the user sentence onto one CompTIA 220-1201 v3.0
        row. Wrong protocol on a familiar number fails the check.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {TICKETS.map((ticket) => {
          const answer = ANSWERS.find((a) => a.id === placed[ticket.id]);
          return (
            <fieldset key={ticket.id} className="rounded border p-2">
              <legend className="font-medium">{ticket.title}</legend>
              <p className="mt-1 text-xs text-muted-foreground">{ticket.clue}</p>
              <select
                className="mt-2 min-h-11 w-full rounded-md border bg-background px-2"
                value={placed[ticket.id]}
                onChange={(e) => assign(ticket.id, e.target.value)}
                aria-label={`Port for ${ticket.title}`}
              >
                <option value="">Select official port</option>
                {answer ? (
                  <option value={answer.id}>{answer.label}</option>
                ) : null}
                {remaining.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.label}
                  </option>
                ))}
              </select>
              {answer ? (
                <p className="mt-2 text-xs text-muted-foreground">{answer.note}</p>
              ) : null}
            </fieldset>
          );
        })}
      </div>
      <div className="rounded border bg-muted/40 p-2">
        <p className="font-medium">Still on the bench</p>
        <ul className="mt-1 list-disc pl-5 text-xs text-muted-foreground">
          {remaining.length === 0 ? (
            <li>
              All rows assigned — verify each ticket against the official 2.1
              list before you check.
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
        Check port plan
      </Button>
      {msg ? <p className="text-sm leading-6">{msg}</p> : null}
    </div>
  );
}
