import HeroSection from "@/components/home/HeroSection";
import QuickEmergencyStrip from "@/components/home/QuickEmergencyStrip";
import StatsCounters from "@/components/home/StatsCounters";

export default function HomePage() {
  return (
    <div>
      <HeroSection></HeroSection>
      <QuickEmergencyStrip></QuickEmergencyStrip>
      <StatsCounters></StatsCounters>
    </div>
  );
}
