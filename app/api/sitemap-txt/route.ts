export const runtime = 'nodejs';

const routes = [
  '/',
  '/check',
  '/ai-image-checker',
  '/ai-image-detector',
  '/detect-ai-generated-image',
  '/is-this-ai-generated',
];

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const lines = routes.map((route) => `${siteUrl}${route}`);
  return new Response(lines.join('\n') + '\n', {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
