import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="not-found-page">
      <header className="site-header">
        <Link className="brand" href="/">
          <span className="brand-mark" aria-hidden="true">
            AI
          </span>
          <span>AI Image Checker</span>
        </Link>
      </header>

      <main className="not-found-content">
        <p className="eyebrow">Error 404</p>
        <h1>Page Not Found</h1>
        <p className="not-found-sub">
          The page you are looking for does not exist or has been moved.
        </p>

        <div className="not-found-actions">
          <Link href="/" className="not-found-btn primary">
            Go to Homepage
          </Link>
          <Link href="/check" className="not-found-btn secondary">
            Try the Detector
          </Link>
        </div>

        <p className="not-found-hint">
          Looking for AI image detection? Try our{' '}
          <Link href="/check">free checker</Link> or{' '}
          <Link href="/ai-image-detector">AI image detector</Link>.
        </p>
      </main>

      <footer className="site-footer">
        <span>{new Date().getFullYear()} AI Image Checker</span>
      </footer>
    </div>
  );
}
