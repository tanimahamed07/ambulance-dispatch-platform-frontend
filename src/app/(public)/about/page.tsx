import AboutHero from "@/components/about/AboutHero";
import HowItWorksSummary from "@/components/about/HowItWorksSummary";
import OurTeam from "@/components/about/OurTeam";
import Partners from "@/components/about/Partners";
import TheProblem from "@/components/about/TheProblem";
import WhatMakesItDifferent from "@/components/about/WhatMakesItDifferent";
import React from "react";

export default function page() {
  return (
    <div>
      <AboutHero></AboutHero>
      <TheProblem></TheProblem>
      <WhatMakesItDifferent></WhatMakesItDifferent>
      <OurTeam></OurTeam>
      <Partners></Partners>
    </div>
  );
}
