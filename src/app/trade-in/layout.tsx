import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Трейд-ин — Belvest',
  description: 'Обменяйте старый товар на новый. Онлайн-оценка смартфонов, ноутбуков, бытовой техники.',
};
export default function TradeInLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
