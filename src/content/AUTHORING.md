# Curriculum authoring contract

You overwrite ONE lesson file and ONE question file for your assigned domain. Do not leave empty arrays. Do not write placeholders, TODO, lorem, or "add later."

## Files

Lessons live at `src/content/lessons/c1/dN.ts` or `src/content/lessons/c2/dN.ts`.
Questions live at `src/content/questions/c1/dN.ts` or `src/content/questions/c2/dN.ts`.

Read `src/content/schema.ts`, `src/content/catalog.ts`, `src/content/question-factory.ts`, and `src/content/lessons/foundation.ts` first. Match that quality.

## Lesson module shape

```ts
import type { Lesson } from "../../schema";
export const C1_D1_LESSONS: Lesson[] = [ /* ... */ ];
```

Use the exact export name already in the stub (`C1_D1_LESSONS`, `C2_D2_LESSONS`, etc.).

## Question module shape

```ts
import { q } from "../../question-factory";
import type { Question } from "../../schema";
export const C1_D1_QUESTIONS: Question[] = [ q({...}), ... ];
```

`q()` validates. If parse would throw, fix the item.

## Required density

- At least **one full lesson per numbered objective**. Complex objectives (RAID, motherboard, ports, Windows tools/CLI, malware, backups, AI) need **2–3 lessons**.
- Each lesson: `blocks.length >= 6`.
- Typical order: why-callout, reading (>= 250 words), diagram, knowledge-check, reading, table or lab, knowledge-check, exam-lens and/or technician-lens and/or common-mistake, summary.
- Last lesson of each objective ends with a `checkpoint` block of 6–10 question IDs from that objective.
- `conceptIds` must be taken from `catalog.ts` for that objective (the `OBJ-CONCEPT` strings already listed).
- `sources` must be real ids from `src/content/sources.ts` (or `c1-obj-3.0` / `c2-obj-3.0`).
- `lastVerified`: `"2026-09-01"`.
- Instructional markdown is a real technical-textbook voice for an intelligent beginner. Define acronyms on first use.

## Questions

- Minimum **28 original items per numbered objective** (36+ for RAID, ports, Windows CLI, malware, backups).
- Mix: scenario, terminology, misconception, troubleshooting FIRST/NEXT/BEST, a few multi-select (`type: "multi"`, `correct: ["a","c"]`).
- Four choices unless multi-select (then 4–5).
- Every choice has a specific `rationale`.
- IDs: `{conceptId}-Q{nnn}` e.g. `C1-D3-O4-RAID1-Q003`.
- `validationStatus` is set by `q()` to verified.
- `sourceBasis`: `"c1-obj-3.0"` or `"c2-obj-3.0"` plus other source ids when you cite Microsoft/Apple/NIST.
- Never copy live exam items or dumps. Never trivia copied from the sentence above the check.

## Diagram `component` names (use these exact strings)

ExamMapDiagram, LearningCycleDiagram, StemDecoderDiagram, TsMethodDiagram, UnitsDiagram, LaptopExplodedDiagram, DimmVsSodimmDiagram, ConnectorGallery, PhoneSettingsDiagram, PacketFlowDiagram, TcpUdpDiagram, SpectrumDiagram, DnsFlowDiagram, DhcpPoolDiagram, VlanDiagram, NetworkRackDiagram, Ipv4Diagram, DisplayCompareDiagram, T568Diagram, RaidArrayDiagram, MotherboardDiagram, PsuRailsDiagram, LaserPrinterDiagram, HypervisorDiagram, CloudModelsDiagram, DisplayFaultDiagram, PrinterOutputDiagram, OsMatrixDiagram, PermissionDiagram, MalwareStepsDiagram, BackupChainDiagram, AiPolicyDiagram, WifiHeatDiagram, PortMapDiagram, EditionMatrixDiagram.

Labs via `type: "lab"` and labId from `src/content/labs/index.ts` when relevant (RAID, motherboard, cables, router, CLI, malware, tickets, backup, voice, landscape).

## SEE clips

LEARN → SEE → INTERACT → CHECK. Technical labels are HTML/SVG. Do not treat generated video text as a pinout, RAID rule, port, or malware step.

- Prefer `type: "diagram"` with a named animated component in `see-clips.tsx`.
- Optional `type: "video"` with `assetId` recorded in `src/content/media-manifest.json`. If `public/media/<id>.mp4` is missing, the player shows the fallback diagram + transcript — never a broken box.
- Imagine only for physical seating (hands, straps, plugs). Overlay labels in HTML. `verified: false` until a human checks the frame.
- Do not Imagine: UEFI, Task Manager, TCP flags, Event Viewer, CPU guts, Wi-Fi heatmaps, the 10-step malware reorder, talking-head helpdesk.
- Do not replace LabHost with a clip. Watching is not a knowledge-check gate.
- `showTranscripts` in settings shows or collapses clip transcripts.

## Domain-specific must-teach notes

Follow official V15 numbering (not older blogs):

- RAID includes **0, 1, 5, 6, 10**. RAID is not a backup.
- Ports: 20/21, 22, 23, 25, 53, 67/68, 80, 110, 143, 137-139, 389, 443, 445, 3389 only as the official 2.1 list.
- Wireless includes **6 GHz**.
- Core 2 2.7 workstation harden, 2.8 mobile, 2.9 destruction, 2.10 SOHO, 2.11 browser.
- Malware removal is the **10-step** SOHO sequence including disable/enable System Restore on Windows Home.
- AI is **4.10**.
- Do not teach the six-step troubleshooting method as a scored V15 objective; Core 1 domain 5 is symptoms/actions.

When the file is complete, it must typecheck as part of `pnpm exec tsc --noEmit`.
