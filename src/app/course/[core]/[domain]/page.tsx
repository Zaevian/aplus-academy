import Link from "next/link";
import { notFound } from "next/navigation";
import { DOMAINS, objectivesForDomain } from "@/content/catalog";
import { getLessons, getQuestions } from "@/content/registry";
import { objectivePath } from "@/lib/course";
import { Button } from "@/components/ui/button";

export default async function DomainPage({
  params,
}: {
  params: Promise<{ core: string; domain: string }>;
}) {
  const { core, domain } = await params;
  const coreId = core === "core-1" ? "C1" : core === "core-2" ? "C2" : null;
  const num = Number(domain.replace("domain-", ""));
  if (!coreId || Number.isNaN(num)) notFound();
  const d = DOMAINS.find((x) => x.core === coreId && x.number === num);
  if (!d) notFound();
  const objectives = objectivesForDomain(d.id);
  const lessons = getLessons();
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <h1 className="text-2xl font-semibold">
        {d.number}.0 {d.title}
      </h1>
      <p className="text-sm text-muted-foreground">{d.paraphrase}</p>
      <Button render={<Link href={`/course/${core}/${domain}/quiz`} />}>
        Domain mastery quiz (100% gate)
      </Button>
      <Button variant="outline" render={<Link href={`/course/${core}/${domain}/review`} />}>
        Domain review
      </Button>
      <ul className="space-y-3">
        {objectives.map((o) => {
          const qs = getQuestions().filter((q) => q.objectiveId === o.id).length;
          return (
            <li key={o.id} className="rounded-lg border p-3">
              <Link href={objectivePath(o)} className="font-medium hover:underline">
                {o.officialCode} {o.title}
              </Link>
              <p className="text-sm text-muted-foreground">{o.paraphrase}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {lessons.filter((l) => l.objectiveId === o.id).length} lessons · {qs}{" "}
                questions
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
