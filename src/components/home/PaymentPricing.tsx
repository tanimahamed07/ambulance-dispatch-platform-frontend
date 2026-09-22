// components/home/PaymentPricing.tsx
"use client";

import { useMemo, useState } from "react";
import { motion, Variants } from "framer-motion";
import { Wallet, Send, ExternalLink, CheckCircle2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const EMERGENCY_RATES = [
  { type: "CARDIAC", label: "Cardiac", priority: "CRITICAL", rate: 100 },
  { type: "STROKE", label: "Stroke", priority: "CRITICAL", rate: 100 },
  { type: "ACCIDENT", label: "Accident", priority: "HIGH", rate: 80 },
  { type: "TRAUMA", label: "Trauma", priority: "HIGH", rate: 80 },
  { type: "BREATHING_PROBLEM", label: "Breathing", priority: "HIGH", rate: 80 },
  { type: "PREGNANCY", label: "Pregnancy", priority: "MEDIUM", rate: 60 },
  { type: "OTHER", label: "Other", priority: "MEDIUM", rate: 60 },
] as const;

type EmergencyTypeOption = (typeof EMERGENCY_RATES)[number]["type"];

const BASE_FARE = 200;

const BKASH_STEPS = [
  {
    icon: Wallet,
    title: "Trip completed",
    description: "Fare is calculated from your trip's distance and priority.",
  },
  {
    icon: Send,
    title: "Initiate payment",
    description: "Tap pay and you're redirected to bKash.",
  },
  {
    icon: ExternalLink,
    title: "Confirm in bKash",
    description: "Approve the payment with your PIN in the bKash app.",
  },
  {
    icon: CheckCircle2,
    title: "Payment recorded",
    description: "You're brought back and the receipt is saved to your trip.",
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function PaymentPricing() {
  const [distance, setDistance] = useState<number>(10);
  const [selectedType, setSelectedType] =
    useState<EmergencyTypeOption>("ACCIDENT");

  const selectedEmergency = useMemo(
    () =>
      EMERGENCY_RATES.find((e) => e.type === selectedType) ??
      EMERGENCY_RATES[2],
    [selectedType],
  );

  const safeDistance =
    typeof distance === "number" && !isNaN(distance) ? distance : 10;

  const fare = useMemo(
    () => BASE_FARE + selectedEmergency.rate * safeDistance,
    [selectedEmergency.rate, safeDistance],
  );

  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-xl">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Fare and payment
          </h2>
          <p className="mt-3 text-muted-foreground">
            The fare isn't fixed by ambulance type — it's calculated after your
            trip, based on the distance covered and the emergency condition.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-start"
        >
          {/* Fare calculator (Left Column - Card) */}
          <motion.div variants={item}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Estimate a fare</CardTitle>
                <CardDescription>
                  Base fare of Tk {BASE_FARE} plus a per-km rate determined by
                  the urgency of the emergency type.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <Label htmlFor="distance-slider" className="font-medium">
                      Distance
                    </Label>
                    <span className="font-mono text-muted-foreground">
                      {safeDistance} km
                    </span>
                  </div>
                  <Slider
                    id="distance-slider"
                    min={1}
                    max={100}
                    step={1}
                    value={safeDistance}
                    onValueChange={(value) => {
                      if (typeof value === "number" && !isNaN(value)) {
                        setDistance(value);
                      }
                    }}
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium">Emergency Type</Label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {EMERGENCY_RATES.map((e) => {
                      const isSelected = selectedType === e.type;
                      return (
                        <Button
                          key={e.type}
                          type="button"
                          variant={isSelected ? "destructive" : "outline"}
                          className={`h-auto flex-col items-center justify-center p-2.5 text-center transition-all ${
                            isSelected
                              ? "bg-destructive/10 text-destructive hover:bg-destructive/20 border-destructive"
                              : "hover:border-foreground/30"
                          }`}
                          onClick={() => setSelectedType(e.type)}
                        >
                          <span className="text-xs font-semibold">
                            {e.label}
                          </span>
                          <span className="mt-0.5 text-[10px] opacity-80 font-normal">
                            {e.priority}
                          </span>
                        </Button>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-muted/40 p-4 space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Formula</span>
                    <Badge variant="outline" className="font-mono text-[10px]">
                      {selectedEmergency.priority}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Tk {BASE_FARE} base + Tk {selectedEmergency.rate}/km ×{" "}
                    {safeDistance} km
                  </div>
                  <div className="font-mono text-2xl font-bold text-foreground">
                    ≈ Tk {fare.toLocaleString()}
                  </div>
                </div>

                <p className="text-xs text-muted-foreground">
                  This is an estimate. The exact fare is calculated by the
                  system once your trip's real distance is recorded.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* bKash steps (Right Column - Normal Timeline View without Card Box) */}
          <motion.div variants={item} className="pt-2">
            <div className="mb-6 space-y-1">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#E2136E]/10">
                  <Wallet className="h-4 w-4 text-[#E2136E]" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-foreground">
                  Pay with bKash
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Once the driver marks your trip complete, pay directly from the
                app.
              </p>
            </div>

            <div className="relative space-y-8 pl-1 before:absolute before:left-[19px] before:top-4 before:h-[calc(100%-32px)] before:w-[1px] before:bg-border">
              {BKASH_STEPS.map(({ icon: Icon, title, description }, i) => (
                <div key={title} className="relative flex items-start gap-4">
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background shadow-xs">
                    <Icon className="h-4 w-4 text-destructive" />
                  </div>
                  <div className="pt-0.5">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h4 className="text-sm font-semibold text-foreground">
                        {title}
                      </h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
