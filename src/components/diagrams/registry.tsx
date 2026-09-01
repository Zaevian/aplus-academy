"use client";

import type { CSSProperties, JSX, ReactNode } from "react";

function Frame({
  title,
  children,
  alt,
}: {
  title: string;
  children: ReactNode;
  alt: string;
}) {
  return (
    <figure className="overflow-hidden rounded-lg border bg-card">
      <div className="border-b px-3 py-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {title}
      </div>
      <div className="p-3" role="img" aria-label={alt}>
        {children}
      </div>
    </figure>
  );
}

function Bar({
  label,
  pct,
  note,
}: {
  label: string;
  pct: number;
  note?: string;
}) {
  return (
    <div className="grid grid-cols-[7.5rem_1fr_auto] items-center gap-2 text-xs">
      <span>{label}</span>
      <div className="h-2 rounded bg-muted">
        <div
          className="h-2 rounded bg-foreground/80"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="tabular-nums text-muted-foreground">
        {note ?? `${pct}%`}
      </span>
    </div>
  );
}

export function ExamMapDiagram() {
  return (
    <Frame title="A+ V15 map" alt="Core 1 and Core 2 domain weights">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <p className="text-sm font-medium">Core 1 · 220-1201</p>
          <Bar label="Mobile" pct={13} />
          <Bar label="Networking" pct={23} />
          <Bar label="Hardware" pct={25} />
          <Bar label="Virt / cloud" pct={11} />
          <Bar label="HW/net TS" pct={28} />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium">Core 2 · 220-1202</p>
          <Bar label="OS" pct={28} />
          <Bar label="Security" pct={28} />
          <Bar label="Software TS" pct={23} />
          <Bar label="Operations" pct={21} />
        </div>
      </div>
    </Frame>
  );
}

export function LearningCycleDiagram() {
  const steps = [
    "Read",
    "See",
    "Interact",
    "Check",
    "Checkpoint",
    "Domain 100%",
    "Review",
  ];
  return (
    <Frame title="Gating" alt="Learning cycle from reading to domain gate">
      <ol className="flex flex-wrap gap-2">
        {steps.map((s, i) => (
          <li
            key={s}
            className="flex items-center gap-2 rounded-md border px-2 py-1 text-xs"
          >
            <span className="tabular-nums text-muted-foreground">{i + 1}</span>
            {s}
          </li>
        ))}
      </ol>
    </Frame>
  );
}

export function StemDecoderDiagram() {
  return (
    <Frame title="Stem decoder" alt="BEST FIRST NEXT versus PBQ">
      <div className="grid gap-2 text-xs md:grid-cols-2">
        {[
          ["BEST", "Several actions work. Pick the most complete/professional."],
          ["FIRST", "Order. Often identify or make safe before replacing."],
          ["NEXT", "You already did something. Do not restart from zero."],
          ["PBQ", "Do the skill: configure, order, connect, type a command."],
        ].map(([k, v]) => (
          <div key={k} className="rounded-md border p-2">
            <div className="font-semibold">{k}</div>
            <p className="mt-1 leading-5 text-muted-foreground">{v}</p>
          </div>
        ))}
      </div>
    </Frame>
  );
}

export function TsMethodDiagram() {
  const steps = [
    "Identify",
    "Theory",
    "Test",
    "Plan / implement",
    "Verify",
    "Document",
  ];
  return (
    <Frame title="Job-practice loop" alt="Troubleshooting loop">
      <svg viewBox="0 0 360 120" className="h-auto w-full">
        {steps.map((s, i) => {
          const x = 20 + (i % 6) * 56;
          return (
            <g key={s}>
              <rect x={x} y={36} width={50} height={36} rx={4} fill="none" stroke="currentColor" />
              <text x={x + 25} y={58} textAnchor="middle" fontSize="8" fill="currentColor">
                {s}
              </text>
              {i < 5 ? (
                <path d={`M${x + 50} 54 L${x + 56} 54`} stroke="currentColor" markerEnd="url(#a)" />
              ) : null}
            </g>
          );
        })}
      </svg>
    </Frame>
  );
}

