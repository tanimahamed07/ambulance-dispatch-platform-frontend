"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, XCircle, Ban, AlertCircle, Loader2, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";

function PaymentStatusContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  const paymentStatus = searchParams.get("payment");
  const tripId = searchParams.get("tripId");

  useEffect(() => {
    if (paymentStatus === "success" && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }

    if (paymentStatus === "success" && countdown === 0 && tripId) {
      router.push(`/caller/my-emergencies/${tripId}`);
    }
  }, [countdown, paymentStatus, tripId, router]);

  const getStatusConfig = () => {
    switch (paymentStatus) {
      case "success":
        return {
          icon: CheckCircle,
          iconColor: "text-green-600",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          title: "Payment Successful! 🎉",
          message:
            "Your payment has been processed successfully. An invoice has been sent to your email address.",
          description: "Check your email inbox for the payment receipt PDF.",
          action: tripId ? (
            <div className="space-y-3">
              <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                <div className="flex items-center gap-2 text-sm text-green-800">
                  <Receipt className="h-4 w-4" />
                  <span className="font-medium">
                    Invoice sent to your email
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Redirecting to trip details in {countdown} seconds...
              </p>
              <Link href={`/caller/my-emergencies/${tripId}`}>
                <Button className="w-full">View Trip Details Now</Button>
              </Link>
            </div>
          ) : (
            <Link href="/caller/my-emergencies">
              <Button className="w-full">View My Emergencies</Button>
            </Link>
          ),
        };

      case "failure":
        return {
          icon: XCircle,
          iconColor: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          title: "Payment Failed",
          message:
            "Your payment could not be processed. This might be due to insufficient balance, network issues, or payment cancellation.",
          description: "Please try again or contact bKash support if the issue persists.",
          action: (
            <div className="space-y-3">
              <Link href="/caller/my-emergencies">
                <Button className="w-full">Back to My Emergencies</Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
              </Link>
            </div>
          ),
        };

      case "cancel":
        return {
          icon: Ban,
          iconColor: "text-orange-600",
          bgColor: "bg-orange-50",
          borderColor: "border-orange-200",
          title: "Payment Cancelled",
          message:
            "You have cancelled the payment process. No amount has been deducted from your account.",
          description: "You can retry the payment whenever you're ready.",
          action: (
            <div className="space-y-3">
              <Link href="/caller/my-emergencies">
                <Button className="w-full">Back to My Emergencies</Button>
              </Link>
            </div>
          ),
        };

      case "error":
      default:
        return {
          icon: AlertCircle,
          iconColor: "text-yellow-600",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          title: "Something Went Wrong",
          message:
            "An unexpected error occurred during payment processing. Please contact support if this continues.",
          description: "Your payment may not have been processed.",
          action: (
            <div className="space-y-3">
              <Link href="/caller/my-emergencies">
                <Button className="w-full">Back to My Emergencies</Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
              </Link>
            </div>
          ),
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div
          className={`rounded-lg border ${config.borderColor} p-8 text-center shadow-sm`}
        >
          <div className="mb-6 flex justify-center">
            <div
              className={`flex h-20 w-20 items-center justify-center rounded-full ${config.bgColor}`}
            >
              <Icon className={`h-12 w-12 ${config.iconColor}`} />
            </div>
          </div>

          <h1 className="mb-3 text-2xl font-semibold tracking-tight">
            {config.title}
          </h1>

          <p className="mb-2 text-sm leading-6 text-foreground">
            {config.message}
          </p>

          <p className="mb-6 text-xs text-muted-foreground">
            {config.description}
          </p>

          {config.action}
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/caller"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Go to Dashboard
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
