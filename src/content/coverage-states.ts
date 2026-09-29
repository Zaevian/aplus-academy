import { ALL_OBJECTIVES } from "./catalog";
import { LABS } from "./labs";
import { LESSONS } from "./lessons";
import { QUESTIONS } from "./questions";
import type { CoverageEntry } from "./schema";
import { buildCoverage } from "./registry";

/**
 * Educational readiness states (learner-facing taxonomy).
 * Higher states require meeting lower ones. Exam Ready never equals
 * coverage.status === "verified" alone — it needs independent evidence.
 */
export const EDUCATIONAL_STATES = [
  "Missing",
  "Taught",
  "Practiced",
  "Assessed",
  "Retained",
  "Exam Ready",
] as const;

export type EducationalState = (typeof EDUCATIONAL_STATES)[number];

export type CoverageStateEvidence = {
  hasLessons: boolean;
  hasPracticeInteractions: boolean;
  assessedDepth: number;
  hasDisjointHoldout: boolean;
  hasScoredPbq: boolean;
  scoredPbqIds: string[];
  /** Runtime spaced-review exists academy-wide; content has no per-objective delayed hook yet. */
  hasDelayedRetentionHook: boolean;
};

export type ConceptStateRow = {
  conceptId: string;
  label: string;
  state: EducationalState;
  questionCount: number;
  inPbq: boolean;
};

export type CoverageStateEntry = {
  objectiveId: string;
  core: string;
  domain: string;
  officialCode: string;
  title: string;
  examPercent: number;
  /** Legacy coverage.json status — not Exam Ready. */
  coverageStatus: CoverageEntry["status"];
  state: EducationalState;
  evidence: CoverageStateEvidence;
  blockers: string[];
  concepts: ConceptStateRow[];
  subtopics: { label: string; state: EducationalState }[];
};

function poolsIdentical(row: CoverageEntry): boolean {
  return (
    row.reviewQuestionIds.length === row.quizQuestionIds.length &&
    row.reviewQuestionIds.every((id, i) => id === row.quizQuestionIds[i])
  );
}

function hasDisjointHoldout(row: CoverageEntry): boolean {
  if (poolsIdentical(row)) return false;
  const practice = new Set(row.quizQuestionIds);
  return row.reviewQuestionIds.some((id) => !practice.has(id));
}

function conceptLabel(conceptId: string): string {
  const parts = conceptId.split("-");
  return parts[parts.length - 1] ?? conceptId;
}

function stateForConcept(
  evidence: CoverageStateEvidence,
  questionCount: number,
  inPbq: boolean,
): EducationalState {
  if (!evidence.hasLessons) return "Missing";
  if (questionCount === 0 && !inPbq) return "Taught";
  if (inPbq && evidence.hasDisjointHoldout && evidence.hasScoredPbq) {
    return "Exam Ready";
  }
  if (evidence.hasDisjointHoldout && questionCount > 0) return "Retained";
  if (questionCount >= 2) return "Assessed";
  if (questionCount > 0 || inPbq || evidence.hasPracticeInteractions) {
    return "Practiced";
  }
  return "Taught";
}

