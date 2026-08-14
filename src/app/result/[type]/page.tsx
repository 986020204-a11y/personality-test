import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  getArchetypeBySlug,
  getAllArchetypeSlugs,
} from "@/lib/archetypes";
import { SITE_NAME, getSiteUrl } from "@/lib/site";

interface PageProps {
  params: Promise<{ type: string }>;
}

// Pre-render one static page per known archetype slug.
export function generateStaticParams() {
  return getAllArchetypeSlugs().map((type) => ({ type }));
}

// Per-result metadata, including the dynamic OG image, so link previews on
// Twitter/X and other platforms show the right archetype card.
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { type } = await params;
  const archetype = getArchetypeBySlug(type);

  if (!archetype) {
    return { title: "Result not found" };
  }

  const siteUrl = getSiteUrl();
  const ogImage = `${siteUrl}/api/og?type=${archetype.slug}`;
  const title = `${archetype.title} - ${SITE_NAME}`;
  const description = `${archetype.subtitle} ${archetype.description}`;
  const pageUrl = `${siteUrl}/result/${archetype.slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: SITE_NAME,
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${archetype.title} - ${archetype.subtitle}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ResultArchetypePage({ params }: PageProps) {
  const { type } = await params;
  const archetype = getArchetypeBySlug(type);

  if (!archetype) {
    notFound();
  }

  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-2xl px-5 py-12 sm:py-16">
        <Card className="overflow-hidden">
          <div
            className="h-2 w-full"
            style={{ backgroundColor: archetype.accent }}
          />
          <CardHeader>
            <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              {SITE_NAME}
            </p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
              {archetype.title}
            </h1>
            <p className="text-base text-muted-foreground">
              {archetype.subtitle}
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-base leading-relaxed text-card-foreground">
              {archetype.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {archetype.traits.map((trait) => (
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

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/test" className={buttonVariants({ className: "w-full sm:w-auto" })}>
            Take the test
          </Link>
          <Link
            href="/"
            className={buttonVariants({ variant: "ghost", className: "w-full sm:w-auto" })}
          >
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
