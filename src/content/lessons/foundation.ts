import type { Lesson } from "../schema";

export const FOUNDATION_LESSONS: Lesson[] = [
  {
    id: "FND-D0-O1-L1",
    objectiveId: "FND-D0-O1",
    slug: "what-a-plus-is",
    title: "What CompTIA A+ actually certifies",
    description:
      "Core 1 versus Core 2, how objectives are weighted, and why this academy never promises a pass.",
    estimatedMinutes: 18,
    conceptIds: ["FND-D0-O1-CERT", "FND-D0-O1-CORES", "FND-D0-O1-SCORES"],
    prerequisites: [],
    lastVerified: "2026-09-01",
    sources: ["comptia-a-v15", "c1-obj-3.0", "c2-obj-3.0"],
    blocks: [
      {
        type: "callout",
        id: "FND-D0-O1-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "If you do not know what the two exams measure, you will study the wrong things at the wrong depth. A+ is an entry-level support credential, not a networking engineering license and not a guarantee of employment.",
        },
      },
      {
        type: "reading",
        id: "FND-D0-O1-L1-r1",
        title: "Two exams, one certification",
        markdown: `CompTIA A+ is awarded only after you pass **two** exams from the same version. The current version is **V15**:

- **Core 1 (220-1201)** — hardware, mobile devices, networking, virtualization/cloud, and hardware/network troubleshooting.
- **Core 2 (220-1202)** — operating systems, security, software troubleshooting, and operational procedures.

You cannot mix a V14 Core 1 with a V15 Core 2. Employers and CompTIA treat the pair as one credential.

Each exam allows a **maximum of 90 questions** in **90 minutes**. Question formats include single-answer multiple choice, multiple-response, drag-and-drop, and performance-based questions (PBQs). CompTIA's passing scores are **675** (Core 1) and **700** (Core 2) on a **100–900** scale.

This academy **does not** translate those scaled scores into a fake percentage, and it **does not** claim you will pass. What it does is teach, force you to interact, and assess every current objective deeply enough that this can be your primary study resource.

Core 1 domain weights (official): Mobile Devices 13%, Networking 23%, Hardware 25%, Virtualization and Cloud 11%, Hardware and Network Troubleshooting 28%.

Core 2 domain weights (official): Operating Systems 28%, Security 28%, Software Troubleshooting 23%, Operational Procedures 21%.

Troubleshooting is the largest Core 1 domain. Security and operating systems share the largest Core 2 slices. Study time should follow those weights, not your comfort zone.`,
      },
      {
        type: "diagram",
        id: "FND-D0-O1-L1-d1",
        component: "ExamMapDiagram",
        title: "A+ V15 exam map",
        caption: "Two exams, nine scored domains, one credential.",
        notice:
          "Notice that troubleshooting is 28% of Core 1 — larger than hardware itself. Notice that Core 2 is not 'the easy Windows exam'; security is 28%.",
        alt: "Two columns labeled Core 1 220-1201 and Core 2 220-1202 with official domain percentages.",
      },
      {
        type: "knowledge-check",
        id: "FND-D0-O1-L1-kc1",
        questionIds: ["FND-D0-O1-CERT-Q001"],
      },
      {
        type: "reading",
        id: "FND-D0-O1-L1-r2",
        title: "Internal readiness is not a CompTIA score",
        markdown: `When this application shows **Internal Readiness: 82%**, that number is owned by this academy. It combines objective mastery, recent unseen-question performance, spaced-review retention, lab completion, and mock history.

It is **not** CompTIA's 100–900 scale. A 675 on Core 1 is not "67.5%." Do not invent a conversion. If someone online says "you need 85% to pass," they are guessing.

Treat mocks here as practice under time pressure, not as a psychic reading of exam day.

The other trap is the opposite: treating A+ as trivia. The credential exists because a help-desk tech must install hardware, join a workstation to a network, recognize malware symptoms, and talk to a human who is late for a meeting. If you can only recite port numbers, you are not ready.`,
      },
      {
        type: "callout",
        id: "FND-D0-O1-L1-exam",
        callout: {
          kind: "exam",
          title: "Exam lens",
          body: "You will not be asked CompTIA's passing score as trivia on the real exam. You will be asked to act like someone who already knows Core 1 and Core 2 are different jobs.",
        },
      },
      {
        type: "knowledge-check",
        id: "FND-D0-O1-L1-kc2",
        questionIds: ["FND-D0-O1-SCORES-Q001"],
      },
      {
        type: "summary",
        id: "FND-D0-O1-L1-sum",
        bullets: [
          "A+ V15 = 220-1201 + 220-1202 from the same version.",
          "90 questions / 90 minutes each; MCQ and PBQ.",
          "Official pass marks are 675 and 700 on a 100–900 scale — not a percentage.",
          "This app reports Internal Readiness only.",
        ],
      },
    ],
  },
  {
    id: "FND-D0-O2-L1",
    objectiveId: "FND-D0-O2",
    slug: "how-the-academy-works",
    title: "How this academy forces you to learn",
    description:
      "Mandatory checks, 100% domain gates, spaced review, and guest progress that actually saves.",
    estimatedMinutes: 16,
    conceptIds: ["FND-D0-O2-CYCLE", "FND-D0-O2-GATES", "FND-D0-O2-REVIEW"],
    prerequisites: ["FND-D0-O1-L1"],
    lastVerified: "2026-09-01",
    sources: ["comptia-a-v15"],
    blocks: [
      {
        type: "callout",
        id: "FND-D0-O2-L1-why",
        callout: {
          kind: "why",
          title: "Why this matters",
          body: "Passive video bingeing produces familiarity, not retrieval. This course blocks the next paragraph until you prove the last one.",
        },
      },
      {
        type: "reading",
        id: "FND-D0-O2-L1-r1",
        title: "The learning cycle",
        markdown: `Every substantive lesson uses the same cycle:

**Learn → see → interact → check → apply → review → test.**

After a reading block you will meet a **knowledge check** (1–3 multiple-choice items). You must answer correctly to unlock the next block. Wrong answers never say only "Incorrect." They explain why your choice fails, why the key is right, and why the other distractors were tempting.

After an objective you take a **checkpoint** (about 5–10 fresh items). After a domain you take a **mastery quiz** (10–15 items). The domain quiz is a **100% gate**. If you miss three items, those concepts go to the Review Queue, you get targeted review, and you sit a new attempt. Prior scores are kept; they are not overwritten.

This is intentional friction. The real exams will not let you flip back to the paragraph above the question.`,
      },
      {
        type: "diagram",
        id: "FND-D0-O2-L1-d1",
        component: "LearningCycleDiagram",
        title: "Gating model",
        caption: "Blocks gate lessons, checkpoints gate objectives, 100% quizzes gate domains.",
        notice:
          "Notice that a diagnostic does not skip curriculum. It only paints strengths and weaknesses on the coverage map.",
        alt: "Flowchart of reading, check, checkpoint, domain quiz, and review queue.",
      },
      {
        type: "knowledge-check",
        id: "FND-D0-O2-L1-kc1",
        questionIds: ["FND-D0-O2-GATES-Q001"],
      },
      {
        type: "reading",
        id: "FND-D0-O2-L1-r2",
        title: "Progress, guest mode, and review",
        markdown: `You can study as a **guest**. Progress lives in this browser (IndexedDB) and saves after meaningful actions: finishing a block, submitting a quiz, completing a lab. If you later sign in, local and cloud progress **merge**; the app will not silently destroy the longer history.

The **Review Queue** uses spaced retrieval. Missed or shaky concepts return the same session, then roughly the next day, then 3, 7, 14, and 30 days, adjusted by how you perform. Reviews are interleaved so you must distinguish RAID from backup, not answer ten RAID items in a row.

Optional **study sessions** (15/30/45/60 minutes) pull due reviews, the current lesson, a weak concept, and one interaction. **Cram mode** is a final-week drill. It is not a substitute for the gated course.

Search will not reveal locked assessment answers. Glossary hover/tap is always available for acronyms after their first expansion.`,
      },
      {
        type: "lab",
        id: "FND-D0-O2-L1-lab",
        labId: "FND-D0-O5-LANDSCAPE-LAB",
        title: "Preview: IT landscape",
        prompt:
          "Open the landscape lab and click every hotspot once so later lessons have somewhere to hang.",
      },
      {
        type: "knowledge-check",
        id: "FND-D0-O2-L1-kc2",
        questionIds: ["FND-D0-O2-REVIEW-Q001"],
      },
      {
        type: "summary",
        id: "FND-D0-O2-L1-sum",
        bullets: [
          "Required MC checks after reading blocks; you must be correct to continue.",
          "Domain mastery quizzes are 100% gates with new items on retake.",
          "Guest progress saves locally; sign-in merges rather than overwrites.",
          "Spaced review is interleaved on purpose.",
        ],
      },
    ],
  },
  {
    id: "FND-D0-O3-L1",
    objectiveId: "FND-D0-O3",
    slug: "exam-language",
    title: "BEST, FIRST, NEXT, and PBQs",
    description:
      "How CompTIA-style stems work and how performance-based labs differ from multiple choice.",
    estimatedMinutes: 16,
    conceptIds: ["FND-D0-O3-STEMS", "FND-D0-O3-PBQ"],
    prerequisites: ["FND-D0-O2-L1"],
    lastVerified: "2026-09-01",
    sources: ["comptia-a-v15", "c1-obj-3.0"],
    blocks: [
      {
        type: "reading",
        id: "FND-D0-O3-L1-r1",
        title: "The stem is doing work",
        markdown: `A+ items often hide the real task in one capitalized word.

- **BEST** — more than one option might work. Pick the most complete, most policy-aligned, or most professional.
- **FIRST** — sequence matters. Gathering information, isolating, or making the area safe often beats swapping parts.
- **NEXT** — you already did something. Do not restart the whole methodology.
- **MOST likely / MOST appropriate** — probability and context, not a unique physical law.

Distractors on a well-written item are things a rushed technician might actually do. If one option is "format the disk" and the stem is a faded print job, the writer failed. If three options are plausible and only one is FIRST, the writer succeeded.

This academy writes items that way on purpose. Memorizing the sentence above the question will not help, because the check is not a copy of that sentence.`,
      },
      {
        type: "diagram",
        id: "FND-D0-O3-L1-d1",
        component: "StemDecoderDiagram",
        title: "Decode the stem",
        caption: "Same printer symptom, four different questions.",
        notice:
          "Notice FIRST is about order, BEST is about quality of the action, and a PBQ would make you configure the queue instead of talking about it.",
        alt: "Four exam stems sharing a printer scenario with BEST FIRST NEXT and PBQ labels.",
      },
      {
        type: "knowledge-check",
        id: "FND-D0-O3-L1-kc1",
        questionIds: ["FND-D0-O3-STEMS-Q001"],
      },
      {
        type: "reading",
        id: "FND-D0-O3-L1-r2",
        title: "PBQs are skills, not clones",
        markdown: `**Performance-based questions** put you in a small simulated environment: a command prompt, a router page, a drag-and-drop topology, an ordered list.

This academy does **not** clone CompTIA's proprietary PBQs. It trains the same underlying skills with original labs: build RAID, terminate T568B, isolate a DNS failure, reorder malware-removal steps, harden a SOHO router.

When a lab completes, it explains the solution. Use that explanation. Then do the lab again later from the Labs section after it unlocks.

PBQs eat clock time on the real exam. Practice doing them calmly, then flag remaining MCQs. Do not burn ten minutes decorating a diagram you already solved.`,
      },
      {
        type: "knowledge-check",
        id: "FND-D0-O3-L1-kc2",
        questionIds: ["FND-D0-O3-PBQ-Q001"],
      },
      {
        type: "callout",
        id: "FND-D0-O3-L1-tech",
        callout: {
          kind: "technician",
          title: "Technician lens",
          body: "Tickets in the real world are also BEST/FIRST questions. 'What should I do FIRST?' is how you avoid replacing a motherboard because the display cable was loose.",
        },
      },
      {
        type: "summary",
        id: "FND-D0-O3-L1-sum",
        bullets: [
          "BEST ≠ the only action that works.",
          "FIRST usually means isolate or make safe, not rebuild.",
          "PBQs here are original skill labs, not exam clones.",
          "Understanding beats matching the previous paragraph.",
        ],
      },
    ],
  },
  {
    id: "FND-D0-O4-L1",
    objectiveId: "FND-D0-O4",
    slug: "troubleshooting-mindset",
    title: "A troubleshooting mindset (job practice, not a scored V15 objective)",
    description:
      "A six-step method technicians still use. V15 does not test the methodology as its own objective.",
    estimatedMinutes: 18,
    conceptIds: ["FND-D0-O4-TS-METHOD", "FND-D0-O4-DOCUMENT"],
    prerequisites: ["FND-D0-O3-L1"],
    lastVerified: "2026-09-01",
    sources: ["c1-obj-3.0"],
    blocks: [
      {
        type: "callout",
        id: "FND-D0-O4-L1-exam",
        callout: {
          kind: "exam",
          title: "Honest exam note",
          body: "During the V15 job-task analysis, CompTIA SMEs kept troubleshooting as a huge slice of Core 1 but removed the six-step methodology as a formal objective. We still teach it because it is how you avoid random part-swapping. Do not expect a question that only asks you to recite the six steps in order.",
        },
      },
      {
        type: "reading",
        id: "FND-D0-O4-L1-r1",
        title: "The method, as practice",
        markdown: `A usable sequence:

1. **Identify the problem.** Who, what, when, how many users, what changed, can you reproduce it. Look at the ticket. Ask. Do not skip to a theory because the last PC you saw had a bad PSU.
2. **Establish a theory of probable cause.** Question the obvious: cable, power, user error, last change. Research a knowledge base if you are stuck.
3. **Test the theory.** One change at a time. If the theory is wrong, make a new one. Do not test by reimaging first unless the evidence already says malware or corruption.
4. **Plan and implement.** Consider downtime, backups, and change control on production systems.
5. **Verify full functionality** and add prevention (cable management, monitoring, user education) when it applies.
6. **Document.** What you found, what you did, what you'd do next time.

The method fails when people reverse it: implement first, document never, identify never.`,
      },
      {
        type: "diagram",
        id: "FND-D0-O4-L1-d1",
        component: "TsMethodDiagram",
        title: "Troubleshooting loop",
        caption: "If the theory fails, you do not skip to 'replace motherboard.' You return to a new theory.",
        notice: "Notice documentation is last in the method but should be happening in the ticket the entire time.",
        alt: "Loop diagram of identify, theory, test, plan, verify, document.",
      },
      {
        type: "knowledge-check",
        id: "FND-D0-O4-L1-kc1",
        questionIds: ["FND-D0-O4-TS-METHOD-Q001"],
      },
      {
        type: "reading",
        id: "FND-D0-O4-L1-r2",
        title: "Documentation is part of the fix",
        markdown: `A closed ticket that says "fixed PC" trains nobody and helps no auditor.

Write:

- the symptom in the user's words and in technical words
- the last change (update, move, new phone, new AP)
- tests you ran and their results
- the action that actually resolved it
- follow-up (replace failing disk Friday, user educated on USB copies of PHI)

This academy's ticketing lab will refuse to let you close "PC broken." That is not pedantry. That is the job.`,
      },
      {
        type: "knowledge-check",
        id: "FND-D0-O4-L1-kc2",
        questionIds: ["FND-D0-O4-DOCUMENT-Q001"],
      },
      {
        type: "summary",
        id: "FND-D0-O4-L1-sum",
        bullets: [
          "Use a method; do not reciting-order-memorize for V15.",
          "Test theories with the smallest change that could disprove them.",
          "Documentation is how the next technician does not start from zero.",
        ],
      },
    ],
  },
  {
    id: "FND-D0-O5-L1",
    objectiveId: "FND-D0-O5",
    slug: "safety-units-landscape",
    title: "Safety, units, and the IT landscape",
    description:
      "ESD and lifting, bits versus bytes, and a clickable map of the systems you will study.",
    estimatedMinutes: 20,
    conceptIds: ["FND-D0-O5-SAFETY", "FND-D0-O5-UNITS", "FND-D0-O5-TICKETS"],
    prerequisites: ["FND-D0-O4-L1"],
    lastVerified: "2026-09-01",
    sources: ["c2-obj-3.0", "usb-if"],
    blocks: [
      {
        type: "reading",
        id: "FND-D0-O5-L1-r1",
        title: "Do not become the incident",
        markdown: `Before Core 1 asks you to replace SODIMM, Core 2 will ask you to keep yourself and the hardware alive.

**Electrostatic discharge (ESD)** is a tiny spark from you into a chip. You may not feel it. The board may fail later, which is worse than a clean death. Use a wrist strap clipped to the chassis (not painted metal, not the ESD mat's banana jack only), handle cards by the edges, and park components in antistatic bags — not on a foam sofa.

**Disconnect power** before you go inside a PSU or CRT-era analog territory; even modern PSUs can hold a charge. **Lift with legs**, not with a hero story. **PPE** for toner and dust is not theatrical; toner is a fine particle.

You will get a full safety domain in Core 2. The rule now: if the landscape lab PC is open, the bench must already be safe.`,
      },
      {
        type: "diagram",
        id: "FND-D0-O5-L1-d1",
        component: "UnitsDiagram",
        title: "Bits, bytes, and bandwidth",
        caption: "Storage vendors often advertise decimal GB; RAM and OS tools often count binary GiB. Bandwidth is bits per second.",
        notice:
          "Notice a 1 Gbps NIC is 1,000,000,000 bits per second, not bytes. Dividing by 8 is how you talk about file-copy speed honestly.",
        alt: "Table relating bit, byte, KB/KiB, MB/MiB, GB/GiB and bps versus B/s.",
      },
      {
        type: "knowledge-check",
        id: "FND-D0-O5-L1-kc1",
        questionIds: ["FND-D0-O5-UNITS-Q001"],
      },
      {
        type: "reading",
        id: "FND-D0-O5-L1-r2",
        title: "The landscape you will inhabit",
        markdown: `Click through the lab:

- **Desktop PC** — CPU, RAM, storage, PSU, expansion. Core 1 hardware lives here.
- **Laptop** — the same ideas with SODIMM, batteries, and antennas in the bezel.
- **Network closet** — modem/ONT, router, switch, patch panel, AP. Packets do not "go to Wi-Fi" as a mystical cloud; they hit a radio attached to a LAN.
- **Printer** — a networked computer that eats paper and has its own firmware.
- **Phone** — MDM, eSIM, radios, and a battery that can swell.
- **Cloud** — someone else's computer, metered, with a shared-responsibility story you will learn in 4.2.

Keep this map in your head. When a later lesson says "default gateway," you should be able to point at the router in the closet, not at a vague feeling.`,
      },
      {
        type: "lab",
        id: "FND-D0-O5-L1-lab",
        labId: "FND-D0-O5-LANDSCAPE-LAB",
        title: "IT landscape hotspots",
        prompt: "Open every hotspot. You cannot finish Foundation until you have.",
      },
      {
        type: "knowledge-check",
        id: "FND-D0-O5-L1-kc2",
        questionIds: ["FND-D0-O5-SAFETY-Q001"],
      },
      {
        type: "checkpoint",
        id: "FND-D0-O5-L1-cp",
        questionIds: [
          "FND-D0-O1-CERT-Q002",
          "FND-D0-O1-CORES-Q001",
          "FND-D0-O2-GATES-Q002",
          "FND-D0-O3-STEMS-Q002",
          "FND-D0-O4-TS-METHOD-Q002",
          "FND-D0-O5-UNITS-Q002",
        ],
      },
      {
        type: "summary",
        id: "FND-D0-O5-L1-sum",
        bullets: [
          "ESD control and power-off are not optional theater.",
          "Bits vs bytes vs binary prefixes will follow you into storage and networks.",
          "The landscape lab is the visual index for the rest of A+.",
        ],
      },
    ],
  },
];
