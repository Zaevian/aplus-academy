"use client";

import { useState, type ComponentType } from "react";
import type { Lab } from "@/content/schema";
import { Button } from "@/components/ui/button";
import { completeLab } from "@/lib/progress-actions";
import { RaidLab } from "@/components/labs/raid-lab";
import { LandscapeLab } from "@/components/labs/landscape-lab";
import { InteractiveSimLab } from "@/components/labs/interactive-sim-lab";
import { CliLab } from "@/components/labs/cli-lab";
import { useAcademy } from "@/components/academy-provider";

const MAP: Record<string, ComponentType<{ lab: Lab }>> = {
  RaidLab,
  LandscapeLab,
  WindowsCliLab: (p) => <CliLab lab={p.lab} flavor="windows" />,
  LinuxCliLab: (p) => <CliLab lab={p.lab} flavor="linux" />,
};

export function LabHost({ lab }: { lab: Lab }) {
  const { progress } = useAcademy();
  const done = progress?.completedLabs.includes(lab.id) ?? false;
  const [show, setShow] = useState(false);
  const Comp = MAP[lab.component] ?? InteractiveSimLab;

  return (
    <div className="space-y-3 rounded-lg border p-3">
      <div>
        <h3 className="font-medium">{lab.title}</h3>
        <p className="text-sm text-muted-foreground">{lab.description}</p>
      </div>
      <Comp lab={lab} />
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          onClick={() => void completeLab(lab.id)}
          disabled={done}
        >
          {done ? "Lab recorded" : "Mark lab complete"}
        </Button>
        <Button size="sm" variant="outline" onClick={() => setShow((s) => !s)}>
          {show ? "Hide solution" : "Show solution"}
        </Button>
      </div>
      {show ? (
        <p className="text-sm leading-6 text-muted-foreground">{lab.solution}</p>
      ) : null}
    </div>
  );
}
