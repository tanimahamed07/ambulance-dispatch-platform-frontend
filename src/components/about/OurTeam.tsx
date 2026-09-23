// components/about/OurTeam.tsx
"use client";

import { motion, Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const TEAM = [
  {
    name: "Imran Kabir",
    role: "Founder & CEO",
    initials: "IK",
    bio: "Leads product direction and company strategy.",
  },
  {
    name: "Shirin Akter",
    role: "Head of Operations",
    initials: "SA",
    bio: "Runs day-to-day dispatch operations and driver onboarding.",
  },
  {
    name: "Ovi Rahman",
    role: "Lead Engineer",
    initials: "OR",
    bio: "Leads backend architecture and platform reliability.",
  },
  {
    name: "Meherun Nesa",
    role: "Head of Driver Relations",
    initials: "MN",
    bio: "Manages driver support, verification, and training.",
  },
  {
    name: "Tanjil Hossain",
    role: "Product Design",
    initials: "TH",
    bio: "Designs the caller, driver, and dispatcher experience.",
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

export default function OurTeam() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-xl">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Our team
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            The people behind Rescue
          </h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
        >
          {TEAM.map(({ name, role, initials, bio }) => (
            <motion.div key={name} variants={item}>
              <Card className="h-full">
                <CardContent className="flex flex-col items-center pt-6 text-center">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-destructive/10 text-lg text-destructive">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="mt-4 text-sm font-semibold text-foreground">
                    {name}
                  </h3>
                  <span className="mt-0.5 text-xs text-muted-foreground">
                    {role}
                  </span>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    {bio}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
