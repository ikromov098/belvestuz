import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'О компании — Belvest',
  description: 'Надёжный финансовый партнёр для жителей и бизнеса Узбекистана с 2020 года.',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
