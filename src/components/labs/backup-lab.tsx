"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { useSolved, LabStatus } from "@/components/labs/lab-kit";

type TapeKind = "full" | "inc" | "diff" | "raid" | "gfs-weekly" | "gfs-monthly";

type Tape = {
  id: string;
  label: string;
  detail: string;
  kind: TapeKind;
};

type MissionId = "inc-thu" | "diff-wed" | "gfs";

type Mission = {
  id: MissionId;
  title: string;
  prompt: string;
  correct: string[];
  single: boolean;
};

const TIMELINE: { day: string; job: string; note: string }[] = [
  { day: "Sun", job: "Full", note: "Entire volume. Reset incrementals and differentials." },
  { day: "Mon", job: "Inc", note: "Changes since Sunday full (or last inc)." },
  { day: "Tue", job: "Inc", note: "Changes since Monday incremental." },
  { day: "Wed", job: "Diff", note: "All changes since Sunday full." },
  { day: "Thu", job: "Inc", note: "Changes since the previous backup job." },
  { day: "Fri", job: "Inc", note: "Changes since Thursday incremental." },
];

const TAPES: Tape[] = [
  {
    id: "sun-full",
    label: "Sunday Full",
    detail: "Last full of this week",
    kind: "full",
  },
  {
    id: "mon-inc",
    label: "Monday Incremental",
    detail: "Mon changes",
    kind: "inc",
  },
  {
    id: "tue-inc",
    label: "Tuesday Incremental",
    detail: "Tue changes",
    kind: "inc",
  },
  {
    id: "wed-inc",
    label: "Wednesday Incremental",
    detail: "Use this for an incremental-only chain",
    kind: "inc",
  },
  {
    id: "wed-diff",
    label: "Wednesday Differential",
    detail: "All changes since Sunday full",
    kind: "diff",
  },
  {
    id: "thu-inc",
    label: "Thursday Incremental",
    detail: "Thu changes",
    kind: "inc",
  },
  {
    id: "fri-inc",
    label: "Friday Incremental",
    detail: "After the Thursday restore point",
    kind: "inc",
  },
  {
    id: "raid1",
    label: "RAID 1 surviving mirror",
    detail: "Live disks in the server — not a backup",
    kind: "raid",
  },
  {
    id: "weekly",
    label: "Weekly father (Friday Full)",
    detail: "GFS father — kept a few weeks",
    kind: "gfs-weekly",
  },
  {
    id: "monthly",
    label: "Monthly grandfather Full",
    detail: "GFS grandfather — kept longest, usually offsite",
    kind: "gfs-monthly",
  },
];

const MISSIONS: Mission[] = [
  {
    id: "inc-thu",
    title: "1 · Incremental restore to Thursday",
    prompt:
      "A spreadsheet was last known good Thursday 17:00. Policy for this restore is Sunday full plus daily incrementals. Select every tape required to rebuild Thursday. Do not use Wednesday’s differential for this chain — pick Wednesday Incremental instead.",
    correct: ["sun-full", "mon-inc", "tue-inc", "wed-inc", "thu-inc"],
    single: false,
  },
  {
    id: "diff-wed",
    title: "2 · Differential restore to Wednesday",
    prompt:
      "Restore the share as of Wednesday close of business using the differential strategy. Wednesday’s job is a differential.",
    correct: ["sun-full", "wed-diff"],
    single: false,
  },
  {
    id: "gfs",
    title: "3 · GFS monthly tape",
    prompt:
      "Grandfather / Father / Son: daily sons rotate fastest, weekly fathers a few weeks, monthly grandfathers the longest (often offsite). Which media do you keep as the monthly grandfather?",
    correct: ["monthly"],
    single: true,
  },
];

function sameSet(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  const set = new Set(a);
  return b.every((id) => set.has(id));
}

function tapeLabel(id: string): string {
  return TAPES.find((t) => t.id === id)?.label ?? id;
}

function explain(mission: Mission, picked: string[]): string {
  if (picked.length === 0) {
    return "Select at least one tape.";
  }
  if (picked.includes("raid1")) {
    return "RAID is not a backup. A deleted or corrupted file is already gone on every mirror member. Fault tolerance is not a restore point.";
  }
  if (mission.id === "inc-thu") {
    if (!picked.includes("sun-full")) {
      return "An incremental restore always starts with the last full backup. Incrementals only contain deltas.";
    }
    if (picked.includes("wed-diff") && !picked.includes("wed-inc")) {
      return "Incremental restore needs every incremental after the last full, not the Wednesday differential. A differential is a different chain: last full + latest diff only.";
    }
    if (picked.includes("fri-inc")) {
      return "Friday’s incremental is after Thursday’s restore point. Applying it would roll the data forward past the corruption window.";
    }
    const needed = mission.correct.filter((id) => !picked.includes(id));
    if (needed.length > 0) {
      return `Incremental chains cannot skip a day. Each incremental depends on the previous one. Missing: ${needed.map(tapeLabel).join(", ")}.`;
    }
    const extra = picked.filter((id) => !mission.correct.includes(id));
    if (extra.length > 0) {
      return `Extra media is not part of this incremental chain: ${extra.map(tapeLabel).join(", ")}.`;
    }
  }
  if (mission.id === "diff-wed") {
    if (!picked.includes("sun-full")) {
      return "A differential is useless without the last full. Differentials store changes since that full, not a complete volume.";
    }
    if (!picked.includes("wed-diff")) {
      return "Differential restore to Wednesday needs Wednesday’s differential — the latest diff as of that day.";
    }
    if (picked.some((id) => id.endsWith("-inc") || id === "wed-inc")) {
      return "Differential restore is last full + latest differential only. You do not replay incrementals on top of a diff chain.";
    }
    const extra = picked.filter((id) => !mission.correct.includes(id));
    if (extra.length > 0) {
      return `Not required for a Wednesday differential restore: ${extra.map(tapeLabel).join(", ")}.`;
    }
  }
  if (mission.id === "gfs") {
    if (picked.includes("weekly")) {
      return "The weekly (father) tape rotates every few weeks. The monthly (grandfather) is retained longest and is the offsite monthly copy.";
    }
    if (picked.some((id) => TAPES.find((t) => t.id === id)?.kind === "inc")) {
      return "Daily incrementals are sons. They rotate fastest and are overwritten — they are not the monthly grandfather.";
    }
    if (picked.includes("sun-full") || picked.includes("wed-diff")) {
      return "This week’s working set is for operational restore. GFS monthly is a separate grandfather copy kept on a longer schedule.";
    }
    return "Pick the monthly grandfather full — the tape you keep longest.";
  }
  return "That chain does not match the required set.";
}

