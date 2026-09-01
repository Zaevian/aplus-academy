import type { CoreId } from "./schema";

export function coreId(core: CoreId): string {
  return core;
}

export function domainId(core: CoreId, domain: number): string {
  return `${core}-D${domain}`;
}

export function objectiveId(
  core: CoreId,
  domain: number,
  objective: number,
): string {
  return `${core}-D${domain}-O${objective}`;
}

export function conceptId(objective: string, concept: string): string {
  return `${objective}-${concept}`;
}

export function questionId(concept: string, n: number): string {
  return `${concept}-Q${String(n).padStart(3, "0")}`;
}

export function labId(objective: string, slug: string): string {
  return `${objective}-${slug.toUpperCase()}-LAB`;
}

export function parseObjectiveCode(officialCode: string): {
  domain: number;
  objective: number;
} {
  const [d, o] = officialCode.split(".").map((p) => Number(p));
  return { domain: d, objective: o };
}
