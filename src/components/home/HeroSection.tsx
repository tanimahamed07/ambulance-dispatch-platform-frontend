"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Ambulance, MapPin, ShieldCheck } from "lucide-react";

const STEPS = [
  { label: "Request received", tone: "text-muted-foreground" },
  { label: "Ambulance assigned", tone: "text-foreground" },
  { label: "Driver en route", tone: "text-destructive" },
] as const;

export default function HeroSection() {
  const [elapsed, setElapsed] = useState(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const tick = setInterval(() => setElapsed((s) => s + 1), 1000);
    const advance = setInterval(
      () => setStep((s) => (s + 1) % STEPS.length),
      3000,
    );
    return () => {
      clearInterval(tick);
      clearInterval(advance);
    };
  }, []);

  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");

  return (
    <section className="bg-background text-foreground">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:py-16">
        {/* Left: Message */}
        <div className="flex flex-col justify-center">
          <div className="mb-4 flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive" />
            </span>
            Live dispatch across Dhaka
          </div>

          <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            An ambulance,
            <br />
            dispatched in minutes.
          </h1>

          <p className="mt-4 max-w-md text-base text-muted-foreground">
            Request an ambulance, get matched with the nearest verified driver,
            and track every step to the hospital — all from one call.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button size="default" variant="destructive" className="gap-2">
              <Ambulance className="h-4 w-4" />
              Request an ambulance
            </Button>
            <Button size="default" variant="outline">
              Become a driver
            </Button>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-6 border-t border-border pt-5">
            <div>
              <div className="font-mono text-xl font-bold">8 min</div>
              <div className="text-xs text-muted-foreground">
                avg. response time
              </div>
            </div>
            <div>
              <div className="font-mono text-xl font-bold">500+</div>
              <div className="text-xs text-muted-foreground">
                verified drivers
              </div>
            </div>
            <div>
              <div className="font-mono text-xl font-bold">40+</div>
              <div className="text-xs text-muted-foreground">
                partner hospitals
              </div>
            </div>
          </div>
        </div>

        {/* Right: Live Dispatch Ticket */}
        <div className="flex items-center justify-center lg:justify-end">
          <div className="w-full max-w-sm rounded-xl border border-border bg-card text-card-foreground shadow-sm">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <span className="font-mono text-xs font-medium text-muted-foreground">
                CALL #DA-2291
              </span>
              <span className="font-mono text-sm font-semibold">
                {mm}:{ss}
              </span>
            </div>

            <div className="space-y-3 px-4 py-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">Mirpur-10, Dhaka</div>
                  <div className="text-xs text-muted-foreground">
                    Pickup location
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">
                    Ambulance BA-1187 · ICU
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Driver: Rafiqul Islam
                  </div>
                </div>
              </div>

              <div className="pt-1 border-t border-border/50">
                {STEPS.map((s, i) => (
                  <div
                    key={s.label}
                    className={`flex items-center gap-2 py-1 text-xs transition-colors ${
                      i === step
                        ? `${s.tone} font-medium`
                        : "text-muted-foreground/40"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        i === step ? "bg-current" : "bg-muted-foreground/30"
                      }`}
                    />
                    {s.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
