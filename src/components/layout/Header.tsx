'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import type { Lang } from '@/data/translations';

const LANGUAGES: Lang[] = ['UZ' as Lang, 'RU' as Lang, 'EN' as Lang];
const LANG_VALUES: Lang[] = ['uz', 'ru', 'en'];

function BelvестLogo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 select-none">
      <span
        style={{
          fontWeight: 800,
          letterSpacing: '0.15em',
          fontSize: '24px',
          color: '#E8DFC8',
          lineHeight: 1,
        }}
      >
        BELVEST
      </span>
      <svg
        width="24"
        height="28"
        viewBox="0 0 28 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* 8-petal rosette crown — petals at radius 5 from center (14,9) */}
        <circle cx="14"   cy="4"    r="3.5" fill="#E8DFC8" />
        <circle cx="17.5" cy="5.5"  r="3.5" fill="#E8DFC8" />
        <circle cx="19"   cy="9"    r="3.5" fill="#E8DFC8" />
        <circle cx="17.5" cy="12.5" r="3.5" fill="#E8DFC8" />
        <circle cx="14"   cy="14"   r="3.5" fill="#E8DFC8" />
        <circle cx="10.5" cy="12.5" r="3.5" fill="#E8DFC8" />
        <circle cx="9"    cy="9"    r="3.5" fill="#E8DFC8" />
        <circle cx="10.5" cy="5.5"  r="3.5" fill="#E8DFC8" />
        <circle cx="14"   cy="9"    r="5"   fill="#E8DFC8" />
        {/* Trunk */}
        <rect x="12" y="17" width="4" height="5" fill="#E8DFC8" />
        {/* Upward-pointing base — tip at top, wide at bottom */}
        <polygon points="14,22 6,32 22,32" fill="#E8DFC8" />
      </svg>
    </Link>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  const navLinks = [
    { label: t.nav.catalog,     href: '/catalog'     },
    { label: t.nav.leasing,     href: '/leasing'     },
    { label: t.nav.installment, href: '/rassrochka'  },
    { label: t.nav.tradein,     href: '/trade-in'    },
    { label: t.nav.investments, href: '/investments' },
    { label: t.nav.about,       href: '/about'       },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const activeLangLabel = lang.toUpperCase() as typeof LANGUAGES[number];

  return (
    <>
      <header
        style={{ backgroundColor: '#0D5C54' }}
        className={`sticky top-0 z-50 transition-shadow duration-200 ${
          scrolled ? 'shadow-[0_2px_16px_rgba(0,0,0,0.25)]' : 'shadow-none'
        }`}
      >
        {/* Sharia compliance bar */}
        <div
          className="w-full text-center py-1.5 px-4"
          style={{ backgroundColor: '#1a6b5a' }}
        >
          <p
            className="text-xs tracking-widest"
            style={{ color: 'rgba(232,223,200,0.85)', letterSpacing: '0.08em' }}
          >
            ✓ Соответствует нормам Шариата &nbsp;•&nbsp; Без Риба &nbsp;•&nbsp; Халяль финансирование
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[70px] max-[768px]:h-[60px]">

          {/* LEFT — Logo */}
          <BelvестLogo />

          {/* CENTER — Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-sm font-medium rounded transition-colors duration-150"
                style={{ color: 'rgba(232,223,200,0.70)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#E8DFC8')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(232,223,200,0.70)')}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* RIGHT — Lang + Account + CTA */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Language switcher */}
            <div className="flex items-center gap-1 mr-1">
              {LANG_VALUES.map((value, i) => {
                const label = LANGUAGES[i];
                const isActive = lang === value;
                return (
                  <button
                    key={value}
                    onClick={() => setLang(value)}
                    className="px-2.5 py-1 text-xs font-semibold rounded-full border transition-all duration-150 cursor-pointer"
                    style={{
                      borderColor: 'rgba(232,223,200,0.45)',
                      color: isActive ? '#0D5C54' : 'rgba(232,223,200,0.80)',
                      backgroundColor: isActive ? '#E8DFC8' : 'transparent',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Личный кабинет */}
            <Link
              href="/portal"
              className="px-4 py-1.5 text-sm font-medium rounded-full border transition-all duration-150"
              style={{ borderColor: 'rgba(232,223,200,0.50)', color: '#E8DFC8' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#E8DFC8';
                e.currentTarget.style.backgroundColor = 'rgba(232,223,200,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(232,223,200,0.50)';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {t.header.cabinet}
            </Link>

            {/* Подать заявку */}
            <Link
              href="/apply"
              className="px-4 py-2 text-sm font-semibold rounded-full transition-all duration-150"
              style={{ backgroundColor: '#C9A84C', color: '#0D1F1D', letterSpacing: '0.02em' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#A8892E')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#C9A84C')}
            >
              {t.header.apply}
            </Link>
          </div>

          {/* Mobile — hamburger */}
          <button
            className="lg:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 cursor-pointer"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span
              className="block w-6 h-0.5 transition-all duration-200 origin-center"
              style={{
                backgroundColor: '#E8DFC8',
                transform: mobileOpen ? 'rotate(45deg) translateY(7px)' : 'none',
              }}
            />
            <span
              className="block w-6 h-0.5 transition-all duration-200"
              style={{ backgroundColor: '#E8DFC8', opacity: mobileOpen ? 0 : 1 }}
            />
            <span
              className="block w-6 h-0.5 transition-all duration-200 origin-center"
              style={{
                backgroundColor: '#E8DFC8',
                transform: mobileOpen ? 'rotate(-45deg) translateY(-7px)' : 'none',
              }}
            />
          </button>
        </div>

        {/* Mobile dropdown */}
        <div
          className="lg:hidden overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: mobileOpen ? '480px' : '0px', backgroundColor: '#0D5C54' }}
        >
          <div className="px-4 pb-5 pt-2 flex flex-col gap-1 border-t border-[rgba(232,223,200,0.15)]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-2.5 px-3 text-sm font-medium rounded transition-colors duration-150"
                style={{ color: 'rgba(232,223,200,0.80)' }}
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-3 pt-3 border-t border-[rgba(232,223,200,0.15)] flex items-center gap-2">
              {LANG_VALUES.map((value, i) => {
                const label = LANGUAGES[i];
                const isActive = lang === value;
                return (
                  <button
                    key={value}
                    onClick={() => setLang(value)}
                    className="px-3 py-1 text-xs font-semibold rounded-full border cursor-pointer"
                    style={{
                      borderColor: 'rgba(232,223,200,0.45)',
                      color: isActive ? '#0D5C54' : 'rgba(232,223,200,0.80)',
                      backgroundColor: isActive ? '#E8DFC8' : 'transparent',
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            <div className="mt-2 flex flex-col gap-2">
              <Link
                href="/portal"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center py-2.5 text-sm font-medium rounded-full border"
                style={{ borderColor: 'rgba(232,223,200,0.50)', color: '#E8DFC8' }}
              >
                {t.header.cabinet}
              </Link>
              <Link
                href="/apply"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center py-2.5 text-sm font-semibold rounded-full"
                style={{ backgroundColor: '#C9A84C', color: '#0D1F1D' }}
              >
                {t.header.apply}
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
