"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Ambulance, MapPin, ShieldCheck } from "lucide-react";

const STEPS = [
  { label: "Request received", tone: "text-[#151A1E]/50" },
  { label: "Ambulance assigned", tone: "text-[#151A1E]" },
  { label: "Driver en route", tone: "text-[#D8272C]" },
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
    <section className="bg-[#F5F6F4] text-[#151A1E]">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:py-28">
        {/* Left: message */}
        <div className="flex flex-col justify-center">
          <div className="mb-6 flex items-center gap-2 text-sm text-[#151A1E]/60">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D8272C]/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D8272C]" />
            </span>
            Live dispatch across Dhaka
          </div>

          <h1 className="font-[Archivo_Condensed,'Barlow_Condensed',sans-serif] text-[3.25rem] font-bold leading-[0.95] tracking-tight sm:text-[4.25rem]">
            An ambulance,
            <br />
            dispatched in minutes.
          </h1>

          <p className="mt-6 max-w-md text-lg text-[#151A1E]/70">
            Request an ambulance, get matched with the nearest verified driver,
            and track every step to the hospital — all from one call.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button className="h-12 rounded-md bg-[#D8272C] px-6 text-base font-medium hover:bg-[#7A1418]">
              <Ambulance className="mr-2 h-5 w-5" />
              Request an ambulance
            </Button>
            <Button
              variant="outline"
              className="h-12 rounded-md border-[#151A1E]/20 px-6 text-base font-medium hover:bg-[#151A1E]/5"
            >
              Become a driver
            </Button>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-6 border-t border-[#151A1E]/10 pt-6">
            <div>
              <div className="font-[IBM_Plex_Mono,monospace] text-2xl font-semibold">
                8 min
              </div>
              <div className="text-sm text-[#151A1E]/55">
                avg. response time
              </div>
            </div>
            <div>
              <div className="font-[IBM_Plex_Mono,monospace] text-2xl font-semibold">
                500+
              </div>
              <div className="text-sm text-[#151A1E]/55">verified drivers</div>
            </div>
            <div>
              <div className="font-[IBM_Plex_Mono,monospace] text-2xl font-semibold">
                40+
              </div>
              <div className="text-sm text-[#151A1E]/55">partner hospitals</div>
            </div>
          </div>
        </div>

        {/* Right: live dispatch ticket */}
        <div className="flex items-center justify-center lg:justify-end">
          <div className="w-full max-w-sm rounded-lg border border-[#151A1E]/10 bg-white shadow-[0_1px_0_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between border-b border-[#151A1E]/10 px-5 py-4">
              <span className="font-[IBM_Plex_Mono,monospace] text-sm text-[#151A1E]/60">
                CALL #DA-2291
              </span>
              <span className="font-[IBM_Plex_Mono,monospace] text-sm font-medium">
                {mm}:{ss}
              </span>
            </div>

            <div className="space-y-4 px-5 py-5">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#151A1E]/40" />
                <div>
                  <div className="text-sm font-medium">Mirpur-10, Dhaka</div>
                  <div className="text-xs text-[#151A1E]/50">
                    Pickup location
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#151A1E]/40" />
                <div>
                  <div className="text-sm font-medium">
                    Ambulance BA-1187 · ICU
                  </div>
                  <div className="text-xs text-[#151A1E]/50">
                    Driver: Rafiqul Islam
                  </div>
                </div>
              </div>

              <div className="pt-2">
                {STEPS.map((s, i) => (
                  <div
                    key={s.label}
                    className={`flex items-center gap-2 py-1.5 text-sm transition-colors ${
                      i === step ? s.tone : "text-[#151A1E]/30"
                    } ${i === step ? "font-medium" : ""}`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        i === step ? "bg-current" : "bg-[#151A1E]/20"
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
