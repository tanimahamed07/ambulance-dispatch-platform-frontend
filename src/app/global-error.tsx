"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";
import "./globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error (Root Layout):", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-background text-foreground antialiased">
        <div className="flex min-h-screen items-center justify-center px-4">
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
                Critical Error
              </h1>
              <p className="mx-auto max-w-md text-lg text-muted-foreground">
                A critical error occurred in the application. Please try
                reloading the page.
              </p>

              {/* Error Details (Development Only) */}
              {process.env.NODE_ENV === "development" && (
                <div className="mt-6 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-left">
                  <p className="mb-2 text-sm font-semibold text-destructive">
                    Error Details:
                  </p>
                  <p className="break-all font-mono text-xs text-destructive/90">
                    {error.message || "Unknown critical error"}
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
                Reload Application
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.location.assign("/")}
              >
                Go Home
              </Button>
            </div>

            {/* Help Text */}
            <div className="border-t border-border pt-8">
              <p className="text-sm text-muted-foreground">
                If this problem persists after reloading, please contact
                technical support.
              </p>
              <a
                href="tel:999"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-destructive hover:opacity-90"
              >
                Emergency? Call 999
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
