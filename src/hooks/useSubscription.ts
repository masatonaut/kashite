"use client";

import { useEffect, useState, useCallback } from "react";
import { createBrowserClient } from "@supabase/ssr";
import type { Subscription } from "@/types";
import { PLANS } from "@/lib/plans";

interface UseSubscriptionReturn {
  subscription: Subscription | null;
  isPro: boolean;
  isLoading: boolean;
  error: Error | null;
  loanCount: number;
  canAddLoan: boolean;
  loanLimit: number;
  refresh: () => Promise<void>;
}

export function useSubscription(): UseSubscriptionReturn {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loanCount, setLoanCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setSubscription(null);
        setLoanCount(0);
        return;
      }

      // Fetch subscription
      const { data: subData, error: subError } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (subError && subError.code !== "PGRST116") {
        // PGRST116 = no rows returned
        throw subError;
      }

      setSubscription(subData as Subscription | null);

      // Fetch loan count
      const { count, error: countError } = await supabase
        .from("loans")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("status", "active");

      if (countError) {
        throw countError;
      }

      setLoanCount(count ?? 0);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setIsLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const isPro =
    subscription?.plan === "pro" && subscription?.status === "active";
  const loanLimit = isPro ? Infinity : PLANS.FREE.loanLimit;
  const canAddLoan = isPro || loanCount < PLANS.FREE.loanLimit;

  return {
    subscription,
    isPro,
    isLoading,
    error,
    loanCount,
    canAddLoan,
    loanLimit,
    refresh: fetchData,
  };
}
