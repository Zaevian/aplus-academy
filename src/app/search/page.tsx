"use client";

import { Suspense, useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { searchCourse } from "@/lib/search";

function SearchInner() {
  const params = useSearchParams();
  const router = useRouter();
  const q = params.get("q") ?? "";
  const hits = useMemo(() => searchCourse(q), [q]);
  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-8">
      <h1 className="text-2xl font-semibold">Search</h1>
      <p className="text-xs text-muted-foreground">
        Search looks at lesson text, labs, objectives, and glossary entries. It
        does not list assessment answer keys. Practice questions still load in
        the study client for quizzes you take here.
      </p>
      <input
        className="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-sm focus-visible:ring-3 focus-visible:ring-ring/50"
        placeholder="RAID, DHCP, 169.254, BitLocker, ghost printing"
        value={q}
        onChange={(e) => {
          const value = e.target.value;
          const qs = value.trim() ? `?q=${encodeURIComponent(value)}` : "";
          router.replace(`/search${qs}`);
        }}
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

export default function SearchPage() {
  return (
    <Suspense fallback={<p className="p-6 text-sm">Loading search…</p>}>
      <SearchInner />
    </Suspense>
  );
}
