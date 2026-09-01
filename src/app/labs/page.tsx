import Link from "next/link";
import { getLabs } from "@/content/registry";

export default function LabsPage() {
  const labs = getLabs();
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <h1 className="text-2xl font-semibold">Labs</h1>
      <p className="text-sm text-muted-foreground">
        Original performance-based exercises. Unlocked labs stay available here.
      </p>
      <ul className="space-y-2">
        {labs.map((lab) => (
          <li key={lab.id}>
            <Link href={`/labs/${lab.slug}`} className="block rounded-lg border p-3">
              <div className="font-medium">{lab.title}</div>
              <p className="text-sm text-muted-foreground">{lab.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
