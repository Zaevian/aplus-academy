import { describe, expect, it } from "vitest";
import { ALL_OBJECTIVES, DOMAINS } from "../catalog";
import { QuestionSchema } from "../schema";
import { FOUNDATION_QUESTIONS } from "../questions/foundation";
import { FOUNDATION_LESSONS } from "../lessons/foundation";
import { ACRONYMS } from "../glossary/acronyms";
import { PORTS } from "../ports";

describe("curriculum fixtures", () => {
  it("has 63 exam objectives plus foundation", () => {
    expect(ALL_OBJECTIVES.filter((o) => o.core !== "FND")).toHaveLength(63);
    expect(DOMAINS.length).toBe(10);
  });

  it("validates foundation questions", () => {
    for (const q of FOUNDATION_QUESTIONS) {
      expect(() => QuestionSchema.parse(q)).not.toThrow();
    }
  });

  it("gives every foundation lesson a visual and a check", () => {
    for (const lesson of FOUNDATION_LESSONS) {
      expect(lesson.blocks.some((b) => b.type === "diagram" || b.type === "lab")).toBe(true);
      expect(lesson.blocks.some((b) => b.type === "knowledge-check")).toBe(true);
    }
  });

  it("includes official ports and acronyms", () => {
    expect(PORTS.some((p) => p.ports === "3389")).toBe(true);
    expect(ACRONYMS.some((a) => a.acronym === "RAID")).toBe(true);
  });
});
