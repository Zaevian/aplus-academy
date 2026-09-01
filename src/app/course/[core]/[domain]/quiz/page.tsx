import { notFound } from "next/navigation";
import { DOMAINS } from "@/content/catalog";
import { getQuestions } from "@/content/registry";
import { QuizPlayer } from "@/components/quiz/quiz-player";

export default async function DomainQuizPage({
  params,
}: {
  params: Promise<{ core: string; domain: string }>;
}) {
  const { core, domain } = await params;
  const coreId = core === "core-1" ? "C1" : core === "core-2" ? "C2" : null;
  const num = Number(domain.replace("domain-", ""));
  const d = DOMAINS.find((x) => x.core === coreId && x.number === num);
  if (!d) notFound();
  const pool = getQuestions().filter((q) =>
    d.objectiveIds.includes(q.objectiveId),
  );
  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-8">
      <h1 className="text-2xl font-semibold">{d.title} mastery quiz</h1>
      <p className="text-sm text-muted-foreground">
        10–15 previously unseen items. 100% required to unlock the next domain.
        Prior scores are kept.
      </p>
      <QuizPlayer kind="domain" targetId={d.id} pool={pool} count={12} />
    </div>
  );
}
