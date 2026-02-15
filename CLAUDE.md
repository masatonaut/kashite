# KASHITE — by choimo

## ブランド
- シリーズ: choimo — 日常の小さな摩擦を美しく解消するマイクロツール群
- プロダクト: KASHITE — 「誰に何を貸した？」を1画面で解決
- タグライン: Lend it. Track it. Get it back.
- トーン: 友達に教えるような、無駄のない日本語
- Brand Bible: docs/../brand-bible.md

## デザインシステム Kanso（簡素）
MUJI × Linear × walica

### カラー
- Background: #FAFAF8, #F2F0EB
- Text: #1A1A1A, #6B6B6B, #9B9B9B
- Accent: #E85D3A（朱色）
- Border: #E5E3DE
- Success: #4CAF82 / Warning: #E8A73A / Error: #E85D3A
- Dark: bg #141413, card #1E1E1C, text #E8E6E1, border #2A2A27

### フォント
- 日本語: Zen Kaku Gothic New 400/500/700
- 英数字: DM Sans 400/500/700
- 見出し: Outfit 600/700/800
- body: 15px, line-height 1.7, letter-spacing 0.01em
- h1-h3: letter-spacing -0.02em, line-height 1.2

### スペーシング (8px grid)
xs:4 sm:8 md:16 lg:24 xl:32 2xl:48 3xl:64
radius: sm 8 md 12 lg 16 full 9999
shadow-sm: 0 1px 2px rgba(0,0,0,0.04)
shadow-md: 0 2px 8px rgba(0,0,0,0.06)
shadow-lg: 0 4px 16px rgba(0,0,0,0.08)

### レイアウト
- モバイルpadding: 20px
- カード間: 12px
- セクション間: 48-64px

### アニメーション
- fast: 150ms cubic-bezier(0.4,0,0.2,1)
- normal: 250ms cubic-bezier(0.4,0,0.2,1)
- spring: 400ms cubic-bezier(0.34,1.56,0.64,1)
- スワイプ: translateX(-100%) + opacity 0 + height collapse 300ms
- FAB: scale(0) rotate(-180deg) → scale(1) rotate(0) 500ms spring
- ページ: fadeUp 350ms

### アイコン
Lucide Icons stroke-width 1.5

## 技術スタック
- Next.js 15 (App Router, Server Components優先)
- Supabase (匿名認証 + PostgreSQL + RLS)
- Tailwind CSS v4
- Vercel / PWA (Serwist) / Stripe
- lucide-react

## セキュリティ ★最重要★
- RLS全テーブル必須
- API全認証チェック
- zod全入力バリデーション
- DOMPurify全サニタイズ
- CSP + X-Frame-Options + X-Content-Type-Options
- Rate Limiting 60req/min/IP (upstash)
- 環境変数ハードコード絶対禁止
- パラメータ化クエリのみ

## DB: loans テーブル
id uuid PK, user_id uuid FK, item_name text(100), borrower_name text(50), memo text(500), lent_at timestamptz, returned_at timestamptz(null=未返却), status text(active/returned), share_token uuid, created_at timestamptz, updated_at timestamptz

### RLS
SELECT/INSERT/UPDATE/DELETE: auth.uid() = user_id
例外: share_tokenで匿名READ(item_name, borrower_name, lent_atのみ)

## ディレクトリ
src/app/ (layout, page, share/[token], pricing, terms, privacy, tokushoho, api/og, api/webhooks/stripe)
src/components/ (LoanCard, AddLoanSheet, EmptyState, ShareModal, UpgradeModal, ui/)
src/lib/ (supabase/client+server+middleware, stripe, validations, security)
src/hooks/ (useLoans, useSwipe)
src/constants/ja.ts, src/types/index.ts

## UI指示
ヘッダー: 左KASHITE(Outfit700) 右バッジ(朱色丸)
カード: 白背景 微細シャドウ 左スワイプ返却 アイテム名太字 相手名 経過日数(朱色)
返却済み: 折りたたみ グレーアウト 取消線
FAB: 右下 朱色 + spring
追加: ボトムシート ドラッグ閉じ
Empty: 中央 線画 「まだ何も貸してないよ」+CTA
Dark: 自動+手動 bg#141413 card#1E1E1C accent朱色そのまま

## 並列開発
- worktree独立。他worktree参照しない
- 1PR=1機能。コミット: feat/fix/security/chore/docs
- 完了後 docs/reviews/daily-log.md に記録

## Git
- main: 保護、PRレビュー必須
- develop: 統合
- feat/*: worktreeごと

## コーディング規約
TypeScript strict / Server Components優先 / use client最小限 / 全async try-catch / コンポーネント単一責任
