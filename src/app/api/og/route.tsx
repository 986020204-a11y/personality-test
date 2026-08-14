import { ImageResponse } from "next/og";
import { getArchetypeBySlug } from "@/lib/archetypes";
import { ResultOg } from "@/components/og/result-og";
import { getSiteLabel } from "@/lib/site";

// Node runtime (edge is deprecated in Next 16). ImageResponse runs fine here.
export const runtime = "nodejs";

const SIZE = { width: 1200, height: 630 };

export function GET(request: Request): Response {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") ?? "";

  const archetype = getArchetypeBySlug(type);

  // Unknown or missing type: render a neutral fallback card rather than error,
  // so a broken link never shows a dead social preview.
  if (!archetype) {
    return new ImageResponse(
      (
        <ResultOg
          title="Discover Your Type"
          subtitle="Take the personality archetype test"
          traits={["Lead", "Trust", "Adapt", "Explore"]}
          accent="#7c3aed"
          siteLabel={getSiteLabel()}
        />
      ),
      SIZE
    );
  }

  return new ImageResponse(
    (
      <ResultOg
        title={archetype.title}
        subtitle={archetype.subtitle}
        traits={archetype.traits}
        accent={archetype.accent}
        siteLabel={getSiteLabel()}
      />
    ),
    SIZE
  );
}
