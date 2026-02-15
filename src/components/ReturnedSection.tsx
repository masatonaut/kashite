"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { LoanCard } from "./LoanCard";
import { JA } from "@/constants/ja";
import type { Loan } from "@/types";

interface ReturnedSectionProps {
  loans: Loan[];
  onShare?: (id: string) => void;
}

export function ReturnedSection({ loans, onShare }: ReturnedSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (loans.length === 0) return null;

  return (
    <div className="mt-8">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          w-full flex items-center justify-between
          py-3 text-text-secondary
          transition-colors hover:text-text-primary
        "
      >
        <span className="text-sm font-medium">
          {JA.RETURNED_SECTION_TITLE}
          <span className="ml-2 text-text-tertiary">({loans.length})</span>
        </span>
        <ChevronDown
          size={18}
          strokeWidth={1.5}
          className={`transition-transform duration-normal ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Content */}
      <div
        className="overflow-hidden transition-all duration-normal"
        style={{
          maxHeight: isOpen ? `${loans.length * 100}px` : "0",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="space-y-3 pt-2">
          {loans.map((loan) => (
            <LoanCard
              key={loan.id}
              id={loan.id}
              itemName={loan.item_name}
              borrowerName={loan.borrower_name}
              lentAt={loan.lent_at}
              isReturned
              onShare={() => onShare?.(loan.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
