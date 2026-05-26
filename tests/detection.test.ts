import { describe, expect, it } from 'vitest';
import { calculateComposite, classifyScore } from '@/lib/detection/scoring';
import { validateImageFile, validateImageUrl } from '@/lib/detection/validation';

describe('detection scoring', () => {
  it('calculates weighted composite score from successful engines only', () => {
    const result = calculateComposite([
      { engine: 'self_model', displayName: 'Neural Vision', score: 90, confidence: 'high', status: 'success', latencyMs: 500, weight: 35 },
      { engine: 'hugging_face', displayName: 'Texture AI', score: 70, confidence: 'medium', status: 'success', latencyMs: 600, weight: 25 },
      { engine: 'sightengine', displayName: 'Pixel Forensics', score: 80, confidence: 'high', status: 'success', latencyMs: 700, weight: 20 },
      { engine: 'metadata', displayName: 'Metadata Scan', score: 10, confidence: 'low', status: 'failed', latencyMs: 80, weight: 20 },
    ]);

    expect(result.score).toBe(81);
    expect(result.verdict).toBe('ai');
    expect(result.confidence).toBe('high');
  });

  it('marks mixed engine results as low confidence', () => {
    const result = calculateComposite([
      { engine: 'self_model', displayName: 'Neural Vision', score: 90, confidence: 'high', status: 'success', latencyMs: 500, weight: 50 },
      { engine: 'hugging_face', displayName: 'Texture AI', score: 25, confidence: 'low', status: 'success', latencyMs: 600, weight: 50 },
    ]);

    expect(result.score).toBe(58);
    expect(result.verdict).toBe('uncertain');
    expect(result.confidence).toBe('low');
  });

  it('uses PRD score thresholds', () => {
    expect(classifyScore(30).verdict).toBe('real');
    expect(classifyScore(31).verdict).toBe('uncertain');
    expect(classifyScore(70).verdict).toBe('uncertain');
    expect(classifyScore(71).verdict).toBe('ai');
  });
});

describe('input validation', () => {
  it('accepts supported image files under 20MB', () => {
    const result = validateImageFile({
      name: 'sample.webp',
      type: 'image/webp',
      size: 2 * 1024 * 1024,
    });

    expect(result.ok).toBe(true);
  });

  it('rejects unsupported image files and oversized files', () => {
    expect(validateImageFile({ name: 'sample.svg', type: 'image/svg+xml', size: 1000 })).toEqual({
      ok: false,
      code: 'UNSUPPORTED_FILE_TYPE',
      message: 'Only JPG, PNG, WebP and GIF images are supported.',
    });

    expect(validateImageFile({ name: 'huge.png', type: 'image/png', size: 21 * 1024 * 1024 })).toEqual({
      ok: false,
      code: 'FILE_TOO_LARGE',
      message: 'Images must be 20MB or smaller.',
    });
  });

  it('accepts public https image URLs and rejects private or invalid URLs', () => {
    expect(validateImageUrl('https://example.com/image.jpg').ok).toBe(true);
    expect(validateImageUrl('http://localhost/image.jpg').ok).toBe(false);
    expect(validateImageUrl('https://127.0.0.1/image.jpg').ok).toBe(false);
    expect(validateImageUrl('not-a-url').ok).toBe(false);
  });
});
