"use client";

import { useTheme } from "next-themes";
import { useAcademy } from "@/components/academy-provider";
import { updateSettings } from "@/lib/progress-actions";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  const { setTheme, theme } = useTheme();
  const { settings, profile } = useAcademy();
  return (
    <div className="mx-auto max-w-lg space-y-6 px-4 py-8">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <p className="text-sm text-muted-foreground">
        Guest profile: {profile?.displayName ?? "not created"}. Cloud sync is off.
        Progress stays on this device. An account is optional and is not required
        to study.
      </p>
      <div className="space-y-2">
        <p className="text-sm font-medium">Theme</p>
        <div className="flex gap-2">
          {(["system", "light", "dark"] as const).map((t) => (
            <Button
              key={t}
              size="sm"
              className="min-h-11"
              variant={theme === t ? "default" : "outline"}
              onClick={() => {
                setTheme(t);
                void updateSettings({ theme: t });
              }}
            >
              {t}
            </Button>
          ))}
        </div>
      </div>
      <label className="flex min-h-11 items-center justify-between gap-4 text-sm">
        Reduced motion
        <Switch
          checked={settings?.reducedMotion ?? false}
          onCheckedChange={(v) => void updateSettings({ reducedMotion: v })}
        />
      </label>
      <label className="flex min-h-11 items-center justify-between gap-4 text-sm">
        Show transcripts
        <Switch
          checked={settings?.showTranscripts ?? true}
          onCheckedChange={(v) => void updateSettings({ showTranscripts: v })}
        />
      </label>
      <p className="text-xs text-muted-foreground">
        When on, SEE clip transcripts stay visible. When off, they sit behind
        Show transcript. Reduced motion pauses labeled animations on the last
        frame and does not autoplay any stored mp4.
      </p>
      <p className="text-sm text-muted-foreground">
        Listen buttons read lesson text aloud. Cloud voice is used when it is
        configured on the server. Otherwise this device speaks. Guest study still
        works with no keys.
      </p>
    </div>
  );
}
