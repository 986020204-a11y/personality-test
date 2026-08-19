import type { Dimension } from "@/types";

// Extended result-page content per archetype. This data powers the
// strengths, challenges, and premium preview modules on the result page.
// Keep this separate from personality-types.ts so scoring stays untouched.

export interface ArchetypeContent {
  strengths: string[];
  challenges: string[];
  premiumTeaser: string[];
}

export const ARCHETYPE_CONTENT: Record<Dimension, ArchetypeContent> = {
  dominant: {
    strengths: [
      "You create a sense of safety through confident leadership.",
      "Partners feel held and free to surrender around you.",
      "You naturally read the room and adjust the intensity.",
      "Your decisiveness removes uncertainty from intimate moments.",
    ],
    challenges: [
      "You may over-function and forget to receive.",
      "The weight of responsibility can become invisible pressure.",
      "Asking for what you need may feel like losing control.",
    ],
    premiumTeaser: [
      "Your communication blueprint for deeper trust",
      "How to balance leadership with vulnerability",
      "Compatibility patterns with other archetypes",
      "Your ideal dynamic structure",
    ],
  },
  submissive: {
    strengths: [
      "Your openness invites partners to step into their power.",
      "You bring a rare emotional depth to intimate connection.",
      "Surrender becomes a form of strength in your hands.",
      "Your trust is a gift that transforms the people who receive it.",
    ],
    challenges: [
      "You may struggle to voice needs when they feel inconvenient.",
      "Choosing the wrong partner to trust can feel devastating.",
      "Setting boundaries might feel like betraying your nature.",
    ],
    premiumTeaser: [
      "How to identify trustworthy partners faster",
      "Your boundaries blueprint without losing softness",
      "Communication scripts for expressing needs",
      "Compatibility patterns with other archetypes",
    ],
  },
  switch: {
    strengths: [
      "You meet people exactly where they are.",
      "Your range keeps connections alive and unpredictable.",
      "You understand both sides of a dynamic intuitively.",
      "Flexibility is your superpower in long-term relationships.",
    ],
    challenges: [
      "Others may misread your range as inconsistency.",
      "You might suppress one side to please a partner.",
      "Finding someone who values your full spectrum takes patience.",
    ],
    premiumTeaser: [
      "How to communicate your shifting needs clearly",
      "Building dynamics that honor your full range",
      "When to lead vs. when to follow: your personal signals",
      "Compatibility patterns with other archetypes",
    ],
  },
  explorer: {
    strengths: [
      "Your curiosity keeps intimacy from ever becoming stale.",
      "Partners feel permission to be honest around you.",
      "You turn vulnerability into adventure rather than anxiety.",
      "Discovery is how you build depth, not just novelty.",
    ],
    challenges: [
      "Chasing new can sometimes mask avoiding depth.",
      "Partners may struggle to keep up with your pace.",
      "You might confuse excitement with compatibility.",
    ],
    premiumTeaser: [
      "How to balance novelty-seeking with deepening",
      "Your exploration framework for sustainable growth",
      "Communicating desires without overwhelming a partner",
      "Compatibility patterns with other archetypes",
    ],
  },
  anchor: {
    strengths: [
      "You create the conditions where real intimacy becomes possible.",
      "Partners feel safe enough to show their full selves.",
      "Your presence turns chaos into calm.",
      "Trust grows faster around you because you never rush it.",
    ],
    challenges: [
      "Over-caretaking can become a way to avoid your own needs.",
      "You may attract partners who rely on you but don't reciprocate.",
      "Fear of disrupting safety can hold back your own desires.",
    ],
    premiumTeaser: [
      "How to receive care as naturally as you give it",
      "Your boundaries between caretaking and people-pleasing",
      "Expressing desire without losing your grounded identity",
      "Compatibility patterns with other archetypes",
    ],
  },
};
