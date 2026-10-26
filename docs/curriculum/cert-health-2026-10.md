# Certification health — October 2026

**Review date:** 2026-10-05 (America/New_York)
**Reviewer:** Miyuki (curriculum owner) monthly cert-health pass
**Repo state reviewed:** `master` @ `5891031` (PR #12), PR #11 tip `7c1d09d`, PR #13 tip `9a2db42`

## CompTIA lock

- Exam product **V15**, series **220-1201 / 220-1202**, launched 2025-03-25, retirement estimated 2028.
- Official CDN objective PDFs still read **Exam Objectives Document Version 3.0** for both cores. They are byte-identical to the 2026-10-01 copies (CDN Last-Modified 2025-07-10).
- Domain weights unchanged: Core 1 13/23/25/11/28, Core 2 28/28/23/21. Passing scores 675 / 700 on 100–900.
- **No new exam series. No objective revision.** The academy stays locked to Document Version 3.0.

## Exam Ready (curriculum readiness, not learner mastery)

Recomputed from source with `buildCoverageStates()`; matches the committed `docs/curriculum/coverage-states.json`.

| Ref | Exam Ready | Retained | Assessed | Practiced | Taught | Missing |
|---|---|---|---|---|---|---|
| `master` @ 5891031 | **38/68** | 22 | 3 | 5 | 0 | 0 |
| PR #11 tip @ 7c1d09d | **63/68** | 0 | 0 | 5 | 0 | 0 |

No change from October 1. PR #12 changed catalog slugs only.

Exam Ready gates are honest in code: disjoint holdout (fully disjoint by construction, 0 overlap), at least one scored LabHost PBQ, and at least 8 practice items. `verify-content` fails the build if any Exam Ready row lacks PBQ and holdout evidence. Holdout items never reach `/practice` or domain quizzes (0 leaks).

## Production status

- Production still serves the PR #10 build (`11a8c1a`). The PR #12 deploy for `5891031` failed with `BUILD_UTILS_NODE_VERSION_DISCONTINUED` because `package.json` pins `engines.node` to `20.x`.
- Because of that, `/objectives` on production still links three Foundation lessons to 404 slugs (`what-is-a-plus`, `how-this-course-works`, `safety-and-units`). The fix itself is correct on `master`.
- Fix: bump `engines.node` to `24.x` on `master`, and production redeploys with PR #12 content.

## Top risks

1. **Production lags master** (Node 20 build failure). Until the Node bump lands, no merge reaches learners.
2. **The dashboard's "Internal Readiness %" measures completion, not performance.** It is 50% objectives completed, 20% labs completed, and 30% domains passed. Domains and checkpoints complete after retry-until-correct. Foundation lesson copy says the number combines mastery, unseen-question performance, retention, and mock history. The copy and the code disagree, and the number can read high even when first-attempt accuracy is low.
3. **Mock exams draw from the full core bank, holdout plus practice items.** Unseen-first sampling limits reuse, but the holdout is not a reserved validation set.
4. **Production readiness is incomplete:** 27 objectives have no scored PBQ and Mobile (C1-D1) has no holdout on master. PR #11 closes both, but it is on hold.
5. **Content-quality debt:** 64.1% of distractor rationales are under 25 characters. 88.4% of questions have no misconception tags.
6. **Media:** 10 of 18 video manifest entries are `verified: false`. No mp4 files ship (`/media/*.mp4` returns 404), so every video block falls back to a diagram or transcript. Learners never see unverified video.
7. `sources.ts` `verified` dates (16 of 16) are still `2026-09-01`. All 16 links returned HTTP 200 on 2026-10-05.

## Open PRs

- #11 C1-D1 holdout + 24 PBQ labs (held): https://github.com/Zaevian/aplus-academy/pull/11
- #13 Resume latest lesson from start page (also bumps Node 24.x): https://github.com/Zaevian/aplus-academy/pull/13
- Merged: #12 Foundation catalog slugs: https://github.com/Zaevian/aplus-academy/pull/12

## Next review

First business day of November 2026. Re-check the official CDN PDF headers, ETags, and Last-Modified, then recompute coverage states.