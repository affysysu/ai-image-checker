import type { Metadata } from 'next';
import './globals.css';

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
  openGraph: {
    title: 'AI Image Detector - Free Multi-Engine AI Image Checker',
    description:
      'Upload any image and get an instant AI probability score from multiple detection engines.',
    url: '/',
    siteName: 'AI Image Checker',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Image Detector - Free Multi-Engine AI Image Checker',
    description:
      'Upload any image and get an instant AI probability score from multiple detection engines.',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
