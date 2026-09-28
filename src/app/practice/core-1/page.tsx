"use client";

import { getPracticeQuestions } from "@/content/registry";
import { ALL_OBJECTIVES } from "@/content/catalog";
import { QuizPlayer } from "@/components/quiz/quiz-player";

export default function PracticeCore1() {
  const pool = getPracticeQuestions((q) => {
    const o = ALL_OBJECTIVES.find((x) => x.id === q.objectiveId);
    return o?.core === "C1";
  });
  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-8">
      <h1 className="text-2xl font-semibold">Practice · Core 1</h1>
      <QuizPlayer kind="checkpoint" targetId="practice-C1" pool={pool} count={15} />
    </div>
  );
}
