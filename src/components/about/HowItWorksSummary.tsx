// components/about/HowItWorksSummary.tsx
"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
  ArrowRight,
  PhoneCall,
  ClipboardCheck,
  Ambulance,
  MapPinCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const STEPS = [
  { icon: PhoneCall, label: "Request" },
  { icon: ClipboardCheck, label: "Review" },
  { icon: Ambulance, label: "Assign" },
  { icon: MapPinCheck, label: "Track & pay" },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function HowItWorksSummary() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="rounded-lg border border-border bg-card px-6 py-10 sm:px-10"
        >
          <motion.div variants={item} className="max-w-xl">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              How it works
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              One request, four steps to a hospital bed.
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              A request is reviewed and prioritized by a dispatcher, matched to
              the nearest available ambulance, and tracked live until the
              patient reaches the hospital.
            </p>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            {STEPS.map(({ icon: Icon, label }, i) => (
              <div key={label} className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-1.5">
                  <Icon className="h-4 w-4 text-destructive" />
                  <span className="text-sm font-medium text-foreground">
                    {label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-muted-foreground/50" />
                )}
              </div>
            ))}
          </motion.div>

          <motion.div variants={item} className="mt-8">
            <Button
              variant="outline"
              className="gap-2"
              nativeButton={false}
              render={<Link href="/how-it-works" />}
            >
              Learn more
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
