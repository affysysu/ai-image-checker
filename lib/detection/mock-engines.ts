import type { DetectionSource, EngineResult } from './types';

type EngineConfig = {
  engine: EngineResult['engine'];
  displayName: string;
  weight: number;
  offset: number;
  latencyBase: number;
};

const ENGINE_CONFIGS: EngineConfig[] = [
  { engine: 'self_model', displayName: 'Neural Vision', weight: 35, offset: 11, latencyBase: 520 },
  { engine: 'hugging_face', displayName: 'Texture AI', weight: 25, offset: -6, latencyBase: 680 },
  { engine: 'sightengine', displayName: 'Pixel Forensics', weight: 20, offset: 4, latencyBase: 740 },
  { engine: 'metadata', displayName: 'Metadata Scan', weight: 20, offset: -14, latencyBase: 140 },
];

export async function runMockEngines(source: DetectionSource): Promise<EngineResult[]> {
  const seed = source.url ?? source.fileName ?? source.mimeType ?? 'unknown-image';
  const base = seededScore(seed);

  return Promise.all(
    ENGINE_CONFIGS.map(async (config, index) => {
      const score = clamp(base + config.offset + (index * 7) % 13);
      const latencyMs = config.latencyBase + (seed.charCodeAt(index % seed.length) % 90);

      await delay(Math.min(latencyMs, 850));

      return {
        engine: config.engine,
        displayName: config.displayName,
        score,
        confidence: score > 75 || score < 25 ? 'high' : score > 60 || score < 40 ? 'medium' : 'low',
        status: 'success',
        latencyMs,
        weight: config.weight,
      };
    }),
  );
}

export function runSingleMockEngine(source: DetectionSource): EngineResult {
  const seed = source.url ?? source.fileName ?? source.mimeType ?? 'unknown-image';
  const config = ENGINE_CONFIGS[0]; // self_model config
  const base = seededScore(seed);
  const score = clamp(base + config.offset);

  return {
    engine: config.engine,
    displayName: config.displayName,
    score,
    confidence: score > 75 || score < 25 ? 'high' : score > 60 || score < 40 ? 'medium' : 'low',
    status: 'success',
    latencyMs: 0,
    weight: config.weight,
  };
}

function seededScore(input: string): number {
  const lowered = input.toLowerCase();

  if (/(midjourney|stable-diffusion|dalle|ai-|generated|synthetic)/.test(lowered)) {
    return 82;
  }

  if (/(photo|camera|iphone|canon|nikon|raw|authentic)/.test(lowered)) {
    return 24;
  }

  let hash = 0;
  for (let index = 0; index < input.length; index += 1) {
    hash = (hash * 31 + input.charCodeAt(index)) % 997;
  }

  return 35 + (hash % 45);
}

function clamp(score: number): number {
  return Math.min(100, Math.max(0, Math.round(score)));
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
