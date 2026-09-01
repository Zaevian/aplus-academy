"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { liveQuery } from "dexie";
import {
  db,
  ensureLocalState,
  type LearnerProfile,
  type Note,
  type ProgressSnapshot,
  type SettingsRow,
  type Bookmark,
  type QuizAttempt,
  type MasteryRow,
} from "@/db/client";
import { touchLocation } from "@/lib/progress-actions";
import { healedUnlocks, sameStringSet } from "@/lib/domain-unlock";
import { usePathname } from "next/navigation";

type AcademyState = {
  ready: boolean;
  profile?: LearnerProfile;
  progress?: ProgressSnapshot;
  settings?: SettingsRow;
  bookmarks: Bookmark[];
  notes: Note[];
  quizzes: QuizAttempt[];
  mastery: MasteryRow[];
  refresh: () => Promise<void>;
};

const AcademyContext = createContext<AcademyState | null>(null);

export function AcademyProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [profile, setProfile] = useState<LearnerProfile>();
  const [progress, setProgress] = useState<ProgressSnapshot>();
  const [settings, setSettings] = useState<SettingsRow>();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [quizzes, setQuizzes] = useState<QuizAttempt[]>([]);
  const [mastery, setMastery] = useState<MasteryRow[]>([]);

  const refresh = useCallback(async () => {
    await ensureLocalState();
    setProfile(await db.profiles.get("local"));
    setProgress(await db.progress.get("local"));
    setSettings(await db.settings.get("local"));
    setBookmarks(await db.bookmarks.toArray());
    setNotes(await db.notes.toArray());
    setQuizzes(await db.quizzes.toArray());
    setMastery(await db.mastery.toArray());
    setReady(true);
  }, []);

  useEffect(() => {
    void (async () => {
      await ensureLocalState();
      const row = await db.progress.get("local");
      if (row) {
        const unlocked = healedUnlocks(row);
        if (!sameStringSet(row.unlockedDomainIds, unlocked)) {
          await db.progress.put({
            ...row,
            unlockedDomainIds: unlocked,
            updatedAt: Date.now(),
          });
        }
      }
    })();
    const subs = [
      liveQuery(() => db.progress.get("local")).subscribe((p) => {
        if (p) setProgress(p);
        setReady(true);
      }),
      liveQuery(() => db.profiles.get("local")).subscribe(setProfile),
      liveQuery(() => db.settings.get("local")).subscribe((s) => {
        if (s) setSettings(s);
      }),
      liveQuery(() => db.bookmarks.toArray()).subscribe(setBookmarks),
      liveQuery(() => db.notes.toArray()).subscribe(setNotes),
      liveQuery(() => db.quizzes.toArray()).subscribe(setQuizzes),
      liveQuery(() => db.mastery.toArray()).subscribe(setMastery),
    ];
    return () => subs.forEach((s) => s.unsubscribe());
  }, []);

  useEffect(() => {
    if (!ready || !pathname) return;
    void touchLocation(pathname);
  }, [pathname, ready]);

  const value = useMemo(
    () => ({
      ready,
      profile,
      progress,
      settings,
      bookmarks,
      notes,
      quizzes,
      mastery,
      refresh,
    }),
    [
      ready,
      profile,
      progress,
      settings,
      bookmarks,
      notes,
      quizzes,
      mastery,
      refresh,
    ],
  );

  return (
    <AcademyContext.Provider value={value}>{children}</AcademyContext.Provider>
  );
}

export function useAcademy(): AcademyState {
  const ctx = useContext(AcademyContext);
  if (!ctx) throw new Error("useAcademy must be used within AcademyProvider");
  return ctx;
}
