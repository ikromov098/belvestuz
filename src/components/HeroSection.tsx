'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <div
      className="flex flex-col items-center justify-center py-20 sm:py-28 text-center px-4"
      style={{ backgroundColor: '#0D5C54' }}
    >
      <p
        className="text-xs font-semibold uppercase tracking-widest mb-3"
        style={{ color: 'rgba(232,223,200,0.65)' }}
      >
        Узбекистан · Belvest
      </p>
      <h1
        className="text-3xl sm:text-5xl font-extrabold mb-4"
        style={{ color: '#E8DFC8', letterSpacing: '0.02em', maxWidth: 620 }}
      >
        {t.hero.title}
      </h1>
      <p
        style={{ color: 'rgba(232,223,200,0.75)', maxWidth: 420, fontSize: 17 }}
        className="mb-8"
      >
        {t.hero.subtitle}
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/apply"
          className="px-7 py-3 rounded-xl text-sm font-bold"
          style={{ backgroundColor: '#C9A84C', color: '#0D1F1D' }}
        >
          {t.header.apply}
        </Link>
        <Link
          href="/catalog"
          className="px-7 py-3 rounded-xl text-sm font-semibold border"
          style={{
            borderColor: 'rgba(232,223,200,0.40)',
            color: '#E8DFC8',
            backgroundColor: 'transparent',
          }}
        >
          {t.buttons.learnMore}
        </Link>
      </div>
    </div>
  );
}
