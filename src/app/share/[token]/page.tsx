import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { shareTokenSchema } from "@/lib/validations";
import { SharePageClient } from "./client";

interface Props {
  params: Promise<{ token: string }>;
}

async function getLoanByShareToken(token: string) {
  const parsed = shareTokenSchema.safeParse({ token });
  if (!parsed.success) {
    return null;
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("loans")
    .select("item_name, borrower_name, lent_at")
    .eq("share_token", token)
    .eq("status", "active")
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { token } = await params;
  const loan = await getLoanByShareToken(token);

  if (!loan) {
    return {
      title: "ページが見つかりません — KASHITE",
      description: "このページは存在しないか、削除されました。",
    };
  }

  const encodedItem = encodeURIComponent(loan.item_name);
  const encodedPerson = encodeURIComponent(loan.borrower_name);

  return {
    title: `${loan.item_name} — KASHITE`,
    description: `${loan.borrower_name}さん、${loan.item_name}を借りていませんか？`,
    openGraph: {
      title: `${loan.item_name} — KASHITE`,
      description: `${loan.borrower_name}さん、${loan.item_name}を借りていませんか？`,
      type: "website",
      locale: "ja_JP",
      images: [
        {
          url: `/api/og?item=${encodedItem}&person=${encodedPerson}`,
          width: 1200,
          height: 630,
          alt: `${loan.borrower_name}さん、${loan.item_name} 返して！`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${loan.item_name} — KASHITE`,
      description: `${loan.borrower_name}さん、${loan.item_name}を借りていませんか？`,
      images: [`/api/og?item=${encodedItem}&person=${encodedPerson}`],
    },
  };
}

function getDaysAgo(dateString: string): string {
  const lentDate = new Date(dateString);
  const today = new Date();
  const diffTime = today.getTime() - lentDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "今日";
  if (diffDays === 1) return "昨日";
  return `${diffDays}日前`;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function SharePage({ params }: Props) {
  const { token } = await params;
  const loan = await getLoanByShareToken(token);

  if (!loan) {
    notFound();
  }

  const daysAgo = getDaysAgo(loan.lent_at);
  const formattedDate = formatDate(loan.lent_at);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FAFAF8" }}>
      {/* Header */}
      <header className="px-5 py-4">
        <div className="font-heading text-sm tracking-tight">
          <span style={{ color: "#E85D3A" }}>K</span>
          <span style={{ color: "#1A1A1A" }}>ASHITE</span>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-5 py-8">
        <div
          className="w-full max-w-sm"
          style={{
            background: "#FFFFFF",
            borderRadius: "16px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
            padding: "32px",
          }}
        >
          {/* Borrower name */}
          <h1
            className="font-heading"
            style={{
              fontSize: "24px",
              fontWeight: 700,
              color: "#1A1A1A",
              marginBottom: "8px",
            }}
          >
            {loan.borrower_name}さん
          </h1>

          {/* Item question */}
          <p
            style={{
              fontSize: "15px",
              color: "#1A1A1A",
              lineHeight: 1.7,
              marginBottom: "16px",
            }}
          >
            <span style={{ fontWeight: 500 }}>{loan.item_name}</span> を借りていませんか？
          </p>

          {/* Lent date */}
          <p
            style={{
              fontSize: "14px",
              color: "#6B6B6B",
              marginBottom: "24px",
            }}
          >
            貸出日: {formattedDate}
            <span
              style={{
                marginLeft: "8px",
                color: "#E85D3A",
                fontWeight: 500,
              }}
            >
              {daysAgo}
            </span>
          </p>

          {/* Divider */}
          <div
            style={{
              height: "2px",
              background: "#E85D3A",
              marginBottom: "24px",
              opacity: 0.3,
            }}
          />

          {/* Return button (client component for interaction) */}
          <SharePageClient />
        </div>
      </main>

      {/* Footer */}
      <footer
        className="px-5 py-6 text-center"
        style={{ color: "#9B9B9B", fontSize: "12px" }}
      >
        <p style={{ marginBottom: "4px" }}>
          KASHITE — 貸し借りをスマートに管理
        </p>
        <p style={{ fontSize: "10px", opacity: 0.7 }}>by choimo</p>
      </footer>
    </div>
  );
}
