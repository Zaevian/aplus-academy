"use client";

import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export const bigCheckClass =
  "h-14 w-full rounded-full bg-emerald-600 px-6 text-base font-semibold text-white shadow-sm hover:bg-emerald-700 focus-visible:ring-emerald-600/40";

export function AnswerChoice({
  letter,
  text,
  pressed,
  mark,
  dim = false,
  disabled = false,
  onClick,
}: {
  letter: string;
  text: string;
  pressed: boolean;
  mark?: "correct" | "wrong";
  dim?: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  const revealed = mark != null;
  const selected = pressed && !revealed;

  return (
    <button
      type="button"
      data-testid="answer-choice"
      data-selected={selected ? "true" : "false"}
      data-mark={mark ?? "none"}
      aria-pressed={pressed}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex w-full min-h-14 items-center gap-3 rounded-full border-2 px-4 py-3 text-left text-base font-semibold leading-snug transition-[background-color,border-color,box-shadow,transform] duration-150",
        "focus-visible:ring-3 focus-visible:ring-emerald-600/40",
        "enabled:active:scale-[0.99]",
        !selected && !revealed && !dim && "border-border bg-background hover:border-emerald-600/70 hover:bg-emerald-500/5",
        selected && "border-emerald-600 bg-emerald-600 text-white shadow-sm ring-4 ring-emerald-600/30",
        mark === "correct" && "answer-flash-green border-emerald-600 bg-emerald-500/15 text-foreground",
        mark === "wrong" && "answer-shake answer-flash-red border-red-500 bg-red-500/10 text-foreground",
        dim && "border-border bg-background text-muted-foreground",
        disabled && "cursor-default disabled:opacity-100",
      )}
    >
      <span
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold",
          selected && "border-white/80 bg-white/15 text-white",
          !selected && !revealed && "border-foreground/25 text-foreground",
          mark === "correct" && "answer-pop border-emerald-600 bg-emerald-600 text-white",
          mark === "wrong" && "border-red-500 bg-red-500 text-white",
          dim && "border-border text-muted-foreground",
        )}
        aria-hidden
      >
        {mark === "correct" ? (
          <Check className="size-5" strokeWidth={3} />
        ) : mark === "wrong" ? (
          <X className="size-5" strokeWidth={3} />
        ) : (
          letter
        )}
      </span>
      <span className="min-w-0 flex-1">{text}</span>
    </button>
  );
}
