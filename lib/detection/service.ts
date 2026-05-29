import { calculateComposite } from './scoring';
import { runMockEngines, runSingleMockEngine } from './mock-engines';
import { runHuggingFaceEngine } from './huggingface';
import type { DetectionResult, DetectionSource, EngineResult } from './types';

export async function analyzeImage(source: DetectionSource): Promise<DetectionResult> {
  const hfResult = await runHuggingFaceEngine(source);

  let engines: EngineResult[];
  let warnings: string[];

  if (hfResult.status === 'success') {
    // Real engine succeeded — use only real results, no mock noise
    engines = [hfResult];
    warnings = [];
  } else {
    // Real engine unavailable — fall back to all mock engines
    const mockResults = await runMockEngines(source);
    engines = mockResults;
    warnings = [
      'Detection is using simulated engines. Real model detection requires a Hugging Face API key.',
    ];
  }

  const summary = calculateComposite(engines);

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
