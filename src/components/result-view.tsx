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

// Per-archetype accent palettes for a richer visual identity.
const ACCENT_MAP: Record<string, { primary: string; glow: string }> = {
  "the-guide": { primary: "#e85d2c", glow: "#e85d2c" },
  "the-trusting": { primary: "#2563eb", glow: "#2563eb" },
  "the-adaptable": { primary: "#7c3aed", glow: "#7c3aed" },
  "the-explorer": { primary: "#0891b2", glow: "#0891b2" },
  "the-anchor": { primary: "#0d9488", glow: "#0d9488" },
};

function getAccent(typeId: string) {
  return ACCENT_MAP[typeId] ?? { primary: "#7c3aed", glow: "#7c3aed" };
}

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
  const accent = getAccent(primaryType.id);
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
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: [
              `radial-gradient(ellipse 80% 60% at 50% 0%, ${accent.glow}22 0%, transparent 70%)`,
              `linear-gradient(to bottom, ${accent.primary}0a, transparent 60%)`,
            ].join(", "),
          }}
        />
        <div className="relative mx-auto w-full max-w-md px-5 pb-8 pt-12 text-center sm:pt-16 sm:pb-10">
          <div className="animate-question-in">
            <p
              className="text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: accent.primary }}
            >
              Your Archetype
            </p>

            <h1
              className="mt-3 text-[2.5rem] font-extrabold leading-[1.1] tracking-tight sm:text-6xl"
              style={{ color: accent.primary }}
            >
              {primaryType.title}
            </h1>

            <p className="mt-3 text-base font-medium text-foreground/70 sm:text-lg">
              {primaryType.subtitle}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              {primaryType.traits.map((trait) => (
                <span
                  key={trait}
                  className="rounded-md px-3 py-1 text-xs font-bold uppercase tracking-wide"
                  style={{
                    color: accent.primary,
                    backgroundColor: `${accent.primary}14`,
                    border: `1.5px solid ${accent.primary}30`,
                  }}
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== BODY ===== */}
      <div className="mx-auto w-full max-w-md px-5 pb-10 pt-4 sm:pt-6 sm:pb-14">
        <div className="animate-question-in" style={{ animationDelay: "0.06s" }}>

          {/* Description */}
          <div
            className="rounded-xl border p-5 sm:p-6"
            style={{ borderColor: `${accent.primary}20` }}
          >
            <p className="text-[0.95rem] leading-relaxed text-foreground/85 sm:text-base">
              {primaryType.description}
            </p>
          </div>

          {/* ===== DIMENSION PROFILE ===== */}
          <div className="mt-7">
            <h2 className="text-base font-bold tracking-tight text-foreground">
              Dimension Profile
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Your score across all five dimensions
            </p>
            <div className="mt-4 flex flex-col gap-3.5">
              {scores.map((score) => (
                <ScoreBar
                  key={score.dimension}
                  score={score}
                  highlighted={score.dimension === result.dominantDimension}
                  accent={accent.primary}
                />
              ))}
            </div>
          </div>

          {/* ===== SHARE ===== */}
          <div
            className="mt-7 rounded-xl p-5 text-center sm:p-6"
            style={{ backgroundColor: `${accent.primary}08`, border: `1px solid ${accent.primary}18` }}
          >
            <p className="text-sm font-semibold text-foreground">
              Share your result
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Let others discover their archetype
            </p>
            <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
              <Button
                onClick={handleShare}
                className="w-full text-white sm:w-auto"
                style={{ backgroundColor: accent.primary }}
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

          {/* ===== PREMIUM CTA ===== */}
          <div
            className="mt-7 overflow-hidden rounded-xl p-5 text-center sm:p-6"
            style={{
              background: `linear-gradient(145deg, ${accent.primary}f0 0%, ${accent.primary}d0 100%)`,
            }}
          >
            <p className="text-lg font-bold text-white sm:text-xl">
              Unlock Your Full Report
            </p>
            <p className="mx-auto mt-1.5 max-w-xs text-xs leading-relaxed text-white/75 sm:text-sm">
              Detailed breakdown, compatibility insights, and personalized guidance for your intimacy profile.
            </p>
            <div className="mt-4">
              <span className="inline-block rounded-lg border border-white/25 bg-white/10 px-5 py-2 text-sm font-semibold text-white">
                Coming soon
              </span>
            </div>
          </div>

          {/* ===== NAV ===== */}
          <div className="mt-7 flex gap-3">
            <Button
              variant="outline"
              onClick={handleRetake}
              className="flex-1"
            >
              Retake test
            </Button>
            <Link
              href="/"
              className={buttonVariants({ variant: "ghost", className: "flex-1" })}
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
