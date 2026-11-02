import { describe, expect, it } from "vitest";
import { C2_D1_QUESTIONS } from "@/content/questions/c2/d1";
import { C2_D1_LESSONS } from "@/content/lessons/c2/d1";
import { LINUX, WIN } from "@/components/labs/cli-lab";

const byId = (id: string) => C2_D1_QUESTIONS.find((q) => q.id === id);
const keyText = (id: string) => {
  const q = byId(id)!;
  return q.choices.filter((c) => q.correct.includes(c.id)).map((c) => c.text).join(" ");
};

describe("C2-D1 Operating Systems audit (2026-11-02)", () => {
  it("no key rationale is a bare 'Correct.' (learners on the correct path see only the key rationale)", () => {
    const bare = C2_D1_QUESTIONS.flatMap((q) =>
      q.choices
        .filter((c) => q.correct.includes(c.id) && /^correct\.?$/i.test(c.rationale.trim()))
        .map((c) => `${q.id}/${c.id}`),
    );
    expect(bare).toEqual([]);
  });

  it("O2-MBR-Q006 no longer claims a BIOS PC cannot use a GPT data disk", () => {
    const q = byId("C2-D1-O2-MBR-Q006")!;
    expect(keyText(q.id)).toMatch(/data disk/i);
    expect(keyText(q.id)).toMatch(/GPT/);
    expect(q.explanation).not.toMatch(/BIOS-only hardware is the wrong tool/);
    const lesson = JSON.stringify(C2_D1_LESSONS.find((l) => l.id === "C2-D1-O2-L2"));
    expect(lesson).toMatch(/non-boot data disk can still be GPT/);
  });

  it("Gaming item asks for a verifiable Settings location, not an opinion on Game Mode", () => {
    const q = byId("C2-D1-O6-EXPLOREROPT-Q008")!;
    expect(keyText(q.id)).toBe("Gaming");
    expect(q.stem).not.toMatch(/should usually be/);
  });

  it("every 1.2/1.3/1.6/1.8 bullet that lacked a keyed item now has one", () => {
    const expected: Record<string, RegExp> = {
      "C2-D1-O2-CLEAN-Q007": /flash/i,
      "C2-D1-O2-CLEAN-Q008": /Hardware compatibility/,
      "C2-D1-O3-HOME-Q006": /desktop style/i,
      "C2-D1-O6-FIREWALL-Q008": /Devices and Printers/,
      "C2-D1-O6-FIREWALL-Q009": /Device Manager/,
      "C2-D1-O6-EXPLOREROPT-Q010": /Update and Security/,
      "C2-D1-O6-EXPLOREROPT-Q011": /Network and Internet/,
      "C2-D1-O6-EXPLOREROPT-Q012": /Devices/,
      "C2-D1-O6-EXPLOREROPT-Q013": /Personalization/,
      "C2-D1-O8-DMG-Q007": /iMessage and FaceTime/,
      "C2-D1-O8-DMG-Q008": /\/System/,
      "C2-D1-O8-TIMEMACHINE-Q007": /Displays/,
      "C2-D1-O8-TIMEMACHINE-Q008": /Printers & Scanners/,
      "C2-D1-O8-KEYCHAIN-Q006": /Accessibility/,
      "C2-D1-O8-KEYCHAIN-Q007": /Terminal/,
      "C2-D1-O8-KEYCHAIN-Q008": /Finder[\s\S]*Dock/,
      "C2-D1-O8-KEYCHAIN-Q009": /Gestures/,
    };
    for (const [id, re] of Object.entries(expected)) {
      const q = byId(id);
      expect(q, id).toBeDefined();
      expect(keyText(id), id).toMatch(re);
      expect(q!.sourceBasis).toBe("c2-obj-3.0");
      for (const c of q!.choices) expect(c.rationale.length, `${id}/${c.id}`).toBeGreaterThanOrEqual(40);
    }
  });

  it("every C2-D1 item is tagged to Core 2 sources and its own objective", () => {
    for (const q of C2_D1_QUESTIONS) {
      expect(q.sourceBasis, q.id).toBe("c2-obj-3.0");
      expect(q.id.startsWith(`${q.objectiveId}-`), q.id).toBe(true);
    }
  });
  it("learner pass: Windows 10 scope is consistent with its October 2025 end of support", () => {
    const q = byId("C2-D1-O1-WIN-Q002")!;
    expect(keyText(q.id)).not.toMatch(/still in Microsoft support/);
    expect(q.explanation).toMatch(/14 October 2025/);
    const lesson = JSON.stringify(C2_D1_LESSONS.find((l) => l.id === "C2-D1-O1-L1"));
    expect(lesson).not.toMatch(/while they remain in mainstream support/);
  });

  it("learner pass: Home RDP stem no longer asks for an 'inbound' role it then denies", () => {
    expect(byId("C2-D1-O3-HOME-Q002")!.stem).not.toMatch(/inbound/i);
  });

  it("learner pass: every command the CLI lab help suggests actually runs in the sandbox", () => {
    for (const map of [WIN, LINUX]) {
      const suggested = map.help.replace(/^.*Try:\s*/, "").replace(/\.$/, "").split(/,\s*/);
      const known = Object.keys(map).map((k) => k.toLowerCase());
      expect(suggested.filter((c) => !known.includes(c.toLowerCase()))).toEqual([]);
    }
  });
});
