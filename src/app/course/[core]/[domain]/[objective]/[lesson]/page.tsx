import { notFound } from "next/navigation";
import { getLessons } from "@/content/registry";
import { LessonView } from "@/components/lesson/lesson-view";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ lesson: string }>;
}) {
  const { lesson: slug } = await params;
  const lesson = getLessons().find((l) => l.slug === slug);
  if (!lesson) notFound();
  return <LessonView lesson={lesson} />;
}
