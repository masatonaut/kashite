#!/bin/bash
# KASHITE → choimo-template 抽出スクリプト
# KASHITE完了後に実行

TEMPLATE_DIR=~/Code/projects/choimo-template

echo "📦 Extracting choimo-template from KASHITE..."

mkdir -p $TEMPLATE_DIR
cd $TEMPLATE_DIR

# Next.js 基盤
cp -r ~/Code/projects/kashite/package.json .
cp -r ~/Code/projects/kashite/tsconfig.json .
cp -r ~/Code/projects/kashite/tailwind.config.ts .
cp -r ~/Code/projects/kashite/next.config.ts .
cp -r ~/Code/projects/kashite/vercel.json .
cp -r ~/Code/projects/kashite/.eslintrc* .
cp -r ~/Code/projects/kashite/.gitignore .

# Kanso デザインシステム
mkdir -p src/app
cp ~/Code/projects/kashite/src/app/globals.css src/app/
cp ~/Code/projects/kashite/src/app/layout.tsx src/app/

# セキュリティ基盤
mkdir -p src/lib
cp ~/Code/projects/kashite/src/lib/security.ts src/lib/
cp ~/Code/projects/kashite/src/lib/validations.ts src/lib/
cp ~/Code/projects/kashite/src/middleware.ts src/

# Supabase
cp -r ~/Code/projects/kashite/src/lib/supabase src/lib/

# Stripe
cp ~/Code/projects/kashite/src/lib/stripe.ts src/lib/

# 共通コンポーネント
mkdir -p src/components/ui
cp -r ~/Code/projects/kashite/src/components/ui/* src/components/ui/

# CI/CD
cp -r ~/Code/projects/kashite/.github .

# 法的ページ（テンプレート化）
mkdir -p src/app/terms src/app/privacy src/app/tokushoho
cp ~/Code/projects/kashite/src/app/terms/page.tsx src/app/terms/
cp ~/Code/projects/kashite/src/app/privacy/page.tsx src/app/privacy/
cp ~/Code/projects/kashite/src/app/tokushoho/page.tsx src/app/tokushoho/

# .env.local.example
cp ~/Code/projects/kashite/.env.local.example .

# CLAUDE.md テンプレート
cat > CLAUDE.md << 'EOF'
# [APP_NAME] — by choimo

## ブランド
- シリーズ: choimo — 日常の小さな摩擦を美しく解消する
- プロダクト: [APP_NAME]
- Accent: [ACCENT_COLOR]

## デザインシステム Kanso（簡素）
（KASHITEと同じ。アクセントカラーだけ変更）

## 技術スタック
Next.js 15 / Supabase / Tailwind v4 / Vercel / Stripe / Serwist

## DB設計
[ここにアプリ固有のテーブル定義を書く]

## ディレクトリ
[ここにアプリ固有の構成を書く]
EOF

echo "✅ Template extracted to $TEMPLATE_DIR"
echo "次のステップ: アクセントカラーとDB設計を書き換えてアプリ開発開始"
