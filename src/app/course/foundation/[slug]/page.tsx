import { notFound } from "next/navigation";
import { getLessons } from "@/content/registry";
import { LessonView } from "@/components/lesson/lesson-view";

export default async function FoundationLessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson =
    getLessons().find((l) => l.slug === slug && l.objectiveId.startsWith("FND-")) ??
    getLessons().find((l) => l.slug === slug);
  if (!lesson) notFound();
  return <LessonView lesson={lesson} />;
}
