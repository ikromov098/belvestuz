import type { Metadata } from 'next';
import HomeSwitch from '@/components/HomeSwitch';

const DESCRIPTION =
  'Belvest buys the asset first, then sells or leases it to the customer at a fixed, disclosed price. Partnership structures, track record and due-diligence materials for institutional investors in Uzbekistan.';

// The home route opens on the English investor page, so its metadata is the investor page's.
export const metadata: Metadata = {
  title: 'Belvest — Investor relations',
  description: DESCRIPTION,
  alternates: { canonical: 'https://belvest.uz/' },
  openGraph: {
    title: 'Belvest — Investor relations',
    description: DESCRIPTION,
    url: 'https://belvest.uz/',
    siteName: 'Belvest',
    locale: 'en_US',
    type: 'website',
  },
};

export default function Home() {
  return <HomeSwitch />;
}
