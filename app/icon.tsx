import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
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
          borderRadius: 6,
        }}
      >
        <span
          style={{
            fontFamily: 'monospace',
            fontWeight: 800,
            fontSize: 18,
            color: 'white',
          }}
        >
          AI
        </span>
      </div>
    ),
    {
      width: 32,
      height: 32,
    }
  );
}
