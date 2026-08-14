import type { Dimension, PersonalityType } from "@/types";

// Archetypes resolved from the strongest dimension. Copy is written to feel
// like an identity worth screenshotting: a punchy one-line subtitle, a short
// memorable description, and four sharp traits. Affirming and consent-positive.
export const PERSONALITY_TYPES: Record<Dimension, PersonalityType> = {
  dominant: {
    id: "the-guide",
    title: "The Guide",
    subtitle: "You lead so others can let go.",
    description:
      "You're the one who takes the wheel. People relax around you because you carry the plan and read the room at the same time. Your power isn't loud, it's attentive: you set the direction, then make sure everyone feels safe enough to follow it.",
    traits: ["Decisive", "Protective", "Attentive", "Grounded"],
    accent: "#7c3aed",
  },
  submissive: {
    id: "the-trusting",
    title: "The Trusting",
    subtitle: "Your superpower is letting go.",
    description:
      "You give trust like it's a gift, and it is. When you feel safe, you soften, open up, and bring a warmth that most people only wish they could reach. Following the right person isn't weakness for you, it's how you feel most alive.",
    traits: ["Trusting", "Warm", "Present", "Expressive"],
    accent: "#0ea5e9",
  },
  switch: {
    id: "the-adaptable",
    title: "The Adaptable",
    subtitle: "You refuse to pick just one lane.",
    description:
      "Lead or follow? You say yes to both. You read the moment and become what it needs, sliding between taking charge and letting go without missing a beat. That range is rare, and it makes you unforgettable to be around.",
    traits: ["Versatile", "Intuitive", "Balanced", "Bold"],
    accent: "#10b981",
  },
  openness: {
    id: "the-explorer",
    title: "The Explorer",
    subtitle: "New is your favorite word.",
    description:
      "Comfort zones bore you. You chase the unfamiliar, ask the honest questions, and treat every experience as something to learn from. Curiosity is your compass, and the people who join your adventures never see the world the same way again.",
    traits: ["Curious", "Adventurous", "Open", "Playful"],
    accent: "#f59e0b",
  },
  safety: {
    id: "the-anchor",
    title: "The Anchor",
    subtitle: "You make trust feel like home.",
    description:
      "You're the reason people exhale. Consent, honesty, and clear boundaries aren't rules to you, they're how you love. You slow things down, check in, and hold steady, turning every connection into a place where it's finally safe to be real.",
    traits: ["Steady", "Honest", "Caring", "Respectful"],
    accent: "#ef4444",
  },
};
