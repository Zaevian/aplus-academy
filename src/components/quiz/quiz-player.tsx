"use client";

import { useMemo, useRef, useState } from "react";
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
  /** First-attempt outcome per item index (true=correct on first check). */
  const firstOutcomes = useRef<Map<number, boolean>>(new Map());

  if (items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Not enough authored questions for this quiz yet.
      </p>
    );
  }

  const required = kind === "domain" ? items.length : Math.ceil(items.length * 0.8);
  const passedNow = score !== null && (kind === "domain" ? done : score >= required);

  return (
    <div className="space-y-4">
      <p className="text-sm font-medium" data-testid="quiz-counter">
        Item set: {items.length} questions. Answer each item; the counter advances
        only after a correct check and Next. Recorded score uses first-attempt
        outcomes (assisted retries after the explanation do not inflate mastery).
      </p>
      <KnowledgeCheck
        key={`${kind}-${targetId}-${attempt}`}
        blockId={`${kind}-${targetId}-${attempt}`}
        questions={items}
        context={kind === "domain" ? "domain-quiz" : kind === "mock" ? "practice" : "checkpoint"}
        onItemResult={(index, correct, meta) => {
          if (meta?.firstAttempt && !firstOutcomes.current.has(index)) {
            firstOutcomes.current.set(index, correct);
          } else if (!firstOutcomes.current.has(index)) {
            // Fallback if meta omitted: treat first callback as first attempt.
            firstOutcomes.current.set(index, correct);
          }
        }}
        onPassed={() => {
          let firstCorrect = 0;
          const missedConceptIds: string[] = [];
          items.forEach((item, i) => {
            const ok = firstOutcomes.current.get(i);
            if (ok === true) firstCorrect += 1;
            else missedConceptIds.push(...item.conceptIds);
          });
          // Domain gate still unlocks after retry-until-correct finishes;
          // recorded score stays honest to first attempts.
          const gatePassed = kind === "domain" ? true : firstCorrect >= required;
          void recordQuiz({
            kind,
            targetId,
            questionIds: items.map((i) => i.id),
            score: firstCorrect,
            total: items.length,
            missedConceptIds: [...new Set(missedConceptIds)],
            passed: gatePassed,
          }).then((r) => {
            setScore(firstCorrect);
            setDone(true);
            if (!r.passed) return;
          });
        }}
      />
      {kind === "domain" ? (
        <p className="text-xs text-muted-foreground">
          Domain mastery requires eventually answering every item correctly to
          unlock the next domain. The recorded score still reflects first-attempt
          misses so Internal Readiness is not inflated by assisted retries.
        </p>
      ) : null}
      {done && score !== null ? (
        <p className="text-sm">
          Recorded first-attempt {score}/{items.length}.{" "}
          {kind === "domain"
            ? passedNow
              ? "Next domain unlocked (gate cleared after retry-until-correct)."
              : "100% eventual correct required — start a new attempt."
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
          firstOutcomes.current = new Map();
          setAttempt((a) => a + 1);
        }}
      >
        New attempt (fresh items preferred)
      </Button>
    </div>
  );
}
