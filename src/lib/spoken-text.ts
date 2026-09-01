import type { Lesson } from "@/content/schema";

export function stripForSpeech(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/_{1,2}([^_]+)_{1,2}/g, "$1")
    .replace(/#{1,6}\s*/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^\s*[-*]\s+/gm, "")
    .replace(/\|/g, ", ")
    .replace(/\n{2,}/g, "\n")
    .replace(/\s+/g, " ")
    .trim();
}

export function lessonSpokenText(lesson: Lesson): string {
  const parts = [lesson.title, lesson.description];
  for (const block of lesson.blocks) {
    if (block.type === "reading") {
      if (block.title) parts.push(block.title);
      parts.push(stripForSpeech(block.markdown));
    } else if (block.type === "callout") {
      parts.push(`${block.callout.title}. ${block.callout.body}`);
    } else if (block.type === "summary") {
      parts.push("Summary.", ...block.bullets);
    } else if (block.type === "table") {
      parts.push(block.title, block.headers.join(", "));
    } else if ("transcript" in block && block.transcript) {
      parts.push(String(block.transcript));
    } else if ("caption" in block && block.caption) {
      parts.push(String(block.caption));
    }
  }
  return parts.filter(Boolean).join(". ");
}

export function chunkForTts(text: string, max = 3500): string[] {
  const clean = text.trim();
  if (clean.length <= max) return clean ? [clean] : [];
  const chunks: string[] = [];
  let rest = clean;
  while (rest.length > max) {
    let cut = rest.lastIndexOf(". ", max);
    if (cut < max * 0.4) cut = rest.lastIndexOf(" ", max);
    if (cut < 1) cut = max;
    chunks.push(rest.slice(0, cut + 1).trim());
    rest = rest.slice(cut + 1).trim();
  }
  if (rest) chunks.push(rest);
  return chunks;
}
