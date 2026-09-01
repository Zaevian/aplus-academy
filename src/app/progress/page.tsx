"use client";

import { useAcademy } from "@/components/academy-provider";
import { masteryPercent } from "@/lib/review";
import { db } from "@/db/client";
import { useEffect, useState } from "react";

export default function ProgressPage() {
  const { progress, quizzes, mastery } = useAcademy();
  const [attempts, setAttempts] = useState(0);
  useEffect(() => {
    void db.attempts.count().then(setAttempts);
  }, [quizzes]);
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <h1 className="text-2xl font-semibold">Progress</h1>
      <dl className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded border p-3">
          <dt className="text-muted-foreground">Objectives</dt>
          <dd>{progress?.completedObjectives.length ?? 0}</dd>
        </div>
        <div className="rounded border p-3">
          <dt className="text-muted-foreground">Domains passed</dt>
          <dd>{progress?.completedDomains.length ?? 0}</dd>
        </div>
        <div className="rounded border p-3">
          <dt className="text-muted-foreground">Question attempts</dt>
          <dd>{attempts}</dd>
        </div>
        <div className="rounded border p-3">
          <dt className="text-muted-foreground">Mocks</dt>
          <dd>{quizzes.filter((q) => q.kind === "mock").length}</dd>
        </div>
      </dl>
      <h2 className="font-medium">Concept retention</h2>
      <ul className="max-h-96 space-y-1 overflow-y-auto text-sm">
        {mastery
          .filter((m) => m.kind === "concept")
          .map((m) => (
            <li key={m.id} className="flex justify-between">
              <span className="truncate pr-2">{m.id}</span>
              <span>
                {masteryPercent(m)}% · due {new Date(m.dueAt).toLocaleDateString()}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
}
