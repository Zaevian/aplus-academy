"use client";

import { useMemo } from "react";
import type { Lesson } from "@/content/schema";
import { getQuestions, getLab } from "@/content/registry";
import { Prose } from "@/components/lesson/prose";
import { KnowledgeCheck } from "@/components/lesson/knowledge-check";
import { TechnicalDiagram } from "@/components/diagrams/registry";
import { useAcademy } from "@/components/academy-provider";
import { completeLesson, completeObjective } from "@/lib/progress-actions";
import { LabHost } from "@/components/labs/lab-host";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { addBookmark } from "@/lib/progress-actions";
import { SOURCES } from "@/content/sources";

const CALLOUT_STYLES: Record<string, string> = {
  exam: "border-l-foreground",
  technician: "border-l-sky-600",
  mistake: "border-l-destructive",
  why: "border-l-amber-500",
  notice: "border-l-foreground/40",
  safety: "border-l-orange-600",
  definition: "border-l-emerald-600",
};

export function LessonView({ lesson }: { lesson: Lesson }) {
  const { progress } = useAcademy();
  const completed = new Set(progress?.completedBlocks ?? []);

  const questionsById = useMemo(() => {
    const map = new Map(getQuestions().map((q) => [q.id, q]));
    return map;
  }, []);

  const lockAt = lesson.blocks.findIndex(
    (block) =>
      (block.type === "knowledge-check" || block.type === "checkpoint") &&
      !completed.has(block.id),
  );

  return (
    <article className="mx-auto max-w-3xl space-y-8 px-4 py-8">
      <header className="space-y-2">
        <p className="text-xs tracking-wide text-muted-foreground uppercase">
          {lesson.objectiveId} · {lesson.estimatedMinutes} min
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">{lesson.title}</h1>
        <p className="text-muted-foreground">{lesson.description}</p>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            void addBookmark("lesson", lesson.id, lesson.title)
          }
        >
          Bookmark
        </Button>
      </header>

      {lesson.blocks.map((block, index) => {
        const isCheck =
          block.type === "knowledge-check" || block.type === "checkpoint";
        const locked =
          lockAt !== -1 && index > lockAt && !completed.has(block.id);
        if (locked && !isCheck) {
          return (
            <div
              key={block.id}
              className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground"
            >
              Locked until the previous knowledge check is answered correctly.
            </div>
          );
        }
        if (block.type === "reading") {
          return (
            <section key={block.id} className="space-y-2">
              {block.title ? (
                <h2 className="text-lg font-semibold">{block.title}</h2>
              ) : null}
              <Prose markdown={block.markdown} />
            </section>
          );
        }
        if (block.type === "callout") {
          return (
            <aside
              key={block.id}
              className={`rounded-md border border-l-4 bg-card p-3 text-sm leading-6 ${CALLOUT_STYLES[block.callout.kind]}`}
            >
              <p className="font-medium">{block.callout.title}</p>
              <p className="mt-1 text-muted-foreground">{block.callout.body}</p>
            </aside>
          );
        }
        if (block.type === "diagram") {
          return (
            <TechnicalDiagram
              key={block.id}
              component={block.component}
              title={block.title}
              caption={block.caption}
              notice={block.notice}
              alt={block.alt}
            />
          );
        }
        if (block.type === "table") {
          return (
            <div key={block.id} className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <caption className="mb-2 text-left font-medium">
                  {block.title}
                </caption>
                <thead>
                  <tr className="border-b">
                    {block.headers.map((h) => (
                      <th key={h} className="py-1 pr-3 font-medium">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, i) => (
                    <tr key={i} className="border-b border-border/60">
                      {row.map((c, j) => (
                        <td key={j} className="py-1.5 pr-3">
                          {c}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        if (block.type === "lab") {
          const lab = getLab(block.labId);
          return (
            <div key={block.id} className="space-y-2">
              <h2 className="text-lg font-semibold">{block.title}</h2>
              <p className="text-sm text-muted-foreground">{block.prompt}</p>
              {lab ? <LabHost lab={lab} /> : <p>Lab missing.</p>}
            </div>
          );
        }
        if (block.type === "knowledge-check" || block.type === "checkpoint") {
          const qs = block.questionIds
            .map((id) => questionsById.get(id))
            .filter((q) => q != null);
          return (
            <KnowledgeCheck
              key={block.id}
              blockId={block.id}
              questions={qs}
              context={block.type === "checkpoint" ? "checkpoint" : "block"}
              onPassed={() => {
                if (block.type === "checkpoint") {
                  void completeObjective(lesson.objectiveId);
                }
              }}
            />
          );
        }
        if (block.type === "summary") {
          return (
            <section key={block.id}>
              <h2 className="text-lg font-semibold">Summary</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">
                {block.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <div className="mt-4">
                <Button
                  onClick={() => void completeLesson(lesson.id)}
                  variant="outline"
                  size="sm"
                >
                  Mark lesson complete
                </Button>
              </div>
            </section>
          );
        }
        if (block.type === "illustration" || block.type === "video" || block.type === "voice") {
          return (
            <div key={block.id} className="rounded-lg border p-3 text-sm">
              <Badge variant="secondary">Media fallback</Badge>
              <p className="mt-2">
                {"title" in block ? block.title : "Media"} — transcript/caption
                remains available without generation credentials.
              </p>
              {"transcript" in block ? (
                <p className="mt-2 text-muted-foreground">{block.transcript}</p>
              ) : "caption" in block ? (
                <p className="mt-2 text-muted-foreground">{block.caption}</p>
              ) : null}
            </div>
          );
        }
        return null;
      })}

      <footer className="border-t pt-4 text-xs text-muted-foreground">
        Sources:{" "}
        {lesson.sources
          .map((id) => SOURCES.find((s) => s.id === id)?.title ?? id)
          .join(" · ")}
        . Verified {lesson.lastVerified}.
      </footer>
    </article>
  );
}
