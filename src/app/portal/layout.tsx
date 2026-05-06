import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Личный кабинет — Belvest',
  description: 'Управляйте договорами, отслеживайте платежи и заявки в личном кабинете Belvest.',
};
export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
