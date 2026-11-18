'use client';

import CalculatorSection from '@/components/Calculator';
import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import HalalSection from '@/components/HalalSection';
import ContactStrip from '@/components/ContactStrip';
import StatsBar from '@/components/StatsBar';
import InvestorsContent from '@/components/investors/InvestorsContent';
import { useLanguage } from '@/context/LanguageContext';

// The home route shows the English investor page by default. Picking RU or UZ in the language
// toggle swaps in the borrower home page (leasing, instalments, trade-in) in that language.
export default function HomeSwitch() {
  const { isEnglish } = useLanguage();

  if (isEnglish) return <InvestorsContent />;

  return (
    <>
      <HeroSection />
      <StatsBar />
      <CalculatorSection />
      <HalalSection />
      <HowItWorks />
      <ContactStrip />
    </>
  );
}
