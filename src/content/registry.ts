import { ALL_OBJECTIVES, DOMAINS } from "./catalog";
import { ACRONYMS } from "./glossary/acronyms";
import { LABS } from "./labs";
import { LESSONS } from "./lessons";
import { QUESTIONS } from "./questions";
import { SOURCES } from "./sources";
import { PORTS } from "./ports";
import type { CoverageEntry, Lab, Lesson, Question } from "./schema";
import { EXAM_META } from "@/lib/exam-meta";

/**
 * Domains that carve a disjoint holdout (reviewQuestionIds) from the
 * practice/quiz pool (quizQuestionIds). Extend this list as other domains
 * get split — do not claim Exam Ready until holdout is live AND consumed.
 */
export const HOLDOUT_DOMAIN_IDS = ["C1-D3", "C2-D3"] as const;

export function getLessons(): Lesson[] {
  return LESSONS;
}

export function getQuestions(): Question[] {
  return QUESTIONS;
}

export function getLabs(): Lab[] {
  return LABS;
}

export function getLesson(id: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === id);
}

export function getQuestion(id: string): Question | undefined {
  return QUESTIONS.find((q) => q.id === id);
}

export function getLab(id: string): Lab | undefined {
  return LABS.find((l) => l.id === id);
}

export function getLabBySlug(slug: string): Lab | undefined {
  return LABS.find((l) => l.slug === slug);
}

export function getLessonBySlug(slug: string): Lesson | undefined {
  return LESSONS.find((l) => l.slug === slug);
}

/** Question IDs embedded in lesson knowledge-check / checkpoint blocks. */
export function lessonProtectedQuestionIds(
  objectiveId?: string,
): Set<string> {
  const out = new Set<string>();
  for (const lesson of LESSONS) {
    if (objectiveId && lesson.objectiveId !== objectiveId) continue;
    for (const block of lesson.blocks) {
      if (
        block.type === "knowledge-check" ||
        block.type === "checkpoint"
      ) {
        for (const qid of block.questionIds) out.add(qid);
      }
    }
  }
  return out;
}

/**
 * Split an objective's bank into practice (quiz) vs holdout (review).
 * Holdout never includes lesson KC/checkpoint items. Deterministic by sorted id.
 * Target ~20% holdout (min 4 when eligible, max 8) so practice stays deep.
 */
export function splitPracticeAndHoldout(
  questionIds: string[],
  protectedIds: Set<string>,
): { quizQuestionIds: string[]; reviewQuestionIds: string[] } {
  const sorted = [...questionIds].sort();
  const eligible = sorted.filter((id) => !protectedIds.has(id));
  if (eligible.length < 8) {
    // Too thin to hold out without starving practice — keep pools identical.
    return {
      quizQuestionIds: sorted,
      reviewQuestionIds: sorted,
    };
  }
  const target = Math.min(8, Math.max(4, Math.round(sorted.length * 0.2)));
  const holdoutCount = Math.min(target, Math.floor(eligible.length / 2));
  // Take from the end of the sorted eligible list for stability across edits
  // that prepend new Q00x items.
  const reviewQuestionIds = eligible.slice(-holdoutCount);
  const holdout = new Set(reviewQuestionIds);
  const quizQuestionIds = sorted.filter((id) => !holdout.has(id));
  return { quizQuestionIds, reviewQuestionIds };
}

function domainAllowsHoldout(domainKey: string): boolean {
  return (HOLDOUT_DOMAIN_IDS as readonly string[]).includes(domainKey);
}

export function buildCoverage(): CoverageEntry[] {
  return ALL_OBJECTIVES.map((objective) => {
    const lessons = LESSONS.filter((l) => l.objectiveId === objective.id);
    const allQuestionIds = QUESTIONS.filter(
      (q) => q.objectiveId === objective.id,
    ).map((q) => q.id);
    const domainKey = `${objective.core}-D${objective.domain}`;
    const protectedIds = lessonProtectedQuestionIds(objective.id);
    const { quizQuestionIds, reviewQuestionIds } = domainAllowsHoldout(
      domainKey,
    )
      ? splitPracticeAndHoldout(allQuestionIds, protectedIds)
      : {
          quizQuestionIds: allQuestionIds,
          reviewQuestionIds: allQuestionIds,
        };
    const labs = LABS.filter((l) => l.objectiveIds.includes(objective.id));
    const interactions = [
      ...lessons.flatMap((l) =>
        l.blocks
          .filter(
            (b) =>
              b.type === "diagram" ||
              b.type === "lab" ||
              b.type === "video",
          )
          .map((b) => b.id),
      ),
      ...labs.map((l) => l.id),
    ];
    const hasInstruction = lessons.length > 0;
    const hasAssessment = quizQuestionIds.length >= 8;
    const status =
      hasInstruction && hasAssessment ? "verified" : "missing";
    return {
      objectiveId: objective.id,
      core: objective.core,
      domain: domainKey,
      source:
        objective.core === "C2"
          ? EXAM_META.officialUrls.core2Pdf
          : objective.core === "C1"
            ? EXAM_META.officialUrls.core1Pdf
            : EXAM_META.officialUrls.product,
      lessonIds: lessons.map((l) => l.id),
      interactionIds: interactions,
      quizQuestionIds,
      reviewQuestionIds,
      pbqLabIds: labs.map((l) => l.id),
      status,
      lastVerified: EXAM_META.lastVerified,
    };
  });
}

/** Practice / mastery pool for a domain (excludes holdout when split). */
export function getDomainPracticeQuestions(
  objectiveIds: string[],
): Question[] {
  const coverage = buildCoverage();
  const practice = new Set<string>();
  for (const row of coverage) {
    if (!objectiveIds.includes(row.objectiveId)) continue;
    for (const id of row.quizQuestionIds) practice.add(id);
  }
  return QUESTIONS.filter(
    (q) =>
      objectiveIds.includes(q.objectiveId) && practice.has(q.id),
  );
}

/** Holdout / validation IDs for a domain (empty when pools are not split). */
export function getDomainHoldoutQuestionIds(
  objectiveIds: string[],
): string[] {
  const coverage = buildCoverage();
  const out: string[] = [];
  for (const row of coverage) {
    if (!objectiveIds.includes(row.objectiveId)) continue;
    const practice = new Set(row.quizQuestionIds);
    // Disjoint holdout only — identical pools mean no split yet.
    if (
      row.reviewQuestionIds.length === row.quizQuestionIds.length &&
      row.reviewQuestionIds.every((id, i) => id === row.quizQuestionIds[i])
    ) {
      continue;
    }
    for (const id of row.reviewQuestionIds) {
      if (!practice.has(id)) out.push(id);
    }
  }
  return out;
}


/** All questions minus holdout IDs from domains that have a validation split. */
export function getPracticeQuestions(
  predicate?: (q: Question) => boolean,
): Question[] {
  const coverage = buildCoverage();
  const holdout = new Set<string>();
  for (const row of coverage) {
    const practice = new Set(row.quizQuestionIds);
    const identical =
      row.reviewQuestionIds.length === row.quizQuestionIds.length &&
      row.reviewQuestionIds.every((id) => practice.has(id));
    if (identical) continue;
    for (const id of row.reviewQuestionIds) {
      if (!practice.has(id)) holdout.add(id);
    }
  }
  return QUESTIONS.filter(
    (q) => !holdout.has(q.id) && (predicate ? predicate(q) : true),
  );
}

export const CONTENT = {
  objectives: ALL_OBJECTIVES,
  domains: DOMAINS,
  acronyms: ACRONYMS,
  ports: PORTS,
  sources: SOURCES,
};
