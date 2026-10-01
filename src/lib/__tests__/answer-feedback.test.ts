import { describe, expect, it } from "vitest";
import { MISS_LINE, choiceLetter, successLine } from "../answer-feedback";

describe("answer feedback copy", () => {
  it("uses a short success line and a gentle miss line", () => {
    expect(successLine(0)).toBe("Nice!");
    expect(successLine(1)).toBe("You got it!");
    expect(successLine(2)).toBe("Nice!");
    expect(MISS_LINE).toBe("Not quite. Here is the right one.");
  });

  it("keeps em dashes out of learner-facing feedback", () => {
    expect(successLine(0)).not.toMatch(/\u2014/);
    expect(successLine(1)).not.toMatch(/\u2014/);
    expect(MISS_LINE).not.toMatch(/\u2014/);
  });

  it("labels choices A through F", () => {
    expect(choiceLetter(0)).toBe("A");
    expect(choiceLetter(3)).toBe("D");
    expect(choiceLetter(8)).toBe("9");
  });
});
