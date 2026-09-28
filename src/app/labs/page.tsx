"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { getLabs } from "@/content/registry";

export default function LabsPage() {
  const labs = getLabs();
  const kinds = useMemo(() => {
    const set = new Set(labs.map((l) => l.kind));
    return ["all", ...[...set].sort()];
  }, [labs]);
  const [kind, setKind] = useState("all");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return labs.filter((lab) => {
      if (kind !== "all" && lab.kind !== kind) return false;
      if (!q) return true;
      return (
        lab.title.toLowerCase().includes(q) ||
        lab.description.toLowerCase().includes(q) ||
        lab.slug.toLowerCase().includes(q)
      );
    });
  }, [labs, kind, query]);

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <h1 className="text-2xl font-semibold">Labs</h1>
      <p className="text-sm text-muted-foreground">
        Original performance-based exercises. Unlocked labs stay available here.
      </p>
      <div className="flex flex-wrap gap-2">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search labs"
          aria-label="Search labs"
          className="min-h-11 flex-1 rounded-md border bg-background px-3 text-sm"
        />
        <select
          className="min-h-11 rounded-md border bg-background px-2 text-sm"
          value={kind}
          onChange={(e) => setKind(e.target.value)}
          aria-label="Filter by lab kind"
        >
          {kinds.map((k) => (
            <option key={k} value={k}>
              {k === "all" ? "All kinds" : k}
            </option>
          ))}
        </select>
      </div>
      <p className="text-xs text-muted-foreground">
        Showing {filtered.length} of {labs.length}
      </p>
      <ul className="space-y-2">
        {filtered.map((lab) => (
          <li key={lab.id}>
            <Link href={`/labs/${lab.slug}`} className="block rounded-lg border p-3">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div className="font-medium">{lab.title}</div>
                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                  {lab.kind}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{lab.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
