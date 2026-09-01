import { nanoid } from "nanoid";
import {
  db,
  ensureLocalState,
  initialProgress,
  type ExperienceLevel,
  type LearnerProfile,
  type ProgressSnapshot,
  type QuestionAttempt,
} from "@/db/client";
import { applyAttemptToMastery } from "@/lib/review";
import { nextDomainId } from "@/lib/course";
import { getQuestions } from "@/content/registry";
import { isCorrect } from "@/lib/questions";

function todayStamp(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

export async function bootstrap(): Promise<{
  profile: LearnerProfile | undefined;
  progress: ProgressSnapshot;
}> {
  await ensureLocalState();
  const profile = await db.profiles.get("local");
  const progress = (await db.progress.get("local")) ?? initialProgress();
  return { profile, progress };
}

export async function completeOnboarding(input: {
  displayName: string;
  experience: ExperienceLevel;
}): Promise<void> {
  await ensureLocalState();
  const profile: LearnerProfile = {
    id: "local",
    displayName: input.displayName.trim() || "Learner",
    experience: input.experience,
    createdAt: Date.now(),
    onboardingComplete: true,
    diagnosticOffered: true,
    diagnosticComplete: false,
  };
  await db.profiles.put(profile);
  const progress = (await db.progress.get("local")) ?? initialProgress();
  await db.progress.put({
    ...progress,
    currentLocation: "/course/foundation",
    unlockedDomainIds: Array.from(
      new Set([...progress.unlockedDomainIds, "FND-D0"]),
    ),
    updatedAt: Date.now(),
  });
}

export async function touchLocation(pathname: string): Promise<void> {
  const progress = await db.progress.get("local");
  if (!progress) return;
  const day = todayStamp();
  let streakDays = progress.streakDays;
  if (progress.lastStudyDay !== day) {
    const yesterday = todayStamp(new Date(Date.now() - 86400000));
    streakDays =
      progress.lastStudyDay === yesterday ? progress.streakDays + 1 : 1;
  }
  await db.progress.put({
    ...progress,
    currentLocation: pathname,
    lastStudyDay: day,
    streakDays,
    updatedAt: Date.now(),
    sessionStartedAt: progress.sessionStartedAt ?? Date.now(),
  });
}

export async function completeBlock(blockId: string): Promise<void> {
  const progress = await db.progress.get("local");
  if (!progress) return;
  if (progress.completedBlocks.includes(blockId)) return;
  await db.progress.put({
    ...progress,
    completedBlocks: [...progress.completedBlocks, blockId],
    updatedAt: Date.now(),
  });
}

export async function completeLesson(lessonId: string): Promise<void> {
  const progress = await db.progress.get("local");
  if (!progress) return;
  if (progress.completedLessons.includes(lessonId)) return;
  await db.progress.put({
    ...progress,
    completedLessons: [...progress.completedLessons, lessonId],
    updatedAt: Date.now(),
  });
}

export async function completeObjective(objectiveId: string): Promise<void> {
  const progress = await db.progress.get("local");
  if (!progress) return;
  if (progress.completedObjectives.includes(objectiveId)) return;
  await db.progress.put({
    ...progress,
    completedObjectives: [...progress.completedObjectives, objectiveId],
    updatedAt: Date.now(),
  });
}

export async function completeLab(labId: string): Promise<void> {
  const progress = await db.progress.get("local");
  if (!progress) return;
  if (progress.completedLabs.includes(labId)) return;
  await db.progress.put({
    ...progress,
    completedLabs: [...progress.completedLabs, labId],
    updatedAt: Date.now(),
  });
}

export async function recordAnswer(input: {
  questionId: string;
  selected: string[];
  context: QuestionAttempt["context"];
}): Promise<{ correct: boolean }> {
  const question = getQuestions().find((q) => q.id === input.questionId);
  if (!question) return { correct: false };
  const correct = isCorrect(question, input.selected);
  await db.attempts.add({
    id: nanoid(),
    questionId: input.questionId,
    selected: input.selected,
    correct,
    at: Date.now(),
    context: input.context,
  });
  await applyAttemptToMastery(question.conceptIds, correct);
  return { correct };
}

export async function recordQuiz(input: {
  kind: "domain" | "checkpoint" | "core-review" | "mock" | "diagnostic";
  targetId: string;
  questionIds: string[];
  score: number;
  total: number;
  missedConceptIds: string[];
}): Promise<{ passed: boolean }> {
  const passed =
    input.kind === "domain" ? input.score === input.total : input.score / input.total >= 0.8;
  await db.quizzes.add({
    id: nanoid(),
    kind: input.kind,
    targetId: input.targetId,
    score: input.score,
    total: input.total,
    passed,
    missedConceptIds: input.missedConceptIds,
    questionIds: input.questionIds,
    at: Date.now(),
  });
  if (input.kind === "domain" && passed) {
    await unlockAfterDomain(input.targetId);
  }
  if (input.kind === "checkpoint" && passed) {
    await completeObjective(input.targetId);
  }
  return { passed };
}

async function unlockAfterDomain(domainId: string): Promise<void> {
  const progress = await db.progress.get("local");
  if (!progress) return;
  const next = nextDomainId(domainId);
  const unlocked = new Set(progress.unlockedDomainIds);
  unlocked.add(domainId);
  if (next) unlocked.add(next);
  const completedDomains = progress.completedDomains.includes(domainId)
    ? progress.completedDomains
    : [...progress.completedDomains, domainId];
  await db.progress.put({
    ...progress,
    unlockedDomainIds: [...unlocked],
    completedDomains,
    updatedAt: Date.now(),
  });
}

export async function addNote(
  targetType: "lesson" | "block" | "lab" | "objective",
  targetId: string,
  body: string,
): Promise<void> {
  const now = Date.now();
  await db.notes.add({
    id: nanoid(),
    targetType,
    targetId,
    body,
    createdAt: now,
    updatedAt: now,
  });
}

export async function addBookmark(
  targetType: "lesson" | "block" | "lab" | "objective",
  targetId: string,
  label: string,
): Promise<void> {
  await db.bookmarks.add({
    id: nanoid(),
    targetType,
    targetId,
    label,
    createdAt: Date.now(),
  });
}

export async function addStudyTime(ms: number): Promise<void> {
  const progress = await db.progress.get("local");
  if (!progress) return;
  await db.progress.put({
    ...progress,
    totalMs: progress.totalMs + ms,
    updatedAt: Date.now(),
  });
}

export async function updateSettings(
  patch: Partial<{
    theme: "system" | "light" | "dark";
    reducedMotion: boolean;
    showTranscripts: boolean;
    autoPlayAudio: boolean;
  }>,
): Promise<void> {
  const settings = await db.settings.get("local");
  if (!settings) return;
  await db.settings.put({ ...settings, ...patch });
}

export async function exposedQuestionIds(): Promise<Set<string>> {
  const attempts = await db.attempts.toArray();
  return new Set(attempts.map((a) => a.questionId));
}
