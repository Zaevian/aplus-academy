import Link from "next/link";
import { FOUNDATION_OBJECTIVES } from "@/content/catalog";
import { getLessons } from "@/content/registry";
import { objectivePath } from "@/lib/course";

export default function FoundationPage() {
  const lessons = getLessons().filter((l) => l.objectiveId.startsWith("FND-"));
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <h1 className="text-2xl font-semibold">Course orientation & IT foundations</h1>
      <p className="text-sm text-muted-foreground">
        Required before Core 1. Not a scored exam domain.
      </p>
      <ul className="space-y-2">
        {FOUNDATION_OBJECTIVES.map((o) => (
          <li key={o.id} className="rounded-lg border p-3">
            <Link href={objectivePath(o)} className="font-medium hover:underline">
              {o.title}
            </Link>
            <p className="text-sm text-muted-foreground">{o.paraphrase}</p>
            <ul className="mt-2 text-sm">
              {lessons
                .filter((l) => l.objectiveId === o.id)
                .map((l) => (
                  <li key={l.id}>
                    <Link className="underline" href={`${objectivePath(o)}/${l.slug}`}>
                      {l.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
