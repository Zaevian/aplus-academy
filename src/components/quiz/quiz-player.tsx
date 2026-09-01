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
    quizzes
      .filter((q) => q.targetId === targetId)
      .forEach((q) => q.questionIds.forEach((id) => ids.add(id)));
    return ids;
  }, [quizzes, targetId]);

  const missed = useMemo(
    () =>
      quizzes
        .filter((q) => q.targetId === targetId && !q.passed)
        .flatMap((q) => q.missedConceptIds),
    [quizzes, targetId],
  );

  const [attempt, setAttempt] = useState(0);
  const items = useMemo(
    () =>
      unseenFirst(
        pool.length ? pool : getQuestions(),
        exposed,
        count,
        missed,
      ),
    // attempt is the only reshuffle trigger; do not reshuffle on liveQuery.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pool, count, attempt],
  );

  const [done, setDone] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  if (items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Not enough authored questions for this quiz yet.
      </p>
    );
  }

  const required = kind === "domain" ? items.length : Math.ceil(items.length * 0.8);
  const passedNow = score !== null && score >= required;

  return (
    <div className="space-y-4">
      <p className="text-sm font-medium" data-testid="quiz-counter">
        Item set: {items.length} questions. Answer each item; the counter advances
        only after a correct check and Next.
      </p>
      <KnowledgeCheck
        key={`${kind}-${targetId}-${attempt}`}
        blockId={`${kind}-${targetId}-${attempt}`}
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
          Domain mastery requires 100%. A missed item stays on this question until
          you choose the key. Passing unlocks the next domain; this is enforced on
          the domain pages, not only recorded.
        </p>
      ) : null}
      {done && score !== null ? (
        <p className="text-sm">
          Recorded {score}/{items.length}.{" "}
          {kind === "domain"
            ? passedNow
              ? "Next domain unlocked."
              : "100% required — start a new attempt."
            : null}
        </p>
      ) : null}
      <Button
        variant="outline"
        size="sm"
        className="min-h-11"
        onClick={() => {
          setDone(false);
          setScore(null);
          setAttempt((a) => a + 1);
        }}
      >
        New attempt (fresh items preferred)
      </Button>
    </div>
  );
}
