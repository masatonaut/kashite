#!/bin/bash
# .env.local インタラクティブ設定
# Usage: ./scripts/setup-env.sh

set -e

echo "🔧 KASHITE 環境変数設定"
echo "======================"
echo "各サービスのダッシュボードからキーをコピペしてください"
echo ""

cp .env.local.example .env.local

read -p "NEXT_PUBLIC_SUPABASE_URL: " SUPABASE_URL
read -p "NEXT_PUBLIC_SUPABASE_ANON_KEY: " SUPABASE_ANON
read -p "SUPABASE_SERVICE_ROLE_KEY: " SUPABASE_SERVICE

read -p "STRIPE_SECRET_KEY (sk_test_...): " STRIPE_SK
read -p "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY (pk_test_...): " STRIPE_PK
read -p "STRIPE_PRO_MONTHLY_PRICE_ID (price_...): " STRIPE_MONTHLY
read -p "STRIPE_PRO_YEARLY_PRICE_ID (price_...): " STRIPE_YEARLY

read -p "UPSTASH_REDIS_REST_URL: " UPSTASH_URL
read -p "UPSTASH_REDIS_REST_TOKEN: " UPSTASH_TOKEN

# .env.local に書き込み
cat > .env.local << EOF
# Supabase
NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=$SUPABASE_ANON
SUPABASE_SERVICE_ROLE_KEY=$SUPABASE_SERVICE

# Stripe
STRIPE_SECRET_KEY=$STRIPE_SK
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=$STRIPE_PK
STRIPE_WEBHOOK_SECRET=whsec_placeholder
STRIPE_PRO_MONTHLY_PRICE_ID=$STRIPE_MONTHLY
STRIPE_PRO_YEARLY_PRICE_ID=$STRIPE_YEARLY

# Upstash Redis
UPSTASH_REDIS_REST_URL=$UPSTASH_URL
UPSTASH_REDIS_REST_TOKEN=$UPSTASH_TOKEN

# App
NEXT_PUBLIC_APP_URL=https://kashite.app
EOF

echo ""
echo "✅ .env.local 作成完了"
echo "⚠️ STRIPE_WEBHOOK_SECRET はVercelデプロイ後にStripeダッシュボードで取得して更新してください"
