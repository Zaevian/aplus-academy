import { describe, expect, it } from "vitest";
import { searchCourse } from "../search";

describe("search", () => {
  it("tokenizes ghost printing to the printer lesson", () => {
    const hits = searchCourse("ghost printing");
    expect(hits.some((h) => /ghost|print/i.test(h.title + h.snippet))).toBe(
      true,
    );
    expect(hits.some((h) => h.href.includes("correct="))).toBe(false);
  });

  it("does not dump assessment keys", () => {
    const blob = JSON.stringify(searchCourse("BitLocker"));
    expect(blob).not.toMatch(/"correct":/);
  });
});
