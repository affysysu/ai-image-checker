import { NextResponse } from 'next/server';
import { analyzeImage } from '@/lib/detection/service';
import { validateImageFile, validationToHttpStatus } from '@/lib/detection/validation';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const contentType = request.headers.get('content-type') ?? '';

  if (contentType.includes('multipart/form-data')) {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: { code: 'MISSING_FILE', message: 'Upload an image file to analyze.', retryable: false } },
        { status: 400 },
      );
    }

    const validation = validateImageFile(file);
    if (!validation.ok) {
      return NextResponse.json(
        { error: { code: validation.code, message: validation.message, retryable: false } },
        { status: validationToHttpStatus(validation) },
      );
    }

    const imageBuffer = await file.arrayBuffer();

    const result = await analyzeImage({
      type: 'upload',
      fileName: file.name,
      mimeType: file.type,
      size: file.size,
      imageBuffer,
    });

    return NextResponse.json(result);
  }

  const body = await request.json().catch(() => null);
  if (!body || body.sourceType !== 'object') {
    return NextResponse.json(
      { error: { code: 'INVALID_REQUEST', message: 'Use multipart upload or provide an object source.', retryable: false } },
      { status: 400 },
    );
  }

  const result = await analyzeImage({
    type: 'upload',
    fileName: body.fileName ?? body.objectKey ?? 'uploaded-image',
    mimeType: body.mimeType,
    size: body.size,
  });

  return NextResponse.json(result);
}
