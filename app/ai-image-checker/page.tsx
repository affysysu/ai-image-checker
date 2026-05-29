import type { Metadata } from 'next';
import { SeoToolPage } from '@/components/SeoToolPage';

export const metadata: Metadata = {
  title: 'AI Image Checker - Check Images for AI Generation Free',
  description: 'Analyze photos, art, and screenshots with a free multi-engine AI image checker.',
  alternates: { canonical: '/ai-image-checker' },
};

export default function AiImageCheckerPage() {
  return (
    <SeoToolPage
      eyebrow="AI image checker"
      title="Check Images for AI Generation"
      description="Run a fast AI probability analysis with engine-by-engine transparency."
      path="/ai-image-checker"
      sections={[
        {
          title: 'Why multi-engine',
          body: 'The aggregator reduces reliance on a single model by weighting several detection signals.',
        },
        {
          title: 'Best use cases',
          body: 'Teachers, creators, media teams, and everyday users can use it as a review signal.',
        },
        {
          title: 'Uncertain results',
          body: 'Mixed signals are labelled uncertain instead of being forced into a binary answer.',
        },
        {
          title: 'Next phase',
          body: 'A self-hosted model can add real heatmap explanations once the model service is available.',
        },
      ]}
    />
  );
}
