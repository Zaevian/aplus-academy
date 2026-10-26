/**
 * Verified 2026-10-19 against CompTIA official pages and Exam Objectives Document
 * Version 4.0 PDFs (CompTIA CMP files last-modified 2025-11-25). V4.0 changes only
 * the accreditation wording and the acronym list versus V3.0; every objective
 * bullet, domain weight, and passing score is unchanged.
 */
export const EXAM_META = {
  version: "V15",
  series: "220-1200",
  launched: "2025-03-25",
  objectivesDocument: "Exam Objectives Document Version 4.0",
  lastVerified: "2026-10-19",
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
      "https://lecbyo.files.cmp.optimizely.com/download/34be017cb73211ef8985a6f347fbf652",
    core2Pdf:
      "https://lecbyo.files.cmp.optimizely.com/download/cefedfb2b8a511ef809306d06d323538",
  },
} as const;

export const INTERNAL_SCORING_DISCLAIMER =
  "Internal Readiness is this academy's own mastery measure. It is not CompTIA's 100–900 scaled score and does not predict an official exam result.";
