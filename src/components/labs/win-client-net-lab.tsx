"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { LabStatus, useSolved } from "@/components/labs/lab-kit";

type Ticket = "workgroup" | "domain" | "unc" | "metered";

const CHOICES: {
  id: string;
  label: string;
  fits: Ticket | null;
  note: string;
}[] = [
  {
    id: "wg-join",
    label: "Workgroup membership — same name, local accounts/shares",
    fits: "workgroup",
    note: "SOHO peer sharing without a domain controller.",
  },
  {
    id: "ad-join",
    label: "Domain join — Access work or school / System Properties",
    fits: "domain",
    note: "GPO, domain users, and Kerberos need a real join.",
  },
  {
    id: "unc-path",
    label: "UNC path \\\\server\\share — map or open without hunting letters",
    fits: "unc",
    note: "Universal Naming Convention beats which letter did they use.",
  },
  {
    id: "metered-link",
    label: "Set connection as metered — pause hungry Updates/sync",
    fits: "metered",
    note: "Cellular/hotspot caps: metered tells Windows to hold back.",
  },
  {
    id: "proxy-for-share",
    label: "Point Internet Options proxy at the file server for SMB",
    fits: null,
    note: "HTTP proxy is for web. SMB shares are UNC/firewall — not proxy.",
  },
  {
    id: "wg-as-domain",
    label: "Rename the workgroup to CORP and call it domain-joined",
    fits: null,
    note: "A workgroup name is not Active Directory. Join or do not.",
  },
];

const TICKETS: { id: Ticket; title: string; hint: string }[] = [
  {
    id: "workgroup",
    title: "Two home PCs need share access without a domain",
    hint: "Peer workgroup, not AD join.",
  },
  {
    id: "domain",
    title: "Corp laptop must get GPO and domain credentials",
    hint: "Join the Active Directory domain.",
  },
  {
    id: "unc",
    title: "Map Finance shares by path, not drive-letter hunting",
    hint: "\\\\server\\share style path.",
  },
  {
    id: "metered",
    title: "LTE adapter burns the data cap with Windows Update",
    hint: "Mark the connection metered.",
  },
];

const WANT: Record<Ticket, string> = {
  workgroup: "wg-join",
  domain: "ad-join",
  unc: "unc-path",
  metered: "metered-link",
};

export function WinClientNetLab({ lab, onSolved }: LabSimProps) {
  void lab;
  const { solved, markSolved } = useSolved(onSolved);
  const [placed, setPlaced] = useState<Record<Ticket, string>>({
    workgroup: "",
    domain: "",
    unc: "",
    metered: "",
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
    setMsg("Workgroup for home peers, domain join for GPO, UNC for shares, metered for LTE caps. Proxy-for-SMB and rename-as-domain stay unused.");
    markSolved();
  }

  return (
    <div className="space-y-3 text-sm">
      <LabStatus solved={solved} mission="Match each Windows client networking ticket. Leave proxy-for-SMB and fake-domain unused." />
      <p className="text-muted-foreground">CompTIA 1.7 covers workgroup vs domain, UNC shares, metered links, proxy, and firewall profile awareness on the client.</p>
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
        Check Windows client network matches
      </Button>
      {msg ? <p className="text-sm leading-6">{msg}</p> : null}
    </div>
  );
}
