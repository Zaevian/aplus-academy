import { ALL_OBJECTIVES } from "@/content/catalog";
import { ACRONYMS } from "@/content/glossary/acronyms";
import { getLabs, getLessons } from "@/content/registry";

export type SearchHit = {
  type: "lesson" | "glossary" | "lab" | "objective";
  title: string;
  href: string;
  snippet: string;
};

export function searchCourse(query: string): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  const hits: SearchHit[] = [];
  for (const lesson of getLessons()) {
    if (
      lesson.title.toLowerCase().includes(q) ||
      lesson.description.toLowerCase().includes(q)
    ) {
      hits.push({
        type: "lesson",
        title: lesson.title,
        href: `/course`,
        snippet: lesson.description,
      });
    }
  }
  for (const a of ACRONYMS) {
    if (
      a.acronym.toLowerCase().includes(q) ||
      a.expansion.toLowerCase().includes(q) ||
      a.blurb.toLowerCase().includes(q)
    ) {
      hits.push({
        type: "glossary",
        title: `${a.acronym} — ${a.expansion}`,
        href: "/glossary",
        snippet: a.blurb,
      });
    }
  }
  for (const lab of getLabs()) {
    if (lab.title.toLowerCase().includes(q) || lab.description.toLowerCase().includes(q)) {
      hits.push({
        type: "lab",
        title: lab.title,
        href: `/labs/${lab.slug}`,
        snippet: lab.description,
      });
    }
  }
  for (const o of ALL_OBJECTIVES) {
    if (o.title.toLowerCase().includes(q) || o.paraphrase.toLowerCase().includes(q)) {
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
