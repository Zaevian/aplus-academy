import Dexie, { type EntityTable } from "dexie";

export type ExperienceLevel = "new" | "some" | "experienced";

export type LearnerProfile = {
  id: string;
  displayName: string;
  experience: ExperienceLevel;
  createdAt: number;
  onboardingComplete: boolean;
  diagnosticOffered: boolean;
  diagnosticComplete: boolean;
  cloudUserId?: string;
};

export type Bookmark = {
  id: string;
  targetType: "lesson" | "block" | "lab" | "objective";
  targetId: string;
  label: string;
  createdAt: number;
};

export type Note = {
  id: string;
  targetType: "lesson" | "block" | "lab" | "objective";
  targetId: string;
  body: string;
  createdAt: number;
  updatedAt: number;
};

export type ProgressSnapshot = {
  id: "local";
  currentLocation: string;
  completedBlocks: string[];
  completedLessons: string[];
  completedObjectives: string[];
  completedDomains: string[];
  completedLabs: string[];
  unlockedDomainIds: string[];
  streakDays: number;
  lastStudyDay: string | null;
  totalMs: number;
  sessionStartedAt: number | null;
  updatedAt: number;
};

export type QuestionAttempt = {
  id: string;
  questionId: string;
  selected: string[];
  correct: boolean;
  at: number;
  context:
    | "block"
    | "checkpoint"
    | "domain-quiz"
    | "review"
    | "practice"
    | "mock"
    | "core-review"
    | "diagnostic";
};

export type QuizAttempt = {
  id: string;
  kind: "domain" | "checkpoint" | "core-review" | "mock" | "diagnostic";
  targetId: string;
  score: number;
  total: number;
  passed: boolean;
  missedConceptIds: string[];
  questionIds: string[];
  at: number;
};

export type MasteryRow = {
  id: string;
  kind: "concept" | "objective" | "domain";
  correct: number;
  incorrect: number;
  easiness: number;
  intervalDays: number;
  dueAt: number;
  lastAt: number;
  exposure: number;
};

export type SettingsRow = {
  id: "local";
  theme: "system" | "light" | "dark";
  reducedMotion: boolean;
  showTranscripts: boolean;
  autoPlayAudio: boolean;
};

export type StudySession = {
  id: string;
  startedAt: number;
  endedAt: number | null;
  minutesPlanned: 15 | 30 | 45 | 60 | null;
  focus: string;
};

const INITIAL_UNLOCKS = ["FND-D0", "C1-D1", "C2-D1"];

export const initialProgress = (): ProgressSnapshot => ({
  id: "local",
  currentLocation: "/start",
  completedBlocks: [],
  completedLessons: [],
  completedObjectives: [],
  completedDomains: [],
  completedLabs: [],
  unlockedDomainIds: [...INITIAL_UNLOCKS],
  streakDays: 0,
  lastStudyDay: null,
  totalMs: 0,
  sessionStartedAt: null,
  updatedAt: Date.now(),
});

export const initialSettings = (): SettingsRow => ({
  id: "local",
  theme: "system",
  reducedMotion: false,
  showTranscripts: true,
  autoPlayAudio: false,
});

export class AcademyDB extends Dexie {
  profiles!: EntityTable<LearnerProfile, "id">;
  progress!: EntityTable<ProgressSnapshot, "id">;
  attempts!: EntityTable<QuestionAttempt, "id">;
  quizzes!: EntityTable<QuizAttempt, "id">;
  mastery!: EntityTable<MasteryRow, "id">;
  bookmarks!: EntityTable<Bookmark, "id">;
  notes!: EntityTable<Note, "id">;
  settings!: EntityTable<SettingsRow, "id">;
  sessions!: EntityTable<StudySession, "id">;

  constructor() {
    super("aplus-academy");
    this.version(1).stores({
      profiles: "id, cloudUserId",
      progress: "id",
      attempts: "id, questionId, at, context",
      quizzes: "id, kind, targetId, at",
      mastery: "id, kind, dueAt",
      bookmarks: "id, targetId, targetType",
      notes: "id, targetId, updatedAt",
      settings: "id",
      sessions: "id, startedAt",
    });
  }
}

export const db = new AcademyDB();

export async function ensureLocalState(): Promise<void> {
  const progress = await db.progress.get("local");
  if (!progress) await db.progress.put(initialProgress());
  const settings = await db.settings.get("local");
  if (!settings) await db.settings.put(initialSettings());
}
