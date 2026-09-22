// components/home/BecomeDriver.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  ShieldCheck,
  Ambulance,
  Power,
  Radio,
  MapPinCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const STEPS = [
  {
    icon: FileText,
    title: "Apply",
    description:
      "Submit your license, NID, and vehicle documents through the app.",
  },
  {
    icon: ShieldCheck,
    title: "Get verified",
    description:
      "An admin reviews your documents and approves your application.",
  },
  {
    icon: Ambulance,
    title: "Ambulance assigned",
    description: "The admin assigns you an ambulance from the fleet.",
  },
  {
    icon: Power,
    title: "Go on duty",
    description:
      "Switch your status on. Your live location starts sharing automatically.",
  },
  {
    icon: Radio,
    title: "Accept a dispatch",
    description:
      "Get notified of nearby requests and accept the one assigned to you.",
  },
  {
    icon: MapPinCheck,
    title: "Drop at hospital",
    description:
      "Pick up the patient, choose a partner hospital, and complete the trip.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function BecomeDriver() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Drive with Rescue
              </h2>
              <p className="mt-3 max-w-sm text-muted-foreground">
                Join Dhaka's largest ambulance dispatch network. Get transparent
                payouts, steady trips, and full dispatcher support.
              </p>
            </div>

            <Button
              size="lg"
              variant="destructive"
              className="mt-8 w-fit"
              nativeButton={false}
              render={<Link href="/become-a-driver" />}
            >
              Apply as a driver
            </Button>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeInOut" }}
              style={{ transformOrigin: "top" }}
              className="absolute left-5 top-2 bottom-2 w-px bg-border"
            />

            <div className="space-y-8">
              {STEPS.map(({ icon: Icon, title, description }, i) => (
                <motion.div
                  key={title}
                  variants={item}
                  className="relative flex gap-4"
                >
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background">
                    <Icon className="h-4 w-4 text-destructive" />
                  </div>
                  <div className="pt-1.5">
                    <div className="mb-0.5 flex items-baseline gap-2">
                      <span className="font-mono text-xs text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-base font-semibold text-foreground">
                        {title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
