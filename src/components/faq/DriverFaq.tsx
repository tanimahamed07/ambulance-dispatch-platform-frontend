// components/faq/DriverFaq.tsx
"use client";

import { motion, Variants } from "framer-motion";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const FAQS = [
  {
    question: "How do I apply to become a driver?",
    answer:
      "Register an account, then submit a driver application with your documents. You can check your application status anytime from your dashboard while it's under review.",
  },
  {
    question: "What documents do I need?",
    answer:
      "Your NID, a valid driving license, and your ambulance's vehicle registration papers. These are reviewed before your application can be approved.",
  },
  {
    question: "How long does verification take?",
    answer:
      "An admin reviews each application manually, so timing can vary. You'll see your status change from pending to approved (or rejected with a reason) directly in the app — there's no fixed waiting period.",
  },
  {
    question: "How do I go on duty / accept a dispatch?",
    answer:
      "Once approved and assigned an ambulance, toggle your status to on-duty from your dashboard. This starts sharing your live location and makes you eligible to receive dispatches, which you can then accept or reject.",
  },
  {
    question: "How is my location shared?",
    answer:
      "Your location is only shared while you're on duty, and only with the dispatcher and the caller of the trip you're currently assigned to. It stops updating automatically the moment you go off duty.",
  },
  {
    question: "What happens after I complete a trip?",
    answer:
      "You mark the trip complete after hospital drop-off, entering the distance covered. The system calculates the fare, your ambulance is marked available again, and you're free to accept the next dispatch.",
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function DriverFaq() {
  return (
    <section id="drivers" className="bg-background py-16 scroll-mt-20">
      <div className="mx-auto max-w-4xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4 }}
          className="mb-8 text-2xl font-bold tracking-tight text-foreground"
        >
          For Drivers
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map(({ question, answer }, i) => (
              <motion.div key={question} variants={item}>
                <AccordionItem value={`driver-${i}`}>
                  <AccordionTrigger className="text-left text-sm font-medium text-foreground">
                    {question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
