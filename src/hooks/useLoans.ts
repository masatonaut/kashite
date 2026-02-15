"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Loan, LoanInsert } from "@/types";

interface UseLoansReturn {
  loans: Loan[];
  activeLoans: Loan[];
  returnedLoans: Loan[];
  isLoading: boolean;
  error: string | null;
  addLoan: (loan: LoanInsert) => Promise<void>;
  markAsReturned: (id: string) => Promise<void>;
  deleteLoan: (id: string) => Promise<void>;
  refresh: () => Promise<void>;
}

export function useLoans(): UseLoansReturn {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Only create client on client-side
  const supabase = useMemo(() => {
    if (typeof window === "undefined") return null;
    return createClient();
  }, []);

  // Sort loans by days since lent (descending - oldest first)
  const sortByDays = (items: Loan[]) => {
    return [...items].sort((a, b) => {
      const daysA = Math.floor(
        (Date.now() - new Date(a.lent_at).getTime()) / (1000 * 60 * 60 * 24)
      );
      const daysB = Math.floor(
        (Date.now() - new Date(b.lent_at).getTime()) / (1000 * 60 * 60 * 24)
      );
      return daysB - daysA;
    });
  };

  const activeLoans = sortByDays(loans.filter((l) => l.status === "active"));
  const returnedLoans = sortByDays(loans.filter((l) => l.status === "returned"));

  const fetchLoans = useCallback(async () => {
    if (!supabase) return;

    try {
      setIsLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from("loans")
        .select("*")
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;

      setLoans(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  }, [supabase]);

  // Set isClient flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initial fetch and realtime subscription
  useEffect(() => {
    if (!supabase || !isClient) return;

    fetchLoans();

    const channel = supabase
      .channel("loans-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "loans",
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setLoans((prev) => [payload.new as Loan, ...prev]);
          } else if (payload.eventType === "UPDATE") {
            setLoans((prev) =>
              prev.map((loan) =>
                loan.id === (payload.new as Loan).id
                  ? (payload.new as Loan)
                  : loan
              )
            );
          } else if (payload.eventType === "DELETE") {
            setLoans((prev) =>
              prev.filter((loan) => loan.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, isClient, fetchLoans]);

  // Optimistic add
  const addLoan = useCallback(
    async (input: LoanInsert) => {
      if (!supabase) throw new Error("Client not initialized");

      const optimisticLoan: Loan = {
        id: crypto.randomUUID(),
        user_id: "",
        item_name: input.item_name,
        borrower_name: input.borrower_name,
        memo: input.memo || null,
        lent_at: input.lent_at || new Date().toISOString(),
        returned_at: null,
        status: "active",
        share_token: crypto.randomUUID(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // Optimistic update
      setLoans((prev) => [optimisticLoan, ...prev]);

      try {
        const { data, error: insertError } = await supabase
          .from("loans")
          .insert({
            item_name: input.item_name,
            borrower_name: input.borrower_name,
            memo: input.memo || null,
            lent_at: input.lent_at || new Date().toISOString(),
          })
          .select()
          .single();

        if (insertError) throw insertError;

        // Replace optimistic loan with real data
        setLoans((prev) =>
          prev.map((loan) => (loan.id === optimisticLoan.id ? data : loan))
        );
      } catch (err) {
        // Rollback on error
        setLoans((prev) => prev.filter((loan) => loan.id !== optimisticLoan.id));
        throw err;
      }
    },
    [supabase]
  );

  // Optimistic mark as returned
  const markAsReturned = useCallback(
    async (id: string) => {
      if (!supabase) throw new Error("Client not initialized");

      const previousLoans = loans;

      // Optimistic update
      setLoans((prev) =>
        prev.map((loan) =>
          loan.id === id
            ? {
                ...loan,
                status: "returned" as const,
                returned_at: new Date().toISOString(),
              }
            : loan
        )
      );

      try {
        const { error: updateError } = await supabase
          .from("loans")
          .update({
            status: "returned",
            returned_at: new Date().toISOString(),
          })
          .eq("id", id);

        if (updateError) throw updateError;
      } catch (err) {
        // Rollback on error
        setLoans(previousLoans);
        throw err;
      }
    },
    [supabase, loans]
  );

  // Optimistic delete
  const deleteLoan = useCallback(
    async (id: string) => {
      if (!supabase) throw new Error("Client not initialized");

      const previousLoans = loans;

      // Optimistic update
      setLoans((prev) => prev.filter((loan) => loan.id !== id));

      try {
        const { error: deleteError } = await supabase
          .from("loans")
          .delete()
          .eq("id", id);

        if (deleteError) throw deleteError;
      } catch (err) {
        // Rollback on error
        setLoans(previousLoans);
        throw err;
      }
    },
    [supabase, loans]
  );

  return {
    loans,
    activeLoans,
    returnedLoans,
    isLoading,
    error,
    addLoan,
    markAsReturned,
    deleteLoan,
    refresh: fetchLoans,
  };
}
