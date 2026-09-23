// components/faq/FaqHero.tsx
"use client";

import { motion, Variants } from "framer-motion";

const CATEGORIES = [
  { href: "#callers", label: "Callers" },
  { href: "#drivers", label: "Drivers" },
  { href: "#payments", label: "Payments" },
  { href: "#account", label: "Account" },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function FaqHero() {
  return (
    <section className="bg-background py-20">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto flex max-w-2xl flex-col items-center gap-5 px-6 text-center"
      >
        <motion.span
          variants={item}
          className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
        >
          Support
        </motion.span>

        <motion.h1
          variants={item}
          className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl"
        >
          Frequently asked questions
        </motion.h1>

        <motion.p variants={item} className="max-w-md text-muted-foreground">
          Answers for callers, drivers, payments, and account safety. Can't find
          yours? Reach out on the contact page.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-4 flex flex-wrap justify-center gap-2 border-t border-border pt-6"
        >
          {CATEGORIES.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
            >
              {label}
            </a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}