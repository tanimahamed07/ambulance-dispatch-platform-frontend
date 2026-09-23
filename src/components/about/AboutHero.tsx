// components/about/AboutHero.tsx
"use client";

import { motion, Variants } from "framer-motion";
import { Phone, Ambulance, Headset, Building2 } from "lucide-react";

const ROLES = [
  { icon: Phone, label: "Callers" },
  { icon: Ambulance, label: "Drivers" },
  { icon: Headset, label: "Dispatchers" },
  { icon: Building2, label: "Hospitals" },
];

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const node: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export default function AboutHero() {
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
            className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive" />
            </span>
            One platform. Every connection.
          </motion.div>

          <motion.h1
            variants={item}
            className="text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl"
          >
            Built to make
            <br />
            emergency response faster.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-4 max-w-md text-base text-muted-foreground"
          >
            Rescue connects callers, drivers, dispatchers, and hospitals on
            one platform — because in an emergency, every minute matters.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-5 sm:grid-cols-4"
          >
            {ROLES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: Connection Diagram */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            delay: 0.3,
          }}
          className="flex items-center justify-center lg:justify-end"
        >
          <div className="w-full max-w-sm rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
            <div className="mb-5 flex items-center justify-between border-b border-border pb-3">
              <span className="font-mono text-xs font-medium text-muted-foreground">
                RESCUE NETWORK
              </span>

              <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-destructive" />
                CONNECTED
              </span>
            </div>

            <div className="relative py-4">
              {/* Connecting lines */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: "easeInOut",
                }}
                style={{ transformOrigin: "center" }}
                className="absolute left-8 right-8 top-1/2 h-px bg-border"
              />

              <div className="relative z-10 grid grid-cols-2 gap-8">
                {ROLES.map(({ icon: Icon, label }, index) => (
                  <motion.div
                    key={label}
                    variants={node}
                    initial="hidden"
                    animate="show"
                    transition={{
                      delay: 0.5 + index * 0.1,
                    }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full border ${
                        label === "Drivers"
                          ? "border-destructive/30 bg-destructive text-destructive-foreground shadow-sm"
                          : "border-border bg-background"
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 ${
                          label === "Drivers"
                            ? "text-destructive-foreground"
                            : "text-muted-foreground"
                        }`}
                      />
                    </div>

                    <span
                      className={`text-xs ${
                        label === "Drivers"
                          ? "font-medium text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {label}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Center Rescue node */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.9,
                  ease: "easeOut",
                }}
                className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-sm">
                  <Ambulance className="h-6 w-6" />
                </div>

                <span className="mt-2 rounded bg-card px-2 text-xs font-medium text-foreground">
                  Rescue
                </span>
              </motion.div>
            </div>

            <div className="mt-5 border-t border-border pt-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Emergency coordination
                </span>

                <span className="font-mono text-xs font-medium">
                  ACTIVE
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}