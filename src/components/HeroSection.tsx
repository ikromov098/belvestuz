'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import BoomerangVideoBg from '@/components/BoomerangVideoBg';

export default function HeroSection() {
  const { lang } = useLanguage();

  const label = lang === 'uz' ? 'MOLIYAVIY ERKINLIK SARI' : 'К ФИНАНСОВОЙ СВОБОДЕ';
  const line1 = lang === 'uz' ? 'Bugun oling —' : 'Возьмите сегодня —';
  const line2 = lang === 'uz' ? "ertaga o'sing" : 'растите завтра';
  const subtitle =
    lang === 'uz'
      ? 'Lizing, nasiya savdo, treyd-in va investitsiyalar — barchasi bir joyda'
      : 'Лизинг, рассрочка, трейд-ин и инвестиции — всё в одном месте';
  const applyLabel = lang === 'uz' ? 'Ariza berish' : 'Подать заявку';
  const moreLabel = lang === 'uz' ? 'Batafsil' : 'Подробнее';

  const scrollToServices = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section className="relative h-[72vh] min-h-[440px] w-full overflow-hidden">
      {/* Boomerang video background */}
      <BoomerangVideoBg src="/belvest-promo.mp4" className="absolute inset-0 w-full h-full" />

      {/* Gradient overlay for text readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,51,50,0.35) 0%, rgba(0,68,69,0.55) 100%)',
        }}
      />

      {/* Centered hero text */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-[72vh] min-h-[440px] px-4">
        <p
          className="text-xs font-semibold uppercase mb-4"
          style={{ color: '#FFF0CC', letterSpacing: '0.22em' }}
        >
          {label}
        </p>
        <h1
          className="text-4xl sm:text-6xl font-extrabold mb-5 leading-tight"
          style={{ color: '#FFF0CC', maxWidth: 720 }}
        >
          {line1}
          <br />
          {line2}
        </h1>
        <p
          className="text-base sm:text-lg"
          style={{ color: 'rgba(255,240,204,0.70)', maxWidth: 480 }}
        >
          {subtitle}
        </p>
      </div>

      {/* Bottom-left CTA block */}
      <div className="absolute bottom-10 left-6 sm:left-10 z-10 flex items-center gap-5">
        <Link
          href="/apply"
          className="px-8 py-3.5 rounded-xl text-sm font-bold"
          style={{ backgroundColor: '#FFF0CC', color: '#004445' }}
        >
          {applyLabel}
        </Link>
        <button
          type="button"
          onClick={scrollToServices}
          className="text-sm font-semibold cursor-pointer inline-flex items-center gap-1"
          style={{ color: '#FFF0CC' }}
        >
          {moreLabel} ↓
        </button>
      </div>
    </section>
  );
}
