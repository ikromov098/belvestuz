import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Подать заявку — Belvest',
  description: 'Оформите рассрочку, лизинг или трейд-ин онлайн. Заявка рассматривается в течение 1 рабочего дня.',
};
export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
