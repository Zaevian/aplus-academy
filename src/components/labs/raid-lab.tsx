"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { LabStatus, useSolved } from "@/components/labs/lab-kit";
import { raidArrayDead, raid10PairFailed, raid10SplitFailures, type RaidLevel } from "@/lib/raid";
import { RaidDegradedStrip } from "@/components/diagrams/see-clips";

const META: Record<
  RaidLevel,
  { min: number; parity: string; note: string }
> = {
  "0": { min: 2, parity: "none", note: "Striping only. Any disk death loses the array." },
  "1": { min: 2, parity: "mirror", note: "Each block exists twice. One disk can die on a 2-disk mirror." },
  "5": { min: 3, parity: "1 distributed", note: "One parity stripe. One disk can die. Rebuild is stressful." },
  "6": { min: 4, parity: "2 distributed", note: "Two parity. Two disks can die. Capacity cost is higher." },
  "10": { min: 4, parity: "mirrored pairs", note: "Can lose one disk per pair. Not two in the same pair. RAID is not a backup." },
};

function usable(level: RaidLevel, n: number, size: number): number {
  if (n < META[level].min) return 0;
  if (level === "0") return n * size;
  if (level === "1") return Math.floor(n / 2) * size;
  if (level === "5") return (n - 1) * size;
  if (level === "6") return (n - 2) * size;
  return Math.floor(n / 2) * size;
}

export function RaidLab({ lab, onSolved }: LabSimProps) {
  void lab;
  const { solved, markSolved } = useSolved(onSolved);
  const [level, setLevel] = useState<RaidLevel>("10");
  const [disks, setDisks] = useState(4);
  const [failed, setFailed] = useState<number[]>([]);
  const [sawSplit, setSawSplit] = useState(false);
  const [sawPairKill, setSawPairKill] = useState(false);
  const size = 1;
  const cap = usable(level, disks, size);
  const dead = raidArrayDead(level, disks, failed);
  const failedCount = failed.length;

  const blocks = useMemo(() => ["A", "B", "C", "D"], []);

  function pairOf(i: number) {
    return Math.floor(i / 2);
  }

  function toggleDisk(i: number) {
    const next = failed.includes(i) ? failed.filter((x) => x !== i) : [...failed, i];
    setFailed(next);
    if (level === "10") {
      const pairKill = raid10PairFailed(disks, next);
      const split = raid10SplitFailures(disks, next);
      const nextSplit = sawSplit || split;
      const nextKill = sawPairKill || pairKill;
      if (split) setSawSplit(true);
      if (pairKill) setSawPairKill(true);
      if (nextSplit && nextKill) markSolved();
    }
  }

  return (
    <div className="space-y-3 text-sm">
      <LabStatus
        solved={solved}
        mission="RAID 10 mission: fail two disks in different pairs (array stays up), then fail both disks in one pair (array dies). RAID is not a backup."
      />
      <RaidDegradedStrip />
      <div className="flex flex-wrap gap-2">
        {(Object.keys(META) as RaidLevel[]).map((l) => (
          <Button
            key={l}
            size="sm"
            className="min-h-11"
            variant={level === l ? "default" : "outline"}
            onClick={() => {
              setLevel(l);
              setFailed([]);
              setDisks(Math.max(META[l].min, disks));
            }}
          >
            RAID {l}
          </Button>
        ))}
      </div>
      <p className="text-muted-foreground">{META[level].note}</p>
      <div className="flex items-center gap-2">
        <span>Disks</span>
        <input
          type="range"
          min={META[level].min}
          max={8}
          value={disks}
          onChange={(e) => {
            setDisks(Number(e.target.value));
            setFailed([]);
          }}
        />
        <span className="tabular-nums">{disks}</span>
      </div>
      <p>
        Usable capacity (1 TB disks, simplified):{" "}
        <strong>{cap} TB</strong> · failed disks {failedCount} · array{" "}
        {dead ? "offline / data lost" : failedCount ? "degraded" : "healthy"}
      </p>
      {level === "10" ? (
        <p className="text-xs text-muted-foreground">
          Pairs:{" "}
          {Array.from({ length: Math.floor(disks / 2) }, (_, p) => (
            <span key={p} className="mr-2">
              [{p * 2 + 1}+{p * 2 + 2}]
            </span>
          ))}
          Two failed disks are fatal only when they are the same mirrored pair.
        </p>
      ) : null}
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: disks }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => toggleDisk(i)}
            className={`min-h-11 w-24 rounded border p-2 text-left focus-visible:ring-3 focus-visible:ring-ring/50 ${
              failed.includes(i) ? "border-destructive bg-destructive/10" : ""
            }`}
          >
            <div className="text-xs text-muted-foreground">
              Disk {i + 1}
              {level === "10" ? ` · pair ${pairOf(i) + 1}` : ""}
            </div>
            <div className="font-mono text-xs">
              {failed.includes(i)
                ? "FAIL"
                : level === "0"
                  ? blocks[i % 4]
                  : level === "1"
                    ? blocks[Math.floor(i / 2) % 4]
                    : "data/P"}
            </div>
          </button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Click a disk to fail it. RAID is not a backup: a deleted file is deleted on every member.
      </p>
    </div>
  );
}
