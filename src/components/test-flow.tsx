"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTest } from "@/hooks/use-test";
import { ANSWER_OPTIONS } from "@/data/answer-options";
import { saveAnswers } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export function TestFlow() {
  const router = useRouter();
  const test = useTest();

  // Avoid a hydration flash: render nothing until localStorage is read.
  if (!test.hydrated || !test.currentQuestion) {
    return (
      <main className="flex flex-1 items-center justify-center px-5">
        <p className="text-sm text-muted-foreground">Loading...</p>
      </main>
    );
  }

  const { currentQuestion } = test;

  const handleSelect = (value: number) => {
    test.answerCurrent(value);
  };

  const handleNext = () => {
    if (test.isLast) {
      // Explicitly persist the current answers to localStorage before
      // navigating. This prevents a race condition where the async useEffect
      // persistence in useTest hasn't committed yet when the soft navigation
      // starts unmounting the component tree.
      saveAnswers(test.answers);
      router.push("/result");
    } else {
      test.goNext();
    }
  };

  return (
    <main className="flex flex-1 flex-col">
      {/* Top bar with progress */}
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-2xl items-center gap-4 px-5 py-4">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Exit
          </Link>
          <div className="flex-1">
            <Progress value={test.progress} className="h-2" />
          </div>
          <span className="w-16 text-right text-sm tabular-nums text-muted-foreground">
            {test.answeredCount}/{test.total}
          </span>
        </div>
      </div>

      {/* Question */}
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-5 py-10 sm:py-16">
        <div
          key={currentQuestion.id}
          className="animate-question-in flex flex-1 flex-col"
        >
          <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            {currentQuestion.category}
          </p>
          <h1 className="mt-3 text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
            {currentQuestion.text}
          </h1>

          <div className="mt-8 flex flex-col gap-3">
            {ANSWER_OPTIONS.map((option) => {
              const selected = test.currentAnswer === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  aria-pressed={selected}
                  className={cn(
                    "flex items-center justify-between rounded-lg border px-4 py-4 text-left text-base transition-colors",
                    "hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    selected
                      ? "border-primary bg-primary/5 font-medium"
                      : "border-border bg-card"
                  )}
                >
                  <span>{option.label}</span>
                  <span
                    className={cn(
                      "flex h-5 w-5 items-center justify-center rounded-full border",
                      selected
                        ? "border-primary bg-primary"
                        : "border-muted-foreground/40"
                    )}
                  >
                    {selected && (
                      <span className="h-2 w-2 rounded-full bg-primary-foreground" />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-10 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={test.goBack}
            disabled={test.isFirst}
          >
            Back
          </Button>
          <Button onClick={handleNext} disabled={test.currentAnswer === null}>
            {test.isLast ? "See result" : "Next"}
          </Button>
        </div>
      </div>
    </main>
  );
}
