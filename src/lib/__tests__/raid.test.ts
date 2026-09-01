import { describe, expect, it } from "vitest";
import { raid10PairFailed, raidArrayDead } from "../raid";

describe("RAID 10 pair failure", () => {
  it("two failed disks in different pairs leave RAID 10 up", () => {
    expect(raid10PairFailed(4, [0, 2])).toBe(false);
    expect(raidArrayDead("10", 4, [0, 2])).toBe(false);
  });

  it("dies only when both disks in the same mirror pair fail", () => {
    expect(raid10PairFailed(4, [0, 1])).toBe(true);
    expect(raidArrayDead("10", 4, [0, 1])).toBe(true);
    expect(raidArrayDead("10", 6, [2, 3])).toBe(true);
    expect(raidArrayDead("10", 6, [1, 4])).toBe(false);
  });
});
