import { notFound } from "next/navigation";
import { getLabBySlug } from "@/content/registry";
import { LabHost } from "@/components/labs/lab-host";

export default async function LabPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lab = getLabBySlug(slug);
  if (!lab) notFound();
  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-8">
      <h1 className="text-2xl font-semibold">{lab.title}</h1>
      <LabHost lab={lab} />
    </div>
  );
}
