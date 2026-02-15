import { JA } from "@/constants/ja";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-primary">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-bg-primary/80 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-5 py-4">
          <h1 className="font-heading text-xl font-bold tracking-tight text-text-primary">
            {JA.HEADER_TITLE}
          </h1>
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent text-white text-xs font-medium">
            0
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="px-5 py-6 animate-fade-up">
        {/* Empty State */}
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="w-24 h-24 mb-6 text-text-tertiary">
            <svg
              viewBox="0 0 96 96"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="16" y="24" width="64" height="48" rx="4" />
              <path d="M16 36h64" />
              <circle cx="28" cy="30" r="2" fill="currentColor" />
              <circle cx="36" cy="30" r="2" fill="currentColor" />
              <circle cx="44" cy="30" r="2" fill="currentColor" />
              <path d="M32 52h32" />
              <path d="M32 60h24" />
            </svg>
          </div>
          <h2 className="text-lg font-medium text-text-primary mb-2">
            {JA.EMPTY_TITLE}
          </h2>
          <p className="text-sm text-text-secondary mb-6">
            {JA.EMPTY_DESCRIPTION}
          </p>
          <button className="px-6 py-3 bg-accent hover:bg-accent-hover text-white font-medium rounded-full transition-colors duration-fast shadow-md">
            {JA.EMPTY_CTA}
          </button>
        </div>
      </div>

      {/* FAB */}
      <button
        className="fixed bottom-6 right-5 w-14 h-14 bg-accent hover:bg-accent-hover text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-fast animate-fab-enter"
        aria-label="Add loan"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
    </main>
  );
}
