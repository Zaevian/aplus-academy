"use client";

import Link from "next/link";
import { DOMAINS } from "@/content/catalog";
import { useAcademy } from "@/components/academy-provider";
import { isDomainUnlocked, previousDomainInCore } from "@/lib/domain-unlock";
import { domainPath } from "@/lib/course";

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

  return (
    <div className="mx-auto max-w-lg space-y-3 px-4 py-12">
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
    </div>
  );
}
