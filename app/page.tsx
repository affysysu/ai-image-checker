import { AdSlot } from '@/components/ads/AdSlot';
import { DetectorShell } from '@/components/detector/DetectorShell';
import { MobileNav } from '@/components/MobileNav';
import { faqJsonLd, softwareApplicationJsonLd } from '@/lib/seo/jsonld';

const features = [
  {
    title: 'Multi-engine analysis',
    body: 'Four independent detection adapters run in parallel and produce a weighted probability score.',
  },
  {
    title: 'Result transparency',
    body: 'The report shows each engine score, confidence, warnings, and an explanation of what the score means.',
  },
  {
    title: 'Privacy-first flow',
    body: 'The MVP analyzes images for the current request and avoids keeping uploaded originals after processing.',
  },
  {
    title: 'SEO-ready pages',
    body: 'Server-rendered copy, FAQ schema, sitemap, robots rules, and canonical URLs are built in.',
  },
];

const faqs = [
  {
    question: 'Can AI image detection be 100% accurate?',
    answer:
      'No. AI image detection is probabilistic. Use the score and engine details as review signals, not as final proof.',
  },
  {
    question: 'Which image formats are supported?',
    answer: 'The MVP accepts JPG, PNG, WebP, and GIF files up to 20MB.',
  },
  {
    question: 'Can I check an image URL?',
    answer:
      'Yes. Paste a public HTTPS image URL and the API will run the same multi-engine analysis path.',
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationJsonLd()) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }} />

      <header className="site-header">
        <a className="brand" href="#top" aria-label="AI Image Checker home">
          <span className="brand-mark" aria-hidden="true">
            AI
          </span>
          <span>AI Image Checker</span>
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#detector">Detector</a>
          <a href="#features">Features</a>
          <a href="#faq">FAQ</a>
          <a href="/ai-image-checker">Tools</a>
        </nav>
        <MobileNav
          links={[
            { label: 'Detector', href: '#detector' },
            { label: 'Features', href: '#features' },
            { label: 'FAQ', href: '#faq' },
            { label: 'AI Image Checker', href: '/ai-image-checker' },
            { label: 'Detect AI Images', href: '/detect-ai-generated-image' },
            { label: 'Is This AI?', href: '/is-this-ai-generated' },
          ]}
        />
      </header>

      <main id="top">
        <section className="hero-shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">Multi-engine AI image detection</p>
            <h1 id="hero-title">
              AI Image Detector
              <span>Check if an image is AI-generated.</span>
            </h1>
            <p className="hero-subtitle">
              Upload a picture or paste an image URL to get a weighted AI probability score, engine-by-engine
              comparison, confidence level, and a clear explanation.
            </p>
            <div className="hero-metrics" aria-label="Product highlights">
              <span>4 engines</span>
              <span>&lt;3s target</span>
              <span>20MB max</span>
            </div>
          </div>
          <div className="forensics-panel" aria-label="Example detection report preview">
            <div className="forensics-grid">
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="scan-beam" />
            <div className="forensics-readout">
              <strong>AI probability</strong>
              <span>82</span>
            </div>
          </div>
        </section>

        <section id="detector" className="detector-section" aria-label="AI image detector">
          <DetectorShell />
          <AdSlot id="home_after_tool" label="Ad placement reserved after detector" minHeight={120} />
        </section>

        <section id="features" className="content-band" aria-labelledby="features-title">
          <div className="section-heading">
            <p className="eyebrow">Built for search traffic and repeat checks</p>
            <h2 id="features-title">Why this detector is different</h2>
          </div>
          <div className="feature-grid">
            {features.map((feature) => (
              <article className="feature-card" key={feature.title}>
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="faq" className="content-band faq-section" aria-labelledby="faq-title">
          <div className="section-heading">
            <p className="eyebrow">How to interpret results</p>
            <h2 id="faq-title">AI image detection FAQ</h2>
          </div>
          <div className="faq-list">
            {faqs.map((item) => (
              <article key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>© 2026 AI Image Checker</span>
        <nav className="footer-links" aria-label="Footer navigation">
          <a href="/ai-image-checker">AI Image Checker</a>
          <a href="/ai-image-detector">AI Image Detector</a>
          <a href="/detect-ai-generated-image">Detect AI Images</a>
          <a href="/is-this-ai-generated">Is This AI?</a>
          <a href="/check">Free Checker</a>
        </nav>
      </footer>
    </>
  );
}
