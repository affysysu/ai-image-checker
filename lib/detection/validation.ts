import type { ImageFileLike, ValidationResult } from './types';

const MAX_IMAGE_SIZE = 20 * 1024 * 1024;
const SUPPORTED_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const PRIVATE_HOSTS = new Set(['localhost', '127.0.0.1', '0.0.0.0', '::1']);

export function validateImageFile(file: ImageFileLike): ValidationResult {
  if (!SUPPORTED_MIME_TYPES.has(file.type)) {
    return {
      ok: false,
      code: 'UNSUPPORTED_FILE_TYPE',
      message: 'Only JPG, PNG, WebP and GIF images are supported.',
    };
  }

  if (file.size > MAX_IMAGE_SIZE) {
    return {
      ok: false,
      code: 'FILE_TOO_LARGE',
      message: 'Images must be 20MB or smaller.',
    };
  }

  return { ok: true };
}

export function validateImageUrl(input: string): ValidationResult {
  let parsed: URL;

  try {
    parsed = new URL(input);
  } catch {
    return {
      ok: false,
      code: 'INVALID_IMAGE_URL',
      message: 'Enter a valid image URL.',
    };
  }

  if (parsed.protocol !== 'https:') {
    return {
      ok: false,
      code: 'INVALID_IMAGE_URL',
      message: 'Image URLs must use HTTPS.',
    };
  }

  if (isPrivateHost(parsed.hostname)) {
    return {
      ok: false,
      code: 'PRIVATE_IMAGE_URL',
      message: 'Private or local image URLs are not supported.',
    };
  }

  return { ok: true };
}

export function validationToHttpStatus(result: Exclude<ValidationResult, { ok: true }>): number {
  if (result.code === 'FILE_TOO_LARGE') {
    return 413;
  }

  return 400;
}

function isPrivateHost(hostname: string): boolean {
  const host = hostname.toLowerCase();

  if (PRIVATE_HOSTS.has(host)) {
    return true;
  }

  if (/^10\./.test(host) || /^192\.168\./.test(host)) {
    return true;
  }

  if (/^172\.(1[6-9]|2\d|3[0-1])\./.test(host)) {
    return true;
  }

  if (/^169\.254\./.test(host)) {
    return true;
  }

  return false;
}
