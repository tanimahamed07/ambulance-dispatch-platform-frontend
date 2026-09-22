"use client";

import { motion, Variants } from "framer-motion";
import {
  PhoneCall,
  ClipboardCheck,
  Ambulance,
  MapPinCheck,
} from "lucide-react";

const STEPS = [
  {
    icon: PhoneCall,
    title: "Request",
    description:
      "Share the patient's location, phone number, and the type of ambulance needed.",
  },
  {
    icon: ClipboardCheck,
    title: "Dispatcher review",
    description:
      "A dispatcher checks the details and sets the priority based on the emergency type.",
  },
  {
    icon: Ambulance,
    title: "Assign",
    description:
      "The nearest available ambulance and driver are assigned to your request.",
  },
  {
    icon: MapPinCheck,
    title: "Track & pay",
    description:
      "Follow the ambulance live to the hospital, then pay the fare through bKash.",
  },
];

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function HowItWorks() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 max-w-xl">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            From call to hospital, in four steps
          </h2>
          <p className="mt-3 text-muted-foreground">
            No waiting on hold, no guessing where help is. Every request moves
            through the same clear path.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="relative grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
        >
          {/* connecting line — desktop only */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ transformOrigin: "left" }}
            className="absolute left-0 right-0 top-6 hidden h-px bg-border lg:block"
          />

          {STEPS.map(({ icon: Icon, title, description }, i) => (
            <motion.div key={title} variants={item} className="relative">
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background">
                <Icon className="h-5 w-5 text-destructive" />
              </div>

              <div className="mt-4">
                <div className="mb-1 flex items-baseline gap-2">
                  <span className="font-mono text-sm text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground">
                    {title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
