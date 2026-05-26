import { NextResponse } from 'next/server';
import { analyzeImage } from '@/lib/detection/service';
import { validateImageUrl, validationToHttpStatus } from '@/lib/detection/validation';

export const runtime = 'nodejs';

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

  const result = await analyzeImage({
    type: 'url',
    url,
    fileName: new URL(url).pathname.split('/').pop() || 'remote-image',
  });

  return NextResponse.json(result);
}
