'use client';

import { createContext, useContext, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { translations, type Lang, type Translations } from '@/data/translations';

// The toggle has three choices. RU and UZ are the borrower-site languages (`lang`). EN is not a
// borrower language: it only means "show the English investor page" (`isEnglish`), so the
// borrower pages keep their Russian/Uzbek-only copy and never need an English version.
export type SiteLang = Lang | 'en';

type LanguageContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  isEnglish: boolean;
  activeLang: SiteLang;
  // Sets the language and, when needed, moves to the page that shows it: EN goes to the home
  // route (the English investor page); RU/UZ leave the standalone /en/investors page for home.
  switchLang: (l: SiteLang) => void;
  t: Translations;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const isInvestorPath = (pathname: string | null) =>
  pathname === '/en/investors' || pathname === '/en/investors/';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [lang, setLangState] = useState<Lang>('ru');
  // English is the default only on the home route and the investor page, so borrowers who open
  // /apply, /catalog and the other Russian/Uzbek pages directly still land in Russian.
  const [isEnglish, setIsEnglish] = useState(pathname === '/' || isInvestorPath(pathname));

  const setLang = (l: Lang) => {
    setLangState(l);
    setIsEnglish(false);
  };

  const switchLang = (next: SiteLang) => {
    if (next === 'en') {
      setIsEnglish(true);
      if (pathname !== '/' && !isInvestorPath(pathname)) router.push('/');
    } else {
      setLang(next);
      if (isInvestorPath(pathname)) router.push('/');
    }
  };

  return (
    <LanguageContext.Provider
      value={{ lang, setLang, isEnglish, activeLang: isEnglish ? 'en' : lang, switchLang, t: translations[lang] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}
