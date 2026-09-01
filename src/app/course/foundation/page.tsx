import Link from "next/link";
import { FOUNDATION_OBJECTIVES } from "@/content/catalog";
import { getLessons } from "@/content/registry";
import { Button } from "@/components/ui/button";
import { FIRST_LESSON_HREF, FIRST_LESSON_TITLE } from "@/lib/study-path";
import { lessonPath } from "@/lib/course";

export default function FoundationPage() {
  const lessons = getLessons().filter((l) => l.objectiveId.startsWith("FND-"));
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <p className="text-xs tracking-wide text-muted-foreground uppercase">
        Step 1 of 3 · start here
      </p>
      <h1 className="text-2xl font-semibold">Course orientation & IT foundations</h1>
      <p className="text-sm text-muted-foreground">
        Required orientation before Core 1. Not a scored exam domain. Lesson 1 is
        the beginning of the academy.
      </p>
      <div className="rounded-xl border-2 border-foreground p-4">
        <p className="text-xs font-medium uppercase text-muted-foreground">Lesson 1</p>
        <p className="font-medium">{FIRST_LESSON_TITLE}</p>
        <Button className="mt-3 min-h-11" render={<Link href={FIRST_LESSON_HREF} />}>
          Begin lesson 1
        </Button>
      </div>
      <ul className="space-y-2">
        {FOUNDATION_OBJECTIVES.map((o, i) => (
          <li key={o.id} className="rounded-lg border p-3">
            <p className="font-medium">
              {i + 1}. {o.title}
            </p>
            <p className="text-sm text-muted-foreground">{o.paraphrase}</p>
            <ul className="mt-2 text-sm">
              {lessons
                .filter((l) => l.objectiveId === o.id)
                .map((l) => (
                  <li key={l.id}>
                    <Link className="underline" href={lessonPath(l.id)}>
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
