// Central site metadata. Override NEXT_PUBLIC_SITE_URL in production.
export const SITE_NAME = "Personality Archetype Test";

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  if (fromEnv && fromEnv.length > 0) return fromEnv.replace(/\/+$/, "");
  return "https://persona.example.com";
}

// A short display label (no protocol) for cards and footers.
export function getSiteLabel(): string {
  return getSiteUrl().replace(/^https?:\/\//, "");
}
