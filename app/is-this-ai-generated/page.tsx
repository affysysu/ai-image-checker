import type { Metadata } from 'next';
import { SeoToolPage } from '@/components/SeoToolPage';
import { pageContentMap } from '@/lib/seo/content';

const content = pageContentMap['/is-this-ai-generated'];

export const metadata: Metadata = {
  title: 'Is This AI Generated? — Upload an Image to Check Instantly',
  description:
    'Wondering if an image is AI-generated? Upload it for a fast AI probability score with engine-by-engine breakdown and confidence analysis.',
  alternates: { canonical: '/is-this-ai-generated' },
  openGraph: {
    title: 'Is This AI Generated? — Upload an Image to Check Instantly',
    description:
      'Wondering if an image is AI-generated? Upload it for a fast multi-engine probability score.',
    url: '/is-this-ai-generated',
    type: 'website',
    images: [{ url: '/og?title=Is+This+AI+Generated%3F&description=Upload+and+get+an+instant+probability+score', width: 1200, height: 630 }],
  },
};

export default function IsThisAiGeneratedPage() {
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
