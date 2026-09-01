"use client";

import { useMemo, useState } from "react";
import { PORTS } from "@/content/ports";

export default function PortsPage() {
  const [q, setQ] = useState("");
  const items = useMemo(() => {
    const s = q.toLowerCase();
    return PORTS.filter(
      (p) =>
        p.protocol.toLowerCase().includes(s) ||
        p.ports.includes(s) ||
        p.name.toLowerCase().includes(s),
    );
  }, [q]);
  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-8">
      <h1 className="text-2xl font-semibold">Port & protocol explorer</h1>
      <input
        className="w-full rounded-md border bg-background px-3 py-2 text-sm"
        placeholder="443, DNS, RDP…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <ul className="space-y-3">
        {items.map((p) => (
          <li key={p.ports} className="rounded border p-3 text-sm">
            <div className="font-medium">
              {p.protocol} · {p.ports} · {p.transport} · {p.secure}
            </div>
            <p>{p.purpose}</p>
            <p className="text-muted-foreground">{p.notes}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
