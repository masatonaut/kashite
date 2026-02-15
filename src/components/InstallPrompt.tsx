"use client";

import { useState, useEffect } from "react";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISSED_KEY = "kashite-install-dismissed";
const DISMISS_DURATION_DAYS = 7;

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissedAt = localStorage.getItem(DISMISSED_KEY);
    if (dismissedAt) {
      const dismissedDate = new Date(dismissedAt);
      const daysSinceDismissed =
        (Date.now() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissed < DISMISS_DURATION_DAYS) {
        return;
      }
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setTimeout(() => setIsVisible(true), 1000);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setIsVisible(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    localStorage.setItem(DISMISSED_KEY, new Date().toISOString());
    setIsVisible(false);
  };

  if (!isVisible || !deferredPrompt) {
    return null;
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-4"
      style={{
        animation: "slideUp 400ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
      }}
    >
      <div className="mx-auto max-w-md rounded-lg bg-white shadow-lg border border-[#E5E3DE] p-4 dark:bg-[#1E1E1C] dark:border-[#2A2A27]">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#E85D3A] flex items-center justify-center">
            <Download className="w-6 h-6 text-white" strokeWidth={1.5} />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-[15px] font-medium text-[#1A1A1A] dark:text-[#E8E6E1]">
              KASHITE
            </p>
            <p className="text-[13px] text-[#6B6B6B] dark:text-[#9B9B9B]">
              ホーム画面に追加
            </p>
          </div>

          <button
            onClick={handleInstall}
            className="flex-shrink-0 px-4 py-2 rounded-lg bg-[#E85D3A] text-white text-[14px] font-medium transition-transform hover:scale-105 active:scale-95"
            style={{
              transition: "transform 150ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            追加
          </button>

          <button
            onClick={handleDismiss}
            className="flex-shrink-0 p-2 rounded-lg text-[#9B9B9B] hover:bg-[#F2F0EB] dark:hover:bg-[#2A2A27] transition-colors"
            aria-label="閉じる"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
