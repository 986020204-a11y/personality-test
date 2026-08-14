import { PERSONALITY_TYPES } from "@/data/personality-types";
import type { Dimension, PersonalityType } from "@/types";

// A shareable archetype: the base personality type plus a clean URL slug
// (e.g. "the-anchor" -> "anchor") and its source dimension.
export interface Archetype extends PersonalityType {
  slug: string;
  dimension: Dimension;
}

// Slugs are derived by dropping the leading "the-" from each archetype id,
// giving short, human-friendly URLs like /result/anchor.
function toSlug(id: string): string {
  return id.replace(/^the-/, "");
}

// Build the canonical list once at module load.
export const ARCHETYPES: Archetype[] = (
  Object.entries(PERSONALITY_TYPES) as [Dimension, PersonalityType][]
).map(([dimension, type]) => ({
  ...type,
  dimension,
  slug: toSlug(type.id),
}));

const BY_SLUG = new Map<string, Archetype>(
  ARCHETYPES.map((a) => [a.slug, a])
);

/** Look up an archetype by its URL slug. Returns undefined if unknown. */
export function getArchetypeBySlug(slug: string): Archetype | undefined {
  return BY_SLUG.get(slug.toLowerCase());
}

/** All valid slugs, useful for static generation. */
export function getAllArchetypeSlugs(): string[] {
  return ARCHETYPES.map((a) => a.slug);
}

/** Convert a personality type id (e.g. "the-anchor") to its slug ("anchor"). */
export function slugFromTypeId(id: string): string {
  return toSlug(id);
}
