import type { Question } from "@/content/schema";

export function shuffle<T>(items: T[], salt = Math.random()): T[] {
  const copy = [...items];
  let s = Math.floor(salt * 1_000_000) + copy.length;
  for (let i = copy.length - 1; i > 0; i--) {
    s = (s * 16807) % 2147483647;
    const j = s % (i + 1);
    [copy[i], copy[j]] = [copy[j]!, copy[i]!];
  }
  return copy;
}

export function isCorrect(question: Question, selected: string[]): boolean {
  const want = [...question.correct].sort();
  const got = [...selected].sort();
  if (want.length !== got.length) return false;
  return want.every((id, i) => id === got[i]);
}

export function unseenFirst(
  bank: Question[],
  exposedIds: Set<string>,
  count: number,
  conceptBoost?: string[],
): Question[] {
  const boost = new Set(conceptBoost ?? []);
  const unseen = bank.filter((q) => !exposedIds.has(q.id));
  const seen = bank.filter((q) => exposedIds.has(q.id));
  const rank = (q: Question) =>
    q.conceptIds.some((c) => boost.has(c)) ? 0 : 1;
  unseen.sort((a, b) => rank(a) - rank(b));
  const pool = [...shuffle(unseen), ...shuffle(seen)];
  const picked: Question[] = [];
  const usedConcepts = new Set<string>();
  for (const q of pool) {
    if (picked.length >= count) break;
    const overlap = q.conceptIds.filter((c) => usedConcepts.has(c)).length;
    if (overlap > 0 && picked.length + 1 < count) continue;
    picked.push(q);
    q.conceptIds.forEach((c) => usedConcepts.add(c));
  }
  if (picked.length < count) {
    for (const q of pool) {
      if (picked.length >= count) break;
      if (!picked.includes(q)) picked.push(q);
    }
  }
  return picked.slice(0, count);
}

/** Proportional MCQ sampling biased to EXAM_META domain percents for a core. */
export function domainWeightedSample(
  bank: Question[],
  exposedIds: Set<string>,
  count: number,
  domainPercents: { domainNumber: number; percent: number; objectivePrefix: string }[],
): Question[] {
  if (count <= 0 || bank.length === 0) return [];
  const totalPct = domainPercents.reduce((s, d) => s + d.percent, 0) || 1;
  const buckets: { domainNumber: number; want: number; pool: Question[] }[] = domainPercents.map(
    (d) => ({
      domainNumber: d.domainNumber,
      want: Math.max(1, Math.round((d.percent / totalPct) * count)),
      pool: bank.filter((q) => q.objectiveId.startsWith(d.objectivePrefix)),
    }),
  );
  // Fix rounding so sum === count
  let allocated = buckets.reduce((s, b) => s + b.want, 0);
  while (allocated > count) {
    const richest = buckets.reduce((a, b) => (b.want > a.want ? b : a));
    if (richest.want <= 1) break;
    richest.want -= 1;
    allocated -= 1;
  }
  while (allocated < count) {
    const neediest = buckets.reduce((a, b) =>
      b.pool.length - b.want > a.pool.length - a.want ? b : a,
    );
    neediest.want += 1;
    allocated += 1;
  }

  const picked: Question[] = [];
  const used = new Set<string>();
  for (const bucket of buckets) {
    const slice = unseenFirst(bucket.pool, exposedIds, bucket.want);
    for (const q of slice) {
      if (used.has(q.id)) continue;
      picked.push(q);
      used.add(q.id);
    }
  }
  if (picked.length < count) {
    const filler = unseenFirst(
      bank.filter((q) => !used.has(q.id)),
      exposedIds,
      count - picked.length,
    );
    picked.push(...filler);
  }
  return shuffle(picked).slice(0, count);
}

