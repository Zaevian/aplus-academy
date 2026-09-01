import Link from "next/link";
import { DOMAINS } from "@/content/catalog";
import { domainPath, coreLabel } from "@/lib/course";
import { Button } from "@/components/ui/button";
import { FIRST_LESSON_HREF } from "@/lib/study-path";

export default function CoursePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <h1 className="text-2xl font-semibold">Full course map</h1>
      <p className="text-sm text-muted-foreground">
        Path: Foundation → Core 1 → Core 2. Domain mastery quizzes are 100% gates.
        If you are new, do not browse this list first — open lesson 1.
      </p>
      <Button className="min-h-11" render={<Link href={FIRST_LESSON_HREF} />}>
        Begin at Foundation lesson 1
      </Button>
      <ul className="space-y-2">
        {DOMAINS.map((d) => (
          <li key={d.id}>
            <Link
              href={domainPath(d)}
              className="block rounded-lg border p-3 hover:bg-muted/40"
            >
              <div className="text-xs text-muted-foreground">{coreLabel(d.core)}</div>
              <div className="font-medium">
                {d.number ? `${d.number}.0 ` : ""}
                {d.title}
                {d.examPercent ? ` · ${d.examPercent}%` : ""}
              </div>
              <p className="text-sm text-muted-foreground">{d.paraphrase}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
