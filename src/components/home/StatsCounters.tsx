"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, motion } from "framer-motion";
import { ShieldCheck, MapPin, HeartPulse, CheckCircle2 } from "lucide-react";

interface Stat {
  icon: React.ElementType;
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
}

const STATS: Stat[] = [
  {
    icon: ShieldCheck,
    value: 99,
    suffix: "%",
    label: "successful dispatches",
  },
  {
    icon: MapPin,
    value: 64,
    suffix: "", // Districts তুলে শুধু 64 রাখা হয়েছে
    label: "districts covered", // Label এ 'districts covered' দেওয়া হলো
  },
  {
    icon: HeartPulse,
    value: 24,
    suffix: "/7",
    label: "emergency support",
  },
  {
    icon: CheckCircle2,
    value: 12000,
    suffix: "+",
    label: "lives served",
  },
];

function Counter({
  value,
  prefix = "",
  suffix,
}: {
  value: number;
  prefix?: string;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (inView) {
      motionValue.set(value);
    }
  }, [inView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.floor(
          latest,
        ).toLocaleString()}${suffix}`;
      }
    });
    return unsubscribe;
  }, [spring, prefix, suffix]);

  return (
    <span
      ref={ref}
      className="font-mono text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
    >
      {prefix}0{suffix}
    </span>
  );
}

export default function StatsCounters() {
  return (
    <section className="border-b border-border bg-background py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-8">
          {STATS.map(({ icon: Icon, value, prefix, suffix, label }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              viewport={{ once: true, margin: "-50px" }}
              className="group flex flex-col items-start gap-2.5 border-l border-border/80 pl-5 first:border-l-0 first:pl-0 sm:pl-6"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-4 w-4" />
              </div>

              <div className="mt-1 flex items-baseline">
                <Counter value={value} prefix={prefix} suffix={suffix} />
              </div>

              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider sm:text-sm">
                {label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
