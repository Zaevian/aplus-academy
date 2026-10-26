import { describe, expect, it } from "vitest";
import { C1_D5_MISCONCEPTION_TAGS, C1_D5_QUESTIONS } from "@/content/questions/c1/d5";

const byId = (id: string) => C1_D5_QUESTIONS.find((q) => q.id === id);

describe("C1-D5 second-pass audit (2026-10-26)", () => {
  it("every Troubleshooting question carries misconception tags from a known family", () => {
    for (const q of C1_D5_QUESTIONS) {
      const family = q.id.replace(/-Q\d+$/, "");
      expect(C1_D5_MISCONCEPTION_TAGS[family], family).toBeDefined();
      expect(q.tags).toContain("misconception");
      expect(q.tags!.length).toBeGreaterThan(1);
    }
  });

  it("every rationale (key and distractor) explains itself (>= 25 chars)", () => {
    const weak = C1_D5_QUESTIONS.flatMap((q) =>
      q.choices.filter((c) => c.rationale.length < 25).map((c) => `${q.id}/${c.id}`),
    );
    expect(weak).toEqual([]);
  });

  it("no key rationale is a bare 'Correct.'", () => {
    const bare = C1_D5_QUESTIONS.flatMap((q) =>
      q.choices
        .filter((c) => q.correct.includes(c.id) && /^Correct\.?\s*$/.test(c.rationale))
        .map((c) => `${q.id}/${c.id}`),
    );
    expect(bare).toEqual([]);
  });

  it("correct-answer letters are balanced (no letter above 35% or below 15%)", () => {
    const counts: Record<string, number> = { a: 0, b: 0, c: 0, d: 0 };
    for (const q of C1_D5_QUESTIONS) for (const c of q.correct) counts[c] = (counts[c] ?? 0) + 1;
    const total = Object.values(counts).reduce((s, n) => s + n, 0);
    for (const letter of ["a", "b", "c", "d"]) {
      expect(counts[letter] / total, letter).toBeLessThan(0.35);
      expect(counts[letter] / total, letter).toBeGreaterThan(0.15);
    }
  });

  it("multi-select keys are not always the first two choices", () => {
    const multi = C1_D5_QUESTIONS.filter((q) => q.correct.length > 1);
    const firstTwo = multi.filter((q) => q.correct.join(",") === "a,b");
    expect(firstTwo.length / multi.length).toBeLessThan(0.5);
  });

  it.each([
    "C1-D5-O1-POST-Q009",
    "C1-D5-O2-IOPS-Q008",
    "C1-D5-O2-CLICKING-Q008",
    "C1-D5-O3-PROJECTOR-Q008",
    "C1-D5-O3-SOURCE-Q008",
    "C1-D5-O3-SOURCE-Q009",
    "C1-D5-O4-MOBILEMALWARE-Q008",
    "C1-D5-O4-DIGITIZER-Q008",
    "C1-D5-O5-LIMITED-Q009",
    "C1-D5-O6-JAM-Q007",
  ])("coverage-gap item %s exists with a lesson link", (id) => {
    const q = byId(id);
    expect(q).toBeDefined();
    expect(q!.remediationLessonId).toMatch(/^C1-D5-O\d-L\d$/);
  });
});
