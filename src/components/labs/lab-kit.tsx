"use client";

import { useCallback, useState } from "react";
import type { Lab } from "@/content/schema";

export type LabSimProps = {
  lab: Lab;
  onSolved?: () => void;
};

export function useSolved(onSolved?: () => void) {
  const [solved, setSolved] = useState(false);
  const markSolved = useCallback(() => {
    setSolved((prev) => {
      if (!prev) onSolved?.();
      return true;
    });
  }, [onSolved]);
  return { solved, markSolved };
}

export function LabStatus({
  solved,
  mission,
}: {
  solved: boolean;
  mission: string;
}) {
  return (
    <p
      className={
        solved
          ? "text-sm text-emerald-700 dark:text-emerald-400"
          : "text-sm text-muted-foreground"
      }
    >
      {solved ? "Mission complete. You can record the lab." : mission}
    </p>
  );
}
