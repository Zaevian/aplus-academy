"use client";

import { useState } from "react";
import type { Lab } from "@/content/schema";
import { Button } from "@/components/ui/button";

type Step = { prompt: string; options: { id: string; label: string; good: boolean; why: string }[] };

const BANK: Record<string, Step[]> = {
  default: [
    {
      prompt: "What is the FIRST useful action?",
      options: [
        { id: "a", label: "Replace the most expensive part", good: false, why: "That's implementing a guess." },
        { id: "b", label: "Reproduce, identify what changed, and gather evidence", good: true, why: "Identify before you spend money." },
        { id: "c", label: "Tell the user to reboot forever", good: false, why: "Reboot can be a test, not a personality." },
      ],
    },
    {
      prompt: "You have evidence. What is NEXT?",
      options: [
        { id: "a", label: "Test one theory at a time", good: true, why: "A test that changes three things teaches nothing." },
        { id: "b", label: "Reimage immediately", good: false, why: "Reimage is a plan, not a first test, unless malware/corruption already proven." },
        { id: "c", label: "Close the ticket as training", good: false, why: "The incident is still open." },
      ],
    },
  ],
};

export function InteractiveSimLab({ lab }: { lab: Lab }) {
  const steps = BANK[lab.component] ?? BANK.default!;
  const [i, setI] = useState(0);
  const [msg, setMsg] = useState<string | null>(null);
  const step = steps[Math.min(i, steps.length - 1)]!;

  return (
    <div className="space-y-3 text-sm">
      <p>
        Interactive lab: <span className="font-medium">{lab.title}</span>
      </p>
      <p>{step.prompt}</p>
      <div className="flex flex-col gap-2">
        {step.options.map((o) => (
          <Button
            key={o.id}
            variant="outline"
            className="h-auto justify-start whitespace-normal py-2 text-left"
            onClick={() => {
              setMsg(o.why);
              if (o.good && i < steps.length - 1) setI(i + 1);
            }}
          >
            {o.label}
          </Button>
        ))}
      </div>
      {msg ? <p className="text-muted-foreground">{msg}</p> : null}
    </div>
  );
}
