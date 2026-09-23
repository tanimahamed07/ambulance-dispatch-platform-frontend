// components/faq/PaymentFaq.tsx
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
    question: "How do I pay after a trip?",
    answer:
      "Once your driver marks the trip complete, a \"Pay now\" option appears on your trip page. Tapping it redirects you to bKash, where you approve the payment with your PIN, and you're brought back once it's confirmed.",
  },
  {
    question: "What if my payment fails?",
    answer:
      "If a bKash payment doesn't go through, you can retry it directly from the same trip page — there's no need to start a new request or contact support first.",
  },
  {
    question: "Is the fare shown before or after the trip?",
    answer:
      "The exact fare is only calculated after the trip is completed, since it depends on the real distance covered. You can estimate it beforehand using the fare calculator on the pricing page, but the final amount is set once the driver logs the trip's distance.",
  },
  {
    question: "Do I get a receipt?",
    answer:
      "Yes. Once payment is confirmed, the record is saved against your trip and you can view the payment details — amount, distance, and status — anytime from your trip history.",
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

export default function PaymentFaq() {
  return (
    <section id="payments" className="bg-background py-16 scroll-mt-20">
      <div className="mx-auto max-w-3xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4 }}
          className="mb-8 text-2xl font-bold tracking-tight text-foreground"
        >
          Payments
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
                <AccordionItem value={`payment-${i}`}>
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
