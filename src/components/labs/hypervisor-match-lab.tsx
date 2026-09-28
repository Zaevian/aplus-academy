"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { LabStatus, useSolved } from "@/components/labs/lab-kit";

type Ticket = "type1" | "type2" | "vdi" | "container";

const CHOICES: {
  id: string;
  label: string;
  fits: Ticket | null;
  note: string;
}[] = [
  {
    id: "esxi",
    label: "Type 1 bare-metal hypervisor (ESXi / Hyper-V Server)",
    fits: "type1",
    note: "Runs on the metal; hosts many production VMs. No full desktop OS underneath.",
  },
  {
    id: "vbox",
    label: "Type 2 hosted hypervisor (VirtualBox / VMware Workstation)",
    fits: "type2",
    note: "Installs on top of an existing laptop OS for labs and one-off guests.",
  },
  {
    id: "vdi",
    label: "VDI / session host — desktop runs in the datacenter",
    fits: "vdi",
    note: "Endpoint is a thin client or browser; apps and data stay central.",
  },
  {
    id: "container",
    label: "Containers sharing one host kernel (Docker / pod)",
    fits: "container",
    note: "Dense app copies; not a separate guest OS kernel per workload.",
  },
  {
    id: "saas-mail",
    label: "Licensed SaaS email in a browser",
    fits: null,
    note: "SaaS is a cloud service model, not a virtualization stack choice.",
  },
  {
    id: "reimage",
    label: "Reimage every nurse PC with a golden Windows image",
    fits: null,
    note: "Thick-client imaging is not VDI. VDI keeps the desktop off the ward PC.",
  },
];

const TICKETS: { id: Ticket; title: string; hint: string }[] = [
  {
    id: "type1",
    title: "Datacenter consolidation",
    hint: "Twelve aging app servers must become VMs on two hosts. Need a hypervisor that owns the hardware.",
  },
  {
    id: "type2",
    title: "Tech's Windows laptop lab",
    hint: "Need a Linux server image for a class tonight on a single Windows notebook — not a cluster.",
  },
  {
    id: "vdi",
    title: "Clinic ward endpoints",
    hint: "Nurses should never store PHI on the desk PC. Desktop and apps must live centrally.",
  },
  {
    id: "container",
    title: "Microservice density",
    hint: "Dev team ships twenty small services that share one Linux kernel and must start in seconds.",
  },
];

const WANT: Record<Ticket, string> = {
  type1: "esxi",
  type2: "vbox",
  vdi: "vdi",
  container: "container",
};

export function HypervisorMatchLab({ lab, onSolved }: LabSimProps) {
  void lab;
  const { solved, markSolved } = useSolved(onSolved);
  const [placed, setPlaced] = useState<Record<Ticket, string>>({
    type1: "",
    type2: "",
    vdi: "",
    container: "",
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
      "Type 1 for the datacenter, Type 2 on the tech laptop, VDI for the ward, containers for dense microservices. SaaS mail and thick-client reimage stay unused.",
    );
    markSolved();
  }

  return (
    <div className="space-y-3 text-sm">
      <LabStatus
        solved={solved}
        mission="Match Type 1, Type 2, VDI, and containers to each ticket. Leave SaaS email and thick-client reimage unused."
      />
      <p className="text-muted-foreground">
        Isolation model is the clue: bare metal vs hosted hypervisor, central
        desktop vs local OS, and shared-kernel containers vs full guest kernels.
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
                <option value="">Select stack</option>
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
            <li>All choices assigned — verify isolation models before you check.</li>
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
        Check virtualization matches
      </Button>
      {msg ? <p className="text-sm leading-6">{msg}</p> : null}
    </div>
  );
}
