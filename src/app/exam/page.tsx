import Link from "next/link";

export default function ExamIndex() {
  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-8">
      <h1 className="text-2xl font-semibold">Exam simulator</h1>
      <p className="text-sm text-muted-foreground">
        Modeled on published constraints: up to 90 questions, 90 minutes. Internal
        scoring only — not CompTIA&apos;s 100–900 scale.
      </p>
      <ul className="space-y-2">
        <li>
          <Link className="underline" href="/exam/core-1">
            Core 1 mock (220-1201)
          </Link>
        </li>
        <li>
          <Link className="underline" href="/exam/core-2">
            Core 2 mock (220-1202)
          </Link>
        </li>
      </ul>
    </div>
  );
}
