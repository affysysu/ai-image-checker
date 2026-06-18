import type { Metadata } from 'next';
import { SeoToolPage } from '@/components/SeoToolPage';
import { pageContentMap } from '@/lib/seo/content';

const content = pageContentMap['/ai-image-checker'];

export const metadata: Metadata = {
  title: 'AI Image Checker — Multi-Engine AI Image Detection Tool',
  description:
    'Analyze photos, art, and screenshots with a free multi-engine AI image checker. Get engine-by-engine transparency and weighted scoring.',
  alternates: { canonical: '/ai-image-checker' },
  openGraph: {
    title: 'AI Image Checker — Multi-Engine AI Image Detection Tool',
    description:
      'Analyze photos, art, and screenshots with a free multi-engine AI image checker.',
    url: '/ai-image-checker',
    type: 'website',
    images: [{ url: '/og?title=AI+Image+Checker&description=Multi-engine+detection+with+transparent+scoring', width: 1200, height: 630 }],
  },
};

export default function AiImageCheckerPage() {
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
