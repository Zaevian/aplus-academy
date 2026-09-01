"use client";

import { useMemo, useState, type ReactNode } from "react";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { useSolved, LabStatus } from "@/components/labs/lab-kit";
import { Button } from "@/components/ui/button";

type Phase = "label" | "identify" | "build" | "fault";
type PartId = "cpu" | "ram" | "atx24" | "eps" | "m2" | "pcie";
type SlotId =
  | "cpu"
  | "a1"
  | "a2"
  | "b1"
  | "b2"
  | "atx24"
  | "eps"
  | "m2"
  | "x16"
  | "x1";
type Piece = "cpu" | "ram1" | "ram2" | "atx24" | "eps" | "nvme" | "gpu";
type HotspotId = SlotId | "ram";

const PARTS: { id: PartId; name: string; hint: string }[] = [
  {
    id: "cpu",
    name: "CPU socket (AM5 / LGA 1700)",
    hint: "Square ILM in the upper-left. Pin-1 triangle marks orientation.",
  },
  {
    id: "ram",
    name: "Dual-channel DIMM slots (A2 / B2)",
    hint: "Matching-color slots. A 2-stick kit seats in A2 and B2, not A1 alone.",
  },
  {
    id: "atx24",
    name: "24-pin ATX power",
    hint: "Main board power on the right edge. 20+4 keyed block.",
  },
  {
    id: "eps",
    name: "8-pin EPS CPU power",
    hint: "CPU VRM feed, usually top-left. 4+4 is still EPS.",
  },
  {
    id: "m2",
    name: "M.2 NVMe slot",
    hint: "Short 22×80 edge connector under the socket, not a SATA data port.",
  },
  {
    id: "pcie",
    name: "PCIe x16 slot",
    hint: "Long slot closest to the CPU. That is the primary GPU slot.",
  },
];

const LABEL_CHOICES = [
  "CPU socket (AM5 / LGA 1700)",
  "Dual-channel DIMM slots (A2 / B2)",
  "24-pin ATX power",
  "8-pin EPS CPU power",
  "M.2 NVMe slot",
  "PCIe x16 slot",
  "PCIe x1 slot",
  "SATA data port",
  "CMOS battery",
  "4-pin CPU fan header",
];

const IDENTIFY_QS: { id: PartId; prompt: string }[] = [
  { id: "cpu", prompt: "Which hotspot is the CPU socket (AM5 / LGA 1700)?" },
  { id: "pcie", prompt: "Which is the PCIe x16 slot?" },
  { id: "ram", prompt: "Which are the dual-channel DIMM slots (A2 / B2)?" },
  { id: "atx24", prompt: "Which is the 24-pin ATX power connector?" },
  { id: "eps", prompt: "Which is the 8-pin EPS CPU power connector?" },
  { id: "m2", prompt: "Which is the M.2 NVMe slot?" },
];

const PIECES: { id: Piece; label: string }[] = [
  { id: "cpu", label: "CPU (AM5 / LGA 1700)" },
  { id: "ram1", label: "DDR5 DIMM 1" },
  { id: "ram2", label: "DDR5 DIMM 2" },
  { id: "atx24", label: "24-pin ATX cable" },
  { id: "eps", label: "8-pin EPS cable" },
  { id: "nvme", label: "NVMe M.2 SSD" },
  { id: "gpu", label: "PCIe GPU" },
];

const EMPTY_SEATS: Record<SlotId, Piece | null> = {
  cpu: null,
  a1: null,
  a2: null,
  b1: null,
  b2: null,
  atx24: null,
  eps: null,
  m2: null,
  x16: null,
  x1: null,
};

