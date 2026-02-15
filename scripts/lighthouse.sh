#!/bin/bash
# KASHITE Lighthouse CI スクリプト
# Usage: ./scripts/lighthouse.sh [url]

URL=${1:-"http://localhost:3000"}

echo "🔍 Running Lighthouse on $URL"

npx lighthouse "$URL" \
  --output=html \
  --output-path=./lighthouse-report.html \
  --chrome-flags="--headless --no-sandbox" \
  --only-categories=performance,accessibility,best-practices,seo,pwa

echo "📊 Report saved to lighthouse-report.html"

# 閾値チェック
npx lighthouse "$URL" \
  --output=json \
  --output-path=./lighthouse-report.json \
  --chrome-flags="--headless --no-sandbox" \
  --only-categories=performance,accessibility,best-practices,seo,pwa

node -e "
const r = require('./lighthouse-report.json');
const cats = r.categories;
const scores = {
  Performance: cats.performance.score * 100,
  Accessibility: cats.accessibility.score * 100,
  'Best Practices': cats['best-practices'].score * 100,
  SEO: cats.seo.score * 100,
  PWA: cats.pwa.score * 100,
};
console.table(scores);
const failed = Object.entries(scores).filter(([,v]) => v < 90);
if (failed.length) {
  console.error('❌ Below 90:', failed.map(([k,v]) => k + '=' + v).join(', '));
  process.exit(1);
} else {
  console.log('✅ All scores 90+');
}
"
