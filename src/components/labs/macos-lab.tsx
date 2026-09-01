"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { LabStatus, useSolved } from "@/components/labs/lab-kit";

type App = "finder" | "store" | "settings" | "tm";

export function MacOsLab({ lab, onSolved }: LabSimProps) {
  void lab;
  const { solved, markSolved } = useSolved(onSolved);
  const [app, setApp] = useState<App>("finder");
  const [install, setInstall] = useState("");
  const [tmDisk, setTmDisk] = useState(false);
  const [backed, setBacked] = useState(false);
  const [filevault, setFilevault] = useState(false);
  const [msg, setMsg] = useState("");

  function check() {
    if (install !== "store") {
      setMsg("Pages comes from the App Store on this prompt. .dmg is a disk image; .pkg is a package installer.");
      return;
    }
    if (!backed) {
      setMsg("Open Time Machine, select a disk, then Back Up Now.");
      return;
    }
    if (!filevault) {
      setMsg("System Settings → Privacy & Security → FileVault On. FileVault is full-disk encryption.");
      return;
    }
    setMsg("Install, Time Machine, and FileVault are done.");
    markSolved();
  }

  return (
    <div className="space-y-3 text-sm">
      <LabStatus
        solved={solved}
        mission="Install from the right source, start Time Machine, and turn FileVault on."
      />
      <div className="rounded-lg border bg-zinc-100 p-2 dark:bg-zinc-900">
        <div className="flex gap-2 border-b pb-2 text-xs">
          <span className="font-medium">Finder</span>
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
        </div>
        <div className="mt-3 min-h-40 rounded-md border bg-background p-3">
          {app === "store" ? (
            <div className="space-y-2">
              <p className="font-medium">App Store — Pages</p>
              <p>How should this Mac get Pages?</p>
              <div className="flex flex-wrap gap-2">
                {["store", "dmg", "pkg"].map((id) => (
                  <Button
                    key={id}
                    size="sm"
                    className="min-h-11"
                    variant={install === id ? "default" : "outline"}
                    onClick={() => setInstall(id)}
                  >
                    {id === "store" ? "Get from App Store" : id === "dmg" ? "Mount random .dmg" : "Run unknown .pkg"}
                  </Button>
                ))}
              </div>
            </div>
          ) : null}
          {app === "tm" ? (
            <div className="space-y-2">
              <p className="font-medium">Time Machine</p>
              <label className="flex min-h-11 items-center gap-2">
                <input
                  type="checkbox"
                  checked={tmDisk}
                  onChange={(e) => setTmDisk(e.target.checked)}
                />
                Select Backup Disk (USB 4 TB)
              </label>
              <Button
                size="sm"
                className="min-h-11"
                disabled={!tmDisk}
                onClick={() => setBacked(true)}
              >
                Back Up Now
              </Button>
              {backed ? <p className="text-emerald-700">Backup started.</p> : null}
            </div>
          ) : null}
          {app === "settings" ? (
            <div className="space-y-2">
              <p className="font-medium">Privacy & Security → FileVault</p>
              <label className="flex min-h-11 items-center gap-2">
                <input
                  type="checkbox"
                  checked={filevault}
                  onChange={(e) => setFilevault(e.target.checked)}
                />
                FileVault On
              </label>
            </div>
          ) : null}
          {app === "finder" ? (
            <p className="text-muted-foreground">
              Dock: App Store for listed apps, Time Machine for backup, System Settings for FileVault.
            </p>
          ) : null}
        </div>
        <div className="mt-3 flex justify-center gap-2">
          {(
            [
              ["finder", "Finder"],
              ["store", "App Store"],
              ["settings", "System Settings"],
              ["tm", "Time Machine"],
            ] as const
          ).map(([id, label]) => (
            <Button
              key={id}
              size="sm"
              className="min-h-11"
              variant={app === id ? "default" : "outline"}
              onClick={() => setApp(id)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
      <Button size="sm" className="min-h-11" onClick={check}>
        Check macOS tasks
      </Button>
      {msg ? <p className="text-muted-foreground">{msg}</p> : null}
    </div>
  );
}
