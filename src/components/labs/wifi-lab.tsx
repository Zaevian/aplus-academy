"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { LabStatus, useSolved } from "@/components/labs/lab-kit";

type Band = "2.4 GHz" | "5 GHz" | "6 GHz";
type Ap = { cell: number; band: Band; channel: string };

const CHANNELS: Record<Band, string[]> = {
  "2.4 GHz": ["1", "6", "11"],
  "5 GHz": ["36", "40", "44", "48", "149"],
  "6 GHz": ["5", "21", "37", "53"],
};

export function WifiLab({ lab, onSolved }: LabSimProps) {
  void lab;
  const { solved, markSolved } = useSolved(onSolved);
  const [aps, setAps] = useState<Ap[]>([
    { cell: 0, band: "2.4 GHz", channel: "6" },
    { cell: 1, band: "5 GHz", channel: "36" },
    { cell: 2, band: "6 GHz", channel: "5" },
  ]);
  const [msg, setMsg] = useState("");

  const overlap = useMemo(() => {
    const hits: string[] = [];
    for (let i = 0; i < aps.length; i++) {
      for (let j = i + 1; j < aps.length; j++) {
        const a = aps[i]!;
        const b = aps[j]!;
        const adjacent = Math.abs(a.cell - b.cell) === 1 || Math.abs(a.cell - b.cell) === 3;
        if (a.band === b.band && a.channel === b.channel && adjacent) {
          hits.push(`${a.band} ch ${a.channel} co-channel on adjacent cells`);
        }
      }
    }
    return hits;
  }, [aps]);

  function check() {
    const bands = aps.map((a) => a.band);
    if (!bands.includes("6 GHz")) {
      setMsg("6 GHz must be used on at least one AP in this sim — not only in the solution text.");
      return;
    }
    const twoFour = aps.filter((a) => a.band === "2.4 GHz");
    if (twoFour.length >= 2 && twoFour.every((a) => a.channel === "6")) {
      setMsg("Do not stack two 2.4 GHz APs on channel 6. Use 1, 6, or 11 and space them.");
      return;
    }
    const clean = aps.filter((a) => a.band === "5 GHz" || a.band === "6 GHz");
    const channels = new Set(clean.map((a) => `${a.band}-${a.channel}`));
    if (clean.length < 2 || channels.size < 2) {
      setMsg("Place at least two 5/6 GHz APs on non-overlapping channels.");
      return;
    }
    if (overlap.length) {
      setMsg(`Co-channel interference: ${overlap.join("; ")}`);
      return;
    }
    setMsg(
      "Plan is clean. 2.4 GHz travels farther and collides more. 5/6 GHz are wider and shorter-range; 6 GHz is in this sim.",
    );
    markSolved();
  }

  return (
    <div className="space-y-3 text-sm">
      <LabStatus
        solved={solved}
        mission="Place three APs. Use 2.4, 5, and 6 GHz. Avoid co-channel overlap. 6 GHz is a real band control."
      />
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 6 }).map((_, cell) => {
          const ap = aps.find((a) => a.cell === cell);
          return (
            <button
              key={cell}
              type="button"
              className={`min-h-16 rounded border p-2 text-left text-xs ${
                ap ? "bg-muted" : ""
              }`}
              onClick={() => {
                setAps((list) =>
                  list.map((a, i) =>
                    i === 0 ? { ...a, cell } : a,
                  ),
                );
              }}
            >
              Cell {cell + 1}
              {ap ? (
                <div className="mt-1 font-medium">
                  {ap.band} ch {ap.channel}
                </div>
              ) : (
                <div className="text-muted-foreground">empty</div>
              )}
            </button>
          );
        })}
      </div>
      {aps.map((ap, i) => (
        <div key={i} className="flex flex-wrap items-center gap-2">
          <span className="w-12">AP {i + 1}</span>
          <select
            className="min-h-11 rounded-md border bg-background px-2"
            value={ap.cell}
            onChange={(e) =>
              setAps((list) =>
                list.map((a, idx) =>
                  idx === i ? { ...a, cell: Number(e.target.value) } : a,
                ),
              )
            }
          >
            {Array.from({ length: 6 }).map((_, c) => (
              <option key={c} value={c}>
                Cell {c + 1}
              </option>
            ))}
          </select>
          <select
            className="min-h-11 rounded-md border bg-background px-2"
            value={ap.band}
            onChange={(e) => {
              const band = e.target.value as Band;
              setAps((list) =>
                list.map((a, idx) =>
                  idx === i
                    ? { ...a, band, channel: CHANNELS[band][0]! }
                    : a,
                ),
              );
            }}
          >
            <option>2.4 GHz</option>
            <option>5 GHz</option>
            <option>6 GHz</option>
          </select>
          <select
            className="min-h-11 rounded-md border bg-background px-2"
            value={ap.channel}
            onChange={(e) =>
              setAps((list) =>
                list.map((a, idx) =>
                  idx === i ? { ...a, channel: e.target.value } : a,
                ),
              )
            }
          >
            {CHANNELS[ap.band].map((ch) => (
              <option key={ch} value={ch}>
                ch {ch}
              </option>
            ))}
          </select>
        </div>
      ))}
      {overlap.length ? (
        <p className="text-destructive">Overlap: {overlap.join("; ")}</p>
      ) : (
        <p className="text-muted-foreground">
          2.4 GHz marks more cells. 6 GHz is shorter-range and cleaner.
        </p>
      )}
      <Button size="sm" className="min-h-11" onClick={check}>
        Check RF plan
      </Button>
      {msg ? <p className="text-muted-foreground">{msg}</p> : null}
    </div>
  );
}
