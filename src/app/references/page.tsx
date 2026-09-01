import { SOURCES } from "@/content/sources";

export default function ReferencesPage() {
  const groups = [...new Set(SOURCES.map((s) => s.group))];
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <h1 className="text-2xl font-semibold">Sources & further reading</h1>
      {groups.map((g) => (
        <section key={g}>
          <h2 className="font-medium capitalize">{g}</h2>
          <ul className="mt-1 space-y-1 text-sm">
            {SOURCES.filter((s) => s.group === g).map((s) => (
              <li key={s.id}>
                <a className="underline" href={s.url} rel="noreferrer">
                  {s.title}
                </a>
                <span className="text-muted-foreground"> · verified {s.verified}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
