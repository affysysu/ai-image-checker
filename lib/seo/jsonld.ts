export function softwareApplicationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI Image Checker',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };
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
