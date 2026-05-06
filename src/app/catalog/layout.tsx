import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Каталог товаров — Belvest',
  description: 'Выберите товар в рассрочку или лизинг. Электроника, бытовая техника, мебель, транспорт и спецтехника от ведущих брендов.',
};
export default function CatalogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
