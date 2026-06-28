import type { Metadata } from "next";
import { LandingHeader } from "@/components/layout/LandingHeader";
import { TrustBar } from "@/components/landing/TrustBar";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { FeaturedStokvelsSection } from "@/components/landing/FeaturedStokvelsSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { CTASection } from "@/components/landing/CTASection";
import { LandingFooter } from "@/components/landing/LandingFooter";

export const metadata: Metadata = {
  title: "Yieldly — Save Together. Build Wealth. Together.",
};

export default function HomePage() {
  return (
    <>
      <LandingHeader />
      <TrustBar />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <FeaturedStokvelsSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <LandingFooter />
    </>
  );
}
