import Link from "next/link";
import { notFound } from "next/navigation";
import { ALL_OBJECTIVES } from "@/content/catalog";
import { getLessons } from "@/content/registry";
import { objectivePath } from "@/lib/course";

export default async function ObjectivePage({
  params,
}: {
  params: Promise<{ core: string; domain: string; objective: string }>;
}) {
  const { objective } = await params;
  const o = ALL_OBJECTIVES.find((x) => {
    const code = x.officialCode.replace(".", "-");
    return objective === `${code}-${x.slug}` || objective === x.slug;
  });
  if (!o) notFound();
  const lessons = getLessons().filter((l) => l.objectiveId === o.id);
  const base = objectivePath(o);
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <p className="text-xs text-muted-foreground">{o.id}</p>
      <h1 className="text-2xl font-semibold">
        {o.officialCode} {o.title}
      </h1>
      <p className="text-sm text-muted-foreground">{o.paraphrase}</p>
      <ul className="list-disc space-y-1 pl-5 text-sm">
        {o.subtopics.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
      <h2 className="font-medium">Lessons</h2>
      <ul className="space-y-2">
        {lessons.length === 0 ? (
          <li className="text-sm text-muted-foreground">
            Curriculum for this objective is still compiling into the registry.
          </li>
        ) : (
          lessons.map((l) => (
            <li key={l.id}>
              <Link href={`${base}/${l.slug}`} className="underline">
                {l.title}
              </Link>
              <span className="text-muted-foreground"> · {l.estimatedMinutes} min</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
