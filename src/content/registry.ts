import { ALL_OBJECTIVES, DOMAINS } from "./catalog";
import { ACRONYMS } from "./glossary/acronyms";
import { LABS } from "./labs";
import { LESSONS } from "./lessons";
import { QUESTIONS } from "./questions";
import { SOURCES } from "./sources";
import { PORTS } from "./ports";
import type { CoverageEntry, Lab, Lesson, Question } from "./schema";
import { EXAM_META } from "@/lib/exam-meta";

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

export function buildCoverage(): CoverageEntry[] {
  return ALL_OBJECTIVES.map((objective) => {
    const lessons = LESSONS.filter((l) => l.objectiveId === objective.id);
    const quizQuestionIds = QUESTIONS.filter(
      (q) => q.objectiveId === objective.id,
    ).map((q) => q.id);
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
      domain: `${objective.core}-D${objective.domain}`,
      source:
        objective.core === "C2"
          ? EXAM_META.officialUrls.core2Pdf
          : objective.core === "C1"
            ? EXAM_META.officialUrls.core1Pdf
            : EXAM_META.officialUrls.product,
      lessonIds: lessons.map((l) => l.id),
      interactionIds: interactions,
      quizQuestionIds,
      reviewQuestionIds: quizQuestionIds,
      pbqLabIds: labs.map((l) => l.id),
      status,
      lastVerified: EXAM_META.lastVerified,
    };
  });
}

export const CONTENT = {
  objectives: ALL_OBJECTIVES,
  domains: DOMAINS,
  acronyms: ACRONYMS,
  ports: PORTS,
  sources: SOURCES,
};
