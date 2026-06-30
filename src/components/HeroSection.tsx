'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const STAR_PATH =
  'M13 0L15.5 5L20 2.5L18.5 7.5L24 8L19.5 11L23 15L18 14.5L18.5 19.5L14.5 16.5L13 21L11.5 16.5L7.5 19.5L8 14.5L3 15L6.5 11L2 8L7.5 7.5L6 2.5L10.5 5L13 0Z';

function HeroMark() {
  return (
    <svg
      viewBox="0 0 26 21"
      aria-hidden="true"
      className="absolute pointer-events-none select-none"
      style={{
        right: '-60px',
        bottom: '-80px',
        width: 420,
        height: 340,
        opacity: 0.9,
      }}
    >
      <g transform="translate(13 10.5) rotate(15) translate(-13 -10.5)" opacity="0.10">
        <path d={STAR_PATH} fill="#16685B" transform="translate(13 10.5) scale(1.9) translate(-13 -10.5)" />
      </g>
      <g transform="translate(13 10.5) rotate(-12) translate(-13 -10.5)" opacity="0.16">
        <path d={STAR_PATH} fill="#548870" transform="translate(13 10.5) scale(1.35) translate(-13 -10.5)" />
      </g>
      <path d={STAR_PATH} fill="#FFF0CC" opacity="0.14" />
    </svg>
  );
}

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <div
      className="relative flex flex-col items-center justify-center py-20 sm:py-28 text-center px-4 overflow-hidden"
      style={{ backgroundColor: '#004445' }}
    >
      <HeroMark />
      <p
        className="relative z-10 text-xs font-semibold uppercase tracking-widest mb-3"
        style={{ color: 'rgba(255,240,204,0.65)' }}
      >
        Узбекистан · Belvest
      </p>
      <h1
        className="relative z-10 text-3xl sm:text-5xl font-extrabold mb-4"
        style={{ color: '#FFF0CC', letterSpacing: '0.02em', maxWidth: 620 }}
      >
        {t.hero.title}
      </h1>
      <p
        style={{ color: 'rgba(255,240,204,0.75)', maxWidth: 420, fontSize: 17 }}
        className="relative z-10 mb-8"
      >
        {t.hero.subtitle}
      </p>
      <div className="relative z-10 flex flex-col sm:flex-row gap-3">
        <Link
          href="/apply"
          className="px-7 py-3 rounded-xl text-sm font-bold"
          style={{ backgroundColor: '#C9A84C', color: '#0D1F1D' }}
        >
          {t.header.apply}
        </Link>
        <a
          href="https://t.me/belvest_info"
          target="_blank"
          rel="noopener noreferrer"
          className="px-7 py-3 rounded-xl text-sm font-semibold border"
          style={{
            borderColor: 'rgba(255,240,204,0.40)',
            color: '#FFF0CC',
            backgroundColor: 'transparent',
          }}
        >
          Написать в Telegram
        </a>
      </div>
    </div>
  );
}
