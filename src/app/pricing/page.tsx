import Link from "next/link";
import { Check, X } from "lucide-react";
import { JA } from "@/constants/ja";
import { createClient } from "@/lib/supabase/server";
import { getSubscription, isPro } from "@/lib/stripe";
import { PricingActions } from "./PricingActions";

export const metadata = {
  title: "料金プラン | KASHITE",
  description: "KASHITEの料金プラン。無料プランとProプランをご用意。",
};

const features = {
  free: [
    { text: JA.PRICING_FEATURE_LOANS_10, included: true },
    { text: JA.PRICING_FEATURE_BASIC, included: true },
    { text: JA.PRICING_FEATURE_SHARE, included: true },
    { text: JA.PRICING_FEATURE_UNLIMITED, included: false },
    { text: JA.PRICING_FEATURE_PRIORITY_SUPPORT, included: false },
  ],
  pro: [
    { text: JA.PRICING_FEATURE_UNLIMITED, included: true },
    { text: JA.PRICING_FEATURE_BASIC, included: true },
    { text: JA.PRICING_FEATURE_SHARE, included: true },
    { text: JA.PRICING_FEATURE_PRIORITY_SUPPORT, included: true },
    { text: JA.PRICING_FEATURE_EARLY_ACCESS, included: true },
  ],
};

const faqs = [
  {
    q: JA.FAQ_CANCEL_Q,
    a: JA.FAQ_CANCEL_A,
  },
  {
    q: JA.FAQ_PAYMENT_Q,
    a: JA.FAQ_PAYMENT_A,
  },
  {
    q: JA.FAQ_DOWNGRADE_Q,
    a: JA.FAQ_DOWNGRADE_A,
  },
  {
    q: JA.FAQ_REFUND_Q,
    a: JA.FAQ_REFUND_A,
  },
];

export default async function PricingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let userIsPro = false;
  let customerId: string | null = null;

  if (user) {
    const subscription = await getSubscription(user.id);
    userIsPro = isPro(subscription);
    customerId = subscription?.stripe_customer_id ?? null;
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Header */}
      <header className="border-b border-[var(--border)] bg-[var(--bg-primary)]">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-5">
          <Link
            href="/"
            className="font-heading text-xl font-bold tracking-tight text-[var(--text-primary)]"
          >
            KASHITE
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-12">
        {/* Title */}
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-[var(--text-primary)]">
            {JA.PRICING_TITLE}
          </h1>
          <p className="mt-3 text-[var(--text-secondary)]">
            {JA.PRICING_SUBTITLE}
          </p>
        </div>

        {/* Plans */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {/* Free Plan */}
          <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-primary)] p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="font-heading text-xl font-bold text-[var(--text-primary)]">
                {JA.PRICING_FREE_NAME}
              </h2>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                {JA.PRICING_FREE_DESC}
              </p>
            </div>

            <div className="mb-6">
              <span className="font-heading text-4xl font-bold text-[var(--text-primary)]">
                ¥0
              </span>
              <span className="text-[var(--text-secondary)]">{JA.PRICING_FOREVER}</span>
            </div>

            <ul className="mb-6 space-y-3">
              {features.free.map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  {feature.included ? (
                    <Check
                      size={18}
                      className="text-[var(--success)]"
                      strokeWidth={1.5}
                    />
                  ) : (
                    <X
                      size={18}
                      className="text-[var(--text-tertiary)]"
                      strokeWidth={1.5}
                    />
                  )}
                  <span
                    className={
                      feature.included
                        ? "text-[var(--text-primary)]"
                        : "text-[var(--text-tertiary)]"
                    }
                  >
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>

            <button
              disabled
              className="w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3 font-medium text-[var(--text-secondary)]"
            >
              {userIsPro ? JA.PRICING_FREE_BUTTON : JA.PRICING_CURRENT_PLAN}
            </button>
          </div>

          {/* Pro Plan */}
          <div className="relative rounded-[var(--radius-lg)] border-2 border-[var(--accent)] bg-[var(--bg-primary)] p-6 shadow-md">
            {/* Badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-medium text-white">
              {JA.PRICING_RECOMMENDED}
            </div>

            <div className="mb-6">
              <h2 className="font-heading text-xl font-bold text-[var(--text-primary)]">
                {JA.PRICING_PRO_NAME}
              </h2>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                {JA.PRICING_PRO_DESC}
              </p>
            </div>

            <div className="mb-6">
              <span className="font-heading text-4xl font-bold text-[var(--text-primary)]">
                ¥300
              </span>
              <span className="text-[var(--text-secondary)]">{JA.PRICING_PER_MONTH}</span>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                {JA.PRICING_YEARLY_OPTION}
              </p>
            </div>

            <ul className="mb-6 space-y-3">
              {features.pro.map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Check
                    size={18}
                    className="text-[var(--success)]"
                    strokeWidth={1.5}
                  />
                  <span className="text-[var(--text-primary)]">{feature.text}</span>
                </li>
              ))}
            </ul>

            <PricingActions isPro={userIsPro} hasCustomerId={!!customerId} isLoggedIn={!!user} />
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="text-center font-heading text-2xl font-bold text-[var(--text-primary)]">
            {JA.PRICING_FAQ_TITLE}
          </h2>

          <div className="mt-8 space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-[var(--radius-md)] bg-[var(--bg-secondary)] p-5">
                <h3 className="font-medium text-[var(--text-primary)]">{faq.q}</h3>
                <p className="mt-2 text-[var(--text-secondary)]">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 border-t border-[var(--border)] pt-8 text-center text-sm text-[var(--text-tertiary)]">
          <div className="flex justify-center gap-6">
            <Link href="/terms" className="hover:text-[var(--text-secondary)]">
              {JA.TERMS}
            </Link>
            <Link href="/privacy" className="hover:text-[var(--text-secondary)]">
              {JA.PRIVACY}
            </Link>
            <Link href="/tokushoho" className="hover:text-[var(--text-secondary)]">
              {JA.TOKUSHOHO}
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
