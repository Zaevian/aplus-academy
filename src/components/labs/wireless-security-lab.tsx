"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { LabStatus, useSolved } from "@/components/labs/lab-kit";

type Ticket = "wpa3" | "enterprise" | "aes" | "kerberos";

const CHOICES: {
  id: string;
  label: string;
  fits: Ticket | null;
  note: string;
}[] = [
  {
    id: "wpa3-sae",
    label: "WPA3-Personal (SAE) — replace WPA2-PSK on the guest SSID",
    fits: "wpa3",
    note: "SAE resists offline PSK dictionary attacks better than WPA2-PSK. Prefer WPA3 when clients support it.",
  },
  {
    id: "wpa2-ent",
    label: "WPA2/WPA3-Enterprise + 802.1X talking to RADIUS",
    fits: "enterprise",
    note: "Corp SSIDs use per-user credentials via RADIUS — not one shared lobby passphrase.",
  },
  {
    id: "aes-only",
    label: "AES-CCMP only — disable TKIP / mixed mode",
    fits: "aes",
    note: "TKIP is a finding. Force AES (CCMP); drop legacy mixed modes that re-enable weak ciphers.",
  },
  {
    id: "kerberos-sso",
    label: "Kerberos for domain SSO (not a Wi-Fi PSK)",
    fits: "kerberos",
    note: "Kerberos tickets domain logons. It is not the shared key on a SOHO AP — do not confuse with WPA-PSK.",
  },
  {
    id: "wep-open",
    label: "Leave WEP or open auth 'for compatibility'",
    fits: null,
    note: "WEP/open is on-path candy. Compatibility excuses do not make them acceptable on exam or in production.",
  },
  {
    id: "tkip-faster",
    label: "Re-enable TKIP because a sticky client is slow on AES",
    fits: null,
    note: "Speed complaints do not justify TKIP. Fix the client or SSID plan — keep AES.",
  },
];

const TICKETS: { id: Ticket; title: string; hint: string }[] = [
  {
    id: "wpa3",
    title: "Guest SSID still on WPA2-PSK; offline crack risk",
    hint: "Personal mode, modern phones. Upgrade the handshake without standing up RADIUS yet.",
  },
  {
    id: "enterprise",
    title: "Corp SSID must use per-user AD credentials",
    hint: "No shared passphrase. AP should 802.1X to AAA. Shared PSK is the wrong class.",
  },
  {
    id: "aes",
    title: "Audit finding: mixed WPA2 TKIP+AES still enabled",
    hint: "Legacy printers tempted mixed mode. Cipher policy is the fix — not a new SSID name.",
  },
  {
    id: "kerberos",
    title: "Users want SSO to file shares after domain join",
    hint: "Wi-Fi is already Enterprise. This ticket is about domain authentication tickets, not the AP PSK field.",
  },
];

const WANT: Record<Ticket, string> = {
  wpa3: "wpa3-sae",
  enterprise: "wpa2-ent",
  aes: "aes-only",
  kerberos: "kerberos-sso",
};

export function WirelessSecurityLab({ lab, onSolved }: LabSimProps) {
  void lab;
  const { solved, markSolved } = useSolved(onSolved);
  const [placed, setPlaced] = useState<Record<Ticket, string>>({
    wpa3: "",
    enterprise: "",
    aes: "",
    kerberos: "",
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
      "WPA3-Personal for guest PSK upgrade, Enterprise+RADIUS for corp per-user Wi-Fi, AES-only (no TKIP), Kerberos for domain SSO. WEP/open and TKIP-for-speed stay unused.",
    );
    markSolved();
  }

  return (
    <div className="space-y-3 text-sm">
      <LabStatus
        solved={solved}
        mission="Match each wireless-security ticket to the right control. Leave WEP/open and TKIP-for-speed unused."
      />
      <p className="text-muted-foreground">
        CompTIA 2.3 wants WPA2/WPA3 with AES, personal vs enterprise (RADIUS),
        and clear separation from Kerberos SSO and dead ciphers like TKIP/WEP.
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
                <option value="">Select control</option>
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
        Check wireless security matches
      </Button>
      {msg ? <p className="text-sm leading-6">{msg}</p> : null}
    </div>
  );
}
