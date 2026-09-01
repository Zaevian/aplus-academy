"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { searchCourse } from "@/lib/search";

export default function SearchPage() {
  const [q, setQ] = useState("");
  const hits = useMemo(() => searchCourse(q), [q]);
  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-8">
      <h1 className="text-2xl font-semibold">Search</h1>
      <p className="text-xs text-muted-foreground">
        Locked assessment answers are not included.
      </p>
      <input
        className="w-full rounded-md border bg-background px-3 py-2 text-sm"
        placeholder="RAID, DHCP, 169.254, BitLocker, ghost printing"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <ul className="space-y-2">
        {hits.map((h, i) => (
          <li key={`${h.href}-${i}`} className="rounded border p-2 text-sm">
            <div className="text-xs uppercase text-muted-foreground">{h.type}</div>
            <Link href={h.href} className="font-medium underline">
              {h.title}
            </Link>
            <p className="text-muted-foreground">{h.snippet}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
