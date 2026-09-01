"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { useSolved, LabStatus } from "@/components/labs/lab-kit";

const CATEGORIES = ["hardware", "os", "network", "printer", "security"] as const;
type Category = (typeof CATEGORIES)[number];

const SEVERITIES = ["low", "medium", "high", "critical"] as const;
type Severity = (typeof SEVERITIES)[number];

const NEXT_ACTIONS = [
  {
    id: "gather",
    good: true,
    label: "Gather facts: identify the asset, last change, and reproduce the failure",
  },
  {
    id: "isolate",
    good: true,
    label: "If malware is possible, isolate the PC from the network, then gather logs",
  },
  {
    id: "mobo",
    good: false,
    label: "Replace the motherboard first",
  },
  {
    id: "reimage",
    good: false,
    label: "Reimage immediately without documenting the symptom",
  },
  {
    id: "close",
    good: false,
    label: "Close the ticket as “PC broken”",
  },
  {
    id: "buy",
    good: false,
    label: "Tell Mike to buy a new PC before the audit",
  },
] as const;

type FieldErrors = Partial<
  Record<
    | "userName"
    | "assetTag"
    | "category"
    | "severity"
    | "reproduction"
    | "nextAction"
    | "resolution",
    string
  >
>;

function isBrokenOnly(text: string): boolean {
  const compact = text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
  if (compact.length < 20) return true;
  const withoutBroken = compact
    .replace(/\b(pc|computer|laptop|machine)\b/g, "")
    .replace(/\bbroken\b/g, "")
    .replace(/\bwont work\b/g, "")
    .replace(/\bwon't work\b/g, "")
    .replace(/\bfix it\b/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return withoutBroken.length < 12;
}

export function TicketLab({ lab, onSolved }: LabSimProps) {
  const { solved, markSolved } = useSolved(onSolved);
  const [userName, setUserName] = useState("");
  const [assetTag, setAssetTag] = useState("");
  const [category, setCategory] = useState<Category | "">("");
  const [severity, setSeverity] = useState<Severity | "">("");
  const [reproduction, setReproduction] = useState("");
  const [nextAction, setNextAction] = useState("");
  const [resolution, setResolution] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [banner, setBanner] = useState<string | null>(null);

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (userName.trim().length < 2) {
      next.userName = "Capture the requester’s name. “Unknown” is not documentation.";
    }
    if (assetTag.trim().length < 3) {
      next.assetTag =
        "Get a real asset tag (or serial). “The black one” is not an identifier.";
    }
    if (category === "") {
      next.category = "Pick a category so the ticket routes to the right queue.";
    }
    if (severity === "") {
      next.severity = "Severity cannot stay on the empty default. Prioritize the incident.";
    }
    const repro = reproduction.trim();
    if (repro.length < 20 || isBrokenOnly(repro)) {
      next.reproduction =
        "Reproduction must be at least ~20 characters and cannot be “broken.” Write what happens, when, and how you reproduce it.";
    }
    const action = NEXT_ACTIONS.find((a) => a.id === nextAction);
    if (!action) {
      next.nextAction = "Choose the next action. Empty is not a plan.";
    } else if (!action.good) {
      next.nextAction =
        "First useful action gathers information or isolates. Replacing the motherboard first is a guess, not a diagnosis.";
    }
    if (resolution.trim().length < 20) {
      next.resolution =
        "Resolution notes must tell a stranger what you know and what happens next (20+ characters).";
    }
    return next;
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setBanner("Ticket rejected. Fix the documented incident before it can be accepted.");
      return;
    }
    setBanner("Incident accepted. A night-shift tech can pick this up without calling you.");
    markSolved();
  }

  return (
    <div className="space-y-4 text-sm" aria-label={lab.title}>
      <LabStatus
        solved={solved}
        mission="Turn “PC broken” into a documented, prioritized incident with a first useful action — not a motherboard swap."
      />

      <div className="rounded-md border border-amber-500/40 bg-amber-500/5 p-3">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Incoming (untriaged)
        </p>
        <p className="mt-1 font-medium">From: mike@accounting · subject: pc broken</p>
        <p className="mt-2 leading-6">
          hey this is mike in accounting my pc is broken. the black one. it wont
          work. maybe motherboard? fix it before the audit. sent from my phone
        </p>
        <p className="mt-2 text-muted-foreground">
          That is a complaint, not a ticket. Identify the user, the asset, a
          category, a real severity, reproduction steps, and the first useful
          action.
        </p>
      </div>

      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="ticket-user">User name</Label>
            <Input
              id="ticket-user"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Who reported this?"
              autoComplete="off"
              aria-invalid={Boolean(errors.userName)}
            />
            {errors.userName ? (
              <p className="text-destructive">{errors.userName}</p>
            ) : null}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ticket-asset">Device asset tag</Label>
            <Input
              id="ticket-asset"
              value={assetTag}
              onChange={(e) => setAssetTag(e.target.value)}
              placeholder="e.g. ACCT-4412"
              autoComplete="off"
              aria-invalid={Boolean(errors.assetTag)}
            />
            {errors.assetTag ? (
              <p className="text-destructive">{errors.assetTag}</p>
            ) : null}
          </div>
        </div>

        <div className="space-y-1.5">
          <p className="font-medium">Category</p>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((item) => (
              <Button
                key={item}
                type="button"
                size="sm"
                variant={category === item ? "default" : "outline"}
                onClick={() => setCategory(item)}
              >
                {item}
              </Button>
            ))}
          </div>
          {errors.category ? (
            <p className="text-destructive">{errors.category}</p>
          ) : null}
        </div>

        <div className="space-y-1.5">
          <p className="font-medium">Severity</p>
          <div className="flex flex-wrap gap-2">
            {SEVERITIES.map((item) => (
              <Button
                key={item}
                type="button"
                size="sm"
                variant={severity === item ? "default" : "outline"}
                onClick={() => setSeverity(item)}
              >
                {item}
              </Button>
            ))}
          </div>
          {errors.severity ? (
            <p className="text-destructive">{errors.severity}</p>
          ) : (
            <p className="text-muted-foreground">
              Empty is not a priority. Critical is “audit/work stopped,” not a
              synonym for frustrated.
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="ticket-repro">Reproduction steps</Label>
          <Textarea
            id="ticket-repro"
            value={reproduction}
            onChange={(e) => setReproduction(e.target.value)}
            placeholder="What did you ask Mike, what happens, and how can another tech reproduce it?"
            aria-invalid={Boolean(errors.reproduction)}
          />
          <p className="text-xs text-muted-foreground">
            {reproduction.trim().length}/20 characters minimum. “broken” is the
            complaint you started with — it is not a repro.
          </p>
          {errors.reproduction ? (
            <p className="text-destructive">{errors.reproduction}</p>
          ) : null}
        </div>

        <fieldset className="space-y-2">
          <legend className="font-medium">Next action</legend>
          <div className="flex flex-col gap-2">
            {NEXT_ACTIONS.map((action) => (
              <Button
                key={action.id}
                type="button"
                variant={nextAction === action.id ? "default" : "outline"}
                className="h-auto justify-start whitespace-normal py-2 text-left"
                onClick={() => setNextAction(action.id)}
              >
                {action.label}
              </Button>
            ))}
          </div>
          {errors.nextAction ? (
            <p className="text-destructive">{errors.nextAction}</p>
          ) : (
            <p className="text-muted-foreground">
              First useful action: gather information or isolate. Do not start
              with “replace motherboard.”
            </p>
          )}
        </fieldset>

        <div className="space-y-1.5">
          <Label htmlFor="ticket-resolution">Resolution notes</Label>
          <Textarea
            id="ticket-resolution"
            value={resolution}
            onChange={(e) => setResolution(e.target.value)}
            placeholder="What a stranger on the next shift needs in order to continue this incident."
            aria-invalid={Boolean(errors.resolution)}
          />
          {errors.resolution ? (
            <p className="text-destructive">{errors.resolution}</p>
          ) : null}
        </div>

        <Button type="submit">Submit incident</Button>
      </form>

      {banner ? (
        <p className={solved ? "text-emerald-700 dark:text-emerald-400" : "text-destructive"}>
          {banner}
        </p>
      ) : null}
    </div>
  );
}
