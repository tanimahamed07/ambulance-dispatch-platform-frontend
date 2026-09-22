import AmbulanceTypes from "@/components/home/AmbulanceTypes";
import BecomeDriver from "@/components/home/BecomeDriver";
import FeaturesGrid from "@/components/home/FeaturesGrid";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import PaymentPricing from "@/components/home/PaymentPricing";
import QuickEmergencyStrip from "@/components/home/QuickEmergencyStrip";
import SafetyTrust from "@/components/home/SafetyTrust";
import StatsCounters from "@/components/home/StatsCounters";
import TripLifecycle from "@/components/home/TripLifecycle";

export default function HomePage() {
  return (
    <div>
      <HeroSection></HeroSection>
      <QuickEmergencyStrip></QuickEmergencyStrip>
      <StatsCounters></StatsCounters>
      <HowItWorks></HowItWorks>
      <AmbulanceTypes></AmbulanceTypes>
      <FeaturesGrid></FeaturesGrid>
      <BecomeDriver></BecomeDriver>
      <TripLifecycle></TripLifecycle>
      <PaymentPricing></PaymentPricing>
      <SafetyTrust></SafetyTrust>
    </div>
  );
}
