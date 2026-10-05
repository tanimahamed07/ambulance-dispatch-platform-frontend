import Link from "next/link";
import { Suspense } from "react";
import { Ambulance, ShieldCheck, Clock3, HeartPulse } from "lucide-react";

import RegisterForm from "@/components/form/register-form";
import { Spinner } from "@/components/ui/spinner";

export default function RegisterPage() {
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
                  Emergency Assistance
                </p>

                <h2 className="text-3xl font-semibold tracking-tight">
                  Get help when every second matters.
                </h2>

                <p className="mt-4 leading-7 text-muted-foreground">
                  Create your Rescue account to quickly request emergency
                  ambulance services and manage your emergency assistance
                  requests.
                </p>
              </div>
            </div>

            <div className="relative z-10 mt-10 grid gap-4">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background">
                  <Clock3 className="h-4 w-4 text-destructive" />
                </div>

                <div>
                  <p className="text-sm font-medium">Fast Response</p>
                  <p className="text-sm text-muted-foreground">
                    Connect with available ambulance services quickly.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background">
                  <ShieldCheck className="h-4 w-4 text-destructive" />
                </div>

                <div>
                  <p className="text-sm font-medium">Secure & Reliable</p>
                  <p className="text-sm text-muted-foreground">
                    Your account information is kept secure.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background">
                  <HeartPulse className="h-4 w-4 text-destructive" />
                </div>

                <div>
                  <p className="text-sm font-medium">Emergency Ready</p>
                  <p className="text-sm text-muted-foreground">
                    Request assistance whenever you need it.
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
                <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  Create your account
                </h1>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Join Rescue and get access to emergency ambulance services.
                </p>
              </div>

              <Suspense
                fallback={
                  <div className="flex items-center justify-center py-8">
                    <Spinner />
                  </div>
                }
              >
                <RegisterForm />
              </Suspense>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-foreground underline-offset-4 hover:underline"
                >
                  Log in
                </Link>
              </p>

              <p className="mt-6 text-center text-xs leading-5 text-muted-foreground">
                By creating an account, you agree to our terms and privacy
                policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
