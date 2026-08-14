// Core domain types for the personality test.

// The five personality dimensions measured by the test.
export type Dimension =
  | "dominant"
  | "submissive"
  | "switch"
  | "openness"
  | "safety";

// A single question. Each question contributes to exactly one dimension.
export interface Question {
  id: number;
  category: string;
  text: string;
  dimension: Dimension;
}

// A selectable answer option shown for every question (Likert scale).
export interface AnswerOption {
  value: number;
  label: string;
}

// A user's recorded answer.
export interface Answer {
  questionId: number;
  value: number;
}

// Computed score for one dimension.
export interface DimensionScore {
  dimension: Dimension;
  label: string;
  score: number;
  maxScore: number;
  percentage: number;
}

// A named personality archetype resolved from the dimension scores.
export interface PersonalityType {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  traits: string[];
  accent: string;
}

// The final result returned by the scoring engine.
export interface PersonalityResult {
  primaryType: PersonalityType;
  scores: DimensionScore[];
  dominantDimension: Dimension;
}
