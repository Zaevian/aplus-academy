"use client";

import Link from "next/link";
import { useAcademy } from "@/components/academy-provider";
import { ALL_OBJECTIVES, DOMAINS } from "@/content/catalog";
import { getLabs, getQuestions } from "@/content/registry";
import { INTERNAL_SCORING_DISCLAIMER } from "@/lib/exam-meta";
import { masteryPercent } from "@/lib/review";
import { Button } from "@/components/ui/button";
import { nextStudy } from "@/lib/study-path";

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
  const next = nextStudy(progress);

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-8">
      <section className="rounded-xl border-2 border-foreground p-5">
        <p className="text-xs font-medium tracking-wide uppercase text-muted-foreground">
          This page is an overview, not the course
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">
          {profile ? `${profile.displayName}, start studying here` : "Start studying here"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {next.stepLabel}: {next.title}. {next.detail}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button className="min-h-11" render={<Link href={next.href} />}>
            Open the next lesson
          </Button>
          <Button variant="outline" className="min-h-11" render={<Link href="/start" />}>
            See the 3-step path
          </Button>
        </div>
      </section>
      <header>
        <h2 className="text-lg font-semibold tracking-tight">Scoreboard</h2>
        <p className="text-sm text-muted-foreground">{INTERNAL_SCORING_DISCLAIMER}</p>
      </header>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" className="min-h-11" render={<Link href="/review" />}>
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
