import AccountFaq from "@/components/faq/AccountFaq";
import CallerFaq from "@/components/faq/CallerFaq";
import DriverFaq from "@/components/faq/DriverFaq";
import FaqHelpCta from "@/components/faq/FaqHelpCta";
import FaqHero from "@/components/faq/FaqHero";
import PaymentFaq from "@/components/faq/PaymentFaq";
import React from "react";

export default function FAQPage() {
  return (
    <div>
      <FaqHero></FaqHero>
      <CallerFaq></CallerFaq>
      <DriverFaq></DriverFaq>
      <PaymentFaq></PaymentFaq>
      <AccountFaq></AccountFaq>
      <FaqHelpCta></FaqHelpCta>
    </div>
  );
}
