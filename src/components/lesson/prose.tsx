"use client";

import type { ReactNode } from "react";
import { ACRONYMS } from "@/content/glossary/acronyms";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function expandAcronyms(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const regex = /\*\*(.+?)\*\*|`([^`]+)`|\b([A-Z]{2,10}(?:\+[A-Z0-9]+)?)\b/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = regex.exec(text))) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    if (match[1]) {
      parts.push(
        <strong key={key++} className="font-semibold">
          {match[1]}
        </strong>,
      );
    } else if (match[2]) {
      parts.push(
        <code
          key={key++}
          className="rounded bg-muted px-1 py-0.5 font-mono text-[0.85em]"
        >
          {match[2]}
        </code>,
      );
    } else {
      const token = match[3]!;
      const hit = ACRONYMS.find((a) => a.acronym.replace(/\+/g, "") === token.replace(/\+/g, ""));
      if (hit) {
        parts.push(
          <Tooltip key={key++}>
            <TooltipTrigger className="cursor-help underline decoration-dotted underline-offset-2">
              {token}
            </TooltipTrigger>
            <TooltipContent className="max-w-xs text-xs">
              <span className="font-medium">{hit.expansion}</span>
              <span className="mt-1 block text-muted-foreground">{hit.blurb}</span>
            </TooltipContent>
          </Tooltip>,
        );
      } else {
        parts.push(token);
      }
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export function Prose({ markdown }: { markdown: string }) {
  const blocks = markdown.trim().split(/\n\n+/);
  return (
    <div className="space-y-3 text-[0.95rem] leading-7 text-foreground">
      {blocks.map((block, i) => {
        if (block.startsWith("- ")) {
          const items = block.split("\n").filter((l) => l.startsWith("- "));
          return (
            <ul key={i} className="list-disc space-y-1 pl-5">
              {items.map((item, j) => (
                <li key={j}>{expandAcronyms(item.replace(/^- /, ""))}</li>
              ))}
            </ul>
          );
        }
        if (/^\d+\. /.test(block)) {
          const items = block.split("\n").filter((l) => /^\d+\. /.test(l));
          return (
            <ol key={i} className="list-decimal space-y-1 pl-5">
              {items.map((item, j) => (
                <li key={j}>{expandAcronyms(item.replace(/^\d+\. /, ""))}</li>
              ))}
            </ol>
          );
        }
        return <p key={i}>{expandAcronyms(block.replace(/\n/g, " "))}</p>;
      })}
    </div>
  );
}
