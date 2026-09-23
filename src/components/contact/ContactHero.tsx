"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
  Ambulance,
  Clock3,
  Mail,
  MessageCircleQuestion,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CONTACT_OPTIONS = [
  {
    icon: Phone,
    label: "Emergency",
    description: "Call 999",
    href: "tel:999",
  },
  {
    icon: Mail,
    label: "Support",
    description: "Email our team",
    href: "mailto:support@rescue.com",
  },
  {
    icon: Clock3,
    label: "Availability",
    description: "24/7 support",
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

export default function ContactHero() {
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
          {/* Status */}
          <motion.div
            variants={item}
            className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive" />
            </span>
            Emergency support, 24/7
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={item}
            className="text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl"
          >
            We&apos;re here when
            <br />
            it matters.
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={item}
            className="mt-4 max-w-md text-base text-muted-foreground"
          >
            Have a question or need assistance? Reach out to our support team.
            For real emergencies, request an ambulance or call 999 directly.
          </motion.p>

          {/* Actions */}
          <motion.div variants={item} className="mt-6 flex flex-wrap gap-3">
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

          {/* Contact options */}
          <motion.div
            variants={item}
            className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-5"
          >
            {CONTACT_OPTIONS.map(({ icon: Icon, label, description, href }) => {
              const content = (
                <>
                  <Icon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />

                  <div className="min-w-0">
                    <div className="text-xs font-medium">{label}</div>
                    <div className="mt-0.5 text-[11px] text-muted-foreground">
                      {description}
                    </div>
                  </div>
                </>
              );

              if (href) {
                return (
                  <Link
                    key={label}
                    href={href}
                    className="group flex items-start gap-2"
                  >
                    {content}
                  </Link>
                );
              }

              return (
                <div key={label} className="flex items-start gap-2">
                  {content}
                </div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Right: Support Ticket */}
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
                SUPPORT #CNT-204
              </span>

              <span className="flex items-center gap-1.5 font-mono text-xs font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-destructive" />
                ONLINE
              </span>
            </div>

            {/* Main */}
            <div className="space-y-4 px-4 py-4">
              <div className="flex items-start gap-3">
                <MessageCircleQuestion className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />

                <div>
                  <div className="text-sm font-medium">How can we help?</div>

                  <div className="mt-1 text-xs text-muted-foreground">
                    Our support team is available whenever you need assistance.
                  </div>
                </div>
              </div>

              {/* Contact channels */}
              <div className="border-t border-border/50 pt-3">
                {CONTACT_OPTIONS.map(
                  ({ icon: Icon, label, description, href }) => {
                    const content = (
                      <>
                        <Icon className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />

                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-medium">{label}</div>

                          <div className="text-[11px] text-muted-foreground">
                            {description}
                          </div>
                        </div>

                        {href && (
                          <span className="font-mono text-[10px] text-muted-foreground/60 transition-colors group-hover:text-foreground">
                            OPEN
                          </span>
                        )}
                      </>
                    );

                    if (href) {
                      return (
                        <Link
                          key={label}
                          href={href}
                          className="group flex items-center gap-3 border-b border-border/50 py-2.5 last:border-b-0"
                        >
                          {content}
                        </Link>
                      );
                    }

                    return (
                      <div
                        key={label}
                        className="flex items-center gap-3 border-b border-border/50 py-2.5 last:border-b-0"
                      >
                        {content}
                      </div>
                    );
                  },
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-border px-4 py-3">
              <span className="text-xs text-muted-foreground">
                Emergency response
              </span>

              <span className="font-mono text-xs font-medium">24 / 7</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
