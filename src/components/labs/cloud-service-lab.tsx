"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { LabStatus, useSolved } from "@/components/labs/lab-kit";

type Model = "iaas" | "paas" | "saas";

const MODELS: { id: Model; title: string; hint: string }[] = [
  {
    id: "iaas",
    title: "IaaS",
    hint: "You RDP/SSH to a VM you sized; you patch the OS.",
  },
  {
    id: "paas",
    title: "PaaS",
    hint: "You push code or use a managed runtime; you do not patch Ubuntu.",
  },
  {
    id: "saas",
    title: "SaaS",
    hint: "Browser + license portal; you manage users and sharing, not IIS.",
  },
];

const TICKETS: {
  id: string;
  label: string;
  fits: Model | null;
  note: string;
}[] = [
  {
    id: "win-vm",
    label:
      "Finance needs a Windows Server they can Group Policy and RDP into after an Azure image deploy",
    fits: "iaas",
    note: "Guest OS you own = IaaS. Patching Windows is still your ticket.",
  },
  {
    id: "app-service",
    label:
      "Dev team wants to git-push a web app and never SSH into nodes or manage the Python runtime",
    fits: "paas",
    note: "Platform owns OS/runtime; you own the app and data.",
  },
  {
    id: "m365",
    label:
      "HR wants company email and docs with no Exchange servers — just licenses and MFA in a portal",
    fits: "saas",
    note: "You use the app; vendor runs it. Identity and sharing are still yours.",
  },
  {
    id: "bare-esxi",
    label:
      "Rack a bare-metal ESXi host in the closet for forty local VDI desktops",
    fits: null,
    note: "On-prem Type 1 / VDI — not a cloud service model.",
  },
  {
    id: "thin-provision",
    label:
      "Thin-provision three guests until the datastore fills and VMs pause",
    fits: null,
    note: "Host storage accounting on a hypervisor — not IaaS/PaaS/SaaS.",
  },
  {
    id: "container-host",
    label:
      "Run ten microservices that share one Linux kernel on a laptop Docker engine",
    fits: null,
    note: "Containers share a host kernel; that is isolation, not a cloud service model.",
  },
];

const WANT: Record<Model, string> = {
  iaas: "win-vm",
  paas: "app-service",
  saas: "m365",
};

export function CloudServiceLab({ lab, onSolved }: LabSimProps) {
  void lab;
  const { solved, markSolved } = useSolved(onSolved);
  const [placed, setPlaced] = useState<Record<Model, string>>({
    iaas: "",
    paas: "",
    saas: "",
  });
  const [msg, setMsg] = useState("");

  const remaining = useMemo(() => {
    const used = new Set(Object.values(placed).filter(Boolean));
    return TICKETS.filter((t) => !used.has(t.id));
  }, [placed]);

  function assign(model: Model, ticketId: string) {
    setPlaced((prev) => {
      const next = { ...prev };
      (Object.keys(next) as Model[]).forEach((m) => {
        if (next[m] === ticketId) next[m] = "";
      });
      next[model] = ticketId;
      return next;
    });
    setMsg("");
  }

  function check() {
    const misses: string[] = [];
    for (const model of MODELS) {
      const ticketId = placed[model.id];
      if (!ticketId) {
        misses.push(`${model.title}: empty`);
        continue;
      }
      if (WANT[model.id] !== ticketId) {
        const ticket = TICKETS.find((t) => t.id === ticketId);
        misses.push(
          `${model.title}: wrong — ${ticket?.note ?? ticketId}`,
        );
      }
    }
    if (misses.length) {
      setMsg(misses.join(" "));
      return;
    }
    setMsg(
      "IaaS gets the Windows VM you patch, PaaS gets git-push without node SSH, SaaS gets licensed email/docs in a browser. Bare-metal ESXi, thin-provision datastore fills, and laptop Docker stay unmatched — they are not service models.",
    );
    markSolved();
  }

  return (
    <div className="space-y-3 text-sm">
      <LabStatus
        solved={solved}
        mission="Match each cloud service model to the ticket that fits. Leave on-prem hypervisor, datastore, and container tickets unused."
      />
      <p className="text-muted-foreground">
        Pick the layer the customer stops managing. IaaS = guest OS you own.
        PaaS = app on a managed runtime. SaaS = use the app. Type 1 hosts,
        thin disks, and containers are different questions.
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        {MODELS.map((model) => {
          const ticket = TICKETS.find((t) => t.id === placed[model.id]);
          return (
            <fieldset key={model.id} className="rounded border p-2">
              <legend className="font-medium">{model.title}</legend>
              <p className="mt-1 text-xs text-muted-foreground">{model.hint}</p>
              <select
                className="mt-2 min-h-11 w-full rounded-md border bg-background px-2"
                value={placed[model.id]}
                onChange={(e) => assign(model.id, e.target.value)}
                aria-label={`Ticket for ${model.title}`}
              >
                <option value="">Select ticket</option>
                {ticket ? (
                  <option value={ticket.id}>{ticket.label}</option>
                ) : null}
                {remaining.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
              {ticket ? (
                <p className="mt-2 text-xs text-muted-foreground">{ticket.note}</p>
              ) : null}
            </fieldset>
          );
        })}
      </div>
      <div className="rounded border bg-muted/40 p-2">
        <p className="font-medium">Tickets still in the queue</p>
        <ul className="mt-1 list-disc pl-5 text-xs text-muted-foreground">
          {remaining.length === 0 ? (
            <li>
              All assigned — confirm only IaaS/PaaS/SaaS tickets sit on the
              models before you check.
            </li>
          ) : (
            remaining.map((t) => (
              <li key={t.id}>
                {t.label} — {t.note}
              </li>
            ))
          )}
        </ul>
      </div>
      <Button size="sm" className="min-h-11" onClick={check} disabled={solved}>
        Check service models
      </Button>
      {msg ? <p className="text-sm leading-6">{msg}</p> : null}
    </div>
  );
}
