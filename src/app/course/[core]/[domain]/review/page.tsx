import { notFound } from "next/navigation";
import { DOMAINS, objectivesForDomain } from "@/content/catalog";

export default async function DomainReviewPage({
  params,
}: {
  params: Promise<{ core: string; domain: string }>;
}) {
  const { core, domain } = await params;
  const coreId = core === "core-1" ? "C1" : core === "core-2" ? "C2" : null;
  const num = Number(domain.replace("domain-", ""));
  const d = DOMAINS.find((x) => x.core === coreId && x.number === num);
  if (!d) notFound();
  const objectives = objectivesForDomain(d.id);
  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-8">
      <h1 className="text-2xl font-semibold">{d.title} review</h1>
      <p className="text-sm text-muted-foreground">
        After you pass the mastery quiz, use this checklist. You should be able
        to explain each item without looking.
      </p>
      {objectives.map((o) => (
        <section key={o.id}>
          <h2 className="font-medium">
            {o.officialCode} {o.title}
          </h2>
          <ul className="mt-1 list-disc pl-5 text-sm text-muted-foreground">
            {o.subtopics.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
