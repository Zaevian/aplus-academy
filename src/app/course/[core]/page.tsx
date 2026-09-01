import Link from "next/link";
import { notFound } from "next/navigation";
import { DOMAINS } from "@/content/catalog";
import { domainPath } from "@/lib/course";

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
      <h1 className="text-2xl font-semibold">
        {id === "C1" ? "Core 1 · 220-1201" : "Core 2 · 220-1202"}
      </h1>
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