const FAULTS: {
  id: string;
  title: string;
  symptom: string;
  seats: Record<SlotId, Piece | null>;
  prompt: string;
  options: { id: string; text: string; correct: boolean; why: string }[];
}[] = [
  {
    id: "no-eps",
    title: "Ticket 1 — fans spin, no POST",
    symptom:
      "24-pin is seated. EPS 8-pin is empty. Dual-channel RAM, NVMe, and GPU in x16 are already in.",
    seats: {
      cpu: "cpu",
      a1: null,
      a2: "ram1",
      b1: null,
      b2: "ram2",
      atx24: "atx24",
      eps: null,
      m2: "nvme",
      x16: "gpu",
      x1: null,
    },
    prompt: "What is the FIRST useful action?",
    options: [
      {
        id: "seat-eps",
        text: "Seat the 8-pin EPS CPU power connector",
        correct: true,
        why: "Modern CPUs take core power from EPS. 24-pin alone often yields fans-spin / no POST.",
      },
      {
        id: "replace-cpu",
        text: "Replace the CPU — it failed",
        correct: false,
        why: "You have not confirmed CPU power. Swap last, not first.",
      },
      {
        id: "reinstall-os",
        text: "Reinstall the operating system",
        correct: false,
        why: "There is no POST. The OS is not in the path yet.",
      },
      {
        id: "buy-psu",
        text: "Replace the PSU without reseating CPU power",
        correct: false,
        why: "An unplugged EPS looks like a dead PSU. Verify the connector first.",
      },
    ],
  },
  {
    id: "single-channel",
    title: "Ticket 2 — posts, but memory is slow",
    symptom:
      "Two DIMMs are both in channel A (A1 and A2). B2 is empty. Power and GPU look correct.",
    seats: {
      cpu: "cpu",
      a1: "ram1",
      a2: "ram2",
      b1: null,
      b2: null,
      atx24: "atx24",
      eps: "eps",
      m2: "nvme",
      x16: "gpu",
      x1: null,
    },
    prompt: "What is the FIRST useful action?",
    options: [
      {
        id: "move-b2",
        text: "Move one DIMM to B2 so A2/B2 (or A/B) run dual-channel",
        correct: true,
        why: "A1+A2 is one channel. Matching-color A2+B2 is the 2-stick dual-channel pair.",
      },
      {
        id: "buy-ram",
        text: "Buy two more DIMMs before checking slot colors",
        correct: false,
        why: "You already have two sticks. Populate both channels first.",
      },
      {
        id: "xmp-only",
        text: "Enable XMP/EXPO and ignore slot pairing",
        correct: false,
        why: "Profile speed does not create a second channel.",
      },
      {
        id: "replace-mobo",
        text: "Replace the motherboard",
        correct: false,
        why: "This is a population error, not a dead board.",
      },
    ],
  },
  {
    id: "gpu-x1",
    title: "Ticket 3 — no display, onboard video works",
    symptom:
      "The GPU is in the short PCIe x1 slot. The top x16 is empty. CPU power and RAM look correct.",
    seats: {
      cpu: "cpu",
      a1: null,
      a2: "ram1",
      b1: null,
      b2: "ram2",
      atx24: "atx24",
      eps: "eps",
      m2: "nvme",
      x16: null,
      x1: "gpu",
    },
    prompt: "What is the FIRST useful action?",
    options: [
      {
        id: "move-x16",
        text: "Move the GPU to the top PCIe x16 slot",
        correct: true,
        why: "x1 does not provide the lanes (or mechanical fit) a discrete GPU needs.",
      },
      {
        id: "drivers",
        text: "Install GPU drivers before checking the slot",
        correct: false,
        why: "No display from a card in x1 is a seating/path problem, not a driver problem.",
      },
      {
        id: "new-monitor",
        text: "Replace the monitor",
        correct: false,
        why: "Onboard video works, so the panel and cable are not the first suspect.",
      },
      {
        id: "cmos",
        text: "Clear CMOS as the first step",
        correct: false,
        why: "A card in the wrong slot is visible. Reseat it first.",
      },
    ],
  },
];

function hotspotPart(id: HotspotId): PartId | "x1" | "a1" | "b1" {
  if (id === "a2" || id === "b2" || id === "ram") return "ram";
  if (id === "x16") return "pcie";
  if (id === "x1") return "x1";
  if (id === "a1") return "a1";
  if (id === "b1") return "b1";
  return id;
}

function pieceLabel(p: Piece): string {
  return PIECES.find((x) => x.id === p)?.label ?? p;
}

function isRam(p: Piece | null): boolean {
  return p === "ram1" || p === "ram2";
}

