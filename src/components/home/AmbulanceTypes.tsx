// components/home/AmbulanceTypes.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Snowflake, HeartPulse, Wind, Plane, Fan } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const TYPES = [
  {
    icon: Fan,
    type: "NON_AC",
    title: "Non-AC",
    description: "Standard transport for stable, non-critical patients.",
    features: ["First-aid kit", "Stretcher", "Trained attendant"],
  },
  {
    icon: Wind,
    type: "AC",
    title: "AC",
    description: "Climate-controlled transport for a more comfortable ride.",
    features: ["Air conditioning", "Stretcher", "Trained attendant"],
  },
  {
    icon: HeartPulse,
    type: "ICU",
    title: "ICU",
    description: "Full life-support setup for critical and cardiac cases.",
    features: ["Ventilator", "Cardiac monitor", "Paramedic on board"],
  },
  {
    icon: Snowflake,
    type: "FREEZER",
    title: "Freezer",
    description: "Refrigerated transport for deceased patients.",
    features: ["Cold storage unit", "Dignified handling"],
  },
  {
    icon: Plane,
    type: "AIR",
    title: "Air ambulance",
    description: "Fastest option for long-distance or cross-region transfers.",
    features: ["Rapid transfer", "Onboard medical team"],
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function AmbulanceTypes() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-xl">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            An ambulance for every situation
          </h2>
          <p className="mt-3 text-muted-foreground">
            Pick the right vehicle when you request one. Fare is calculated
            after the trip, based on distance and emergency priority — not the
            vehicle type.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {TYPES.map(({ icon: Icon, type, title, description, features }) => (
            <motion.div key={type} variants={item}>
              <Card className="flex h-full flex-col">
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-md bg-destructive/10">
                    <Icon className="h-5 w-5 text-destructive" />
                  </div>
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    {features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="border-t border-border pt-4">
                  <Button
                    size="sm"
                    className="w-full"
                    nativeButton={false}
                    render={
                      <Link
                        href={`/caller/request-emergency?ambulanceType=${type}`}
                      />
                    }
                  >
                    Request this type
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
