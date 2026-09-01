"use client";

import { useMemo, useState } from "react";
import type { Question } from "@/content/schema";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { shuffle, isCorrect } from "@/lib/questions";
import { completeBlock, recordAnswer } from "@/lib/progress-actions";
import { useAcademy } from "@/components/academy-provider";

export function KnowledgeCheck({
  blockId,
  questions,
  context = "block",
  onPassed,
}: {
  blockId: string;
  questions: Question[];
  context?: "block" | "checkpoint" | "domain-quiz" | "review" | "practice";
  onPassed?: () => void;
}) {
  const { progress } = useAcademy();
  const already = progress?.completedBlocks.includes(blockId) ?? false;
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [correctNow, setCorrectNow] = useState(false);
  const [alt, setAlt] = useState(false);

  const question = questions[index];
  const order = useMemo(
    () => (question ? shuffle(question.choices, question.id.length) : []),
    [question],
  );

  if (!question) return null;

  const locked = already && context === "block";
  const multi = question.type === "multi";

  async function submit() {
    const result = await recordAnswer({
      questionId: question.id,
      selected,
      context,
    });
    setSubmitted(true);
    setCorrectNow(result.correct);
    if (result.correct) {
      const last = index === questions.length - 1;
      if (last) {
        await completeBlock(blockId);
        onPassed?.();
      }
    }
  }

  function toggle(id: string) {
    if (submitted && correctNow) return;
    if (multi) {
      setSelected((s) =>
        s.includes(id) ? s.filter((x) => x !== id) : [...s, id],
      );
      setSubmitted(false);
    } else {
      setSelected([id]);
      setSubmitted(false);
    }
  }

  function next() {
    setIndex((i) => i + 1);
    setSelected([]);
    setSubmitted(false);
    setCorrectNow(false);
    setAlt(false);
  }

  return (
    <section
      className="rounded-lg border bg-card p-4"
      aria-labelledby={`${blockId}-title`}
    >
      <h3 id={`${blockId}-title`} className="text-sm font-semibold">
        {context === "checkpoint" ? "Objective checkpoint" : "Knowledge check"}{" "}
        <span className="font-normal text-muted-foreground">
          {index + 1} / {questions.length}
        </span>
      </h3>
      {question.scenario ? (
        <p className="mt-2 rounded-md bg-muted/60 p-3 text-sm leading-6">
          {question.scenario}
        </p>
      ) : null}
      <p className="mt-3 text-sm leading-6 font-medium">{question.stem}</p>
      <ul className="mt-3 space-y-2">
        {order.map((choice) => {
          const on = selected.includes(choice.id);
          const show = submitted;
          const isKey = question.correct.includes(choice.id);
          return (
            <li key={choice.id}>
              <button
                type="button"
                onClick={() => toggle(choice.id)}
                className={cn(
                  "w-full rounded-md border px-3 py-2 text-left text-sm leading-6 transition-colors",
                  on && !show && "border-foreground bg-muted",
                  show && isKey && "border-emerald-600 bg-emerald-500/10",
                  show && on && !isKey && "border-destructive bg-destructive/10",
                )}
              >
                {choice.text}
                {show ? (
                  <span className="mt-1 block text-xs text-muted-foreground">
                    {choice.rationale}
                  </span>
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {!correctNow ? (
          <Button
            size="sm"
            onClick={() => void submit()}
            disabled={selected.length === 0}
          >
            Check answer
          </Button>
        ) : index < questions.length - 1 ? (
          <Button size="sm" onClick={next}>
            Next question
          </Button>
        ) : (
          <p className="text-sm text-emerald-700 dark:text-emerald-400">
            {locked || already
              ? "This check is complete. Continue."
              : "Correct. This block is unlocked."}
          </p>
        )}
        {submitted && !correctNow ? (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              setAlt((v) => !v);
            }}
          >
            Explain this another way
          </Button>
        ) : null}
      </div>
      {submitted && !correctNow ? (
        <div className="mt-3 space-y-2 text-sm leading-6">
          <p>{question.explanation}</p>
          {alt ? (
            <p className="text-muted-foreground">
              Try mapping each choice to a physical action you would take at the
              bench. Eliminate anything that skips identification or contradicts
              the evidence in the stem.
            </p>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

export function PreviewCheck({ question }: { question: Question }) {
  return (
    <KnowledgeCheck
      blockId={`preview-${question.id}`}
      questions={[question]}
      context="practice"
    />
  );
}

export function evaluate(question: Question, selected: string[]) {
  return isCorrect(question, selected);
}
