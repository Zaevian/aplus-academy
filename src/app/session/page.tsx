"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SessionPage() {
  const [mins, setMins] = useState<15 | 30 | 45 | 60>(30);
  return (
    <div className="mx-auto max-w-lg space-y-4 px-4 py-8">
      <h1 className="text-2xl font-semibold">Study session</h1>
      <p className="text-sm text-muted-foreground">
        Pulls due reviews, the current lesson, a weak concept, and one lab.
      </p>
      <div className="flex gap-2">
        {([15, 30, 45, 60] as const).map((m) => (
          <Button key={m} size="sm" variant={mins === m ? "default" : "outline"} onClick={() => setMins(m)}>
            {m} min
          </Button>
        ))}
      </div>
      <ul className="list-disc pl-5 text-sm">
        <li>
          <Link className="underline" href="/review">
            Due reviews
          </Link>
        </li>
        <li>
          <Link className="underline" href="/course">
            Current lesson
          </Link>
        </li>
        <li>
          <Link className="underline" href="/labs/raid-builder">
            One interaction
          </Link>
        </li>
      </ul>
    </div>
  );
}
