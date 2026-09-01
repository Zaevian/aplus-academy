import type { ProgressSnapshot } from "@/db/client";

export type LockableBlock = { id: string; type: string };

export function applyCompleteBlock(
  progress: ProgressSnapshot,
  blockId: string,
): ProgressSnapshot {
  if (progress.completedBlocks.includes(blockId)) return progress;
  return {
    ...progress,
    completedBlocks: [...progress.completedBlocks, blockId],
    updatedAt: Date.now(),
  };
}

/** First knowledge-check/checkpoint that is not in completedBlocks, or -1. */
export function lockAtIndex(
  blocks: LockableBlock[],
  completedBlockIds: Iterable<string>,
): number {
  const completed =
    completedBlockIds instanceof Set
      ? completedBlockIds
      : new Set(completedBlockIds);
  return blocks.findIndex(
    (block) =>
      (block.type === "knowledge-check" || block.type === "checkpoint") &&
      !completed.has(block.id),
  );
}
