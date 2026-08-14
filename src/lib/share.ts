import type { PersonalityType } from "@/types";

// All sharing logic lives here, free of React/UI so it can be unit-tested and
// reused. Components only call these helpers and render feedback.

// A small, friendly emoji per archetype to make shared tweets pop.
const ARCHETYPE_EMOJI: Record<string, string> = {
  "the-guide": "\u{1F9ED}", // compass
  "the-trusting": "\u{1F49E}", // sparkling heart
  "the-adaptable": "\u{1F300}", // cyclone
  "the-explorer": "\u{1F9ED}", // compass
  "the-anchor": "\u2693", // anchor
};

// Fallback site URL used during SSR or when window is unavailable. Override
// via NEXT_PUBLIC_SITE_URL for production deployments.
const FALLBACK_SITE_URL = "https://persona.example.com";

/**
 * Resolve the public site URL. Prefers an explicit env var, then the current
 * browser origin, then a safe fallback so share text is never broken.
 */
export function resolveSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  if (fromEnv && fromEnv.length > 0) return fromEnv.replace(/\/+$/, "");
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }
  return FALLBACK_SITE_URL;
}

export function getArchetypeEmoji(typeId: string): string {
  return ARCHETYPE_EMOJI[typeId] ?? "\u2728"; // sparkles
}

/**
 * Build the plain-text share message. Kept separate from URL encoding so it
 * can be reused for both the tweet intent and the clipboard copy.
 */
export function buildShareText(
  personalityType: Pick<PersonalityType, "id" | "title" | "subtitle">,
  siteUrl: string = resolveSiteUrl()
): string {
  const emoji = getArchetypeEmoji(personalityType.id);
  // Deep-link to the archetype's own page so the tweet unfurls the OG image.
  const slug = personalityType.id.replace(/^the-/, "");
  const shareUrl = `${siteUrl}/result/${slug}`;
  return [
    `I got "${personalityType.title}" ${emoji}`,
    "",
    "My personality archetype:",
    personalityType.subtitle,
    "",
    "Discover your type:",
    shareUrl,
  ].join("\n");
}

/**
 * Build a Twitter/X web-intent URL for the given share text.
 */
export function getTwitterShareUrl(shareText: string): string {
  const params = new URLSearchParams({ text: shareText });
  return `https://twitter.com/intent/tweet?${params.toString()}`;
}

/**
 * Open the Twitter/X compose window in a new tab. Returns true if a window was
 * opened (some browsers block popups).
 */
export function openTwitterShare(shareText: string): boolean {
  const url = getTwitterShareUrl(shareText);
  if (typeof window === "undefined") return false;
  const opened = window.open(url, "_blank", "noopener,noreferrer");
  return opened !== null;
}

/**
 * Copy share text to the clipboard. Uses the async Clipboard API with a
 * legacy fallback for older/insecure contexts. Resolves true on success.
 */
export async function copyShareText(shareText: string): Promise<boolean> {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(shareText);
      return true;
    } catch {
      // fall through to legacy path
    }
  }

  if (typeof document === "undefined") return false;
  try {
    const textarea = document.createElement("textarea");
    textarea.value = shareText;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "absolute";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}
