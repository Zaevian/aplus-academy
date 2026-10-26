import { describe, expect, it } from "vitest";
import { FOUNDATION_OBJECTIVES } from "@/content/catalog";
import { getLessons, getQuestions } from "@/content/registry";
import { initialProgress } from "@/db/client";
import { lessonPath } from "@/lib/course";
import {
  FIRST_LESSON_HREF,
  FIRST_LESSON_TITLE,
  RETIRED_OVERVIEW_HREF,
  lessonAtHref,
  nextStudy,
  openingResume,
  studySteps,
} from "@/lib/study-path";

describe("no CompTIA overview gate before lesson 1", () => {
  it("removes the What CompTIA A+ is objective, lesson, and questions", () => {
    expect(FOUNDATION_OBJECTIVES.some((o) => o.slug === "what-a-plus-is")).toBe(false);
    expect(FOUNDATION_OBJECTIVES.some((o) => o.id === "FND-D0-O1")).toBe(false);
    expect(getLessons().some((l) => l.objectiveId === "FND-D0-O1")).toBe(false);
    expect(getQuestions().some((q) => q.objectiveId === "FND-D0-O1")).toBe(false);
    expect(lessonAtHref(RETIRED_OVERVIEW_HREF)).toBeNull();
  });

  it("no lesson block references a removed question", () => {
    const ids = new Set(getQuestions().map((q) => q.id));
    for (const lesson of getLessons()) {
      for (const block of lesson.blocks) {
        if ("questionIds" in block && Array.isArray(block.questionIds)) {
          for (const id of block.questionIds) expect(ids.has(id), `${lesson.id} → ${id}`).toBe(true);
        }
      }
    }
  });

  it("lesson 1 is the first lesson on the path, with no prerequisite", () => {
    const first = getLessons().find((l) => lessonPath(l.id) === FIRST_LESSON_HREF);
    expect(first?.title).toBe(FIRST_LESSON_TITLE);
    expect(first?.prerequisites).toEqual([]);
    const next = nextStudy(initialProgress());
    expect(next.href).toBe(FIRST_LESSON_HREF);
    expect(studySteps(initialProgress())[0]?.href).toBe(FIRST_LESSON_HREF);
    const resume = openingResume(initialProgress());
    expect(resume.source).toBe("begin");
    expect(resume.href).toBe(FIRST_LESSON_HREF);
  });

  it("a learner saved on the retired overview URL starts at lesson 1", () => {
    const progress = initialProgress();
    progress.currentLocation = RETIRED_OVERVIEW_HREF;
    progress.lastContentHref = RETIRED_OVERVIEW_HREF;
    const resume = openingResume(progress);
    expect(resume.source).toBe("begin");
    expect(resume.href).toBe(FIRST_LESSON_HREF);
  });

  it("a learner who already finished the retired overview continues at lesson 1", () => {
    const progress = initialProgress();
    progress.currentLocation = "/start";
    progress.completedLessons = ["FND-D0-O1-L1"];
    progress.completedBlocks = ["FND-D0-O1-L1-kc1", "FND-D0-O1-L1-kc2"];
    expect(openingResume(progress).href).toBe(FIRST_LESSON_HREF);
  });
});
