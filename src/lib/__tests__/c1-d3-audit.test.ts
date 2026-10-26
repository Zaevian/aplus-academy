import { describe, expect, it } from "vitest";
import {
  C1_D3_BEYOND_OBJECTIVES,
  C1_D3_MISCONCEPTION_TAGS,
  C1_D3_QUESTIONS,
} from "@/content/questions/c1/d3";
import { EXAM_META } from "@/lib/exam-meta";
import { ACRONYMS } from "@/content/glossary/acronyms";

const byId = (id: string) => C1_D3_QUESTIONS.find((q) => q.id === id);

describe("C1-D3 second-pass audit (2026-10-19)", () => {
  it("every Hardware question carries misconception tags from a known family", () => {
    for (const q of C1_D3_QUESTIONS) {
      const family = q.id.replace(/-Q\d+$/, "");
      expect(C1_D3_MISCONCEPTION_TAGS[family], family).toBeDefined();
      expect(q.tags).toContain("misconception");
      expect(q.tags!.length).toBeGreaterThan(1);
    }
  });

  it("every rationale (key and distractor) explains itself (>= 25 chars)", () => {
    const weak = C1_D3_QUESTIONS.flatMap((q) =>
      q.choices.filter((c) => c.rationale.length < 25).map((c) => `${q.id}/${c.id}`),
    );
    expect(weak).toEqual([]);
  });

  it("correct-answer letters are balanced (no letter above 35% or below 15%)", () => {
    const counts: Record<string, number> = { a: 0, b: 0, c: 0, d: 0 };
    for (const q of C1_D3_QUESTIONS) for (const c of q.correct) counts[c]++;
    const total = Object.values(counts).reduce((s, n) => s + n, 0);
    for (const [letter, n] of Object.entries(counts)) {
      expect(n / total, letter).toBeLessThan(0.35);
      expect(n / total, letter).toBeGreaterThan(0.15);
    }
  });

  it.each([
    "C1-D3-O1-ATTR-Q001",
    "C1-D3-O1-ATTR-Q002",
    "C1-D3-O1-ATTR-Q003",
    "C1-D3-O1-ATTR-Q004",
    "C1-D3-O2-FIBER-Q005",
    "C1-D3-O2-UTP-Q005",
    "C1-D3-O2-HDMI-Q004",
    "C1-D3-O3-DDR-Q007",
    "C1-D3-O4-REMOVABLE-Q001",
    "C1-D3-O4-REMOVABLE-Q002",
    "C1-D3-O4-REMOVABLE-Q003",
    "C1-D3-O4-REMOVABLE-Q004",
    "C1-D3-O5-PCIE-Q006",
    "C1-D3-O5-CPU-Q007",
  ])("coverage-gap item %s exists", (id) => {
    expect(byId(id)).toBeDefined();
  });

  it("PCIE-Q003 no longer calls a USB NIC an expansion card", () => {
    expect(byId("C1-D3-O5-PCIE-Q003")!.stem).not.toMatch(/USB NIC/);
  });

  it("ADF-Q005 is a positive diagnostic item, not a 'does not mean' trick", () => {
    expect(byId("C1-D3-O7-ADF-Q005")!.stem).not.toMatch(/does not automatically mean/);
  });

  it("laser imaging-step items are flagged beyond the 3.8 bullets", () => {
    for (const id of C1_D3_BEYOND_OBJECTIVES) {
      expect(byId(id)?.tags).toContain("beyond-objectives");
    }
  });

  it("exam meta tracks Exam Objectives Document Version 4.0 and its new acronyms", () => {
    expect(EXAM_META.objectivesDocument).toBe("Exam Objectives Document Version 4.0");
    for (const a of ["CAS", "eSIM", "FaaS", "GUI", "ISP", "NAS", "NAT", "OEM", "SDS", "SNMP", "WEP"]) {
      expect(ACRONYMS.some((x) => x.acronym === a), a).toBe(true);
    }
  });
});
