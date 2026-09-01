"use client";

import { useMemo, useState } from "react";
import type { Lesson } from "@/content/schema";
import { getQuestions, getLab } from "@/content/registry";
import { Prose } from "@/components/lesson/prose";
import { KnowledgeCheck } from "@/components/lesson/knowledge-check";
import { TechnicalDiagram } from "@/components/diagrams/registry";
import { useAcademy } from "@/components/academy-provider";
import {
  completeLesson,
  completeObjective,
  toggleLessonBookmark,
} from "@/lib/progress-actions";
import { LabHost } from "@/components/labs/lab-host";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SOURCES } from "@/content/sources";
import { lockAtIndex } from "@/lib/lesson-lock";
import { ALL_OBJECTIVES, DOMAINS } from "@/content/catalog";
import { DomainGate } from "@/components/course/domain-gate";
import { addNote } from "@/lib/progress-actions";
import { ListenButton } from "@/components/voice/listen-button";
import { lessonSpokenText, stripForSpeech } from "@/lib/spoken-text";
import { nextLessonAfter } from "@/lib/study-path";
import Link from "next/link";

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
  const { progress, bookmarks } = useAcademy();
  const completed = new Set(progress?.completedBlocks ?? []);
  const [noteBody, setNoteBody] = useState("");
  const bookmarked = bookmarks.some(
    (b) => b.targetType === "lesson" && b.targetId === lesson.id,
  );

  const questionsById = useMemo(() => {
    const map = new Map(getQuestions().map((q) => [q.id, q]));
    return map;
  }, []);

  const lockAt = lockAtIndex(lesson.blocks, completed);
  const objective = ALL_OBJECTIVES.find((o) => o.id === lesson.objectiveId);
  const domain = objective
    ? DOMAINS.find((d) => d.core === objective.core && d.number === objective.domain)
    : undefined;

  return (
    <DomainGate domainId={domain?.id ?? "FND-D0"}>
    <article className="mx-auto max-w-3xl space-y-8 px-4 py-8">
      <header className="space-y-2">
        <p className="text-xs tracking-wide text-muted-foreground uppercase">
          {lesson.objectiveId} · {lesson.estimatedMinutes} min
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">{lesson.title}</h1>
        <p className="text-muted-foreground">{lesson.description}</p>
        <div className="flex flex-wrap gap-2">
          <ListenButton
            text={lessonSpokenText(lesson)}
            title={lesson.title}
            label="Listen to this lesson"
          />
          <Button
            variant={bookmarked ? "default" : "outline"}
            size="sm"
            className="min-h-11"
            onClick={() => void toggleLessonBookmark(lesson.id, lesson.title)}
          >
            {bookmarked ? "Bookmarked" : "Bookmark"}
          </Button>
        </div>
        <form
          className="flex flex-col gap-2 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            if (!noteBody.trim()) return;
            void addNote("lesson", lesson.id, noteBody);
            setNoteBody("");
          }}
        >
          <textarea
            className="min-h-11 flex-1 rounded-md border bg-background px-3 py-2 text-sm"
            placeholder="Write a note about this lesson"
            value={noteBody}
            onChange={(e) => setNoteBody(e.target.value)}
          />
          <Button type="submit" size="sm" className="min-h-11" disabled={!noteBody.trim()}>
            Save note
          </Button>
        </form>
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
              <div className="flex flex-wrap items-center justify-between gap-2">
                {block.title ? (
                  <h2 className="text-lg font-semibold">{block.title}</h2>
                ) : <span />}
                <ListenButton
                  text={stripForSpeech(`${block.title ?? ""}. ${block.markdown}`)}
                  title={block.title ?? "Reading"}
                  label="Listen"
                />
              </div>
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
              <div className="flex flex-wrap items-start justify-between gap-2">
                <p className="font-medium">{block.callout.title}</p>
                <ListenButton
                  text={`${block.callout.title}. ${block.callout.body}`}
                  title={block.callout.title}
                  label="Listen"
                />
              </div>
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
          const nxt = nextLessonAfter(lesson.id);
          return (
            <section key={block.id}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-lg font-semibold">Summary</h2>
                <ListenButton
                  text={`Summary. ${block.bullets.join(". ")}`}
                  title="Summary"
                  label="Listen"
                />
              </div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">
                {block.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  onClick={() => void completeLesson(lesson.id)}
                  variant="outline"
                  size="sm"
                  className="min-h-11"
                >
                  Mark lesson complete
                </Button>
                {nxt ? (
                  <Button size="sm" className="min-h-11" render={<Link href={nxt.href} />}>
                    Next: {nxt.title}
                  </Button>
                ) : null}
              </div>
            </section>
          );
        }
        if (block.type === "illustration" || block.type === "video" || block.type === "voice") {
          const spoken =
            "transcript" in block
              ? String(block.transcript)
              : "caption" in block
                ? String(block.caption)
                : "";
          return (
            <div key={block.id} className="rounded-lg border p-3 text-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Badge variant="secondary">Media fallback</Badge>
                {spoken ? (
                  <ListenButton text={spoken} title={"title" in block ? String(block.title) : "Media"} />
                ) : null}
              </div>
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
    </DomainGate>
  );
}
