# Phase 1 confirmed defects

Tracked from Miyuki Domain 1 (Mobile Devices), Domain 2 (Networking), and Domain 3 (Hardware) audits, 2026-09-28.
Official authority: CompTIA A+ V15 / Exam Objectives Document Version 3.0 — no dumps.

| ID | Severity | Status | Summary | Primary paths |
|---|---|---|---|---|
| mastery-inflation | critical | **fixed** (this PR) | Any correct (including assisted retry after explanation) advanced easiness/interval; domain quiz always recorded perfect score + empty `missedConceptIds` | `src/lib/review.ts`, `src/lib/progress-actions.ts`, `src/components/lesson/knowledge-check.tsx`, `src/components/quiz/quiz-player.tsx`, `src/db/client.ts` |
| no-holdout-pool | high | **partial** (C1-D3 this PR) | Holdout split live for Hardware (`HOLDOUT_DOMAIN_IDS`); other domains still mirror pools | `src/content/registry.ts`, domain quiz + practice pools |
| mock-empty-exposure | high | **fixed** (this PR) | Mock used `unseenFirst(pool, new Set(), 89)` | `src/app/exam/[core]/page.tsx`, `exposedQuestionIds` in `src/lib/progress-actions.ts` |
| core2-ports-pbq | high | **fixed** (this PR) | Same Ports PBQ for C1 and C2 mocks | `src/app/exam/[core]/page.tsx` |
| mock-no-domain-weight | medium | **fixed** (groundwork, this PR) | MCQ pick ignored `EXAM_META` domain percents | `src/lib/questions.ts` `domainWeightedSample`, exam page |
| mobile-zero-pbq | critical/high | **fixed** (≥1 lab, this PR) | C1-D1 had 0 `pbqLabIds` | `src/content/labs/index.ts`, `src/components/labs/laptop-upgrade-lab.tsx`, `src/content/labs/implemented.ts`, `src/components/labs/lab-host.tsx` |
| networking-uneven-pbq | medium | open | Only O2/O5/O6 have labs; O1 ports + O8 tools lack scored PBQs | `src/content/labs/index.ts`, catalog `requiredInteractions` |
| weak-rationales | medium | open | Hundreds of distractor rationales &lt;25 chars (D1 + D2) | `src/content/questions/c1/d1.ts`, `src/content/questions/c1/d2.ts` |
| missing-misconception-tags | medium | open | Near-zero `tags[]` on Mobile/Networking banks | question banks under `src/content/questions/` |
| diagram-simple-fallback | high | open | Mobile flagship diagrams are text fallbacks | `src/components/diagrams/` |
| thin-vendor-sources | medium | open | Mobile lessons cite only generic CompTIA sources | `src/content/lessons/c1/d1.ts`, `src/content/sources.ts` |
| hardware-uneven-pbq | medium | **partial** (O3 RAM lab this PR) | C1-D3 O1/O6/O7 still lack scored PBQs; O2/O3/O4/O5/O8 have LabHost labs | `src/content/labs/index.ts` |
| hardware-display-simple | high | **fixed** (this PR) | `DisplayCompareDiagram` was SIMPLE text fallback | `src/components/diagrams/registry.tsx` |
| hardware-weak-rationales | medium | **partial** (~18 Qs this PR) | Hundreds of D3 distractor rationales still &lt;25 chars; sample batch + misconception tags shipped | `src/content/questions/c1/d3.ts` |
| domain-hard-lock-preview | medium | **fixed** (preview this PR) | Locked domain pages showed only gate text — no syllabus counts; soft read-only preview added; hard gate preserved | `src/components/course/domain-gate.tsx` |
| labs-no-filter | low | **fixed** (this PR) | Labs catalog had no search/kind filter | `src/app/labs/page.tsx` |

## Educational state notes (quick)

- **Assisted correct:** explanation already shown for the current item before a successful check. Records the attempt with `assisted: true`; does **not** increment mastery `correct` or advance easiness/interval. Original `incorrect` from the miss is preserved.
- **Domain gate vs recorded score:** learner must eventually answer correctly to unlock the next domain; `recordQuiz` may set `passed: true` for the gate while `score` reflects first-attempt outcomes only.
- **Exposure:** attempt `questionId`s plus prior quiz `questionIds` feed mock/quiz unseen preference.
