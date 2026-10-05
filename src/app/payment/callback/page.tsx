"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get all query params from bKash callback
    const paymentID = searchParams.get("paymentID");
    const status = searchParams.get("status");
    const signature = searchParams.get("signature");
    const apiVersion = searchParams.get("apiVersion");

    if (!paymentID || !status) {
      // If missing params, redirect to error
      router.push("/caller/payment-status?payment=error");
      return;
    }

    // Handle failure and cancel status directly without calling backend
    if (status === "failure") {
      router.push("/caller/payment-status?payment=failure");
      return;
    }

    if (status === "cancel") {
      router.push("/caller/payment-status?payment=cancel");
      return;
    }

    // Only process success status with backend
    if (status === "success") {
      // Get backend URL - use env variable or extract from API_BASE_URL
      const backendUrl =
        process.env.NEXT_PUBLIC_API_URL ||
        process.env.NEXT_PUBLIC_API_BASE_URL?.replace("/api/v1", "") ||
        "https://ambulance-dispatch-platform.vercel.app";

      // Build backend callback URL with all params
      const backendCallbackUrl = new URL(`${backendUrl}/payment/callback`);
      backendCallbackUrl.searchParams.append("paymentID", paymentID);
      backendCallbackUrl.searchParams.append("status", status);
      if (signature) {
        backendCallbackUrl.searchParams.append("signature", signature);
      }
      if (apiVersion) {
        backendCallbackUrl.searchParams.append("apiVersion", apiVersion);
      }

      // Redirect to backend callback endpoint for success verification
      // Backend will process payment and redirect to final status page
      try {
        window.location.href = backendCallbackUrl.toString();
      } catch (error) {
        // If redirect fails, show error status
        router.push("/caller/payment-status?payment=error");
      }
      return;
    }

    // Unknown status - redirect to error
    router.push("/caller/payment-status?payment=error");
  }, [searchParams, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 px-4">
      <div className="rounded-lg border bg-background p-8 text-center shadow-sm">
        <div className="mb-4 flex justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
        <h2 className="mb-2 text-xl font-semibold">Processing Payment...</h2>
        <p className="text-sm text-muted-foreground">
          Please wait while we verify your payment with bKash.
        </p>
        <p className="mt-4 text-xs text-muted-foreground">
          You will be redirected automatically.
        </p>
      </div>
    </div>
  );
}

export default function PaymentCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      }
    >
      <CallbackContent />
    </Suspense>
  );
}
