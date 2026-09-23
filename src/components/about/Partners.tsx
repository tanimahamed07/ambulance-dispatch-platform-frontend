// components/about/Partners.tsx
"use client";

import { motion, Variants } from "framer-motion";
import { Building2 } from "lucide-react";

const PARTNERS = [
  "City General Hospital",
  "Dhaka Medical Partners",
  "Green Valley Medical Center",
  "Unity Health Network",
  "Riverside Diagnostic & Care",
  "National Trauma Institute",
  "Sunrise Community Hospital",
  "Metro Health Alliance",
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function Partners() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-xl">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Partners
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Trusted by hospitals and organizations across Dhaka
          </h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        >
          {PARTNERS.map((name) => (
            <motion.div key={name} variants={item}>
              <div className="flex h-24 flex-col items-center justify-center gap-2 rounded-lg border border-border bg-card px-3 text-center grayscale transition-all hover:grayscale-0">
                <Building2 className="h-5 w-5 text-muted-foreground" />
                <span className="text-xs font-medium leading-tight text-foreground/70">
                  {name}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Sample partners shown for illustration.
        </p>
      </div>
    </section>
  );
}
