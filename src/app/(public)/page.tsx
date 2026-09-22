import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import QuickEmergencyStrip from "@/components/home/QuickEmergencyStrip";
import StatsCounters from "@/components/home/StatsCounters";

export default function HomePage() {
  return (
    <div>
      <HeroSection></HeroSection>
      <QuickEmergencyStrip></QuickEmergencyStrip>
      <StatsCounters></StatsCounters>
      <HowItWorks></HowItWorks>
    </div>
  );
}
