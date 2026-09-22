"use client";

import { motion, Variants } from "framer-motion";
import { ShieldCheck, Lock, Headset } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const POINTS = [
  {
    icon: ShieldCheck,
    title: "Verified drivers",
    description:
      "Every driver's license, NID, and vehicle documents are checked and approved by an admin before they can go on duty.",
    items: [
      "Document review before approval",
      "Ambulance assigned only after verification",
      "Driver status visible on every trip",
    ],
  },
  {
    icon: Lock,
    title: "Data privacy",
    description:
      "Your location and personal details are only shared with the driver and dispatcher handling your request — never anyone else.",
    items: [
      "Location shared only during an active trip",
      "Secure, authenticated access to your data",
      "No data sold or shared with third parties",
    ],
  },
  {
    icon: Headset,
    title: "24/7 dispatcher",
    description:
      "A dispatcher reviews and prioritizes every request as it comes in, day or night, so nothing waits unattended.",
    items: [
      "Requests prioritized by emergency type",
      "Continuous monitoring, no off-hours",
      "Escalation if a request goes unassigned",
    ],
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function SafetyTrust() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-xl">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Built on trust, not just speed
          </h2>
          <p className="mt-3 text-muted-foreground">
            An emergency is not the moment to worry about who's driving or where
            your data goes.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-6 lg:grid-cols-3"
        >
          {POINTS.map(({ icon: Icon, title, description, items }) => (
            <motion.div key={title} variants={item}>
              <Card className="h-full">
                <CardHeader>
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-destructive/10">
                    <Icon className="h-5 w-5 text-destructive" />
                  </div>
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    {items.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
