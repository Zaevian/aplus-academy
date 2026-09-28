import { describe, expect, it } from "vitest";
import {
  HOLDOUT_DOMAIN_IDS,
  buildCoverage,
  lessonProtectedQuestionIds,
  splitPracticeAndHoldout,
} from "@/content/registry";

describe("Holdout domain splits", () => {
  it("lists C1-D3 and C2-D1 as holdout-enabled (D2/D4/D5 arrive with open PRs)", () => {
    expect(HOLDOUT_DOMAIN_IDS).toContain("C1-D3");
    expect(HOLDOUT_DOMAIN_IDS).toContain("C2-D1");
  });

  it("keeps lesson KC/checkpoint items out of the holdout pool", () => {
    const protectedIds = lessonProtectedQuestionIds("C1-D3-O3");
    expect(protectedIds.size).toBeGreaterThan(0);
    const all = [
      ...protectedIds,
      "C1-D3-O3-HOLD-A",
      "C1-D3-O3-HOLD-B",
      "C1-D3-O3-HOLD-C",
      "C1-D3-O3-HOLD-D",
      "C1-D3-O3-HOLD-E",
      "C1-D3-O3-HOLD-F",
      "C1-D3-O3-HOLD-G",
      "C1-D3-O3-HOLD-H",
    ];
    const { quizQuestionIds, reviewQuestionIds } = splitPracticeAndHoldout(
      all,
      protectedIds,
    );
    for (const id of protectedIds) {
      expect(quizQuestionIds).toContain(id);
      expect(reviewQuestionIds).not.toContain(id);
    }
    expect(reviewQuestionIds.length).toBeGreaterThanOrEqual(4);
    const quizSet = new Set(quizQuestionIds);
    for (const id of reviewQuestionIds) {
      expect(quizSet.has(id)).toBe(false);
    }
  });

  it("splits every C1-D3 coverage row into disjoint practice vs holdout", () => {
    const rows = buildCoverage().filter((r) => r.domain === "C1-D3");
    expect(rows.length).toBe(8);
    for (const row of rows) {
      const practice = new Set(row.quizQuestionIds);
      expect(row.quizQuestionIds.length).toBeGreaterThanOrEqual(8);
      expect(row.reviewQuestionIds.length).toBeGreaterThanOrEqual(4);
      for (const id of row.reviewQuestionIds) {
        expect(practice.has(id)).toBe(false);
      }
      const protectedIds = lessonProtectedQuestionIds(row.objectiveId);
      for (const id of row.reviewQuestionIds) {
        expect(protectedIds.has(id)).toBe(false);
      }
    }
  });

  it("splits every C2-D1 coverage row into disjoint practice vs holdout", () => {
    const rows = buildCoverage().filter((r) => r.domain === "C2-D1");
    expect(rows.length).toBe(11);
    for (const row of rows) {
      const practice = new Set(row.quizQuestionIds);
      expect(row.quizQuestionIds.length).toBeGreaterThanOrEqual(8);
      expect(row.reviewQuestionIds.length).toBeGreaterThanOrEqual(4);
      for (const id of row.reviewQuestionIds) {
        expect(practice.has(id)).toBe(false);
      }
      const protectedIds = lessonProtectedQuestionIds(row.objectiveId);
      for (const id of row.reviewQuestionIds) {
        expect(protectedIds.has(id)).toBe(false);
      }
    }
  });

  it("still mirrors pools for domains without holdout enabled", () => {
    const mobile = buildCoverage().find((r) => r.objectiveId === "C1-D1-O1");
    expect(mobile).toBeTruthy();
    expect(mobile!.quizQuestionIds).toEqual(mobile!.reviewQuestionIds);
  });
});
