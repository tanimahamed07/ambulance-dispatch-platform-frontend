"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  XCircle,
  Ban,
  AlertTriangle,
  Loader2,
  Receipt,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const REDIRECT_SECONDS = 10;

type Tone = {
  icon: typeof CheckCircle2;
  iconColor: string;
  iconBg: string;
  ring: string;
  topBar: string;
};

const TONES: Record<"success" | "failure" | "cancel" | "error", Tone> = {
  success: {
    icon: CheckCircle2,
    iconColor: "text-emerald-600 dark:text-emerald-400",
    iconBg: "bg-emerald-100 dark:bg-emerald-950/50",
    ring: "ring-emerald-200/70 dark:ring-emerald-900/50",
    topBar: "bg-emerald-500",
  },
  failure: {
    icon: XCircle,
    iconColor: "text-red-600 dark:text-red-400",
    iconBg: "bg-red-100 dark:bg-red-950/50",
    ring: "ring-red-200/70 dark:ring-red-900/50",
    topBar: "bg-red-500",
  },
  cancel: {
    icon: Ban,
    iconColor: "text-amber-600 dark:text-amber-400",
    iconBg: "bg-amber-100 dark:bg-amber-950/50",
    ring: "ring-amber-200/70 dark:ring-amber-900/50",
    topBar: "bg-amber-500",
  },
  error: {
    icon: AlertTriangle,
    iconColor: "text-orange-600 dark:text-orange-400",
    iconBg: "bg-orange-100 dark:bg-orange-950/50",
    ring: "ring-orange-200/70 dark:ring-orange-900/50",
    topBar: "bg-orange-500",
  },
};

function PaymentStatusContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [countdown, setCountdown] = useState(REDIRECT_SECONDS);

  const paymentStatus = searchParams.get("payment");
  const tripId = searchParams.get("tripId");

  useEffect(() => {
    if (paymentStatus === "success" && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }

    if (paymentStatus === "success" && countdown === 0) {
      // Redirect to payment history to see the payment details
      router.push("/caller/payment-history");
    }
  }, [countdown, paymentStatus, router]);

  const backButton = (
    <Button className="w-full">
      <Link href="/caller/my-emergencies">Back to my emergencies</Link>
    </Button>
  );

  const supportButton = (
    <Button variant="outline" className="w-full">
      <Link href="/contact">Contact support</Link>
    </Button>
  );

  const getStatusConfig = () => {
    switch (paymentStatus) {
      case "success":
        return {
          tone: TONES.success,
          title: "Payment successful",
          message:
            "Your payment has been processed. A receipt PDF is on its way to your email.",
          action: (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-300">
                <Receipt className="h-4 w-4" aria-hidden="true" />
                Invoice sent to your email
              </div>

              <div className="space-y-2">
                <div
                  className="h-1.5 w-full overflow-hidden rounded-full bg-muted"
                  aria-hidden="true"
                >
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-[width] duration-1000 ease-linear"
                    style={{
                      width: `${(countdown / REDIRECT_SECONDS) * 100}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Redirecting to payment history in {countdown}s
                </p>
              </div>

              <Button className="w-full">
                <Link href="/caller/payment-history">
                  View payment history now
                </Link>
              </Button>
            </div>
          ),
        };

      case "failure":
        return {
          tone: TONES.failure,
          title: "Payment failed",
          message:
            "We couldn't process your payment. This can happen with insufficient balance, a network issue, or a cancelled approval.",
          hint: "Try again, or contact support if it keeps failing.",
          action: (
            <div className="space-y-3">
              {backButton}
              {supportButton}
            </div>
          ),
        };

      case "cancel":
        return {
          tone: TONES.cancel,
          title: "Payment cancelled",
          message:
            "You cancelled the payment. Nothing was deducted from your account.",
          hint: "You can retry whenever you're ready.",
          action: <div className="space-y-3">{backButton}</div>,
        };

      case "error":
      default:
        return {
          tone: TONES.error,
          title: "Something went wrong",
          message:
            "An unexpected error occurred while processing your payment.",
          hint: "Your payment may not have gone through. Contact support if this continues.",
          action: (
            <div className="space-y-3">
              {backButton}
              {supportButton}
            </div>
          ),
        };
    }
  };

  const config = getStatusConfig();
  const { tone } = config;
  const Icon = tone.icon;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="relative overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm">
          <div className={`h-1 w-full ${tone.topBar}`} aria-hidden="true" />

          <div
            className="px-6 pb-8 pt-10 text-center sm:px-8"
            role="status"
            aria-live="polite"
          >
            <div className="mb-6 flex justify-center">
              <div
                className={`flex h-20 w-20 items-center justify-center rounded-full ring-8 ${tone.iconBg} ${tone.ring}`}
              >
                <Icon
                  className={`h-10 w-10 ${tone.iconColor}`}
                  aria-hidden="true"
                />
              </div>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight">
              {config.title}
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
              {config.message}
            </p>

            {config.hint && (
              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-foreground/80">
                {config.hint}
              </p>
            )}

            {tripId && (
              <p className="mt-5 inline-flex items-center rounded-md bg-muted px-2.5 py-1 font-mono text-xs text-muted-foreground">
                Trip ID: {tripId}
              </p>
            )}

            <div className="mt-8">{config.action}</div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/caller"
            className="inline-flex items-center gap-1.5 rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Go to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentStatusPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      }
    >
      <PaymentStatusContent />
    </Suspense>
  );
}
