"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import {
  Ambulance,
  CreditCard,
  HelpCircle,
  Phone,
  UserRound,
} from "lucide-react";

const CATEGORIES = [
  {
    href: "#callers",
    label: "Callers",
    description: "Emergency requests",
    icon: Phone,
  },
  {
    href: "#drivers",
    label: "Drivers",
    description: "Driver applications",
    icon: Ambulance,
  },
  {
    href: "#payments",
    label: "Payments",
    description: "Fare & payments",
    icon: CreditCard,
  },
  {
    href: "#account",
    label: "Account",
    description: "Profile & safety",
    icon: UserRound,
  },
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

export default function FaqHero() {
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
            Help & Knowledge Base
          </motion.div>

          <motion.h1
            variants={item}
            className="text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl"
          >
            Frequently asked
            <br />
            questions.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-4 max-w-md text-base text-muted-foreground"
          >
            Find quick answers about requesting an ambulance, becoming a driver,
            payments, and keeping your account safe.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-5 sm:grid-cols-4"
          >
            {CATEGORIES.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-center gap-2"
              >
                <Icon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />

                <span className="text-xs text-muted-foreground transition-colors group-hover:text-foreground">
                  {label}
                </span>
              </Link>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: FAQ Ticket */}
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
          <div className="w-full max-w-sm rounded-xl border border-border bg-card text-card-foreground shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <span className="font-mono text-xs font-medium text-muted-foreground">
                HELP #FAQ-204
              </span>

              <span className="flex items-center gap-1.5 font-mono text-xs font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-destructive" />
                ONLINE
              </span>
            </div>

            {/* Main */}
            <div className="space-y-4 px-4 py-4">
              <div className="flex items-start gap-3">
                <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />

                <div>
                  <div className="text-sm font-medium">
                    What can we help with?
                  </div>

                  <div className="mt-1 text-xs text-muted-foreground">
                    Browse the most common questions by topic.
                  </div>
                </div>
              </div>

              {/* Topics */}
              <div className="border-t border-border/50 pt-3">
                {CATEGORIES.map(({ href, label, description, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className="group flex items-center gap-3 border-b border-border/50 py-2.5 last:border-b-0"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />

                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-medium">{label}</div>

                      <div className="text-[11px] text-muted-foreground">
                        {description}
                      </div>
                    </div>

                    <span className="font-mono text-[10px] text-muted-foreground/60 transition-colors group-hover:text-foreground">
                      VIEW
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-border px-4 py-3">
              <span className="text-xs text-muted-foreground">
                Can't find your answer?
              </span>

              <Link
                href="/contact"
                className="text-xs font-medium text-foreground underline-offset-4 hover:underline"
              >
                Contact us
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
