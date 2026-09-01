import Link from "next/link";
import { DOMAINS } from "@/content/catalog";
import { domainPath, coreLabel } from "@/lib/course";

export default function CoursePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <h1 className="text-2xl font-semibold">Course</h1>
      <p className="text-sm text-muted-foreground">
        Foundation, then Core 1, then Core 2. Domain mastery quizzes are 100% gates.
      </p>
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
