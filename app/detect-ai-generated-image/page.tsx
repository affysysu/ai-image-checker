import type { Metadata } from 'next';
import { SeoToolPage } from '@/components/SeoToolPage';
import { pageContentMap } from '@/lib/seo/content';

const content = pageContentMap['/detect-ai-generated-image'];

export const metadata: Metadata = {
  title: 'Detect AI Generated Images Online — Free Image Analysis Tool',
  description:
    'Learn how to detect AI-generated images step by step and upload a picture for instant multi-engine analysis with confidence scoring.',
  alternates: { canonical: '/detect-ai-generated-image' },
  openGraph: {
    title: 'Detect AI Generated Images Online — Free Image Analysis Tool',
    description:
      'Learn how to detect AI-generated images and get instant multi-engine analysis.',
    url: '/detect-ai-generated-image',
    type: 'website',
    images: [{ url: '/og?title=Detect+AI+Generated+Images&description=Step-by-step+detection+with+four+engines', width: 1200, height: 630 }],
  },
};

export default function DetectAiGeneratedImagePage() {
  return (
    <SeoToolPage
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
      path={content.path}
      contentSections={content.contentSections}
      crossLinks={content.crossLinks}
      faqs={content.faqs}
    />
  );
}
