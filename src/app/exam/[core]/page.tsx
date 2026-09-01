"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { getQuestions } from "@/content/registry";
import { ALL_OBJECTIVES } from "@/content/catalog";
import { unseenFirst, isCorrect, shuffle } from "@/lib/questions";
import { recordQuiz } from "@/lib/progress-actions";
import { Button } from "@/components/ui/button";
import { INTERNAL_SCORING_DISCLAIMER } from "@/lib/exam-meta";
import { cn } from "@/lib/utils";

const PBQ_ID = "EXAM-PBQ-PORTS";

function PortsPbq({
  value,
  onChange,
}: {
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const pairs = [
    { port: "22", want: "SSH" },
    { port: "53", want: "DNS" },
    { port: "445", want: "SMB" },
    { port: "3389", want: "RDP" },
  ];
  const options = ["SSH", "FTP", "DNS", "SMB", "RDP", "Telnet"];
  return (
    <div className="space-y-3">
      <p className="font-medium">
        PBQ: match each official 2.1 port to its protocol. This is one exam item,
        not four.
      </p>
      <ul className="space-y-2">
        {pairs.map((p, i) => (
          <li key={p.port} className="flex items-center gap-2 text-sm">
            <span className="w-16 font-mono">TCP/UDP {p.port}</span>
            <select
              className="min-h-11 flex-1 rounded-md border bg-background px-2"
              value={value[i] ?? ""}
              onChange={(e) => {
                const next = [...value];
                next[i] = e.target.value;
                onChange(next);
              }}
            >
              <option value="">Select protocol</option>
              {options.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
}

function pbqCorrect(selected: string[]): boolean {
  return (
    selected[0] === "SSH" &&
    selected[1] === "DNS" &&
    selected[2] === "SMB" &&
    selected[3] === "RDP"
  );
}

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
  const mcq = useMemo(() => unseenFirst(pool, new Set(), 89), [pool]);
  const items = mcq;
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [pbq, setPbq] = useState<string[]>([]);
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [seconds, setSeconds] = useState(90 * 60);
  const [submitted, setSubmitted] = useState(false);

  const totalItems = 90;
  const onPbq = i === 0;

  useEffect(() => {
    if (submitted) return;
    const t = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [submitted]);

  useEffect(() => {
    if (seconds === 0 && !submitted) void finish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);

  const q = onPbq ? null : items[i - 1];
  const mm = Math.floor(seconds / 60);
  const ss = seconds % 60;

  async function finish() {
    if (submitted) return;
    let score = pbqCorrect(pbq) ? 1 : 0;
    const missed: string[] = [];
    for (const item of items) {
      const sel = answers[item.id] ?? [];
      if (isCorrect(item, sel)) score += 1;
      else missed.push(...item.conceptIds);
    }
    await recordQuiz({
      kind: "mock",
      targetId: coreId,
      questionIds: [PBQ_ID, ...items.map((x) => x.id)],
      score,
      total: totalItems,
      missedConceptIds: missed,
    });
    setSubmitted(true);
  }

  if (items.length === 0) {
    return <p className="p-6 text-sm">Question bank for this core is still loading.</p>;
  }

  if (submitted) {
    const score =
      (pbqCorrect(pbq) ? 1 : 0) +
      items.filter((item) => isCorrect(item, answers[item.id] ?? [])).length;
    const pct = Math.round((score / totalItems) * 100);
    return (
      <div className="mx-auto max-w-3xl space-y-3 px-4 py-8">
        <h1 className="text-2xl font-semibold">Mock report · {coreId}</h1>
        <p>
          Internal Readiness this sitting: {score}/{totalItems} ({pct}%).{" "}
          {INTERNAL_SCORING_DISCLAIMER} Official CompTIA scaled scores (675 Core 1
          / 700 Core 2 on 100–900) are not computed here and this result is not a
          pass guarantee.
        </p>
        <ul className="space-y-3 text-sm">
          <li className="rounded border p-2">
            <p>PBQ ports match</p>
            <p className="text-muted-foreground">
              {pbqCorrect(pbq)
                ? "Matched 22/SSH, 53/DNS, 445/SMB, 3389/RDP."
                : "Need 22=SSH, 53=DNS, 445=SMB, 3389=RDP from the official 2.1 list."}
            </p>
          </li>
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

  const multi = q?.type === "multi";

  function toggleChoice(id: string) {
    if (!q) return;
    setAnswers((a) => {
      const cur = a[q.id] ?? [];
      if (multi) {
        return {
          ...a,
          [q.id]: cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id],
        };
      }
      return { ...a, [q.id]: [id] };
    });
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-8">
      <div className="flex items-center justify-between text-sm">
        <span>
          Question {i + 1} / {totalItems}
        </span>
        <span className="tabular-nums">
          {mm}:{String(ss).padStart(2, "0")}
        </span>
      </div>
      <p className="text-xs text-muted-foreground">{INTERNAL_SCORING_DISCLAIMER}</p>
      {onPbq ? (
        <PortsPbq value={pbq} onChange={setPbq} />
      ) : q ? (
        <>
          {multi ? (
            <p className="text-xs text-muted-foreground">
              Multiple response — select every correct option.
            </p>
          ) : null}
          {q.scenario ? (
            <p className="rounded-md bg-muted/60 p-3 text-sm">{q.scenario}</p>
          ) : null}
          <p className="font-medium">{q.stem}</p>
          <ul className="space-y-2">
            {shuffle(q.choices, q.id.length / 100).map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  className={cn(
                    "w-full min-h-11 rounded border px-3 py-2 text-left text-sm focus-visible:ring-3 focus-visible:ring-ring/50",
                    answers[q.id]?.includes(c.id) && "border-foreground bg-muted",
                  )}
                  onClick={() => toggleChoice(c.id)}
                >
                  {c.text}
                  {answers[q.id]?.includes(c.id) ? " ✓" : ""}
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : null}
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          className="min-h-11"
          variant="outline"
          onClick={() => setI(Math.max(0, i - 1))}
        >
          Previous
        </Button>
        <Button
          size="sm"
          className="min-h-11"
          variant="outline"
          onClick={() => setI(Math.min(totalItems - 1, i + 1))}
        >
          Next
        </Button>
        <Button
          size="sm"
          className="min-h-11"
          variant="ghost"
          onClick={() => {
            const id = onPbq ? PBQ_ID : q?.id;
            if (!id) return;
            setFlagged((f) => {
              const n = new Set(f);
              if (n.has(id)) n.delete(id);
              else n.add(id);
              return n;
            });
          }}
        >
          {flagged.has(onPbq ? PBQ_ID : q?.id ?? "") ? "Unflag" : "Flag"}
        </Button>
        <Button size="sm" className="min-h-11" onClick={() => void finish()}>
          Submit exam
        </Button>
      </div>
      <div className="flex flex-wrap gap-1">
        <button
          type="button"
          className={`size-11 rounded border text-[10px] ${
            flagged.has(PBQ_ID) ? "bg-amber-500/20" : pbq.length ? "bg-muted" : ""
          }`}
          onClick={() => setI(0)}
        >
          PBQ
        </button>
        {items.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            className={`size-11 rounded border text-[10px] ${
              flagged.has(item.id)
                ? "bg-amber-500/20"
                : answers[item.id]
                  ? "bg-muted"
                  : ""
            }`}
            onClick={() => setI(idx + 1)}
          >
            {idx + 2}
          </button>
        ))}
      </div>
    </div>
  );
}
