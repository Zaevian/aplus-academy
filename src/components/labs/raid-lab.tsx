"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { Lab } from "@/content/schema";

type Level = "0" | "1" | "5" | "6" | "10";

const META: Record<
  Level,
  { min: number; parity: string; fail: number; note: string }
> = {
  "0": { min: 2, parity: "none", fail: 0, note: "Striping only. Any disk death loses the array." },
  "1": { min: 2, parity: "mirror", fail: 1, note: "Each block exists twice. One disk can die." },
  "5": { min: 3, parity: "1 distributed", fail: 1, note: "One parity stripe. One disk can die. Rebuild is stressful." },
  "6": { min: 4, parity: "2 distributed", fail: 2, note: "Two parity. Two disks can die. Capacity cost is higher." },
  "10": { min: 4, parity: "mirrored pairs", fail: 1, note: "Can lose one disk per pair. Not two in the same pair." },
};

function usable(level: Level, n: number, size: number): number {
  if (n < META[level].min) return 0;
  if (level === "0") return n * size;
  if (level === "1") return Math.floor(n / 2) * size;
  if (level === "5") return (n - 1) * size;
  if (level === "6") return (n - 2) * size;
  return Math.floor(n / 2) * size;
}

export function RaidLab({ lab }: { lab: Lab }) {
  void lab;
  const [level, setLevel] = useState<Level>("1");
  const [disks, setDisks] = useState(4);
  const [failed, setFailed] = useState<number[]>([]);
  const size = 1;
  const cap = usable(level, disks, size);
  const failedCount = failed.length;
  const dead =
    (level === "0" && failedCount >= 1) ||
    (level === "1" && failedCount >= disks) ||
    (level === "5" && failedCount >= 2) ||
    (level === "6" && failedCount >= 3) ||
    (level === "10" && failedCount >= 2);

  const blocks = useMemo(() => ["A", "B", "C", "D"], []);

  return (
    <div className="space-y-3 text-sm">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(META) as Level[]).map((l) => (
          <Button
            key={l}
            size="sm"
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
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: disks }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() =>
              setFailed((f) =>
                f.includes(i) ? f.filter((x) => x !== i) : [...f, i],
              )
            }
            className={`w-24 rounded border p-2 text-left ${
              failed.includes(i) ? "border-destructive bg-destructive/10" : ""
            }`}
          >
            <div className="text-xs text-muted-foreground">Disk {i + 1}</div>
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
