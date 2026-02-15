import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createPortalSession, getSubscription } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const subscription = await getSubscription(user.id);

    if (!subscription?.stripe_customer_id) {
      return NextResponse.json(
        { error: "No subscription found" },
        { status: 404 }
      );
    }

    const returnUrl = `${request.nextUrl.origin}/pricing`;
    const url = await createPortalSession(
      subscription.stripe_customer_id,
      returnUrl
    );

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Portal error:", error);
    return NextResponse.json(
      { error: "Failed to create portal session" },
      { status: 500 }
    );
  }
}
