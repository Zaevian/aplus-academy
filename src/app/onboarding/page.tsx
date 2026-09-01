"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { completeOnboarding } from "@/lib/progress-actions";
import { EXAM_META, INTERNAL_SCORING_DISCLAIMER } from "@/lib/exam-meta";
import { ListenButton } from "@/components/voice/listen-button";
import { FIRST_LESSON_HREF, FIRST_LESSON_TITLE } from "@/lib/study-path";

const STEPS = [
  {
    title: "Welcome",
    body: `This is A+ Academy, a full self-study course for CompTIA A+ ${EXAM_META.version}. It is a primary resource, not a flashcard toy. It does not guarantee an exam pass.`,
  },
  {
    title: "Two exams",
    body: "Certification requires Core 1 (220-1201) and Core 2 (220-1202) from the same version. Each exam is up to 90 questions in 90 minutes. Official passing scores are 675 and 700 on a 100–900 scale. This app never converts Internal Readiness into those numbers.",
  },
  {
    title: "How you will study",
    body: "The path is Foundation, then Core 1, then Core 2. You will read, inspect diagrams, use labs, and pass required multiple-choice checks. Domain mastery quizzes are 100 percent gates.",
  },
  {
    title: "Mandatory checks",
    body: "Reading checkpoints and mastery quizzes are mandatory. Wrong answers explain every option. You retry until you are correct.",
  },
  {
    title: "Experience",
    body: "Tell us your background so we can set the tone. New to IT, some experience, or experienced. The curriculum is the same either way.",
  },
  {
    title: "Diagnostic",
    body: "A baseline diagnostic is optional and never skips required curriculum. Skip it for now. It lives under Practice later.",
  },
  {
    title: "Your name",
    body: "This stays on this device. No account is required.",
  },
  {
    title: "Start lesson 1",
    body: `You will not land on a dashboard. Your first screen is Foundation lesson 1: ${FIRST_LESSON_TITLE}. That is where the course begins. ${INTERNAL_SCORING_DISCLAIMER}`,
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("Learner");
  const [exp, setExp] = useState<"new" | "some" | "experienced">("new");
  const current = STEPS[step]!;

  async function finish() {
    await completeOnboarding({ displayName: name, experience: exp });
    router.replace(FIRST_LESSON_HREF);
  }

  return (
    <div className="mx-auto flex min-h-svh max-w-lg flex-col justify-center px-4 py-10">
      <p className="text-xs tracking-wide text-muted-foreground uppercase">
        Setup {step + 1} / {STEPS.length} · then lesson 1
      </p>
      <h1 className="mt-2 text-2xl font-semibold">{current.title}</h1>
      <div className="mt-4 space-y-3 text-sm leading-6">
        <p>{current.body}</p>
        <ListenButton text={current.body} title={current.title} />
        {step === 4 && (
          <div className="flex flex-col gap-2">
            {(["new", "some", "experienced"] as const).map((v) => (
              <Button
                key={v}
                className="min-h-11"
                variant={exp === v ? "default" : "outline"}
                onClick={() => setExp(v)}
              >
                {v === "new"
                  ? "New to IT"
                  : v === "some"
                    ? "Some experience"
                    : "Experienced"}
              </Button>
            ))}
          </div>
        )}
        {step === 6 && (
          <label className="block text-sm">
            Display name
            <input
              className="mt-1 min-h-11 w-full rounded-md border bg-background px-2 py-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        )}
      </div>
      <div className="mt-6 flex gap-2">
        {step > 0 ? (
          <Button className="min-h-11" variant="outline" onClick={() => setStep((s) => s - 1)}>
            Back
          </Button>
        ) : null}
        {step < STEPS.length - 1 ? (
          <Button className="min-h-11" onClick={() => setStep((s) => s + 1)}>
            Continue
          </Button>
        ) : (
          <Button className="min-h-11" onClick={() => void finish()}>
            Start lesson 1 · {FIRST_LESSON_TITLE}
          </Button>
        )}
      </div>
    </div>
  );
}
