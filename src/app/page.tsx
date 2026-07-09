import React from 'react';
import CalculatorSection from '@/components/Calculator';
import Testimonials from '@/components/Testimonials';
import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import HalalSection from '@/components/HalalSection';
import ContactStrip from '@/components/ContactStrip';
import StatsBar from '@/components/StatsBar';

export default function Home() {
  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* Stats */}
      <StatsBar />

      {/* Calculator + Trade-in */}
      <CalculatorSection />

      {/* Halal comparison */}
      <HalalSection />

      {/* How it works */}
      <HowItWorks />

      {/* Testimonials */}
      <Testimonials />

      {/* Contact strip */}
      <ContactStrip />
    </>
  );
}
