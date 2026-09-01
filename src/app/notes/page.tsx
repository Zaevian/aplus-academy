"use client";

import { useAcademy } from "@/components/academy-provider";

export default function NotesPage() {
  const { notes, bookmarks } = useAcademy();
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <h1 className="text-2xl font-semibold">Notes & bookmarks</h1>
      <section>
        <h2 className="font-medium">Bookmarks</h2>
        <ul className="mt-2 space-y-1 text-sm">
          {bookmarks.length === 0 ? <li>None yet.</li> : bookmarks.map((b) => (
            <li key={b.id}>
              {b.label} · {b.targetType}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="font-medium">Notes</h2>
        <ul className="mt-2 space-y-2 text-sm">
          {notes.length === 0 ? <li>None yet.</li> : notes.map((n) => (
            <li key={n.id} className="rounded border p-2">
              <div className="text-xs text-muted-foreground">{n.targetId}</div>
              {n.body}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
