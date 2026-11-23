import { describe, expect, it } from "vitest";
import { C2_D3_LESSONS } from "@/content/lessons/c2/d3";
import { C2_D3_QUESTIONS } from "@/content/questions/c2/d3";
import { buildCoverage } from "@/content/registry";

const byId = (id: string) => C2_D3_QUESTIONS.find((q) => q.id === id);
const keyText = (id: string) => {
  const q = byId(id)!;
  return q.choices
    .filter((c) => q.correct.includes(c.id))
    .map((c) => c.text)
    .join(" ");
};
const lesson = (id: string) =>
  JSON.stringify(C2_D3_LESSONS.find((l) => l.id === id));

/** Holdout IDs on master before this audit. New items must not push these into practice. */
const PRIOR_HOLDOUT = [
  "C2-D3-O1-TIMEDRIFT-Q003",
  "C2-D3-O1-TIMEDRIFT-Q005",
  "C2-D3-O1-TIMEDRIFT-Q006",
  "C2-D3-O1-TIMEDRIFT-Q007",
  "C2-D3-O1-USBRES-Q004",
  "C2-D3-O1-USBRES-Q006",
  "C2-D3-O2-MOBILEUPDATE-Q003",
  "C2-D3-O2-MOBILEUPDATE-Q005",
  "C2-D3-O2-MOBILEUPDATE-Q006",
  "C2-D3-O2-MOBILEUPDATE-Q007",
  "C2-D3-O2-MOBILEUPDATE-Q008",
  "C2-D3-O2-MOBILEUPDATE-Q009",
  "C2-D3-O3-SPOOFAPP-Q003",
  "C2-D3-O3-SPOOFAPP-Q005",
  "C2-D3-O3-SPOOFAPP-Q006",
  "C2-D3-O3-SPOOFAPP-Q007",
  "C2-D3-O3-SPOOFAPP-Q008",
  "C2-D3-O3-SPOOFAPP-Q009",
  "C2-D3-O4-REDIRECT-Q003",
  "C2-D3-O4-REDIRECT-Q005",
  "C2-D3-O4-REDIRECT-Q007",
  "C2-D3-O4-REDIRECT-Q008",
  "C2-D3-O4-REDIRECT-Q009",
  "C2-D3-O4-REDIRECT-Q010",
];

