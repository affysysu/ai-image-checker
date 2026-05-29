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

- `app/api/check/` — file upload detection endpoint
- `app/api/check-url/` — URL-based detection endpoint
- `lib/detection/service.ts` — orchestrates engines, returns `DetectionResult`
- `lib/detection/mock-engines.ts` — mock engine adapters (replace with real adapters later)
- `lib/detection/scoring.ts` — composite score calculation
- `components/detector/DetectorShell.tsx` — main detection UI (upload, results, history)
- `components/ads/AdSlot.tsx` — returns `null` when `NEXT_PUBLIC_ADS_ENABLED != "true"`
- `components/SeoToolPage.tsx` — reusable SEO landing page layout

## Conventions

- Static export via `output: "export"` in next.config.mjs. No server runtime on Vercel except API routes (Node 20.x).
- Pages use server components by default; interactive components are client components (`"use client"`).
- Detection engines are pluggable: implement `EngineAdapter` interface in `lib/detection/`, register in `service.ts`.
- Ad slots are opt-in: component returns `null` unless `NEXT_PUBLIC_ADS_ENABLED === "true"`.
- Heatmap placeholder only renders when `result.heatmap.available === true`.
- Do not expose internal implementation details (mock adapters, roadmap notes) in user-facing page copy.

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
