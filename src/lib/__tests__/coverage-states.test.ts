import { describe, expect, it } from "vitest";
import {
  buildCoverageStates,
  coverageStatesSummary,
} from "@/content/coverage-states";
import { buildCoverage } from "@/content/registry";

describe("educational coverage states", () => {
  const coverage = buildCoverage();
  const states = buildCoverageStates(coverage);

  it("emits a row for every coverage objective", () => {
    expect(states.length).toBe(coverage.length);
    expect(states.length).toBeGreaterThan(50);
  });

  it("never treats verified alone as Exam Ready", () => {
    for (const row of states) {
      if (row.coverageStatus === "verified" && !row.evidence.hasScoredPbq) {
        expect(row.state).not.toBe("Exam Ready");
      }
      if (row.state === "Exam Ready") {
        expect(row.evidence.hasScoredPbq).toBe(true);
        expect(row.evidence.hasDisjointHoldout).toBe(true);
        expect(row.evidence.assessedDepth).toBeGreaterThanOrEqual(8);
      }
    }
  });

  it("marks new PBQ objectives with holdout as Exam Ready", () => {
    const ids = [
      "C1-D1-O1",
      "C1-D1-O2",
      "C1-D1-O3",
      "C1-D2-O4",
      "C1-D2-O8",
      "C1-D3-O1",
      "C1-D4-O1",
      "C1-D5-O4",
      "C2-D1-O1",
      "C2-D2-O3",
      "C2-D3-O3",
      "C2-D4-O4",
      "C2-D4-O5",
    ];
    for (const id of ids) {
      const row = states.find((r) => r.objectiveId === id);
      expect(row, id).toBeTruthy();
      expect(row!.evidence.hasScoredPbq).toBe(true);
      expect(row!.evidence.hasDisjointHoldout).toBe(true);
      expect(row!.state).toBe("Exam Ready");
    }
  });

  it("summary counts sum to entry count", () => {
    const summary = coverageStatesSummary(states);
    const total = Object.values(summary).reduce((a, b) => a + b, 0);
    expect(total).toBe(states.length);
  });
});
