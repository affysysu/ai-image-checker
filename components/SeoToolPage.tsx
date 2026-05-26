import { AdSlot } from './ads/AdSlot';
import { DetectorShell } from './detector/DetectorShell';

type SeoToolPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  sections: Array<{
    title: string;
    body: string;
  }>;
};

export function SeoToolPage({ eyebrow, title, description, sections }: SeoToolPageProps) {
  return (
    <>
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
      </header>

      <main>
        <section className="hero-shell seo-hero">
          <div className="hero-copy">
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
    </>
  );
}
