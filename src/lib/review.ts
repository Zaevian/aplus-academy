import { db, type MasteryRow } from "@/db/client";

const MINUTES = 60 * 1000;
const DAYS = 24 * 60 * MINUTES;

const DEFAULT_INTERVALS = [0, 1, 3, 7, 14, 30];

export type ScheduleOptions = {
  /** Correct only after the explanation was already shown for this item. */
  assisted?: boolean;
};

export function scheduleAfterAnswer(
  row: MasteryRow | undefined,
  id: string,
  kind: MasteryRow["kind"],
  correct: boolean,
  now = Date.now(),
  options?: ScheduleOptions,
): MasteryRow {
  const current: MasteryRow = row ?? {
    id,
    kind,
    correct: 0,
    incorrect: 0,
    easiness: 2.5,
    intervalDays: 0,
    dueAt: now,
    lastAt: 0,
    exposure: 0,
  };

  const assisted = Boolean(options?.assisted);

  // Assisted retry: record exposure only. Do not grant full mastery credit or
  // advance easiness/interval. Original incorrect counts stay untouched.
  if (correct && assisted) {
    return {
      ...current,
      dueAt: now + 20 * MINUTES,
      lastAt: now,
      exposure: current.exposure + 1,
    };
  }

  let easiness = current.easiness;
  let intervalDays = current.intervalDays;

  if (correct) {
    easiness = Math.min(3.2, easiness + 0.12);
    const idx = DEFAULT_INTERVALS.findIndex((d) => d >= intervalDays);
    const nextIdx = Math.min(
      DEFAULT_INTERVALS.length - 1,
      (idx === -1 ? 0 : idx) + 1,
    );
    intervalDays = DEFAULT_INTERVALS[nextIdx] ?? 30;
    if (intervalDays === 0) intervalDays = 1;
  } else {
    easiness = Math.max(1.3, easiness - 0.35);
    intervalDays = 0;
  }

  const dueAt = correct ? now + intervalDays * DAYS : now + 20 * MINUTES;

  return {
    ...current,
    correct: current.correct + (correct ? 1 : 0),
    incorrect: current.incorrect + (correct ? 0 : 1),
    easiness,
    intervalDays,
    dueAt,
    lastAt: now,
    exposure: current.exposure + 1,
  };
}

export async function applyAttemptToMastery(
  conceptIds: string[],
  correct: boolean,
  options?: ScheduleOptions,
): Promise<void> {
  for (const id of conceptIds) {
    const existing = await db.mastery.get(id);
    await db.mastery.put(
      scheduleAfterAnswer(existing, id, "concept", correct, Date.now(), options),
    );
  }
}

export async function dueConceptIds(limit = 20): Promise<string[]> {
  const now = Date.now();
  const rows = await db.mastery.where("kind").equals("concept").toArray();
  return rows
    .filter((r) => r.dueAt <= now && r.exposure > 0)
    .sort((a, b) => a.dueAt - b.dueAt)
    .slice(0, limit)
    .map((r) => r.id);
}

export function masteryPercent(row: MasteryRow | undefined): number {
  if (!row) return 0;
  const total = row.correct + row.incorrect;
  if (total === 0) return 0;
  const raw = row.correct / total;
  const recencyBoost = row.intervalDays >= 7 ? 0.05 : 0;
  return Math.max(0, Math.min(100, Math.round((raw + recencyBoost) * 100)));
}
