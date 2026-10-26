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
import { healedUnlocks, nextDomainInCore, sameStringSet } from "@/lib/domain-unlock";
import { getLabs, getQuestions } from "@/content/registry";
import { isCorrect } from "@/lib/questions";
import { ALL_OBJECTIVES } from "@/content/catalog";
import { lessonPath, objectivePath } from "@/lib/course";
import { FIRST_LESSON_HREF, rememberContentHref } from "@/lib/study-path";
export { applyCompleteBlock } from "@/lib/lesson-lock";

async function updateProgress(
  mutator: (progress: ProgressSnapshot) => void,
): Promise<void> {
  await ensureLocalState();
  await db.transaction("rw", db.progress, async () => {
    const progress = await db.progress.get("local");
    if (!progress) return;
    mutator(progress);
    const unlocked = healedUnlocks(progress);
    if (!sameStringSet(progress.unlockedDomainIds, unlocked)) {
      progress.unlockedDomainIds = unlocked;
    }
    progress.updatedAt = Date.now();
    await db.progress.put(progress);
  });
}

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
  await updateProgress((progress) => {
    progress.currentLocation = "/course/foundation/what-a-plus-is";
    progress.unlockedDomainIds = healedUnlocks({
      ...progress,
      unlockedDomainIds: [...progress.unlockedDomainIds, "FND-D0", "C1-D1", "C2-D1"],
    });
  });
}

export async function touchLocation(pathname: string): Promise<void> {
  await updateProgress((progress) => {
    const day = todayStamp();
    if (progress.lastStudyDay !== day) {
      const yesterday = todayStamp(new Date(Date.now() - 86400000));
      progress.streakDays =
        progress.lastStudyDay === yesterday ? progress.streakDays + 1 : 1;
    }
    const remembered = rememberContentHref(progress, pathname);
    progress.currentLocation = remembered.currentLocation;
    progress.lastContentHref = remembered.lastContentHref;
    progress.lastStudyDay = day;
    progress.sessionStartedAt = progress.sessionStartedAt ?? Date.now();
  });
}

/** Clear course progress on this device and point at Foundation lesson 1. Notes, bookmarks, and the profile stay. */
export async function restartCourse(): Promise<void> {
  await ensureLocalState();
  await db.transaction("rw", [db.progress, db.attempts, db.quizzes, db.mastery], async () => {
    await db.attempts.clear();
    await db.quizzes.clear();
    await db.mastery.clear();
    const fresh = initialProgress();
    fresh.currentLocation = FIRST_LESSON_HREF;
    fresh.lastContentHref = null;
    await db.progress.put(fresh);
  });
}

export async function completeBlock(blockId: string): Promise<void> {
  await updateProgress((progress) => {
    if (progress.completedBlocks.includes(blockId)) return;
    progress.completedBlocks = [...progress.completedBlocks, blockId];
  });
}

export async function completeLesson(lessonId: string): Promise<void> {
  await updateProgress((progress) => {
    if (progress.completedLessons.includes(lessonId)) return;
    progress.completedLessons = [...progress.completedLessons, lessonId];
  });
}

export async function completeObjective(objectiveId: string): Promise<void> {
  await updateProgress((progress) => {
    if (progress.completedObjectives.includes(objectiveId)) return;
    progress.completedObjectives = [...progress.completedObjectives, objectiveId];
  });
}

export async function completeLab(labId: string): Promise<void> {
  await updateProgress((progress) => {
    if (progress.completedLabs.includes(labId)) return;
    progress.completedLabs = [...progress.completedLabs, labId];
  });
}

