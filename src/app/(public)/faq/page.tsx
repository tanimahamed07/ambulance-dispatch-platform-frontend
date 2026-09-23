import CallerFaq from "@/components/faq/CallerFaq";
import DriverFaq from "@/components/faq/DriverFaq";
import FaqHero from "@/components/faq/FaqHero";
import React from "react";

export default function page() {
  return (
    <div>
      <FaqHero></FaqHero>
      <CallerFaq></CallerFaq>
      <DriverFaq></DriverFaq>
    </div>
  );
}
