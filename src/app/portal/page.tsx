'use client';

import Link from 'next/link';
import BelvestIcon from '@/components/BelvestIcon';
import { useLanguage } from '@/context/LanguageContext';

export default function PortalPage() {
  const { lang } = useLanguage();

  const heading  = lang === 'uz' ? 'Yaqin kunda'                              : 'Скоро';
  const subtitle = lang === 'uz' ? 'Shaxsiy kabinet tez orada ishga tushadi'  : 'Личный кабинет скоро заработает';
  const backBtn  = lang === 'uz' ? 'Bosh sahifaga qaytish'                    : 'Вернуться на главную';

  return (
    <div
      className="flex items-center justify-center min-h-screen px-4"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <div
        className="flex flex-col items-center text-center rounded-2xl px-10 py-12 w-full max-w-sm"
        style={{ boxShadow: '0 4px 32px rgba(0,0,0,0.10)', border: '1px solid #16685B' }}
      >
        <BelvestIcon className="h-14 w-auto text-[#004445] mb-6" />

        <h1 className="text-4xl font-extrabold mb-3" style={{ color: '#0D1F1D' }}>
          {heading}
        </h1>

        <p className="text-sm leading-relaxed mb-8" style={{ color: '#4A6B67' }}>
          {subtitle}
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center px-7 py-3 rounded-xl text-sm font-bold"
          style={{ backgroundColor: '#004445', color: '#FFF0CC' }}
        >
          {backBtn}
        </Link>
      </div>
    </div>
  );
}
