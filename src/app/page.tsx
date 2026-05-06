import React from 'react';
import CalculatorSection from '@/components/Calculator';
import Testimonials from '@/components/Testimonials';
import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import HalalSection from '@/components/HalalSection';
import ContactStrip from '@/components/ContactStrip';


const STATS = [
  { value: '15 000+', label: 'клиентов' },
  { value: '4', label: 'Халяль-продукта' },
  { value: '1 день', label: 'Одобрение' },
  { value: 'С 2020', label: 'года на рынке' },
];

function StatsBar() {
  return (
    <div style={{ backgroundColor: '#094840' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {STATS.map(s => (
          <div key={s.label} className="text-center">
            <p className="text-2xl font-extrabold" style={{ color: '#C9A84C' }}>{s.value}</p>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(232,223,200,0.60)' }}>{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

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
