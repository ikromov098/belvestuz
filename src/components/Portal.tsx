'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

/**
 * Renders children into document.body so that position:fixed overlays escape
 * any transformed / perspective ancestor (e.g. the page-transition wrapper in
 * app/template.tsx) and resolve their fixed positioning against the viewport.
 *
 * Guarded with a mounted flag so it is a no-op during SSR (document is undefined).
 */
export default function Portal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return mounted ? createPortal(children, document.body) : null;
}
