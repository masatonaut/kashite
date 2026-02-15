"use client";

import { useState } from "react";
import { X, Infinity, Headphones } from "lucide-react";
import { JA } from "@/constants/ja";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCount: number;
}

export function UpgradeModal({
  isOpen,
  onClose,
  currentCount,
}: UpgradeModalProps) {
  const [isLoading, setIsLoading] = useState<"monthly" | "yearly" | null>(null);

  if (!isOpen) return null;

  const handleCheckout = async (priceType: "monthly" | "yearly") => {
    try {
      setIsLoading(priceType);

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceType }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error("Checkout error:", error);
      setIsLoading(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative mx-4 w-full max-w-md rounded-[16px] bg-[var(--bg-primary)] p-6 shadow-lg"
        style={{ boxShadow: "var(--shadow-lg)" }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-[var(--text-tertiary)] transition-colors hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"
        >
          <X size={20} strokeWidth={1.5} />
        </button>

        {/* Content */}
        <div className="text-center">
          <h2 className="font-heading text-xl font-bold text-[var(--text-primary)]">
            {JA.UPGRADE_MODAL_TITLE}
          </h2>
          <p className="mt-2 text-[var(--text-secondary)]">
            {JA.UPGRADE_MODAL_DESCRIPTION.replace("{count}", String(currentCount))}
          </p>
        </div>

        {/* Features */}
        <ul className="mt-6 space-y-3">
          <li className="flex items-center gap-3 text-[var(--text-primary)]">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent)]/10">
              <Infinity size={14} className="text-[var(--accent)]" strokeWidth={1.5} />
            </div>
            <span>{JA.UPGRADE_FEATURE_UNLIMITED}</span>
          </li>
          <li className="flex items-center gap-3 text-[var(--text-primary)]">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent)]/10">
              <Headphones size={14} className="text-[var(--accent)]" strokeWidth={1.5} />
            </div>
            <span>{JA.UPGRADE_FEATURE_SUPPORT}</span>
          </li>
        </ul>

        {/* Buttons */}
        <div className="mt-6 space-y-3">
          <button
            onClick={() => handleCheckout("monthly")}
            disabled={isLoading !== null}
            className="w-full rounded-[var(--radius-md)] bg-[var(--accent)] px-4 py-3 font-medium text-white transition-all hover:bg-[var(--accent-hover)] disabled:opacity-50"
          >
            {isLoading === "monthly" ? (
              <span className="inline-flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                {JA.LOADING}
              </span>
            ) : (
              JA.UPGRADE_CTA_MONTHLY
            )}
          </button>

          <button
            onClick={() => handleCheckout("yearly")}
            disabled={isLoading !== null}
            className="w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3 font-medium text-[var(--text-primary)] transition-all hover:bg-[var(--border)] disabled:opacity-50"
          >
            {isLoading === "yearly" ? (
              <span className="inline-flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--text-tertiary)]/30 border-t-[var(--text-tertiary)]" />
                {JA.LOADING}
              </span>
            ) : (
              <>
                {JA.UPGRADE_CTA_YEARLY}
                <span className="ml-2 rounded-full bg-[var(--success)]/10 px-2 py-0.5 text-xs text-[var(--success)]">
                  {JA.UPGRADE_YEARLY_BADGE}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
