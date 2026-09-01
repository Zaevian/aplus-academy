"use client";

import Link from "next/link";
import { useAcademy } from "@/components/academy-provider";
import { ALL_OBJECTIVES, DOMAINS } from "@/content/catalog";
import { getLabs, getQuestions } from "@/content/registry";
import { INTERNAL_SCORING_DISCLAIMER } from "@/lib/exam-meta";
import { masteryPercent } from "@/lib/review";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { ready, profile, progress, mastery, quizzes } = useAcademy();
  if (!ready) return <p className="p-6 text-sm">Loading…</p>;

  const objDone = progress?.completedObjectives.length ?? 0;
  const objTotal = ALL_OBJECTIVES.length;
  const c1 = ALL_OBJECTIVES.filter((o) => o.core === "C1");
  const c2 = ALL_OBJECTIVES.filter((o) => o.core === "C2");
  const c1done = c1.filter((o) =>
    progress?.completedObjectives.includes(o.id),
  ).length;
  const c2done = c2.filter((o) =>
    progress?.completedObjectives.includes(o.id),
  ).length;
  const clock = progress?.updatedAt ?? 0;
  const due = mastery.filter((m) => m.dueAt <= clock && m.exposure > 0);
  const weak = [...mastery]
    .filter((m) => m.kind === "concept")
    .sort((a, b) => masteryPercent(a) - masteryPercent(b))
    .slice(0, 5);
  const strong = [...mastery]
    .filter((m) => m.kind === "concept" && m.exposure >= 3)
    .sort((a, b) => masteryPercent(b) - masteryPercent(a))
    .slice(0, 5);
  const attempts = quizzes.slice(-5).reverse();
  const labsDone = progress?.completedLabs.length ?? 0;
  const readiness = Math.round(
    ((objDone / Math.max(objTotal, 1)) * 0.5 +
      (labsDone / Math.max(getLabs().length, 1)) * 0.2 +
      (progress?.completedDomains.length ?? 0) / Math.max(DOMAINS.length, 1) * 0.3) *
      100,
  );

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">
          {profile ? `Continue, ${profile.displayName}` : "Dashboard"}
        </h1>
        <p className="text-sm text-muted-foreground">{INTERNAL_SCORING_DISCLAIMER}</p>
      </header>
      <div className="flex flex-wrap gap-2">
        <Button render={<Link href={progress?.currentLocation || "/course/foundation"} />}>
          Resume exactly where you stopped
        </Button>
        <Button variant="outline" render={<Link href="/review" />}>
          Reviews due ({due.length})
        </Button>
      </div>
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["A+ completion", `${objDone}/${objTotal} objectives`],
          ["Core 1", `${c1done}/${c1.length}`],
          ["Core 2", `${c2done}/${c2.length}`],
          ["Internal Readiness", `${readiness}%`],
          ["Labs", `${labsDone}/${getLabs().length}`],
          ["Streak", `${progress?.streakDays ?? 0} days`],
          ["Study time", `${Math.round((progress?.totalMs ?? 0) / 60000)} min`],
          ["Question bank", `${getQuestions().length} items`],
        ].map(([k, v]) => (
          <div key={k} className="rounded-lg border p-3">
            <div className="text-xs text-muted-foreground">{k}</div>
            <div className="text-lg font-medium">{v}</div>
          </div>
        ))}
      </section>
      <section className="grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="text-sm font-semibold">Weakest concepts</h2>
          <ul className="mt-2 space-y-1 text-sm">
            {weak.length === 0 ? <li>No attempts yet.</li> : weak.map((w) => (
              <li key={w.id} className="flex justify-between">
                <span className="truncate pr-2">{w.id}</span>
                <span className="tabular-nums">{masteryPercent(w)}%</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold">Strongest concepts</h2>
          <ul className="mt-2 space-y-1 text-sm">
            {strong.length === 0 ? <li>Keep practicing.</li> : strong.map((w) => (
              <li key={w.id} className="flex justify-between">
                <span className="truncate pr-2">{w.id}</span>
                <span className="tabular-nums">{masteryPercent(w)}%</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section>
        <h2 className="text-sm font-semibold">Recent quizzes</h2>
        <ul className="mt-2 space-y-1 text-sm">
          {attempts.length === 0 ? (
            <li>No quizzes yet.</li>
          ) : (
            attempts.map((q) => (
              <li key={q.id}>
                {q.kind} · {q.targetId} · {q.score}/{q.total} {q.passed ? "pass" : "retry"}
              </li>
            ))
          )}
        </ul>
      </section>
      <section>
        <h2 className="text-sm font-semibold">Objective coverage map</h2>
        <div className="mt-2 grid gap-1 sm:grid-cols-2">
          {DOMAINS.map((d) => {
            const n = d.objectiveIds.filter((id) =>
              progress?.completedObjectives.includes(id),
            ).length;
            return (
              <div key={d.id} className="flex justify-between rounded border px-2 py-1 text-xs">
                <span>{d.title}</span>
                <span>
                  {n}/{d.objectiveIds.length}
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
