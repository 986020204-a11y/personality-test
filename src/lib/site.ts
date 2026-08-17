// Central site metadata.
//
// Site URL resolution order:
//   1. NEXT_PUBLIC_SITE_URL - explicit override, use this for canonical URLs.
//   2. VERCEL_PROJECT_PRODUCTION_URL - Vercel's stable production alias.
//   3. VERCEL_URL - the current deployment's URL (covers preview builds).
//   4. Hard-coded production fallback so the OG/Twitter tags always resolve
//      to a real, fetch-able origin instead of a placeholder domain.
export const SITE_NAME = "Personality Archetype Test";

const PRODUCTION_FALLBACK_URL = "https://personality-test-bay-eight.vercel.app";

function normalize(rawUrl: string): string {
  const trimmed = rawUrl.trim().replace(/\/+$/, "");
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit && explicit.length > 0) return normalize(explicit);

  const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProd && vercelProd.length > 0) return normalize(vercelProd);

  const vercelDeployment = process.env.VERCEL_URL;
  if (vercelDeployment && vercelDeployment.length > 0) return normalize(vercelDeployment);

  return PRODUCTION_FALLBACK_URL;
}

// A short display label (no protocol) for cards and footers.
export function getSiteLabel(): string {
  return getSiteUrl().replace(/^https?:\/\//, "");
}
