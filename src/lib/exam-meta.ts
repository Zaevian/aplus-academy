/** Verified 2026-09-01 against CompTIA official pages and Exam Objectives v3.0 PDFs. */
export const EXAM_META = {
  version: "V15",
  series: "220-1200",
  launched: "2025-03-25",
  objectivesDocument: "Exam Objectives Document Version 3.0",
  lastVerified: "2026-09-01",
  core1: {
    code: "220-1201",
    name: "Core 1",
    maxQuestions: 90,
    minutes: 90,
    comptiaPassingScore: 675,
    scale: "100-900",
    questionTypes: ["multiple-choice", "multiple-response", "performance-based"],
    domains: [
      { number: 1, title: "Mobile Devices", percent: 13 },
      { number: 2, title: "Networking", percent: 23 },
      { number: 3, title: "Hardware", percent: 25 },
      { number: 4, title: "Virtualization and Cloud Computing", percent: 11 },
      { number: 5, title: "Hardware and Network Troubleshooting", percent: 28 },
    ],
  },
  core2: {
    code: "220-1202",
    name: "Core 2",
    maxQuestions: 90,
    minutes: 90,
    comptiaPassingScore: 700,
    scale: "100-900",
    questionTypes: ["multiple-choice", "multiple-response", "performance-based"],
    domains: [
      { number: 1, title: "Operating Systems", percent: 28 },
      { number: 2, title: "Security", percent: 28 },
      { number: 3, title: "Software Troubleshooting", percent: 23 },
      { number: 4, title: "Operational Procedures", percent: 21 },
    ],
  },
  officialUrls: {
    product:
      "https://www.comptia.org/en-us/certifications/a/core-1-and-2-v15/",
    core1Pdf:
      "https://assets.ctfassets.net/82ripq7fjls2/1oSdlyujpaX3GrM0rir6Ge/91afb2be72785281e8fb4c0d9a70c6f4/CompTIA-A-220-1201-Exam-Objectives-3.0.pdf",
    core2Pdf:
      "https://assets.ctfassets.net/82ripq7fjls2/6I8WL66IBa1AUovioDGrnM/f74a7eca336fd4e4c8e723a1f893086d/CompTIA-A-220-1202-Exam-Objectives-3.0.pdf",
  },
} as const;

export const INTERNAL_SCORING_DISCLAIMER =
  "Internal Readiness is this academy's own mastery measure. It is not CompTIA's 100–900 scaled score and does not predict an official exam result.";
