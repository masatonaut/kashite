import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";
import type { Subscription } from "@/types";
import { PLANS } from "@/lib/plans";

export { PLANS };

// Lazy initialization to avoid build-time errors
let stripeInstance: Stripe | null = null;

function getStripe(): Stripe {
  if (!stripeInstance) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("Missing STRIPE_SECRET_KEY environment variable");
    }
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-01-28.clover",
      typescript: true,
    });
  }
  return stripeInstance;
}

export const stripe = new Proxy({} as Stripe, {
  get(_, prop) {
    return getStripe()[prop as keyof Stripe];
  },
});

export async function createCheckoutSession(
  userId: string,
  priceType: "monthly" | "yearly",
  returnUrl: string
): Promise<string> {
  const supabase = await createClient();

  // Get or create Stripe customer
  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("user_id", userId)
    .single();

  let customerId = subscription?.stripe_customer_id;

  if (!customerId) {
    // Get user email for customer creation
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const customer = await stripe.customers.create({
      email: user?.email || undefined,
      metadata: {
        user_id: userId,
      },
    });
    customerId = customer.id;
  }

  const priceId =
    priceType === "monthly"
      ? process.env.STRIPE_PRO_MONTHLY_PRICE_ID
      : process.env.STRIPE_PRO_YEARLY_PRICE_ID;

  if (!priceId) {
    throw new Error(`Missing Stripe price ID for ${priceType} plan`);
  }

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${returnUrl}?success=true`,
    cancel_url: `${returnUrl}?canceled=true`,
    metadata: {
      user_id: userId,
    },
    subscription_data: {
      metadata: {
        user_id: userId,
      },
    },
  });

  if (!session.url) {
    throw new Error("Failed to create checkout session");
  }

  return session.url;
}

export async function createPortalSession(
  customerId: string,
  returnUrl: string
): Promise<string> {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });

  return session.url;
}

export async function getSubscription(
  userId: string
): Promise<Subscription | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error || !data) {
    return null;
  }

  return data as Subscription;
}

export function isPro(subscription: Subscription | null): boolean {
  if (!subscription) return false;
  return subscription.plan === "pro" && subscription.status === "active";
}

export async function canAddLoan(userId: string): Promise<boolean> {
  const supabase = await createClient();

  // Get subscription
  const subscription = await getSubscription(userId);

  // Pro users have no limit
  if (isPro(subscription)) {
    return true;
  }

  // Count active loans for free users
  const { count, error } = await supabase
    .from("loans")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("status", "active");

  if (error) {
    throw new Error("Failed to check loan count");
  }

  return (count ?? 0) < PLANS.FREE.loanLimit;
}

export async function getLoanCount(userId: string): Promise<number> {
  const supabase = await createClient();

  const { count, error } = await supabase
    .from("loans")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("status", "active");

  if (error) {
    throw new Error("Failed to get loan count");
  }

  return count ?? 0;
}
