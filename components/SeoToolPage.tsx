import { AdSlot } from './ads/AdSlot';
import { DetectorShell } from './detector/DetectorShell';
import { MobileNav } from './MobileNav';
import { UserMenu } from './UserMenu';
import { JsonLd } from './JsonLd';
import { getCurrentUser } from '@/lib/auth/session';
import {
  buildWebPageJsonLd,
  buildBreadcrumbJsonLd,
  buildFaqPageJsonLd,
} from '@/lib/seo/jsonld';

export interface ContentSection {
  heading: string;
  content: string;
  headingLevel?: 2 | 3;
}

export interface CrossLink {
  label: string;
  href: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

type SeoToolPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  path: string;
  contentSections: ContentSection[];
  crossLinks: CrossLink[];
  faqs: FaqItem[];
};

const toolPages = [
  { label: 'AI Image Checker', href: '/ai-image-checker' },
  { label: 'Detect AI Images', href: '/detect-ai-generated-image' },
  { label: 'Is This AI?', href: '/is-this-ai-generated' },
  { label: 'Free Checker', href: '/check' },
];

export async function SeoToolPage({
  eyebrow,
  title,
  description,
  path,
  contentSections,
  crossLinks,
  faqs,
}: SeoToolPageProps) {
  const user = await getCurrentUser();
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: title, url: path },
  ];

  return (
    <>
      <JsonLd
        data={[
          buildWebPageJsonLd({ title, description, path, includeSoftwareApp: true }),
          buildBreadcrumbJsonLd(breadcrumbItems),
          buildFaqPageJsonLd(faqs),
        ]}
      />

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
          <a href="#faq">FAQ</a>
          <a href="/pricing">Pricing</a>
          {user ? (
            <UserMenu user={user} />
          ) : (
            <a href="/sign-in" className="header-sign-in">
              Sign In
            </a>
          )}
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
              <span className="breadcrumb-sep" aria-hidden="true">
                /
              </span>
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
          <AdSlot
            id="tool_mid_content"
            label="Ad placement reserved for SEO tool page"
            minHeight={120}
          />
        </section>

        <section id="guide" className="content-band">
          <div className="seo-rich-content">
            {contentSections.map((section) => {
              const Tag = section.headingLevel === 3 ? 'h3' : 'h2';
              return (
                <article className="seo-content-section" key={section.heading}>
                  <Tag>{section.heading}</Tag>
                  <p>{section.content}</p>
                </article>
              );
            })}
          </div>
        </section>

        {crossLinks.length > 0 && (
          <section className="content-band seo-crosslinks-band">
            <div className="seo-rich-content">
              <h2 className="seo-crosslinks-title">Explore related tools</h2>
              <div className="seo-crosslinks">
                {crossLinks.map((link) => (
                  <a key={link.href} href={link.href} className="seo-crosslink-pill">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        <section id="faq" className="content-band seo-faq-band">
          <div className="seo-rich-content">
            <h2>Frequently Asked Questions</h2>
            <div className="seo-faq-list">
              {faqs.map((item) => (
                <details key={item.question} className="seo-faq-item">
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
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
          <a href="/pricing">Pricing</a>
        </nav>
      </footer>
    </>
  );
}
