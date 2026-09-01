import { ALL_OBJECTIVES } from "@/content/catalog";
import { ACRONYMS } from "@/content/glossary/acronyms";
import { getLabs, getLessons } from "@/content/registry";
import { lessonPath } from "@/lib/course";

export type SearchHit = {
  type: "lesson" | "glossary" | "lab" | "objective";
  title: string;
  href: string;
  snippet: string;
};

function tokensOf(query: string): string[] {
  return query
    .trim()
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length >= 2);
}

function stem(token: string): string {
  if (token.length > 5 && token.endsWith("ing")) return token.slice(0, -3);
  if (token.length > 4 && token.endsWith("ed")) return token.slice(0, -2);
  if (token.length > 4 && token.endsWith("ing")) return token.slice(0, 5);
  return token.length > 5 ? token.slice(0, 5) : token;
}

export function matchesTokens(haystack: string, tokens: string[]): boolean {
  if (tokens.length === 0) return false;
  const h = haystack.toLowerCase();
  return tokens.every((t) => {
    if (h.includes(t)) return true;
    const s = stem(t);
    if (s.length >= 3 && h.includes(s)) return true;
    return h.split(/[^a-z0-9]+/).some((w) => w.startsWith(s) || s.startsWith(w) && w.length >= 4);
  });
}

function lessonHaystack(lesson: ReturnType<typeof getLessons>[number]): string {
  const bits = [lesson.title, lesson.description, lesson.slug];
  for (const block of lesson.blocks) {
    if (block.type === "reading") bits.push(block.markdown);
    if (block.type === "callout") bits.push(block.callout.title, block.callout.body);
    if (block.type === "summary") bits.push(...block.bullets);
    if (block.type === "table") bits.push(block.title, ...block.headers, ...block.rows.flat());
    if ("title" in block && block.title) bits.push(block.title);
  }
  return bits.join("\n");
}

export function searchCourse(query: string): SearchHit[] {
  const tokens = tokensOf(query);
  if (tokens.length === 0) return [];
  const hits: SearchHit[] = [];
  for (const lesson of getLessons()) {
    const hay = lessonHaystack(lesson);
    if (matchesTokens(hay, tokens)) {
      hits.push({
        type: "lesson",
        title: lesson.title,
        href: lessonPath(lesson.id),
        snippet: lesson.description,
      });
    }
  }
  for (const a of ACRONYMS) {
    const hay = `${a.acronym} ${a.expansion} ${a.blurb}`;
    if (matchesTokens(hay, tokens)) {
      hits.push({
        type: "glossary",
        title: `${a.acronym} — ${a.expansion}`,
        href: "/glossary",
        snippet: a.blurb,
      });
    }
  }
  for (const lab of getLabs()) {
    const hay = `${lab.title} ${lab.description} ${lab.slug}`;
    if (matchesTokens(hay, tokens)) {
      hits.push({
        type: "lab",
        title: lab.title,
        href: `/labs/${lab.slug}`,
        snippet: lab.description,
      });
    }
  }
  for (const o of ALL_OBJECTIVES) {
    const hay = `${o.title} ${o.paraphrase} ${o.officialCode} ${o.subtopics.join(" ")}`;
    if (matchesTokens(hay, tokens)) {
      hits.push({
        type: "objective",
        title: `${o.officialCode} ${o.title}`,
        href: "/objectives",
        snippet: o.paraphrase,
      });
    }
  }
  return hits.slice(0, 40);
}
