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
**C1 Domain 3 Hardware (3.0)** — see entry below.

---

## 2026-09-28 — C1 Domain 3 Hardware (third weekly rotation)

**Auditor:** Miyuki  
**Repo:** github.com/Zaevian/aplus-academy (branch `miyuki/c1-d3-hardware-audit` from master @ ddb5ed4)  
**Official:** 220-1201 Domain 3 Hardware **25%** (Exam Objectives Document Version 3.0)

### Coverage snapshot
- Objectives 3.1–3.8 (`C1-D3-O1`…`O8`): all coverage `verified` (MCQ depth ≥28); **14** lessons; **254** questions
- Scored LabHost labs before this PR: Cable (`O2`), RAID (`O4`), Motherboard (`O5`), Printer (`O8`)
- **This PR:** RAM install matching lab `C1-D3-O3-RAM-LAB` → `RamInstallLab` for O3 (DIMM/SODIMM/DDR/ECC/channels)
- Still **0** pbqLabIds on O1 (displays), O6 (PSU), O7 (printer deploy)
- Holdout: disjoint `reviewQuestionIds` for all eight Hardware objectives (first domain with a real split); lesson KC/checkpoint IDs stay in practice only

### Live guest walkthrough (2026-09-28 ET)
- Hardware domain **hard-locked** until Networking mastery 100% (Networking behind Mobile/Foundation). Guest could not open Hardware lessons/quiz; landing previously showed only gate text with **no** lesson/Q/lab counts.
- Practice (Core 1) works independently of the domain gate; distractor rationales often short but present.
- Core 1 mock opens with networking Ports PBQ / cloud / TCP early — not Hardware-weighted lead items (domain-weighted sampler still draws full Core 1 bank after PBQ).
- Labs catalog: ~20 entries; Hardware-relevant RAID / Motherboard / Cable / Printer visible; **no RAM lab on live** until this PR deploys; no search/filter before this PR. Motherboard lab has a real interactive diagram.
- Screenshots: `/workspace/hardware-domain-lock.png`, `labs-catalog.png`, `practice-quiz-san.png`, `motherboard-lab-diagram.png`

### Findings
- **High (process):** Domain hard-lock blocks guest/auditor self-serve sampling of Hardware content — intentional curriculum order, but Exam-Ready/audit friction. Soft read-only syllabus preview added; gate preserved.
- **High (cross-cutting, prior):** Mastery honesty + mock exposure fixed in Phase 1; do not re-litigate unless regressing.
- **High → fixed this PR:** `DisplayCompareDiagram` was a SIMPLE text stub used by O1 lessons.
- **High → partial:** `reviewQuestionIds === quizQuestionIds` globally; Hardware now has a disjoint holdout consumed by domain quiz + practice pools. Other domains still mirrored.
- **Medium:** Uneven PBQ — O1/O6/O7 still lack scored labs; O3 gained RAM lab.
- **Medium → partial:** Weak D3 rationales / zero misconception tags; ~18 questions upgraded with tags.
- **Low → fixed:** Labs catalog lacked search/kind filter.

### Strengths
- Deep MCQ bank (≥28/objective); real LabHost motherboard/cable/RAID/printer sims; SEE clips for DIMM/SODIMM; official 25% Hardware weight in `EXAM_META`.

### Fixes shipped (this PR)
- `RamInstallLab` + lesson wire for C1-D3-O3; LabHost registration
- Holdout split pattern (`HOLDOUT_DOMAIN_IDS`) starting with C1-D3; domain quiz + practice exclude holdout
- Real `DisplayCompareDiagram`; ~18 rationale/tag upgrades
- DomainGate read-only syllabus preview; Labs search + kind filter
- `docs/curriculum/DEFECTS.md` + this audit entry

### Verdict
**Not Exam Ready.** Taught/Assessed via strong MCQ + partial PBQ (O2/O3/O4/O5/O8). Coverage `"verified"` still overstates practical readiness without O1/O6/O7 labs, fuller rationale quality, and holdout extended beyond Hardware. Domain hard-lock remains deliberate progression — preview only.

### Machine-readable (workspace)
`/workspace/aplus-audit-md/out/hardware-audit-2026-09-28.json`

### Next rotation
**C1 Domain 4 Virtualization and Cloud (4.0)** — or deepen Hardware O1/O6/O7 PBQs before rotating.

---

## 2026-09-28 — C2 Domain 1 Operating Systems (first Core 2 weekly rotation)

**Auditor:** Miyuki  
**Repo:** github.com/Zaevian/aplus-academy (branch `miyuki/c2-d1-operating-systems` from master @ 9197840)  
**Official:** 220-1202 Domain 1 Operating Systems **28%** (Exam Objectives Document Version 3.0)  
**Note:** Core 1 rotation complete through D5 with open PRs #3 (Networking holdout), #4 (Virtualization), #5 (Troubleshooting) — left untouched.

### Coverage snapshot
- Objectives 1.1–1.11 (`C2-D1-O1`…`O11`): all coverage `verified`; **23** lessons; **362** questions
- Scored LabHost labs before this PR: Windows tools (`O4`), Windows CLI (`O5`), macOS (`O8`), Linux (`O9`)
- **This PR:** Windows edition matching lab `C2-D1-O3-EDITION-LAB` → `WindowsEditionLab` for O3 (Home/Pro/Pro for Workstations/Enterprise)
- Still **0** pbqLabIds on O1 (OS types/FS), O2 (install/partition), O6 (Settings), O7 (client networking), O10 (app install), O11 (cloud productivity)
- Holdout: `HOLDOUT_DOMAIN_IDS` now `C1-D3` + `C2-D1` (D2/D4/D5 holdouts arrive when those PRs merge)
- Core 2 mock PBQ: Windows tools / security match (`TOOLS_PBQ_ID`) — Ports PBQ correctly Core-1-only (Phase 1)

### Findings
- **High → partial:** Uneven PBQ — O3 gained edition lab; six objectives still empty
- **High → fixed:** `OsMatrixDiagram` was a SIMPLE text stub used by O1 lessons
- **Medium (open):** `EditionMatrixDiagram` still SIMPLE (lesson table already covers features; deferred)
- **Medium → partial:** Hundreds of short distractor rationales; ~10 O1/O3 Qs upgraded with tags
- **High → partial:** Holdout extended to C2-D1; other Core 2 domains still mirrored

### Strengths
- Deep MCQ bank (≥28/objective); real LabHost Windows tools/CLI + macOS + Linux sims; official 28% OS weight in `EXAM_META`; Core 2 exam PBQ already split from Ports

### Fixes shipped (this PR)
- `WindowsEditionLab` + lesson wire for C2-D1-O3; LabHost registration
- Holdout split for C2-D1 alongside existing C1-D3
- Real `OsMatrixDiagram`; ~10 rationale/tag upgrades
- `docs/curriculum/DEFECTS.md` + this audit entry

### Verdict
**Not Exam Ready.** Taught/Assessed via strong MCQ + partial PBQ (O3/O4/O5/O8/O9). Coverage `"verified"` still overstates practical readiness without O1/O2/O6/O7/O10/O11 labs, EditionMatrix SHOW, fuller rationales, and holdout across remaining Core 2 domains.

### Machine-readable (workspace)
`/workspace/aplus-audit-md/out/operating-systems-audit-2026-09-28.json`

### Next rotation
**C2 Domain 2 Security (2.0)** — or deepen OS install/Settings/network PBQs before rotating.
