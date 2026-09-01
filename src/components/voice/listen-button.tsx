"use client";

import { Volume2, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVoice } from "@/components/voice/voice-provider";
import { cn } from "@/lib/utils";

export function ListenButton({
  text,
  title,
  label = "Listen",
  className,
}: {
  text: string;
  title?: string;
  label?: string;
  className?: string;
}) {
  const { play, stop, playing, loading, title: current } = useVoice();
  const active = playing && current === (title ?? "Listening");
  if (!text.trim()) return null;
  return (
    <Button
      type="button"
      size="sm"
      variant={active ? "default" : "outline"}
      className={cn("min-h-11 gap-1.5", className)}
      onClick={() => {
        if (active) stop();
        else void play(text, title ?? "Listening");
      }}
      aria-pressed={active}
    >
      {active ? <Square className="size-3.5" /> : <Volume2 className="size-3.5" />}
      {active ? "Stop" : loading && current === (title ?? "Listening") ? "Loading…" : label}
    </Button>
  );
}

export function VoiceNowPlaying() {
  const { playing, loading, source, title, stop } = useVoice();
  if (!playing && !loading) return null;
  return (
    <div className="fixed right-3 bottom-20 z-50 max-w-sm rounded-lg border bg-background/95 p-3 text-sm shadow-lg md:bottom-3">
      <p className="font-medium">{loading ? "Preparing voice…" : "Listening"}</p>
      <p className="text-xs text-muted-foreground">
        {title} · {source === "api" ? "Cloud voice" : source === "device" ? "This device" : "Starting"}
      </p>
      <Button size="sm" className="mt-2 min-h-11" variant="outline" onClick={stop}>
        Stop
      </Button>
    </div>
  );
}