export function UnitsDiagram() {
  return (
    <Frame title="Units" alt="Bits bytes and prefixes">
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="border-b text-muted-foreground">
            <th className="py-1">Say</th>
            <th>Means</th>
            <th>Watch-out</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["bit (b)", "0 or 1", "Bandwidth is bits per second"],
            ["byte (B)", "8 bits", "File size is usually bytes"],
            ["Gbps", "10^9 bits/s", "1 Gbps ≈ 125 MB/s theoretical"],
            ["256 GB SSD", "often 256×10^9 bytes", "OS may show ~238 GiB"],
          ].map((row) => (
            <tr key={row[0]} className="border-b border-border/60">
              {row.map((c) => (
                <td key={c} className="py-1.5 pr-2">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Frame>
  );
}

export function RaidArrayDiagram() {
  const levels = [
    { name: "RAID 0", disks: ["A", "B", "C", "D"], note: "Stripe. Fail one = all gone." },
    { name: "RAID 1", disks: ["A", "A"], note: "Mirror. Fail one, data lives." },
    { name: "RAID 5", disks: ["A", "B", "P"], note: "Stripe + 1 parity." },
    { name: "RAID 6", disks: ["A", "B", "P", "Q"], note: "Two parity, two-disk fail." },
    { name: "RAID 10", disks: ["A", "A", "B", "B"], note: "Mirrored pairs, striped." },
  ];
  return (
    <Frame title="RAID at a glance" alt="RAID 0 1 5 6 10 block layout">
      <div className="space-y-3">
        {levels.map((l) => (
          <div key={l.name} className="flex flex-wrap items-center gap-2">
            <span className="w-16 text-xs font-medium">{l.name}</span>
            {l.disks.map((d, i) => (
              <span
                key={i}
                className="flex size-9 items-center justify-center rounded border font-mono text-xs"
              >
                {d}
              </span>
            ))}
            <span className="text-xs text-muted-foreground">{l.note}</span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

export function T568Diagram() {
  const a = ["G/W", "G", "O/W", "Bl", "Bl/W", "O", "Br/W", "Br"];
  const b = ["O/W", "O", "G/W", "Bl", "Bl/W", "G", "Br/W", "Br"];
  const color: Record<string, string> = {
    "G/W": "#86efac",
    G: "#16a34a",
    "O/W": "#fdba74",
    O: "#ea580c",
    Bl: "#2563eb",
    "Bl/W": "#93c5fd",
    "Br/W": "#d6b894",
    Br: "#7c4a1e",
  };
  return (
    <Frame title="T568A / T568B" alt="Eight-pin T568A and T568B wire order">
      <div className="grid gap-4 md:grid-cols-2">
        {[
          ["T568A", a],
          ["T568B", b],
        ].map(([name, wires]) => (
          <div key={name as string}>
            <p className="mb-2 text-xs font-medium">{name as string} pin 1→8</p>
            <div className="flex gap-1">
              {(wires as string[]).map((w, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-1">
                  <div
                    className="h-16 w-full rounded-sm border"
                    style={{ background: color[w] }}
                  />
                  <span className="text-[10px] tabular-nums">{i + 1}</span>
                  <span className="text-[10px]">{w}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

export function PacketFlowDiagram() {
  return (
    <Frame title="Name to packet" alt="Host to DNS to destination">
      <svg viewBox="0 0 520 90" className="h-auto w-full text-[11px]">
        {["PC", "Resolver", "DNS", "IP path", "Server"].map((l, i) => (
          <g key={l} transform={`translate(${20 + i * 100} 25)`}>
            <rect width="80" height="40" rx="4" fill="none" stroke="currentColor" />
            <text x="40" y="25" textAnchor="middle" fill="currentColor">
              {l}
            </text>
            {i < 4 ? (
              <line x1="80" y1="20" x2="100" y2="20" stroke="currentColor" />
            ) : null}
          </g>
        ))}
      </svg>
    </Frame>
  );
}

export function TcpUdpDiagram() {
  return (
    <Frame title="TCP vs UDP" alt="Reliability versus overhead">
      <div className="grid gap-3 text-xs md:grid-cols-2">
        <div className="rounded-md border p-3">
          <p className="font-medium">TCP</p>
          <p className="mt-1 text-muted-foreground">
            Handshake, acknowledgements, retransmission, ordered delivery. HTTPS, SSH, RDP.
          </p>
        </div>
        <div className="rounded-md border p-3">
          <p className="font-medium">UDP</p>
          <p className="mt-1 text-muted-foreground">
            No built-in reliability. DHCP, many real-time streams, some DNS queries.
          </p>
        </div>
      </div>
    </Frame>
  );
}

export function PortMapDiagram() {
  const rows = [
    ["20/21", "FTP"],
    ["22", "SSH"],
    ["23", "Telnet"],
    ["25", "SMTP"],
    ["53", "DNS"],
    ["67/68", "DHCP"],
    ["80", "HTTP"],
    ["110", "POP3"],
    ["143", "IMAP"],
    ["137-139", "NetBIOS"],
    ["389", "LDAP"],
    ["443", "HTTPS"],
    ["445", "SMB"],
    ["3389", "RDP"],
  ];
  return (
    <Frame title="Official 2.1 ports" alt="TCP UDP ports from 220-1201 objective 2.1">
      <div className="grid grid-cols-2 gap-1 text-xs md:grid-cols-4">
        {rows.map(([p, n]) => (
          <div key={p} className="flex justify-between rounded border px-2 py-1">
            <span className="font-mono">{p}</span>
            <span>{n}</span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

export function MotherboardDiagram() {
  return (
    <Frame title="ATX map" alt="Simplified motherboard regions">
      <svg viewBox="0 0 400 260" className="h-auto w-full">
        <rect x="8" y="8" width="384" height="244" rx="6" fill="none" stroke="currentColor" />
        <rect x="40" y="40" width="90" height="90" rx="4" fill="none" stroke="currentColor" />
        <text x="85" y="88" textAnchor="middle" fontSize="11" fill="currentColor">
          CPU
        </text>
        <rect x="150" y="40" width="28" height="110" fill="none" stroke="currentColor" />
        <rect x="184" y="40" width="28" height="110" fill="none" stroke="currentColor" />
        <text x="181" y="170" textAnchor="middle" fontSize="10" fill="currentColor">
          DIMM
        </text>
        <rect x="40" y="200" width="160" height="28" fill="none" stroke="currentColor" />
        <text x="120" y="218" textAnchor="middle" fontSize="10" fill="currentColor">
          24-pin ATX
        </text>
        <rect x="240" y="40" width="130" height="36" fill="none" stroke="currentColor" />
        <text x="305" y="62" textAnchor="middle" fontSize="10" fill="currentColor">
          PCIe x16
        </text>
        <rect x="240" y="90" width="90" height="28" fill="none" stroke="currentColor" />
        <text x="285" y="108" textAnchor="middle" fontSize="10" fill="currentColor">
          M.2
        </text>
        <rect x="240" y="140" width="70" height="18" fill="none" stroke="currentColor" />
        <rect x="240" y="164" width="70" height="18" fill="none" stroke="currentColor" />
        <text x="275" y="200" textAnchor="middle" fontSize="10" fill="currentColor">
          SATA
        </text>
      </svg>
    </Frame>
  );
}

export function HypervisorDiagram() {
  return (
    <Frame title="Type 1 vs Type 2" alt="Hypervisor stacks">
      <div className="grid gap-3 text-xs md:grid-cols-2">
        <div className="space-y-1">
          <div className="rounded border px-2 py-1">Guests</div>
          <div className="rounded border px-2 py-1">Type 1 hypervisor</div>
          <div className="rounded border bg-muted px-2 py-1">Hardware</div>
        </div>
        <div className="space-y-1">
          <div className="rounded border px-2 py-1">Guests</div>
          <div className="rounded border px-2 py-1">Type 2 hypervisor</div>
          <div className="rounded border px-2 py-1">Host OS</div>
          <div className="rounded border bg-muted px-2 py-1">Hardware</div>
        </div>
      </div>
    </Frame>
  );
}

export function CloudModelsDiagram() {
  return (
    <Frame title="Service models" alt="IaaS PaaS SaaS responsibility">
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="border-b text-muted-foreground">
            <th className="py-1">Model</th>
            <th>You manage</th>
            <th>Provider manages</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-1">IaaS</td>
            <td>OS, apps, data</td>
            <td>Hardware, hypervisor</td>
          </tr>
          <tr className="border-b">
            <td className="py-1">PaaS</td>
            <td>App, data</td>
            <td>OS and runtime</td>
          </tr>
          <tr>
            <td className="py-1">SaaS</td>
            <td>Use + identity</td>
            <td>The application</td>
          </tr>
        </tbody>
      </table>
    </Frame>
  );
}

export function MalwareStepsDiagram() {
  const steps = [
    "1 Verify",
    "2 Quarantine",
    "3 Disable restore (Win Home)",
    "4 Remediate",
    "5 Update AM",
    "6 Scan (Safe/PE)",
    "7 Reimage if needed",
    "8 Schedule",
    "9 Enable restore",
    "10 Educate",
  ];
  return (
    <Frame title="SOHO malware order" alt="Ten step malware removal">
      <ol className="grid gap-1 text-xs md:grid-cols-2">
        {steps.map((s) => (
          <li key={s} className="rounded border px-2 py-1">
            {s}
          </li>
        ))}
      </ol>
    </Frame>
  );
}

export function BackupChainDiagram() {
  return (
    <Frame title="Restore chains" alt="Full incremental differential restore">
      <div className="space-y-2 text-xs">
        <p>
          <span className="font-medium">Incremental:</span> last full + every
          incremental after it.
        </p>
        <p>
          <span className="font-medium">Differential:</span> last full + latest
          differential only.
        </p>
        <p>
          <span className="font-medium">3-2-1:</span> 3 copies, 2 media types, 1
          offsite.
        </p>
      </div>
    </Frame>
  );
}

export function AiPolicyDiagram() {
  return (
    <Frame title="AI use" alt="Public versus private AI">
      <div className="grid gap-2 text-xs md:grid-cols-2">
        <div className="rounded border p-2">
          <p className="font-medium">Public model</p>
          <p className="text-muted-foreground">
            Treat prompts as leaving the organization. No PII, no secrets, no
            unverified destructive commands.
          </p>
        </div>
        <div className="rounded border p-2">
          <p className="font-medium">Approved private</p>
          <p className="text-muted-foreground">
            Still verify output. Hallucinations happen inside the firewall too.
          </p>
        </div>
      </div>
    </Frame>
  );
}

const SIMPLE: Record<string, { title: string; lines: string[] }> = {
  LaptopExplodedDiagram: {
    title: "Laptop internals",
    lines: [
      "Battery (often under palmrest or internal)",
      "SODIMM under a door or keyboard",
      "M.2 / 2.5\" storage",
      "WLAN card + antenna leads in the bezel",
      "Webcam / mic in the lid",
    ],
  },
  DimmVsSodimmDiagram: {
    title: "DIMM vs SODIMM",
    lines: ["DIMM: desktop, taller", "SODIMM: laptop, about half the length", "Generation (DDR4/5) still must match"],
  },
  ConnectorGallery: {
    title: "Connectors",
    lines: ["USB-A / USB-C / micro / mini / Lightning", "RJ45 vs RJ11", "HDMI / DP / DVI / VGA", "SATA data vs SATA power vs Molex"],
  },
  PhoneSettingsDiagram: {
    title: "Phone settings map",
    lines: ["Radios: Wi-Fi, Cellular, Bluetooth, Hotspot", "SIM / eSIM profiles", "Accounts & sync", "MDM / device management"],
  },
  SpectrumDiagram: {
    title: "Bands",
    lines: ["2.4 GHz: range, congestion, 20/40 MHz", "5 GHz: shorter, cleaner, more channels", "6 GHz: Wi-Fi 6E, indoor, very clean when supported"],
  },
  DnsFlowDiagram: {
    title: "DNS vs IP",
    lines: ["Ping IP works + name fails → resolver/DNS", "Nothing pings → path/NIC/gateway", "APIPA 169.254 → DHCP failed"],
  },
  DhcpPoolDiagram: {
    title: "DHCP pool",
    lines: ["Scope range", "Exclusions", "Reservations (printers)", "Lease time"],
  },
  VlanDiagram: {
    title: "VLAN idea",
    lines: ["Same switch, different broadcast domains", "Guest vs corp vs cameras", "Not a WAN technology"],
  },
  NetworkRackDiagram: {
    title: "SOHO path",
    lines: ["ISP → ONT/modem → router/firewall → switch → AP / PCs"],
  },
  Ipv4Diagram: {
    title: "Addressing",
    lines: ["IP + mask define the LAN", "Gateway is the LAN's door", "DNS is a different field"],
  },
  DisplayCompareDiagram: {
    title: "Panels",
    lines: ["TN: fast, poor angles", "IPS: color/angles", "VA: contrast", "OLED: emissive, burn-in", "Mini-LED: local dimming backlight"],
  },
  PsuRailsDiagram: {
    title: "PSU",
    lines: ["Input 110–120 vs 220–240 VAC", "3.3 / 5 / 12 V rails", "24-pin + CPU EPS + PCIe + SATA"],
  },
  LaserPrinterDiagram: {
    title: "Laser process",
    lines: ["Processing, charging, exposing, developing, transferring, fusing, cleaning"],
  },
  DisplayFaultDiagram: {
    title: "Display faults",
    lines: ["Wrong source, cable, bulb, dead pixels, burn-in, dim, overheat shutdown"],
  },
  PrinterOutputDiagram: {
    title: "Output patterns",
    lines: ["Faded: toner/ink", "Repeating marks: drum circumference", "Ghosting: fuser/drum", "Garbled: language/driver"],
  },
  OsMatrixDiagram: {
    title: "OS pick",
    lines: ["Windows: domain, GPO, most line-of-business", "macOS: creative shops, FileVault, Apple ID", "Linux: servers, cost, packages", "ChromeOS: managed web-first"],
  },
  PermissionDiagram: {
    title: "Effective access",
    lines: ["Share ACL caps remote users", "NTFS is the real file ACL", "Most restrictive combo wins remotely"],
  },
  WifiHeatDiagram: {
    title: "Interference",
    lines: ["Co-channel overlap is worse than adjacent on 2.4", "Walls eat 5/6 GHz first"],
  },
  EditionMatrixDiagram: {
    title: "Windows editions",
    lines: ["Home: no domain join, no RDP host, no BitLocker (typically)", "Pro: domain, RDP host, BitLocker, gpedit", "Enterprise: volume, extra management"],
  },
};

function Simple({ name }: { name: string }) {
  const spec = SIMPLE[name] ?? {
    title: name,
    lines: ["Deterministic diagram for this concept."],
  };
  return (
    <Frame title={spec.title} alt={spec.title}>
      <ul className="list-disc space-y-1 pl-4 text-xs leading-5">
        {spec.lines.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
    </Frame>
  );
}

const NAMED: Record<string, () => JSX.Element> = {
  ExamMapDiagram,
  LearningCycleDiagram,
  StemDecoderDiagram,
  TsMethodDiagram,
  UnitsDiagram,
  RaidArrayDiagram,
  T568Diagram,
  PacketFlowDiagram,
  TcpUdpDiagram,
  PortMapDiagram,
  MotherboardDiagram,
  HypervisorDiagram,
  CloudModelsDiagram,
  MalwareStepsDiagram,
  BackupChainDiagram,
  AiPolicyDiagram,
};

export function TechnicalDiagram({
  component,
  caption,
  notice,
  alt,
}: {
  component: string;
  title: string;
  caption: string;
  notice: string;
  alt: string;
}) {
  const Comp = NAMED[component];
  return (
    <div className="space-y-2">
      {Comp ? <Comp /> : <Simple name={component} />}
      <p className="text-sm text-muted-foreground">{caption}</p>
      <p className="rounded-md bg-muted/50 px-3 py-2 text-sm leading-6">
        <span className="font-medium">Notice: </span>
        {notice}
      </p>
      <span className="sr-only">{alt}</span>
    </div>
  );
}

export function DiagramByName(props: { name: string; style?: CSSProperties }) {
  const Comp = NAMED[props.name];
  return Comp ? <Comp /> : <Simple name={props.name} />;
}