export async function recordAnswer(input: {
  questionId: string;
  selected: string[];
  context: QuestionAttempt["context"];
  /** True when explanation was already shown for this item before submit. */
  assisted?: boolean;
  attemptNumber?: number;
}): Promise<{ correct: boolean }> {
  const question = getQuestions().find((q) => q.id === input.questionId);
  if (!question) return { correct: false };
  const correct = isCorrect(question, input.selected);
  const prior = await db.attempts
    .where("questionId")
    .equals(input.questionId)
    .toArray();
  const attemptNumber = input.attemptNumber ?? prior.length + 1;
  const assisted = Boolean(input.assisted);
  const firstAttemptCorrect = attemptNumber === 1 ? correct : false;
  await db.attempts.add({
    id: nanoid(),
    questionId: input.questionId,
    selected: input.selected,
    correct,
    at: Date.now(),
    context: input.context,
    assisted,
    attemptNumber,
    firstAttemptCorrect,
    explanationShownBeforeSuccess: assisted && correct,
  });
  await applyAttemptToMastery(question.conceptIds, correct, { assisted });
  return { correct };
}

export async function recordQuiz(input: {
  kind: "domain" | "checkpoint" | "core-review" | "mock" | "diagnostic";
  targetId: string;
  questionIds: string[];
  score: number;
  total: number;
  missedConceptIds: string[];
  /** Override score-derived pass (e.g. domain gate after retry-until-correct). */
  passed?: boolean;
}): Promise<{ passed: boolean }> {
  const passed =
    input.passed ??
    (input.kind === "domain"
      ? input.score === input.total
      : input.score / input.total >= 0.8);
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
  await updateProgress((progress) => {
    const next = nextDomainInCore(domainId);
    const unlocked = new Set(progress.unlockedDomainIds);
    unlocked.add(domainId);
    if (next) unlocked.add(next);
    progress.unlockedDomainIds = [...unlocked];
    if (!progress.completedDomains.includes(domainId)) {
      progress.completedDomains = [...progress.completedDomains, domainId];
    }
  });
}

export function bookmarkHref(bookmark: {
  targetType: "lesson" | "block" | "lab" | "objective";
  targetId: string;
}): string {
  if (bookmark.targetType === "lesson") return lessonPath(bookmark.targetId);
  if (bookmark.targetType === "lab") {
    const lab = getLabs().find((l) => l.id === bookmark.targetId);
    return lab ? `/labs/${lab.slug}` : "/labs";
  }
  if (bookmark.targetType === "objective") {
    const objective = ALL_OBJECTIVES.find((o) => o.id === bookmark.targetId);
    return objective ? objectivePath(objective) : "/objectives";
  }
  return "/notes";
}

export async function deleteBookmark(id: string): Promise<void> {
  await db.bookmarks.delete(id);
}

export async function toggleLessonBookmark(
  lessonId: string,
  label: string,
): Promise<boolean> {
  const existing = await db.bookmarks
    .where("targetId")
    .equals(lessonId)
    .filter((b) => b.targetType === "lesson")
    .first();
  if (existing) {
    await db.bookmarks.delete(existing.id);
    return false;
  }
  await addBookmark("lesson", lessonId, label);
  return true;
}

export async function upsertNote(input: {
  id?: string;
  targetType: "lesson" | "block" | "lab" | "objective";
  targetId: string;
  body: string;
}): Promise<void> {
  const now = Date.now();
  const body = input.body.trim();
  if (!body) return;
  if (input.id) {
    const row = await db.notes.get(input.id);
    if (!row) return;
    await db.notes.put({ ...row, body, updatedAt: now });
    return;
  }
  await db.notes.add({
    id: nanoid(),
    targetType: input.targetType,
    targetId: input.targetId,
    body,
    createdAt: now,
    updatedAt: now,
  });
}

export async function deleteNote(id: string): Promise<void> {
  await db.notes.delete(id);
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
  await updateProgress((progress) => {
    progress.totalMs += ms;
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
  const quizzes = await db.quizzes.toArray();
  const ids = new Set(attempts.map((a) => a.questionId));
  for (const quiz of quizzes) {
    for (const qid of quiz.questionIds) ids.add(qid);
  }
  return ids;
}
