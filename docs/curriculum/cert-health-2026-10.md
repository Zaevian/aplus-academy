# Certification health — October 2026

**Reviewed:** 2026-10-05 (America/New_York) by Miyuki  
**Production at review:** https://aplus-academy-gules.vercel.app/ (still on master @ `11a8c1a` / PR #10 because the `5891031` production build failed)  
**Repo tip:** master @ `5891031` (PR #12 slug alignment merged but undeployed)

## CompTIA official lock

- Product **V15**, series **220-1201 / 220-1202**, launch 2025-03-25, retirement usually ~3 years (~2028).
- Official CDN Exam Objectives Document Version **3.0** (both cores) — unchanged vs academy lock. Pass scores 675 / 700.
- No new exam series. No urgent coverage-map revalidation.

## Readiness honesty

- Exam Ready on production map: **38/68** (Practiced 5 Foundation, Assessed 3, Retained 22).
- Open PR #11 tip: **63/68** (still held).
- Exam Ready still requires disjoint holdout + scored LabHost PBQ + ≥8 practice items. Assisted retries do not inflate mastery. Gate math remains trustworthy; the product still *looks* fuller than the Exam Ready count — keep Internal Readiness language loud.

## Critical ship blocker found this month

- PR #12 fixed the Foundation catalog↔lesson slug mismatch in git, but the Vercel production build errored with `BUILD_UTILS_NODE_VERSION_DISCONTINUED` (Node 20.x).
- Until `engines.node` is **24.x** and production rebuilds, `/objectives` still 404s three Foundation lessons for beginners who start from the objective map (`what-is-a-plus`, `how-this-course-works`, `safety-and-units`). Lesson routes from `/course/foundation` already use the correct slugs and return 200.

## Open curriculum debt (unchanged themes)

- PR #11 held (PBQ deepen → 63/68).
- Weak distractor rationales / missing misconception tags.
- Mobile diagrams still include SIMPLE fallbacks on the production tip.
- Source `verified` dates aging (refresh when convenient).

## Actions from this note

- Ship Node 24.x engines so master (including PR #12) can deploy.
- Re-check `/objectives` Foundation links return 200 after production is current.
- Keep the PR #11 merge decision with Diablo/Zae.