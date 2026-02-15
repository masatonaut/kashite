import Link from "next/link";
import { JA } from "@/constants/ja";

interface LegalLayoutProps {
  children: React.ReactNode;
  title: string;
  lastUpdated?: string;
}

export function LegalLayout({ children, title, lastUpdated }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-[640px] mx-auto px-5 py-4">
          <Link
            href="/"
            className="font-heading text-lg font-bold tracking-tight text-text-primary hover:text-accent transition-colors duration-fast"
          >
            {JA.HEADER_TITLE}
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-[640px] mx-auto px-5 py-8 animate-fade-up">
        <h1 className="font-heading text-2xl font-bold text-text-primary mb-6">
          {title}
        </h1>

        <article className="legal-prose text-sm leading-[1.9] text-text-primary">
          {children}
        </article>

        {lastUpdated && (
          <p className="mt-8 text-xs text-text-tertiary">
            最終更新日: {lastUpdated}
          </p>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12">
        <div className="max-w-[640px] mx-auto px-5 py-6">
          <nav className="flex items-center justify-center gap-4 text-sm text-text-secondary">
            <Link href="/terms" className="hover:text-accent transition-colors duration-fast">
              {JA.TERMS}
            </Link>
            <span className="text-border">|</span>
            <Link href="/privacy" className="hover:text-accent transition-colors duration-fast">
              {JA.PRIVACY}
            </Link>
            <span className="text-border">|</span>
            <Link href="/tokushoho" className="hover:text-accent transition-colors duration-fast">
              {JA.TOKUSHOHO}
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
