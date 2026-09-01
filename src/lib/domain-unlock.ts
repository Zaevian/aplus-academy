import { CORE1_DOMAIN_ORDER, CORE2_DOMAIN_ORDER } from "@/lib/course";
import type { ProgressSnapshot } from "@/db/client";

export const BASE_UNLOCKS = ["FND-D0", "C1-D1", "C2-D1"] as const;

export function nextDomainInCore(domainId: string): string | null {
  if (domainId === "FND-D0") return "C1-D1";
  const c1 = CORE1_DOMAIN_ORDER as readonly string[];
  const c2 = CORE2_DOMAIN_ORDER as readonly string[];
  const i1 = c1.indexOf(domainId);
  if (i1 !== -1) return i1 < c1.length - 1 ? c1[i1 + 1]! : null;
  const i2 = c2.indexOf(domainId);
  if (i2 !== -1) return i2 < c2.length - 1 ? c2[i2 + 1]! : null;
  return null;
}

export function previousDomainInCore(domainId: string): string | null {
  const c1 = CORE1_DOMAIN_ORDER as readonly string[];
  const c2 = CORE2_DOMAIN_ORDER as readonly string[];
  const i1 = c1.indexOf(domainId);
  if (i1 > 0) return c1[i1 - 1]!;
  const i2 = c2.indexOf(domainId);
  if (i2 > 0) return c2[i2 - 1]!;
  return null;
}

export function healedUnlocks(progress: ProgressSnapshot): string[] {
  const unlocked = new Set<string>([
    ...BASE_UNLOCKS,
    ...progress.unlockedDomainIds,
  ]);
  for (const id of progress.completedDomains) {
    unlocked.add(id);
    const next = nextDomainInCore(id);
    if (next) unlocked.add(next);
  }
  return [...unlocked];
}

export function isDomainUnlocked(
  progress: ProgressSnapshot | undefined,
  domainId: string,
): boolean {
  if (domainId === "FND-D0") return true;
  if (!progress) return BASE_UNLOCKS.includes(domainId as (typeof BASE_UNLOCKS)[number]);
  return healedUnlocks(progress).includes(domainId);
}

export function sameStringSet(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  const set = new Set(a);
  return b.every((id) => set.has(id));
}
