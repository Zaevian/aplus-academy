import { writeFileSync } from "node:fs";
import { buildCoverage } from "../src/content/registry";

const coverage = buildCoverage();
writeFileSync(
  "src/content/objectives/coverage.json",
  JSON.stringify({ generated: new Date().toISOString(), entries: coverage }, null, 2),
);
console.log(`Wrote ${coverage.length} coverage rows`);