function dualChannel(seats: Record<SlotId, Piece | null>): boolean {
  const a = isRam(seats.a1) || isRam(seats.a2);
  const b = isRam(seats.b1) || isRam(seats.b2);
  const n =
    Number(isRam(seats.a1)) +
    Number(isRam(seats.a2)) +
    Number(isRam(seats.b1)) +
    Number(isRam(seats.b2));
  return n >= 2 && a && b;
}

function buildOk(seats: Record<SlotId, Piece | null>): boolean {
  return (
    seats.cpu === "cpu" &&
    seats.atx24 === "atx24" &&
    seats.eps === "eps" &&
    seats.m2 === "nvme" &&
    seats.x16 === "gpu" &&
    seats.x1 !== "gpu" &&
    dualChannel(seats)
  );
}

function whyWrong(piece: Piece, slot: SlotId): string | null {
  if (piece === "cpu" && slot !== "cpu") {
    return "The CPU only seats in the AM5 / LGA 1700 socket. Pin-1 faces the triangle — it will not clip into a DIMM or PCIe slot.";
  }
  if (isRam(piece) && !["a1", "a2", "b1", "b2"].includes(slot)) {
    return "DIMMs go in the long memory slots. A2 and B2 are the matching-color dual-channel pair for a 2-stick kit.";
  }
  if (piece === "atx24" && slot !== "atx24") {
    return "The 24-pin ATX block is the wide connector on the right edge of the board, not the 8-pin EPS up by the CPU.";
  }
  if (piece === "eps" && slot !== "eps") {
    return "EPS is the 8-pin (4+4) CPU power next to the socket. The 24-pin will physically refuse this cable.";
  }
  if (piece === "nvme" && slot !== "m2") {
    return "An M.2 NVMe drive slides into the M.2 slot (usually under the socket). It is not a PCIe card unless you use an adapter — this sim has a native M.2.";
  }
  if (piece === "gpu" && slot === "x1") {
    return "That short slot is PCIe x1. A discrete GPU belongs in the top x16 — x1 has neither the lanes nor the length.";
  }
  if (piece === "gpu" && slot !== "x16") {
    return "The GPU seats in the primary (top) PCIe x16 slot, closest to the CPU.";
  }
  return null;
}

function Hotspot({
  label,
  title,
  selected,
  ok,
  seated,
  decoy,
  onClick,
  className,
  children,
}: {
  label: string;
  title: string;
  selected: boolean;
  ok?: boolean;
  seated?: string | null;
  decoy?: boolean;
  onClick: () => void;
  className: string;
  children?: ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      aria-pressed={selected}
      onClick={onClick}
      className={`absolute rounded border text-left leading-tight transition ${
        selected
          ? "border-amber-400 ring-2 ring-amber-400"
          : ok
            ? "border-emerald-400"
            : decoy
              ? "border-emerald-800/80"
              : "border-emerald-600/70 hover:border-amber-300"
      } ${className}`}
    >
      <span className="block px-1 pt-0.5 font-mono text-[9px] tracking-wide uppercase opacity-90">
        {label}
      </span>
      {seated ? (
        <span className="block truncate px-1 pb-0.5 text-[10px] text-amber-200">
          {seated}
        </span>
      ) : (
        children
      )}
    </button>
  );
}

