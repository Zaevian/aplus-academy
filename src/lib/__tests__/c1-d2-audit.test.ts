import { describe, expect, it } from "vitest";
import { C1_D2_QUESTIONS, C1_D2_MISCONCEPTION_TAGS } from "@/content/questions/c1/d2";
import { PORTS } from "@/content/ports";

const distractors = (objectiveId: string) =>
  C1_D2_QUESTIONS.filter((q) => q.objectiveId === objectiveId).flatMap((q) =>
    q.choices.filter((c) => !q.correct.includes(c.id)).map((c) => ({ id: `${q.id}/${c.id}`, r: c.rationale })),
  );

describe("C1-D2 second-pass audit (2026-10-12)", () => {
  it("every Networking question carries misconception tags from a known family", () => {
    for (const q of C1_D2_QUESTIONS) {
      const family = q.id.replace(/-Q\d+$/, "");
      expect(C1_D2_MISCONCEPTION_TAGS[family], family).toBeDefined();
      expect(q.tags).toContain("misconception");
      expect(q.tags!.length).toBeGreaterThan(1);
    }
  });

  it.each(["C1-D2-O1", "C1-D2-O6"])("%s distractor rationales explain the trap (>= 25 chars)", (o) => {
    const weak = distractors(o).filter((d) => d.r.length < 25);
    expect(weak).toEqual([]);
  });

  it("IMAP expands to Internet Message Access Protocol", () => {
    expect(PORTS.find((p) => p.ports === "143")?.name).toBe("Internet Message Access Protocol");
  });
});
