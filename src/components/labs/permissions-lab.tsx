"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { LabStatus, useSolved } from "@/components/labs/lab-kit";

type Ntfs = "modify" | "read" | "deny-write";
type Share = "full" | "change" | "read" | "deny";

function rankNtfs(n: Ntfs): number {
  if (n === "deny-write") return 0;
  if (n === "read") return 1;
  return 2;
}
function rankShare(s: Share): number {
  if (s === "deny") return 0;
  if (s === "read") return 1;
  if (s === "change") return 2;
  return 3;
}
function label(n: number): string {
  if (n <= 0) return "Deny / none";
  if (n === 1) return "Read";
  if (n === 2) return "Modify/Change";
  return "Full";
}

function effective(remote: boolean, ntfs: Ntfs, share: Share): string {
  if (!remote) return label(rankNtfs(ntfs));
  return label(Math.min(rankNtfs(ntfs), rankShare(share)));
}

export function PermissionsLab({ lab, onSolved }: LabSimProps) {
  void lab;
  const { solved, markSolved } = useSolved(onSolved);
  const [salesNtfs, setSalesNtfs] = useState<Ntfs>("modify");
  const [salesShare, setSalesShare] = useState<Share>("full");
  const [itNtfs, setItNtfs] = useState<Ntfs>("modify");
  const [itShare, setItShare] = useState<Share>("full");
  const [localNtfs, setLocalNtfs] = useState<Ntfs>("read");
  const [msg, setMsg] = useState("");

  const preview = useMemo(
    () => ({
      sales: effective(true, salesNtfs, salesShare),
      it: effective(true, itNtfs, itShare),
      local: effective(false, localNtfs, "full"),
    }),
    [salesNtfs, salesShare, itNtfs, itShare, localNtfs],
  );

  function check() {
    const salesOk = preview.sales === "Read";
    const itOk = preview.it === "Modify/Change";
    const localOk = preview.local === "Modify/Change";
    if (!salesOk || !itOk || !localOk) {
      setMsg(
        `Need Sales remote Read, IT remote Modify, local NTFS Modify. Now: Sales ${preview.sales}, IT ${preview.it}, local ${preview.local}. Share caps remote users; local interactive ignores share ACL; deny wins.`,
      );
      return;
    }
    setMsg("Effective permissions match the mission.");
    markSolved();
  }

  return (
    <div className="space-y-3 text-sm">
      <LabStatus
        solved={solved}
        mission="Sales remote = Read only. IT remote = Modify. Local console user = NTFS Modify (share ignored)."
      />
      <div className="grid gap-3 sm:grid-cols-3">
        <fieldset className="rounded border p-2">
          <legend className="font-medium">Alice (Sales, remote)</legend>
          <label className="mt-1 block">
            NTFS
            <select
              className="mt-1 min-h-11 w-full rounded-md border bg-background px-2"
              value={salesNtfs}
              onChange={(e) => setSalesNtfs(e.target.value as Ntfs)}
            >
              <option value="modify">Allow Modify</option>
              <option value="read">Allow Read</option>
              <option value="deny-write">Deny Write</option>
            </select>
          </label>
          <label className="mt-1 block">
            Share
            <select
              className="mt-1 min-h-11 w-full rounded-md border bg-background px-2"
              value={salesShare}
              onChange={(e) => setSalesShare(e.target.value as Share)}
            >
              <option value="full">Full</option>
              <option value="change">Change</option>
              <option value="read">Read</option>
              <option value="deny">Deny</option>
            </select>
          </label>
          <p className="mt-2 text-xs">Effective: {preview.sales}</p>
        </fieldset>
        <fieldset className="rounded border p-2">
          <legend className="font-medium">Bob (IT, remote)</legend>
          <label className="mt-1 block">
            NTFS
            <select
              className="mt-1 min-h-11 w-full rounded-md border bg-background px-2"
              value={itNtfs}
              onChange={(e) => setItNtfs(e.target.value as Ntfs)}
            >
              <option value="modify">Allow Modify</option>
              <option value="read">Allow Read</option>
              <option value="deny-write">Deny Write</option>
            </select>
          </label>
          <label className="mt-1 block">
            Share
            <select
              className="mt-1 min-h-11 w-full rounded-md border bg-background px-2"
              value={itShare}
              onChange={(e) => setItShare(e.target.value as Share)}
            >
              <option value="full">Full</option>
              <option value="change">Change</option>
              <option value="read">Read</option>
              <option value="deny">Deny</option>
            </select>
          </label>
          <p className="mt-2 text-xs">Effective: {preview.it}</p>
        </fieldset>
        <fieldset className="rounded border p-2">
          <legend className="font-medium">Local console</legend>
          <label className="mt-1 block">
            NTFS
            <select
              className="mt-1 min-h-11 w-full rounded-md border bg-background px-2"
              value={localNtfs}
              onChange={(e) => setLocalNtfs(e.target.value as Ntfs)}
            >
              <option value="modify">Allow Modify</option>
              <option value="read">Allow Read</option>
              <option value="deny-write">Deny Write</option>
            </select>
          </label>
          <p className="mt-2 text-xs">
            Share ACL ignored. Effective: {preview.local}
          </p>
        </fieldset>
      </div>
      <Button size="sm" className="min-h-11" onClick={check}>
        Check effective
      </Button>
      {msg ? <p className="text-muted-foreground">{msg}</p> : null}
    </div>
  );
}
