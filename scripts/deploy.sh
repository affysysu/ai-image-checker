#!/usr/bin/env bash
set -euo pipefail

if [ "${1:-}" = "--" ]; then
  shift
fi

COMMIT_MESSAGE="${1:-}"
SOURCE_REPO_URL="https://github.com/affysysu/ai-image-checker"
VERCEL_PROJECT_NAME="ai-image-checker"

if [ -z "$COMMIT_MESSAGE" ]; then
  echo "Usage: npm run deploy -- \"Describe your change\""
  exit 1
fi

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "This script must be run inside the ai-image-checker Git repository."
  exit 1
fi

echo "Running verification..."
npm test
npm run build

echo "Staging changes..."
git add .

if git diff --cached --quiet; then
  echo "No file changes detected. Creating an empty deployment trigger commit."
  git commit --allow-empty -m "$COMMIT_MESSAGE"
else
  git commit -m "$COMMIT_MESSAGE"
fi

echo "Pushing source repository..."
git push origin main

echo "Linking Vercel project..."
vercel link --yes --non-interactive --project "$VERCEL_PROJECT_NAME"

echo "Deploying to Vercel production..."
vercel deploy --prod --yes --logs --project "$VERCEL_PROJECT_NAME"

echo "Deployment complete."
echo "Source repository: ${SOURCE_REPO_URL}"
