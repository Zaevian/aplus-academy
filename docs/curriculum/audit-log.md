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

## 2026-09-28 — C1 Domain 5 Hardware and Network Troubleshooting (fifth weekly rotation)

**Auditor / implementer:** Miyuki  
**Repo:** github.com/Zaevian/aplus-academy (branch `miyuki/c1-d5-troubleshooting` from master @ 9197840)  
**Official:** 220-1201 Domain 5 Hardware and Network Troubleshooting **28%** (Exam Objectives Document Version 3.0)  
**Diablo:** leave PR #3 (D2 holdout) and #4 (D4 virtualization) open — Zae merge hold. This PR does not merge or modify those branches.

### Coverage snapshot
- Objectives 5.1–5.6 (`C1-D5-O1`…`O6`): all coverage `verified`; **11** lessons; **194** questions
- Scored LabHost labs before this PR: borrowed RAID/Wi-Fi/Printer + capstone `C1-D5-SHIFT-LAB` (TicketShiftLab) covering O1/O2/O5/O6
- **O3 (displays/projectors) and O4 (mobile TS) had 0 dedicated pbqLabIds**
- **This PR:** display/projector symptom→cause lab `C1-D5-O3-DISPLAY-LAB` → `DisplayFaultLab` for O3
- Holdout: `HOLDOUT_DOMAIN_IDS` on master was `["C1-D3"]` only; **this PR adds `C1-D5`**. D2/D4 holdout remain on unmerged PRs #3/#4 and land when those merge.
- `quizQuestionIds === reviewQuestionIds` on D5 before this PR; after: disjoint holdout for all six D5 objectives

### Findings
- **Critical/High → partial:** O3/O4 lacked dedicated scored PBQs; O3 gains DisplayFaultLab; O4 still open
- **High → partial:** Holdout now live for C1-D3 and C1-D5 on master; D2/D4 await PR merge
- **High → fixed:** `DisplayFaultDiagram` was a SIMPLE text stub used by O3 — upgraded to labeled fault gallery
- **Medium → partial:** ~11 O3 questions upgraded with fuller distractor rationales + misconception tags; hundreds of D5 rationales remain &lt;25 chars
- **Medium (open):** O4 mobile troubleshooting still has no scored LabHost lab; catalog `device-inspect` unmet
- **Low:** D5 lessons cite only `c1-obj-3.0` + `comptia-a-v15`

### Strengths
- Deep MCQ (≥28/objective, O1/O5 at 40); real TicketShiftLab capstone; borrowed RAID/Wi-Fi/Printer labs already wired into D5 lessons

### Fixes shipped (this PR)
- `DisplayFaultLab` + lesson wire for C1-D5-O3; LabHost + implemented registration
- `HOLDOUT_DOMAIN_IDS` includes C1-D5 alongside C1-D3; holdout tests extended (document D2/D4 pending #3/#4)
- Real `DisplayFaultDiagram` fault gallery
- ~11 O3 rationale/tag upgrades
- `docs/curriculum/DEFECTS.md` + this audit entry; machine-readable audit JSON in workspace

### Verdict
**Not Exam Ready.** Strong MCQ + partial PBQ (O1/O2/O3/O5/O6). O4 still zero dedicated labs; rationale quality still thin outside the upgraded sample; holdout for D2/D4 waits on open PRs.

### Machine-readable (workspace)
`/workspace/aplus-audit-md/out/troubleshooting-audit-2026-09-28.json`

### Next rotation
**C1-D4 deepening (O1 virtualization PBQ)** after PR #4 merges — or **C1-D5-O4 mobile inspect lab** / O1 dedicated system-board PBQ.
