import type { AnswerOption } from "@/types";

// A single 5-point Likert scale reused by every question. Keeping this in one
// place makes the test easy to re-theme or localize later.
export const ANSWER_OPTIONS: AnswerOption[] = [
  { value: 1, label: "Strongly disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly agree" },
];

export const MIN_ANSWER = 1;
export const MAX_ANSWER = 5;
