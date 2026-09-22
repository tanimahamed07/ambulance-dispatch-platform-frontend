// components/home/TripLifecycle.tsx
"use client";

import { motion } from "framer-motion";
import {
  Clock,
  Navigation,
  UserCheck,
  Building2,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const FLOW = [
  { code: "PENDING", icon: Clock, label: "Request received" },
  { code: "EN_ROUTE", icon: Navigation, label: "Ambulance en route" },
  { code: "PICKED_UP", icon: UserCheck, label: "Patient picked up" },
  { code: "AT_HOSPITAL", icon: Building2, label: "Arrived at hospital" },
  { code: "COMPLETED", icon: CheckCircle2, label: "Trip completed" },
] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function TripLifecycle() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 max-w-xl">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Every trip, tracked step by step
          </h2>
          <p className="mt-3 text-muted-foreground">
            The exact status your trip moves through, from the moment it's
            requested to the moment it's done.
          </p>
        </div>

        {/* Main flow */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            style={{ transformOrigin: "left" }}
            className="absolute left-0 right-0 top-6 hidden h-px bg-border sm:block"
          />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-5 sm:gap-4">
            {FLOW.map(({ code, icon: Icon, label }) => (
              <motion.div
                key={code}
                variants={item}
                className="relative flex flex-col gap-3"
              >
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background">
                  <Icon className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <span className="block font-mono text-xs font-medium tracking-wide text-foreground">
                    {code}
                  </span>
                  <span className="mt-0.5 block text-sm text-muted-foreground">
                    {label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Cancelled branch */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="mt-8 flex items-center gap-3 border-t border-dashed border-border pt-6"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background">
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <span className="block font-mono text-xs font-medium tracking-wide text-muted-foreground">
              CANCELLED
            </span>
            <span className="mt-0.5 block text-sm text-muted-foreground">
              Can happen at any point before the trip is completed, by the
              caller or a dispatcher.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
