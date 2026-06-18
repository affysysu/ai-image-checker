const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aiimagechecker.com';

const BASE_SOFTWARE_APP = {
  '@type': 'SoftwareApplication',
  name: 'AI Image Checker',
  url: SITE_URL,
  applicationCategory: 'MultimediaApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

export function softwareApplicationJsonLd() {
  return BASE_SOFTWARE_APP;
}

export function faqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How accurate is AI image detection?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'AI image detection is probabilistic. This tool compares several signals and reports a confidence level, but results should be treated as guidance rather than proof.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you store uploaded images?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The MVP analyzes images for the current request and does not intentionally keep uploaded originals after processing.',
        },
      },
    ],
  };
}

export function buildWebPageJsonLd({
  title,
  description,
  path,
  includeSoftwareApp = false,
}: {
  title: string;
  description: string;
  path: string;
  includeSoftwareApp?: boolean;
}) {
  const webPage: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: `${SITE_URL}${path}`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'AI Image Checker',
      url: SITE_URL,
    },
  };

  if (includeSoftwareApp) {
    webPage.about = BASE_SOFTWARE_APP;
  }

  return webPage;
}

export function buildBreadcrumbJsonLd(
  items: Array<{ name: string; url: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function buildFaqPageJsonLd(
  questions: Array<{ question: string; answer: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  };
}

export function webSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AI Image Checker',
    url: SITE_URL,
    description:
      'Free multi-engine AI image detection tool. Upload an image to check if it was AI-generated.',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/check?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}
