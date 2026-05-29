# AI Image Checker

Multi-engine AI-generated image detection tool. Upload an image or paste a URL to get a weighted AI probability score with engine-by-engine comparison.

**Live**: https://ai-image-checker.vercel.app

## Quick Start

```bash
npm install
npm run dev          # http://localhost:3000
```

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm test` | Run tests (vitest) |
| `npm run lint` | ESLint |
| `npm run deploy:vercel` | One-click deploy to Vercel production |
| `npm run deploy -- "msg"` | Full pipeline: test → commit → push → deploy |

## Project Structure

```
app/                  # Next.js App Router pages & API routes
  page.tsx            # Homepage with detector
  check/              # Free checker page
  ai-image-checker/   # SEO tool page
  detect-ai-generated-image/
  is-this-ai-generated/
  api/check/          # Image upload detection API
  api/check-url/      # URL-based detection API
components/
  ads/AdSlot.tsx       # Ad placeholder (disabled when NEXT_PUBLIC_ADS_ENABLED != "true")
  detector/            # Detection UI (DetectorShell, upload, results)
  MobileNav.tsx        # Hamburger menu for mobile (<860px)
  JsonLd.tsx           # JSON-LD structured data renderer
  SeoToolPage.tsx      # Reusable SEO tool page with breadcrumbs + footer
lib/
  detection/           # Detection engines, scoring, service layer
    huggingface.ts     # Real HF Inference adapter (Ateeqq model)
    mock-engines.ts    # Mock engines for unsold integrations
    service.ts         # Engine orchestrator with fallback logic
  seo/                 # JSON-LD, metadata helpers
scripts/
  deploy.sh            # Full pipeline: test → commit → push → deploy
  vercel-deploy.sh     # One-click Vercel deploy
docs/                  # Product & technical documentation
```

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL | `https://ai-image-checker.vercel.app` |
| `HUGGINGFACE_API_KEY` | Hugging Face token for real AI detection (free tier) | — (mock fallback) |
| `NEXT_PUBLIC_ADS_ENABLED` | Enable ad slots (`"true"`) | disabled |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | Google AdSense client ID | — |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console verification | — |

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: CSS (globals.css)
- **Testing**: Vitest
- **Deployment**: Vercel (prebuilt output)
- **Node**: 20.x

## Docs

- [Product Requirements](docs/prd.md)
- [Technical Solution](docs/technical-solution.md)
- [Market Research](docs/market-research.md)
- [Google Search Console Setup](docs/google-search-console-setup.md)
