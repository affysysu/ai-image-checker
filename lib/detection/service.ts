import { calculateComposite } from './scoring';
import { runMockEngines } from './mock-engines';
import type { DetectionResult, DetectionSource } from './types';

export async function analyzeImage(source: DetectionSource): Promise<DetectionResult> {
  const engines = await runMockEngines(source);
  const summary = calculateComposite(engines);
  const failedEngines = engines.filter((engine) => engine.status !== 'success');

  return {
    id: `det_${crypto.randomUUID()}`,
    createdAt: new Date().toISOString(),
    source,
    summary,
    engines,
    heatmap: {
      available: false,
      message: 'Real heatmap generation is reserved for the self-hosted model phase.',
    },
    warnings: failedEngines.map((engine) => `${engine.displayName} did not return a usable result.`),
  };
}
