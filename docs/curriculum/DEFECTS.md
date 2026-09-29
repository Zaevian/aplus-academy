# Phase 1 confirmed defects

**PBQ deepen-3d (2026-09-28 ET):** branch `miyuki/pbq-deepen-3` (extends #11). Four new scored LabHost labs: C1-D2-O7 WAN/network types, C1-D3-O7 MFD deploy, C2-D2-O8 mobile device security, C2-D4-O6 privacy/incident. Regen coverage (Exam Ready 51→55). See audit-log.

**PBQ deepen-3c (2026-09-28 ET):** branch `miyuki/pbq-deepen-3` (extends #11). Four new scored LabHost labs: C1-D2-O3 hosts/appliances, C1-D3-O6 PSU, C2-D1-O2 boot/install, C2-D2-O7 workstation harden. Regen coverage (Exam Ready 47→51). See audit-log.

**PBQ deepen-3b (2026-09-28 ET):** branch `miyuki/pbq-deepen-3` (extends #11). Four new scored LabHost labs: C1-D1-O3 MDM/cellular, C1-D2-O8 tools, C2-D2-O3 wireless security, C2-D4-O5 environment/power. No C1-D1 holdout re-add. See audit-log.

**PBQ deepen-3 (2026-09-28 ET):** master @ 11a8c1a; branch `miyuki/pbq-deepen-3`. Added **C1-D1** to `HOLDOUT_DOMAIN_IDS` (Mobile holdout gap from #10). Four new scored LabHost labs (O2 accessories, O4 DNS/DHCP/VLAN/VPN, O1 OS types, O4 safety). See audit-log.

Tracked from Miyuki Core 1 Domains 1–5 and Core 2 Domains 1–4 audits, 2026-09-28.
Official authority: CompTIA A+ V15 / Exam Objectives Document Version 3.0 — no dumps.

| ID | Severity | Status | Summary | Primary paths |
|---|---|---|---|---|
| mastery-inflation | critical | **fixed** (this PR) | Any correct (including assisted retry after explanation) advanced easiness/interval; domain quiz always recorded perfect score + empty `missedConceptIds` | `src/lib/review.ts`, `src/lib/progress-actions.ts`, `src/components/lesson/knowledge-check.tsx`, `src/components/quiz/quiz-player.tsx`, `src/db/client.ts` |
| no-holdout-pool | high | **partial** (C1-D1…C2-D4) | Holdout split live for Mobile + Networking + Hardware + Virtualization/Cloud + Troubleshooting + OS + Security + Software-TS + Ops (`HOLDOUT_DOMAIN_IDS` now includes **C1-D1**) | `src/content/registry.ts`, domain quiz + practice pools |
| mock-empty-exposure | high | **fixed** (this PR) | Mock used `unseenFirst(pool, new Set(), 89)` | `src/app/exam/[core]/page.tsx`, `exposedQuestionIds` in `src/lib/progress-actions.ts` |
| core2-ports-pbq | high | **fixed** (this PR) | Same Ports PBQ for C1 and C2 mocks | `src/app/exam/[core]/page.tsx` |
| mock-no-domain-weight | medium | **fixed** (groundwork, this PR) | MCQ pick ignored `EXAM_META` domain percents | `src/lib/questions.ts` `domainWeightedSample`, exam page |
| mobile-zero-pbq | critical/high | **fixed** (O1/O2/O3) | C1-D1-O1 laptop; O2 accessories; O3 MDM/cellular lab + holdout → Exam Ready O1–O3 | `src/content/labs/index.ts`, `mobile-mdm-lab.tsx`, `registry.ts` |
| networking-uneven-pbq | medium | **partial** (O1 ports + O3 hosts + O4 services + O7 types + O8 tools) | O7 gained `C1-D2-O7-WAN-LAB`; remaining networking gaps closed for listed O's | `src/content/labs/index.ts`, `network-types-lab.tsx` |
| weak-rationales | medium | open | Hundreds of distractor rationales &lt;25 chars (D1 + D2) | `src/content/questions/c1/d1.ts`, `src/content/questions/c1/d2.ts` |
| missing-misconception-tags | medium | open | Near-zero `tags[]` on Mobile/Networking banks | question banks under `src/content/questions/` |
| diagram-simple-fallback | high | open | Mobile flagship diagrams are text fallbacks | `src/components/diagrams/` |
| thin-vendor-sources | medium | open | Mobile lessons cite only generic CompTIA sources | `src/content/lessons/c1/d1.ts`, `src/content/sources.ts` |
| hardware-uneven-pbq | medium | **partial** (O1 display + O6 PSU + O7 MFD) | C1-D3 O7 gained `C1-D3-O7-MFD-LAB`; O1/O2/O3/O4/O5/O6/O7/O8 have LabHost labs | `src/content/labs/index.ts`, `mfd-deploy-lab.tsx` |
| hardware-display-simple | high | **fixed** (this PR) | `DisplayCompareDiagram` was SIMPLE text fallback | `src/components/diagrams/registry.tsx` |
| hardware-weak-rationales | medium | **partial** (~18 Qs this PR) | Hundreds of D3 distractor rationales still &lt;25 chars; sample batch + misconception tags shipped | `src/content/questions/c1/d3.ts` |
| domain-hard-lock-preview | medium | **fixed** (preview this PR) | Locked domain pages showed only gate text — no syllabus counts; soft read-only preview added; hard gate preserved | `src/components/course/domain-gate.tsx` |
| labs-no-filter | low | **fixed** (this PR) | Labs catalog had no search/kind filter | `src/app/labs/page.tsx` |
| software-ts-uneven-pbq | medium | **partial** (O2 mobile + O3 compromise labs) | C2-D3 O3 has CompromisedPhoneLab; O1 reuses Win tools; O4 only shift | `src/content/labs/index.ts`, `compromised-phone-lab.tsx` |
| software-ts-phone-settings-simple | high | **fixed** (this PR) | `PhoneSettingsDiagram` was SIMPLE text fallback used by O2/O3 lessons | `src/components/diagrams/registry.tsx` |
| software-ts-weak-rationales | medium | **partial** (~10 O2 Qs this PR) | Hundreds of C2-D3 distractor rationales still &lt;25 chars; sample batch + misconception tags shipped | `src/content/questions/c2/d3.ts` |

| virtualization-zero-pbq | critical/high | **partial** (O1 hypervisor + O2 cloud) | C1-D4 O1 has HypervisorMatchLab; O2 has CloudServiceLab | `src/content/labs/index.ts`, `hypervisor-match-lab.tsx`, `cloud-service-lab.tsx` |
| virtualization-diagram-thin | medium | **fixed** (this PR) | HypervisorDiagram / CloudModelsDiagram were thin vs lesson captions; upgraded stack + container contrast | `src/components/diagrams/registry.tsx` |
| virtualization-weak-rationales | medium | **partial** (~13 Qs this PR) | Many D4 distractor rationales still &lt;25 chars; sample batch + tags shipped | `src/content/questions/c1/d4.ts` |
| troubleshooting-o3-zero-pbq | critical/high | **fixed** (≥1 lab, this PR) | C1-D5-O3 had 0 `pbqLabIds`; added DisplayFaultLab | `src/content/labs/index.ts`, `src/components/labs/display-fault-lab.tsx`, `src/components/labs/lab-host.tsx` |
| troubleshooting-o4-zero-pbq | high | **fixed** (mobile HW lab this PR) | C1-D5-O4 scored `MobileHardwareTsLab`; catalog `device-inspect` still a soft gap vs interactive inspect UI | `src/content/labs/index.ts`, `mobile-hardware-ts-lab.tsx` |
| troubleshooting-display-simple | high | **fixed** (this PR) | `DisplayFaultDiagram` was SIMPLE text fallback | `src/components/diagrams/registry.tsx` |
| troubleshooting-weak-rationales | medium | **partial** (~11 Qs this PR) | Hundreds of D5 distractor rationales still &lt;25 chars; O3 sample + misconception tags shipped | `src/content/questions/c1/d5.ts` |
| os-uneven-pbq | medium | **partial** (O1 OS types + O2 boot/install + O3 edition) | C2-D1 O6/O7/O10/O11 still lack scored PBQs; O1/O2/O3/O4/O5/O8/O9 have LabHost labs | `src/content/labs/index.ts`, `boot-install-lab.tsx` |
| os-matrix-simple | high | **fixed** (this PR) | `OsMatrixDiagram` was SIMPLE text fallback | `src/components/diagrams/registry.tsx` |
| os-edition-matrix-simple | medium | open | `EditionMatrixDiagram` still SIMPLE (lesson table covers features) | `src/components/diagrams/registry.tsx` |
| os-weak-rationales | medium | **partial** (~10 Qs this PR) | Hundreds of C2-D1 distractor rationales still &lt;25 chars; sample batch + misconception tags shipped | `src/content/questions/c2/d1.ts` |
| security-uneven-pbq | medium | **partial** (O1 AUTH + O3 Wi-Fi sec + O7 harden + O8 mobsec) | C2-D2 O9/O11 still lack dedicated scored PBQs; O1–O8/O10 covered | `src/content/labs/index.ts`, `mobile-device-sec-lab.tsx` |
| security-permission-simple | high | **fixed** (this PR) | `PermissionDiagram` was SIMPLE text fallback | `src/components/diagrams/registry.tsx` |
| security-weak-rationales | medium | **partial** (~10 O1 Qs this PR) | Hundreds of C2-D2 distractor rationales still &lt;25 chars; sample batch + misconception tags shipped | `src/content/questions/c2/d2.ts` |

| ops-uneven-pbq | medium | **partial** (O2 change + O4 safety + O5 env + O6 privacy) | C2-D4 O8/O9 still lack scored PBQs; O1–O7 have LabHost labs; O10 only shared shift | `src/content/labs/index.ts`, `privacy-incident-lab.tsx` |
| ops-weak-rationales | medium | **partial** (~11 O2 Qs this PR) | Hundreds of D4 distractor rationales still &lt;25 chars; sample change-management batch + misconception tags shipped | `src/content/questions/c2/d4.ts` |
| ops-o4-o9-lab-gap | medium | **partial** (O4 safety lab) | `safe-bench` covered by SafetyProceduresLab; `it-room` / `evidence-timeline` / `script-viewer` / `remote-chooser` still unmet | `src/content/catalog.ts`, `safety-procedures-lab.tsx` |

| coverage-states-map | medium | **fixed** (this PR) | No machine-readable educational states; `verified` overstated Exam Ready | `docs/curriculum/coverage-states.json`, `src/content/coverage-states.ts`, `scripts/write-coverage.ts` |
| pbq-deepen-batch | medium | **partial** (+4 labs deepen-3d) | Closed C1-D2-O7, C1-D3-O7, C2-D2-O8, C2-D4-O6; remain C2-D1-O6/O7/O10/O11, C2-D2-O9/O11, C2-D4-O8/O9 | `src/content/labs/index.ts` |

## Educational state notes (quick)

- **Assisted correct:** explanation already shown for the current item before a successful check. Records the attempt with `assisted: true`; does **not** increment mastery `correct` or advance easiness/interval. Original `incorrect` from the miss is preserved.
- **Domain gate vs recorded score:** learner must eventually answer correctly to unlock the next domain; `recordQuiz` may set `passed: true` for the gate while `score` reflects first-attempt outcomes only.
- **Exposure:** attempt `questionId`s plus prior quiz `questionIds` feed mock/quiz unseen preference.
