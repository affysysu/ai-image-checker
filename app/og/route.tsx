import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #090d16 0%, #101827 100%)',
          padding: '60px',
          position: 'relative',
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            position: 'absolute',
            left: 60,
            top: 280,
            width: 80,
            height: 4,
            background: 'linear-gradient(90deg, #00e5ff, #0088a3)',
            borderRadius: 2,
          }}
        />

        {/* Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 40,
          }}
        >
          <span
            style={{
              fontFamily: 'monospace',
              fontWeight: 700,
              fontSize: 52,
              color: '#e9eef8',
              lineHeight: 1.1,
            }}
          >
            AI Image Checker
          </span>
          <span
            style={{
              fontFamily: 'system-ui',
              fontWeight: 400,
              fontSize: 24,
              color: '#9aa8c2',
              marginTop: 16,
              lineHeight: 1.4,
            }}
          >
            Multi-engine AI image detection with visual explanation
          </span>
          <span
            style={{
              fontFamily: 'system-ui',
              fontWeight: 400,
              fontSize: 24,
              color: '#9aa8c2',
              lineHeight: 1.4,
            }}
          >
            and privacy-first processing
          </span>
        </div>

        {/* CTA button */}
        <div
          style={{
            display: 'flex',
            marginTop: 40,
            padding: '12px 32px',
            background: 'linear-gradient(90deg, #00e5ff, #0088a3)',
            borderRadius: 8,
          }}
        >
          <span
            style={{
              fontFamily: 'monospace',
              fontWeight: 600,
              fontSize: 16,
              color: '#090d16',
            }}
          >
            Try Free
          </span>
        </div>

        {/* Decorative elements */}
        <div
          style={{
            position: 'absolute',
            right: 100,
            top: 200,
            width: 200,
            height: 200,
            border: '2px solid rgba(0, 229, 255, 0.3)',
            borderRadius: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 160,
              height: 160,
              border: '1px solid rgba(0, 229, 255, 0.2)',
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                border: '2px solid rgba(0, 229, 255, 0.4)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  fontSize: 28,
                  color: '#00e5ff',
                  opacity: 0.6,
                }}
              >
                82
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
