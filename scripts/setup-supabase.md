# Supabase セットアップ手順

## 1. プロジェクト作成

1. https://supabase.com にアクセス
2. 「New Project」をクリック
3. Organization を選択（なければ作成）
4. 以下を入力:
   - **Project name**: `kashite`
   - **Database Password**: 安全なパスワードを設定（保存しておく）
   - **Region**: `Northeast Asia (Tokyo)`
5. 「Create new project」をクリック
6. プロジェクト作成完了まで待機（1-2分）

## 2. データベースマイグレーション

1. 左メニューから「SQL Editor」を開く
2. 「New query」をクリック
3. `supabase/migrations/001_loans.sql` の内容をコピペ
4. 「Run」をクリック
5. 成功を確認
6. 新しいクエリを作成
7. `supabase/migrations/002_subscriptions.sql` の内容をコピペ
8. 「Run」をクリック
9. 成功を確認

## 3. 匿名認証の有効化

1. 左メニューから「Authentication」を開く
2. 「Providers」タブを選択
3. 「Anonymous Sign-In」を見つける
4. トグルを「Enabled」に切り替え
5. 「Save」をクリック

## 4. API キーの取得

1. 左メニューから「Settings」→「API」を開く
2. 以下の値をコピー:
   - **Project URL**: `https://xxx.supabase.co`
   - **anon public key**: `eyJhbG...`
   - **service_role key**: `eyJhbG...`（秘密！公開しない）

## 5. 環境変数に設定

`.env.local` を開き、以下を設定:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...
```

## 確認事項

- [ ] loans テーブルが作成されている
- [ ] subscriptions テーブルが作成されている
- [ ] RLS が有効になっている（Table Editor で確認）
- [ ] 匿名認証が有効になっている
