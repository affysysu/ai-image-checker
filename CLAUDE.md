# CLAUDE.md

## Project

AI Image Checker — multi-engine AI-generated image detection tool. Next.js 14 App Router, TypeScript, Vercel deployment.

## Commands

```bash
npm run dev            # dev server
npm test               # vitest
npm run build          # production build
npm run deploy:vercel  # one-click Vercel deploy (code must be pushed first)
npm run deploy -- "msg"  # full pipeline: test → commit → push → deploy
```

## Architecture

- `app/api/check/` — file upload detection endpoint (reads image bytes)
- `app/api/check-url/` — URL-based detection endpoint (downloads + analyzes remote images)
- `lib/detection/service.ts` — orchestrates engines, returns `DetectionResult`
- `lib/detection/huggingface.ts` — real HF Inference adapter (`Ateeqq/ai-vs-human-image-detector`)
- `lib/detection/mock-engines.ts` — mock engines for `texture_ai`, `sightengine`, `metadata`
- `lib/detection/scoring.ts` — weighted composite score + confidence calculation
- `components/detector/DetectorShell.tsx` — main detection UI (upload, results, history)
- `components/MobileNav.tsx` — hamburger menu for <860px screens
- `components/JsonLd.tsx` — JSON-LD structured data renderer
- `components/ads/AdSlot.tsx` — returns `null` when `NEXT_PUBLIC_ADS_ENABLED != "true"`
- `components/SeoToolPage.tsx` — reusable SEO landing page layout with breadcrumbs + footer

## Conventions

- Standard Next.js deployment (no `output: "export"`). API routes run on Node 20.x runtime.
- Pages use server components by default; interactive components are client components (`"use client"`).
- Detection engines are pluggable: implement the adapter pattern in `lib/detection/`, register in `service.ts`.
- `self_model` engine uses real Hugging Face inference; falls back to mock if `HUGGINGFACE_API_KEY` is missing.
- Ad slots are opt-in: component returns `null` unless `NEXT_PUBLIC_ADS_ENABLED === "true"`.
- Heatmap placeholder only renders when `result.heatmap.available === true`.
- Do not expose internal implementation details (mock adapters, roadmap notes) in user-facing page copy.

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | No | Canonical site URL (default: Vercel preview URL) |
| `HUGGINGFACE_API_KEY` | No | HF token for real AI detection. Without it, `self_model` falls back to mock. |
| `NEXT_PUBLIC_ADS_ENABLED` | No | Set `"true"` to enable ad slot placeholders |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | No | Google Search Console verification code |

## SEO Pages

Multiple routes serve the same detector with different SEO copy targeting different keywords:

| Route | Target Keyword |
|---|---|
| `/` | AI image detector |
| `/check` | free AI image checker |
| `/ai-image-checker` | AI image checker |
| `/ai-image-detector` | AI image detector (alias) |
| `/detect-ai-generated-image` | detect AI generated images |
| `/is-this-ai-generated` | is this AI generated |

Each page reuses `DetectorShell` + `SeoToolPage` with unique metadata and copy.

## Docs

- [PRD](docs/prd.md) — product requirements
- [Technical Solution](docs/technical-solution.md) — architecture & decisions
- [Market Research](docs/market-research.md)
- [GSC Setup](docs/google-search-console-setup.md)
