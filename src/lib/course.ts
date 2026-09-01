import { ALL_OBJECTIVES, DOMAINS } from "@/content/catalog";
import type { Domain, Objective } from "@/content/schema";
import { getLabs, getLessons, getQuestions } from "@/content/registry";

export const CORE1_DOMAIN_ORDER = [
  "C1-D1",
  "C1-D2",
  "C1-D3",
  "C1-D4",
  "C1-D5",
] as const;

export const CORE2_DOMAIN_ORDER = [
  "C2-D1",
  "C2-D2",
  "C2-D3",
  "C2-D4",
] as const;

export function nextDomainId(domainId: string): string | null {
  const seq = [...CORE1_DOMAIN_ORDER, ...CORE2_DOMAIN_ORDER];
  if (domainId === "FND-D0") return "C1-D1";
  const i = seq.indexOf(domainId as (typeof seq)[number]);
  if (i === -1 || i === seq.length - 1) return null;
  return seq[i + 1]!;
}

export function domainPath(domain: Domain): string {
  if (domain.core === "FND") return "/course/foundation";
  const core = domain.core === "C1" ? "core-1" : "core-2";
  return `/course/${core}/domain-${domain.number}`;
}

export function objectivePath(objective: Objective): string {
  const domain = DOMAINS.find(
    (d) => d.core === objective.core && d.number === objective.domain,
  );
  if (!domain) return "/course";
  if (objective.core === "FND") {
    return `/course/foundation/${objective.slug}`;
  }
  return `${domainPath(domain)}/${objective.officialCode.replace(".", "-")}-${objective.slug}`;
}

export function lessonPath(lessonId: string): string {
  const lesson = getLessons().find((l) => l.id === lessonId);
  if (!lesson) return "/course";
  const objective = ALL_OBJECTIVES.find((o) => o.id === lesson.objectiveId);
  if (!objective) return "/course";
  if (objective.core === "FND") return `/course/foundation/${lesson.slug}`;
  return `${objectivePath(objective)}/${lesson.slug}`;
}

export function questionsForObjective(objectiveId: string) {
  return getQuestions().filter((q) => q.objectiveId === objectiveId);
}

export function lessonsForObjective(objectiveId: string) {
  return getLessons().filter((l) => l.objectiveId === objectiveId);
}

export function labsForObjective(objectiveId: string) {
  return getLabs().filter((l) => l.objectiveIds.includes(objectiveId));
}

export function coreLabel(core: string): string {
  if (core === "FND") return "Foundation";
  if (core === "C1") return "Core 1 · 220-1201";
  return "Core 2 · 220-1202";
}
