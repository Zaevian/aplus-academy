# Coverage educational states

Machine-readable map: [`coverage-states.json`](./coverage-states.json)  
Legacy inventory (lessons / quizzes / labs): [`../../src/content/objectives/coverage.json`](../../src/content/objectives/coverage.json)

Regenerate both with:

```bash
pnpm write:coverage
```

`pnpm verify:content` also regenerates these artifacts so CI stays honest.

## States (progressive)

| State | Meaning |
|---|---|
| **Missing** | No lessons (or foundation stub without instruction). |
| **Taught** | Lessons exist; little/no interactive practice. |
| **Practiced** | Diagrams, knowledge checks, checkpoints, videos, or labs present — assessment depth still thin. |
| **Assessed** | Practice/quiz bank ≥ 8 items. Pools may still mirror (no holdout). |
| **Retained** | Disjoint holdout pool exists (`reviewQuestionIds` independent of `quizQuestionIds`). Spaced review at runtime supports retention; per-objective delayed-retention *content* hooks are not modeled yet. |
| **Exam Ready** | **Independent evidence only:** Assessed depth **and** disjoint holdout **and** at least one scored LabHost PBQ (`pbqLabIds`). |

### Hard rule

`coverage.status === "verified"` means “has lessons + ≥8 MCQs.” It is **never** Exam Ready by itself.

## Evidence fields

Each objective row in `coverage-states.json` includes:

- `evidence.hasLessons`
- `evidence.hasPracticeInteractions`
- `evidence.assessedDepth` (quiz/practice pool size)
- `evidence.hasDisjointHoldout`
- `evidence.hasScoredPbq` / `scoredPbqIds`
- `evidence.hasDelayedRetentionHook` (always `false` until a content-level delayed-review block exists)
- `blockers` — why the objective is not higher
- `concepts[]` / `subtopics[]` — bullet-level states where the catalog model allows

## What still blocks Exam Ready

See `blockers` on each non–Exam Ready row, plus [`DEFECTS.md`](./DEFECTS.md) and [`audit-log.md`](./audit-log.md). Typical remaining gaps:

- Zero-PBQ objectives (no scored lab)
- Mobile (C1-D1) still mirrors practice/holdout pools
- Foundation objectives intentionally non–Exam Ready
- No per-objective delayed-retention content hook yet (academy-wide spaced review is runtime-only)
