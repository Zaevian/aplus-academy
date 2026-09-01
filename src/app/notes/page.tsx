"use client";

import { useState } from "react";
import Link from "next/link";
import { useAcademy } from "@/components/academy-provider";
import {
  bookmarkHref,
  deleteBookmark,
  deleteNote,
  upsertNote,
} from "@/lib/progress-actions";
import { Button } from "@/components/ui/button";

export default function NotesPage() {
  const { notes, bookmarks } = useAcademy();
  const [body, setBody] = useState("");
  const [editing, setEditing] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <h1 className="text-2xl font-semibold">Notes & bookmarks</h1>
      <section>
        <h2 className="font-medium">Bookmarks</h2>
        <ul className="mt-2 space-y-1 text-sm">
          {bookmarks.length === 0 ? (
            <li className="text-muted-foreground">
              None yet. Open a lesson and tap Bookmark.
            </li>
          ) : (
            bookmarks.map((b) => (
              <li
                key={b.id}
                className="flex min-h-11 items-center justify-between gap-2 rounded border px-2"
              >
                <Link className="underline" href={bookmarkHref(b)}>
                  {b.label}
                </Link>
                <Button
                  size="sm"
                  variant="ghost"
                  className="min-h-11"
                  onClick={() => void deleteBookmark(b.id)}
                >
                  Remove
                </Button>
              </li>
            ))
          )}
        </ul>
      </section>
      <section className="space-y-3">
        <h2 className="font-medium">Notes</h2>
        <form
          className="space-y-2"
          onSubmit={(e) => {
            e.preventDefault();
            void upsertNote({
              id: editing ?? undefined,
              targetType: "lesson",
              targetId: "inbox",
              body,
            }).then(() => {
              setBody("");
              setEditing(null);
            });
          }}
        >
          <textarea
            className="min-h-24 w-full rounded-md border bg-background px-3 py-2 text-sm"
            placeholder="Write a study note. It stays on this device."
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <Button type="submit" size="sm" className="min-h-11" disabled={!body.trim()}>
            {editing ? "Update note" : "Add note"}
          </Button>
        </form>
        <ul className="mt-2 space-y-2 text-sm">
          {notes.length === 0 ? (
            <li className="text-muted-foreground">
              No notes yet. Add one here or from a lesson.
            </li>
          ) : (
            notes.map((n) => (
              <li key={n.id} className="rounded border p-2">
                <div className="text-xs text-muted-foreground">{n.targetId}</div>
                <p className="whitespace-pre-wrap">{n.body}</p>
                <div className="mt-2 flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="min-h-11"
                    onClick={() => {
                      setEditing(n.id);
                      setBody(n.body);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="min-h-11"
                    onClick={() => void deleteNote(n.id)}
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
}
