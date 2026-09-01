import { DOMAINS, ALL_OBJECTIVES } from "@/content/catalog";
import { getLessons, getLabs, getQuestions } from "@/content/registry";
import { objectivePath } from "@/lib/course";
import Link from "next/link";

export default function ObjectivesPage() {
  const lessons = getLessons();
  const labs = getLabs();
  const questions = getQuestions();
  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-8">
      <h1 className="text-2xl font-semibold">Exam objective map</h1>
      <p className="text-sm text-muted-foreground">
        Paraphrased internal map of current A+ V15 objectives. Not a reproduction
        of proprietary study products.
      </p>
      {DOMAINS.map((d) => (
        <section key={d.id}>
          <h2 className="font-semibold">
            {d.title} {d.examPercent ? `(${d.examPercent}%)` : ""}
          </h2>
          <ul className="mt-2 space-y-2">
            {ALL_OBJECTIVES.filter((o) => d.objectiveIds.includes(o.id)).map((o) => (
              <li key={o.id} className="rounded border p-2 text-sm">
                <Link href={objectivePath(o)} className="font-medium underline">
                  {o.officialCode} {o.title}
                </Link>
                <div className="text-xs text-muted-foreground">
                  {lessons.filter((l) => l.objectiveId === o.id).length} lessons ·{" "}
                  {questions.filter((q) => q.objectiveId === o.id).length} questions ·{" "}
                  {labs.filter((l) => l.objectiveIds.includes(o.id)).length} labs
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
