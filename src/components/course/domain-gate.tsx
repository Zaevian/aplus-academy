"use client";

import Link from "next/link";
import { DOMAINS, objectivesForDomain } from "@/content/catalog";
import { getLabs, getLessons, getQuestions } from "@/content/registry";
import { useAcademy } from "@/components/academy-provider";
import { isDomainUnlocked, previousDomainInCore } from "@/lib/domain-unlock";
import { domainPath } from "@/lib/course";

/**
 * Hard progression gate: mastery 100% on the previous domain unlocks the next.
 * While locked we still show a read-only syllabus preview (objectives, lesson
 * titles, question/lab counts) so guests and auditors can sample scope without
 * bypassing the gate. Links into lessons/quiz stay unavailable until unlock.
 */
export function DomainGate({
  domainId,
  children,
}: {
  domainId: string;
  children: React.ReactNode;
}) {
  const { ready, progress } = useAcademy();
  if (domainId === "FND-D0") return <>{children}</>;
  if (!ready) {
    return (
      <p className="px-4 py-8 text-sm text-muted-foreground">Loading progress…</p>
    );
  }
  if (isDomainUnlocked(progress, domainId)) return <>{children}</>;

  const prev = previousDomainInCore(domainId);
  const prevDomain = prev ? DOMAINS.find((d) => d.id === prev) : undefined;
  const current = DOMAINS.find((d) => d.id === domainId);
  const objectives = objectivesForDomain(domainId);
  const lessons = getLessons().filter((l) =>
    objectives.some((o) => o.id === l.objectiveId),
  );
  const questions = getQuestions().filter((q) =>
    objectives.some((o) => o.id === q.objectiveId),
  );
  const labs = getLabs().filter((lab) =>
    lab.objectiveIds.some((id) => objectives.some((o) => o.id === id)),
  );

  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-12">
      <h1 className="text-xl font-semibold">Domain locked</h1>
      <p className="text-sm leading-6 text-muted-foreground">
        {current
          ? `${current.number}.0 ${current.title} stays locked until you score 100% on the previous domain mastery quiz. This is a hard gate, not a suggestion.`
          : "Pass the previous domain quiz at 100% to continue."}
      </p>
      {prevDomain ? (
        <p className="text-sm">
          <Link className="underline" href={`${domainPath(prevDomain)}/quiz`}>
            Take the {prevDomain.title} mastery quiz
          </Link>
        </p>
      ) : (
        <p className="text-sm">
          <Link className="underline" href="/course/foundation">
            Start in Foundation
          </Link>
        </p>
      )}

      <section className="rounded-lg border bg-muted/30 p-4">
        <h2 className="text-sm font-medium">Syllabus preview (read-only)</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          {lessons.length} lessons · {questions.length} questions · {labs.length}{" "}
          scored labs. Open after unlock — titles below are for sampling scope
          only.
        </p>
        <ul className="mt-3 space-y-3">
          {objectives.map((o) => {
            const objLessons = lessons.filter((l) => l.objectiveId === o.id);
            const qCount = questions.filter((q) => q.objectiveId === o.id).length;
            const objLabs = labs.filter((lab) =>
              lab.objectiveIds.includes(o.id),
            );
            return (
              <li key={o.id} className="text-sm">
                <p className="font-medium">
                  {o.officialCode} {o.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {objLessons.length} lessons · {qCount} questions
                  {objLabs.length
                    ? ` · labs: ${objLabs.map((l) => l.title).join(", ")}`
                    : " · no scored lab yet"}
                </p>
                {objLessons.length ? (
                  <ul className="mt-1 list-disc pl-5 text-xs text-muted-foreground">
                    {objLessons.map((l) => (
                      <li key={l.id}>{l.title}</li>
                    ))}
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ul>
        <p className="mt-3 text-xs text-muted-foreground">
          Practice and the Labs catalog stay available without this gate so you
          can try Hardware-related PBQs early.
        </p>
      </section>
    </div>
  );
}
