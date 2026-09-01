"use client";

import { useMemo, useState } from "react";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { useSolved, LabStatus } from "@/components/labs/lab-kit";
import { Button } from "@/components/ui/button";

type ConnId =
  | "rj45"
  | "rj11"
  | "usba"
  | "usbc"
  | "hdmi"
  | "dp"
  | "tb"
  | "molex";

type WireId = "wo" | "o" | "wg" | "g" | "bl" | "wbl" | "wbr" | "br";

const CONNECTORS: {
  id: ConnId;
  name: string;
  blurb: string;
}[] = [
  { id: "rj45", name: "RJ45", blurb: "8P8C Ethernet jack. Wider than RJ11." },
  { id: "rj11", name: "RJ11", blurb: "6P2C/6P4C phone jack. Narrower than RJ45." },
  { id: "usba", name: "USB-A", blurb: "Legacy rectangular host connector." },
  { id: "usbc", name: "USB-C", blurb: "Reversible oval. No Thunderbolt mark." },
  {
    id: "hdmi",
    name: "HDMI",
    blurb: "Trapezoid video. 19 pins, two bottom corners chamfered evenly.",
  },
  {
    id: "dp",
    name: "DisplayPort",
    blurb: "Like HDMI but one corner is a right angle (the key).",
  },
  {
    id: "tb",
    name: "Thunderbolt (USB-C shell)",
    blurb: "USB-C shape plus a lightning bolt. Alternate mode / daisy-chain.",
  },
  {
    id: "molex",
    name: "Molex (4-pin peripheral)",
    blurb: "Legacy disk power: yellow 12 V, two blacks, red 5 V.",
  },
];

const WIRES: { id: WireId; label: string; hex: string; stripe?: string }[] = [
  { id: "wo", label: "White/Orange", hex: "#fff7ed", stripe: "#ea580c" },
  { id: "o", label: "Orange", hex: "#ea580c" },
  { id: "wg", label: "White/Green", hex: "#f0fdf4", stripe: "#16a34a" },
  { id: "g", label: "Green", hex: "#16a34a" },
  { id: "bl", label: "Blue", hex: "#2563eb" },
  { id: "wbl", label: "White/Blue", hex: "#eff6ff", stripe: "#2563eb" },
  { id: "wbr", label: "White/Brown", hex: "#fdfaf8", stripe: "#92400e" },
  { id: "br", label: "Brown", hex: "#92400e" },
];

const T568B: WireId[] = ["wo", "o", "wg", "bl", "wbl", "g", "wbr", "br"];
const T568A: WireId[] = ["wg", "g", "wo", "bl", "wbl", "o", "wbr", "br"];

function matchStandard(pins: (WireId | "")[]): "T568A" | "T568B" | null {
  if (pins.some((p) => !p)) return null;
  const seq = pins as WireId[];
  if (seq.every((w, i) => w === T568A[i])) return "T568A";
  if (seq.every((w, i) => w === T568B[i])) return "T568B";
  return null;
}

