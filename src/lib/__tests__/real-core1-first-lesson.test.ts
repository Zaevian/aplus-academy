import { describe, expect, it } from "vitest";
import { ALL_OBJECTIVES } from "@/content/catalog";
import { getLessons } from "@/content/registry";
import { initialProgress } from "@/db/client";
import { lessonPath } from "@/lib/course";
import nextConfig from "../../../next.config";
import {
  FIRST_LESSON_HREF,
  FIRST_LESSON_ID,
  FORMER_FIRST_LESSON_HREF,
  RETIRED_OVERVIEW_HREF,
  lessonAtHref,
  nextLessonAfter,
  nextStudy,
  openingResume,
  studySteps,
} from "@/lib/study-path";

describe("lesson 1 is real Core 1 exam content", () => {
  it("lesson 1 is the first lesson of 220-1201 objective 1.1, not academy orientation", () => {
    const first = lessonAtHref(FIRST_LESSON_HREF);
    expect(first?.id).toBe(FIRST_LESSON_ID);
    const objective = ALL_OBJECTIVES.find((o) => o.id === first?.objectiveId);
    expect(objective?.core).toBe("C1");
    expect(objective?.officialCode).toBe("1.1");
    expect(objective?.examPercent).toBeGreaterThan(0);
    expect(first?.prerequisites).toEqual([]);
    // It is the first Core 1 lesson in catalog order.
    expect(getLessons().find((l) => l.objectiveId.startsWith("C1-"))?.id).toBe(FIRST_LESSON_ID);
  });

  it("keeps Duolingo-style in-lesson gating on lesson 1", () => {
    const first = lessonAtHref(FIRST_LESSON_HREF)!;
    const checks = first.blocks.filter((b) => b.type === "knowledge-check" || b.type === "checkpoint");
    expect(checks.length).toBeGreaterThan(0);
  });

  it("a new learner's path, hero, and step 1 all open lesson 1", () => {
    const fresh = initialProgress();
    expect(nextStudy(fresh).href).toBe(FIRST_LESSON_HREF);
    expect(nextStudy(fresh).stepLabel).toBe("Step 1 of 2 · Core 1");
    const steps = studySteps(fresh);
    expect(steps[0]?.href).toBe(FIRST_LESSON_HREF);
    expect(steps[0]?.status).toBe("current");
    expect(steps.find((s) => s.href === "/course/foundation")?.status).toBe("next");
    const resume = openingResume(fresh);
    expect(resume.source).toBe("begin");
    expect(resume.href).toBe(FIRST_LESSON_HREF);
  });

  it("no Foundation lesson sits in front of Core 1 on the required path", () => {
    const progress = initialProgress();
    progress.completedLessons = [FIRST_LESSON_ID];
    const next = nextStudy(progress);
    expect(next.href.startsWith("/course/core-1/")).toBe(true);
  });

  it("the former orientation lesson is still reachable and optional", () => {
    expect(lessonAtHref(FORMER_FIRST_LESSON_HREF)).not.toBeNull();
    // Older onboarding wrote it into currentLocation; untouched, that means begin.
    const progress = initialProgress();
    progress.currentLocation = FORMER_FIRST_LESSON_HREF;
    const resume = openingResume(progress);
    expect(resume.source).toBe("begin");
    expect(resume.href).toBe(FIRST_LESSON_HREF);
  });

  it("a learner who actually studied Foundation still resumes there", () => {
    const progress = initialProgress();
    progress.lastContentHref = FORMER_FIRST_LESSON_HREF;
    progress.completedBlocks = ["FND-D0-O2-L1-kc1"];
    const resume = openingResume(progress);
    expect(resume.source).toBe("saved");
    expect(resume.href).toBe(FORMER_FIRST_LESSON_HREF);
  });

  it("Foundation lessons chain to each other and hand off to lesson 1", () => {
    const fnd = getLessons().filter((l) => l.objectiveId.startsWith("FND-"));
    const last = fnd[fnd.length - 1]!;
    expect(nextLessonAfter(last.id)?.href).toBe(FIRST_LESSON_HREF);
    expect(nextLessonAfter(fnd[0]!.id)?.href).toBe(lessonPath(fnd[1]!.id));
    // Core lessons never detour into Foundation.
    expect(nextLessonAfter(FIRST_LESSON_ID)?.href.startsWith("/course/core-1/")).toBe(true);
  });

  it("the retired overview URL redirects to lesson 1", async () => {
    const redirects = (await nextConfig.redirects?.()) ?? [];
    const retired = redirects.find((r) => r.source === RETIRED_OVERVIEW_HREF);
    expect(retired?.destination).toBe(FIRST_LESSON_HREF);
    expect(redirects.some((r) => r.source === FORMER_FIRST_LESSON_HREF)).toBe(false);
  });
});
