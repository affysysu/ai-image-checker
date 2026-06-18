import type { Metadata, Viewport } from 'next';
import { DM_Sans, IBM_Plex_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { JsonLd } from '@/components/JsonLd';
import { webSiteJsonLd } from '@/lib/seo/jsonld';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500', '600', '700'],
});

export const viewport: Viewport = {
  themeColor: '#090d16',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    default: 'AI Image Detector - Free Multi-Engine AI Image Checker',
    template: '%s | AI Image Checker',
  },
  description:
    'Upload an image and check if it was AI-generated with multiple detection engines, visual explanation, and privacy-first processing.',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', rel: 'svg+xml' },
      { url: '/icon', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-icon',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  openGraph: {
    title: 'AI Image Detector - Free Multi-Engine AI Image Checker',
    description:
      'Upload any image and get an instant AI probability score from multiple detection engines.',
    url: '/',
    siteName: 'AI Image Checker',
    type: 'website',
    images: [
      {
        url: '/og',
        width: 1200,
        height: 630,
        alt: 'AI Image Checker - Multi-engine AI image detection',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Image Detector - Free Multi-Engine AI Image Checker',
    description:
      'Upload any image and get an instant AI probability score from multiple detection engines.',
    images: ['/og'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${ibmPlexMono.variable}`}>
      <head>
        <JsonLd data={webSiteJsonLd()} />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
