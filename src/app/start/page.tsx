"use client";

import Link from "next/link";
import { useAcademy } from "@/components/academy-provider";
import { Button } from "@/components/ui/button";
import { ListenButton } from "@/components/voice/listen-button";
import { nextStudy, studySteps } from "@/lib/study-path";
import { cn } from "@/lib/utils";

const INTRO =
  "Start here. CompTIA A+ is two exams: Core 1 then Core 2. This academy begins with a short Foundation, then Core 1 hardware, then Core 2 software and security. The dashboard is only a scoreboard. Press the green Start button.";

export default function StartPage() {
  const { ready, progress, profile } = useAcademy();
  if (!ready) return <p className="p-6 text-sm">Loading…</p>;
  const next = nextStudy(progress);
  const steps = studySteps(progress);
  const name = profile?.displayName ? `, ${profile.displayName}` : "";

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 py-8">
      <header className="space-y-3">
        <p className="text-xs tracking-wide text-muted-foreground uppercase">
          Where to begin
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Start here{name}
        </h1>
        <p className="text-sm leading-6 text-muted-foreground">{INTRO}</p>
        <ListenButton text={INTRO} title="Where to begin" label="Listen to this page" />
      </header>

      <section className="rounded-xl border-2 border-foreground bg-card p-5">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {next.stepLabel}
        </p>
        <h2 className="mt-1 text-xl font-semibold">{next.title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{next.detail}</p>
        <Button
          className="mt-4 min-h-12 w-full text-base sm:w-auto"
          render={<Link href={next.href} />}
        >
          {next.stepLabel.includes("Foundation") &&
          next.href.includes("what-a-plus-is")
            ? "Begin lesson 1"
            : "Continue this lesson"}
        </Button>
      </section>

      <ol className="space-y-3">
        {steps.map((s) => (
          <li key={s.n}>
            <Link
              href={s.href}
              className={cn(
                "block rounded-lg border p-4 hover:bg-muted/40",
                s.status === "current" && "border-foreground",
              )}
            >
              <div className="flex items-start gap-3">
                <span
                  className={cn(
                    "grid size-11 shrink-0 place-items-center rounded-full border text-sm font-semibold",
                    s.status === "current" && "bg-foreground text-background",
                    s.status === "done" && "bg-emerald-600/15 text-emerald-800 dark:text-emerald-300",
                  )}
                >
                  {s.status === "done" ? "✓" : s.n}
                </span>
                <div>
                  <p className="font-medium">
                    {s.status === "current" ? "Do this now · " : ""}
                    {s.title}
                  </p>
                  <p className="text-sm text-muted-foreground">{s.blurb}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ol>

      <p className="text-xs text-muted-foreground">
        Overview (scores and streaks) lives under Progress. It is not the course.
      </p>
    </div>
  );
}
