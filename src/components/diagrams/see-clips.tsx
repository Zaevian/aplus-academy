"use client";

import { MotionClip } from "@/components/diagrams/motion-clip";

const T568A = ["WG", "G", "WO", "Bl", "BlW", "O", "BrW", "Br"] as const;
const HEX: Record<string, string> = {
  WG: "#86efac",
  G: "#16a34a",
  WO: "#fdba74",
  O: "#ea580c",
  Bl: "#2563eb",
  BlW: "#93c5fd",
  BrW: "#d6b894",
  Br: "#7c4a1e",
};

export function T568Diagram() {
  return (
    <MotionClip
      title="T568A / T568B pair swap"
      alt="Pins 1-8 stay numbered. Orange and green pairs swap between T568A and T568B."
      caption="Only the orange and green pairs move. Pins 4–5 (blue) and 7–8 (brown) stay. Both ends the same standard = straight-through."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p className="mb-2 text-xs font-medium">T568A (reference)</p>
          <div className="flex gap-1">
            {T568A.map((w, i) => (
              <div key={`a${i}`} className="flex flex-1 flex-col items-center gap-1">
                <div className="h-14 w-full rounded-sm border" style={{ background: HEX[w] }} />
                <span className="text-[10px] tabular-nums">{i + 1}</span>
                <span className="text-[10px]">{w}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs font-medium">T568B — orange/green swap</p>
          <div className="relative flex h-14 gap-1">
            {T568A.map((w, i) => {
              const dx =
                i === 0 ? "75%" : i === 1 ? "150%" : i === 2 ? "-150%" : i === 5 ? "-75%" : "0px";
              const moves = i === 0 || i === 1 || i === 2 || i === 5;
              return (
                <div
                  key={`b${i}`}
                  className={`absolute top-0 h-14 w-[12%] rounded-sm border ${moves ? "see-anim" : ""}`}
                  style={{
                    left: `${i * 12.5}%`,
                    background: HEX[w],
                    animationName: moves ? "see-t568-swap" : undefined,
                    ["--see-dx" as string]: dx,
                  }}
                />
              );
            })}
          </div>
          <div className="mt-1 flex gap-1">
            {Array.from({ length: 8 }, (_, i) => (
              <span key={i} className="flex-1 text-center text-[10px] tabular-nums">
                {i + 1}
              </span>
            ))}
          </div>
          <p className="mt-1 text-[10px] text-muted-foreground">
            After swap: 1 WO · 2 O · 3 WG · 4 Bl · 5 BlW · 6 G · 7 BrW · 8 Br
          </p>
        </div>
      </div>
    </MotionClip>
  );
}

export function RaidArrayDiagram() {
  return (
    <MotionClip
      title="RAID 0 stripe vs RAID 1 copy"
      alt="Cartoon blocks A1 and A2. Disk 2 fails: RAID 0 empty, RAID 1 still shows A1. RAID is not a backup."
      caption="RAID is not a backup. A deleted file is gone on every member."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p className="text-xs font-medium">RAID 0 — stripe</p>
          <div className="mt-2 flex gap-2">
            <div className="flex-1 rounded border p-2 text-center text-xs">
              Disk 1
              <div className="mt-1 rounded bg-muted py-2 font-mono">A1</div>
            </div>
            <div className="see-anim flex-1 rounded border p-2 text-center text-xs" style={{ animationName: "see-fail-red" }}>
              Disk 2 FAIL
              <div className="see-anim mt-1 rounded bg-muted py-2 font-mono" style={{ animationName: "see-empty" }}>
                A2
              </div>
            </div>
          </div>
          <p className="see-anim mt-2 text-center text-xs font-medium text-destructive" style={{ animationName: "see-empty" }}>
            Volume empty — missing stripe
          </p>
        </div>
        <div>
          <p className="text-xs font-medium">RAID 1 — copy</p>
          <div className="mt-2 flex gap-2">
            <div className="flex-1 rounded border p-2 text-center text-xs">
              Disk 1
              <div className="mt-1 rounded bg-muted py-2 font-mono">A1</div>
            </div>
            <div className="see-anim flex-1 rounded border p-2 text-center text-xs" style={{ animationName: "see-fail-red" }}>
              Disk 2 FAIL
              <div className="see-anim mt-1 rounded bg-muted py-2 font-mono" style={{ animationName: "see-empty" }}>
                A1
              </div>
            </div>
          </div>
          <p className="mt-2 text-center text-xs font-medium">
            Volume still serves A1 (degraded). Not yesterday&apos;s copy.
          </p>
        </div>
      </div>
      <RaidDegradedStrip />
      <div className="mt-3 grid gap-1 text-[10px] text-muted-foreground sm:grid-cols-2">
        <p>RAID 5: stripe + 1 parity. One disk can die.</p>
        <p>RAID 6: two parity. Two disks can die.</p>
        <p>RAID 10: striped mirrors. Pair math is in the RAID lab.</p>
        <p>RAID is not a backup.</p>
      </div>
    </MotionClip>
  );
}

export function RaidDegradedStrip() {
  return (
    <div className="mt-3 flex items-center gap-2 rounded border px-2 py-2 text-xs">
      <span className="see-anim rounded border px-2 py-1 font-mono" style={{ animationName: "see-fail-red" }}>
        Disk 2
      </span>
      <span className="rounded bg-amber-500/20 px-2 py-1 font-semibold tracking-wide">
        DEGRADED
      </span>
      <span className="text-muted-foreground">One labeled disk failed. Array still up on RAID 1/5/10 until extra failures. RAID 10 pair math is in the RAID lab.</span>
    </div>
  );
}

export function WifiBandDiagram() {
  return (
    <MotionClip
      title="2.4 / 5 / 6 GHz reach"
      alt="Three labeled circles. 2.4 GHz largest, 6 GHz smallest. 6 GHz needs Wi-Fi 6E radios."
      caption="6 GHz needs Wi-Fi 6E radios. No fake dBm heatmap."
    >
      <div className="relative mx-auto grid h-48 w-48 place-items-center">
        {[
          { label: "2.4 GHz", size: "11.5rem", delay: "0s" },
          { label: "5 GHz", size: "7.5rem", delay: "0.35s" },
          { label: "6 GHz", size: "4.25rem", delay: "0.7s" },
        ].map((b) => (
          <div
            key={b.label}
            className="see-anim absolute rounded-full border-2 border-foreground/70"
            style={{
              width: b.size,
              height: b.size,
              animationName: "see-grow",
              animationDelay: b.delay,
            }}
          >
            <span className="absolute top-1 left-1/2 -translate-x-1/2 bg-card px-1 text-[10px] font-medium">
              {b.label}
            </span>
          </div>
        ))}
      </div>
    </MotionClip>
  );
}

export function SpectrumDiagram() {
  return <WifiBandDiagram />;
}

export function ApipaTerminalDiagram() {
  return (
    <MotionClip
      title="DHCP fail → APIPA"
      alt="Stylized terminal: DHCP fails, then one IPv4 line 169.254.x.x"
      caption="One IPv4 line. 169.254.0.0/16 is link-local. No useful default gateway."
    >
      <div className="rounded-md bg-zinc-950 p-3 font-mono text-xs text-zinc-100">
        <p className="text-zinc-500">C:\Users\tech&gt; ipconfig /renew</p>
        <p className="see-anim overflow-hidden whitespace-nowrap" style={{ animationName: "see-type", animationDuration: "3s" }}>
          DHCP failed. No server responded.
        </p>
        <p
          className="see-anim mt-2 overflow-hidden whitespace-nowrap"
          style={{ animationName: "see-type", animationDelay: "2.2s", animationDuration: "4s" }}
        >
          IPv4 Address . . . . . . . . : 169.254.x.x
        </p>
      </div>
    </MotionClip>
  );
}

export function Ipv4Diagram() {
  return <ApipaTerminalDiagram />;
}

export function ConnectorGallery() {
  const ports = [
    { id: "hdmi", label: "HDMI" },
    { id: "dp", label: "DisplayPort" },
    { id: "vga", label: "VGA" },
  ];
  return (
    <MotionClip
      title="Video plugs and USB orientation"
      alt="HDMI, DisplayPort, and VGA each seat only in the matching port. USB-A trident-up; USB-C either way."
      caption="Geometry is the label. USB-C is a shell, not a protocol."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p className="mb-2 text-xs font-medium">Each plug only seats in its port</p>
          <div className="flex justify-around gap-2">
            {ports.map((p) => (
              <div key={p.id} className="flex flex-col items-center gap-2">
                <div
                  className="see-anim h-8 w-12 rounded-sm border bg-muted"
                  style={{ animationName: "see-seat" }}
                />
                <div className="h-4 w-14 rounded-sm border-2 border-dashed text-center text-[9px] leading-4">
                  {p.label}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-2 text-[10px] text-muted-foreground">
            HDMI trapezoid · DP one keyed corner · VGA 15-pin DE-15. A miss lifts back out.
          </p>
        </div>
        <div>
          <p className="mb-2 text-xs font-medium">USB-A trident-up vs USB-C either way</p>
          <div className="flex justify-around">
            <div className="text-center">
              <div
                className="see-anim mx-auto h-6 w-10 rounded-sm border bg-muted"
                style={{ animationName: "see-flip" }}
              />
              <p className="mt-1 text-[10px]">USB-A · trident up</p>
            </div>
            <div className="text-center">
              <div
                className="see-anim mx-auto h-5 w-8 rounded-full border bg-muted"
                style={{ animationName: "see-seat" }}
              />
              <p className="mt-1 text-[10px]">USB-C · either way</p>
            </div>
          </div>
        </div>
      </div>
    </MotionClip>
  );
}

export function CartridgeSlideDiagram() {
  return (
    <MotionClip
      title="Inkjet cartridge vs laser toner"
      alt="Inkjet cartridge and laser toner cartridge slide into different bays. Not the 7-step laser process."
      caption="Consumable seating only. The 7-step laser process stays on the still diagram."
    >
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded border p-2">
          <p className="text-xs font-medium">Inkjet bay</p>
          <div className="relative mt-2 h-16 overflow-hidden rounded bg-muted">
            <div
              className="see-anim absolute top-3 left-2 h-10 w-16 rounded border bg-card text-center text-[10px] leading-10"
              style={{ animationName: "see-slide-in" }}
            >
              Ink
            </div>
          </div>
        </div>
        <div className="rounded border p-2">
          <p className="text-xs font-medium">Laser toner bay</p>
          <div className="relative mt-2 h-16 overflow-hidden rounded bg-muted">
            <div
              className="see-anim absolute top-2 left-2 h-12 w-24 rounded border bg-card text-center text-[10px] leading-12"
              style={{ animationName: "see-slide-in", animationDelay: "0.4s" }}
            >
              Toner
            </div>
          </div>
        </div>
      </div>
    </MotionClip>
  );
}

export function LaserPrinterDiagram() {
  const steps = [
    "Processing",
    "Charging",
    "Exposing",
    "Developing",
    "Transferring",
    "Fusing",
    "Cleaning",
  ];
  return (
    <MotionClip
      title="Laser process (still)"
      alt="Seven-step laser imaging process as a labeled still. Not animated."
      caption="Still diagram. Do not treat a generated video of internals as the process."
    >
      <ol className="grid gap-1 text-xs md:grid-cols-2">
        {steps.map((s, i) => (
          <li key={s} className="rounded border px-2 py-1">
            {i + 1}. {s}
          </li>
        ))}
      </ol>
    </MotionClip>
  );
}

export function HddFormFactorDiagram() {
  return (
    <MotionClip
      title="HDD 3.5 vs 2.5"
      alt="3.5-inch and 2.5-inch drive outlines next to a millimeter ruler."
      caption="3.5-inch desktop/NAS. 2.5-inch laptop/caddy. Size is not the same as SSD."
    >
      <div className="flex items-end gap-3">
        <div className="w-28 rounded border p-2 text-center text-[10px]">
          <div className="mx-auto h-24 w-20 rounded-sm border bg-muted" />
          3.5 in
        </div>
        <div className="w-20 rounded border p-2 text-center text-[10px]">
          <div className="mx-auto h-14 w-12 rounded-sm border bg-muted" />
          2.5 in
        </div>
        <div className="mb-2 flex h-28 w-6 flex-col justify-between border-l text-[9px] text-muted-foreground">
          <span>0</span>
          <span>50</span>
          <span>100 mm</span>
        </div>
      </div>
    </MotionClip>
  );
}

export function PrivacyShutterDiagram() {
  return (
    <MotionClip
      title="Privacy shutter"
      alt="Webcam LED on, shutter closes, LED off. Hardware cover the OS cannot override."
      caption="LED on with an open shutter. Closed shutter, LED off. Not a driver reinstall."
    >
      <div className="mx-auto w-48 rounded-lg border p-3">
        <div className="relative mx-auto h-12 w-20 overflow-hidden rounded bg-zinc-800">
          <div className="absolute top-1/2 left-1/2 size-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-500" />
          <div
            className="see-anim absolute inset-y-0 left-0 w-full bg-zinc-300"
            style={{ animationName: "see-shutter" }}
          />
        </div>
        <div className="mt-2 flex items-center justify-center gap-2 text-[10px]">
          <span
            className="see-anim size-2 rounded-full"
            style={{ animationName: "see-led" }}
          />
          Webcam LED
        </div>
      </div>
    </MotionClip>
  );
}

export function AtxEpsSeatDiagram() {
  return (
    <MotionClip
      title="24-pin then EPS"
      alt="Labeled 24-pin ATX seats, then 8-pin CPU EPS seats. Labels are HTML, not video text."
      caption="24-pin is board power. CPU / EPS is the 8-pin near the socket. Both must seat."
    >
      <div className="relative h-36 rounded border">
        <span className="absolute top-2 left-2 text-[10px]">Motherboard</span>
        <div className="absolute bottom-4 left-6 h-6 w-28 rounded-sm border-2">
          <span className="absolute -top-4 left-0 text-[10px] font-medium">24-pin</span>
        </div>
        <div
          className="see-anim absolute bottom-4 left-6 h-6 w-28 rounded-sm bg-foreground/20"
          style={{ animationName: "see-seat" }}
        />
        <div className="absolute top-10 left-8 h-5 w-10 rounded-sm border-2">
          <span className="absolute -top-4 left-0 text-[10px] font-medium">CPU / EPS</span>
        </div>
        <div
          className="see-anim absolute top-10 left-8 h-5 w-10 rounded-sm bg-foreground/20"
          style={{ animationName: "see-seat", animationDelay: "1.2s" }}
        />
      </div>
    </MotionClip>
  );
}

export function DimmSeatDiagram() {
  return (
    <MotionClip
      title="DIMM click"
      alt="DDR DIMM aligns to the notch; both latches close. Overlay DIMM."
      caption="Notch first. Both latches close. Overlay: DIMM."
    >
      <div className="relative mx-auto h-28 w-56">
        <div className="absolute bottom-6 left-4 right-4 h-3 rounded-sm border" />
        <div
          className="see-anim absolute bottom-8 left-8 right-8 h-10 rounded-sm border bg-muted text-center text-[10px] leading-10"
          style={{ animationName: "see-seat" }}
        >
          DIMM
        </div>
        <div
          className="see-anim absolute bottom-4 left-2 h-8 w-2 origin-bottom border bg-card"
          style={{ animationName: "see-latch" }}
        />
        <div
          className="see-anim absolute right-2 bottom-4 h-8 w-2 origin-bottom border bg-card"
          style={{ animationName: "see-latch" }}
        />
      </div>
    </MotionClip>
  );
}

export function SodimmSeatDiagram() {
  return (
    <MotionClip
      title="SODIMM angle vs DIMM scale"
      alt="SODIMM at about 30 degrees then flat. Larger DIMM beside for scale."
      caption="SODIMM starts angled, then clips flat. Desktop DIMM is longer. Do not force a DIMM into a laptop slot."
    >
      <div className="flex items-end justify-center gap-6">
        <div className="text-center">
          <div
            className="see-anim mx-auto h-8 w-24 origin-bottom rounded-sm border bg-muted text-[10px] leading-8"
            style={{ animationName: "see-angle" }}
          >
            SODIMM
          </div>
          <p className="mt-1 text-[10px]">~67 mm</p>
        </div>
        <div className="text-center">
          <div className="mx-auto h-10 w-40 rounded-sm border bg-muted/50 text-[10px] leading-10">
            DIMM
          </div>
          <p className="mt-1 text-[10px]">~133 mm</p>
        </div>
      </div>
    </MotionClip>
  );
}

export function DimmVsSodimmDiagram() {
  return <SodimmSeatDiagram />;
}

export function M2NvmeDiagram() {
  return (
    <MotionClip
      title="M.2 screw"
      alt="M.2 card at an angle, one screw. Overlay M.2. Caption: M.2 is the slot; NVMe is the protocol."
      caption="M.2 is the slot; NVMe is the protocol."
    >
      <div className="relative mx-auto h-24 w-64">
        <div className="absolute bottom-4 left-4 h-2 w-40 rounded-sm border" />
        <div
          className="see-anim absolute bottom-5 left-6 h-6 w-36 origin-left rounded-sm border bg-muted text-center text-[10px] leading-6"
          style={{ animationName: "see-angle" }}
        >
          M.2
        </div>
        <div className="absolute right-16 bottom-3 size-4 rounded-full border text-center text-[8px] leading-4">
          ✳
        </div>
      </div>
    </MotionClip>
  );
}

export function SataCablesDiagram() {
  return (
    <MotionClip
      title="SATA data vs SATA power"
      alt="Thin SATA data and wide SATA power both click. L-shaped data vs 15-pin power."
      caption="Thin L-shaped data. Wide 15-pin power. Both click. Not the same cable."
    >
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <p className="text-xs font-medium">SATA data</p>
          <div
            className="see-anim mt-2 h-4 w-28 rounded-sm border bg-muted"
            style={{ animationName: "see-seat" }}
          />
        </div>
        <div>
          <p className="text-xs font-medium">SATA power</p>
          <div
            className="see-anim mt-2 h-6 w-40 rounded-sm border bg-muted"
            style={{ animationName: "see-seat", animationDelay: "0.5s" }}
          />
        </div>
      </div>
    </MotionClip>
  );
}

export function Rj45CrimpDiagram() {
  return (
    <MotionClip
      title="RJ45 click then crimp"
      alt="RJ45 into a jack until the tab clicks; then a crimper on a plug. No tester LCD numbers."
      caption="Tab clicks in the jack. Crimp seats conductors. No invented tester numbers."
    >
      <div className="flex items-center gap-6">
        <div className="relative h-16 w-32">
          <div className="absolute right-0 bottom-2 h-8 w-10 rounded-sm border-2" />
          <div
            className="see-anim absolute bottom-3 left-0 h-6 w-16 rounded-sm border bg-muted text-center text-[10px] leading-6"
            style={{ animationName: "see-seat" }}
          >
            RJ45
          </div>
        </div>
        <div className="text-[10px] text-muted-foreground">then</div>
        <div className="rounded border px-2 py-3 text-center text-[10px]">
          Crimper
          <div className="mx-auto mt-1 h-3 w-14 rounded-sm border bg-muted" />
        </div>
      </div>
    </MotionClip>
  );
}

export function EsdStrapDiagram() {
  return (
    <MotionClip
      title="ESD wrist strap"
      alt="Wrist strap clip on unpainted chassis metal."
      caption="Clip on unpainted chassis metal or a grounded mat. Painted metal is not a ground."
    >
      <div className="flex items-center gap-3">
        <div className="rounded-full border px-3 py-4 text-[10px]">Wrist</div>
        <div className="h-px flex-1 border-t border-dashed" />
        <div className="rounded border-2 border-foreground px-2 py-3 text-center text-[10px]">
          Unpainted
          <br />
          chassis metal
        </div>
      </div>
    </MotionClip>
  );
}

export function UpsBrickDiagram() {
  return (
    <MotionClip
      title="UPS path"
      alt="Tower PC into a small UPS, UPS into wall, LED on battery."
      caption="PC → UPS → wall. LED: on battery. A surge strip is not a UPS."
    >
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded border px-2 py-2">Tower PC</span>
        <span>→</span>
        <span className="rounded border px-2 py-2">
          UPS
          <span
            className="see-anim ml-2 inline-block rounded px-1 text-[10px]"
            style={{ animationName: "see-led" }}
          >
            on battery
          </span>
        </span>
        <span>→</span>
        <span className="rounded border px-2 py-2">Wall</span>
      </div>
    </MotionClip>
  );
}

export function DriveShredDiagram() {
  return (
    <MotionClip
      title="Degauss / Wipe / Shred"
      alt="Three trays. A drive goes to shred; platters destroyed. Degauss is not for SSD."
      caption="This clip shows shred. Degauss is magnetic media. Wipe is reuse. RAID is not a destruction method."
    >
      <div className="relative">
        <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
          {["Degauss", "Wipe", "Shred"].map((t) => (
            <div key={t} className="h-20 rounded border p-1">
              {t}
            </div>
          ))}
        </div>
        <div
          className="see-anim absolute top-8 left-2 h-6 w-[28%] rounded-sm border bg-muted text-center leading-6"
          style={{ animationName: "see-move-shred" }}
        >
          HDD
        </div>
      </div>
    </MotionClip>
  );
}

export function PhishingHoverDiagram() {
  return (
    <MotionClip
      title="Displayed link vs real URL"
      alt="Fake email. Displayed text paypal.com versus real URL paypa1-secure.example. HTML overlays, not generated spelling."
      caption="Trust the real URL string in this HTML overlay, not any photoreal clip of an inbox."
    >
      <div className="rounded border p-3 text-xs">
        <p className="font-medium">From: PayPal Billing</p>
        <p className="mt-2">
          Displayed:{" "}
          <span className="rounded bg-muted px-1 font-mono">paypal.com</span>
        </p>
        <p className="mt-1">
          Real URL:{" "}
          <span className="rounded bg-destructive/10 px-1 font-mono">
            paypa1-secure.example
          </span>
        </p>
      </div>
    </MotionClip>
  );
}

export function PsuRailsDiagram() {
  return <AtxEpsSeatDiagram />;
}
