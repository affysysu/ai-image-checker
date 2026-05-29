#!/usr/bin/env bash
set -euo pipefail

# One-click deploy current codebase to Vercel production.
# Usage: bash scripts/vercel-deploy.sh [--skip-build]

PROJECT="ai-image-checker"
SITE_URL="https://ai-image-checker.vercel.app"

SKIP_BUILD=false
if [ "${1:-}" = "--skip-build" ]; then
  SKIP_BUILD=true
fi

cd "$(git rev-parse --show-toplevel)"

echo "▶ Linking Vercel project..."
vercel link --yes --non-interactive --project "$PROJECT" >/dev/null 2>&1

if [ "$SKIP_BUILD" = false ]; then
  echo "▶ Building for production..."
  NEXT_PUBLIC_SITE_URL="$SITE_URL" vercel build --prod --yes --project "$PROJECT"
fi

echo "▶ Deploying to production..."
vercel deploy --prebuilt --prod --yes --project "$PROJECT"

echo ""
echo "✓ Deployed: $SITE_URL"
