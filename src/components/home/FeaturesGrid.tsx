// components/home/FeaturesGrid.tsx
"use client";

import { motion } from "framer-motion";
import {
  Zap,
  MapPin,
  Wallet,
  ShieldCheck,
  Mail,
  Users,
  Building2,
  Receipt,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const FEATURES = [
  {
    icon: Zap,
    title: "Smart dispatch",
    description:
      "Requests are matched to the nearest available ambulance automatically.",
  },
  {
    icon: MapPin,
    title: "Live location",
    description:
      "Track the ambulance in real time from pickup to hospital arrival.",
  },
  {
    icon: Wallet,
    title: "bKash payment",
    description:
      "Pay the trip fare securely through bKash right after the ride.",
  },
  {
    icon: ShieldCheck,
    title: "Verified drivers",
    description:
      "Every driver is document-checked and approved before going on duty.",
  },
  {
    icon: Building2,
    title: "Hospital matching",
    description: "Choose from nearby partner hospitals based on your location.",
  },
  {
    icon: Receipt,
    title: "Transparent fare",
    description:
      "Fare is calculated from distance and priority — shown before you pay.",
  },
  {
    icon: Mail,
    title: "Instant notifications",
    description:
      "Get emailed the moment your request is assigned or your trip updates.",
  },
  {
    icon: Users,
    title: "Role-based access",
    description:
      "Separate, focused dashboards for callers, drivers, dispatchers, and admins.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function FeaturesGrid() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-xl">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Built for the moments that can't wait
          </h2>
          <p className="mt-3 text-muted-foreground">
            Everything runs on one platform — the request, the ambulance, the
            hospital, and the payment.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <motion.div key={title} variants={item}>
              <Card className="h-full transition-colors hover:border-destructive/40">
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
