// components/about/WhatMakesItDifferent.tsx
"use client";

import { motion, Variants } from "framer-motion";
import { MapPin, ListOrdered, Receipt, ShieldCheck } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const POINTS = [
  {
    icon: MapPin,
    title: "Live tracking",
    description:
      "Follow the ambulance in real time from pickup to hospital arrival, no guessing where help is.",
  },
  {
    icon: ListOrdered,
    title: "Priority-based dispatch",
    description:
      "Requests are reviewed and ranked by emergency type, so the most critical cases are matched first.",
  },
  {
    icon: Receipt,
    title: "Transparent fare",
    description:
      "Fare is calculated from distance and priority, shown clearly before you pay — no negotiating.",
  },
  {
    icon: ShieldCheck,
    title: "Verified drivers",
    description:
      "Every driver's documents are reviewed and approved before they're allowed to go on duty.",
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function WhatMakesItDifferent() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-xl">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            What makes it different
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Not just an ambulance app
          </h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {POINTS.map(({ icon: Icon, title, description }) => (
            <motion.div key={title} variants={item}>
              <Card className="h-full">
                <CardHeader>
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-destructive/10">
                    <Icon className="h-5 w-5 text-destructive" />
                  </div>
                  <CardTitle className="text-base">{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
