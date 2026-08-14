import type { Answer } from "@/types";

// Centralized localStorage access so persistence is easy to swap for a real
// backend in a later phase. All functions are safe to call during SSR.

const ANSWERS_KEY = "persona.answers.v1";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function loadAnswers(): Answer[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(ANSWERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Answer[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (a) => typeof a?.questionId === "number" && typeof a?.value === "number"
    );
  } catch {
    return [];
  }
}

export function saveAnswers(answers: Answer[]): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(ANSWERS_KEY, JSON.stringify(answers));
  } catch {
    // Ignore quota / privacy-mode errors; the test still works in-memory.
  }
}

export function clearAnswers(): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(ANSWERS_KEY);
  } catch {
    // no-op
  }
}
