import { ALL_OBJECTIVES } from "../src/content/catalog";
import { getLabs, getLessons, getQuestions, buildCoverage } from "../src/content/registry";
import { QuestionSchema, LessonSchema } from "../src/content/schema";
import { LABS } from "../src/content/labs";
import { LAB_HOST_COMPONENTS } from "../src/content/labs/implemented";
import { PORTS } from "../src/content/ports";
import { writeFileSync, mkdirSync } from "node:fs";
import {
  buildCoverageStates,
  coverageStatesSummary,
} from "../src/content/coverage-states";

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

const implemented = new Set<string>(LAB_HOST_COMPONENTS);
for (const lab of LABS) {
  if (lab.component === "InteractiveSimLab") {
    errors.push(`Lab ${lab.slug} still uses InteractiveSimLab`);
  }
  if (!implemented.has(lab.component)) {
    errors.push(
      `Lab ${lab.slug} component ${lab.component} has no LabHost mapper (InteractiveSimLab fallback is forbidden)`,
    );
  }
}

const officialPorts = [
  "20/21",
  "22",
  "23",
  "25",
  "53",
  "67/68",
  "80",
  "110",
  "143",
  "137-139",
  "389",
  "443",
  "445",
  "3389",
];
if (PORTS.map((p) => p.ports).join() !== officialPorts.join()) {
  errors.push("PORTS must equal the official 2.1 list");
}

const ai = ALL_OBJECTIVES.find((o) => o.id === "C2-D4-O10");
if (!ai || !ai.officialCode.startsWith("4.10")) {
  errors.push("AI fundamentals must be cataloged as objective 4.10");
}


const states = buildCoverageStates(coverage);
const summary = coverageStatesSummary(states);
mkdirSync("docs/curriculum", { recursive: true });
writeFileSync(
  "src/content/objectives/coverage.json",
  JSON.stringify({ generated: new Date().toISOString(), entries: coverage }, null, 2),
);
writeFileSync(
  "docs/curriculum/coverage-states.json",
  JSON.stringify(
    {
      generated: new Date().toISOString(),
      summary,
      rules: {
        states: [
          "Missing",
          "Taught",
          "Practiced",
          "Assessed",
          "Retained",
          "Exam Ready",
        ],
        examReadyRequires: [
          "disjoint holdout (reviewQuestionIds independent of quizQuestionIds)",
          "scored LabHost PBQ (pbqLabIds non-empty)",
          "assessment depth ≥ 8 practice questions",
        ],
        neverExamReadyFrom: [
          "coverage.status === verified alone",
          "lesson presence alone",
          "MCQ bank alone without holdout + PBQ",
        ],
      },
      entries: states,
    },
    null,
    2,
  ),
);

for (const row of states) {
  if (row.state === "Exam Ready") {
    if (!row.evidence.hasScoredPbq || !row.evidence.hasDisjointHoldout) {
      errors.push(
        `${row.objectiveId} marked Exam Ready without PBQ+holdout evidence`,
      );
    }
  }
}

if (errors.length) {
  console.error(`Content verification failed (${errors.length}):`);
  for (const e of errors.slice(0, 80)) console.error(" -", e);
  if (errors.length > 80) console.error(` ... ${errors.length - 80} more`);
  process.exit(1);
}

console.log(
  `OK ${getLessons().length} lessons, ${getQuestions().length} questions, ${getLabs().length} labs, ${coverage.filter((c) => c.status === "verified").length} verified objectives, Exam Ready ${summary["Exam Ready"]}/${states.length}`,
);
