import type { Question, Dimension } from "@/types";

// Human-readable labels for each dimension.
export const DIMENSION_LABELS: Record<Dimension, string> = {
  dominant: "Dominant",
  submissive: "Submissive",
  switch: "Switch",
  explorer: "Explorer",
  anchor: "Anchor",
};

// Short descriptions for each dimension, shown on the result page.
export const DIMENSION_DESCRIPTIONS: Record<Dimension, string> = {
  dominant:
    "Leadership, guidance, and confidence in intimate connection.",
  submissive:
    "Trust, surrender, and deep connection through following.",
  switch:
    "Flexibility, balance, and adaptability across roles.",
  explorer:
    "Curiosity, adventure, and openness to new experiences.",
  anchor:
    "Safety, communication, and trust as the foundation of intimacy.",
};

// 36-question Intimacy Archetype Test.
// 7 dominant, 7 submissive, 7 switch, 7 explorer, 8 anchor = 36 total.
// All items are positively keyed toward their dimension.
export const QUESTIONS: Question[] = [
  // --- Dominant (7): Leadership · Guidance · Confidence ---
  { id: 1, category: "Leadership", text: "I enjoy taking the lead during intimate experiences.", dimension: "dominant" },
  { id: 2, category: "Leadership", text: "I feel confident making decisions when my partner trusts my guidance.", dimension: "dominant" },
  { id: 3, category: "Leadership", text: "I enjoy creating structure, rules, or boundaries for shared experiences.", dimension: "dominant" },
  { id: 4, category: "Leadership", text: "Being responsible for my partner's comfort and experience feels meaningful to me.", dimension: "dominant" },
  { id: 5, category: "Leadership", text: "I enjoy guiding my partner through new experiences.", dimension: "dominant" },
  { id: 6, category: "Leadership", text: "I like setting the pace and atmosphere during intimate moments.", dimension: "dominant" },
  { id: 7, category: "Leadership", text: "I believe leadership in intimacy requires care, awareness, and responsibility.", dimension: "dominant" },

  // --- Submissive (7): Trust · Surrender · Connection ---
  { id: 8, category: "Trust", text: "I enjoy relaxing and allowing a trusted partner to take the lead.", dimension: "submissive" },
  { id: 9, category: "Trust", text: "Following clear guidance from a partner feels comfortable to me.", dimension: "submissive" },
  { id: 10, category: "Trust", text: "I enjoy the feeling of being protected and cared for.", dimension: "submissive" },
  { id: 11, category: "Trust", text: "Trusting someone deeply allows me to feel more connected.", dimension: "submissive" },
  { id: 12, category: "Trust", text: "Letting go of control can feel freeing and rewarding.", dimension: "submissive" },
  { id: 13, category: "Trust", text: "I appreciate partners who confidently guide me.", dimension: "submissive" },
  { id: 14, category: "Trust", text: "I enjoy focusing on my partner's direction and intentions.", dimension: "submissive" },

  // --- Switch (7): Flexibility · Balance · Adaptability ---
  { id: 15, category: "Flexibility", text: "My preferred role changes depending on my mood and my partner.", dimension: "switch" },
  { id: 16, category: "Flexibility", text: "I enjoy experiencing both leading and following.", dimension: "switch" },
  { id: 17, category: "Flexibility", text: "I do not feel limited to one specific role.", dimension: "switch" },
  { id: 18, category: "Flexibility", text: "I naturally adjust my behavior based on the situation.", dimension: "switch" },
  { id: 19, category: "Flexibility", text: "I enjoy exploring different sides of my personality.", dimension: "switch" },
  { id: 20, category: "Flexibility", text: "I can comfortably move between giving and receiving control.", dimension: "switch" },
  { id: 21, category: "Flexibility", text: "Variety and flexibility make intimate experiences more interesting.", dimension: "switch" },

  // --- Explorer (7): Curiosity · Adventure · Openness ---
  { id: 22, category: "Curiosity", text: "I am curious about discovering new experiences with a partner.", dimension: "explorer" },
  { id: 23, category: "Curiosity", text: "I enjoy exploring ideas that are different from what I already know.", dimension: "explorer" },
  { id: 24, category: "Curiosity", text: "Trying something unfamiliar can be exciting for me.", dimension: "explorer" },
  { id: 25, category: "Curiosity", text: "I enjoy discovering new aspects of myself through experiences.", dimension: "explorer" },
  { id: 26, category: "Curiosity", text: "I like exploring different roles, emotions, and dynamics.", dimension: "explorer" },
  { id: 27, category: "Curiosity", text: "I believe curiosity helps create deeper connections.", dimension: "explorer" },
  { id: 28, category: "Curiosity", text: "I enjoy stepping outside my comfort zone with someone I trust.", dimension: "explorer" },

  // --- Anchor (8): Safety · Communication · Trust ---
  { id: 29, category: "Safety", text: "Clear communication is essential before exploring intimacy.", dimension: "anchor" },
  { id: 30, category: "Safety", text: "I value discussing boundaries and expectations openly.", dimension: "anchor" },
  { id: 31, category: "Safety", text: "Making sure my partner feels safe is very important to me.", dimension: "anchor" },
  { id: 32, category: "Safety", text: "I believe trust is the foundation of a strong connection.", dimension: "anchor" },
  { id: 33, category: "Safety", text: "I appreciate partners who communicate honestly about their feelings.", dimension: "anchor" },
  { id: 34, category: "Safety", text: "Aftercare and emotional connection are important parts of intimacy.", dimension: "anchor" },
  { id: 35, category: "Safety", text: "Respecting boundaries creates a better experience for everyone.", dimension: "anchor" },
  { id: 36, category: "Safety", text: "I prefer relationships where both partners feel understood and respected.", dimension: "anchor" },
];
