# Upstash Redis セットアップ手順

## 1. アカウント作成

1. https://upstash.com にアクセス
2. 「Sign Up」または「Sign In」

## 2. Redis データベース作成

1. ダッシュボードで「Create Database」をクリック
2. 以下を入力:
   - **Name**: `kashite-ratelimit`
   - **Type**: `Regional`
   - **Region**: `ap-northeast-1` (Tokyo)
3. 「Create」をクリック

## 3. 接続情報の取得

1. 作成したデータベースをクリック
2. 「REST API」セクションを確認
3. 以下の値をコピー:
   - **UPSTASH_REDIS_REST_URL**: `https://xxx.upstash.io`
   - **UPSTASH_REDIS_REST_TOKEN**: `AXxx...`

## 4. 環境変数に設定

`.env.local` を開き、以下を設定:

```env
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=AXxx...
```

## 料金について

- Free tier: 10,000 commands/day
- Rate limiting (60 req/min/IP) の場合、十分な容量
- 超過した場合は Pay-as-you-go に自動移行

## 確認事項

- [ ] データベースが作成されている
- [ ] REST URL と Token が取得できている
- [ ] 環境変数に設定済み
