export interface Loan {
  id: string;
  user_id: string;
  item_name: string;
  borrower_name: string;
  memo: string | null;
  lent_at: string;
  returned_at: string | null;
  status: "active" | "returned";
  share_token: string;
  created_at: string;
  updated_at: string;
}

export interface LoanInsert {
  item_name: string;
  borrower_name: string;
  memo?: string | null;
  lent_at?: string;
}

export interface LoanUpdate {
  item_name?: string;
  borrower_name?: string;
  memo?: string | null;
  lent_at?: string;
  returned_at?: string | null;
  status?: "active" | "returned";
}

export interface ShareableLoan {
  item_name: string;
  borrower_name: string;
  lent_at: string;
}

export interface User {
  id: string;
  email?: string;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  stripe_customer_id: string;
  stripe_subscription_id: string;
  status: "active" | "canceled" | "past_due";
  plan: "free" | "pro";
  current_period_end: string;
  created_at: string;
  updated_at: string;
}

export type LoanStatus = "active" | "returned";
export type SubscriptionPlan = "free" | "pro";
export type SubscriptionStatus = "active" | "canceled" | "past_due";
