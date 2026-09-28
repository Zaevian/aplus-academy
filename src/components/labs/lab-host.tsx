"use client";

import { useState, type ComponentType } from "react";
import type { Lab } from "@/content/schema";
import { Button } from "@/components/ui/button";
import { completeLab } from "@/lib/progress-actions";
import { RaidLab } from "@/components/labs/raid-lab";
import { LandscapeLab } from "@/components/labs/landscape-lab";
import { CliLab } from "@/components/labs/cli-lab";
import { MotherboardLab } from "@/components/labs/motherboard-lab";
import { CableLab } from "@/components/labs/cable-lab";
import { NetworkBuilderLab } from "@/components/labs/network-builder-lab";
import { RouterLab } from "@/components/labs/router-lab";
import { WifiLab } from "@/components/labs/wifi-lab";
import { WindowsToolsLab } from "@/components/labs/windows-tools-lab";
import { MacOsLab } from "@/components/labs/macos-lab";
import { PrinterLab } from "@/components/labs/printer-lab";
import { PhishingLab } from "@/components/labs/phishing-lab";
import { MalwareLab } from "@/components/labs/malware-lab";
import { PermissionsLab } from "@/components/labs/permissions-lab";
import { TicketLab } from "@/components/labs/ticket-lab";
import { BackupLab } from "@/components/labs/backup-lab";
import { VoiceLab } from "@/components/labs/voice-lab";
import { TicketShiftLab } from "@/components/labs/ticket-shift-lab";
import { LaptopUpgradeLab } from "@/components/labs/laptop-upgrade-lab";
import { RamInstallLab } from "@/components/labs/ram-install-lab";
import { useAcademy } from "@/components/academy-provider";
import type { LabSimProps } from "@/components/labs/lab-kit";
import { LAB_HOST_COMPONENTS } from "@/content/labs/implemented";

export const LAB_COMPONENT_MAP: Record<
  (typeof LAB_HOST_COMPONENTS)[number],
  ComponentType<LabSimProps>
> = {
  RaidLab,
  LandscapeLab,
  MotherboardLab,
  CableLab,
  NetworkBuilderLab,
  RouterLab,
  WifiLab,
  WindowsCliLab: (p) => <CliLab lab={p.lab} flavor="windows" onSolved={p.onSolved} />,
  LinuxCliLab: (p) => <CliLab lab={p.lab} flavor="linux" onSolved={p.onSolved} />,
  WindowsToolsLab,
  MacOsLab,
  PrinterLab,
  PhishingLab,
  MalwareLab,
  PermissionsLab,
  TicketLab,
  BackupLab,
  VoiceLab,
  TicketShiftLab,
  LaptopUpgradeLab,
  RamInstallLab,
};

export function LabHost({ lab }: { lab: Lab }) {
  const { progress } = useAcademy();
  const done = progress?.completedLabs.includes(lab.id) ?? false;
  const [show, setShow] = useState(false);
  const [solved, setSolved] = useState(false);
  const Comp = LAB_COMPONENT_MAP[lab.component as keyof typeof LAB_COMPONENT_MAP];

  if (!Comp) {
    return (
      <p className="text-sm text-destructive">
        Lab component {lab.component} is not registered. InteractiveSimLab is not
        allowed as a fallback.
      </p>
    );
  }

  return (
    <div className="space-y-3 rounded-lg border p-3">
      <div>
        <h3 className="font-medium">{lab.title}</h3>
        <p className="text-sm text-muted-foreground">{lab.description}</p>
      </div>
      <Comp lab={lab} onSolved={() => setSolved(true)} />
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          className="min-h-11"
          onClick={() => void completeLab(lab.id)}
          disabled={done || !solved}
        >
          {done ? "Lab recorded" : solved ? "Mark lab complete" : "Complete the mission first"}
        </Button>
        <Button
          size="sm"
          className="min-h-11"
          variant="outline"
          onClick={() => setShow((s) => !s)}
        >
          {show ? "Hide solution" : "Show solution"}
        </Button>
      </div>
      {show ? (
        <p className="text-sm leading-6 text-muted-foreground">{lab.solution}</p>
      ) : null}
    </div>
  );
}
