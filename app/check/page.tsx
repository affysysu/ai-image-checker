import type { Metadata } from 'next';
import { SeoToolPage } from '@/components/SeoToolPage';
import { pageContentMap } from '@/lib/seo/content';

const content = pageContentMap['/check'];

export const metadata: Metadata = {
  title: 'Free AI Image Checker — Check Images for AI Generation Free',
  description:
    'Use a free AI image checker to analyze photos, art, and screenshots with multi-engine scoring. No sign-up required.',
  alternates: { canonical: '/check' },
  openGraph: {
    title: 'Free AI Image Checker — Check Images for AI Generation Free',
    description:
      'Use a free AI image checker to analyze photos, art, and screenshots with multi-engine scoring.',
    url: '/check',
    type: 'website',
    images: [{ url: '/og?title=Free+AI+Image+Checker&description=Multi-engine+detection+with+transparent+scoring', width: 1200, height: 630 }],
  },
};

export default function CheckPage() {
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
