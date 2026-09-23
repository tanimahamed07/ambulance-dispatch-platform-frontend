// components/about/TheProblem.tsx
"use client";

import { motion, Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function TheProblem() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-8 lg:grid-cols-[0.6fr_1fr] lg:gap-16"
        >
          <motion.div variants={item}>
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              The problem
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Finding help shouldn't take longer than the emergency itself.
            </h2>
          </motion.div>

          <motion.div
            variants={item}
            className="space-y-4 text-muted-foreground"
          >
            <p>
              When someone is in medical distress, the people around them are
              often left calling around — hospital to hospital, contact to
              contact — just to find out which ambulance is free and how far
              away it is. There's no shared view of what's available nearby, so
              the search itself eats into the time that matters most.
            </p>
            <p>
              Every minute spent figuring out who to call, whether an ambulance
              is equipped for the situation, and where to take the patient is a
              minute not spent getting them care. That gap — not a lack of
              ambulances, but a lack of coordination between callers, drivers,
              and hospitals — is what Rescue is built to close.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
