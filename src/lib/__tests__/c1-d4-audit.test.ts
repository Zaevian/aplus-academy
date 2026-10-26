import { describe, expect, it } from "vitest";
import { C1_D4_MISCONCEPTION_TAGS, C1_D4_QUESTIONS } from "@/content/questions/c1/d4";

const byId = (id: string) => C1_D4_QUESTIONS.find((q) => q.id === id);

function letterShares(questions: typeof C1_D4_QUESTIONS) {
  const counts: Record<string, number> = { a: 0, b: 0, c: 0, d: 0 };
  let total = 0;
  for (const q of questions) {
    for (const c of q.correct) {
      counts[c] = (counts[c] ?? 0) + 1;
      total++;
    }
  }
  return { counts, total };
}

describe("C1-D4 second-pass audit (2026-10-26)", () => {
  it("every Virtualization and Cloud question carries misconception tags from a known family", () => {
    for (const q of C1_D4_QUESTIONS) {
      const family = q.id.replace(/-Q\d+$/, "");
      expect(C1_D4_MISCONCEPTION_TAGS[family], family).toBeDefined();
      expect(q.tags).toContain("misconception");
      expect(q.tags!.length).toBeGreaterThan(1);
    }
  });

  it("every rationale (key and distractor) explains itself (>= 40 chars)", () => {
    const weak = C1_D4_QUESTIONS.flatMap((q) =>
      q.choices.filter((c) => c.rationale.trim().length < 40).map((c) => `${q.id}/${c.id}`),
    );
    expect(weak).toEqual([]);
  });

  it("no key rationale is a bare 'Correct.' or a one-clause stub", () => {
    const bare = C1_D4_QUESTIONS.flatMap((q) =>
      q.choices
        .filter((c) => q.correct.includes(c.id) && /^Correct[^a-z]*$|^Correct\.\s*\S{0,40}$/i.test(c.rationale.trim()))
        .map((c) => `${q.id}/${c.id}`),
    );
    expect(bare).toEqual([]);
  });

  it("correct-answer letters are balanced domain-wide (no letter above 35% or below 15%)", () => {
    const { counts, total } = letterShares(C1_D4_QUESTIONS);
    for (const letter of ["a", "b", "c", "d"]) {
      expect(counts[letter] / total, letter).toBeLessThan(0.35);
      expect(counts[letter] / total, letter).toBeGreaterThan(0.15);
    }
  });

  it.each(["C1-D4-O1", "C1-D4-O2"])(
    "%s single-answer keys are not dominated by one letter (always-pick-a guard)",
    (objectiveId) => {
      const single = C1_D4_QUESTIONS.filter((q) => q.objectiveId === objectiveId && q.correct.length === 1);
      const { counts, total } = letterShares(single);
      for (const letter of ["a", "b", "c", "d"]) {
        expect(counts[letter] / total, `${objectiveId} ${letter}`).toBeLessThan(0.4);
        expect(counts[letter], `${objectiveId} ${letter}`).toBeGreaterThan(0);
      }
    },
  );

  it("always answering 'a' scores no better than chance on single-answer items", () => {
    const single = C1_D4_QUESTIONS.filter((q) => q.correct.length === 1);
    const hits = single.filter((q) => q.correct[0] === "a").length;
    expect(hits / single.length).toBeLessThan(0.35);
  });

  it("multi-select keys are not always the first two choices", () => {
    const multi = C1_D4_QUESTIONS.filter((q) => q.correct.length > 1);
    const firstTwo = multi.filter((q) => q.correct.join(",") === "a,b");
    expect(firstTwo.length / multi.length).toBeLessThan(0.5);
  });

  it("every key letter points at a real choice", () => {
    for (const q of C1_D4_QUESTIONS) {
      const ids = q.choices.map((c) => c.id);
      for (const k of q.correct) expect(ids, q.id).toContain(k);
    }
  });

  it.each([
    "C1-D4-O1-VM-Q009",
    "C1-D4-O1-VM-Q010",
    "C1-D4-O1-VM-Q011",
    "C1-D4-O1-VM-Q012",
    "C1-D4-O2-ELASTIC-Q008",
    "C1-D4-O2-SAAS-Q008",
    "C1-D4-O2-MULTITENANT-Q008",
    "C1-D4-O2-HYBRID-Q008",
  ])("coverage-gap item %s exists with a lesson link", (id) => {
    const q = byId(id);
    expect(q).toBeDefined();
    expect(q!.tags).toContain("coverage-gap");
    expect(q!.remediationLessonId).toMatch(/^C1-D4-O\d-L\d$/);
  });

  it("official 4.1 phrasing 'test development' and 'application virtualization' appears in the bank", () => {
    const text = C1_D4_QUESTIONS.map((q) => `${q.stem} ${q.choices.map((c) => c.text).join(" ")}`).join(" ");
    expect(text).toMatch(/test development/i);
    expect(text).toMatch(/application virtualization/i);
    expect(text).toMatch(/cross-platform virtualization/i);
  });
});
