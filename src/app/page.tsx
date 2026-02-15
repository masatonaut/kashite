"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { LoanCard } from "@/components/LoanCard";
import { EmptyState } from "@/components/EmptyState";
import { AddLoanSheet } from "@/components/AddLoanSheet";
import { ReturnedSection } from "@/components/ReturnedSection";
import { FAB } from "@/components/FAB";
import { useLoans } from "@/hooks/useLoans";
import type { CreateLoanInput } from "@/lib/validations";

export default function Home() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { activeLoans, returnedLoans, isLoading, addLoan, markAsReturned } = useLoans();

  const handleAddLoan = async (data: CreateLoanInput) => {
    await addLoan({
      item_name: data.item_name,
      borrower_name: data.borrower_name,
      memo: data.memo,
      lent_at: data.lent_at.toISOString(),
    });
  };

  const handleReturn = (id: string) => {
    markAsReturned(id);
  };

  const handleShare = (id: string) => {
    // TODO: Implement share modal
    console.log("Share loan:", id);
  };

  return (
    <main className="min-h-screen bg-bg-primary">
      <Header activeCount={activeLoans.length} />

      <div className="px-5 py-6 pb-24 animate-fade-up">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        ) : activeLoans.length === 0 && returnedLoans.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Active loans */}
            {activeLoans.length > 0 && (
              <div className="space-y-3">
                {activeLoans.map((loan) => (
                  <LoanCard
                    key={loan.id}
                    id={loan.id}
                    itemName={loan.item_name}
                    borrowerName={loan.borrower_name}
                    lentAt={loan.lent_at}
                    onReturn={() => handleReturn(loan.id)}
                    onShare={() => handleShare(loan.id)}
                  />
                ))}
              </div>
            )}

            {/* Empty active state but has returned */}
            {activeLoans.length === 0 && returnedLoans.length > 0 && (
              <EmptyState />
            )}

            {/* Returned section */}
            <ReturnedSection
              loans={returnedLoans}
              onShare={handleShare}
            />
          </>
        )}
      </div>

      {/* FAB */}
      <FAB isOpen={isSheetOpen} onClick={() => setIsSheetOpen(!isSheetOpen)} />

      {/* Add loan sheet */}
      <AddLoanSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        onSubmit={handleAddLoan}
      />
    </main>
  );
}
