import type { Metadata } from 'next';
import { SeoToolPage } from '@/components/SeoToolPage';

export const metadata: Metadata = {
  title: 'AI Image Detector - Free Multi-Engine AI Image Checker',
  description:
    'Detect AI-generated images instantly with our free multi-engine detector. Upload a photo or paste a URL to get a weighted AI probability score with confidence analysis.',
  alternates: { canonical: '/ai-image-detector' },
  openGraph: {
    title: 'AI Image Detector - Free Multi-Engine AI Image Checker',
    description:
      'Detect AI-generated images instantly with our free multi-engine detector.',
    url: '/ai-image-detector',
    type: 'website',
  },
};

export default function AiImageDetectorPage() {
  return (
    <SeoToolPage
      eyebrow="AI image detector tool"
      title="AI Image Detector"
      description="Upload a photo or paste a URL to detect AI-generated images with multi-engine analysis."
      path="/ai-image-detector"
      sections={[
        {
          title: 'How the detector works',
          body:
            'Four independent detection engines analyze the image in parallel. Each engine produces a probability score, which is then weighted and combined into a single AI probability percentage.',
        },
        {
          title: 'Understanding confidence levels',
          body:
            'When engines agree, confidence is high. When scores diverge, the result is marked uncertain. This transparency helps you make informed decisions about image authenticity.',
        },
        {
          title: 'Supported use cases',
          body:
            'Verify social media images, check artwork submissions, screen news photos, and validate content for academic integrity. Works with JPG, PNG, WebP, and GIF up to 20MB.',
        },
        {
          title: 'Privacy-first approach',
          body:
            'Images are analyzed for the current request only. No uploaded originals are stored after processing completes, making it safe for sensitive content review.',
        },
      ]}
    />
  );
}
