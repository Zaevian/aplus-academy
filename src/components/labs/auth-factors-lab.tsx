"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { LabStatus, useSolved } from "@/components/labs/lab-kit";

type Ticket = "tailgate" | "vehicle" | "mfa" | "pam";

const CONTROLS: {
  id: string;
  label: string;
  fits: Ticket | null;
  note: string;
}[] = [
  {
    id: "vestibule",
    label: "Access control vestibule (two-door airlock)",
    fits: "tailgate",
    note: "Inner door stays locked until the outer door closes and the occupant is authorized — defeats tailgating.",
  },
  {
    id: "bollards",
    label: "Bollards / engineered planters at the curb",
    fits: "vehicle",
    note: "Stops a vehicle from ramming the glass lobby; does nothing to a walker.",
  },
  {
    id: "mfa-totp",
    label: "Password + authenticator-app TOTP (know + have)",
    fits: "mfa",
    note: "Two different factor types. Password + PIN is still one knowledge factor.",
  },
  {
    id: "pam-jit",
    label: "PAM / just-in-time privileged role checkout",
    fits: "pam",
    note: "Time-boxes Domain Admin instead of a standing always-on admin logon.",
  },
  {
    id: "password-pin",
    label: "Password plus mother's maiden name / PIN",
    fits: null,
    note: "Two knowledge factors — not MFA. The exam treats factor types, not 'two secrets.'",
  },
  {
    id: "camera-only",
    label: "Lobby camera with no door interlock",
    fits: null,
    note: "Cameras record and deter; they do not lock the next person out after a badge open.",
  },
];

const TICKETS: { id: Ticket; title: string; hint: string }[] = [
  {
    id: "tailgate",
    title: "Clinic badge-door tailgate",
    hint: "Unauthorized visitor walks in behind a nurse through a single reader. Stop the follow-through.",
  },
  {
    id: "vehicle",
    title: "Data-center lobby ram risk",
    hint: "Facilities wants to stop a car from driving through the glass facade — not a pedestrian policy.",
  },
  {
    id: "mfa",
    title: "SaaS HR login hardening",
    hint: "CEO password alone reached payroll from a coffee shop. Need real multifactor, not two knowledge secrets.",
  },
  {
    id: "pam",
    title: "Standing Domain Admin habit",
    hint: "Help desk logs into every ticket as Domain Admin all day. Shrink standing privilege without removing break-glass.",
  },
];

const WANT: Record<Ticket, string> = {
  tailgate: "vestibule",
  vehicle: "bollards",
  mfa: "mfa-totp",
  pam: "pam-jit",
};

export function AuthFactorsLab({ lab, onSolved }: LabSimProps) {
  void lab;
  const { solved, markSolved } = useSolved(onSolved);
  const [placed, setPlaced] = useState<Record<Ticket, string>>({
    tailgate: "",
    vehicle: "",
    mfa: "",
    pam: "",
  });
  const [msg, setMsg] = useState("");

  const remaining = useMemo(() => {
    const used = new Set(Object.values(placed).filter(Boolean));
    return CONTROLS.filter((c) => !used.has(c.id));
  }, [placed]);

  function assign(ticket: Ticket, controlId: string) {
    setPlaced((prev) => {
      const next = { ...prev };
      (Object.keys(next) as Ticket[]).forEach((t) => {
        if (next[t] === controlId) next[t] = "";
      });
      next[ticket] = controlId;
      return next;
    });
    setMsg("");
  }

  function check() {
    const misses: string[] = [];
    for (const ticket of TICKETS) {
      const controlId = placed[ticket.id];
      if (!controlId) {
        misses.push(`${ticket.title}: empty`);
        continue;
      }
      if (WANT[ticket.id] !== controlId) {
        const control = CONTROLS.find((c) => c.id === controlId);
        misses.push(
          `${ticket.title}: ${control?.label ?? controlId} is wrong — ${control?.note ?? ""}`,
        );
      }
    }
    if (misses.length) {
      setMsg(misses.join(" "));
      return;
    }
    setMsg(
      "Vestibule stops the clinic tailgate, bollards stop the vehicle, password+TOTP is real MFA, and PAM/JIT removes standing Domain Admin. Password+PIN and camera-only stay unused.",
    );
    markSolved();
  }

  return (
    <div className="space-y-3 text-sm">
      <LabStatus
        solved={solved}
        mission="Match physical and logical controls to each ticket. Leave the two knowledge-factor and camera-only distractors unused."
      />
      <p className="text-muted-foreground">
        Four tickets: clinic tailgating, vehicle ramming, SaaS MFA, and standing
        Domain Admin. Pick the CompTIA V15 control that fits each threat — factor
        types must differ for MFA, and cameras do not lock doors.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {TICKETS.map((ticket) => {
          const control = CONTROLS.find((c) => c.id === placed[ticket.id]);
          return (
            <fieldset key={ticket.id} className="rounded border p-2">
              <legend className="font-medium">{ticket.title}</legend>
              <p className="mt-1 text-xs text-muted-foreground">{ticket.hint}</p>
              <select
                className="mt-2 min-h-11 w-full rounded-md border bg-background px-2"
                value={placed[ticket.id]}
                onChange={(e) => assign(ticket.id, e.target.value)}
                aria-label={`Control for ${ticket.title}`}
              >
                <option value="">Select control</option>
                {control ? (
                  <option value={control.id}>{control.label}</option>
                ) : null}
                {remaining.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
              {control ? (
                <p className="mt-2 text-xs text-muted-foreground">
                  {control.note}
                </p>
              ) : null}
            </fieldset>
          );
        })}
      </div>
      <div className="rounded border bg-muted/40 p-2">
        <p className="font-medium">Controls still on the bench</p>
        <ul className="mt-1 list-disc pl-5 text-xs text-muted-foreground">
          {remaining.length === 0 ? (
            <li>
              All controls assigned — verify factor types and physical match
              before you check.
            </li>
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
        Check control plan
      </Button>
      {msg ? <p className="text-sm leading-6">{msg}</p> : null}
    </div>
  );
}
