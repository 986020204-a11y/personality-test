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
    "A drive to lead, protect, and take responsibility for the direction of intimate connection.",
  submissive:
    "A desire to trust, surrender, and feel held within a caring dynamic.",
  switch:
    "Comfort moving between leading and following depending on mood, energy, and partner.",
  explorer:
    "Curiosity and willingness to discover new desires, roles, and experiences together.",
  anchor:
    "Deep emphasis on consent, emotional safety, communication, and aftercare.",
};

// 36-question Intimacy Archetype Test.
// 8 dom, 7 sub, 7 switch, 7 explorer, 7 anchor = 36 total.
// All items are positively keyed toward their dimension.
export const QUESTIONS: Question[] = [
  // --- Dominant (8) ---
  { id: 1, category: "Presence", text: "I naturally take charge when a partner seems unsure of what they want.", dimension: "dominant" },
  { id: 2, category: "Presence", text: "I enjoy planning and setting the tone for an intimate experience.", dimension: "dominant" },
  { id: 3, category: "Presence", text: "Being responsible for my partner's pleasure feels rewarding, not heavy.", dimension: "dominant" },
  { id: 4, category: "Presence", text: "I feel most connected when I'm guiding the pace and direction.", dimension: "dominant" },
  { id: 5, category: "Presence", text: "I like knowing my partner trusts me enough to follow my lead.", dimension: "dominant" },
  { id: 6, category: "Presence", text: "Clear instructions come naturally to me when I sense a partner wants them.", dimension: "dominant" },
  { id: 7, category: "Presence", text: "I feel energized, not drained, when I hold the decision-making space.", dimension: "dominant" },
  { id: 8, category: "Presence", text: "Protecting someone's vulnerability brings out the best in me.", dimension: "dominant" },

  // --- Submissive (7) ---
  { id: 9, category: "Surrender", text: "I feel safest when someone I trust makes the decisions for us.", dimension: "submissive" },
  { id: 10, category: "Surrender", text: "Letting go of control during intimacy helps me relax deeply.", dimension: "submissive" },
  { id: 11, category: "Surrender", text: "I enjoy being guided rather than choosing the next step myself.", dimension: "submissive" },
  { id: 12, category: "Surrender", text: "Receiving focused attention and direction makes me feel desired.", dimension: "submissive" },
  { id: 13, category: "Surrender", text: "Vulnerability feels like strength when I'm with the right person.", dimension: "submissive" },
  { id: 14, category: "Surrender", text: "I find freedom in not having to be in charge.", dimension: "submissive" },
  { id: 15, category: "Surrender", text: "Being taken care of emotionally and physically is deeply fulfilling.", dimension: "submissive" },

  // --- Switch (7) ---
  { id: 16, category: "Fluidity", text: "My ideal role shifts depending on my mood and who I'm with.", dimension: "switch" },
  { id: 17, category: "Fluidity", text: "I get bored if I always play the same part in a dynamic.", dimension: "switch" },
  { id: 18, category: "Fluidity", text: "I enjoy surprising a partner by shifting energy mid-experience.", dimension: "switch" },
  { id: 19, category: "Fluidity", text: "I can read when someone needs me to lead or follow, and I adjust.", dimension: "switch" },
  { id: 20, category: "Fluidity", text: "Taking turns in control keeps a connection alive for me.", dimension: "switch" },
  { id: 21, category: "Fluidity", text: "I don't identify with just one role — range is part of who I am.", dimension: "switch" },
  { id: 22, category: "Fluidity", text: "Flexibility in intimacy feels more honest than picking a fixed lane.", dimension: "switch" },

  // --- Explorer (7) ---
  { id: 23, category: "Discovery", text: "Trying something I've never done before excites me more than it worries me.", dimension: "explorer" },
  { id: 24, category: "Discovery", text: "I love asking 'what if' and turning fantasies into conversations.", dimension: "explorer" },
  { id: 25, category: "Discovery", text: "I seek out new sensations, dynamics, and experiences with enthusiasm.", dimension: "explorer" },
  { id: 26, category: "Discovery", text: "Learning what turns someone on is one of my favorite forms of intimacy.", dimension: "explorer" },
  { id: 27, category: "Discovery", text: "I feel most alive when a partner and I co-create something we've never tried.", dimension: "explorer" },
  { id: 28, category: "Discovery", text: "Curiosity about desire is a core part of how I connect.", dimension: "explorer" },
  { id: 29, category: "Discovery", text: "A predictable routine in intimacy leaves me wanting more.", dimension: "explorer" },

  // --- Anchor (7) ---
  { id: 30, category: "Safety", text: "I need clear, enthusiastic consent before anything new begins.", dimension: "anchor" },
  { id: 31, category: "Safety", text: "Checking in on my partner's emotional state is second nature to me.", dimension: "anchor" },
  { id: 32, category: "Safety", text: "I'd rather pause and talk than push through discomfort.", dimension: "anchor" },
  { id: 33, category: "Safety", text: "Aftercare — holding, talking, reconnecting — matters as much as the experience itself.", dimension: "anchor" },
  { id: 34, category: "Safety", text: "I believe trust is built through honoring limits, not testing them.", dimension: "anchor" },
  { id: 35, category: "Safety", text: "Emotional safety is the foundation everything else depends on.", dimension: "anchor" },
  { id: 36, category: "Safety", text: "Setting and respecting boundaries makes intimacy deeper, not smaller.", dimension: "anchor" },
];
