import Link from "next/link";

export default function CramPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-4 px-4 py-8">
      <h1 className="text-2xl font-semibold">Exam-week cram</h1>
      <p className="text-sm text-muted-foreground">
        This is final review, not foundational instruction. It does not replace
        the gated course.
      </p>
      <ul className="list-disc space-y-1 pl-5 text-sm">
        <li>
          <Link className="underline" href="/practice">
            Mixed questions
          </Link>
        </li>
        <li>
          <Link className="underline" href="/glossary">
            Acronyms
          </Link>
        </li>
        <li>
          <Link className="underline" href="/labs/cable-lab">
            Connector drill
          </Link>
        </li>
        <li>
          <Link className="underline" href="/objectives">
            Objective checklist
          </Link>
        </li>
      </ul>
    </div>
  );
}
