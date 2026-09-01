"use client";

import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useAcademy } from "@/components/academy-provider";
import { cn } from "@/lib/utils";

export function useSeeFrozen(): boolean {
  const { settings } = useAcademy();
  return Boolean(settings?.reducedMotion);
}

export function MotionClip({
  title,
  alt,
  children,
  caption,
}: {
  title: string;
  alt: string;
  children: ReactNode;
  caption?: string;
}) {
  const frozenPref = useSeeFrozen();
  const [userPaused, setUserPaused] = useState(false);
  const [tick, setTick] = useState(0);
  const frozen = frozenPref || userPaused;

  return (
    <figure className="overflow-hidden rounded-lg border bg-card">
      <div className="flex items-center justify-between gap-2 border-b px-3 py-2">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {title}
        </p>
        <div className="flex gap-1">
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="min-h-11"
            onClick={() => {
              if (!frozenPref) setUserPaused((p) => !p);
            }}
          >
            {frozen ? "Play" : "Pause"}
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="min-h-11"
            onClick={() => {
              if (frozenPref) return;
              setUserPaused(false);
              setTick((t) => t + 1);
            }}
          >
            Replay
          </Button>
        </div>
      </div>
      <div
        key={tick}
        className={cn("p-3", frozen && "see-frozen")}
        role="img"
        aria-label={alt}
      >
        {children}
      </div>
      {caption ? (
        <figcaption className="border-t px-3 py-2 text-xs text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
