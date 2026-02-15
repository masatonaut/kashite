import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Lazy initialization to avoid build-time errors
let stripeInstance: Stripe | null = null;

function getStripe(): Stripe {
  if (!stripeInstance) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("Missing STRIPE_SECRET_KEY environment variable");
    }
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-01-28.clover",
    });
  }
  return stripeInstance;
}

// Lazy Supabase admin client to bypass RLS
let adminInstance: SupabaseClient | null = null;

function getSupabaseAdmin(): SupabaseClient {
  if (!adminInstance) {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Missing Supabase environment variables");
    }
    adminInstance = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );
  }
  return adminInstance;
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    console.error("Stripe webhook: Missing signature");
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error("Stripe webhook: Missing STRIPE_WEBHOOK_SECRET");
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(`Stripe webhook signature verification failed: ${message}`);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  console.log(`Stripe webhook received: ${event.type}`);

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(subscription);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Always return 200 to prevent Stripe retries
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook handler error:", error);
    // Return 200 even on error to prevent infinite retries
    return NextResponse.json({ received: true, error: "Handler failed" });
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.user_id;
  const customerId = session.customer as string;
  const subscriptionId = session.subscription as string;

  if (!userId) {
    console.error("Checkout completed: Missing user_id in metadata");
    return;
  }

  console.log(`Checkout completed for user ${userId}`);

  // Get subscription details
  const subscriptionData = await getStripe().subscriptions.retrieve(subscriptionId);
  // In newer Stripe API, current_period_end is on subscription items
  const currentPeriodEnd = subscriptionData.items.data[0]?.current_period_end ?? Math.floor(Date.now() / 1000);

  // Upsert subscription record
  const { error } = await getSupabaseAdmin()
    .from("subscriptions")
    .upsert(
      {
        user_id: userId,
        stripe_customer_id: customerId,
        stripe_subscription_id: subscriptionId,
        plan: "pro",
        status: "active",
        current_period_end: new Date(currentPeriodEnd * 1000).toISOString(),
        updated_at: new Date().toISOString(),
      } as Record<string, unknown>,
      {
        onConflict: "user_id",
      }
    );

  if (error) {
    console.error("Failed to upsert subscription:", error);
    throw error;
  }

  console.log(`Subscription created for user ${userId}`);
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.user_id;
  const subscriptionId = subscription.id;

  if (!userId) {
    // Try to find user by subscription ID
    const { data } = await getSupabaseAdmin()
      .from("subscriptions")
      .select("user_id")
      .eq("stripe_subscription_id", subscriptionId)
      .single();

    if (!data) {
      console.error(
        "Subscription updated: Cannot find user for subscription",
        subscriptionId
      );
      return;
    }
  }

  const status = mapStripeStatus(subscription.status);
  const currentPeriodEnd = subscription.items.data[0]?.current_period_end ?? Math.floor(Date.now() / 1000);

  const { error } = await getSupabaseAdmin()
    .from("subscriptions")
    .update({
      status,
      current_period_end: new Date(currentPeriodEnd * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    } as Record<string, unknown>)
    .eq("stripe_subscription_id", subscriptionId);

  if (error) {
    console.error("Failed to update subscription:", error);
    throw error;
  }

  console.log(`Subscription ${subscriptionId} updated to status: ${status}`);
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const subscriptionId = subscription.id;

  const { error } = await getSupabaseAdmin()
    .from("subscriptions")
    .update({
      status: "canceled",
      updated_at: new Date().toISOString(),
    } as Record<string, unknown>)
    .eq("stripe_subscription_id", subscriptionId);

  if (error) {
    console.error("Failed to cancel subscription:", error);
    throw error;
  }

  console.log(`Subscription ${subscriptionId} canceled`);
}

function mapStripeStatus(
  stripeStatus: Stripe.Subscription.Status
): "active" | "canceled" | "past_due" {
  switch (stripeStatus) {
    case "active":
    case "trialing":
      return "active";
    case "past_due":
    case "unpaid":
      return "past_due";
    case "canceled":
    case "incomplete":
    case "incomplete_expired":
    case "paused":
    default:
      return "canceled";
  }
}