function computeState(
  evidence: CoverageStateEvidence,
): { state: EducationalState; blockers: string[] } {
  const blockers: string[] = [];

  if (!evidence.hasLessons) {
    return { state: "Missing", blockers: ["No lessons"] };
  }
  if (!evidence.hasPracticeInteractions) {
    blockers.push("No diagrams, knowledge checks, or labs for practice");
  }
  if (evidence.assessedDepth < 8) {
    blockers.push(
      `Assessment depth ${evidence.assessedDepth} (need ≥8 practice/quiz items)`,
    );
  }
  if (!evidence.hasScoredPbq) {
    blockers.push("No scored LabHost PBQ (pbqLabIds empty)");
  }
  if (!evidence.hasDisjointHoldout) {
    blockers.push("No disjoint holdout pool (review ≡ quiz)");
  }
  if (!evidence.hasDelayedRetentionHook) {
    blockers.push(
      "No per-objective delayed-retention content hook (academy spaced review is runtime-only)",
    );
  }

  if (!evidence.hasPracticeInteractions && evidence.assessedDepth < 8) {
    return { state: "Taught", blockers };
  }
  if (evidence.assessedDepth < 8) {
    return { state: "Practiced", blockers };
  }
  if (!evidence.hasDisjointHoldout) {
    return { state: "Assessed", blockers };
  }
  // Exam Ready requires independent evidence: disjoint holdout AND scored PBQ.
  // Never treat coverage.verified alone as Exam Ready.
  if (evidence.hasScoredPbq && evidence.hasDisjointHoldout) {
    return {
      state: "Exam Ready",
      blockers: blockers.filter(
        (b) =>
          !b.startsWith("No scored") &&
          !b.startsWith("No disjoint") &&
          !b.startsWith("Assessment depth") &&
          !b.startsWith("No diagrams"),
      ),
    };
  }
  return { state: "Retained", blockers };
}

export function buildCoverageStates(
  coverage: CoverageEntry[] = buildCoverage(),
): CoverageStateEntry[] {
  return coverage.map((row) => {
    const objective = ALL_OBJECTIVES.find((o) => o.id === row.objectiveId);
    const lessons = LESSONS.filter((l) => l.objectiveId === row.objectiveId);
    const hasPracticeInteractions = lessons.some((l) =>
      l.blocks.some(
        (b) =>
          b.type === "diagram" ||
          b.type === "lab" ||
          b.type === "knowledge-check" ||
          b.type === "checkpoint" ||
          b.type === "video",
      ),
    );
    const evidence: CoverageStateEvidence = {
      hasLessons: row.lessonIds.length > 0,
      hasPracticeInteractions,
      assessedDepth: row.quizQuestionIds.length,
      hasDisjointHoldout: hasDisjointHoldout(row),
      hasScoredPbq: row.pbqLabIds.length > 0,
      scoredPbqIds: [...row.pbqLabIds],
      hasDelayedRetentionHook: false,
    };
    const { state, blockers } = computeState(evidence);

    const objQuestions = QUESTIONS.filter(
      (q) => q.objectiveId === row.objectiveId,
    );
    const labConceptIds = new Set(
      LABS.filter((l) => row.pbqLabIds.includes(l.id)).flatMap(
        (l) => l.conceptIds,
      ),
    );

    const concepts: ConceptStateRow[] = (objective?.conceptIds ?? []).map(
      (conceptId) => {
        const qs = objQuestions.filter((q) => q.conceptIds.includes(conceptId));
        const inPbq = labConceptIds.has(conceptId);
        return {
          conceptId,
          label: conceptLabel(conceptId),
          state: stateForConcept(evidence, qs.length, inPbq),
          questionCount: qs.length,
          inPbq,
        };
      },
    );

    const subtopics = (objective?.subtopics ?? []).map((label, i) => {
      const concept = concepts[i];
      return {
        label,
        state: concept?.state ?? (state === "Missing" ? "Missing" : "Taught"),
      };
    });

    return {
      objectiveId: row.objectiveId,
      core: row.core,
      domain: row.domain,
      officialCode: objective?.officialCode ?? "",
      title: objective?.title ?? row.objectiveId,
      examPercent: objective?.examPercent ?? 0,
      coverageStatus: row.status,
      state,
      evidence,
      blockers,
      concepts,
      subtopics,
    };
  });
}

export function coverageStatesSummary(entries: CoverageStateEntry[]) {
  const counts: Record<EducationalState, number> = {
    Missing: 0,
    Taught: 0,
    Practiced: 0,
    Assessed: 0,
    Retained: 0,
    "Exam Ready": 0,
  };
  for (const e of entries) counts[e.state] += 1;
  return counts;
}
