"use client";

import { useMemo, useState } from "react";
import { ACRONYMS } from "@/content/glossary/acronyms";

export default function GlossaryPage() {
  const [q, setQ] = useState("");
  const items = useMemo(() => {
    const s = q.trim().toLowerCase();
    return ACRONYMS.filter(
      (a) =>
        !s ||
        a.acronym.toLowerCase().includes(s) ||
        a.expansion.toLowerCase().includes(s) ||
        a.blurb.toLowerCase().includes(s),
    );
  }, [q]);
  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-8">
      <h1 className="text-2xl font-semibold">Acronym glossary</h1>
      <input
        className="w-full rounded-md border bg-background px-3 py-2 text-sm"
        placeholder="Search RAID, 169.254, BitLocker…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="Search glossary"
      />
      <ul className="space-y-3">
        {items.map((a) => (
          <li key={a.id} className="border-b pb-2">
            <div className="font-medium">
              {a.acronym} — {a.expansion}
            </div>
            <p className="text-sm text-muted-foreground">{a.blurb}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
