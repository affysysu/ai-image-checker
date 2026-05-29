import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Pricing - AI Image Checker",
  description: "Free AI image detection with optional Pro plan for higher limits and priority processing.",
  alternates: { canonical: "/pricing" },
};

const plans = [
  {
    key: "free",
    name: "Free",
    badge: "Start here",
    price: 0,
    priceLabel: "$0",
    period: "forever",
    description: "For quick checks and casual use.",
    features: [
      "10 detections per day",
      "20MB max file size",
      "JPG, PNG, WebP, GIF support",
      "4 detection engines",
      "20 result history",
      "Privacy-first processing",
    ],
    cta: "Start Free",
    ctaHref: "/",
    featured: false,
  },
  {
    key: "pro",
    name: "Pro",
    badge: "Most Popular",
    price: 9.99,
    priceLabel: "$9.99",
    period: "/mo",
    description: "For professionals who need unlimited checks.",
    features: [
      "Unlimited detections",
      "50MB max file size",
      "All detection engines",
      "500 result history",
      "Priority processing",
      "API access (coming soon)",
    ],
    cta: "Choose Pro",
    ctaHref: "/sign-up",
    featured: true,
  },
  {
    key: "team",
    name: "Team",
    badge: "For teams",
    price: 24.99,
    priceLabel: "$24.99",
    period: "/mo",
    description: "For teams and organizations.",
    features: [
      "Everything in Pro",
      "Unlimited result history",
      "Shared team access",
      "Bulk detection (coming soon)",
      "Dedicated support",
      "Custom integrations",
    ],
    cta: "Choose Team",
    ctaHref: "/sign-up",
    featured: false,
  },
];

const faqs = [
  {
    q: "Can I try before I buy?",
    a: "Yes! The Free plan gives you 10 detections per day with full engine results. No credit card required.",
  },
  {
    q: "What image formats are supported?",
    a: "JPG, PNG, WebP, and GIF files are supported. Free plan supports up to 20MB, Pro and Team up to 50MB.",
  },
  {
    q: "What happens when I hit the daily limit?",
    a: "You'll see a message asking you to wait until the next day or upgrade to Pro for unlimited detections.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes, you can cancel your subscription at any time. You'll keep access until the end of your billing period.",
  },
];

export default async function PricingPage() {
  const user = await getCurrentUser();

  return (
    <>
      <header className="site-header">
        <a className="brand" href="/" aria-label="AI Image Checker home">
          <span className="brand-mark" aria-hidden="true">AI</span>
          <span>AI Image Checker</span>
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="/">Detector</a>
          <a href="/pricing">Pricing</a>
        </nav>
      </header>

      <main className="pricing-page">
        <div className="pricing-header">
          <p className="eyebrow">Pricing</p>
          <h1>Simple, transparent pricing</h1>
          <p>Start free. Upgrade when you need more detections.</p>
        </div>

        <div className="pricing-grid">
          {plans.map((plan) => {
            const isCurrentPlan = user?.plan === plan.key;
            return (
              <article className={`price-card${plan.featured ? " featured" : ""}`} key={plan.key}>
                <span className="price-card-badge">{plan.badge}</span>
                <h3>{plan.name}</h3>
                <p className="price-card-desc">{plan.description}</p>
                <div className="price-amount">
                  <strong>{plan.priceLabel}</strong>
                  <span>{plan.period}</span>
                </div>
                <ul className="pricing-features">
                  {plan.features.map((f) => (
                    <li key={f}>
                      <span className="pricing-check">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                {isCurrentPlan ? (
                  <span className="pricing-btn pricing-btn-secondary" style={{ opacity: 0.6 }}>
                    Current plan
                  </span>
                ) : plan.key === "free" ? (
                  <a className="pricing-btn pricing-btn-secondary" href={plan.ctaHref}>
                    {plan.cta}
                  </a>
                ) : (
                  <a className="pricing-btn pricing-btn-primary" href={plan.ctaHref}>
                    {plan.cta}
                  </a>
                )}
              </article>
            );
          })}
        </div>

        <div className="pricing-faq">
          <h2>Frequently asked questions</h2>
          {faqs.map((faq) => (
            <details className="pricing-faq-item" key={faq.q}>
              <summary>{faq.q}</summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
      </main>

      <footer className="site-footer">
        <span>© 2026 AI Image Checker</span>
        <nav className="footer-links" aria-label="Footer navigation">
          <a href="/">Detector</a>
          <a href="/pricing">Pricing</a>
          <a href="/ai-image-checker">Tools</a>
        </nav>
      </footer>
    </>
  );
}