describe("C2-D3 Software Troubleshooting audit (2026-11-23)", () => {
  it("every rationale names a fact (25+ characters) and no key is a bare 'Correct.'", () => {
    const weak = C2_D3_QUESTIONS.flatMap((q) =>
      q.choices.filter((c) => c.rationale.length < 25).map((c) => `${q.id}/${c.id}`),
    );
    expect(weak).toEqual([]);
    const bare = C2_D3_QUESTIONS.flatMap((q) =>
      q.choices
        .filter((c) => q.correct.includes(c.id) && /^correct\.?$/i.test(c.rationale.trim()))
        .map((c) => `${q.id}/${c.id}`),
    );
    expect(bare).toEqual([]);
  });

  it("no distractor rationale starts with 'Correct'", () => {
    const bad = C2_D3_QUESTIONS.flatMap((q) =>
      q.choices
        .filter((c) => !q.correct.includes(c.id) && /^correct\b/i.test(c.rationale.trim()))
        .map((c) => `${q.id}/${c.id}`),
    );
    expect(bad).toEqual([]);
  });

  it("UEFI boot repair does not treat bootrec /fixmbr as the EFI path", () => {
    const text = lesson("C2-D3-O1-L1");
    expect(text).toMatch(/does not repair the EFI boot path/);
    expect(text).toMatch(/bcdboot/);
    expect(text).toMatch(/BIOS\/MBR/);
  });

  it("does not claim V4.0 enumerates a numbered repair-step list", () => {
    expect(JSON.stringify(C2_D3_LESSONS)).not.toMatch(/CompTIA lists reboot/);
    expect(byId("C2-D3-O1-PROFILE-Q007")!.explanation).not.toMatch(/CompTIA lists/);
    expect(byId("C2-D3-O1-BSOD-Q007")!.explanation).toMatch(/does not publish a numbered repair ladder/);
    expect(byId("C2-D3-O1-USBRES-Q003")!.explanation).not.toMatch(/A\+ lists/);
    expect(byId("C2-D3-O1-USBRES-Q003")!.explanation).toMatch(/services not starting/);
  });

  it("airplane-mode stem no longer gives away the cause", () => {
    const q = byId("C2-D3-O2-AUTOROTATE-Q009")!;
    expect(`${q.scenario ?? ""} ${q.stem}`).not.toMatch(/was left on/);
    expect(keyText(q.id)).toMatch(/Airplane mode/);
    const wifi = byId("C2-D3-O2-AUTOROTATE-Q002")!;
    const rotation = wifi.choices.find((c) => c.id === "d")!;
    expect(rotation.text).toMatch(/rotation lock/i);
    expect(rotation.rationale).not.toMatch(/SoC/);
  });

  it("trusted-root item names the user store and the computer store", () => {
    expect(keyText("C2-D3-O4-CERTBROWSER-Q009")).toMatch(/certlm\.msc/);
    expect(byId("C2-D3-O4-CERTBROWSER-Q009")!.explanation).toMatch(/certmgr\.msc/);
  });

  it("jailbreak item is a scenario rather than a true/false giveaway", () => {
    const q = byId("C2-D3-O3-JAILBREAK-Q008")!;
    expect(q.stem).not.toMatch(/true or false/i);
    expect(keyText(q.id)).toMatch(/do not jailbreak/i);
    expect(q.correct).toEqual(["a"]);
  });

  it("uncovered 3.x bullets now have a practice-pool item, and prior holdout stays holdout", () => {
    const rows = buildCoverage().filter((r) => r.objectiveId.startsWith("C2-D3-"));
    const practice = new Set(rows.flatMap((r) => r.quizQuestionIds));
    const holdout = new Set(
      rows.flatMap((r) => r.reviewQuestionIds.filter((id) => !r.quizQuestionIds.includes(id))),
    );
    const expected: Record<string, RegExp> = {
      "C2-D3-O1-BSOD-Q009": /Reliability Monitor/,
      "C2-D3-O2-APPCRASH-Q011": /Roll back or uninstall that game/,
      "C2-D3-O3-DATAUSAGE-Q010": /VPN app and its profile/,
      "C2-D3-O4-FAKEAV-Q010": /NTFS permissions or ownership/,
    };
    for (const [id, re] of Object.entries(expected)) {
      const q = byId(id);
      expect(q, id).toBeDefined();
      expect(keyText(id), id).toMatch(re);
      expect(practice.has(id), id).toBe(true);
      expect(holdout.has(id), id).toBe(false);
      expect(q!.objectiveId, id).toBe(id.split("-").slice(0, 3).join("-"));
      for (const c of q!.choices) expect(c.rationale.length, `${id}/${c.id}`).toBeGreaterThanOrEqual(40);
    }
    for (const id of PRIOR_HOLDOUT) {
      expect(holdout.has(id), id).toBe(true);
      expect(practice.has(id), id).toBe(false);
    }
  });

  it("does not rebalance existing answer letters", () => {
    expect(byId("C2-D3-O1-BSOD-Q001")!.correct).toEqual(["b"]);
    expect(byId("C2-D3-O1-BSOD-Q004")!.correct).toEqual(["a"]);
    expect(byId("C2-D3-O1-BSOD-Q007")!.correct).toEqual(["a", "c"]);
    expect(byId("C2-D3-O4-FAKEAV-Q006")!.correct).toEqual(["a", "b"]);
    const single = C2_D3_QUESTIONS.filter((q) => q.correct.length === 1);
    const onA = single.filter((q) => q.correct[0] === "a").length;
    expect(onA / single.length).toBeGreaterThan(0.8);
  });

  it("every C2-D3 item stays on Core 2 domain 3 with a matching id", () => {
    for (const q of C2_D3_QUESTIONS) {
      expect(q.sourceBasis, q.id).toBe("c2-obj-3.0");
      expect(q.id.startsWith(`${q.objectiveId}-`), q.id).toBe(true);
      expect(q.objectiveId.startsWith("C2-D3-"), q.id).toBe(true);
    }
  });
});
