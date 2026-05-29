import { calculateComposite } from './scoring';
import { runMockEngines, runSingleMockEngine } from './mock-engines';
import { runHuggingFaceEngine } from './huggingface';
import type { DetectionResult, DetectionSource, EngineResult } from './types';

export async function analyzeImage(source: DetectionSource): Promise<DetectionResult> {
  const [hfResult, mockResults] = await Promise.all([
    runHuggingFaceEngine(source),
    runMockEngines(source),
  ]);

  // Replace the mock self_model with the real HF result.
  // If HF failed, fall back to the mock self_model.
  const engines: EngineResult[] = [
    hfResult.status === 'success' ? hfResult : runSingleMockEngine(source),
    ...mockResults.filter((e) => e.engine !== 'self_model'),
  ];

  const summary = calculateComposite(engines);
  const failedEngines = engines.filter((engine) => engine.status !== 'success');
  const warnings = failedEngines.map(
    (engine) => `${engine.displayName} did not return a usable result.`,
  );

  // Add a warning if HF fell back to mock
  if (hfResult.status !== 'success') {
    warnings.unshift(
      'Neural Vision is using simulated results. Real model detection requires a Hugging Face API key.',
    );
  }

  return {
    id: `det_${crypto.randomUUID()}`,
    createdAt: new Date().toISOString(),
    source: {
      type: source.type,
      fileName: source.fileName,
      url: source.url,
      mimeType: source.mimeType,
      size: source.size,
    },
    summary,
    engines,
    heatmap: {
      available: false,
      message: 'Real heatmap generation is reserved for the self-hosted model phase.',
    },
    warnings,
  };
}
