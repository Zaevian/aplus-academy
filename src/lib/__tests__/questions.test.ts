import { describe, expect, it } from "vitest";
import { domainWeightedSample, isCorrect, unseenFirst } from "../questions";
import { FOUNDATION_QUESTIONS } from "@/content/questions/foundation";
import type { Question } from "@/content/schema";

describe("questions", () => {
  it("scores single answers", () => {
    const q = FOUNDATION_QUESTIONS[0]!;
    expect(isCorrect(q, q.correct)).toBe(true);
    expect(isCorrect(q, ["nope"])).toBe(false);
  });

  it("prefers unseen items", () => {
    const exposed = new Set([FOUNDATION_QUESTIONS[0]!.id]);
    const picked = unseenFirst(FOUNDATION_QUESTIONS, exposed, 3);
    expect(picked[0]?.id).not.toBe(FOUNDATION_QUESTIONS[0]!.id);
  });
});

function makeQ(id: string, objectiveId: string): Question {
  return {
    id,
    objectiveId,
    conceptIds: [`${objectiveId}-X`],
    difficulty: "core",
    type: "single",
    stem: `Stem for question ${id} long enough`,
    choices: [
      { id: "a", text: "alpha", rationale: "alpha rationale text" },
      { id: "b", text: "bravo", rationale: "bravo rationale text" },
      { id: "c", text: "charlie", rationale: "charlie rationale text" },
      { id: "d", text: "delta", rationale: "delta rationale text" },
    ],
    correct: ["a"],
    explanation: "Because the keyed choice is alpha.",
    sourceBasis: "objectives",
    validationStatus: "verified",
  };
}

describe("domainWeightedSample", () => {
  it("returns the requested count biased by domain percents", () => {
    const bank: Question[] = [];
    for (let i = 0; i < 40; i++) bank.push(makeQ(`d1-${i}`, "C1-D1-O1"));
    for (let i = 0; i < 40; i++) bank.push(makeQ(`d2-${i}`, "C1-D2-O1"));
    for (let i = 0; i < 40; i++) bank.push(makeQ(`d3-${i}`, "C1-D3-O1"));
    const picked = domainWeightedSample(bank, new Set(), 20, [
      { domainNumber: 1, percent: 13, objectivePrefix: "C1-D1-" },
      { domainNumber: 2, percent: 23, objectivePrefix: "C1-D2-" },
      { domainNumber: 3, percent: 25, objectivePrefix: "C1-D3-" },
    ]);
    expect(picked).toHaveLength(20);
    const c2 = picked.filter((x) => x.objectiveId.startsWith("C1-D2-")).length;
    const c1 = picked.filter((x) => x.objectiveId.startsWith("C1-D1-")).length;
    expect(c2).toBeGreaterThanOrEqual(c1);
  });
});
