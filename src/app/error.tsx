"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, RefreshCw, Phone } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error Boundary:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-2xl space-y-8 text-center">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-destructive/20 blur-3xl" />
            <AlertTriangle className="relative h-32 w-32 text-destructive" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight text-foreground">
            Something Went Wrong
          </h1>
          <p className="mx-auto max-w-md text-lg text-muted-foreground">
            We encountered an unexpected error. Please try again, or head back
            home.
          </p>

          {/* Error Details (Development Only) */}
          {process.env.NODE_ENV === "development" && (
            <div className="mt-6 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-left">
              <p className="mb-2 text-sm font-semibold text-destructive">
                Error Details:
              </p>
              <p className="break-all font-mono text-xs text-destructive/90">
                {error.message || "Unknown error"}
              </p>
              {error.digest && (
                <p className="mt-2 text-xs text-muted-foreground">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button onClick={reset} size="lg" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="gap-2"
            nativeButton={false}
            render={<Link href="/" />}
          >
            <Home className="h-4 w-4" />
            Go Home
          </Button>
        </div>

        {/* Help Text */}
        <div className="border-t border-border pt-8">
          <p className="text-sm text-muted-foreground">
            If this problem persists, please contact support or try refreshing
            the page.
          </p>
          <a
            href="tel:999"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-destructive hover:opacity-90"
          >
            <Phone className="h-4 w-4" />
            Emergency? Call 999
          </a>
        </div>
      </div>
    </div>
  );
}
