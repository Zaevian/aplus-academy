# Curriculum audit log

Weekly learner-perspective + repo audits against CompTIA A+ V15 / Exam Objectives Document Version 3.0.
Live site: https://aplus-academy-gules.vercel.app/

Work path (2026-09-28 onward): **local clone** at `/tmp/aplus-academy` (Cloud Agents path dropped; Diablo authorized local-clone PRs). `gh` authenticated as Zaevian.

---

## 2026-09-28 — C1 Domain 1 Mobile Devices (first weekly rotation)

**Auditor:** Miyuki  
**Repo:** github.com/Zaevian/aplus-academy (local clone from master @ c3b83d0)  
**Official:** 220-1201 Domain 1 still **13%** on marketing page 2026-09-28

### Coverage snapshot
- Objectives 1.1–1.3: coverage status verified; 8 lessons; 108 questions; **0** pbqLabIds before Phase 1 fix
- Live guest path: domain pages, lessons, mastery quiz, practice, labs, exam entry load; Core labeling correct

### Findings
- **Critical/High:** No scored Mobile Devices labs/PBQs (catalog `requiredInteractions` unmet)
- **High:** Mastery inflation — `quizQuestionIds ≡ reviewQuestionIds`; QuizPlayer recorded perfect score + empty `missedConceptIds` while forcing retry-until-correct; KC shows full explanation then assisted retry still advanced mastery
- **High:** Flagship SHOW diagrams (`LaptopExplodedDiagram`, `PhoneSettingsDiagram`) are SIMPLE text fallbacks
- **Medium:** Weak/short distractor rationales; almost no misconception tags; generic duplicate stems; thin vendor sources
- **Live UX:** No lesson breadcrumbs/next-prev; review reachable before pass without explanation; search mixes cores

### Fixes shipped (this Phase 1 PR)
- Mastery honesty (`assisted` on `recordAnswer` / `scheduleAfterAnswer`; first-attempt quiz scoring)
- Scored Mobile Devices lab: `C1-D1-O1-LAPTOP-LAB` → `LaptopUpgradeLab` via LabHost (SODIMM / battery / WLAN FRU match)
- `docs/curriculum/DEFECTS.md`

### Open risks
- Still not fully Exam Ready without holdout pools, real diagrams, and additional MDM/accessory labs
- Coverage `"verified"` overstates practical readiness until PBQ suite expands

---

## 2026-09-28 — C1 Domain 2 Networking (second weekly rotation)

**Auditor:** Miyuki  
**Official:** 220-1201 Domain 2 Networking **23%**

### Coverage snapshot
- Objectives 2.1–2.8: all `verified`; **12** lessons; **240** questions
- Scored labs: Wi-Fi (`C1-D2-O2-WIFI-LAB`), network builder (`C1-D2-O5-RACK-LAB`), SOHO router (`C1-D2-O6-ROUTER-LAB`)
- **0** pbqLabIds on O1, O3, O4, O7, O8
- `quizQuestionIds === reviewQuestionIds` on all 8 objectives
- Official 2.1 ports list present; Core 1 mock opens with Ports PBQ
- Prior mock: `unseenFirst(pool, new Set(), 89)` empty exposure; Core 2 incorrectly shared Ports PBQ

### Findings
- **High (cross-cutting):** Mastery inflation + assisted retry credit (same as D1)
- **High:** Mock empty exposure; Core 2 ports PBQ bleed
- **Medium:** Uneven PBQ coverage; ~528 short rationales (&lt;25 chars); 0 misconception tags; single-lesson depth on several objectives
- **Low:** No holdout pool; `lastVerified` 2026-09-01

### Strengths
- Strong MCQ depth (≥28/objective); real LabHost network labs; TCP/UDP first principles before port memorization

### Verdict
**Not Exam Ready.** Taught/Assessed via MCQ with partial PBQ (O2/O5/O6). Phase 1 PR fixes mastery honesty, mock exposure, Core2 PBQ split, and domain-weighted MCQ sampling. Remaining: ports/tools PBQs for O1/O8, holdout pools, rationale quality.

### Machine-readable (workspace)
`/workspace/aplus-audit-md/out/networking-audit-2026-09-28.json`  
`/workspace/aplus-audit-md/out/mobile-devices-audit-2026-09-28.json`

### Next rotation
**C1 Domain 3 Hardware (3.0)**
