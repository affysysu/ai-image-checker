import type { Metadata } from 'next';
import { SeoToolPage } from '@/components/SeoToolPage';

export const metadata: Metadata = {
  title: 'Detect AI Generated Images Online - Free Image Analysis Tool',
  description: 'Learn how to detect AI-generated images and upload a picture for instant multi-engine analysis.',
  alternates: { canonical: '/detect-ai-generated-image' },
};

export default function DetectAiGeneratedImagePage() {
  return (
    <SeoToolPage
      eyebrow="How to detect AI-generated images"
      title="Detect AI Generated Images"
      description="Use the detector first, then review the score, engine spread, and confidence label."
      path="/detect-ai-generated-image"
      sections={[
        {
          title: 'Step 1: upload',
          body: 'Choose a supported image file or paste a public HTTPS image URL.',
        },
        {
          title: 'Step 2: compare engines',
          body: 'Multiple detection engines score the image independently; wider spread means lower confidence.',
        },
        {
          title: 'Step 3: read confidence',
          body: 'High spread between engines lowers confidence and should trigger manual review.',
        },
        {
          title: 'Step 4: avoid overclaiming',
          body: 'AI detection results are probabilistic and should not be used as the only evidence.',
        },
      ]}
    />
  );
}
