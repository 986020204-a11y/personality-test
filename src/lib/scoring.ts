import type {
  Answer,
  Dimension,
  DimensionScore,
  PersonalityResult,
  Question,
} from "@/types";
import { MAX_ANSWER, MIN_ANSWER } from "@/data/answer-options";
import { DIMENSION_LABELS } from "@/data/questions";
import { PERSONALITY_TYPES } from "@/data/personality-types";

// The scoring engine is intentionally free of any UI or framework code so it
// can be unit-tested and reused (server, worker, etc.) without changes.

const ALL_DIMENSIONS: Dimension[] = [
  "dominant",
  "submissive",
  "switch",
  "explorer",
  "anchor",
];

/**
 * Compute a normalized score for every dimension.
 *
 * For each dimension we sum the raw answer values and compare against the
 * theoretical min/max for the number of questions in that dimension, producing
 * a 0-100 percentage that is comparable across dimensions of different sizes.
 */
export function calculateDimensionScores(
  questions: Question[],
  answers: Answer[]
): DimensionScore[] {
  const answerMap = new Map<number, number>();
  for (const answer of answers) {
    answerMap.set(answer.questionId, answer.value);
  }

  return ALL_DIMENSIONS.map((dimension) => {
    const dimensionQuestions = questions.filter(
      (q) => q.dimension === dimension
    );
    const count = dimensionQuestions.length;

    let rawScore = 0;
    for (const question of dimensionQuestions) {
      // Unanswered questions count as the neutral midpoint so a skipped item
      // does not unfairly drag a dimension to zero.
      const value =
        answerMap.get(question.id) ?? (MIN_ANSWER + MAX_ANSWER) / 2;
      rawScore += value;
    }

    const minScore = count * MIN_ANSWER;
    const maxScore = count * MAX_ANSWER;
    const range = maxScore - minScore;
    const percentage =
      range === 0 ? 0 : Math.round(((rawScore - minScore) / range) * 100);

    return {
      dimension,
      label: DIMENSION_LABELS[dimension],
      score: rawScore,
      maxScore,
      percentage,
    };
  });
}

/**
 * Resolve the full personality result from questions and answers.
 * Returns the strongest dimension, its archetype, and all dimension scores.
 */
export function calculateResult(
  questions: Question[],
  answers: Answer[]
): PersonalityResult {
  const scores = calculateDimensionScores(questions, answers);

  // The dominant dimension is the one with the highest percentage. Ties are
  // broken by the fixed dimension order for deterministic output.
  const dominant = scores.reduce((best, current) =>
    current.percentage > best.percentage ? current : best
  );

  const primaryType = PERSONALITY_TYPES[dominant.dimension];

  return {
    primaryType,
    scores,
    dominantDimension: dominant.dimension,
  };
}
