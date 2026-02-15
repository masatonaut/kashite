#!/bin/bash
# KASHITE デプロイスクリプト
# Usage: ./scripts/deploy.sh

set -e

echo "🚀 KASHITE Deploy Script"
echo "========================"

# 前提チェック
echo "📋 Checking prerequisites..."

if [ ! -f .env.local ]; then
  echo "❌ .env.local が見つかりません"
  echo "cp .env.local.example .env.local して環境変数を設定してください"
  exit 1
fi

# 必須環境変数チェック
REQUIRED_VARS=(
  "NEXT_PUBLIC_SUPABASE_URL"
  "NEXT_PUBLIC_SUPABASE_ANON_KEY"
  "SUPABASE_SERVICE_ROLE_KEY"
  "STRIPE_SECRET_KEY"
  "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
  "STRIPE_WEBHOOK_SECRET"
  "STRIPE_PRO_MONTHLY_PRICE_ID"
  "STRIPE_PRO_YEARLY_PRICE_ID"
  "UPSTASH_REDIS_REST_URL"
  "UPSTASH_REDIS_REST_TOKEN"
  "NEXT_PUBLIC_APP_URL"
)

MISSING=()
for var in "${REQUIRED_VARS[@]}"; do
  if ! grep -q "^${var}=" .env.local || grep -q "^${var}=.*placeholder" .env.local; then
    MISSING+=("$var")
  fi
done

if [ ${#MISSING[@]} -gt 0 ]; then
  echo "❌ 以下の環境変数が未設定またはplaceholderのままです:"
  for var in "${MISSING[@]}"; do
    echo "  - $var"
  done
  exit 1
fi

echo "✅ 環境変数OK"

# ビルド確認
echo ""
echo "🔨 Building..."
pnpm build

echo "✅ ビルド成功"

# Vercel デプロイ
echo ""
echo "☁️ Deploying to Vercel..."

if ! command -v vercel &> /dev/null; then
  echo "Installing Vercel CLI..."
  pnpm add -g vercel
fi

# 環境変数をVercelにアップロード
echo "📤 Setting environment variables on Vercel..."
while IFS='=' read -r key value; do
  # コメント行とNEXT_PUBLIC_APP_URLをスキップ（本番URLは別途設定）
  [[ "$key" =~ ^#.*$ ]] && continue
  [[ -z "$key" ]] && continue
  echo "$value" | vercel env add "$key" production --force 2>/dev/null || true
done < .env.local

echo ""
echo "🚀 Deploying to production..."
vercel --prod

echo ""
echo "✅ デプロイ完了！"
echo ""
echo "📋 デプロイ後チェックリスト:"
echo "  - [ ] https://kashite.app にアクセス確認"
echo "  - [ ] 貸し借り記録の追加/返却テスト"
echo "  - [ ] /share/xxx のOGP表示確認"
echo "  - [ ] PWAインストール確認"
echo "  - [ ] ダークモード確認"
echo "  - [ ] Stripe Webhookエンドポイント登録"
