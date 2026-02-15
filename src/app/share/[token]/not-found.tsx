import Link from "next/link";

export default function NotFound() {
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
        <div className="text-center">
          <div
            style={{
              fontSize: "64px",
              marginBottom: "16px",
            }}
          >
            🔍
          </div>
          <h1
            className="font-heading"
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#1A1A1A",
              marginBottom: "8px",
            }}
          >
            このページは存在しません
          </h1>
          <p
            style={{
              fontSize: "14px",
              color: "#6B6B6B",
              marginBottom: "24px",
            }}
          >
            リンクが無効か、削除された可能性があります。
          </p>
          <Link
            href="/"
            style={{
              display: "inline-block",
              padding: "12px 24px",
              background: "#E85D3A",
              color: "#FFFFFF",
              fontSize: "14px",
              fontWeight: 500,
              borderRadius: "8px",
              textDecoration: "none",
              transition: "background 150ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            トップへ戻る
          </Link>
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
