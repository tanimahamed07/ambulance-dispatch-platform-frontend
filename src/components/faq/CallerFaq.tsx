// components/faq/CallerFaq.tsx
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
    question: "How do I request an ambulance?",
    answer:
      "Fill in the pickup location, patient's phone number, and the emergency type — either from the quick strip on the home page or the full request form. Once submitted, a dispatcher reviews it and assigns the nearest available ambulance.",
  },
  {
    question: "How is the fare calculated?",
    answer:
      "The fare is a base charge of Tk 200 plus a per-km rate that depends on the emergency's priority (CRITICAL, HIGH, MEDIUM). Distance is measured from your trip's actual route, and the final fare is calculated only after the trip is completed.",
  },
  {
    question: "Does choosing ICU or AC cost more than Non-AC?",
    answer:
      "No. The ambulance type you choose (Non-AC, AC, ICU, Freezer, Air) only affects the equipment and staff on board — it does not change the fare. The fare depends solely on distance and emergency priority, not the vehicle.",
  },
  {
    question: "Can I cancel a request after submitting?",
    answer:
      "Yes, you can cancel your emergency request as long as it hasn't already reached the hospital stage. Once a dispatcher or driver is notified, cancelling promptly helps free up the ambulance for someone else.",
  },
  {
    question: "How do I track my ambulance?",
    answer:
      "Once a driver is assigned, you'll see their live location on a map from your trip page, updating in real time as they move toward you and then toward the hospital.",
  },
  {
    question: "What if no ambulance is available near me?",
    answer:
      "The dispatcher will keep searching nearby coverage areas and assign the next available ambulance as soon as one frees up. Requests are prioritized by emergency type, so critical cases are matched first.",
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

export default function CallerFaq() {
  return (
    <section id="callers" className="bg-background py-16 scroll-mt-20">
      <div className="mx-auto max-w-4xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4 }}
          className="mb-8 text-2xl font-bold tracking-tight text-foreground"
        >
          For Callers
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <Accordion className="w-full">
            {FAQS.map(({ question, answer }, i) => (
              <motion.div key={question} variants={item}>
                <AccordionItem value={`caller-${i}`}>
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
