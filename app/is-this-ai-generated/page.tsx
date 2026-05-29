import type { Metadata } from 'next';
import { SeoToolPage } from '@/components/SeoToolPage';

export const metadata: Metadata = {
  title: 'Is This AI Generated? Upload an Image to Check',
  description: 'Wondering if an image is AI-generated? Upload it for a fast AI probability score.',
  alternates: { canonical: '/is-this-ai-generated' },
};

export default function IsThisAiGeneratedPage() {
  return (
    <SeoToolPage
      eyebrow="Question-style AI detector"
      title="Is This AI Generated?"
      description="Paste the image, run the check, and treat the result as a transparent review signal."
      path="/is-this-ai-generated"
      sections={[
        {
          title: 'Fast answer',
          body: 'The result card shows a direct label, score, confidence, and short explanation.',
        },
        {
          title: 'Not a verdict',
          body: 'AI image detection cannot prove origin with certainty, especially for edited or compressed images.',
        },
        {
          title: 'Useful for social images',
          body: 'URL detection supports quick checks for public image links without downloading first.',
        },
        {
          title: 'Local history',
          body: 'Recent checks are stored locally in the browser so users can compare results.',
        },
      ]}
    />
  );
}
