// components/home/HeroSection.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Ambulance, MapPin, ShieldCheck } from "lucide-react";

const STEPS = [
  { label: "Request received", tone: "text-muted-foreground" },
  { label: "Ambulance assigned", tone: "text-foreground" },
  { label: "Driver en route", tone: "text-destructive" },
] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

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
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col justify-center"
        >
          <motion.div
            variants={item}
            className="mb-4 flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive" />
            </span>
            Live dispatch across Dhaka
          </motion.div>

          <motion.h1
            variants={item}
            className="text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl"
          >
            An ambulance,
            <br />
            dispatched in minutes.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-4 max-w-md text-base text-muted-foreground"
          >
            Request an ambulance, get matched with the nearest verified driver,
            and track every step to the hospital — all from one call.
          </motion.p>

          <motion.div variants={item} className="mt-6 flex flex-wrap gap-3">
            <Button
              size="default"
              variant="destructive"
              className="gap-2"
              nativeButton={false}
              render={<Link href="/caller/request-emergency" />}
            >
              <Ambulance className="h-4 w-4" />
              Request an ambulance
            </Button>
            <Button
              size="default"
              variant="outline"
              nativeButton={false}
              render={<Link href="/become-a-driver" />}
            >
              Become a driver
            </Button>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-8 grid grid-cols-3 gap-6 border-t border-border pt-5"
          >
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
          </motion.div>
        </motion.div>

        {/* Right: Live Dispatch Ticket */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="flex items-center justify-center lg:justify-end"
        >
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
        </motion.div>
      </div>
    </section>
  );
}
