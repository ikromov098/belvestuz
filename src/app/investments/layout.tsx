import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Инвестиции — Belvest',
  description: 'Вложите средства и получайте до 18% годовых. Прозрачные условия, три инвестиционных плана.',
};
export default function InvestmentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
