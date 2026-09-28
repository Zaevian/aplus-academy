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

  it("miss then assisted correct does not inflate like unassisted correct", () => {
    const miss = scheduleAfterAnswer(undefined, "c", "concept", false, 1_000);
    expect(miss.incorrect).toBe(1);
    expect(miss.correct).toBe(0);
    expect(miss.intervalDays).toBe(0);

    const assisted = scheduleAfterAnswer(miss, "c", "concept", true, 2_000, {
      assisted: true,
    });
    // Original miss preserved; no full mastery credit on assisted retry.
    expect(assisted.incorrect).toBe(1);
    expect(assisted.correct).toBe(0);
    expect(assisted.easiness).toBe(miss.easiness);
    expect(assisted.intervalDays).toBe(0);
    expect(assisted.exposure).toBe(miss.exposure + 1);
    expect(masteryPercent(assisted)).toBe(0);

    const unassisted = scheduleAfterAnswer(miss, "c", "concept", true, 2_000);
    expect(unassisted.correct).toBe(1);
    expect(unassisted.incorrect).toBe(1);
    expect(unassisted.easiness).toBeGreaterThan(miss.easiness);
    expect(unassisted.intervalDays).toBeGreaterThan(0);
    expect(masteryPercent(unassisted)).toBeGreaterThan(masteryPercent(assisted));
  });

  it("unassisted correct after a miss still grants credit while keeping the miss", () => {
    const miss = scheduleAfterAnswer(undefined, "c", "concept", false, 1_000);
    const hit = scheduleAfterAnswer(miss, "c", "concept", true, 2_000, {
      assisted: false,
    });
    expect(hit.incorrect).toBe(1);
    expect(hit.correct).toBe(1);
    expect(hit.intervalDays).toBeGreaterThan(0);
  });
});
