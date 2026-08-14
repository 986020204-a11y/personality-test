import type { Question, Dimension } from "@/types";

// Human-readable labels for each dimension. Used across the UI and results.
export const DIMENSION_LABELS: Record<Dimension, string> = {
  dominant: "Dominant",
  submissive: "Submissive",
  switch: "Switch",
  openness: "Openness",
  safety: "Safety",
};

// Short descriptions for each dimension, shown on the result page.
export const DIMENSION_DESCRIPTIONS: Record<Dimension, string> = {
  dominant:
    "A drive to lead, guide, and take responsibility for the direction of an experience.",
  submissive:
    "A desire to follow, trust, and let go of control within a caring dynamic.",
  switch:
    "Comfort moving between leading and following depending on mood and partner.",
  openness:
    "Curiosity and willingness to explore new ideas, roles, and experiences.",
  safety:
    "Emphasis on consent, boundaries, communication, and emotional care.",
};

// The question bank. Each question maps to exactly one dimension so scoring
// stays simple and transparent. 6 questions per dimension, 30 total.
// All items are positively keyed toward their dimension (higher agreement =
// stronger dimension), matching the scoring engine's assumptions.
export const QUESTIONS: Question[] = [
  // Dominant (6)
  { id: 1, category: "Leadership", text: "I naturally take the lead when a group can't decide what to do.", dimension: "dominant" },
  { id: 2, category: "Leadership", text: "I feel comfortable making decisions that other people are counting on.", dimension: "dominant" },
  { id: 3, category: "Leadership", text: "People often look to me to set the direction or the plan.", dimension: "dominant" },
  { id: 4, category: "Leadership", text: "I like being responsible for how an experience turns out for everyone.", dimension: "dominant" },
  { id: 5, category: "Leadership", text: "Taking charge energizes me more than it stresses me out.", dimension: "dominant" },
  { id: 6, category: "Leadership", text: "I enjoy guiding someone and helping them feel taken care of.", dimension: "dominant" },

  // Submissive (6)
  { id: 7, category: "Trust", text: "I find it relaxing to let someone I trust take the lead.", dimension: "submissive" },
  { id: 8, category: "Trust", text: "I feel safest when a partner communicates clearly what they want.", dimension: "submissive" },
  { id: 9, category: "Trust", text: "Letting go of control can feel freeing rather than stressful.", dimension: "submissive" },
  { id: 10, category: "Trust", text: "I enjoy supporting someone else's vision instead of leading my own.", dimension: "submissive" },
  { id: 11, category: "Trust", text: "Being looked after and reassured means a lot to me.", dimension: "submissive" },
  { id: 12, category: "Trust", text: "I trust the right person to make good calls on my behalf.", dimension: "submissive" },

  // Switch (6)
  { id: 13, category: "Flexibility", text: "My preferred role changes depending on my mood or the person I'm with.", dimension: "switch" },
  { id: 14, category: "Flexibility", text: "I enjoy both leading and following at different moments.", dimension: "switch" },
  { id: 15, category: "Flexibility", text: "I don't feel locked into a single way of relating to people.", dimension: "switch" },
  { id: 16, category: "Flexibility", text: "I can read a situation and shift how I show up to match it.", dimension: "switch" },
  { id: 17, category: "Flexibility", text: "Sometimes I want to take charge, other times I'd rather be guided.", dimension: "switch" },
  { id: 18, category: "Flexibility", text: "Variety in how a relationship feels keeps things interesting for me.", dimension: "switch" },

  // Openness (6)
  { id: 19, category: "Exploration", text: "I'm curious about trying new experiences with a partner.", dimension: "openness" },
  { id: 20, category: "Exploration", text: "I like learning about perspectives that differ from my own.", dimension: "openness" },
  { id: 21, category: "Exploration", text: "New and unfamiliar situations excite me more than they worry me.", dimension: "openness" },
  { id: 22, category: "Exploration", text: "I'd rather try something unusual than stick to what's predictable.", dimension: "openness" },
  { id: 23, category: "Exploration", text: "I'm comfortable talking openly about desires and preferences.", dimension: "openness" },
  { id: 24, category: "Exploration", text: "Discovering something new about myself is exciting, not scary.", dimension: "openness" },

  // Safety (6)
  { id: 25, category: "Consent", text: "Clear communication and consent are essential to me before anything begins.", dimension: "safety" },
  { id: 26, category: "Consent", text: "I always want agreed-upon boundaries and a way to pause at any time.", dimension: "safety" },
  { id: 27, category: "Consent", text: "Checking in on how someone feels is a natural part of how I connect.", dimension: "safety" },
  { id: 28, category: "Consent", text: "I'd rather slow down and talk things through than rush ahead.", dimension: "safety" },
  { id: 29, category: "Consent", text: "Emotional care and reassurance matter to me as much as the moment itself.", dimension: "safety" },
  { id: 30, category: "Consent", text: "Trust is built through honesty and respecting each other's limits.", dimension: "safety" },
];
