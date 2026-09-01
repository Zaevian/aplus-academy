import { ALL_OBJECTIVES, DOMAINS } from "@/content/catalog";
import { getLessons } from "@/content/registry";
import { lessonPath } from "@/lib/course";
import type { ProgressSnapshot } from "@/db/client";
import type { Lesson } from "@/content/schema";

export const FIRST_LESSON_HREF = "/course/foundation/what-a-plus-is";
export const FIRST_LESSON_TITLE = "What CompTIA A+ actually certifies";

export type StudyStep = {
  n: number;
  title: string;
  href: string;
  blurb: string;
  status: "current" | "done" | "next";
};

export type NextStudy = {
  href: string;
  title: string;
  stepLabel: string;
  detail: string;
};

function orderedLessons(): Lesson[] {
  const lessons = getLessons();
  const fnd = lessons.filter((l) => l.objectiveId.startsWith("FND-"));
  const c1 = lessons.filter((l) => l.objectiveId.startsWith("C1-"));
  const c2 = lessons.filter((l) => l.objectiveId.startsWith("C2-"));
  return [...fnd, ...c1, ...c2];
}

export function lessonIsOpen(
  lesson: Lesson,
  progress?: ProgressSnapshot,
): boolean {
  const completedLessons = new Set(progress?.completedLessons ?? []);
  if (completedLessons.has(lesson.id)) return false;
  const completedBlocks = new Set(progress?.completedBlocks ?? []);
  const checks = lesson.blocks.filter(
    (b) => b.type === "knowledge-check" || b.type === "checkpoint",
  );
  if (checks.length === 0) return !completedLessons.has(lesson.id);
  return checks.some((b) => !completedBlocks.has(b.id));
}

export function nextStudy(progress?: ProgressSnapshot): NextStudy {
  const next = orderedLessons().find((l) => lessonIsOpen(l, progress));
  if (!next) {
    return {
      href: "/exam",
      title: "Exam simulator",
      stepLabel: "Path complete",
      detail:
        "Foundation, Core 1, and Core 2 lessons are marked complete. Use labs, review, and the 90-question exam simulator next.",
    };
  }
  const core = next.objectiveId.startsWith("FND-")
    ? "Foundation"
    : next.objectiveId.startsWith("C1-")
      ? "Core 1"
      : "Core 2";
  const step =
    core === "Foundation" ? 1 : core === "Core 1" ? 2 : 3;
  return {
    href: lessonPath(next.id),
    title: next.title,
    stepLabel: `Step ${step} of 3 · ${core}`,
    detail:
      core === "Foundation"
        ? "Start here. Orientation comes before Core 1 hardware."
        : core === "Core 1"
          ? "Core 1 (220-1201): hardware, networking, mobile, cloud, troubleshooting."
          : "Core 2 (220-1202): OS, security, software troubleshooting, procedures.",
  };
}

export function studySteps(progress?: ProgressSnapshot): StudyStep[] {
  const next = nextStudy(progress);
  const fndDone = !next.stepLabel.includes("Foundation");
  const c1Done = next.stepLabel.includes("Core 2") || next.stepLabel.includes("Path complete");
  const allDone = next.stepLabel.includes("Path complete");
  return [
    {
      n: 1,
      title: "Foundation",
      href: FIRST_LESSON_HREF,
      blurb: "How A+ works, how this course gates you, and how to think like a technician. Do this first.",
      status: fndDone ? "done" : "current",
    },
    {
      n: 2,
      title: "Core 1 · 220-1201",
      href: "/course/core-1",
      blurb: "Hardware, mobile, networking, virtualization/cloud, and hardware troubleshooting.",
      status: allDone || c1Done ? "done" : fndDone ? "current" : "next",
    },
    {
      n: 3,
      title: "Core 2 · 220-1202",
      href: "/course/core-2",
      blurb: "Operating systems, security, software troubleshooting, and operational procedures.",
      status: allDone ? "done" : c1Done ? "current" : "next",
    },
  ];
}

export function nextLessonAfter(lessonId: string): { href: string; title: string } | null {
  const list = orderedLessons();
  const i = list.findIndex((l) => l.id === lessonId);
  if (i === -1 || i === list.length - 1) return null;
  const n = list[i + 1]!;
  return { href: lessonPath(n.id), title: n.title };
}

export function domainTitleForLesson(lessonId: string): string {
  const lesson = getLessons().find((l) => l.id === lessonId);
  if (!lesson) return "";
  const objective = ALL_OBJECTIVES.find((o) => o.id === lesson.objectiveId);
  if (!objective) return "";
  const domain = DOMAINS.find(
    (d) => d.core === objective.core && d.number === objective.domain,
  );
  return domain?.title ?? "";
}
