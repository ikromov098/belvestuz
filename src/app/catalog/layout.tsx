import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Каталог товаров — Belvest',
  description: 'Смартфоны, автомобили, недвижимость и спецтехника в рассрочку или лизинг. Прозрачные условия, решение за 2 часа.',
};
export default function CatalogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
