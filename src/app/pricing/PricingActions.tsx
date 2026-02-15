"use client";

import { useState } from "react";
import { JA } from "@/constants/ja";

interface PricingActionsProps {
  isPro: boolean;
  hasCustomerId: boolean;
  isLoggedIn: boolean;
}

export function PricingActions({ isPro, hasCustomerId, isLoggedIn }: PricingActionsProps) {
  const [isLoading, setIsLoading] = useState<"monthly" | "yearly" | "portal" | null>(null);

  const handleCheckout = async (priceType: "monthly" | "yearly") => {
    if (!isLoggedIn) {
      // Redirect to login or home
      window.location.href = "/";
      return;
    }

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

  const handlePortal = async () => {
    try {
      setIsLoading("portal");

      const response = await fetch("/api/portal", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to create portal session");
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error("Portal error:", error);
      setIsLoading(null);
    }
  };

  if (isPro && hasCustomerId) {
    return (
      <div className="space-y-3">
        <div className="rounded-[var(--radius-md)] bg-[var(--success)]/10 px-4 py-3 text-center text-[var(--success)]">
          {JA.PRICING_CURRENT_PLAN}
        </div>
        <button
          onClick={handlePortal}
          disabled={isLoading !== null}
          className="w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3 font-medium text-[var(--text-primary)] transition-all hover:bg-[var(--border)] disabled:opacity-50"
        >
          {isLoading === "portal" ? (
            <span className="inline-flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--text-tertiary)]/30 border-t-[var(--text-tertiary)]" />
              {JA.LOADING}
            </span>
          ) : (
            JA.PRICING_MANAGE
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
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
          JA.PRICING_CTA_MONTHLY
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
            {JA.PRICING_CTA_YEARLY}
            <span className="ml-2 rounded-full bg-[var(--success)]/10 px-2 py-0.5 text-xs text-[var(--success)]">
              {JA.UPGRADE_YEARLY_BADGE}
            </span>
          </>
        )}
      </button>
    </div>
  );
}