function ConnectorGlyph({ id }: { id: ConnId }) {
  if (id === "rj45") {
    return (
      <svg viewBox="0 0 80 56" className="h-14 w-20" aria-hidden>
        <rect x="8" y="10" width="64" height="36" rx="3" fill="#d4d4d8" stroke="#3f3f46" />
        <rect x="14" y="16" width="52" height="22" fill="#18181b" />
        {Array.from({ length: 8 }).map((_, i) => (
          <rect
            key={i}
            x={18 + i * 6}
            y="20"
            width="3.5"
            height="14"
            fill="#facc15"
          />
        ))}
        <text x="40" y="52" textAnchor="middle" fontSize="7" fill="currentColor">
          8P8C
        </text>
      </svg>
    );
  }
  if (id === "rj11") {
    return (
      <svg viewBox="0 0 80 56" className="h-14 w-20" aria-hidden>
        <rect x="18" y="12" width="44" height="30" rx="3" fill="#d4d4d8" stroke="#3f3f46" />
        <rect x="24" y="18" width="32" height="16" fill="#18181b" />
        {Array.from({ length: 6 }).map((_, i) => (
          <rect
            key={i}
            x={27 + i * 4.6}
            y="20"
            width="3"
            height="12"
            fill="#facc15"
          />
        ))}
        <text x="40" y="52" textAnchor="middle" fontSize="7" fill="currentColor">
          6P4C
        </text>
      </svg>
    );
  }
  if (id === "usba") {
    return (
      <svg viewBox="0 0 80 56" className="h-14 w-20" aria-hidden>
        <rect x="16" y="16" width="48" height="20" rx="2" fill="#e4e4e7" stroke="#3f3f46" />
        <rect x="20" y="20" width="40" height="12" fill="#18181b" />
        <rect x="24" y="23" width="32" height="6" fill="#a1a1aa" />
        <text x="40" y="50" textAnchor="middle" fontSize="7" fill="currentColor">
          USB-A
        </text>
      </svg>
    );
  }
  if (id === "usbc") {
    return (
      <svg viewBox="0 0 80 56" className="h-14 w-20" aria-hidden>
        <rect x="14" y="20" width="52" height="14" rx="7" fill="#e4e4e7" stroke="#3f3f46" />
        <rect x="18" y="23" width="44" height="8" rx="4" fill="#18181b" />
        <text x="40" y="50" textAnchor="middle" fontSize="7" fill="currentColor">
          USB-C
        </text>
      </svg>
    );
  }
  if (id === "hdmi") {
    return (
      <svg viewBox="0 0 80 56" className="h-14 w-20" aria-hidden>
        <path
          d="M16 18h48l6 16H10z"
          fill="#e4e4e7"
          stroke="#3f3f46"
        />
        <path d="M20 22h40l4 10H16z" fill="#18181b" />
        <text x="40" y="50" textAnchor="middle" fontSize="7" fill="currentColor">
          HDMI
        </text>
      </svg>
    );
  }
  if (id === "dp") {
    return (
      <svg viewBox="0 0 80 56" className="h-14 w-20" aria-hidden>
        <path
          d="M14 18h46v6l8 4v8H14z"
          fill="#e4e4e7"
          stroke="#3f3f46"
        />
        <path d="M18 22h38v4l6 3v5H18z" fill="#18181b" />
        <text x="40" y="50" textAnchor="middle" fontSize="7" fill="currentColor">
          DP
        </text>
      </svg>
    );
  }
  if (id === "tb") {
    return (
      <svg viewBox="0 0 80 56" className="h-14 w-20" aria-hidden>
        <rect x="14" y="18" width="52" height="14" rx="7" fill="#e4e4e7" stroke="#3f3f46" />
        <rect x="18" y="21" width="44" height="8" rx="4" fill="#18181b" />
        <path d="M38 8l6 10h-4l4 8-8-10h4z" fill="#0ea5e9" />
        <text x="40" y="50" textAnchor="middle" fontSize="7" fill="currentColor">
          TB 3/4
        </text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 80 56" className="h-14 w-20" aria-hidden>
      <rect x="18" y="14" width="44" height="24" rx="2" fill="#fafafa" stroke="#3f3f46" />
      <rect x="22" y="18" width="8" height="16" fill="#eab308" />
      <rect x="32" y="18" width="8" height="16" fill="#18181b" />
      <rect x="42" y="18" width="8" height="16" fill="#18181b" />
      <rect x="52" y="18" width="8" height="16" fill="#dc2626" />
      <text x="40" y="52" textAnchor="middle" fontSize="7" fill="currentColor">
        12V · GND · 5V
      </text>
    </svg>
  );
}

function WireSwatch({ id }: { id: WireId }) {
  const w = WIRES.find((x) => x.id === id)!;
  return (
    <span className="inline-flex items-center gap-1">
      <span
        className="relative inline-block h-3 w-5 overflow-hidden rounded-sm border"
        style={{ background: w.hex }}
      >
        {w.stripe ? (
          <span
            className="absolute inset-y-0 left-1/3 w-1"
            style={{ background: w.stripe }}
          />
        ) : null}
      </span>
      {w.label}
    </span>
  );
}

function PinRow({
  title,
  pins,
  onChange,
}: {
  title: string;
  pins: (WireId | "")[];
  onChange: (index: number, value: WireId | "") => void;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {title}
      </p>
      <div className="overflow-x-auto rounded-md border bg-zinc-950 p-3 text-zinc-100">
        <div className="mb-2 flex justify-center gap-1">
          {pins.map((p, i) => {
            const w = WIRES.find((x) => x.id === p);
            return (
              <div key={i} className="flex w-10 flex-col items-center gap-1">
                <span className="font-mono text-[10px] text-zinc-400">
                  {i + 1}
                </span>
                <span
                  className="h-10 w-3 rounded-sm border border-zinc-600"
                  style={{
                    background: w
                      ? w.stripe
                        ? `repeating-linear-gradient(90deg, ${w.hex} 0 4px, ${w.stripe} 4px 7px)`
                        : w.hex
                      : "#27272a",
                  }}
                />
              </div>
            );
          })}
        </div>
        <p className="mb-2 text-center font-mono text-[10px] text-zinc-500">
          RJ45 clip down · pin 1 left
        </p>
        <div className="grid gap-1 sm:grid-cols-2">
          {pins.map((p, i) => (
            <label key={i} className="flex items-center gap-2 text-xs">
              <span className="w-8 font-mono text-zinc-400">P{i + 1}</span>
              <select
                className="h-7 flex-1 rounded-md border border-zinc-700 bg-zinc-900 px-1 text-zinc-100"
                value={p}
                onChange={(e) =>
                  onChange(i, (e.target.value || "") as WireId | "")
                }
                aria-label={`${title} pin ${i + 1} color`}
              >
                <option value="">— select —</option>
                {WIRES.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.label}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CableLab({ lab, onSolved }: LabSimProps) {
  void lab;
  const { solved, markSolved } = useSolved(onSolved);
  const [guess, setGuess] = useState<Partial<Record<ConnId, string>>>({});
  const [end1, setEnd1] = useState<(WireId | "")[]>(Array(8).fill(""));
  const [end2, setEnd2] = useState<(WireId | "")[]>(Array(8).fill(""));
  const [guide, setGuide] = useState<"T568A" | "T568B">("T568B");

  const connectorsOk = CONNECTORS.every((c) => guess[c.id] === c.name);
  const std1 = matchStandard(end1);
  const std2 = matchStandard(end2);
  const terminationOk = std1 !== null || std2 !== null;
  const usedNames = new Set(Object.values(guess));

  const cableKind = useMemo(() => {
    if (!std1 || !std2) return null;
    if (std1 === std2) return "straight-through";
    return "crossover";
  }, [std1, std2]);

  function maybeSolve(
    nextGuess: Partial<Record<ConnId, string>>,
    a: (WireId | "")[],
    b: (WireId | "")[],
  ) {
    const connOk = CONNECTORS.every((c) => nextGuess[c.id] === c.name);
    if (connOk && (matchStandard(a) !== null || matchStandard(b) !== null)) {
      markSolved();
    }
  }

  function setPin(
    end: 1 | 2,
    index: number,
    value: WireId | "",
  ) {
    const copy = end === 1 ? [...end1] : [...end2];
    copy[index] = value;
    if (end === 1) setEnd1(copy);
    else setEnd2(copy);
    maybeSolve(guess, end === 1 ? copy : end1, end === 2 ? copy : end2);
  }

  const guideSeq = guide === "T568A" ? T568A : T568B;

  return (
    <div className="space-y-4 text-sm">
      <LabStatus
        solved={solved}
        mission="Identify all eight connectors and terminate at least one end to T568A or T568B."
      />

      <section className="space-y-2">
        <h3 className="font-medium">A. Connector museum</h3>
        <p className="text-xs text-muted-foreground">
          {connectorsOk
            ? "All eight connectors identified."
            : "Identify every connector. Names cannot be reused."}
        </p>
        <p className="text-xs text-muted-foreground">
          Match each shell. Thunderbolt uses a USB-C body plus a lightning mark —
          USB-C alone is not Thunderbolt.
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {CONNECTORS.map((c) => {
            const g = guess[c.id];
            const ok = g === c.name;
            const wrong = Boolean(g && !ok);
            return (
              <div
                key={c.id}
                className={`flex items-center gap-3 rounded-lg border p-2 ${
                  ok
                    ? "border-emerald-500/60"
                    : wrong
                      ? "border-destructive/60"
                      : ""
                }`}
              >
                <ConnectorGlyph id={c.id} />
                <div className="min-w-0 flex-1">
                  <label className="block text-xs text-muted-foreground">
                    Connector
                    <select
                      className="mt-1 h-8 w-full rounded-lg border border-input bg-background px-2 text-foreground"
                      value={g ?? ""}
                      onChange={(e) =>
                        setGuess((prev) => ({ ...prev, [c.id]: e.target.value }))
                      }
                      aria-label={`Name for ${c.blurb}`}
                    >
                      <option value="">— identify —</option>
                      {CONNECTORS.map((n) => (
                        <option
                          key={n.id}
                          value={n.name}
                          disabled={
                            usedNames.has(n.name) && guess[c.id] !== n.name
                          }
                        >
                          {n.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {ok ? "Correct. " : wrong ? "Not that name. " : ""}
                    {c.blurb}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground">
          {CONNECTORS.filter((c) => guess[c.id] === c.name).length}/8 identified.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="font-medium">B. T568A vs T568B termination</h3>
        <p className="text-xs text-muted-foreground">
          Same standard on both ends = straight-through (PC to switch). T568A on
          one end and T568B on the other = crossover (legacy PC-to-PC; modern
          NICs auto-MDIX). Pins 4/5 (blue pair) and 7/8 (brown pair) are identical
          on A and B — only the orange and green pairs swap.
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs">Guide sequence</span>
          <Button
            size="sm"
            variant={guide === "T568B" ? "default" : "outline"}
            onClick={() => setGuide("T568B")}
          >
            T568B
          </Button>
          <Button
            size="sm"
            variant={guide === "T568A" ? "default" : "outline"}
            onClick={() => setGuide("T568A")}
          >
            T568A
          </Button>
        </div>
        <ol className="flex flex-wrap gap-2 text-xs">
          {guideSeq.map((id, i) => (
            <li key={i} className="flex items-center gap-1 rounded border px-2 py-1">
              <span className="font-mono text-muted-foreground">{i + 1}</span>
              <WireSwatch id={id} />
            </li>
          ))}
        </ol>
        <div className="grid gap-3 md:grid-cols-2">
          <PinRow
            title="End 1"
            pins={end1}
            onChange={(i, v) => setPin(1, i, v)}
          />
          <PinRow
            title="End 2"
            pins={end2}
            onChange={(i, v) => setPin(2, i, v)}
          />
        </div>
        <div className="rounded-md border p-2 text-xs">
          <p>
            End 1:{" "}
            {std1 ? (
              <span className="text-emerald-700 dark:text-emerald-400">
                valid {std1}
              </span>
            ) : (
              <span className="text-muted-foreground">not a complete A or B sequence</span>
            )}
          </p>
          <p>
            End 2:{" "}
            {std2 ? (
              <span className="text-emerald-700 dark:text-emerald-400">
                valid {std2}
              </span>
            ) : (
              <span className="text-muted-foreground">not a complete A or B sequence</span>
            )}
          </p>
          {cableKind === "straight-through" ? (
            <p>Both ends {std1}: straight-through Ethernet cable.</p>
          ) : null}
          {cableKind === "crossover" ? (
            <p>
              One {std1} and one {std2}: crossover cable (A↔B).
            </p>
          ) : null}
          {terminationOk ? (
            <p className="mt-1 text-emerald-700 dark:text-emerald-400">
              Termination objective met (at least one correct T568A or T568B end).
            </p>
          ) : (
            <p className="mt-1 text-muted-foreground">
              Finish one end so pins 1–8 match T568A or T568B exactly. Do not reuse
              a color on the same end.
            </p>
          )}
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            setEnd1(Array(8).fill(""));
            setEnd2(Array(8).fill(""));
          }}
        >
          Clear both ends
        </Button>
        <p className="text-[11px] text-muted-foreground">
          Punch from memory: T568B is WO, O, WG, Bl, WBl, G, WBr, Br. T568A swaps
          the orange and green pairs.
        </p>
      </section>
    </div>
  );
}
