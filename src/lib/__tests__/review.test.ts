import { describe, expect, it } from "vitest";
import { masteryPercent, scheduleAfterAnswer } from "../review";

describe("spaced review", () => {
  it("shortens interval after a miss", () => {
    const first = scheduleAfterAnswer(undefined, "c", "concept", true, 1_000);
    const missed = scheduleAfterAnswer(first, "c", "concept", false, 2_000);
    expect(missed.intervalDays).toBe(0);
    expect(missed.incorrect).toBe(1);
  });

  it("increases interval after a hit", () => {
    let row = scheduleAfterAnswer(undefined, "c", "concept", true, 1_000);
    row = scheduleAfterAnswer(row, "c", "concept", true, 2_000);
    expect(row.intervalDays).toBeGreaterThan(0);
    expect(masteryPercent(row)).toBeGreaterThan(0);
  });
});
