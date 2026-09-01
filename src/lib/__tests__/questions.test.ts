import { describe, expect, it } from "vitest";
import { isCorrect, unseenFirst } from "../questions";
import { FOUNDATION_QUESTIONS } from "@/content/questions/foundation";

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
