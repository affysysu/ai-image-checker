import type { Metadata } from 'next';
import { SeoToolPage } from '@/components/SeoToolPage';
import { pageContentMap } from '@/lib/seo/content';

const content = pageContentMap['/ai-image-detector'];

export const metadata: Metadata = {
  title: 'AI Image Detector — Free Multi-Engine AI Image Detection',
  description:
    'Detect AI-generated images instantly with our free multi-engine detector. Upload a photo or paste a URL to get a weighted AI probability score with confidence analysis.',
  alternates: { canonical: '/ai-image-detector' },
  openGraph: {
    title: 'AI Image Detector — Free Multi-Engine AI Image Detection',
    description:
      'Detect AI-generated images instantly with our free multi-engine detector.',
    url: '/ai-image-detector',
    type: 'website',
    images: [{ url: '/og?title=AI+Image+Detector&description=Four+engines%2C+one+clear+probability+score', width: 1200, height: 630 }],
  },
};

export default function AiImageDetectorPage() {
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
