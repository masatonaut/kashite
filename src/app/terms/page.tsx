import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "利用規約 | KASHITE",
  description: "KASHITEの利用規約。サービスの利用条件、禁止事項、免責事項についてご説明します。",
};

export default function TermsPage() {
  return (
    <LegalLayout title="利用規約" lastUpdated="2025年1月15日">
      <section className="mb-8">
        <h2 className="text-lg font-medium text-text-primary border-b border-border pb-2 mb-4">
          第1条（適用）
        </h2>
        <p className="text-text-secondary mb-4">
          本利用規約（以下「本規約」）は、choimo（以下「当方」）が提供するサービス「KASHITE」（以下「本サービス」）の利用条件を定めるものです。ユーザーの皆様には、本規約に同意のうえ、本サービスをご利用いただきます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-medium text-text-primary border-b border-border pb-2 mb-4">
          第2条（サービス概要）
        </h2>
        <p className="text-text-secondary mb-4">
          本サービスは、個人間の貸し借りを記録・管理するためのウェブアプリケーションです。ユーザーは匿名認証によりアカウントを作成し、貸し借りの記録を保存できます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-medium text-text-primary border-b border-border pb-2 mb-4">
          第3条（利用条件）
        </h2>
        <ol className="list-decimal list-inside text-text-secondary space-y-2">
          <li>本サービスは、日本国内に居住する方を対象としています。</li>
          <li>無料プランでは、記録件数に制限があります。</li>
          <li>有料プラン（Pro）をご利用の場合は、別途定める料金をお支払いいただきます。</li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-medium text-text-primary border-b border-border pb-2 mb-4">
          第4条（禁止事項）
        </h2>
        <p className="text-text-secondary mb-4">
          ユーザーは、以下の行為を行ってはなりません。
        </p>
        <ol className="list-decimal list-inside text-text-secondary space-y-2">
          <li>法令または公序良俗に違反する行為</li>
          <li>犯罪行為に関連する行為</li>
          <li>本サービスのサーバーまたはネットワークに過度の負荷をかける行為</li>
          <li>本サービスの運営を妨害する行為</li>
          <li>他のユーザーの情報を収集または蓄積する行為</li>
          <li>不正アクセスを試みる行為</li>
          <li>他のユーザーになりすます行為</li>
          <li>本サービスに関連して、反社会的勢力に利益を供与する行為</li>
          <li>その他、当方が不適切と判断する行為</li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-medium text-text-primary border-b border-border pb-2 mb-4">
          第5条（サービスの停止・中断）
        </h2>
        <p className="text-text-secondary mb-4">
          当方は、以下の場合に、事前の通知なく本サービスの全部または一部を停止・中断することがあります。
        </p>
        <ol className="list-decimal list-inside text-text-secondary space-y-2">
          <li>システムの保守点検または更新を行う場合</li>
          <li>地震、落雷、火災、停電などの不可抗力により本サービスの提供が困難になった場合</li>
          <li>その他、当方がサービスの停止・中断が必要と判断した場合</li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-medium text-text-primary border-b border-border pb-2 mb-4">
          第6条（免責事項）
        </h2>
        <ol className="list-decimal list-inside text-text-secondary space-y-2">
          <li>当方は、本サービスに事実上または法律上の瑕疵がないことを保証しません。</li>
          <li>当方は、本サービスの利用により生じた損害について、一切の責任を負いません。ただし、当方の故意または重大な過失による場合は除きます。</li>
          <li>本サービスで記録された貸し借りの情報は参考情報であり、法的な証拠能力を保証するものではありません。</li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-medium text-text-primary border-b border-border pb-2 mb-4">
          第7条（規約の変更）
        </h2>
        <p className="text-text-secondary mb-4">
          当方は、必要と判断した場合には、ユーザーへの事前の通知なく本規約を変更できるものとします。変更後の利用規約は、本サービス上に表示した時点より効力を生じるものとします。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-medium text-text-primary border-b border-border pb-2 mb-4">
          第8条（準拠法・裁判管轄）
        </h2>
        <ol className="list-decimal list-inside text-text-secondary space-y-2">
          <li>本規約の解釈は、日本法に準拠するものとします。</li>
          <li>本サービスに関して紛争が生じた場合は、東京地方裁判所を第一審の専属的合意管轄裁判所とします。</li>
        </ol>
      </section>

      <section>
        <h2 className="text-lg font-medium text-text-primary border-b border-border pb-2 mb-4">
          運営者情報
        </h2>
        <p className="text-text-secondary">
          サービス名: KASHITE<br />
          運営: choimo / masatonaut
        </p>
      </section>
    </LegalLayout>
  );
}
