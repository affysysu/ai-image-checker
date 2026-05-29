import type { Metadata } from 'next';
import { SeoToolPage } from '@/components/SeoToolPage';

export const metadata: Metadata = {
  title: 'AI Image Checker - Check Images for AI Generation Free',
  description: 'Use a free AI image checker to analyze photos, art, and screenshots with multi-engine scoring.',
  alternates: { canonical: '/check' },
};

export default function CheckPage() {
  return (
    <SeoToolPage
      eyebrow="Free browser-based detector"
      title="AI Image Checker"
      description="Upload an image or paste a URL to run a multi-engine AI image check."
      path="/check"
      sections={[
        {
          title: 'Supported formats',
          body: 'JPG, PNG, WebP, and GIF files up to 20MB are accepted in the MVP flow.',
        },
        {
          title: 'Score interpretation',
          body: '0-30 means likely authentic, 31-70 means uncertain, and 71-100 means likely AI-generated.',
        },
        {
          title: 'Privacy note',
          body: 'Uploaded images are used for the current analysis request and should not be retained as originals.',
        },
        {
          title: 'Always free',
          body: 'Core detection is free with no sign-up required. Image analysis runs on demand and results are not stored after processing.',
        },
      ]}
    />
  );
}
