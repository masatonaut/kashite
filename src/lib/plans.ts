// Shared plan constants (client + server compatible)

export const PLANS = {
  FREE: {
    name: "Free",
    price: 0,
    loanLimit: 10,
  },
  PRO: {
    name: "Pro",
    monthlyPrice: 300,
    yearlyPrice: 2400,
    loanLimit: Infinity,
  },
} as const;

export type PlanType = "free" | "pro";
