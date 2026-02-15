import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "プライバシーポリシー | KASHITE",
  description: "KASHITEのプライバシーポリシー。収集する情報、利用目的、データの取り扱いについてご説明します。",
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="プライバシーポリシー" lastUpdated="2025年1月15日">
      <section className="mb-8">
        <p className="text-text-secondary mb-4">
          choimo（以下「当方」）は、KASHITE（以下「本サービス」）におけるユーザーの個人情報の取り扱いについて、以下のとおりプライバシーポリシーを定めます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-medium text-text-primary border-b border-border pb-2 mb-4">
          1. 収集する情報
        </h2>
        <p className="text-text-secondary mb-4">
          本サービスでは、以下の情報を収集します。
        </p>
        <ul className="list-disc list-inside text-text-secondary space-y-2">
          <li>
            <strong>匿名認証ID:</strong> Supabase Authによる匿名認証で生成される一意の識別子
          </li>
          <li>
            <strong>貸し借り記録データ:</strong> ユーザーが入力したアイテム名、相手の名前、メモ、日付
          </li>
          <li>
            <strong>利用状況データ:</strong> アクセス日時、利用した機能など（Google AnalyticsおよびVercel Analyticsを使用）
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-medium text-text-primary border-b border-border pb-2 mb-4">
          2. 利用目的
        </h2>
        <p className="text-text-secondary mb-4">
          収集した情報は、以下の目的で利用します。
        </p>
        <ul className="list-disc list-inside text-text-secondary space-y-2">
          <li>本サービスの提供および運営</li>
          <li>ユーザーの貸し借り記録の保存と表示</li>
          <li>サービスの改善および新機能の開発</li>
          <li>システムの安定性維持およびセキュリティ対策</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-medium text-text-primary border-b border-border pb-2 mb-4">
          3. 第三者提供
        </h2>
        <p className="text-text-secondary mb-4">
          当方は、以下の場合を除き、ユーザーの情報を第三者に提供しません。
        </p>
        <ul className="list-disc list-inside text-text-secondary space-y-2">
          <li>ユーザーの同意がある場合</li>
          <li>法令に基づく場合</li>
          <li>人の生命、身体または財産の保護のために必要がある場合</li>
        </ul>
        <p className="text-text-secondary mt-4">
          なお、有料プランをご利用の場合、決済処理はStripe, Inc.が行います。決済に関する情報（クレジットカード情報等）は、当方では保持せず、Stripeが直接管理します。Stripeのプライバシーポリシーについては、<a href="https://stripe.com/jp/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Stripeプライバシーポリシー</a>をご確認ください。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-medium text-text-primary border-b border-border pb-2 mb-4">
          4. データ保管
        </h2>
        <p className="text-text-secondary mb-4">
          ユーザーのデータは、Supabase（データベースサービス）に保管されます。サーバーはAWS Tokyo Region（東京リージョン）を想定しており、適切なセキュリティ対策のもとで管理されています。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-medium text-text-primary border-b border-border pb-2 mb-4">
          5. データの削除
        </h2>
        <p className="text-text-secondary mb-4">
          ユーザーがアカウントを削除した場合、当該ユーザーに関連するすべてのデータ（貸し借り記録を含む）は完全に削除されます。削除されたデータは復元できません。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-medium text-text-primary border-b border-border pb-2 mb-4">
          6. Cookieの使用
        </h2>
        <p className="text-text-secondary mb-4">
          本サービスでは、以下の目的でCookieを使用します。
        </p>
        <ul className="list-disc list-inside text-text-secondary space-y-2">
          <li>
            <strong>認証セッション:</strong> ユーザーのログイン状態を維持するため
          </li>
          <li>
            <strong>アナリティクス:</strong> サービス改善のための利用状況分析（Google Analytics、Vercel Analytics）
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-medium text-text-primary border-b border-border pb-2 mb-4">
          7. アナリティクスツール
        </h2>
        <p className="text-text-secondary mb-4">
          本サービスでは、サービス改善のため以下のアナリティクスツールを使用しています。
        </p>
        <ul className="list-disc list-inside text-text-secondary space-y-2">
          <li>
            <strong>Google Analytics:</strong> Googleが提供するアクセス解析ツール。詳細は<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Googleプライバシーポリシー</a>をご確認ください。
          </li>
          <li>
            <strong>Vercel Analytics:</strong> Vercelが提供するパフォーマンス分析ツール。詳細は<a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Vercelプライバシーポリシー</a>をご確認ください。
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-medium text-text-primary border-b border-border pb-2 mb-4">
          8. プライバシーポリシーの変更
        </h2>
        <p className="text-text-secondary mb-4">
          当方は、必要に応じて本プライバシーポリシーを変更することがあります。変更後のプライバシーポリシーは、本サービス上に表示した時点より効力を生じるものとします。
        </p>
      </section>

      <section>
        <h2 className="text-lg font-medium text-text-primary border-b border-border pb-2 mb-4">
          9. お問い合わせ
        </h2>
        <p className="text-text-secondary">
          本プライバシーポリシーに関するお問い合わせは、以下までご連絡ください。
        </p>
        <p className="text-text-secondary mt-2">
          メールアドレス: support@choimo.com
        </p>
      </section>
    </LegalLayout>
  );
}
