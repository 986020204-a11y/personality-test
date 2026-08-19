import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium Report - Intimacy Archetype Test",
  description:
    "Unlock your full intimacy profile with a detailed 100+ question assessment, compatibility analysis, and personalized guidance.",
};

const FEATURES = [
  {
    title: "100+ Deep Questions",
    description: "Go beyond the surface with an extended assessment covering all five dimensions in depth.",
  },
  {
    title: "Compatibility Analysis",
    description: "Discover how your archetype interacts with others and which dynamics bring out your best.",
  },
  {
    title: "Personalized Guidance",
    description: "Receive tailored communication scripts, boundary frameworks, and growth strategies.",
  },
  {
    title: "Detailed Dimension Breakdown",
    description: "See your full score profile with sub-dimension analysis and trait explanations.",
  },
  {
    title: "Relationship Patterns",
    description: "Understand your recurring patterns, triggers, and opportunities for deeper connection.",
  },
  {
    title: "Private & Secure",
    description: "Your results stay yours. Encrypted, never shared, and accessible only to you.",
  },
];

const COMPARISON = [
  { feature: "Questions", free: "36", premium: "100+" },
  { feature: "Result archetype", free: "Yes", premium: "Yes" },
  { feature: "Dimension scores", free: "Basic", premium: "Detailed" },
  { feature: "Strengths & challenges", free: "Overview", premium: "In-depth" },
  { feature: "Compatibility insights", free: "No", premium: "Yes" },
  { feature: "Communication scripts", free: "No", premium: "Yes" },
  { feature: "Relationship patterns", free: "No", premium: "Yes" },
  { feature: "PDF download", free: "No", premium: "Yes" },
];

export default function PremiumPage() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="mx-auto max-w-lg px-5 pb-10 pt-14 text-center sm:pt-20 sm:pb-14">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Premium Report
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Your Full Intimacy Profile
          </h1>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">
            Go deeper than the free test. Understand your patterns, unlock compatibility insights, and get personalized guidance for your intimate relationships.
          </p>
          <div className="mt-6 inline-block rounded-lg border border-primary/20 bg-primary/5 px-4 py-2">
            <p className="text-sm font-semibold text-primary">
              Coming Soon
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto w-full max-w-lg px-5 py-10 sm:py-14">
        <h2 className="text-center text-sm font-bold uppercase tracking-wide text-foreground/60">
          What You Get
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {FEATURES.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-border p-4"
            >
              <h3 className="text-sm font-bold text-foreground">
                {item.title}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="mx-auto w-full max-w-lg px-5 pb-10 sm:pb-14">
        <h2 className="text-center text-sm font-bold uppercase tracking-wide text-foreground/60">
          Free vs Premium
        </h2>
        <div className="mt-6 overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Feature</th>
                <th className="px-4 py-3 text-center font-medium text-muted-foreground">Free</th>
                <th className="px-4 py-3 text-center font-medium text-primary">Premium</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row, i) => (
                <tr
                  key={row.feature}
                  className={i < COMPARISON.length - 1 ? "border-b border-border/50" : ""}
                >
                  <td className="px-4 py-2.5 text-foreground/80">{row.feature}</td>
                  <td className="px-4 py-2.5 text-center text-muted-foreground">{row.free}</td>
                  <td className="px-4 py-2.5 text-center font-medium text-foreground">{row.premium}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-lg px-5 pb-14 text-center sm:pb-20">
        <div className="rounded-xl bg-primary/5 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-foreground sm:text-2xl">
            Not ready yet?
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Start with the free 36-question test and discover your primary archetype.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/test"
              className={buttonVariants({ className: "w-full sm:w-auto" })}
            >
              Take the free test
            </Link>
            <Link
              href="/"
              className={buttonVariants({ variant: "ghost", className: "w-full sm:w-auto" })}
            >
              Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
