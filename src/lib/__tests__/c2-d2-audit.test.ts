import { describe, expect, it } from "vitest";
import { C2_D2_QUESTIONS } from "@/content/questions/c2/d2";
import { C2_D2_LESSONS } from "@/content/lessons/c2/d2";

const byId = (id: string) => C2_D2_QUESTIONS.find((q) => q.id === id);
const keyText = (id: string) => {
  const q = byId(id)!;
  return q.choices.filter((c) => q.correct.includes(c.id)).map((c) => c.text).join(" ");
};
const lesson = (id: string) => JSON.stringify(C2_D2_LESSONS.find((l) => l.id === id));

describe("C2-D2 Security audit (2026-11-09)", () => {
  it("no key rationale is a bare 'Correct.' (learners on the correct path see only the key rationale)", () => {
    const bare = C2_D2_QUESTIONS.flatMap((q) =>
      q.choices
        .filter((c) => q.correct.includes(c.id) && /^correct\.?$/i.test(c.rationale.trim()))
        .map((c) => `${q.id}/${c.id}`),
    );
    expect(bare).toEqual([]);
  });

  it("no distractor rationale starts with 'Correct' (reads as if it were the key)", () => {
    const bad = C2_D2_QUESTIONS.flatMap((q) =>
      q.choices
        .filter((c) => !q.correct.includes(c.id) && /^correct\b/i.test(c.rationale.trim()))
        .map((c) => `${q.id}/${c.id}`),
    );
    expect(bad).toEqual([]);
  });

  it("RADIUS-Q002 stem no longer contains its own answer", () => {
    const q = byId("C2-D2-O3-RADIUS-Q002")!;
    expect(keyText(q.id)).toBe("TACACS+");
    expect(q.stem).not.toMatch(/TACACS/);
  });

  it("patch management and endpoint security software are taught and keyed as 2.8, not 2.7", () => {
    for (const id of ["C2-D2-O7-HARDEN-Q006", "C2-D2-O7-HARDEN-Q007", "C2-D2-O7-AUTORUN-Q006"]) {
      expect(byId(id), id).toBeUndefined();
    }
    const o7 = C2_D2_QUESTIONS.filter((q) => q.objectiveId === "C2-D2-O7");
    expect(o7.some((q) => /on 2\.7/.test(q.stem) && /patch|endpoint security/i.test(q.stem))).toBe(false);
    expect(lesson("C2-D2-O7-L1")).toMatch(/They are not 2\.7 bullets/);
    expect(lesson("C2-D2-O8-L1")).toMatch(/Patch management\*\* on 2\.8/);
    expect(keyText("C2-D2-O8-PATCH-Q001")).toMatch(/OS updates and application updates/);
    expect(keyText("C2-D2-O8-PATCH-Q002")).toBe("Content filtering");
  });

  it("factual wording fixes hold", () => {
    expect(byId("C2-D2-O4-FILELESS-Q008")!.explanation).toMatch(/Cryptominers were already on 220-1102/);
    expect(JSON.stringify(byId("C2-D2-O8-MDMPROFILE-Q009"))).not.toMatch(/blog/);
    expect(byId("C2-D2-O6-SYSRESTORE-Q011")!.stem).not.toMatch(/pair/);
  });

  it("2.1 / 2.2 / 2.5 / 2.8 bullets that lacked a keyed item now have one", () => {
    const expected: Record<string, RegExp> = {
      "C2-D2-O1-VESTIBULE-Q005": /key fobs or smart cards/,
      "C2-D2-O1-VESTIBULE-Q006": /screen lock/,
      "C2-D2-O1-VESTIBULE-Q007": /smart card/i,
      "C2-D2-O1-VESTIBULE-Q008": /Security guards/,
      "C2-D2-O1-VESTIBULE-Q009": /door lock/i,
      "C2-D2-O1-VESTIBULE-Q010": /lighting/i,
      "C2-D2-O1-VESTIBULE-Q011": /Magnetometers/,
      "C2-D2-O1-MFA-Q006": /Retina/,
      "C2-D2-O1-MFA-Q007": /Voice recognition/,
      "C2-D2-O1-MFA-Q008": /Something you are/,
      "C2-D2-O1-MFA-Q009": /hardware token/i,
      "C2-D2-O2-UAC-Q005": /turn it back on/,
      "C2-D2-O2-UAC-Q006": /application \(program\) rule/,
      "C2-D2-O2-AD-Q006": /Microsoft account/,
      "C2-D2-O2-AD-Q007": /backward compatibility/,
      "C2-D2-O5-XSS-Q007": /Non-compliant/,
      "C2-D2-O8-PATCH-Q003": /blocks categories/,
      "C2-D2-O8-PATCH-Q004": /Application updates/,
    };
    for (const [id, re] of Object.entries(expected)) {
      const q = byId(id);
      expect(q, id).toBeDefined();
      expect(keyText(id), id).toMatch(re);
      expect(q!.tags?.length, id).toBeGreaterThan(0);
      for (const c of q!.choices) expect(c.rationale.length, `${id}/${c.id}`).toBeGreaterThanOrEqual(40);
    }
  });

  it("every C2-D2 item stays on Core 2 with an ID that matches its objective", () => {
    for (const q of C2_D2_QUESTIONS) {
      expect(q.sourceBasis, q.id).toBe("c2-obj-3.0");
      expect(q.id.startsWith(q.objectiveId + "-"), q.id).toBe(true);
    }
  });
});
