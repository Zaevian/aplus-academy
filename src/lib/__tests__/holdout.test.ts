import { describe, expect, it } from "vitest";
import {
  HOLDOUT_DOMAIN_IDS,
  buildCoverage,
  lessonProtectedQuestionIds,
  splitPracticeAndHoldout,
} from "@/content/registry";

describe("Holdout split (Networking + Hardware + Virtualization + Troubleshooting)", () => {
  it("lists C1-D2, C1-D3, C1-D4, and C1-D5 as holdout-enabled domains", () => {
    expect(HOLDOUT_DOMAIN_IDS).toContain("C1-D2");
    expect(HOLDOUT_DOMAIN_IDS).toContain("C1-D3");
    expect(HOLDOUT_DOMAIN_IDS).toContain("C1-D4");
    expect(HOLDOUT_DOMAIN_IDS).toContain("C1-D5");
  });

  it("keeps lesson KC/checkpoint items out of the holdout pool", () => {
    const protectedIds = lessonProtectedQuestionIds("C1-D2-O1");
    expect(protectedIds.size).toBeGreaterThan(0);
    const all = [
      ...protectedIds,
      "C1-D2-O1-HOLD-A",
      "C1-D2-O1-HOLD-B",
      "C1-D2-O1-HOLD-C",
      "C1-D2-O1-HOLD-D",
      "C1-D2-O1-HOLD-E",
      "C1-D2-O1-HOLD-F",
      "C1-D2-O1-HOLD-G",
      "C1-D2-O1-HOLD-H",
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

  it("splits every C1-D2 coverage row into disjoint practice vs holdout", () => {
    const rows = buildCoverage().filter((r) => r.domain === "C1-D2");
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

  it("keeps C1-D3 Hardware holdout disjoint", () => {
    const rows = buildCoverage().filter((r) => r.domain === "C1-D3");
    expect(rows.length).toBe(8);
    for (const row of rows) {
      const practice = new Set(row.quizQuestionIds);
      expect(row.reviewQuestionIds.length).toBeGreaterThanOrEqual(4);
      for (const id of row.reviewQuestionIds) {
        expect(practice.has(id)).toBe(false);
      }
    }
  });

  it("splits every C1-D4 coverage row into disjoint practice vs holdout", () => {
    const rows = buildCoverage().filter((r) => r.domain === "C1-D4");
    expect(rows.length).toBe(2);
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

  it("splits every C1-D5 coverage row into disjoint practice vs holdout", () => {
    const rows = buildCoverage().filter((r) => r.domain === "C1-D5");
    expect(rows.length).toBe(6);
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
