"use client";

import Link from "next/link";
import { useAcademy } from "@/components/academy-provider";
import { getQuestions } from "@/content/registry";
import { ALL_OBJECTIVES } from "@/content/catalog";
import { PORTS } from "@/content/ports";

export default function CramPage() {
  const { mastery, progress } = useAcademy();
  const due = mastery.filter((m) => m.kind === "concept" && m.intervalDays === 0);
  const bank = getQuestions().length;
  const remainingObjectives =
    ALL_OBJECTIVES.filter((o) => o.core !== "FND").length -
    (progress?.completedObjectives.length ?? 0);

  return (
    <div className="mx-auto max-w-2xl space-y-4 px-4 py-8">
      <h1 className="text-2xl font-semibold">Exam-week cram</h1>
      <p className="text-sm text-muted-foreground">
        This is final review, not foundational instruction. It does not replace
        the gated course. {due.length} concepts are due now. {remainingObjectives}{" "}
        scored objectives are not marked complete. Question bank: {bank}. Official
        2.1 ports in the tool: {PORTS.length}.
      </p>
      <ul className="list-disc space-y-1 pl-5 text-sm">
        <li>
          <Link className="underline" href="/review">
            Spaced review ({due.length} due)
          </Link>
        </li>
        <li>
          <Link className="underline" href="/practice">
            Mixed questions
          </Link>
        </li>
        <li>
          <Link className="underline" href="/glossary">
            Acronyms
          </Link>
        </li>
        <li>
          <Link className="underline" href="/labs/cable-lab">
            Connector drill
          </Link>
        </li>
        <li>
          <Link className="underline" href="/tools/ports">
            Port drill ({PORTS.length})
          </Link>
        </li>
        <li>
          <Link className="underline" href="/objectives">
            Objective checklist ({remainingObjectives} open)
          </Link>
        </li>
      </ul>
    </div>
  );
}
