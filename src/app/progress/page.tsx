"use client";

import Link from "next/link";
import { useAcademy } from "@/components/academy-provider";
import { masteryPercent } from "@/lib/review";
import { db } from "@/db/client";
import { useEffect, useState } from "react";
import { getQuestions } from "@/content/registry";
import { ALL_OBJECTIVES } from "@/content/catalog";
import { FIRST_LESSON_HREF } from "@/lib/study-path";

export default function ProgressPage() {
  const { progress, quizzes, mastery } = useAcademy();
  const [attempts, setAttempts] = useState(0);
  useEffect(() => {
    void db.attempts.count().then(setAttempts);
  }, [quizzes]);

  const empty =
    (progress?.completedLessons.length ?? 0) === 0 &&
    attempts === 0 &&
    quizzes.length === 0;

  const cramDue = mastery.filter((m) => m.kind === "concept" && m.intervalDays === 0);
  const bank = getQuestions().length;
  const scoredObjectives = ALL_OBJECTIVES.filter((o) => o.core !== "FND").length;
  const doneObjectives = progress?.completedObjectives.length ?? 0;

  if (empty) {
    return (
      <div className="mx-auto max-w-3xl space-y-4 px-4 py-8">
        <h1 className="text-2xl font-semibold">Progress</h1>
        <p className="text-sm text-muted-foreground">
          No attempts yet. Progress is stored on this device. Start Core 1
          lesson 1, then Core 2. Every number here is this academy&apos;s own
          count or first-try accuracy, not CompTIA&apos;s 100–900 scale.
        </p>
        <Link className="inline-flex min-h-11 items-center underline" href={FIRST_LESSON_HREF}>
          Open Core 1 lesson 1
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <h1 className="text-2xl font-semibold">Progress</h1>
      <p className="text-xs text-muted-foreground">
        These are this app&apos;s own counts. Completion is not mastery: checks
        and domain quizzes unlock after retry-until-correct. Nothing here is a
        CompTIA 675/700 conversion or a pass guarantee.
      </p>
      <dl className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded border p-3">
          <dt className="text-muted-foreground">Objectives</dt>
          <dd>
            {doneObjectives} / {scoredObjectives}
          </dd>
        </div>
        <div className="rounded border p-3">
          <dt className="text-muted-foreground">Domains passed</dt>
          <dd>{progress?.completedDomains.length ?? 0}</dd>
        </div>
        <div className="rounded border p-3">
          <dt className="text-muted-foreground">Question attempts</dt>
          <dd>
            {attempts} / {bank} in bank
          </dd>
        </div>
        <div className="rounded border p-3">
          <dt className="text-muted-foreground">Mocks</dt>
          <dd>{quizzes.filter((q) => q.kind === "mock").length}</dd>
        </div>
        <div className="rounded border p-3">
          <dt className="text-muted-foreground">Cram due now</dt>
          <dd>{cramDue.length} concepts</dd>
        </div>
        <div className="rounded border p-3">
          <dt className="text-muted-foreground">Labs recorded</dt>
          <dd>{progress?.completedLabs.length ?? 0}</dd>
        </div>
      </dl>
      <p className="text-sm">
        <Link className="underline" href="/cram">
          Exam-week cram ({cramDue.length} due)
        </Link>
      </p>
      <h2 className="font-medium">Concept accuracy</h2>
      <p className="text-xs text-muted-foreground">
        Share of answers correct for each concept on this device. Fewer than 3
        tries is too little evidence to call a concept mastered.
      </p>
      <ul className="max-h-96 space-y-1 overflow-y-auto text-sm">
        {mastery.filter((m) => m.kind === "concept").length === 0 ? (
          <li className="text-muted-foreground">Answer checks to build a retention queue.</li>
        ) : (
          mastery
            .filter((m) => m.kind === "concept")
            .map((m) => (
              <li key={m.id} className="flex justify-between">
                <span className="truncate pr-2">{m.id}</span>
                <span>
                  {masteryPercent(m)}% of {m.correct + m.incorrect}{" "}
                  {m.correct + m.incorrect === 1 ? "try" : "tries"} · due{" "}
                  {new Date(m.dueAt).toLocaleDateString()}
                </span>
              </li>
            ))
        )}
      </ul>
    </div>
  );
}
