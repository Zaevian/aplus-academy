"use client";

import { useMemo } from "react";
import { useAcademy } from "@/components/academy-provider";
import { getQuestions } from "@/content/registry";
import { QuizPlayer } from "@/components/quiz/quiz-player";
import { dueConceptIds } from "@/lib/review";
import { useEffect, useState } from "react";

export default function ReviewPage() {
  const { mastery } = useAcademy();
  const [due, setDue] = useState<string[]>([]);
  useEffect(() => {
    void dueConceptIds(15).then(setDue);
  }, [mastery]);
  const pool = useMemo(
    () => getQuestions().filter((q) => q.conceptIds.some((c) => due.includes(c))),
    [due],
  );
  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-8">
      <h1 className="text-2xl font-semibold">Review queue</h1>
      <p className="text-sm text-muted-foreground">
        Spaced, interleaved retrieval. {due.length} concepts due.
      </p>
      {pool.length ? (
        <QuizPlayer kind="checkpoint" targetId="review-queue" pool={pool} count={8} />
      ) : (
        <p className="text-sm">Nothing due. Study a lesson, then come back.</p>
      )}
    </div>
  );
}
