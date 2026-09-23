// components/faq/FaqHelpCta.tsx
"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { MessageCircleQuestion, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function FaqHelpCta() {
  return (
    <section id="still-need-help" className="bg-background py-16 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center gap-4 rounded-lg border border-destructive/30 bg-destructive/5 px-6 py-10 text-center"
        >
          <motion.div
            variants={item}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10"
          >
            <MessageCircleQuestion className="h-6 w-6 text-destructive" />
          </motion.div>

          <motion.h2
            variants={item}
            className="text-2xl font-bold tracking-tight text-foreground"
          >
            Didn't find your answer?
          </motion.h2>

          <motion.p
            variants={item}
            className="max-w-sm text-sm text-muted-foreground"
          >
            Our support team is reachable directly — reach out through the
            contact page, or call or email us right away.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-2 flex flex-wrap justify-center gap-3"
          >
            <Button
              variant="destructive"
              nativeButton={false}
              render={<Link href="/contact" />}
            >
              Contact us
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              nativeButton={false}
              render={<a href="tel:999" />}
            >
              <Phone className="h-4 w-4" />
              999
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              nativeButton={false}
              render={<a href="mailto:support@rescue.app" />}
            >
              <Mail className="h-4 w-4" />
              Email
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
