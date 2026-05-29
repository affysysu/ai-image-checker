import { AdSlot } from './ads/AdSlot';
import { DetectorShell } from './detector/DetectorShell';
import { MobileNav } from './MobileNav';
import { JsonLd } from './JsonLd';
import { buildWebPageJsonLd, buildBreadcrumbJsonLd } from '@/lib/seo/jsonld';

type SeoToolPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  path: string;
  sections: Array<{
    title: string;
    body: string;
  }>;
};

const toolPages = [
  { label: 'AI Image Checker', href: '/ai-image-checker' },
  { label: 'Detect AI Images', href: '/detect-ai-generated-image' },
  { label: 'Is This AI?', href: '/is-this-ai-generated' },
  { label: 'Free Checker', href: '/check' },
];

export function SeoToolPage({ eyebrow, title, description, path, sections }: SeoToolPageProps) {
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: title, url: path },
  ];

  return (
    <>
      <JsonLd data={buildWebPageJsonLd({ title, description, path })} />
      <JsonLd data={buildBreadcrumbJsonLd(breadcrumbItems)} />

      <header className="site-header">
        <a className="brand" href="/">
          <span className="brand-mark" aria-hidden="true">
            AI
          </span>
          <span>AI Image Checker</span>
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="/">Home</a>
          <a href="#detector">Detector</a>
          <a href="#guide">Guide</a>
        </nav>
        <MobileNav
          links={[
            { label: 'Home', href: '/' },
            { label: 'Detector', href: '#detector' },
            { label: 'Guide', href: '#guide' },
            ...toolPages.filter((p) => p.href !== path),
          ]}
        />
      </header>

      <main>
        <section className="hero-shell seo-hero">
          <div className="hero-copy">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span className="breadcrumb-sep" aria-hidden="true">/</span>
              <span aria-current="page">{title}</span>
            </nav>
            <p className="eyebrow">{eyebrow}</p>
            <h1>
              {title}
              <span>{description}</span>
            </h1>
          </div>
        </section>

        <section id="detector" className="detector-section">
          <DetectorShell />
          <AdSlot id="tool_mid_content" label="Ad placement reserved for SEO tool page" minHeight={120} />
        </section>

        <section id="guide" className="content-band">
          <div className="feature-grid">
            {sections.map((section) => (
              <article className="feature-card" key={section.title}>
                <h2>{section.title}</h2>
                <p>{section.body}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>© 2026 AI Image Checker</span>
        <nav className="footer-links" aria-label="Footer navigation">
          {toolPages.map((p) => (
            <a key={p.href} href={p.href}>
              {p.label}
            </a>
          ))}
        </nav>
      </footer>
    </>
  );
}
