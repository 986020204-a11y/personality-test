"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Answer } from "@/types";
import { QUESTIONS } from "@/data/questions";
import { loadAnswers, saveAnswers, clearAnswers } from "@/lib/storage";

// Encapsulates all test state: current position, recorded answers, and
// persistence. Keeps the page component focused on rendering.
export function useTest() {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  // Restore any in-progress answers on mount, then resume at the first
  // unanswered question.
  useEffect(() => {
    const stored = loadAnswers();
    setAnswers(stored);
    if (stored.length > 0) {
      const firstUnanswered = QUESTIONS.findIndex(
        (q) => !stored.some((a) => a.questionId === q.id)
      );
      setCurrentIndex(firstUnanswered === -1 ? QUESTIONS.length - 1 : firstUnanswered);
    }
    setHydrated(true);
  }, []);

  // Persist whenever answers change (after hydration to avoid clobbering).
  useEffect(() => {
    if (hydrated) saveAnswers(answers);
  }, [answers, hydrated]);

  const total = QUESTIONS.length;
  const currentQuestion = QUESTIONS[currentIndex];

  const currentAnswer = useMemo(
    () =>
      answers.find((a) => a.questionId === currentQuestion?.id)?.value ?? null,
    [answers, currentQuestion]
  );

  const answeredCount = answers.length;
  const progress = Math.round((answeredCount / total) * 100);
  const isComplete = answeredCount >= total;

  const answerCurrent = useCallback(
    (value: number) => {
      if (!currentQuestion) return;
      setAnswers((prev) => {
        const next = prev.filter((a) => a.questionId !== currentQuestion.id);
        next.push({ questionId: currentQuestion.id, value });
        return next;
      });
    },
    [currentQuestion]
  );

  const goNext = useCallback(() => {
    setCurrentIndex((i) => Math.min(i + 1, total - 1));
  }, [total]);

  const goBack = useCallback(() => {
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }, []);

  const reset = useCallback(() => {
    clearAnswers();
    setAnswers([]);
    setCurrentIndex(0);
  }, []);

  return {
    hydrated,
    answers,
    currentIndex,
    currentQuestion,
    currentAnswer,
    total,
    answeredCount,
    progress,
    isComplete,
    isFirst: currentIndex === 0,
    isLast: currentIndex === total - 1,
    answerCurrent,
    goNext,
    goBack,
    reset,
  };
}
