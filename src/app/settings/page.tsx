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
        Guest profile: {profile?.displayName ?? "not created"}. Cloud sync enables
        itself when NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are
        set. Accounts are optional.
      </p>
      <div className="space-y-2">
        <p className="text-sm font-medium">Theme</p>
        <div className="flex gap-2">
          {(["system", "light", "dark"] as const).map((t) => (
            <Button
              key={t}
              size="sm"
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
      <label className="flex items-center justify-between gap-4 text-sm">
        Reduced motion
        <Switch
          checked={settings?.reducedMotion ?? false}
          onCheckedChange={(v) => void updateSettings({ reducedMotion: v })}
        />
      </label>
      <label className="flex items-center justify-between gap-4 text-sm">
        Show transcripts
        <Switch
          checked={settings?.showTranscripts ?? true}
          onCheckedChange={(v) => void updateSettings({ showTranscripts: v })}
        />
      </label>
    </div>
  );
}
