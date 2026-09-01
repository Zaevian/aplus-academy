export type RaidLevel = "0" | "1" | "5" | "6" | "10";

export function raid10PairFailed(diskCount: number, failed: number[]): boolean {
  const pairs = Math.floor(diskCount / 2);
  for (let p = 0; p < pairs; p++) {
    const a = p * 2;
    const b = p * 2 + 1;
    if (failed.includes(a) && failed.includes(b)) return true;
  }
  return false;
}

export function raid10SplitFailures(diskCount: number, failed: number[]): boolean {
  if (failed.length < 2) return false;
  return !raid10PairFailed(diskCount, failed);
}

export function raidArrayDead(
  level: RaidLevel,
  diskCount: number,
  failed: number[],
): boolean {
  const n = failed.length;
  if (level === "0") return n >= 1;
  if (level === "1") return n >= diskCount;
  if (level === "5") return n >= 2;
  if (level === "6") return n >= 3;
  return raid10PairFailed(diskCount, failed);
}
