import Link from "next/link";
import { Suspense } from "react";
import {
  Ambulance,
  ArrowLeft,
  Clock3,
  KeyRound,
  MailCheck,
  ShieldCheck,
} from "lucide-react";
import ForgotPasswordForm from "@/components/form/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-muted/30">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid w-full overflow-hidden rounded-2xl border border-border bg-background shadow-sm lg:grid-cols-2">
          {/* Left Side */}
          <div className="relative hidden overflow-hidden bg-muted/50 p-10 lg:flex lg:flex-col lg:justify-between">
            {/* Decorative background */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-destructive/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-destructive/5 blur-3xl" />

            <div className="relative z-10">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-lg font-bold tracking-tight"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-destructive text-destructive-foreground">
                  <Ambulance className="h-5 w-5" />
                </span>
                <span>Rescue</span>
              </Link>

              <div className="mt-16 max-w-md">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-destructive">
                  Account Recovery
                </p>
                <h2 className="text-3xl font-semibold tracking-tight">
                  Forgot your password? We’ve got you covered.
                </h2>
                <p className="mt-4 leading-7 text-muted-foreground">
                  Enter your registered email address below. We’ll send a
                  6-digit reset code (valid for 5 minutes) to verify your
                  identity.
                </p>
              </div>
            </div>

            <div className="relative z-10 mt-10 grid gap-4">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background">
                  <MailCheck className="h-4 w-4 text-destructive" />
                </div>
                <div>
                  <p className="text-sm font-medium">Send OTP Code</p>
                  <p className="text-sm text-muted-foreground">
                    A 6-digit OTP will be sent directly to your email.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background">
                  <Clock3 className="h-4 w-4 text-destructive" />
                </div>
                <div>
                  <p className="text-sm font-medium">5 Minutes Expiration</p>
                  <p className="text-sm text-muted-foreground">
                    The reset code is stored securely in Redis for 5 minutes.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background">
                  <ShieldCheck className="h-4 w-4 text-destructive" />
                </div>
                <div>
                  <p className="text-sm font-medium">Secure Password Reset</p>
                  <p className="text-sm text-muted-foreground">
                    Verify code and update your password safely.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center justify-center p-5 sm:p-8 lg:p-10">
            <div className="w-full max-w-md">
              {/* Mobile Brand */}
              <div className="mb-8 flex flex-col items-center text-center lg:hidden">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-xl font-bold tracking-tight"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive text-destructive-foreground">
                    <Ambulance className="h-5 w-5" />
                  </span>
                  <span>Rescue</span>
                </Link>
              </div>

              <div className="mb-8 text-center lg:text-left">
                <div className="mb-5 flex justify-center lg:justify-start">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
                    <KeyRound className="h-7 w-7 text-destructive" />
                  </div>
                </div>
                <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  Forgot password?
                </h1>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Enter your registered email address to receive a 6-digit code.
                </p>
              </div>

              <ForgotPasswordForm />

              <div className="mt-6 flex justify-center">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to log in
                </Link>
              </div>

              <p className="mt-8 text-center text-xs leading-5 text-muted-foreground">
                An OTP code will be sent to your email after submitting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
