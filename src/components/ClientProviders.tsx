'use client';

import { useEffect } from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import { captureAttribution } from '@/lib/attribution';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    captureAttribution();
  }, []);
  return <LanguageProvider>{children}</LanguageProvider>;
}
