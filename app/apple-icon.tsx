import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #00e5ff, #0088a3)',
          borderRadius: 36,
        }}
      >
        <span
          style={{
            fontFamily: 'monospace',
            fontWeight: 800,
            fontSize: 80,
            color: 'white',
          }}
        >
          AI
        </span>
      </div>
    ),
    {
      width: 180,
      height: 180,
    },
  );
}
