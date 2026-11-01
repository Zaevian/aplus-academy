# Certification health — November 2026

**Review date:** 2026-11-01 (America/New_York, about 10:25 AM ET)
**Reviewer:** Miyuki (curriculum owner) monthly cert-health pass
**Repo state reviewed:** `master` @ `4ffdfaf` (PR #22), live in production since 2026-10-26 1:17 PM ET (Vercel Production deployment for `4ffdfaf`: success)

## CompTIA lock

- Exam product **V15**, series **220-1201 / 220-1202**, launched 2025-03-25, retirement estimated 2028 ("usually three years after launch"). No V16 or new series announced on comptia.org.
- The current official objectives are **Exam Objectives Document Version 4.0**, linked from CompTIA's Core 1 V15 and Core 2 V15 pages (Optimizely CMP files, Last-Modified 2025-11-25). The academy has been locked to 4.0 since 2026-10-19 (PR #17); `EXAM_META.objectivesDocument` matches.
- 4.0 versus 3.0, compared text-to-text: every objective bullet, domain weight, and passing score is identical. Only the ANAB/ISO accreditation sentence and the acronym list changed (added CAS, eSIM, FaaS, GUI, ISP, NAS, NAT, OEM, SDS, SNMP, WEP; MSDS dropped in favor of SDS). All 11 added acronyms are in the glossary.
- The older 3.0 PDFs are still served from the legacy ctfassets CDN, byte-identical to October, but CompTIA's pages no longer link them. Future reviews should hash the Optimizely 4.0 files.
- Correction to the October 5 note: the "Document Version 4.0" seen in October was not just a third-party mirror. CompTIA itself publishes it. Because the bullets are unchanged, no Exam Ready result was affected.
- **Revalidation needed: no.**

## Exam Ready (curriculum readiness, not learner mastery)

Recomputed from source with `buildCoverageStates()`; it matches the committed `docs/curriculum/coverage-states.json`.

| Ref | Exam Ready | Practiced (Foundation) | Other |
|---|---|---|---|
| `master` @ 4ffdfaf | **63/67** (every Core 1 and Core 2 objective) | 4 | 0 |

The denominator dropped from 68 to 67 because PR #21 removed the required CompTIA overview objective.

Gate checks: 400 held-back items, with 0 overlap with practice, 0 in the Practice pool, and 0 in lesson checks. Item IDs are unique (2,011 questions). There are no near-duplicate pairs at Jaccard ≥ 0.6 on stem + scenario + key. One exact stem collides ("Which two are true?"), but the two items are in different objectives.

## False-confidence fixes in this PR

- The dashboard tile "Internal Readiness" is now **"Course completion (weighted)"**. It is still 50% objectives + 20% labs + 30% domains, and all of these complete after retry-until-correct.
- `INTERNAL_SCORING_DISCLAIMER`, the progress page, the mock report, and the domain quiz copy no longer call that number a mastery measure.
- The progress page's "Concept retention" is now "Concept accuracy" and shows the number of tries. One correct answer used to show as "100%".
- The Core 1 lesson 1 diagram no longer promises a rotatable exploded laptop. It renders a text list, and its title and alt text now say so.

## Sources

All 16 `sources.ts` links returned HTTP 200 on 2026-11-01. NIST SP 800-88 Rev. 1 was **withdrawn 2025-09-26** and replaced by Rev. 2, so the source now points to Rev. 2. Clear, purge, and destroy are unchanged. Verified dates are bumped to 2026-11-01.

## Top open risks

1. **Mock exams draw from the whole core bank:** C1 910 items (731 non-holdout, 332 lesson-check items) and C2 1,089 items (868 non-holdout, 465 lesson-check items). The sampler prefers unseen items, but holdout items are not reserved for mocks, so later mocks re-serve practice items.
2. **Authored answer keys are skewed:** 70% of single-answer items have the key in position A. Mocks and lesson checks shuffle; Practice does not. The practice answer-key shuffle is on hold, so it is not touched here.
3. **Core 2 rationale and tag debt:** 63–83% of distractor rationales are under 25 characters in C2 domains (Core 1 is 0–38%), and 0–9% of C2 items have misconception tags. C2-D4 (4.4–4.10) and C2-D2 (2.7–2.11) are the thinnest.
4. **8 diagrams render plain-text fallbacks across 11 lesson uses.** Their alt text still describes visuals that don't exist.
5. **Every objective has exactly one scored PBQ** except a few C1-D2/C1-D5/C2-D3 objectives. One lab per objective is the minimum Exam Ready evidence.
6. **No video files ship.** 8 of 18 manifest entries are verified, and all video blocks fall back safely.

## Next review

First business day of December 2026. Re-hash the Optimizely 4.0 PDFs (Core 1 `34be017c…`, Core 2 `cefedfb2…`), check the V15 page for V16 announcements, and recompute coverage states.