function AtxBoard({
  selected,
  labeled,
  seats,
  onHotspot,
}: {
  selected: PartId | HotspotId | null;
  labeled: Partial<Record<PartId, boolean>>;
  seats: Record<SlotId, Piece | null>;
  onHotspot: (id: HotspotId) => void;
}) {
  const seatedName = (slot: SlotId) =>
    seats[slot] ? pieceLabel(seats[slot]!) : null;

  return (
    <div
      className="relative mx-auto aspect-[5/4] w-full max-w-xl overflow-hidden rounded-md border-2 border-emerald-900 bg-emerald-950 text-emerald-50 shadow-inner"
      role="img"
      aria-label="ATX motherboard with clickable CPU, DIMM, power, M.2, and PCIe parts"
    >
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <svg viewBox="0 0 400 320" className="h-full w-full">
          <path
            d="M20 20h360v280H20z"
            fill="none"
            stroke="#14532d"
            strokeWidth="1"
          />
          {[40, 80, 120, 160, 200, 240, 280, 320, 360].map((x) => (
            <line
              key={x}
              x1={x}
              y1="24"
              x2={x}
              y2="296"
              stroke="#166534"
              strokeWidth="0.4"
            />
          ))}
        </svg>
      </div>
      <div className="absolute top-8 left-0 h-36 w-2.5 rounded-r bg-zinc-400" />
      <div className="absolute top-2 left-3 font-mono text-[9px] tracking-widest text-emerald-400/80">
        ATX · 12V
      </div>
      <div className="absolute top-2 right-3 font-mono text-[9px] text-emerald-600">
        CHIPSET
      </div>

      <Hotspot
        label="EPS 8-pin"
        title="8-pin EPS CPU power"
        selected={selected === "eps"}
        ok={labeled.eps}
        seated={seatedName("eps")}
        onClick={() => onHotspot("eps")}
        className="top-[8%] left-[10%] h-[12%] w-[16%] bg-emerald-900/90"
      >
        <span className="grid grid-cols-4 gap-0.5 p-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="h-1.5 rounded-sm bg-yellow-200/80" />
          ))}
        </span>
      </Hotspot>

      <Hotspot
        label="AM5 / LGA1700"
        title="CPU socket (AM5 / LGA 1700)"
        selected={selected === "cpu"}
        ok={labeled.cpu}
        seated={seatedName("cpu")}
        onClick={() => onHotspot("cpu")}
        className="top-[22%] left-[12%] h-[30%] w-[30%] bg-zinc-800/90"
      >
        <span className="absolute top-1 left-1 h-0 w-0 border-t-8 border-r-8 border-t-amber-300 border-r-transparent" />
        <span className="mx-auto mt-3 block h-[55%] w-[70%] rounded-sm border border-zinc-500 bg-zinc-700" />
      </Hotspot>

      <Hotspot
        label="A1"
        title="DIMM A1 (channel A, not the 2-stick color)"
        selected={selected === "a1"}
        decoy
        seated={seatedName("a1")}
        onClick={() => onHotspot("a1")}
        className="top-[14%] left-[48%] h-[10%] w-[28%] bg-zinc-700/90"
      />
      <Hotspot
        label="A2"
        title="DIMM A2 (channel A, recommended color)"
        selected={selected === "a2" || selected === "ram"}
        ok={labeled.ram}
        seated={seatedName("a2")}
        onClick={() => onHotspot("a2")}
        className="top-[26%] left-[48%] h-[10%] w-[28%] bg-sky-800/90"
      />
      <Hotspot
        label="B1"
        title="DIMM B1 (channel B, not the 2-stick color)"
        selected={selected === "b1"}
        decoy
        seated={seatedName("b1")}
        onClick={() => onHotspot("b1")}
        className="top-[38%] left-[48%] h-[10%] w-[28%] bg-zinc-700/90"
      />
      <Hotspot
        label="B2"
        title="DIMM B2 (channel B, recommended color)"
        selected={selected === "b2" || selected === "ram"}
        ok={labeled.ram}
        seated={seatedName("b2")}
        onClick={() => onHotspot("b2")}
        className="top-[50%] left-[48%] h-[10%] w-[28%] bg-sky-800/90"
      />

      <Hotspot
        label="24-pin ATX"
        title="24-pin ATX power"
        selected={selected === "atx24"}
        ok={labeled.atx24}
        seated={seatedName("atx24")}
        onClick={() => onHotspot("atx24")}
        className="top-[18%] right-[4%] h-[38%] w-[12%] bg-emerald-900/90"
      >
        <span className="grid grid-cols-2 gap-0.5 p-1">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className="h-1 rounded-sm bg-yellow-100/80" />
          ))}
        </span>
      </Hotspot>

      <Hotspot
        label="M.2 NVMe"
        title="M.2 NVMe slot"
        selected={selected === "m2"}
        ok={labeled.m2}
        seated={seatedName("m2")}
        onClick={() => onHotspot("m2")}
        className="top-[56%] left-[12%] h-[10%] w-[34%] bg-emerald-900/90"
      >
        <span className="mx-1 mt-1 block h-1.5 w-4/5 rounded-sm bg-zinc-300/80" />
      </Hotspot>

      <Hotspot
        label="PCIe x16"
        title="PCIe x16 slot"
        selected={selected === "x16" || selected === "pcie"}
        ok={labeled.pcie}
        seated={seatedName("x16")}
        onClick={() => onHotspot("x16")}
        className="top-[70%] left-[10%] h-[10%] w-[72%] bg-sky-950/90"
      >
        <span className="mx-2 mt-2 block h-2 rounded-sm bg-black/60" />
      </Hotspot>

      <Hotspot
        label="PCIe x1"
        title="PCIe x1 slot"
        selected={selected === "x1"}
        decoy
        seated={seatedName("x1")}
        onClick={() => onHotspot("x1")}
        className="top-[84%] left-[10%] h-[10%] w-[28%] bg-zinc-800/90"
      >
        <span className="mx-2 mt-2 block h-2 w-10 rounded-sm bg-black/60" />
      </Hotspot>

      <div className="pointer-events-none absolute top-[58%] right-[18%] h-8 w-10 rounded-sm border border-emerald-800 bg-emerald-900/50 text-center font-mono text-[8px] leading-8 text-emerald-600">
        PCH
      </div>
      <div className="pointer-events-none absolute right-[4%] bottom-[8%] font-mono text-[8px] text-emerald-700">
        SATA 0–3
      </div>
    </div>
  );
}

