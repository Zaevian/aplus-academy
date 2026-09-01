"use client";

import { useMemo, useState } from "react";
import { getQuestions } from "@/content/registry";
import { QuizPlayer } from "@/components/quiz/quiz-player";
import { ALL_OBJECTIVES } from "@/content/catalog";

export default function PracticePage() {
  const all = getQuestions();
  const [core, setCore] = useState<"all" | "C1" | "C2">("all");
  const [unseen, setUnseen] = useState(true);
  const pool = useMemo(() => {
    return all.filter((q) => {
      if (core === "all") return true;
      const obj = ALL_OBJECTIVES.find((o) => o.id === q.objectiveId);
      return obj?.core === core;
    });
  }, [all, core]);

  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-8">
      <h1 className="text-2xl font-semibold">Practice</h1>
      <p className="text-sm text-muted-foreground">
        Explanations after each item. Full mocks defer explanations until the end.
        {unseen ? " Preferring unseen items." : ""}
      </p>
      <div className="flex flex-wrap gap-2 text-sm">
        {(["all", "C1", "C2"] as const).map((c) => (
          <button
            key={c}
            className={`rounded border px-2 py-1 ${core === c ? "bg-muted" : ""}`}
            onClick={() => setCore(c)}
          >
            {c === "all" ? "Both cores" : c}
          </button>
        ))}
        <button className="rounded border px-2 py-1" onClick={() => setUnseen(!unseen)}>
          Unseen preferred: {unseen ? "on" : "off"}
        </button>
      </div>
      <QuizPlayer kind="checkpoint" targetId={`practice-${core}`} pool={pool} count={10} />
    </div>
  );
}
