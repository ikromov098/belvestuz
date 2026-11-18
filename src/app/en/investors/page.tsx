import type { Metadata } from 'next';
import InvestorsContent from '@/components/investors/InvestorsContent';

const DESCRIPTION =
  'Belvest buys the asset first, then sells or leases it to the customer at a fixed, disclosed price. Partnership structures, track record and due-diligence materials for institutional investors in Uzbekistan.';

export const metadata: Metadata = {
  title: 'Belvest — Investor relations',
  description: DESCRIPTION,
  alternates: { canonical: 'https://belvest.uz/en/investors/' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Belvest — Investor relations',
    description: DESCRIPTION,
    url: 'https://belvest.uz/en/investors/',
    siteName: 'Belvest',
    locale: 'en_US',
    type: 'website',
  },
};

export default function InvestorsPage() {
  return <InvestorsContent />;
}
