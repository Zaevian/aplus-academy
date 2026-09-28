import { mkdirSync, writeFileSync } from "node:fs";
import { buildCoverage } from "../src/content/registry";
import {
  buildCoverageStates,
  coverageStatesSummary,
} from "../src/content/coverage-states";

const coverage = buildCoverage();
writeFileSync(
  "src/content/objectives/coverage.json",
  JSON.stringify({ generated: new Date().toISOString(), entries: coverage }, null, 2),
);
console.log(`Wrote ${coverage.length} coverage rows`);

const states = buildCoverageStates(coverage);
const summary = coverageStatesSummary(states);
mkdirSync("docs/curriculum", { recursive: true });
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
          "disjoint holdout (reviewQuestionIds ⊄ quizQuestionIds)",
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
console.log(
  `Wrote coverage-states.json — Exam Ready ${summary["Exam Ready"]}, Retained ${summary.Retained}, Assessed ${summary.Assessed}, Practiced ${summary.Practiced}, Taught ${summary.Taught}, Missing ${summary.Missing}`,
);
