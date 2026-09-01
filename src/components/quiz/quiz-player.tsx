"use client";

import { useMemo, useState } from "react";
import type { Question } from "@/content/schema";
import { KnowledgeCheck } from "@/components/lesson/knowledge-check";
import { recordQuiz } from "@/lib/progress-actions";
import { unseenFirst } from "@/lib/questions";
import { useAcademy } from "@/components/academy-provider";
import { Button } from "@/components/ui/button";
import { getQuestions } from "@/content/registry";

export function QuizPlayer({
  kind,
  targetId,
  pool,
  count,
}: {
  kind: "domain" | "checkpoint" | "core-review" | "mock";
  targetId: string;
  pool: Question[];
  count: number;
}) {
  const { quizzes } = useAcademy();
  const exposed = useMemo(() => {
    const ids = new Set<string>();
    quizzes.filter((q) => q.targetId === targetId).forEach((q) => q.questionIds.forEach((id) => ids.add(id)));
    return ids;
  }, [quizzes, targetId]);

  const missed = quizzes
    .filter((q) => q.targetId === targetId && !q.passed)
    .flatMap((q) => q.missedConceptIds);

  const items = useMemo(
    () => unseenFirst(pool.length ? pool : getQuestions(), exposed, count, missed),
    [pool, exposed, count, missed],
  );

  const [done, setDone] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  if (items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Not enough authored questions for this quiz yet. Domain content is still loading into the bank.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <KnowledgeCheck
        blockId={`${kind}-${targetId}-${items.map((i) => i.id).join(",")}`}
        questions={items}
        context={kind === "domain" ? "domain-quiz" : kind === "mock" ? "practice" : "checkpoint"}
        onPassed={() => {
          void recordQuiz({
            kind,
            targetId,
            questionIds: items.map((i) => i.id),
            score: items.length,
            total: items.length,
            missedConceptIds: [],
          }).then((r) => {
            setScore(items.length);
            setDone(true);
            if (!r.passed) return;
          });
        }}
      />
      {kind === "domain" ? (
        <p className="text-xs text-muted-foreground">
          Domain mastery requires 100%. A missed item queues review and a new attempt with different items.
        </p>
      ) : null}
      {done && score !== null ? (
        <p className="text-sm">
          Recorded {score}/{items.length}.{" "}
          {kind === "domain" && score === items.length
            ? "Next domain unlocked."
            : null}
        </p>
      ) : null}
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          setDone(false);
          setScore(null);
        }}
      >
        New attempt (fresh items preferred)
      </Button>
    </div>
  );
}
