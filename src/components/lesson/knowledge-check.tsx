"use client";

import { useMemo, useState } from "react";
import type { Question } from "@/content/schema";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { shuffle, isCorrect } from "@/lib/questions";
import { completeBlock, recordAnswer } from "@/lib/progress-actions";
import { useAcademy } from "@/components/academy-provider";
import { ListenButton } from "@/components/voice/listen-button";

function saltFromId(id: string): number {
  let n = 0;
  for (let i = 0; i < id.length; i++) n = (n * 31 + id.charCodeAt(i)) >>> 0;
  return (n % 1_000_000) / 1_000_000;
}

export function KnowledgeCheck({
  blockId,
  questions,
  context = "block",
  onPassed,
  onItemResult,
}: {
  blockId: string;
  questions: Question[];
  context?: "block" | "checkpoint" | "domain-quiz" | "review" | "practice";
  onPassed?: () => void;
  /** Fires on every check. `firstAttempt` is true only for the first submit on this item. */
  onItemResult?: (
    index: number,
    correct: boolean,
    meta?: { firstAttempt: boolean; assisted: boolean },
  ) => void;
}) {
  const { progress } = useAcademy();
  const already = progress?.completedBlocks.includes(blockId) ?? false;
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [correctNow, setCorrectNow] = useState(false);
  const [alt, setAlt] = useState(false);
  /** Stays true after the explanation has been revealed for the current item. */
  const [explanationShown, setExplanationShown] = useState(false);
  const [attemptNumber, setAttemptNumber] = useState(1);

  const question = questions[index];
  const order = useMemo(
    () => (question ? shuffle(question.choices, saltFromId(question.id)) : []),
    [question],
  );

  if (!question) return null;

  const locked = already && context === "block";
  const multi = question.type === "multi";

  if (locked) {
    return (
      <section
        className="rounded-lg border bg-card p-4"
        aria-labelledby={`${blockId}-title`}
      >
        <h3 id={`${blockId}-title`} className="text-sm font-semibold">
          Knowledge check complete
        </h3>
        <p className="mt-2 text-sm text-emerald-700 dark:text-emerald-400">
          This check is complete. Later blocks stay unlocked after reload.
        </p>
      </section>
    );
  }

  async function submit() {
    const assisted = explanationShown;
    const firstAttempt = attemptNumber === 1 && !explanationShown;
    const result = await recordAnswer({
      questionId: question.id,
      selected,
      context,
      assisted,
      attemptNumber,
    });
    setSubmitted(true);
    setCorrectNow(result.correct);
    if (!result.correct) {
      setExplanationShown(true);
    }
    onItemResult?.(index, result.correct, { firstAttempt, assisted });
    setAttemptNumber((n) => n + 1);
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
    setExplanationShown(false);
    setAttemptNumber(1);
  }

  const chosen = question.choices.filter((c) => selected.includes(c.id));
  const correctChoices = question.choices.filter((c) =>
    question.correct.includes(c.id),
  );
  const otherDistractors = question.choices.filter(
    (c) => !question.correct.includes(c.id) && !selected.includes(c.id),
  );

  return (
    <section
      className="rounded-lg border bg-card p-4"
      aria-labelledby={`${blockId}-title`}
    >
      <h3 id={`${blockId}-title`} className="text-sm font-semibold">
        {context === "checkpoint" ? "Objective checkpoint" : "Knowledge check"}{" "}
        <span className="font-normal text-muted-foreground" data-testid="check-counter">
          {index + 1} / {questions.length}
        </span>
      </h3>
      {multi ? (
        <p className="mt-1 text-xs text-muted-foreground">
          Select every correct option, then check.
        </p>
      ) : null}
      {question.scenario ? (
        <p className="mt-2 rounded-md bg-muted/60 p-3 text-sm leading-6">
          {question.scenario}
        </p>
      ) : null}
      <div className="mt-3 flex flex-wrap items-start justify-between gap-2">
        <p className="text-sm leading-6 font-medium">{question.stem}</p>
        <ListenButton
          text={`${question.scenario ? question.scenario + ". " : ""}${question.stem}. ${order.map((c) => c.text).join(". ")}`}
          title={`Check ${index + 1}`}
          label="Listen"
        />
      </div>
      <ul className="mt-3 space-y-2" key={question.id}>
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
                  "w-full min-h-11 rounded-md border px-3 py-2 text-left text-sm leading-6 transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
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
            className="min-h-11"
            onClick={() => void submit()}
            disabled={selected.length === 0}
          >
            Check answer
          </Button>
        ) : index < questions.length - 1 ? (
          <Button size="sm" className="min-h-11" onClick={next}>
            Next question
          </Button>
        ) : (
          <p className="text-sm text-emerald-700 dark:text-emerald-400">
            {already
              ? "This check is complete. Continue."
              : "Correct. This block is unlocked."}
          </p>
        )}
        {submitted && !correctNow ? (
          <Button
            size="sm"
            variant="ghost"
            className="min-h-11"
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
          <p>
            <span className="font-medium">Why your choice is wrong. </span>
            {chosen
              .map((c) => c.rationale)
              .join(" ") || "That option is not the key."}
          </p>
          <p>
            <span className="font-medium">Why the correct answer is right. </span>
            {correctChoices.map((c) => c.rationale).join(" ")}
          </p>
          {otherDistractors.length ? (
            <p>
              <span className="font-medium">Why the other distractors fail. </span>
              {otherDistractors.map((c) => `${c.text}: ${c.rationale}`).join(" ")}
            </p>
          ) : null}
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
