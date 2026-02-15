<div align="center">

# KASHITE ✦

**Lend it. Track it. Get it back.**

Part of the [choimo](https://github.com/masatonaut) micro-tool series.

[![CI](https://github.com/masatonaut/kashite/actions/workflows/ci.yml/badge.svg)](https://github.com/masatonaut/kashite/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-E85D3A.svg)](https://opensource.org/licenses/MIT)

[Live Demo](https://kashite.app) · [Report Bug](https://github.com/masatonaut/kashite/issues) · [Request Feature](https://github.com/masatonaut/kashite/issues)

</div>

---

## About

KASHITE（カシテ）は「誰に何を貸したっけ？」を解決するマイクロツールです。

- 📝 貸したモノを3秒で記録
- ⬅️ スワイプで返却処理
- 🔗 URLで返却リクエストを送信
- 📱 PWA対応（オフラインでも閲覧可能）
- 🌙 ダークモード

### Design System: Kanso（簡素）

Japanese minimalism philosophy applied to digital products.
MUJI's functional beauty × Linear's craftsmanship × walica's friendliness.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Database | Supabase (PostgreSQL + RLS) |
| Styling | Tailwind CSS v4 |
| Hosting | Vercel |
| Payment | Stripe |
| PWA | Serwist |

## Security

- Row Level Security on all tables
- CSP headers + security headers
- Rate limiting (60 req/min)
- Input validation (zod) + sanitization (DOMPurify)
- Stripe webhook signature verification

## Getting Started

### Prerequisites
- Node.js 20+
- pnpm 9+

### Installation

```bash
git clone https://github.com/masatonaut/kashite.git
cd kashite
pnpm install
cp .env.local.example .env.local
# Fill in your keys (see docs/DEPLOY.md)
pnpm dev
```

## 🇯🇵 日本語

KASHITEは「貸して」から名付けたアプリです。
友達に漫画を貸して3ヶ月…催促するの気まずくないですか？
KASHITEなら、URLを送るだけで優しく返却リクエストできます。

## choimo Series

| App | Description | Status |
|-----|-------------|--------|
| **KASHITE** | 貸し借り記録 | ✅ Live |
| DOCCHI | 2択ルーレット | 🔜 Coming |
| MATSU | カウントダウン共有 | 🔜 Coming |
| KURIKAN | 定期出費メモ | 📋 Planned |
| FKURO | マイクローゼット | 📋 Planned |

## License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">
  <sub>Built with ♥ by <a href="https://github.com/masatonaut">masatonaut</a></sub>
</div>
