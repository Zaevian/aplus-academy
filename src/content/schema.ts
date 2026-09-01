import { z } from "zod";

export const CoreIdSchema = z.enum(["FND", "C1", "C2"]);
export type CoreId = z.infer<typeof CoreIdSchema>;

export const DifficultySchema = z.enum(["intro", "core", "exam"]);
export type Difficulty = z.infer<typeof DifficultySchema>;

export const QuestionTypeSchema = z.enum([
  "single",
  "multi",
  "image",
  "scenario",
]);
export type QuestionType = z.infer<typeof QuestionTypeSchema>;

export const ChoiceSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1),
  rationale: z.string().min(1),
});
export type Choice = z.infer<typeof ChoiceSchema>;

export const QuestionSchema = z
  .object({
    id: z.string().min(1),
    objectiveId: z.string().min(1),
    conceptIds: z.array(z.string().min(1)).min(1),
    difficulty: DifficultySchema,
    type: QuestionTypeSchema,
    stem: z.string().min(12),
    scenario: z.string().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    choices: z.array(ChoiceSchema).min(3).max(6),
    correct: z.array(z.string().min(1)).min(1),
    explanation: z.string().min(12),
    sourceBasis: z.string().min(3),
    validationStatus: z.enum(["draft", "verified"]),
    remediationLessonId: z.string().optional(),
    tags: z.array(z.string()).optional(),
  })
  .superRefine((q, ctx) => {
    const ids = q.choices.map((c) => c.id);
    if (new Set(ids).size !== ids.length) {
      ctx.addIssue({
        code: "custom",
        message: `Duplicate choice ids in ${q.id}`,
      });
    }
    const texts = q.choices.map((c) => c.text.trim().toLowerCase());
    if (new Set(texts).size !== texts.length) {
      ctx.addIssue({
        code: "custom",
        message: `Duplicate choice text in ${q.id}`,
      });
    }
    for (const id of q.correct) {
      if (!ids.includes(id)) {
        ctx.addIssue({
          code: "custom",
          message: `Correct id ${id} not in choices for ${q.id}`,
        });
      }
    }
    if (q.type === "single" && q.correct.length !== 1) {
      ctx.addIssue({
        code: "custom",
        message: `Single-choice question ${q.id} must have exactly one correct answer`,
      });
    }
    if (q.type === "multi" && q.correct.length < 2) {
      ctx.addIssue({
        code: "custom",
        message: `Multi-select question ${q.id} must have at least two correct answers`,
      });
    }
  });
export type Question = z.infer<typeof QuestionSchema>;

export const CalloutSchema = z.object({
  kind: z.enum([
    "exam",
    "technician",
    "mistake",
    "why",
    "notice",
    "safety",
    "definition",
  ]),
  title: z.string(),
  body: z.string(),
});
export type Callout = z.infer<typeof CalloutSchema>;

export const LessonBlockSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("reading"),
    id: z.string(),
    title: z.string().optional(),
    markdown: z.string().min(40),
  }),
  z.object({
    type: z.literal("callout"),
    id: z.string(),
    callout: CalloutSchema,
  }),
  z.object({
    type: z.literal("diagram"),
    id: z.string(),
    component: z.string(),
    title: z.string(),
    caption: z.string(),
    notice: z.string(),
    alt: z.string(),
  }),
  z.object({
    type: z.literal("illustration"),
    id: z.string(),
    assetId: z.string(),
    alt: z.string(),
    caption: z.string(),
    notice: z.string(),
  }),
  z.object({
    type: z.literal("video"),
    id: z.string(),
    assetId: z.string(),
    title: z.string(),
    transcript: z.string(),
    caption: z.string(),
  }),
  z.object({
    type: z.literal("table"),
    id: z.string(),
    title: z.string(),
    headers: z.array(z.string()).min(2),
    rows: z.array(z.array(z.string()).min(2)).min(2),
    caption: z.string().optional(),
  }),
  z.object({
    type: z.literal("lab"),
    id: z.string(),
    labId: z.string(),
    title: z.string(),
    prompt: z.string(),
  }),
  z.object({
    type: z.literal("voice"),
    id: z.string(),
    scenarioId: z.string(),
    title: z.string(),
  }),
  z.object({
    type: z.literal("knowledge-check"),
    id: z.string(),
    questionIds: z.array(z.string()).min(1).max(3),
  }),
  z.object({
    type: z.literal("checkpoint"),
    id: z.string(),
    questionIds: z.array(z.string()).min(5).max(12),
  }),
  z.object({
    type: z.literal("summary"),
    id: z.string(),
    bullets: z.array(z.string()).min(3),
  }),
]);
export type LessonBlock = z.infer<typeof LessonBlockSchema>;

