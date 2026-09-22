// components/home/FirstAidTips.tsx
"use client";

import { motion, Variants } from "framer-motion";
import {
  HeartPulse,
  Droplet,
  Flame,
  Wind,
  Bone,
  Brain,
  Phone,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const TIPS = [
  {
    icon: HeartPulse,
    title: "CPR",
    description:
      "Push hard and fast on the center of the chest, about 100–120 times a minute, until help arrives.",
  },
  {
    icon: Droplet,
    title: "Bleeding",
    description:
      "Apply firm, direct pressure with a clean cloth. Keep pressing — don't lift the cloth to check.",
  },
  {
    icon: Flame,
    title: "Burns",
    description:
      "Cool the burn under running water for 10–20 minutes. Don't apply ice, butter, or ointments.",
  },
  {
    icon: Wind,
    title: "Choking",
    description:
      "Give 5 back blows between the shoulder blades, then 5 abdominal thrusts. Repeat until it clears.",
  },
  {
    icon: Bone,
    title: "Fracture",
    description:
      "Keep the limb still. Don't try to straighten it — support it in the position you found it.",
  },
  {
    icon: Brain,
    title: "Stroke",
    description:
      "Note the time symptoms started. Check face, arms, and speech — then call for help immediately.",
  },
];

const NUMBERS = [
  { label: "National emergency (police, fire, ambulance)", number: "999" },
  { label: "National helpline", number: "333" },
  { label: "Women & child helpline", number: "109" },
  { label: "Child helpline", number: "1098" },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function FirstAidTips() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-xl">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            While you wait for the ambulance
          </h2>
          <p className="mt-3 text-muted-foreground">
            Basic first aid can matter in the minutes before help arrives. This
            isn't a substitute for medical training.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {TIPS.map(({ icon: Icon, title, description }) => (
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

        {/* Emergency numbers — deliberately separated, not decorative */}
        {/* Emergency numbers — deliberately separated, not decorative */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mt-10 rounded-lg border border-destructive/30 bg-destructive/5 p-6"
        >
          <div className="mb-6 flex items-center gap-2">
            <Phone className="h-4 w-4 text-destructive" />
            <h3 className="text-sm font-semibold text-foreground">
              Emergency numbers (Bangladesh)
            </h3>
          </div>
          <div className="grid grid-cols-2 divide-y divide-destructive/15 sm:grid-cols-4 sm:divide-x sm:divide-y-0">
            {NUMBERS.map(({ label, number }) => (
              <div
                key={number}
                className="flex flex-col items-center gap-1 px-4 py-4 text-center first:pl-0 sm:py-0"
              >
                <div className="font-mono text-2xl font-bold tabular-nums text-destructive">
                  {number}
                </div>
                <div className="max-w-[10rem] text-xs leading-snug text-muted-foreground">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
