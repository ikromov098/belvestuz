'use client';

import Link from 'next/link';
import BelvestIcon from '@/components/BelvestIcon';
import { useLanguage } from '@/context/LanguageContext';
import type { SiteLang } from '@/context/LanguageContext';

const LANGS: [SiteLang, string][] = [
  ['en', 'EN'],
  ['uz', 'UZ'],
  ['ru', 'RU'],
];

const LINKS = [
  { label: 'Track record', href: '#track-record' },
  { label: 'Terms', href: '#terms' },
  { label: 'How a deal works', href: '#process' },
  { label: 'Team', href: '#team' },
];

export default function InvestorHeader() {
  const { activeLang, switchLang } = useLanguage();
  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur"
      style={{ backgroundColor: 'rgba(0,51,50,0.94)', borderColor: 'rgba(255,240,204,0.18)' }}
    >
      <div className="mx-auto flex h-[70px] max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/en/investors/" className="flex items-center gap-2.5 select-none" aria-label="Belvest investor relations">
          <span
            className="text-[22px] font-extrabold leading-none"
            style={{ color: '#FFF0CC', letterSpacing: '0.15em' }}
          >
            BELVEST
          </span>
          <BelvestIcon className="h-7 w-auto text-[#FFF0CC]" />
          <span
            className="ml-1 hidden border-l pl-3 text-[10px] font-semibold uppercase tracking-[0.18em] sm:inline"
            style={{ borderColor: 'rgba(255,240,204,0.3)', color: 'rgba(255,240,204,0.6)' }}
          >
            Investor relations
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Investor page sections">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors"
              style={{ color: 'rgba(255,240,204,0.72)' }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1" role="group" aria-label="Language">
            {LANGS.map(([value, label]) => {
              const active = activeLang === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => switchLang(value)}
                  aria-pressed={active}
                  className="cursor-pointer rounded-full border px-2 py-1 text-[11px] font-semibold sm:px-2.5 sm:text-xs"
                  style={{
                    borderColor: 'rgba(255,240,204,0.45)',
                    color: active ? '#004445' : 'rgba(255,240,204,0.8)',
                    backgroundColor: active ? '#FFF0CC' : 'transparent',
                    letterSpacing: '0.05em',
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <a
            href="#contact"
            className="rounded-full px-4 py-2 text-sm font-bold transition-colors"
            style={{ backgroundColor: '#FFF0CC', color: '#004445' }}
          >
            <span className="sm:hidden">Investor pack</span>
            <span className="hidden sm:inline">Request the investor pack</span>
          </a>
        </div>
      </div>
    </header>
  );
}
