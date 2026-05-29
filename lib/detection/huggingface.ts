import type { DetectionSource, EngineResult } from './types';

const HF_API_URL =
  'https://router.huggingface.co/hf-inference/models/Ateeqq/ai-vs-human-image-detector';
const ENGINE_TIMEOUT_MS = 15_000;

export async function runHuggingFaceEngine(
  source: DetectionSource,
): Promise<EngineResult> {
  const apiKey = process.env.HUGGINGFACE_API_KEY;

  if (!apiKey) {
    return failedResult('Hugging Face API key is not configured.');
  }

  if (!source.imageBuffer) {
    return failedResult('No image data available for Hugging Face analysis.');
  }

  const startTime = Date.now();

  try {
    const base64 = arrayBufferToBase64(source.imageBuffer);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), ENGINE_TIMEOUT_MS);

    const response = await fetch(HF_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: base64 }),
      signal: controller.signal,
    });

    clearTimeout(timeout);
    const latencyMs = Date.now() - startTime;

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      const msg =
        response.status === 429
          ? 'Hugging Face rate limit reached.'
          : `Hugging Face API error (${response.status}).`;
      console.error(`[huggingface] ${msg} ${errorText}`);
      return failedResult(msg, latencyMs);
    }

    const predictions: Array<{ label: string; score: number }> =
      await response.json();

    return parsePredictions(predictions, latencyMs);
  } catch (error) {
    const latencyMs = Date.now() - startTime;

    if (error instanceof DOMException && error.name === 'AbortError') {
      return failedResult('Hugging Face analysis timed out.', latencyMs);
    }

    console.error('[huggingface] Unexpected error:', error);
    return failedResult('Hugging Face analysis failed.', latencyMs);
  }
}

function parsePredictions(
  predictions: Array<{ label: string; score: number }>,
  latencyMs: number,
): EngineResult {
  // Model labels: "ai" = AI-generated, "hum" = human-created
  const aiPrediction = predictions.find(
    (p) => p.label.toLowerCase() === 'ai',
  );

  if (!aiPrediction) {
    return failedResult(
      'Unexpected response format from Hugging Face.',
      latencyMs,
    );
  }

  const score = Math.round(aiPrediction.score * 100);
  const confidence: EngineResult['confidence'] =
    score > 80 || score < 20 ? 'high' : score > 60 || score < 40 ? 'medium' : 'low';

  return {
    engine: 'self_model',
    displayName: 'Neural Vision',
    score,
    confidence,
    status: 'success',
    latencyMs,
    weight: 35,
  };
}

function failedResult(
  message: string,
  latencyMs = 0,
): EngineResult {
  console.warn(`[huggingface] Falling back to mock: ${message}`);
  return {
    engine: 'self_model',
    displayName: 'Neural Vision',
    score: 0,
    confidence: 'low',
    status: 'failed',
    latencyMs,
    weight: 35,
    errorCode: 'HF_FAILED',
  };
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
