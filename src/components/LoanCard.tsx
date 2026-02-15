"use client";

import { useMemo } from "react";
import { useSwipe } from "@/hooks/useSwipe";
import { JA } from "@/constants/ja";
import { Share2, Check } from "lucide-react";

interface LoanCardProps {
  id: string;
  itemName: string;
  borrowerName: string;
  lentAt: string;
  isReturned?: boolean;
  onReturn?: () => void;
  onShare?: () => void;
}

function calculateDaysAgo(lentAt: string): number {
  return Math.floor(
    (Date.now() - new Date(lentAt).getTime()) / (1000 * 60 * 60 * 24)
  );
}

export function LoanCard({
  itemName,
  borrowerName,
  lentAt,
  isReturned = false,
  onReturn,
  onShare,
}: LoanCardProps) {
  const { offsetX, isSwiping, isRevealed, handlers } = useSwipe({
    threshold: 80,
    velocityThreshold: 0.5,
    onSwipeLeft: onReturn,
  });

  // Calculate days since lent - memoize based on lentAt
  const daysAgo = useMemo(() => calculateDaysAgo(lentAt), [lentAt]);

  const isWarning = daysAgo > 30;

  return (
    <div className="relative overflow-hidden rounded-[14px]">
      {/* Swipe action background */}
      {!isReturned && (
        <div
          className="absolute inset-0 flex items-center justify-end px-6 bg-success"
          style={{ opacity: isRevealed ? 1 : 0.7 }}
        >
          <div className="flex items-center gap-2 text-white font-medium">
            <Check size={20} strokeWidth={2.5} />
            <span>{JA.LOAN_RETURNED}</span>
          </div>
        </div>
      )}

      {/* Card content */}
      <div
        {...(!isReturned ? handlers : {})}
        className={`
          relative bg-bg-secondary dark:bg-[#1E1E1C] p-4
          border border-border rounded-[14px]
          shadow-[var(--shadow-sm)]
          select-none
          ${!isReturned ? "cursor-grab active:cursor-grabbing touch-pan-y" : ""}
          ${isReturned ? "opacity-45" : ""}
        `}
        style={{
          transform: `translateX(${offsetX}px)`,
          transition: isSwiping ? "none" : "transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h3
              className={`
                font-semibold text-[15px] text-text-primary truncate
                ${isReturned ? "line-through" : ""}
              `}
            >
              {itemName}
            </h3>
            <p
              className={`
                text-[13px] text-text-secondary mt-0.5
                ${isReturned ? "line-through" : ""}
              `}
            >
              {borrowerName}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Days counter */}
            <div className="text-right">
              <div className="flex items-baseline gap-0.5">
                <span
                  className={`
                    font-bold text-[20px]
                    ${isReturned ? "text-text-tertiary" : isWarning ? "text-[#D4443B]" : "text-accent"}
                  `}
                >
                  {daysAgo === 0 ? JA.LOAN_TODAY : daysAgo}
                </span>
                {daysAgo !== 0 && (
                  <span
                    className={`
                      text-[11px] font-medium
                      ${isReturned ? "text-text-tertiary" : isWarning ? "text-[#D4443B]" : "text-accent"}
                    `}
                  >
                    {JA.DAYS_UNIT}
                  </span>
                )}
              </div>
            </div>

            {/* Share button */}
            {!isReturned && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onShare?.();
                }}
                className="p-2 text-text-tertiary hover:text-text-secondary transition-colors"
                aria-label={JA.SHARE_BUTTON}
              >
                <Share2 size={18} strokeWidth={1.5} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
