"use client";

import { motion } from "framer-motion";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CONTACT_INFO = [
  {
    icon: Phone,
    label: "Emergency",
    value: "999",
    description: "For immediate emergency assistance",
    href: "tel:999",
  },
  {
    icon: Mail,
    label: "Email",
    value: "support@rescue.app",
    description: "For questions and general support",
    href: "mailto:support@rescue.app",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Dhaka, Bangladesh",
    description: "Serving customers across Dhaka",
    href: undefined,
  },
  {
    icon: Clock3,
    label: "Support Hours",
    value: "24/7 Emergencies",
    description: "9am–9pm for general support",
    href: undefined,
  },
] as const;

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 16,
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

export default function ContactInfoCards() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div className="mb-12 max-w-xl">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            We&apos;re here when you need us
          </h2>

          <p className="mt-3 text-muted-foreground">
            Reach out for emergency assistance, general support, or any
            questions about Rescue.
          </p>
        </div>

        {/* Contact Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            margin: "-100px",
          }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {CONTACT_INFO.map(
            ({ icon: Icon, label, value, description, href }) => {
              const cardContent = (
                <Card className="h-full transition-colors hover:border-destructive/40">
                  <CardHeader>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-destructive/10">
                      <Icon className="h-5 w-5 text-destructive" />
                    </div>

                    <CardTitle className="text-base">{label}</CardTitle>
                  </CardHeader>

                  <CardContent className="-mt-2">
                    <div className="text-sm font-semibold">{value}</div>

                    <p className="mt-1.5 text-sm leading-5 text-muted-foreground">
                      {description}
                    </p>
                  </CardContent>
                </Card>
              );

              return href ? (
                <motion.a
                  key={label}
                  href={href}
                  variants={item}
                  className="block h-full rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {cardContent}
                </motion.a>
              ) : (
                <motion.div key={label} variants={item} className="h-full">
                  {cardContent}
                </motion.div>
              );
            },
          )}
        </motion.div>
      </div>
    </section>
  );
}