export const LessonSchema = z.object({
  id: z.string(),
  objectiveId: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  estimatedMinutes: z.number().int().positive(),
  conceptIds: z.array(z.string()).min(1),
  prerequisites: z.array(z.string()),
  blocks: z.array(LessonBlockSchema).min(4),
  sources: z.array(z.string()).min(1),
  lastVerified: z.string(),
});
export type Lesson = z.infer<typeof LessonSchema>;

export const ObjectiveSchema = z.object({
  id: z.string(),
  core: CoreIdSchema,
  domain: z.number().int().min(0).max(5),
  officialCode: z.string(),
  slug: z.string(),
  title: z.string(),
  paraphrase: z.string(),
  examPercent: z.number(),
  subtopics: z.array(z.string()).min(1),
  requiredInteractions: z.array(z.string()),
  conceptIds: z.array(z.string()).min(1),
});
export type Objective = z.infer<typeof ObjectiveSchema>;

export const DomainSchema = z.object({
  id: z.string(),
  core: CoreIdSchema,
  number: z.number().int(),
  slug: z.string(),
  title: z.string(),
  examPercent: z.number(),
  paraphrase: z.string(),
  objectiveIds: z.array(z.string()).min(1),
});
export type Domain = z.infer<typeof DomainSchema>;

export const LabKindSchema = z.enum([
  "hardware",
  "network",
  "storage",
  "os",
  "security",
  "printer",
  "cli",
  "ticket",
  "voice",
  "capstone",
]);
export type LabKind = z.infer<typeof LabKindSchema>;

export const LabSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  kind: LabKindSchema,
  objectiveIds: z.array(z.string()).min(1),
  conceptIds: z.array(z.string()).min(1),
  component: z.string(),
  description: z.string(),
  solution: z.string(),
  estimatedMinutes: z.number().int().positive(),
  capstone: z.boolean().optional(),
});
export type Lab = z.infer<typeof LabSchema>;

export const CoverageEntrySchema = z.object({
  objectiveId: z.string(),
  core: CoreIdSchema,
  domain: z.string(),
  source: z.string(),
  lessonIds: z.array(z.string()),
  interactionIds: z.array(z.string()),
  quizQuestionIds: z.array(z.string()),
  reviewQuestionIds: z.array(z.string()),
  pbqLabIds: z.array(z.string()),
  status: z.enum(["covered", "verified", "missing"]),
  lastVerified: z.string(),
});
export type CoverageEntry = z.infer<typeof CoverageEntrySchema>;

export const MediaAssetSchema = z.object({
  id: z.string(),
  kind: z.enum(["image", "video", "audio"]),
  prompt: z.string(),
  conceptId: z.string(),
  model: z.string(),
  generatedAt: z.string(),
  path: z.string(),
  fallback: z.string(),
  verified: z.boolean(),
  alt: z.string(),
  transcript: z.string().optional(),
});
export type MediaAsset = z.infer<typeof MediaAssetSchema>;

export const VoiceScenarioSchema = z.object({
  id: z.string(),
  title: z.string(),
  objectiveIds: z.array(z.string()),
  persona: z.enum([
    "angry",
    "confused",
    "nontechnical",
    "manager",
    "impatient",
    "nervous",
    "expert",
    "executive",
    "remote",
    "vague",
  ]),
  audioAssetId: z.string().optional(),
  transcript: z.string(),
  questionIds: z.array(z.string()).min(1),
});
export type VoiceScenario = z.infer<typeof VoiceScenarioSchema>;

export const SourceSchema = z.object({
  id: z.string(),
  title: z.string(),
  url: z.string(),
  group: z.enum([
    "certification",
    "windows",
    "macos",
    "linux",
    "networking",
    "hardware",
    "security",
    "standards",
  ]),
  verified: z.string(),
});
export type Source = z.infer<typeof SourceSchema>;
