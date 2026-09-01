import type { Difficulty, Question, QuestionType } from "./schema";
import { QuestionSchema } from "./schema";

type FactoryInput = {
  id: string;
  objectiveId: string;
  conceptIds: string[];
  difficulty?: Difficulty;
  type?: QuestionType;
  stem: string;
  scenario?: string;
  image?: string;
  imageAlt?: string;
  choices: { id: string; text: string; rationale: string }[];
  correct: string | string[];
  explanation: string;
  sourceBasis?: string;
  remediationLessonId?: string;
  tags?: string[];
};

export function q(input: FactoryInput): Question {
  const correct = Array.isArray(input.correct) ? input.correct : [input.correct];
  const question: Question = {
    id: input.id,
    objectiveId: input.objectiveId,
    conceptIds: input.conceptIds,
    difficulty: input.difficulty ?? "core",
    type: input.type ?? (correct.length > 1 ? "multi" : "single"),
    stem: input.stem,
    scenario: input.scenario,
    image: input.image,
    imageAlt: input.imageAlt,
    choices: input.choices,
    correct,
    explanation: input.explanation,
    sourceBasis: input.sourceBasis ?? "c1-obj-3.0",
    validationStatus: "verified",
    remediationLessonId: input.remediationLessonId,
    tags: input.tags,
  };
  return QuestionSchema.parse(question);
}
