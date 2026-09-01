import Link from "next/link";
import { notFound } from "next/navigation";
import { DOMAINS } from "@/content/catalog";
import { domainPath } from "@/lib/course";
import { Button } from "@/components/ui/button";
import { FIRST_LESSON_HREF } from "@/lib/study-path";

export default async function CorePage({
  params,
}: {
  params: Promise<{ core: string }>;
}) {
  const { core } = await params;
  const id = core === "core-1" ? "C1" : core === "core-2" ? "C2" : null;
  if (!id) notFound();
  const domains = DOMAINS.filter((d) => d.core === id);
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <p className="text-xs tracking-wide text-muted-foreground uppercase">
        {id === "C1" ? "Step 2 of 3" : "Step 3 of 3"} · after Foundation
      </p>
      <h1 className="text-2xl font-semibold">
        {id === "C1" ? "Core 1 · 220-1201" : "Core 2 · 220-1202"}
      </h1>
      <p className="text-sm text-muted-foreground">
        New here? Start Foundation lesson 1 before browsing these domains.
      </p>
      <Button variant="outline" className="min-h-11" render={<Link href={FIRST_LESSON_HREF} />}>
        Back to Foundation lesson 1
      </Button>
      <ul className="space-y-2">
        {domains.map((d) => (
          <li key={d.id}>
            <Link href={domainPath(d)} className="block rounded-lg border p-3">
              <div className="font-medium">
                {d.number}.0 {d.title} · {d.examPercent}%
              </div>
              <p className="text-sm text-muted-foreground">{d.paraphrase}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
