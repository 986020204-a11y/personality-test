"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScoreBar } from "@/components/score-bar";
import { QUESTIONS } from "@/data/questions";
import { calculateResult } from "@/lib/scoring";
import { loadAnswers, clearAnswers } from "@/lib/storage";
import {
  buildShareText,
  copyShareText,
  openTwitterShare,
} from "@/lib/share";
import type { Answer, PersonalityResult } from "@/types";

export function ResultView() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Answer[] | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setAnswers(loadAnswers());
  }, []);

  const result: PersonalityResult | null = useMemo(() => {
    if (!answers || answers.length === 0) return null;
    return calculateResult(QUESTIONS, answers);
  }, [answers]);

  // Before hydration.
  if (answers === null) {
    return (
      <main className="flex flex-1 items-center justify-center px-5">
        <p className="text-sm text-muted-foreground">Loading...</p>
      </main>
    );
  }

  // No answers yet - guide the user to take the test.
  if (!result) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-5 text-center">
        <h1 className="text-2xl font-semibold">No result yet</h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          Take the test first and your result will appear here.
        </p>
        <Link href="/test" className={buttonVariants()}>
          Start the test
        </Link>
      </main>
    );
  }

  const { primaryType, scores } = result;

  // Build once per result; the component stays free of formatting logic.
  const shareText = buildShareText(primaryType);

  const handleShare = () => {
    openTwitterShare(shareText);
  };

  const handleCopy = async () => {
    const ok = await copyShareText(shareText);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRetake = () => {
    clearAnswers();
    router.push("/test");
  };

  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-2xl px-5 py-12 sm:py-16">
        <div className="animate-question-in">
          {/* Result title + description */}
          <Card className="overflow-hidden">
            <div
              className="h-2 w-full"
              style={{ backgroundColor: primaryType.accent }}
            />
            <CardHeader>
              <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                Your primary archetype
              </p>
              <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
                {primaryType.title}
              </h1>
              <p className="text-base text-muted-foreground">
                {primaryType.subtitle}
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-relaxed text-card-foreground">
                {primaryType.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {primaryType.traits.map((trait) => (
                  <span
                    key={trait}
                    className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Score visualization */}
          <Card className="mt-6">
            <CardHeader>
              <h2 className="text-xl font-semibold tracking-tight">
                Your dimension profile
              </h2>
              <p className="text-sm text-muted-foreground">
                A breakdown across all five dimensions.
              </p>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              {scores.map((score) => (
                <ScoreBar
                  key={score.dimension}
                  score={score}
                  highlighted={score.dimension === result.dominantDimension}
                />
              ))}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button onClick={handleShare} className="w-full sm:w-auto">
              Share on X
            </Button>
            <Button
              variant="outline"
              onClick={handleCopy}
              aria-live="polite"
              className="w-full sm:w-auto"
            >
              {copied ? "Copied!" : "Copy result"}
            </Button>
            <Button
              variant="outline"
              onClick={handleRetake}
              className="w-full sm:w-auto"
            >
              Retake test
            </Button>
            <Link
              href="/"
              className={buttonVariants({ variant: "ghost", className: "w-full sm:w-auto" })}
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
