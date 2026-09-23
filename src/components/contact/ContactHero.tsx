// components/contact/ContactHero.tsx
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
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function ContactHero() {
  return (
    <section className="bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto flex max-w-2xl flex-col items-center text-center"
        >
          <motion.h1
            variants={item}
            className="text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl"
          >
            We're here when it matters.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-4 max-w-md text-base text-muted-foreground"
          >
            For real emergencies, don't wait for a reply — use the app or
            call 999 directly.
          </motion.p>

          <motion.div variants={item} className="mt-6 flex flex-wrap justify-center gap-3">
            <Button
              variant="destructive"
              className="gap-2"
              nativeButton={false}
              render={<Link href="/caller/request-emergency" />}
            >
              <Ambulance className="h-4 w-4" />
              Request an ambulance
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              nativeButton={false}
              render={<a href="tel:999" />}
            >
              <Phone className="h-4 w-4" />
              Call 999
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}