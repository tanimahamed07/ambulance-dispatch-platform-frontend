// components/faq/AccountFaq.tsx
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
    question: "Is my location data shared with anyone besides the driver?",
    answer:
      "Your pickup location is shared with the dispatcher who assigns your request and the driver handling your trip. It isn't shared with any other user, and stops being tracked once your trip ends.",
  },
  {
    question: "How are drivers verified?",
    answer:
      "Every driver submits their NID, driving license, and vehicle documents when applying. An admin reviews these manually and only approves the application — allowing the driver to be assigned an ambulance and go on duty — once everything checks out.",
  },
  {
    question: "Is my personal information secure?",
    answer:
      "Yes. Access to your account requires authentication, passwords are never stored in plain text, and all requests to the platform go through validated, role-restricted endpoints — so only people who need your data (like your assigned driver or dispatcher) can see it.",
  },
  {
    question: "How do I delete my account / data?",
    answer:
      "Reach out through the contact page with your account details and we'll process the deletion request. Trip and payment records tied to completed emergencies may be retained briefly for support and billing purposes before full removal.",
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

export default function AccountFaq() {
  return (
    <section id="account" className="bg-background py-16 scroll-mt-20">
      <div className="mx-auto max-w-4xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4 }}
          className="mb-8 text-2xl font-bold tracking-tight text-foreground"
        >
          Account & Safety
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
                <AccordionItem value={`account-${i}`}>
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