"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { restartCourse } from "@/lib/progress-actions";
import {
  FIRST_LESSON_HREF,
  type OpeningResume,
} from "@/lib/study-path";

/** Catalog titles sometimes use an em dash. Opening copy does not. */
function labelForUi(text: string): string {
  return text.replaceAll(" — ", ", ").replaceAll("—", ", ").replaceAll("–", "-");
}

function primaryCopy(resume: OpeningResume): { label: string; aria: string } {
  const title = labelForUi(resume.title);
  if (resume.source === "begin") {
    return { label: "Begin first lesson", aria: "Begin first lesson" };
  }
  if (resume.source === "next") {
    return {
      label: "Continue this lesson",
      aria: `Continue this lesson, ${title}`,
    };
  }
  if (resume.href === "/exam") {
    return {
      label: "Continue to the exam simulator",
      aria: "Continue to the exam simulator",
    };
  }
  return {
    label: "Continue latest lesson",
    aria: `Continue latest lesson, ${title}`,
  };
}

export function OpeningHero({ resume }: { resume: OpeningResume }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  const primary = primaryCopy(resume);
  const title =
    resume.source === "begin" ? "Foundation lesson 1" : labelForUi(resume.title);
  const objective = labelForUi(resume.objectiveTitle);
  const detail =
    resume.source === "begin"
      ? objective && objective !== labelForUi(resume.title)
        ? `${labelForUi(resume.title)}. ${objective}`
        : labelForUi(resume.title)
      : objective;
  const eyebrow =
    resume.source === "saved" ? "Latest" : resume.source === "next" ? "Next open lesson" : "Start";
  const destructive = resume.source !== "begin";

  async function confirmRestart() {
    setPending(true);
    setError(false);
    try {
      await restartCourse();
      setOpen(false);
      router.push(FIRST_LESSON_HREF);
    } catch {
      setError(true);
    } finally {
      setPending(false);
    }
  }

  return (
    <section
      aria-labelledby="opening-title"
      className="rounded-xl border-2 border-foreground bg-card p-5"
    >
      <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {eyebrow}
      </p>
      <h2 id="opening-title" className="mt-1 text-xl font-semibold">
        {title}
      </h2>
      {detail ? <p className="mt-1 text-sm text-muted-foreground">{detail}</p> : null}
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <Link
          href={resume.href}
          aria-label={primary.aria}
          className={cn(buttonVariants(), "min-h-12 w-full text-base sm:w-auto")}
        >
          {primary.label}
        </Link>
        {destructive ? (
          <Dialog
            open={open}
            onOpenChange={(next) => {
              if (pending) return;
              setOpen(next);
              if (!next) setError(false);
            }}
          >
            <DialogTrigger
              render={
                <Button
                  variant="outline"
                  className="min-h-12 w-full text-base sm:w-auto"
                  aria-label="Start over from Foundation lesson 1"
                />
              }
            >
              Start over
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Start over?</DialogTitle>
                <DialogDescription>
                  This clears lesson progress, quiz scores, and review cards on this
                  device, then opens Foundation lesson 1. Notes and bookmarks stay.
                </DialogDescription>
              </DialogHeader>
              {error ? (
                <p role="alert" className="text-sm text-destructive">
                  Could not clear progress on this device. Try again.
                </p>
              ) : null}
              <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                <Button
                  variant="outline"
                  className="min-h-11"
                  disabled={pending}
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  className="min-h-11"
                  disabled={pending}
                  onClick={() => void confirmRestart()}
                >
                  {pending ? "Clearing progress..." : "Clear progress and start over"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        ) : (
          <Link
            href={FIRST_LESSON_HREF}
            aria-label="Start over from Foundation lesson 1"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "min-h-12 w-full text-base sm:w-auto",
            )}
          >
            Start over
          </Link>
        )}
      </div>
    </section>
  );
}
