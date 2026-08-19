"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { ScoreBar } from "@/components/score-bar";
import { QUESTIONS } from "@/data/questions";
import { ARCHETYPE_CONTENT } from "@/data/archetype-content";
import { calculateResult } from "@/lib/scoring";
import { loadAnswers, clearAnswers } from "@/lib/storage";
import {
  buildShareText,
  copyShareText,
  openTwitterShare,
} from "@/lib/share";
import type { Answer, Dimension, PersonalityResult } from "@/types";

// Per-archetype visual accents
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
    try {
      return calculateResult(QUESTIONS, answers);
    } catch {
      return null;
    }
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

  const { primaryType, scores, dominantDimension } = result;
  const accent = getAccent(primaryType.id);
  const content = ARCHETYPE_CONTENT[dominantDimension as Dimension];
  const shareText = buildShareText(primaryType);

  const handleShare = () => openTwitterShare(shareText);

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
      {/* ===== 1. HERO: Strong Result Title ===== */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 90% 50% at 50% 0%, ${accent.glow}20 0%, transparent 70%)`,
          }}
        />
        <div className="relative mx-auto w-full max-w-md px-5 pb-6 pt-12 text-center sm:pt-16 sm:pb-8">
          <div className="animate-question-in">
            <p
              className="text-[0.65rem] font-bold uppercase tracking-[0.25em]"
              style={{ color: accent.primary }}
            >
              Your Intimacy Archetype
            </p>
            <h1
              className="mt-2 text-[2.75rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl"
              style={{ color: accent.primary }}
            >
              {primaryType.title}
            </h1>
            <p className="mt-2 text-base font-medium text-foreground/70 sm:text-lg">
              {primaryType.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* ===== BODY ===== */}
      <div className="mx-auto w-full max-w-md px-5 pb-10 pt-2 sm:pt-4 sm:pb-14">
        <div className="animate-question-in" style={{ animationDelay: "0.06s" }}>

          {/* ===== 2. Core Traits ===== */}
          <div className="flex flex-wrap justify-center gap-2">
            {primaryType.traits.map((trait) => (
              <span
                key={trait}
                className="rounded-md px-3 py-1.5 text-xs font-bold uppercase tracking-wide"
                style={{
                  color: accent.primary,
                  backgroundColor: `${accent.primary}12`,
                  border: `1.5px solid ${accent.primary}28`,
                }}
              >
                {trait}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="mt-5 text-center text-[0.9rem] leading-relaxed text-foreground/80 sm:text-base">
            {primaryType.description}
          </p>

          {/* ===== Dimension Profile ===== */}
          <div className="mt-8">
            <h2 className="text-sm font-bold uppercase tracking-wide text-foreground/60">
              Dimension Profile
            </h2>
            <div className="mt-3 flex flex-col gap-3">
              {scores.map((score) => (
                <ScoreBar
                  key={score.dimension}
                  score={score}
                  highlighted={score.dimension === dominantDimension}
                  accent={accent.primary}
                />
              ))}
            </div>
          </div>

          {/* ===== 3. Strengths ===== */}
          <div className="mt-8">
            <h2 className="text-sm font-bold uppercase tracking-wide text-foreground/60">
              Your Strengths
            </h2>
            <div className="mt-3 space-y-2.5">
              {content.strengths.map((s, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-lg p-3"
                  style={{ backgroundColor: `${accent.primary}08` }}
                >
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[0.65rem] font-bold text-white"
                    style={{ backgroundColor: accent.primary }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm leading-snug text-foreground/85">{s}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ===== 4. Challenges ===== */}
          <div className="mt-8">
            <h2 className="text-sm font-bold uppercase tracking-wide text-foreground/60">
              Potential Challenges
            </h2>
            <div className="mt-3 space-y-2.5">
              {content.challenges.map((c, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-lg border border-border/60 p-3"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-[0.65rem] font-bold text-muted-foreground">
                    !
                  </span>
                  <p className="text-sm leading-snug text-foreground/75">{c}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ===== 5. Share ===== */}
          <div
            className="mt-8 rounded-xl p-5 text-center sm:p-6"
            style={{
              backgroundColor: `${accent.primary}08`,
              border: `1px solid ${accent.primary}16`,
            }}
          >
            <p className="text-base font-bold text-foreground">
              Share your archetype
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              See what archetype your friends get
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

          {/* ===== 6. Premium Report Preview ===== */}
          <div
            className="mt-8 overflow-hidden rounded-xl"
            style={{
              background: `linear-gradient(150deg, ${accent.primary}f2 0%, ${accent.primary}c8 100%)`,
            }}
          >
            <div className="p-5 text-center sm:p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-white/60">
                Premium Report
              </p>
              <p className="mt-1 text-lg font-bold text-white sm:text-xl">
                Unlock Your Full Profile
              </p>
              <p className="mx-auto mt-2 max-w-xs text-xs leading-relaxed text-white/70 sm:text-sm">
                Your personalized report includes:
              </p>
              <div className="mx-auto mt-4 max-w-xs space-y-2 text-left">
                {content.premiumTeaser.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-white/50" />
                    <p className="text-xs text-white/80 sm:text-sm">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5">
                <span className="inline-block rounded-lg border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold text-white">
                  Coming soon
                </span>
              </div>
            </div>
          </div>

          {/* ===== Navigation ===== */}
          <div className="mt-8 flex gap-3">
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
