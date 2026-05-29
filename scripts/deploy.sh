#!/usr/bin/env bash
set -euo pipefail

# Full pipeline: test → commit → push → deploy to Vercel production.
# Usage: npm run deploy -- "commit message"

if [ "${1:-}" = "--" ]; then shift; fi

COMMIT_MESSAGE="${1:-}"
if [ -z "$COMMIT_MESSAGE" ]; then
  echo "Usage: npm run deploy -- \"commit message\""
  exit 1
fi

echo "▶ Running tests..."
npm test

echo "▶ Building locally..."
npm run build

echo "▶ Staging & committing..."
git add .
if git diff --cached --quiet; then
  git commit --allow-empty -m "$COMMIT_MESSAGE"
else
  git commit -m "$COMMIT_MESSAGE"
fi

echo "▶ Pushing to origin/main..."
git push origin main

echo "▶ Deploying to Vercel..."
bash scripts/vercel-deploy.sh

echo ""
echo "✓ Done. https://ai-image-checker.vercel.app"
