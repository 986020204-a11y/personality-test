import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { QUESTIONS, DIMENSION_LABELS } from "@/data/questions";
import type { Dimension } from "@/types";

const DIMENSIONS = Object.keys(DIMENSION_LABELS) as Dimension[];

const HIGHLIGHTS = [
  {
    title: "Five dimensions",
    body: "We look at how you lead, follow, adapt, explore, and stay safe.",
  },
  {
    title: "One at a time",
    body: "Questions arrive one by one with a calm, focused flow.",
  },
  {
    title: "Private by design",
    body: "Answers stay on your device. No account, no tracking, no backend.",
  },
];

export default function LandingPage() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-5 pt-20 pb-16 text-center sm:pt-28 sm:pb-20">
          <span className="mb-5 inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            A personality test about connection
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
            Discover your dynamic
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            Persona is a short, thoughtful test that maps how you relate to
            others across five dimensions. Honest questions, an affirming
            result, and complete privacy.
          </p>
          <div className="mt-8 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/test"
              className={buttonVariants({ size: "lg", className: "w-full sm:w-auto" })}
            >
              Start the test
            </Link>
            <p className="text-sm text-muted-foreground">
              {QUESTIONS.length} questions - about 3 minutes
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="mx-auto max-w-5xl px-5 py-14 sm:py-20">
        <div className="grid gap-6 sm:grid-cols-3">
          {HIGHLIGHTS.map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-border bg-card p-6"
            >
              <h3 className="text-base font-semibold text-card-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-xl border border-border bg-card p-8 sm:p-10">
          <h2 className="text-2xl font-semibold tracking-tight">
            What we measure
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Every question maps to one of five dimensions. Your strongest
            dimension becomes your primary archetype, but the full picture is
            what makes you, you.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {DIMENSIONS.map((dimension) => (
              <span
                key={dimension}
                className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground"
              >
                {DIMENSION_LABELS[dimension]}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center text-center">
          <h2 className="text-2xl font-semibold tracking-tight">
            Ready when you are
          </h2>
          <p className="mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
            There are no right answers. Go with your first instinct and be
            honest with yourself.
          </p>
          <Link
            href="/test"
            className={buttonVariants({ size: "lg", className: "mt-6" })}
          >
            Start the test
          </Link>
        </div>
      </section>

      <footer className="mx-auto max-w-5xl px-5 pb-10 text-center text-xs text-muted-foreground">
        For adults. Built around consent, boundaries, and mutual care.
      </footer>
    </main>
  );
}
