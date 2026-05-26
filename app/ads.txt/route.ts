export const dynamic = 'force-static';

export function GET() {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.replace('ca-', '');
  const body = publisherId
    ? `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`
    : '# Configure NEXT_PUBLIC_ADSENSE_CLIENT_ID after AdSense approval.\n';

  return new Response(body, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
    },
  });
}
