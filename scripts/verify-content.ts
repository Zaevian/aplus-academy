import { ALL_OBJECTIVES } from "../src/content/catalog";
import { getLabs, getLessons, getQuestions, buildCoverage } from "../src/content/registry";
import { QuestionSchema, LessonSchema } from "../src/content/schema";

const errors: string[] = [];

for (const lesson of getLessons()) {
  const parsed = LessonSchema.safeParse(lesson);
  if (!parsed.success) errors.push(`Lesson ${lesson.id}: ${parsed.error.message}`);
  const text = JSON.stringify(lesson).toLowerCase();
  if (text.includes("lorem ipsum") || text.includes("todo add") || text.includes("placeholder lesson")) {
    errors.push(`Lesson ${lesson.id} contains placeholder language`);
  }
}

const qids = new Set<string>();
for (const question of getQuestions()) {
  const parsed = QuestionSchema.safeParse(question);
  if (!parsed.success) errors.push(`Question ${question.id}: ${parsed.error.message}`);
  if (qids.has(question.id)) errors.push(`Duplicate question ${question.id}`);
  qids.add(question.id);
}

const coverage = buildCoverage();
for (const row of coverage) {
  if (row.core === "FND") continue;
  const obj = ALL_OBJECTIVES.find((o) => o.id === row.objectiveId);
  if (!obj) continue;
  if (row.lessonIds.length === 0) errors.push(`No lessons for ${row.objectiveId}`);
  if (row.quizQuestionIds.length < 8) {
    errors.push(`Insufficient questions for ${row.objectiveId} (${row.quizQuestionIds.length})`);
  }
}

if (getLabs().length < 10) errors.push("Expected at least 10 labs");

if (errors.length) {
  console.error(`Content verification failed (${errors.length}):`);
  for (const e of errors.slice(0, 80)) console.error(" -", e);
  if (errors.length > 80) console.error(` ... ${errors.length - 80} more`);
  process.exit(1);
}

console.log(
  `OK ${getLessons().length} lessons, ${getQuestions().length} questions, ${getLabs().length} labs, ${coverage.filter((c) => c.status === "verified").length} verified objectives`,
);
