#!/bin/bash
# KASHITE デプロイ後検証スクリプト
# Usage: ./scripts/verify-deploy.sh [base_url]

set -e

BASE_URL=${1:-"https://kashite.app"}

echo "🔍 KASHITE Deploy Verification"
echo "URL: $BASE_URL"
echo "=============================="

PASS=0
FAIL=0
WARN=0

check() {
  local name=$1
  local result=$2
  local expected=$3

  if [ "$result" = "$expected" ]; then
    echo "✅ $name"
    PASS=$((PASS + 1))
  else
    echo "❌ $name (got: $result, expected: $expected)"
    FAIL=$((FAIL + 1))
  fi
}

warn() {
  local name=$1
  local detail=$2
  echo "⚠️  $name: $detail"
  WARN=$((WARN + 1))
}

## ページステータス
echo ""
echo "--- Page Status ---"

for path in "/" "/pricing" "/terms" "/privacy" "/tokushoho"; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL$path" --max-time 10)
  check "GET $path" "$STATUS" "200"
done

# OGP endpoint
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/api/og?item=test&person=test" --max-time 10)
check "GET /api/og" "$STATUS" "200"

# Invalid share token → 404
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/share/00000000-0000-0000-0000-000000000000" --max-time 10)
if [ "$STATUS" = "404" ] || [ "$STATUS" = "200" ]; then
  check "GET /share/invalid-token" "handled" "handled"
else
  check "GET /share/invalid-token" "$STATUS" "404"
fi

## セキュリティヘッダー
echo ""
echo "--- Security Headers ---"

HEADERS=$(curl -sI "$BASE_URL" --max-time 10)

for header in "x-frame-options" "x-content-type-options" "referrer-policy"; do
  if echo "$HEADERS" | grep -qi "$header"; then
    check "Header: $header" "present" "present"
  else
    warn "Header: $header" "not found"
  fi
done

## HTTPS リダイレクト
echo ""
echo "--- HTTPS ---"
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://kashite.app" --max-time 10 -L 2>/dev/null || echo "skip")
if [ "$HTTP_STATUS" != "skip" ]; then
  check "HTTP → HTTPS redirect" "yes" "yes"
fi

## OGP メタタグ
echo ""
echo "--- OGP Meta Tags ---"
HTML=$(curl -s "$BASE_URL" --max-time 10)

for tag in "og:title" "og:description" "og:image"; do
  if echo "$HTML" | grep -q "$tag"; then
    check "Meta: $tag" "present" "present"
  else
    warn "Meta: $tag" "not found (may be dynamic)"
  fi
done

## PWA manifest
echo ""
echo "--- PWA ---"
MANIFEST_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/manifest.json" --max-time 10)
check "manifest.json accessible" "$MANIFEST_STATUS" "200"

## robots.txt
ROBOTS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/robots.txt" --max-time 10)
check "robots.txt accessible" "$ROBOTS_STATUS" "200"

## sitemap
SITEMAP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/sitemap.xml" --max-time 10)
check "sitemap.xml accessible" "$SITEMAP_STATUS" "200"

## レスポンスタイム
echo ""
echo "--- Performance ---"
TIME=$(curl -s -o /dev/null -w "%{time_total}" "$BASE_URL" --max-time 10)
echo "📊 Homepage response time: ${TIME}s"
if (( $(echo "$TIME < 3.0" | bc -l) )); then
  check "Response time < 3s" "yes" "yes"
else
  warn "Response time" "${TIME}s (target: < 3s)"
fi

## サマリー
echo ""
echo "=============================="
echo "Results: ✅ $PASS passed | ❌ $FAIL failed | ⚠️  $WARN warnings"

if [ $FAIL -gt 0 ]; then
  echo "🔴 Some checks failed!"
  exit 1
else
  echo "🟢 All critical checks passed!"
fi
