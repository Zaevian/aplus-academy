# Curriculum audit log

Weekly learner-perspective + repo audits against CompTIA A+ V15 / Exam Objectives Document Version 3.0.
Live site: https://aplus-academy-gules.vercel.app/

Work path (2026-09-28 onward): **local clone** at `/tmp/aplus-academy` (Cloud Agents path dropped; Diablo authorized local-clone PRs). `gh` authenticated as Zaevian.

---

## 2026-09-28 — PBQ deepen-3b (+4 scored LabHost labs on #11)

**Auditor/Implementer:** Miyuki  
**Branch:** `miyuki/pbq-deepen-3` (updates open PR #11 in place; tip was 528162c)  
**Official:** CompTIA A+ V15 / Exam Objectives Document Version 3.0 — no dumps

### Shipped
- `C1-D1-O3-MDM-LAB` → `MobileMdmLab` (eSIM, MDM enroll, BYOD selective wipe, data cap)
- `C1-D2-O8-TOOLS-LAB` → `NetworkToolsLab` (crimper, punchdown, toner, Wi-Fi analyzer)
- `C2-D2-O3-WIFISEC-LAB` → `WirelessSecurityLab` (WPA3-Personal, Enterprise+RADIUS, AES, Kerberos)
- `C2-D4-O5-ENV-LAB` → `EnvironmentControlsLab` (UPS, surge, SDS, humidity/ESD)
- Full wire: `labs/index.ts`, `implemented.ts`, `lab-host.tsx`, lesson lab blocks
- Regenerated `coverage-states.json` / `coverage.json`; did **not** re-touch C1-D1 holdout

### Coverage
Exam Ready rises with the four new PBQ+holdout objectives (see regenerated summary). Remaining empty PBQ (skip FND): C1-D2-O3/O7, C1-D3-O6/O7, C2-D1-O2/O6/O7/O10/O11, C2-D2-O7/O8/O9/O11, C2-D4-O6/O8/O9.

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

## 2026-09-28 — C1 Domain 2 Networking follow-on (holdout + ports lab)

**Auditor / implementer:** Miyuki  
**Repo:** github.com/Zaevian/aplus-academy (branch `miyuki/c1-d2-networking-holdout` from master @ 9197840 after Hardware #2)  
**Official:** 220-1201 Domain 2 Networking **23%**

### Shipped
- **Holdout:** `HOLDOUT_DOMAIN_IDS` includes `C1-D2` alongside `C1-D3`; disjoint `reviewQuestionIds` for all eight Networking objectives; lesson KC/checkpoint IDs protected
- **Scored ports PBQ lab:** `C1-D2-O1-PORTS-LAB` → `PortsDrillLab` (ticket → official 2.1 port match) via LabHost + O1-L3 lesson block

### Still open
- O3/O4/O7/O8 scored labs (tools drill still missing)
- Weak distractor rationales / misconception tags on Networking bank
- Mobile Devices and remaining domains without holdout

### Verdict
**Not Exam Ready** for Networking as a whole — holdout + O1 ports lab close two gaps from the earlier Networking audit; PBQ suite and rationale quality still incomplete.

---

## 2026-09-28 — C1 Domain 4 Virtualization and Cloud (fourth weekly rotation)

**Auditor:** Miyuki  
**Repo:** github.com/Zaevian/aplus-academy (branch `miyuki/c1-d4-virtualization` from master @ 9197840)  
**Official:** 220-1201 Domain 4 Virtualization and Cloud Computing **~11%** (Exam Objectives Document Version 3.0)  
**Note:** Restacked onto master after PR #3 (C1-D2 Networking holdout + ports lab).

### Coverage snapshot
- Objectives 4.1–4.2 (`C1-D4-O1`, `C1-D4-O2`): coverage `verified` (MCQ depth ≥40); **6** lessons; **82** questions
- Scored LabHost labs **before** this PR: **0** pbqLabIds on both objectives
- **This PR:** Cloud service model lab `C1-D4-O2-CLOUD-LAB` → `CloudServiceLab` for O2 (IaaS/PaaS/SaaS ticket match; on-prem/container distractors unused)
- Still **0** pbqLabIds on O1 (Type 1/2, VDI, containers)
- Holdout: `HOLDOUT_DOMAIN_IDS` now includes **C1-D4** alongside C1-D2 and C1-D3; lesson KC/checkpoint IDs stay in practice only
- SHOW: `HypervisorDiagram` / `CloudModelsDiagram` were real components (not SIMPLE stubs) but thin — upgraded to Type1/Type2/container contrast and on-prem→SaaS responsibility stack

### Findings
- **Critical → partial:** Zero scored Virtualization/Cloud PBQs; O2 gained cloud lab; O1 still open
- **High → partial:** Holdout extended to C1-D4; other domains still mirrored
- **Medium → fixed:** Cloud/hypervisor diagrams under-delivered vs lesson captions
- **Medium → partial:** Weak D4 rationales; ~13 questions upgraded with tags
- **Low:** Lessons still cite only generic CompTIA sources
- **Medium:** Catalog `requiredInteractions` (stack-builder, type-compare, vm-vs-container, cloud-chooser, elasticity-slider) still mostly unmet by named labs

### Strengths
- Deep, scenario-heavy MCQ bank; clear first-principles lessons (host/guest, Type 1 vs 2, VDI vs container, deployment vs service models, elasticity/metering/shared responsibility)

### Fixes shipped (this PR)
- `CloudServiceLab` + lesson wire for C1-D4-O2; LabHost registration
- Holdout split for C1-D4; tests extended
- `CloudModelsDiagram` + `HypervisorDiagram` upgrades
- ~13 rationale/tag upgrades
- `docs/curriculum/DEFECTS.md` + this audit entry

### Verdict
**Not Exam Ready.** Taught/Assessed via strong MCQ + **one** cloud PBQ (O2). Coverage `"verified"` still overstates practical readiness without an O1 virtualization PBQ, fuller rationale quality, and holdout beyond D3/D4.

### Machine-readable (workspace)
`/workspace/aplus-audit-md/out/virtualization-audit-2026-09-28.json`

### Next rotation
**C1 Domain 5 Hardware and Network Troubleshooting** — or add O1 hypervisor/container matching PBQ before rotating.

---

## 2026-09-28 — C1 Domain 5 Hardware and Network Troubleshooting (fifth weekly rotation)

**Auditor / implementer:** Miyuki  
**Repo:** github.com/Zaevian/aplus-academy (branch `miyuki/c1-d5-troubleshooting` from master @ 9197840)  
**Official:** 220-1201 Domain 5 Hardware and Network Troubleshooting **28%** (Exam Objectives Document Version 3.0)  
**Note:** Restacked onto master after PR #3 (C1-D2) and PR #4 (C1-D4).

### Coverage snapshot
- Objectives 5.1–5.6 (`C1-D5-O1`…`O6`): all coverage `verified`; **11** lessons; **194** questions
- Scored LabHost labs before this PR: borrowed RAID/Wi-Fi/Printer + capstone `C1-D5-SHIFT-LAB` (TicketShiftLab) covering O1/O2/O5/O6
- **O3 (displays/projectors) and O4 (mobile TS) had 0 dedicated pbqLabIds**
- **This PR:** display/projector symptom→cause lab `C1-D5-O3-DISPLAY-LAB` → `DisplayFaultLab` for O3
- Holdout: **this PR adds `C1-D5`** alongside C1-D2, C1-D3, and C1-D4 already on master.
- `quizQuestionIds === reviewQuestionIds` on D5 before this PR; after: disjoint holdout for all six D5 objectives

### Findings
- **Critical/High → partial:** O3/O4 lacked dedicated scored PBQs; O3 gains DisplayFaultLab; O4 still open
- **High → partial:** Holdout now live for C1-D2, C1-D3, C1-D4, and C1-D5; other domains still mirrored
- **High → fixed:** `DisplayFaultDiagram` was a SIMPLE text stub used by O3 — upgraded to labeled fault gallery
- **Medium → partial:** ~11 O3 questions upgraded with fuller distractor rationales + misconception tags; hundreds of D5 rationales remain &lt;25 chars
- **Medium (open):** O4 mobile troubleshooting still has no scored LabHost lab; catalog `device-inspect` unmet
- **Low:** D5 lessons cite only `c1-obj-3.0` + `comptia-a-v15`

### Strengths
- Deep MCQ (≥28/objective, O1/O5 at 40); real TicketShiftLab capstone; borrowed RAID/Wi-Fi/Printer labs already wired into D5 lessons

### Fixes shipped (this PR)
- `DisplayFaultLab` + lesson wire for C1-D5-O3; LabHost + implemented registration
- `HOLDOUT_DOMAIN_IDS` includes C1-D5 alongside C1-D2, C1-D3, and C1-D4; holdout tests extended
- Real `DisplayFaultDiagram` fault gallery
- ~11 O3 rationale/tag upgrades
- `docs/curriculum/DEFECTS.md` + this audit entry; machine-readable audit JSON in workspace

### Verdict
**Not Exam Ready.** Strong MCQ + partial PBQ (O1/O2/O3/O5/O6). O4 still zero dedicated labs; rationale quality still thin outside the upgraded sample.

### Machine-readable (workspace)
`/workspace/aplus-audit-md/out/troubleshooting-audit-2026-09-28.json`

### Next rotation
**C1-D5-O4 mobile inspect lab** or an O1 dedicated system-board PBQ — or deepen C1-D4 O1 virtualization PBQ.

---

## 2026-09-28 — C2 Domain 1 Operating Systems (first Core 2 weekly rotation)

**Auditor:** Miyuki  
**Repo:** github.com/Zaevian/aplus-academy (branch `miyuki/c2-d1-operating-systems` from master @ 9197840)  
**Official:** 220-1202 Domain 1 Operating Systems **28%** (Exam Objectives Document Version 3.0)  
**Note:** Restacked onto master after PRs #3–#5 (C1-D2, C1-D4, C1-D5).

### Coverage snapshot
- Objectives 1.1–1.11 (`C2-D1-O1`…`O11`): all coverage `verified`; **23** lessons; **362** questions
- Scored LabHost labs before this PR: Windows tools (`O4`), Windows CLI (`O5`), macOS (`O8`), Linux (`O9`)
- **This PR:** Windows edition matching lab `C2-D1-O3-EDITION-LAB` → `WindowsEditionLab` for O3 (Home/Pro/Pro for Workstations/Enterprise)
- Still **0** pbqLabIds on O1 (OS types/FS), O2 (install/partition), O6 (Settings), O7 (client networking), O10 (app install), O11 (cloud productivity)
- Holdout: **this PR adds `C2-D1`** alongside C1-D2, C1-D3, C1-D4, and C1-D5 already on master
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
- Holdout split for C2-D1 alongside C1-D2, C1-D3, C1-D4, and C1-D5
- Real `OsMatrixDiagram`; ~10 rationale/tag upgrades
- `docs/curriculum/DEFECTS.md` + this audit entry

### Verdict
**Not Exam Ready.** Taught/Assessed via strong MCQ + partial PBQ (O3/O4/O5/O8/O9). Coverage `"verified"` still overstates practical readiness without O1/O2/O6/O7/O10/O11 labs, EditionMatrix SHOW, fuller rationales, and holdout across remaining Core 2 domains.

### Machine-readable (workspace)
`/workspace/aplus-audit-md/out/operating-systems-audit-2026-09-28.json`

### Next rotation
**C2 Domain 2 Security (2.0)** — or deepen OS install/Settings/network PBQs before rotating.

---

## 2026-09-28 — C2 Domain 2 Security (Core 2 weekly rotation)

**Auditor:** Miyuki  
**Repo:** github.com/Zaevian/aplus-academy (branch `miyuki/c2-d2-security` from master @ 9197840)  
**Official:** 220-1202 Domain 2 Security **28%** (Exam Objectives Document Version 3.0)  
**Note:** Restacked onto master after PRs #3–#6. This PR adds C2-D2 holdout alongside the domains already on master.

### Coverage snapshot
- Objectives 2.1–2.11 (`C2-D2-O1`…`O11`): all coverage `verified`; **16** lessons; **332** questions (≥28/objective)
- Scored LabHost labs before this PR: ACL (`O2`), Phishing (`O5`/`O4`), Malware removal (`O6`); O10 reuses Core 1 router lab
- **This PR:** Physical/logical controls matching lab `C2-D2-O1-AUTH-LAB` → `AuthFactorsLab` for O1 (vestibule, bollards, MFA factor types, PAM/JIT)
- Still **0** dedicated pbqLabIds on O3 (wireless), O7 (workstation harden), O8 (mobile), O9 (destruction), O11 (browser)
- Holdout: **this PR adds `C2-D2`** alongside C1-D2, C1-D3, C1-D4, C1-D5, and C2-D1 already on master

### Findings
- **High → partial:** Uneven PBQ — O1 gained auth/controls lab; five objectives still empty of dedicated Security labs
- **High → fixed:** `PermissionDiagram` was a SIMPLE text stub used by O2 NTFS/share lesson
- **Medium (open):** `PhoneSettingsDiagram` (O8) and `DnsFlowDiagram` (O11) still SIMPLE
- **Medium → partial:** Hundreds of short distractor rationales; ~10 O1 Qs upgraded with tags
- **High → partial:** Holdout extended to C2-D2; other Core 2 domains still mirrored on master

### Strengths
- Deep MCQ bank (≥28/objective); real LabHost phishing/malware/ACL sims already shipped; official 28% Security weight in `EXAM_META`; Core 2 exam PBQ already split from Ports (Phase 1)

### Fixes shipped (this PR)
- `AuthFactorsLab` + lesson wire for C2-D2-O1; LabHost registration
- Holdout split for C2-D2 alongside C1-D2, C1-D3, C1-D4, C1-D5, and C2-D1
- Real `PermissionDiagram`; ~10 O1 rationale + misconception-tag upgrades
- `docs/curriculum/DEFECTS.md` + this audit entry

### Verdict
**Not Exam Ready.** Taught/Assessed via strong MCQ + partial PBQ (O1/O2/O4/O5/O6/O10). Coverage `"verified"` still overstates practical readiness without O3/O7/O8/O9/O11 labs, remaining SHOW stubs, fuller rationales, and holdout across remaining domains.

### Machine-readable (workspace)
`/workspace/aplus-audit-md/out/security-audit-2026-09-28.json`

### Next rotation
**C2 Domain 3 Software Troubleshooting (3.0)** — or deepen Security wireless/browser/mobile/destruction PBQs before rotating.

---

## 2026-09-28 — C2 Domain 3 Software Troubleshooting

**Auditor / implementer:** Miyuki  
**Repo:** github.com/Zaevian/aplus-academy (branch `miyuki/c2-d3-software-ts` from master @ 9197840)  
**Official:** 220-1202 Domain 3 Software Troubleshooting **23%** (Exam Objectives Document Version 3.0)  
**Note:** Restacked onto master after PRs #3–#7.

### Coverage snapshot
- Objectives 3.1–3.4 (`C2-D3-O1`…`O4`): all coverage `verified` (MCQ depth 28); **9** lessons; **112** questions
- Before this PR: O1 shared Win CLI/Tools + shift; O2/O3 **0** dedicated pbqLabIds; O4 shift only; `quizQuestionIds === reviewQuestionIds`
- **This PR:** `C2-D3-O2-MOBILE-LAB` → `MobileOsLab`; C2-D3 holdout enabled; real `PhoneSettingsDiagram`; ~10 O2 rationale/tag upgrades
- Still **0** dedicated scored labs on O3 (mobile security symptoms); O4 still only shift

### Findings
- **High → partial:** Uneven PBQ — O2 gained mobile triage lab; O3 still empty; O1/O4 lean on shared/shift labs
- **High → fixed:** `PhoneSettingsDiagram` was a SIMPLE stub on O2/O3 lessons
- **High → partial:** Holdout now includes C2-D3 alongside C1-D2, C1-D3, C1-D4, C1-D5, C2-D1, and C2-D2; other domains still mirrored
- **Medium → partial:** Weak/short rationales across C2-D3; ~10 O2 items upgraded with misconception tags

### Fixes shipped (this PR)
- `MobileOsLab` + lesson wire for C2-D3-O2; LabHost registration
- `HOLDOUT_DOMAIN_IDS` adds C2-D3 alongside C1-D2, C1-D3, C1-D4, C1-D5, C2-D1, and C2-D2
- Real `PhoneSettingsDiagram`; ~10 O2 rationale/tag upgrades
- `docs/curriculum/DEFECTS.md` + this audit entry

### Verdict
**Not Exam Ready.** Taught/Assessed via strong MCQ + partial PBQ (O1 shared tools, O2 mobile triage, O4 shift). Coverage `"verified"` still overstates practical readiness without O3/O4 dedicated labs and fuller rationale quality.

### Machine-readable (workspace)
`/workspace/aplus-audit-md/out/software-troubleshooting-audit-2026-09-28.json`

### Next rotation
**C2 Domain 4 Operational Procedures (4.0)** — or deepen Software-TS O3/O4 PBQs before rotating.

---

## 2026-09-28 — C2 Domain 4 Operational Procedures (final Core 1+2 first-pass rotation)

**Auditor:** Miyuki  
**Repo:** github.com/Zaevian/aplus-academy (branch `miyuki/c2-d4-ops` from master @ 9197840)  
**Official:** 220-1202 Domain 4 Operational Procedures **21%** (Exam Objectives Document Version 3.0)  
**Note:** Restacked onto master after PRs #3–#8.

### Coverage snapshot
- Objectives 4.1–4.10 (`C2-D4-O1`…`O10`): all coverage `verified`; **14** lessons; **283** questions
- Scored LabHost labs before this PR: Ticket (`O1`, also claimed `O2`), Backup (`O3`), Voice (`O7`); AI (`O10`) only via shared `C2-D3-SHIFT-LAB`
- **This PR:** Change pipeline lab `C2-D4-O2-CHANGE-LAB` → `ChangePipelineLab` for O2 (standard/normal/emergency + freeze + real rollback); TicketLab scoped to O1 only
- Still **0** pbqLabIds on O4 (safety), O5 (environment), O6 (privacy/incident), O8 (scripting), O9 (remote access)
- Holdout: disjoint `reviewQuestionIds` for all ten Ops objectives; lesson KC/checkpoint IDs stay in practice only
- SHOW: `BackupChainDiagram` + `AiPolicyDiagram` already NAMED — **no** SIMPLE stub referenced by C2-D4

### Findings
- **High → partial:** Uneven PBQ — O2 gained dedicated change lab; O4/O5/O6/O8/O9 still unmet vs catalog `requiredInteractions`
- **High → partial:** Holdout split for C2-D4 alongside C1-D2, C1-D3, C1-D4, C1-D5, C2-D1, C2-D2, and C2-D3 already on master
- **Medium → partial:** Weak O2 rationales / zero misconception tags; ~11 questions upgraded with tags
- **Low / n/a:** No critical C2-D4 SHOW stub to fix this rotation

### Strengths
- Deep MCQ across all ten objectives (≥25/objective); real Ticket/Backup/Voice LabHost sims; change-management first principles before CAB memorization

### Fixes shipped (this PR)
- `ChangePipelineLab` + lesson wire for C2-D4-O2; LabHost registration; TicketLab → O1 only
- `HOLDOUT_DOMAIN_IDS` adds C2-D4 alongside C1-D2, C1-D3, C1-D4, C1-D5, C2-D1, C2-D2, and C2-D3
- ~11 O2 rationale + misconception-tag upgrades
- `docs/curriculum/DEFECTS.md` + this audit entry

### Verdict
**Not Exam Ready.** Taught/Assessed via strong MCQ + partial PBQ (O1 ticket, O2 change, O3 backup, O7 voice; O10 shared shift). Remaining: safety/environment/privacy/scripting/remote scored labs and broader rationales.

### Domain rotation
**First full Core 1 + Core 2 domain audit rotation is on master** with this restack (PRs #3–#8 already merged; this PR closes C2-D4 Ops). C1-D1 Mobile was audited earlier; C1-D3 Hardware merged as #2.

### Machine-readable (workspace)
`/workspace/aplus-audit-md/out/operational-procedures-audit-2026-09-28.json`

### Next
Deepen Ops O4/O5/O6/O8/O9 PBQs, or second-pass remediations after open PRs merge.

---

## 2026-09-28 — Coverage map + PBQ deepen (post-merge resume)

**Auditor / implementer:** Miyuki  
**Repo:** github.com/Zaevian/aplus-academy (branch `miyuki/coverage-map-pbq-deepen` from master @ fd86077)  
**Live:** https://aplus-academy-gules.vercel.app/  
**HOLDOUT_DOMAIN_IDS:** left unchanged (C1-D2…C2-D4). Mobile still mirrors pools — not reopened.

### Shipped
1. **Educational coverage states** — `docs/curriculum/coverage-states.json` + `coverage-states.md`. States: Missing → Taught → Practiced → Assessed → Retained → Exam Ready. Computed from registry evidence (lessons, interactions, quiz depth, disjoint holdout, scored `pbqLabIds`). **Exam Ready never equals `coverage.verified` alone.** Regenerated by `pnpm write:coverage` and `pnpm verify:content`.
2. **Four new scored LabHost labs** (different domains; matching tickets with distractors):
   - `C1-D3-O1-DISPLAY-LAB` → `DisplayMatchLab` (Hardware displays)
   - `C1-D4-O1-HYPERVISOR-LAB` → `HypervisorMatchLab` (Type1/Type2/VDI/container)
   - `C1-D5-O4-MOBILE-HW-LAB` → `MobileHardwareTsLab` (mobile hardware TS)
   - `C2-D3-O3-COMPROMISE-LAB` → `CompromisedPhoneLab` (mobile security symptoms)
3. Lessons wired with lab blocks; labs/index + implemented + LabHost registered.

### Still not Exam Ready (examples)
- C1-D1 Mobile objectives: no disjoint holdout yet (pools mirror)
- Remaining 0-PBQ: C1-D1-O2/O3, C1-D2-O3/O4/O7/O8, C1-D3-O6/O7, C2-D1-O1/O2/O6/O7/O10/O11, C2-D2-O3/O7/O8/O9/O11, C2-D4-O4/O5/O6/O8/O9, Foundation stubs
- No per-objective delayed-retention *content* hook (academy spaced review is runtime-only)
- Rationale / misconception-tag debt from prior audits remains open

### Verdict
Coverage map now machine-readable with honest Exam Ready gates. Four high-weight PBQ gaps closed. Curriculum still **not fully Exam Ready** end-to-end.

---

## 2026-09-28 — PBQ deepen-3 + Mobile holdout (C1-D1)

**Auditor / implementer:** Miyuki  
**Repo:** github.com/Zaevian/aplus-academy (branch `miyuki/pbq-deepen-3` from master @ 11a8c1a)  
**Live:** https://aplus-academy-gules.vercel.app/  
**HOLDOUT_DOMAIN_IDS:** added **C1-D1** (was the holdout gap called out after #10). Left C1-D2…C2-D4 unchanged.

### Shipped
1. **C1-D1 Mobile holdout** — `HOLDOUT_DOMAIN_IDS` includes Mobile; practice/review pools now disjoint (tests updated; mirror-pool assertion removed).
2. **Four new scored LabHost labs** (mix across cores/domains; matching tickets with distractors):
   - `C1-D1-O2-ACCESSORY-LAB` → `MobileAccessoriesLab` (NFC / dock / replicator / headset)
   - `C1-D2-O4-SERVICES-LAB` → `NetworkServicesLab` (DNS / DHCP reservation / VLAN / VPN)
   - `C2-D1-O1-OSTYPES-LAB` → `OsTypesLab` (Windows / Linux / ChromeOS / macOS + FS/EOL distractors)
   - `C2-D4-O4-SAFETY-LAB` → `SafetyProceduresLab` (ESD / disconnect / PPE / lift)
3. Lessons wired with lab blocks; labs/index + implemented + LabHost registered; coverage-states regenerated.

### Still empty pbqLabIds (skip FND)
C1-D1-O3; C1-D2-O3/O7/O8; C1-D3-O6/O7; C2-D1-O2/O6/O7/O10/O11; C2-D2-O3/O7/O8/O9/O11; C2-D4-O5/O6/O8/O9.

### Verdict
Mobile can now reach Exam Ready where scored PBQ + holdout exist (O1/O2). Curriculum still **not fully Exam Ready** end-to-end.

## 2026-09-28 — PBQ deepen-3d (+4 LabHost; extends #11)

**Auditor / implementer:** Miyuki  
**Repo:** github.com/Zaevian/aplus-academy (branch `miyuki/pbq-deepen-3` @ prior tip 3a6b138)  
**Live:** https://aplus-academy-gules.vercel.app/

### Shipped
1. **Four new scored LabHost labs** (diverse domains; matching tickets with distractors):
   - `C1-D2-O7-WAN-LAB` → `NetworkTypesLab` (fiber / DSL / satellite / SAN)
   - `C1-D3-O7-MFD-LAB` → `MfdDeployLab` (ADF / secure print / print server / PostScript)
   - `C2-D2-O8-MOBSEC-LAB` → `MobileDeviceSecLab` (remote wipe / screen lock / MDM / encryption)
   - `C2-D4-O6-PRIVACY-LAB` → `PrivacyIncidentLab` (CoC / volatility / PII / AUP)
2. Lessons wired with lab blocks; labs/index + implemented + LabHost registered; coverage-states regenerated (Exam Ready **51→55**).

### Still empty pbqLabIds (skip FND)
C2-D1-O6/O7/O10/O11; C2-D2-O9/O11; C2-D4-O8/O9.

### Verdict
Four more high-weight PBQ gaps closed on #11. Curriculum still **not fully Exam Ready** end-to-end.

---
## 2026-09-28 — PBQ deepen-3c (+4 LabHost; extends #11)

**Auditor / implementer:** Miyuki  
**Repo:** github.com/Zaevian/aplus-academy (branch `miyuki/pbq-deepen-3` @ prior tip 9dc743f)  
**Live:** https://aplus-academy-gules.vercel.app/

### Shipped
1. **Four new scored LabHost labs** (diverse domains; matching tickets with distractors):
   - `C1-D2-O3-HOSTS-LAB` → `NetworkHostsLab` (AAA / UTM / NTP / SCADA)
   - `C1-D3-O6-PSU-LAB` → `PsuMatchLab` (wattage / modular / ATX24 / 12V rails)
   - `C2-D1-O2-BOOT-LAB` → `BootInstallLab` (clean / image / zero-touch / GPT)
   - `C2-D2-O7-HARDEN-LAB` → `WorkstationHardenLab` (harden / AutoRun / lockout / BIOS PW)
2. Lessons wired with lab blocks; labs/index + implemented + LabHost registered; coverage-states regenerated (Exam Ready **47→51**).

### Still empty pbqLabIds (skip FND)
C1-D2-O7; C1-D3-O7; C2-D1-O6/O7/O10/O11; C2-D2-O8/O9/O11; C2-D4-O6/O8/O9.

### Verdict
Four more high-weight PBQ gaps closed on #11. Curriculum still **not fully Exam Ready** end-to-end.

---