export function BackupLab({ lab, onSolved }: LabSimProps) {
  const { solved, markSolved } = useSolved(onSolved);
  const [active, setActive] = useState<MissionId>("inc-thu");
  const [picked, setPicked] = useState<Record<MissionId, string[]>>({
    "inc-thu": [],
    "diff-wed": [],
    gfs: [],
  });
  const [passed, setPassed] = useState<Record<MissionId, boolean>>({
    "inc-thu": false,
    "diff-wed": false,
    gfs: false,
  });
  const [message, setMessage] = useState<string | null>(null);

  const mission = MISSIONS.find((m) => m.id === active) ?? MISSIONS[0]!;
  const selection = picked[active];
  const passedCount = useMemo(
    () => MISSIONS.filter((m) => passed[m.id]).length,
    [passed],
  );

  function toggle(id: string) {
    setMessage(null);
    setPicked((prev) => {
      const current = prev[active];
      if (mission.single) {
        return { ...prev, [active]: current[0] === id ? [] : [id] };
      }
      const next = current.includes(id)
        ? current.filter((x) => x !== id)
        : [...current, id];
      return { ...prev, [active]: next };
    });
  }

  function checkChain() {
    const ok = sameSet(selection, mission.correct);
    if (!ok) {
      setPassed((prev) => ({ ...prev, [active]: false }));
      setMessage(explain(mission, selection));
      return;
    }
    const nextPassed = { ...passed, [active]: true };
    setPassed(nextPassed);
    setMessage(
      mission.id === "gfs"
        ? "Correct. Grandfather (monthly) is kept longest, father (weekly) a few weeks, son (daily) rotates soonest."
        : mission.id === "diff-wed"
          ? "Correct. Differential restore = last full + latest differential only."
          : "Correct. Incremental restore = last full + every incremental after it through Thursday.",
    );
    if (MISSIONS.every((m) => nextPassed[m.id])) markSolved();
  }

  return (
    <div className="space-y-4 text-sm" aria-label={lab.title}>
      <LabStatus
        solved={solved}
        mission="Build three restore chains: Thursday incremental, Wednesday differential, and the GFS monthly grandfather. RAID is not a backup."
      />

      <div>
        <p className="font-medium">This week’s backup jobs</p>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-6">
          {TIMELINE.map((slot) => (
            <div key={slot.day} className="rounded-md border p-2">
              <p className="text-xs text-muted-foreground">{slot.day}</p>
              <p className="font-medium">{slot.job}</p>
              <p className="mt-1 text-[11px] leading-4 text-muted-foreground">{slot.note}</p>
            </div>
          ))}
        </div>
        <p className="mt-2 text-muted-foreground">
          GFS slots: weekly father and monthly grandfather sit besides this
          operational chain. RAID 1 on the file server is live redundancy, not a
          restore catalog.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {MISSIONS.map((item) => (
          <Button
            key={item.id}
            type="button"
            size="sm"
            variant={active === item.id ? "default" : "outline"}
            onClick={() => {
              setActive(item.id);
              setMessage(null);
            }}
          >
            {passed[item.id] ? "✓ " : ""}
            {item.title}
          </Button>
        ))}
      </div>

      <p>
        Restore missions complete: {passedCount} / 3
      </p>

      <div className="rounded-md border p-3">
        <p className="font-medium">{mission.title}</p>
        <p className="mt-1 leading-6 text-muted-foreground">{mission.prompt}</p>
        <p className="mt-2 text-xs text-muted-foreground">
          {mission.single ? "Pick one tape." : "Toggle every required tape. Order does not matter."}
        </p>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {TAPES.map((tape) => {
          const on = selection.includes(tape.id);
          return (
            <Button
              key={tape.id}
              type="button"
              variant={on ? "default" : "outline"}
              className="h-auto justify-start whitespace-normal py-2 text-left"
              onClick={() => toggle(tape.id)}
            >
              <span>
                <span className="block">{tape.label}</span>
                <span className="block text-xs font-normal opacity-80">{tape.detail}</span>
              </span>
            </Button>
          );
        })}
      </div>

      <Button type="button" onClick={checkChain}>
        Check restore chain
      </Button>

      {message ? (
        <p
          className={
            passed[active]
              ? "text-emerald-700 dark:text-emerald-400"
              : "text-destructive"
          }
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}
