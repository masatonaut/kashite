import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記 | KASHITE",
  description: "KASHITEの特定商取引法に基づく表記。販売業者、価格、支払方法などの情報を記載しています。",
};

export default function TokushohoPage() {
  return (
    <LegalLayout title="特定商取引法に基づく表記" lastUpdated="2025年1月15日">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <tbody>
            <tr className="border-b border-border">
              <th className="py-4 pr-4 text-left text-text-primary font-medium w-1/3 align-top">
                販売業者
              </th>
              <td className="py-4 text-text-secondary">
                masatonaut
              </td>
            </tr>
            <tr className="border-b border-border">
              <th className="py-4 pr-4 text-left text-text-primary font-medium align-top">
                代表者名
              </th>
              <td className="py-4 text-text-secondary">
                請求があった場合に遅滞なく開示いたします
              </td>
            </tr>
            <tr className="border-b border-border">
              <th className="py-4 pr-4 text-left text-text-primary font-medium align-top">
                所在地
              </th>
              <td className="py-4 text-text-secondary">
                請求があった場合に遅滞なく開示いたします
              </td>
            </tr>
            <tr className="border-b border-border">
              <th className="py-4 pr-4 text-left text-text-primary font-medium align-top">
                連絡先
              </th>
              <td className="py-4 text-text-secondary">
                メールアドレス: support@choimo.com<br />
                <span className="text-text-tertiary text-xs">※お問い合わせはメールにてお願いいたします</span>
              </td>
            </tr>
            <tr className="border-b border-border">
              <th className="py-4 pr-4 text-left text-text-primary font-medium align-top">
                販売価格
              </th>
              <td className="py-4 text-text-secondary">
                KASHITE Pro: 月額 ¥300（税込）<br />
                KASHITE Pro: 年額 ¥2,400（税込）
              </td>
            </tr>
            <tr className="border-b border-border">
              <th className="py-4 pr-4 text-left text-text-primary font-medium align-top">
                販売価格以外の必要料金
              </th>
              <td className="py-4 text-text-secondary">
                インターネット接続料金、通信料金等はお客様のご負担となります
              </td>
            </tr>
            <tr className="border-b border-border">
              <th className="py-4 pr-4 text-left text-text-primary font-medium align-top">
                支払方法
              </th>
              <td className="py-4 text-text-secondary">
                クレジットカード決済（Stripe経由）
              </td>
            </tr>
            <tr className="border-b border-border">
              <th className="py-4 pr-4 text-left text-text-primary font-medium align-top">
                支払時期
              </th>
              <td className="py-4 text-text-secondary">
                月額プラン: 毎月のご利用開始日に請求<br />
                年額プラン: 年間一括払い
              </td>
            </tr>
            <tr className="border-b border-border">
              <th className="py-4 pr-4 text-left text-text-primary font-medium align-top">
                サービス提供時期
              </th>
              <td className="py-4 text-text-secondary">
                決済完了後、即時ご利用いただけます
              </td>
            </tr>
            <tr className="border-b border-border">
              <th className="py-4 pr-4 text-left text-text-primary font-medium align-top">
                返品・キャンセル
              </th>
              <td className="py-4 text-text-secondary">
                サービスの性質上、返品はできません。<br />
                解約は月末まで有効となり、日割り返金は行っておりません。<br />
                次回更新日の前日までに解約手続きを行った場合、次回以降の請求は発生しません。
              </td>
            </tr>
            <tr>
              <th className="py-4 pr-4 text-left text-text-primary font-medium align-top">
                動作環境
              </th>
              <td className="py-4 text-text-secondary">
                以下のモダンブラウザの最新版を推奨します：<br />
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Google Chrome</li>
                  <li>Safari</li>
                  <li>Mozilla Firefox</li>
                  <li>Microsoft Edge</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </LegalLayout>
  );
}
