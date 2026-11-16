'use client';

import { useEffect } from 'react';

// The root layout is Russian for the whole site. The English investor page sets the
// document language while it is mounted so screen readers and browser translation
// treat the page as English, then restores the previous value on navigation.
export default function SetDocumentLang({ lang }: { lang: string }) {
  useEffect(() => {
    const html = document.documentElement;
    const previous = html.lang;
    html.lang = lang;
    return () => {
      html.lang = previous;
    };
  }, [lang]);

  return null;
}
