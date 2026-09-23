import ContactForm from "@/components/contact/ContactForm";
import ContactHero from "@/components/contact/ContactHero";
import ContactInfoCards from "@/components/contact/ContactInfoCards";
import React from "react";

export default function contactPage() {
  return (
    <div>
      <ContactHero></ContactHero>
      <ContactForm></ContactForm>
      <ContactInfoCards></ContactInfoCards>
    </div>
  );
}
