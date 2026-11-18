'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Chatbot from '@/components/Chatbot';
import CallbackWidget from '@/components/CallbackWidget';
import { isInvestorPath, useLanguage } from '@/context/LanguageContext';

// The English investor page has its own header, footer and contact form. Hiding the
// Russian site chrome (and the Russian chatbot) there keeps that page entirely English
// without moving every route into a group layout. That page is both /en/investors and the
// home route while English is selected. Other routes are unchanged.
export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isEnglish } = useLanguage();
  const bare = isInvestorPath(pathname) || (pathname === '/' && isEnglish);

  if (bare) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <Chatbot />
      <CallbackWidget />
    </>
  );
}
