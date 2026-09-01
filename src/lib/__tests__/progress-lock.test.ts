import { describe, expect, it } from "vitest";
import { applyCompleteBlock, lockAtIndex } from "../lesson-lock";
import { lessonPath } from "../course";
import { FIRST_LESSON_HREF } from "../study-path";
import { initialProgress } from "@/db/client";

describe("knowledge-check persist / remount", () => {
  const blocks = [
    { id: "intro", type: "reading" },
    { id: "FND-D0-O1-L1-kc1", type: "knowledge-check" },
    { id: "later", type: "reading" },
  ];

  it("locks later blocks until the exact check id is complete", () => {
    const completed = new Set<string>();
    expect(lockAtIndex(blocks, completed)).toBe(1);
  });

  it("writes a block id then remounts with the lock gone", () => {
    const firstMount = lockAtIndex(blocks, []);
    expect(firstMount).toBe(1);
    const persisted = applyCompleteBlock(
      initialProgress(),
      "FND-D0-O1-L1-kc1",
    );
    expect(persisted.completedBlocks).toContain("FND-D0-O1-L1-kc1");
    const remount = lockAtIndex(blocks, persisted.completedBlocks);
    expect(remount).toBe(-1);
  });

  it("Foundation lesson 1 is a real start URL", () => {
    expect(lessonPath("FND-D0-O1-L1")).toBe(FIRST_LESSON_HREF);
  });
});
