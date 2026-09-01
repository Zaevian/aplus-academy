"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { completeOnboarding } from "@/lib/progress-actions";
import { EXAM_META, INTERNAL_SCORING_DISCLAIMER } from "@/lib/exam-meta";

const STEPS = [
  "Welcome",
  "Two exams",
  "How this course works",
  "Mandatory checks",
  "Experience",
  "Diagnostic",
  "Profile",
  "Start",
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("Learner");
  const [exp, setExp] = useState<"new" | "some" | "experienced">("new");

  async function finish() {
    await completeOnboarding({ displayName: name, experience: exp });
    router.replace("/course/foundation");
  }

  return (
    <div className="mx-auto flex min-h-svh max-w-lg flex-col justify-center px-4 py-10">
      <p className="text-xs tracking-wide text-muted-foreground uppercase">
        Step {step + 1} / {STEPS.length}
      </p>
      <h1 className="mt-2 text-2xl font-semibold">{STEPS[step]}</h1>
      <div className="mt-4 space-y-3 text-sm leading-6">
        {step === 0 && (
          <p>
            This is A+ Academy, a full self-study course for CompTIA A+{" "}
            {EXAM_META.version}. It is built to be a primary resource, not a
            flashcard toy. It does not guarantee an exam pass.
          </p>
        )}
        {step === 1 && (
          <p>
            Certification requires <strong>Core 1 (220-1201)</strong> and{" "}
            <strong>Core 2 (220-1202)</strong> from the same version. Each exam
            is up to 90 questions in 90 minutes. Official passing scores are 675
            and 700 on a 100–900 scale.
          </p>
        )}
        {step === 2 && (
          <p>
            You will read, inspect diagrams, use labs, and pass required multiple-choice
            checks. Domain mastery quizzes are 100% gates. Missed ideas return in
            a spaced Review Queue.
          </p>
        )}
        {step === 3 && (
          <p>
            Reading checkpoints and mastery quizzes are mandatory. Wrong answers
            explain every option. You retry until you are correct. No free-text
            exam answers.
          </p>
        )}
        {step === 4 && (
          <div className="flex flex-col gap-2">
            {(["new", "some", "experienced"] as const).map((v) => (
              <Button
                key={v}
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
        {step === 5 && (
          <p>
            A baseline diagnostic is optional and never skips required curriculum.
            It only paints likely strengths and weaknesses. Skip it for now; it
            lives under Practice later.
          </p>
        )}
        {step === 6 && (
          <label className="block text-sm">
            Display name
            <input
              className="mt-1 w-full rounded-md border bg-background px-2 py-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        )}
        {step === 7 && (
          <div className="space-y-2">
            <p>You will start in Course Orientation & IT Foundations.</p>
            <p className="text-muted-foreground">{INTERNAL_SCORING_DISCLAIMER}</p>
          </div>
        )}
      </div>
      <div className="mt-6 flex gap-2">
        {step > 0 ? (
          <Button variant="outline" onClick={() => setStep((s) => s - 1)}>
            Back
          </Button>
        ) : null}
        {step < STEPS.length - 1 ? (
          <Button onClick={() => setStep((s) => s + 1)}>Continue</Button>
        ) : (
          <Button onClick={() => void finish()}>Create local profile</Button>
        )}
      </div>
    </div>
  );
}
