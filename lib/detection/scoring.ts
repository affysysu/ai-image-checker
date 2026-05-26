import type { Confidence, DetectionSummary, EngineResult, Verdict } from './types';

export function classifyScore(score: number): Pick<DetectionSummary, 'verdict' | 'label' | 'explanation'> {
  const bounded = clampScore(score);

  if (bounded <= 30) {
    return {
      verdict: 'real',
      label: 'Likely Authentic',
      explanation:
        'The available engines found stronger signals of authentic capture, natural texture, or consistent metadata.',
    };
  }

  if (bounded <= 70) {
    return {
      verdict: 'uncertain',
      label: 'Uncertain',
      explanation:
        'The engines returned mixed signals. Treat this as a review prompt rather than a final judgment.',
    };
  }

  return {
    verdict: 'ai',
    label: 'Likely AI-Generated',
    explanation:
      'Multiple engines detected indicators commonly associated with AI generation, such as texture or noise inconsistencies.',
  };
}

export function calculateComposite(results: EngineResult[]): DetectionSummary {
  const valid = results.filter((result) => result.status === 'success');
  const totalWeight = valid.reduce((sum, result) => sum + result.weight, 0);

  if (totalWeight === 0) {
    throw new Error('NO_ENGINE_AVAILABLE');
  }

  const score = Math.round(
    valid.reduce((sum, result) => sum + clampScore(result.score) * result.weight, 0) / totalWeight,
  );
  const spread = Math.max(...valid.map((result) => result.score)) - Math.min(...valid.map((result) => result.score));
  const confidence = calculateConfidence(valid.length, spread);
  const classified = classifyScore(score);

  return {
    score,
    confidence,
    ...classified,
  };
}

function calculateConfidence(successCount: number, spread: number): Confidence {
  if (successCount >= 3 && spread <= 25) {
    return 'high';
  }

  if (successCount >= 2 && spread <= 40) {
    return 'medium';
  }

  return 'low';
}

function clampScore(score: number): number {
  if (Number.isNaN(score)) {
    return 0;
  }

  return Math.min(100, Math.max(0, Math.round(score)));
}

export function verdictTone(verdict: Verdict): 'real' | 'uncertain' | 'ai' {
  return verdict;
}
