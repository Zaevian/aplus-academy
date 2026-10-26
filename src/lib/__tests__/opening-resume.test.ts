import { describe, expect, it } from "vitest";
import { initialProgress } from "@/db/client";
import { lessonPath } from "@/lib/course";
import {
  FIRST_LESSON_HREF,
  FIRST_LESSON_TITLE,
  openingResume,
  rememberContentHref,
} from "@/lib/study-path";

const CORE_LESSON = "C1-D1-O1-L1";

describe("opening resume", () => {
  it("begins Foundation lesson 1 when nothing is saved", () => {
    const resume = openingResume(initialProgress());
    expect(resume.source).toBe("begin");
    expect(resume.href).toBe(FIRST_LESSON_HREF);
    expect(resume.title).toBe(FIRST_LESSON_TITLE);
    expect(resume.objectiveTitle.length).toBeGreaterThan(0);
  });

  it("ignores the onboarding pointer to lesson 1", () => {
    const progress = initialProgress();
    progress.currentLocation = FIRST_LESSON_HREF;
    expect(openingResume(progress).source).toBe("begin");
    const remembered = rememberContentHref(progress, "/start");
    expect(remembered.lastContentHref).toBeNull();
    expect(remembered.currentLocation).toBe("/start");
  });

  it("resumes the saved lesson when the shell page is current", () => {
    const href = lessonPath(CORE_LESSON);
    const progress = initialProgress();
    progress.currentLocation = "/start";
    progress.lastContentHref = href;
    const resume = openingResume(progress);
    expect(resume.source).toBe("saved");
    expect(resume.href).toBe(href);
    expect(resume.title).toBe("Laptop serviceability, batteries, and keyboards");
    expect(resume.objectiveTitle).toContain("Laptop");
  });

  it("records a lesson visit and ignores a later shell route", () => {
    const href = lessonPath(CORE_LESSON);
    const visited = rememberContentHref(initialProgress(), `${href}?from=nav`);
    expect(visited.lastContentHref).toBe(href);
    expect(visited.currentLocation).toBe(href);
    const progress = initialProgress();
    progress.currentLocation = visited.currentLocation;
    progress.lastContentHref = visited.lastContentHref;
    const shelled = rememberContentHref(progress, "/settings");
    expect(shelled.lastContentHref).toBe(href);
    expect(shelled.currentLocation).toBe("/settings");
    expect(openingResume({ ...progress, ...shelled }).href).toBe(href);
  });

  it("copies an older studied location forward on the next navigation", () => {
    const href = lessonPath(CORE_LESSON);
    const progress = initialProgress();
    progress.currentLocation = href;
    progress.lastStudyDay = "2026-10-01";
    progress.lastContentHref = null;
    const remembered = rememberContentHref(progress, "/start");
    expect(remembered.lastContentHref).toBe(href);
    expect(remembered.currentLocation).toBe("/start");
    expect(openingResume({ ...progress, ...remembered }).source).toBe("saved");
  });

  it("falls back to the next open lesson when completions exist without a url", () => {
    const progress = initialProgress();
    progress.currentLocation = "/settings";
    progress.completedLessons = ["FND-D0-O1-L1"];
    const resume = openingResume(progress);
    expect(resume.source).toBe("next");
    expect(resume.href.startsWith("/course/")).toBe(true);
    expect(resume.href).not.toBe(FIRST_LESSON_HREF);
    expect(resume.title.length).toBeGreaterThan(0);
    expect(resume.objectiveTitle.length).toBeGreaterThan(0);
  });
});