export function MotherboardLab({ lab, onSolved }: LabSimProps) {
  void lab;
  const { solved, markSolved } = useSolved(onSolved);
  const [phase, setPhase] = useState<Phase>("label");
  const [passed, setPassed] = useState({
    label: false,
    identify: false,
    build: false,
    fault: false,
  });

  const [labels, setLabels] = useState<Partial<Record<PartId, string>>>({});
  const [labelPick, setLabelPick] = useState<PartId | null>(null);
  const [labelMsg, setLabelMsg] = useState("");

  const [qIndex, setQIndex] = useState(0);
  const [identifyMsg, setIdentifyMsg] = useState("");

  const [held, setHeld] = useState<Piece | null>(null);
  const [seats, setSeats] = useState<Record<SlotId, Piece | null>>(EMPTY_SEATS);
  const [buildMsg, setBuildMsg] = useState(
    "Pick a part, then click a slot. A2 and B2 are the colored dual-channel pair.",
  );

  const [faultIndex, setFaultIndex] = useState(0);
  const [faultMsg, setFaultMsg] = useState("");
  const [faultSolved, setFaultSolved] = useState<boolean[]>([
    false,
    false,
    false,
  ]);

  const labeledFlags = useMemo(() => {
    const o: Partial<Record<PartId, boolean>> = {};
    for (const p of PARTS) o[p.id] = labels[p.id] === p.name;
    return o;
  }, [labels]);

  const boardSeats =
    phase === "fault" ? FAULTS[faultIndex]!.seats : phase === "build" ? seats : EMPTY_SEATS;

  function passPhase(key: Phase, extra?: Partial<typeof passed>) {
    const next = { ...passed, ...extra, [key]: true };
    setPassed(next);
    if (next.label && next.identify && next.build && next.fault) markSolved();
  }

  function clickLabel(id: HotspotId) {
    const part = hotspotPart(id);
    if (part === "x1") {
      setLabelPick(null);
      setLabelMsg(
        "That short slot is PCIe x1 — a decoy. The long slot above it is x16.",
      );
      return;
    }
    if (part === "a1" || part === "b1") {
      setLabelPick(null);
      setLabelMsg(
        `${part.toUpperCase()} is a DIMM slot, but not the recommended 2-stick pair. Click the matching-color A2 or B2.`,
      );
      return;
    }
    setLabelPick(part);
    setLabelMsg(`Selected: ${PARTS.find((p) => p.id === part)?.hint}`);
  }

  function chooseName(name: string) {
    if (!labelPick) {
      setLabelMsg("Click a part on the board first.");
      return;
    }
    const truth = PARTS.find((p) => p.id === labelPick)!;
    setLabels((prev) => ({ ...prev, [labelPick]: name }));
    if (name === truth.name) {
      const next = { ...labels, [labelPick]: name };
      const all = PARTS.every((p) => next[p.id] === p.name);
      setLabelMsg(`Correct: ${truth.name}.`);
      if (all) passPhase("label");
    } else {
      setLabelMsg(`Not ${name}. ${truth.hint}`);
    }
  }

  function clickIdentify(id: HotspotId) {
    if (passed.identify) return;
    const need = IDENTIFY_QS[qIndex];
    if (!need) return;
    const part = hotspotPart(id);
    if (part === need.id) {
      const next = qIndex + 1;
      if (next >= IDENTIFY_QS.length) {
        setIdentifyMsg("All six hotspots identified.");
        passPhase("identify");
      } else {
        setQIndex(next);
        setIdentifyMsg("Correct. Next target.");
      }
      return;
    }
    if (part === "x1") {
      setIdentifyMsg(
        "That is PCIe x1 — not x16. x16 is the long slot nearest the CPU.",
      );
      return;
    }
    if (part === "a1" || part === "b1") {
      setIdentifyMsg(
        `${part.toUpperCase()} is single-kit leftover color. Dual-channel for two sticks is A2/B2.`,
      );
      return;
    }
    const clicked =
      typeof part === "string" && PARTS.some((p) => p.id === part)
        ? PARTS.find((p) => p.id === part)!.name
        : id;
    setIdentifyMsg(`That is ${clicked}. ${need.prompt}`);
  }

  function clickBuild(id: HotspotId) {
    const slot: SlotId | null =
      id === "ram" ? null : (id as SlotId);
    if (!slot) return;

    if (!held) {
      const there = seats[slot];
      if (there) {
        setSeats((s) => ({ ...s, [slot]: null }));
        setHeld(there);
        setBuildMsg(`Unseated ${pieceLabel(there)}. Click a slot to place it.`);
      }
      return;
    }

    const reason = whyWrong(held, slot);
    if (reason) {
      setBuildMsg(reason);
      return;
    }
    if (seats[slot]) {
      setBuildMsg(`That slot already has ${pieceLabel(seats[slot]!)}. Unseat it first.`);
      return;
    }
    const next = { ...seats, [slot]: held };
    if (
      isRam(held) &&
      isRam(next.a1) &&
      isRam(next.a2) &&
      !isRam(next.b1) &&
      !isRam(next.b2)
    ) {
      setSeats(next);
      setHeld(null);
      setBuildMsg(
        "Both sticks are in channel A (A1+A2). That is single-channel. Move one stick to B2.",
      );
      return;
    }
    setSeats(next);
    setHeld(null);
    if (buildOk(next)) {
      setBuildMsg(
        "Build complete: CPU, dual-channel RAM, 24-pin + EPS, NVMe in M.2, GPU in top x16.",
      );
      passPhase("build");
    } else if (held === "gpu" && slot === "x16") {
      setBuildMsg("GPU seated in the primary x16 slot.");
    } else if (isRam(held) && dualChannel(next)) {
      setBuildMsg("RAM now spans channel A and channel B (dual-channel).");
    } else {
      setBuildMsg(`${pieceLabel(held)} seated in ${slot.toUpperCase()}.`);
    }
  }

  function onBoard(id: HotspotId) {
    if (phase === "label") clickLabel(id);
    else if (phase === "identify") clickIdentify(id);
    else if (phase === "build") clickBuild(id);
  }

  const fault = FAULTS[faultIndex]!;
  const labelCount = PARTS.filter((p) => labels[p.id] === p.name).length;

  return (
    <div className="space-y-3 text-sm">
      <LabStatus
        solved={solved}
        mission="Pass all four phases: Label, Identify, Build, and Fault."
      />
      <div className="flex flex-wrap gap-1">
        {(["label", "identify", "build", "fault"] as Phase[]).map((p) => (
          <Button
            key={p}
            size="sm"
            variant={phase === p ? "default" : "outline"}
            onClick={() => setPhase(p)}
          >
            {p[0]!.toUpperCase() + p.slice(1)}
            {passed[p] ? " ✓" : ""}
          </Button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Sky slots A2/B2 are the dual-channel pair. The short slot is x1 (decoy).
        Socket silkscreen: AM5 / LGA 1700.
      </p>
      <AtxBoard
        selected={phase === "label" ? labelPick : null}
        labeled={phase === "label" || phase === "identify" ? labeledFlags : {}}
        seats={boardSeats}
        onHotspot={onBoard}
      />

      {phase === "label" ? (
        <div className="space-y-2">
          <p>
            Click a part, then pick its name. {labelCount}/6 labeled.
            {passed.label ? " Phase complete." : ""}
          </p>
          <p className="text-muted-foreground">{labelMsg || "Select a hotspot."}</p>
          <div className="flex flex-wrap gap-1">
            {LABEL_CHOICES.map((name) => (
              <Button
                key={name}
                size="sm"
                variant={
                  labelPick && labels[labelPick] === name ? "default" : "outline"
                }
                onClick={() => chooseName(name)}
              >
                {name}
              </Button>
            ))}
          </div>
        </div>
      ) : null}

      {phase === "identify" ? (
        <div className="space-y-2">
          <p className="font-medium">
            {passed.identify
              ? "Identify complete."
              : IDENTIFY_QS[qIndex]?.prompt}
          </p>
          <p className="text-muted-foreground">
            {identifyMsg || "Click the matching hotspot on the board."} Question{" "}
            {Math.min(qIndex + 1, IDENTIFY_QS.length)}/{IDENTIFY_QS.length}.
          </p>
        </div>
      ) : null}

      {phase === "build" ? (
        <div className="space-y-2">
          <p className="text-muted-foreground">{buildMsg}</p>
          <div className="flex flex-wrap gap-1">
            {PIECES.map((p) => {
              const used = Object.values(seats).includes(p.id);
              return (
                <Button
                  key={p.id}
                  size="sm"
                  variant={held === p.id ? "default" : "outline"}
                  disabled={used}
                  onClick={() => {
                    setHeld(p.id);
                    setBuildMsg(`Holding ${p.label}. Click a slot.`);
                  }}
                >
                  {p.label}
                </Button>
              );
            })}
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setSeats(EMPTY_SEATS);
                setHeld(null);
                setPassed((p) => ({ ...p, build: false }));
                setBuildMsg("Board cleared.");
              }}
            >
              Clear board
            </Button>
          </div>
          <ul className="grid gap-1 text-xs text-muted-foreground sm:grid-cols-2">
            <li>CPU {seats.cpu ? "seated" : "empty"}</li>
            <li>
              RAM{" "}
              {dualChannel(seats)
                ? "dual-channel"
                : isRam(seats.a1) || isRam(seats.a2) || isRam(seats.b1) || isRam(seats.b2)
                  ? "not dual-channel yet"
                  : "empty"}
            </li>
            <li>24-pin {seats.atx24 ? "seated" : "empty"}</li>
            <li>EPS {seats.eps ? "seated" : "empty"}</li>
            <li>NVMe {seats.m2 ? "in M.2" : "empty"}</li>
            <li>GPU {seats.x16 ? "in x16" : seats.x1 ? "in x1 (wrong)" : "empty"}</li>
          </ul>
          {passed.build ? (
            <p className="text-emerald-700 dark:text-emerald-400">
              Build phase complete.
            </p>
          ) : null}
        </div>
      ) : null}

      {phase === "fault" ? (
        <div className="space-y-2">
          <p className="font-medium">{fault.title}</p>
          <p className="text-muted-foreground">{fault.symptom}</p>
          <p>{fault.prompt}</p>
          <div className="grid gap-1">
            {fault.options.map((opt) => (
              <Button
                key={opt.id}
                size="sm"
                variant="outline"
                className="h-auto whitespace-normal py-2 text-left"
                disabled={faultSolved[faultIndex]}
                onClick={() => {
                  if (opt.correct) {
                    const next = [...faultSolved];
                    next[faultIndex] = true;
                    setFaultSolved(next);
                    setFaultMsg(opt.why);
                    if (next.every(Boolean)) passPhase("fault");
                  } else {
                    setFaultMsg(opt.why);
                  }
                }}
              >
                {opt.text}
              </Button>
            ))}
          </div>
          <p className="text-muted-foreground">{faultMsg}</p>
          <div className="flex flex-wrap gap-1">
            {FAULTS.map((f, i) => (
              <Button
                key={f.id}
                size="sm"
                variant={faultIndex === i ? "default" : "outline"}
                onClick={() => {
                  setFaultIndex(i);
                  setFaultMsg("");
                }}
              >
                Ticket {i + 1}
                {faultSolved[i] ? " ✓" : ""}
              </Button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
