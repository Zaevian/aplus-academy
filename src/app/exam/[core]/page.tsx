"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { getQuestions } from "@/content/registry";
import { ALL_OBJECTIVES } from "@/content/catalog";
import { unseenFirst, isCorrect, shuffle } from "@/lib/questions";
import { recordQuiz } from "@/lib/progress-actions";
import { Button } from "@/components/ui/button";
import { INTERNAL_SCORING_DISCLAIMER } from "@/lib/exam-meta";

export default function MockExamPage() {
  const params = useParams<{ core: string }>();
  const coreId = params.core === "core-1" ? "C1" : "C2";
  const pool = useMemo(
    () =>
      getQuestions().filter((q) => {
        const o = ALL_OBJECTIVES.find((x) => x.id === q.objectiveId);
        return o?.core === coreId;
      }),
    [coreId],
  );
  const items = useMemo(() => unseenFirst(pool, new Set(), 90), [pool]);
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [seconds, setSeconds] = useState(90 * 60);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted) return;
    const t = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [submitted]);

  useEffect(() => {
    if (seconds === 0 && !submitted) void finish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);

  const q = items[i];
  const mm = Math.floor(seconds / 60);
  const ss = seconds % 60;

  async function finish() {
    if (submitted) return;
    let score = 0;
    const missed: string[] = [];
    for (const item of items) {
      const sel = answers[item.id] ?? [];
      if (isCorrect(item, sel)) score += 1;
      else missed.push(...item.conceptIds);
    }
    await recordQuiz({
      kind: "mock",
      targetId: coreId,
      questionIds: items.map((x) => x.id),
      score,
      total: items.length,
      missedConceptIds: missed,
    });
    setSubmitted(true);
  }

  if (items.length === 0) {
    return <p className="p-6 text-sm">Question bank for this core is still loading.</p>;
  }

  if (submitted) {
    const score = items.filter((item) => isCorrect(item, answers[item.id] ?? [])).length;
    return (
      <div className="mx-auto max-w-3xl space-y-3 px-4 py-8">
        <h1 className="text-2xl font-semibold">Mock report · {coreId}</h1>
        <p>
          {score}/{items.length} correct. {INTERNAL_SCORING_DISCLAIMER}
        </p>
        <ul className="space-y-3 text-sm">
          {items.map((item) => (
            <li key={item.id} className="rounded border p-2">
              <p>{item.stem}</p>
              <p className="text-muted-foreground">{item.explanation}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (!q) return null;
  const choices = shuffle(q.choices, q.id.length);

  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-8">
      <div className="flex items-center justify-between text-sm">
        <span>
          Question {i + 1} / {items.length}
        </span>
        <span className="tabular-nums">
          {mm}:{String(ss).padStart(2, "0")}
        </span>
      </div>
      <p className="font-medium">{q.stem}</p>
      <ul className="space-y-2">
        {choices.map((c) => (
          <li key={c.id}>
            <button
              className="w-full rounded border px-3 py-2 text-left text-sm"
              onClick={() => setAnswers((a) => ({ ...a, [q.id]: [c.id] }))}
            >
              {c.text}
              {answers[q.id]?.includes(c.id) ? " ✓" : ""}
            </button>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="outline" onClick={() => setI(Math.max(0, i - 1))}>
          Previous
        </Button>
        <Button size="sm" variant="outline" onClick={() => setI(Math.min(items.length - 1, i + 1))}>
          Next
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() =>
            setFlagged((f) => {
              const n = new Set(f);
              if (n.has(q.id)) n.delete(q.id);
              else n.add(q.id);
              return n;
            })
          }
        >
          {flagged.has(q.id) ? "Unflag" : "Flag"}
        </Button>
        <Button size="sm" onClick={() => void finish()}>
          Submit exam
        </Button>
      </div>
      <div className="flex flex-wrap gap-1">
        {items.map((item, idx) => (
          <button
            key={item.id}
            className={`size-7 rounded border text-[10px] ${
              flagged.has(item.id) ? "bg-amber-500/20" : answers[item.id] ? "bg-muted" : ""
            }`}
            onClick={() => setI(idx)}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
