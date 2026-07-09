'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import type { Lang } from '@/data/translations';
import BelvestIcon from '@/components/BelvestIcon';

const LANGUAGES = ['UZ', 'RU'] as const;
const LANG_VALUES: Lang[] = ['uz', 'ru'];

function BelvестLogo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 select-none">
      <span
        style={{
          fontWeight: 800,
          letterSpacing: '0.15em',
          fontSize: '24px',
          color: '#FFF0CC',
          lineHeight: 1,
        }}
      >
        BELVEST
      </span>
      <BelvestIcon className="h-8 w-auto text-[#FFF0CC]" />
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

  return (
    <>
      <header
        style={{ backgroundColor: '#004445' }}
        className={`sticky top-0 z-50 transition-shadow duration-200 ${
          scrolled ? 'shadow-[0_2px_16px_rgba(0,0,0,0.25)]' : 'shadow-none'
        }`}
      >
        {/* Sharia compliance bar */}
        <div
          className="w-full text-center py-1.5 px-4"
          style={{ backgroundColor: '#16685B' }}
        >
          <p
            className="text-xs tracking-widest"
            style={{ color: 'rgba(255,240,204,0.85)', letterSpacing: '0.08em' }}
          >
            {t.header.announcement}
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
                style={{ color: 'rgba(255,240,204,0.70)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFF0CC')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,240,204,0.70)')}
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
                      borderColor: 'rgba(255,240,204,0.45)',
                      color: isActive ? '#004445' : 'rgba(255,240,204,0.80)',
                      backgroundColor: isActive ? '#FFF0CC' : 'transparent',
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
              style={{ borderColor: 'rgba(255,240,204,0.50)', color: '#FFF0CC' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#FFF0CC';
                e.currentTarget.style.backgroundColor = 'rgba(255,240,204,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,240,204,0.50)';
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
                backgroundColor: '#FFF0CC',
                transform: mobileOpen ? 'rotate(45deg) translateY(7px)' : 'none',
              }}
            />
            <span
              className="block w-6 h-0.5 transition-all duration-200"
              style={{ backgroundColor: '#FFF0CC', opacity: mobileOpen ? 0 : 1 }}
            />
            <span
              className="block w-6 h-0.5 transition-all duration-200 origin-center"
              style={{
                backgroundColor: '#FFF0CC',
                transform: mobileOpen ? 'rotate(-45deg) translateY(-7px)' : 'none',
              }}
            />
          </button>
        </div>

        {/* Mobile dropdown */}
        <div
          className="lg:hidden overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: mobileOpen ? '480px' : '0px', backgroundColor: '#004445' }}
        >
          <div className="px-4 pb-5 pt-2 flex flex-col gap-1 border-t border-[rgba(255,240,204,0.15)]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-2.5 px-3 text-sm font-medium rounded transition-colors duration-150"
                style={{ color: 'rgba(255,240,204,0.80)' }}
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-3 pt-3 border-t border-[rgba(255,240,204,0.15)] flex items-center gap-2">
              {LANG_VALUES.map((value, i) => {
                const label = LANGUAGES[i];
                const isActive = lang === value;
                return (
                  <button
                    key={value}
                    onClick={() => setLang(value)}
                    className="px-3 py-1 text-xs font-semibold rounded-full border cursor-pointer"
                    style={{
                      borderColor: 'rgba(255,240,204,0.45)',
                      color: isActive ? '#004445' : 'rgba(255,240,204,0.80)',
                      backgroundColor: isActive ? '#FFF0CC' : 'transparent',
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
                style={{ borderColor: 'rgba(255,240,204,0.50)', color: '#FFF0CC' }}
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
