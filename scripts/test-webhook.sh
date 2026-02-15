#!/bin/bash
# Stripe Webhook テスト（Stripe CLIが必要）
# Usage: ./scripts/test-webhook.sh

echo "🔧 Stripe Webhook Test"
echo "====================="

if ! command -v stripe &> /dev/null; then
  echo "Stripe CLI が必要です:"
  echo "  brew install stripe/stripe-cli/stripe"
  echo "  stripe login"
  exit 1
fi

echo "Forwarding webhooks to localhost:3000..."
echo "別ターミナルで pnpm dev を実行してください"
echo ""

stripe listen --forward-to localhost:3000/api/webhooks/stripe
