// components/home/FinalCta.tsx
"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Ambulance, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function FinalCta() {
  return (
    <section className="bg-destructive py-20 text-destructive-foreground">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center"
      >
        <motion.div
          variants={item}
          className="flex items-center gap-2 text-sm font-medium uppercase tracking-wider opacity-80"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
          </span>
          Live dispatch, 24/7
        </motion.div>

        <motion.h2
          variants={item}
          className="text-4xl font-extrabold tracking-tight sm:text-5xl"
        >
          Every second counts.
        </motion.h2>

        <motion.p variants={item} className="max-w-md text-base opacity-90">
          Don't wait to find help. Request an ambulance now, or call 999
          directly for the fastest response.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-2 flex flex-wrap justify-center gap-3"
        >
          <Button
            size="lg"
            variant="secondary"
            className="gap-2"
            nativeButton={false}
            render={<Link href="/caller/request-emergency" />}
          >
            <Ambulance className="h-4 w-4" />
            Request an ambulance
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="gap-2 border-destructive-foreground/30 bg-transparent text-destructive-foreground hover:bg-destructive-foreground/10"
            nativeButton={false}
            render={<a href="tel:999" />}
          >
            <Phone className="h-4 w-4" />
            Call 999
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
