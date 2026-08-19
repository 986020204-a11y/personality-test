"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
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

  if (answers === null) {
    return (
      <main className="flex flex-1 items-center justify-center px-5">
        <p className="text-sm text-muted-foreground">Loading...</p>
      </main>
    );
  }

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
    <main className="flex flex-1 flex-col bg-background">
      {/* Hero section */}
      <section
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${primaryType.accent}18 0%, ${primaryType.accent}08 50%, transparent 100%)`,
        }}
      >
        <div className="mx-auto w-full max-w-lg px-5 pb-10 pt-14 text-center sm:pt-20 sm:pb-14">
          <div className="animate-question-in">
            {/* Accent badge */}
            <div
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl sm:h-20 sm:w-20"
              style={{ backgroundColor: `${primaryType.accent}20` }}
            >
              <div
                className="h-8 w-8 rounded-lg sm:h-10 sm:w-10"
                style={{ backgroundColor: primaryType.accent }}
              />
            </div>

            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Your archetype
            </p>
            <h1
              className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl"
              style={{ color: primaryType.accent }}
            >
              {primaryType.title}
            </h1>
            <p className="mt-3 text-lg text-muted-foreground sm:text-xl">
              {primaryType.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="mx-auto w-full max-w-lg px-5 py-8 sm:py-12">
        <div className="animate-question-in" style={{ animationDelay: "0.08s" }}>
          {/* Traits */}
          <div className="flex flex-wrap justify-center gap-2">
            {primaryType.traits.map((trait) => (
              <span
                key={trait}
                className="rounded-full border px-4 py-1.5 text-sm font-medium"
                style={{
                  borderColor: `${primaryType.accent}40`,
                  color: primaryType.accent,
                  backgroundColor: `${primaryType.accent}08`,
                }}
              >
                {trait}
              </span>
            ))}
          </div>

          {/* Description card */}
          <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <p className="text-base leading-relaxed text-card-foreground sm:text-lg">
              {primaryType.description}
            </p>
          </div>

          {/* Score breakdown */}
          <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-semibold tracking-tight">
              Your dimension profile
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              How you scored across all five dimensions.
            </p>
            <div className="mt-6 flex flex-col gap-4">
              {scores.map((score) => (
                <ScoreBar
                  key={score.dimension}
                  score={score}
                  highlighted={score.dimension === result.dominantDimension}
                  accent={primaryType.accent}
                />
              ))}
            </div>
          </div>

          {/* Share section */}
          <div className="mt-8 rounded-2xl border border-border bg-card p-6 text-center shadow-sm sm:p-8">
            <h2 className="text-lg font-semibold tracking-tight">
              Share your result
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Let others discover their archetype too.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                onClick={handleShare}
                className="w-full sm:w-auto"
                style={{ backgroundColor: primaryType.accent }}
              >
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
            </div>
          </div>

          {/* Premium Report CTA */}
          <div
            className="mt-8 overflow-hidden rounded-2xl p-6 text-center sm:p-8"
            style={{
              background: `linear-gradient(135deg, ${primaryType.accent} 0%, ${primaryType.accent}cc 100%)`,
            }}
          >
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              Unlock Your Full Report
            </h2>
            <p className="mx-auto mt-2 max-w-sm text-sm text-white/80 sm:text-base">
              Get a detailed breakdown of your intimacy profile, compatibility insights, and personalized guidance.
            </p>
            <Button
              variant="outline"
              className="mt-5 border-white/30 bg-white/10 text-white hover:bg-white/20"
            >
              Coming soon
            </Button>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex flex-col gap-3 pb-4 sm:flex-row sm:justify-center">
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
