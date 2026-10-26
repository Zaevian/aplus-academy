import { ALL_OBJECTIVES, DOMAINS } from "@/content/catalog";
import { getLessons } from "@/content/registry";
import { lessonPath } from "@/lib/course";
import type { ProgressSnapshot } from "@/db/client";
import type { Lesson } from "@/content/schema";

/**
 * Lesson 1 is real exam content: Core 1 (220-1201) objective 1.1, the first
 * objective in CompTIA's own order. Foundation (academy orientation, exam
 * wording, troubleshooting habits, safety/units) is optional study skills and no
 * longer sits in front of Core 1. /course/foundation/what-a-plus-is redirects
 * here (next.config.ts) for old bookmarks and saved locations.
 */
export const FIRST_LESSON_ID = "C1-D1-O1-L1";
export const FIRST_LESSON_HREF =
  "/course/core-1/domain-1/1-1-laptop-hardware/laptop-battery-keyboard";
export const FIRST_LESSON_TITLE = "Laptop serviceability, batteries, and keyboards";
/** Short UI label for lesson 1 (hero, onboarding, start-over). */
export const FIRST_LESSON_LABEL = "Core 1 lesson 1";
/** Removed CompTIA overview lesson; kept only so old saved URLs can be recognized. */
export const RETIRED_OVERVIEW_HREF = "/course/foundation/what-a-plus-is";
/**
 * Former lesson 1 (academy orientation). Still a live, optional Foundation
 * lesson, but older onboarding wrote it into currentLocation before the
 * learner opened anything, so an untouched pointer to it means "begin".
 */
export const FORMER_FIRST_LESSON_HREF = "/course/foundation/how-the-academy-works";

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
  const locatedHref = located ? lessonPath(located.id) : null;
  const onboardingPointer =
    located != null &&
    (locatedHref === FIRST_LESSON_HREF || locatedHref === FORMER_FIRST_LESSON_HREF) &&
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

function lessonsByCore() {
  const lessons = getLessons();
  return {
    fnd: lessons.filter((l) => l.objectiveId.startsWith("FND-")),
    c1: lessons.filter((l) => l.objectiveId.startsWith("C1-")),
    c2: lessons.filter((l) => l.objectiveId.startsWith("C2-")),
  };
}

/** Required path: Core 1 then Core 2. Foundation is optional study skills. */
function orderedLessons(): Lesson[] {
  const { c1, c2 } = lessonsByCore();
  return [...c1, ...c2];
}

/**
 * Reading order for "next lesson" links. Foundation lessons chain among
 * themselves and the last one hands off to Core 1 lesson 1; Core lessons
 * follow the required path and never detour into Foundation.
 */
function readingOrderFor(lessonId: string): Lesson[] {
  const { fnd, c1, c2 } = lessonsByCore();
  if (fnd.some((l) => l.id === lessonId)) {
    const first = c1.find((l) => l.id === FIRST_LESSON_ID);
    return first ? [...fnd, first] : fnd;
  }
  return [...c1, ...c2];
}

export function foundationComplete(progress?: ProgressSnapshot): boolean {
  return !lessonsByCore().fnd.some((l) => lessonIsOpen(l, progress));
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
        "Core 1 and Core 2 lessons are marked complete. Use labs, review, and the 90-question exam simulator next.",
    };
  }
  const core = next.objectiveId.startsWith("C1-") ? "Core 1" : "Core 2";
  const step = core === "Core 1" ? 1 : 2;
  return {
    href: lessonPath(next.id),
    title: next.title,
    stepLabel: `Step ${step} of 2 · ${core}`,
    detail:
      core === "Core 1"
        ? "Core 1 (220-1201): mobile devices, networking, hardware, virtualization/cloud, troubleshooting."
        : "Core 2 (220-1202): OS, security, software troubleshooting, procedures.",
  };
}

export function studySteps(progress?: ProgressSnapshot): StudyStep[] {
  const next = nextStudy(progress);
  const c1Done = next.stepLabel.includes("Core 2") || next.stepLabel.includes("Path complete");
  const allDone = next.stepLabel.includes("Path complete");
  return [
    {
      n: 1,
      title: "Core 1 · 220-1201",
      href: c1Done ? "/course/core-1" : FIRST_LESSON_HREF,
      blurb: "Starts at 1.1 laptop hardware. Mobile devices, networking, hardware, virtualization/cloud, and hardware troubleshooting.",
      status: allDone || c1Done ? "done" : "current",
    },
    {
      n: 2,
      title: "Core 2 · 220-1202",
      href: "/course/core-2",
      blurb: "Operating systems, security, software troubleshooting, and operational procedures.",
      status: allDone ? "done" : c1Done ? "current" : "next",
    },
    {
      n: 3,
      title: "Study skills · optional",
      href: "/course/foundation",
      blurb: "How the academy gates you, BEST/FIRST/NEXT exam wording, a troubleshooting habit, and safety/units. Not scored; dip in any time.",
      status: foundationComplete(progress) ? "done" : "next",
    },
  ];
}

export function nextLessonAfter(lessonId: string): { href: string; title: string } | null {
  const list = readingOrderFor(lessonId);
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
