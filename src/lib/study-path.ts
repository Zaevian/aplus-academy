import { ALL_OBJECTIVES, DOMAINS } from "@/content/catalog";
import { getLessons } from "@/content/registry";
import { lessonPath } from "@/lib/course";
import type { ProgressSnapshot } from "@/db/client";
import type { Lesson } from "@/content/schema";

export const FIRST_LESSON_HREF = "/course/foundation/what-a-plus-is";
export const FIRST_LESSON_TITLE = "What CompTIA A+ actually certifies";

export type OpeningResume = {
  /** saved: last lesson URL. next: completions exist but that URL was not stored. begin: nothing to resume. */
  source: "saved" | "next" | "begin";
  href: string;
  title: string;
  objectiveTitle: string;
};

/** Strip hash, query, and a trailing slash so stored hrefs match lesson routes. */
export function normalizePath(href: string): string {
  const path = (href.split("#")[0] ?? "").split("?")[0] ?? "";
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path;
}

let lessonHrefIndex: Map<string, Lesson> | null = null;

function lessonsByHref(): Map<string, Lesson> {
  if (lessonHrefIndex) return lessonHrefIndex;
  const map = new Map<string, Lesson>();
  for (const lesson of getLessons()) {
    map.set(lessonPath(lesson.id), lesson);
  }
  lessonHrefIndex = map;
  return map;
}

export function lessonAtHref(href: string | null | undefined): Lesson | null {
  if (!href) return null;
  return lessonsByHref().get(normalizePath(href)) ?? null;
}

function completionCount(progress: ProgressSnapshot): number {
  return (
    progress.completedBlocks.length +
    progress.completedLessons.length +
    progress.completedObjectives.length +
    progress.completedDomains.length +
    progress.completedLabs.length
  );
}

function objectiveTitleFor(objectiveId: string): string {
  return ALL_OBJECTIVES.find((objective) => objective.id === objectiveId)?.title ?? "";
}

function describeLesson(lesson: Lesson): Pick<OpeningResume, "href" | "title" | "objectiveTitle"> {
  return {
    href: lessonPath(lesson.id),
    title: lesson.title,
    objectiveTitle: objectiveTitleFor(lesson.objectiveId),
  };
}

/**
 * Remember a lesson visit without letting shell pages (Start, Settings, Progress)
 * erase it. Older rows only have currentLocation, so the first later navigation
 * copies a studied lesson URL forward.
 */
export function rememberContentHref(
  progress: Pick<ProgressSnapshot, "currentLocation" | "lastContentHref" | "lastStudyDay">,
  pathname: string,
): { currentLocation: string; lastContentHref: string | null } {
  const path = normalizePath(pathname) || "/";
  let last = progress.lastContentHref ? normalizePath(progress.lastContentHref) : null;
  if (last && !lessonAtHref(last)) last = null;
  if (lessonAtHref(path)) {
    last = path;
  } else if (!last && progress.lastStudyDay && lessonAtHref(progress.currentLocation)) {
    last = normalizePath(progress.currentLocation);
  }
  return { currentLocation: path, lastContentHref: last };
}

/** Where the opening hero should send the learner. */
export function openingResume(progress?: ProgressSnapshot): OpeningResume {
  const saved = lessonAtHref(progress?.lastContentHref);
  if (saved) return { source: "saved", ...describeLesson(saved) };

  const located = lessonAtHref(progress?.currentLocation);
  const completions = progress ? completionCount(progress) : 0;
  // Onboarding writes lesson 1 into currentLocation before the learner opens it.
  const onboardingPointer =
    located != null &&
    lessonPath(located.id) === FIRST_LESSON_HREF &&
    completions === 0;

  if (located && !onboardingPointer) {
    return { source: "saved", ...describeLesson(located) };
  }

  if (progress && completions > 0) {
    const next = nextStudy(progress);
    const lesson = lessonAtHref(next.href);
    if (lesson) return { source: "next", ...describeLesson(lesson) };
    return {
      source: "next",
      href: next.href,
      title: next.title,
      objectiveTitle: next.stepLabel,
    };
  }

  const first = lessonAtHref(FIRST_LESSON_HREF);
  return {
    source: "begin",
    href: FIRST_LESSON_HREF,
    title: first?.title ?? FIRST_LESSON_TITLE,
    objectiveTitle: first ? objectiveTitleFor(first.objectiveId) : "",
  };
}

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
