import { NextResponse } from 'next/server';
import { analyzeImage } from '@/lib/detection/service';
import { validateImageUrl, validationToHttpStatus } from '@/lib/detection/validation';

export const runtime = 'nodejs';

const DOWNLOAD_TIMEOUT_MS = 10_000;
const MAX_DOWNLOAD_BYTES = 20 * 1024 * 1024;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const url = typeof body?.url === 'string' ? body.url.trim() : '';

  const validation = validateImageUrl(url);
  if (!validation.ok) {
    return NextResponse.json(
      { error: { code: validation.code, message: validation.message, retryable: false } },
      { status: validationToHttpStatus(validation) },
    );
  }

  // Download the remote image with timeout
  let imageBuffer: ArrayBuffer;
  let mimeType: string | undefined;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), DOWNLOAD_TIMEOUT_MS);

    const response = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'AIImageChecker/1.0' },
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return NextResponse.json(
        {
          error: {
            code: 'URL_DOWNLOAD_FAILED',
            message: `Failed to download image (HTTP ${response.status}).`,
            retryable: false,
          },
        },
        { status: 422 },
      );
    }

    const contentType = response.headers.get('content-type') ?? '';
    if (contentType.startsWith('image/')) {
      mimeType = contentType.split(';')[0].trim();
    }

    const contentLength = response.headers.get('content-length');
    if (contentLength && Number(contentLength) > MAX_DOWNLOAD_BYTES) {
      return NextResponse.json(
        {
          error: {
            code: 'FILE_TOO_LARGE',
            message: 'Remote image exceeds the 20MB limit.',
            retryable: false,
          },
        },
        { status: 413 },
      );
    }

    imageBuffer = await response.arrayBuffer();

    if (imageBuffer.byteLength > MAX_DOWNLOAD_BYTES) {
      return NextResponse.json(
        {
          error: {
            code: 'FILE_TOO_LARGE',
            message: 'Remote image exceeds the 20MB limit.',
            retryable: false,
          },
        },
        { status: 413 },
      );
    }
  } catch (error) {
    const message =
      error instanceof DOMException && error.name === 'AbortError'
        ? 'Image download timed out.'
        : 'Failed to download the image from the provided URL.';

    return NextResponse.json(
      { error: { code: 'URL_DOWNLOAD_FAILED', message, retryable: false } },
      { status: 422 },
    );
  }

  const fileName = new URL(url).pathname.split('/').pop() || 'remote-image';

  const result = await analyzeImage({
    type: 'url',
    url,
    fileName,
    mimeType,
    size: imageBuffer.byteLength,
    imageBuffer,
  });

  return NextResponse.json(result);
}
