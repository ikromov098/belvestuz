import type { Metadata } from 'next';
import Link from 'next/link';
import CalculatorSection from '@/components/Calculator';
import { Smartphone, Laptop, Home, Car, IdCard, Hash } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Рассрочка (Мурабаха) — Belvest',
  description: 'Покупайте товары в рассрочку без переплат. Смартфоны, ноутбуки, бытовая техника, мебель — от 3 до 24 месяцев.',
};

const CATEGORIES = [
  { emoji: <Smartphone size={34} style={{ color: '#004445' }} />, name: 'Смартфоны', sub: 'от 500 000 сум/мес', count: '50+ моделей' },
  { emoji: <Laptop size={34} style={{ color: '#004445' }} />, name: 'Ноютбуки', sub: 'от 800 000 сум/мес', count: '30+ моделей' },
  { emoji: <Home size={34} style={{ color: '#004445' }} />, name: 'Бытовая техника', sub: 'от 400 000 сум/мес', count: '80+ товаров' },
  { emoji: <Car size={34} style={{ color: '#004445' }} />, name: 'Автомобили', sub: 'от 2 000 000 сум/мес', count: 'Трейд-ин' },
];

const DOCS = [
  { icon: <IdCard size={24} style={{ color: '#004445' }} />, label: 'Паспорт гражданина Узбекистана', req: true },
  { icon: <Hash size={24} style={{ color: '#004445' }} />, label: 'ПИНФЛ (14 цифр)', req: true },
  { icon: <Car size={24} style={{ color: '#004445' }} />, label: 'Водительское удостоверение (для авто)', req: false },
];

const TERMS = [
  { months: 3,  rate: '0%' },
  { months: 6,  rate: '0%' },
  { months: 12, rate: '0%' },
  { months: 18, rate: '0%' },
  { months: 24, rate: '0%' },
];

export default function RassrochkaPage() {
  return (
    <div>
      {/* Hero */}
      <div style={{ backgroundColor: '#004445' }} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-1.5 mb-5 text-xs" style={{ color: 'rgba(255,240,204,0.55)' }}>
            <Link href="/" style={{ color: 'rgba(255,240,204,0.55)' }}>Главная</Link>
            <span>›</span>
            <span style={{ color: '#FFF0CC' }}>Рассрочка</span>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#FFF0CC' }}>
            Беспроцентная рассрочка
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ color: '#FFF0CC', maxWidth: 580 }}>
            Рассрочка (Мурабаха) без переплат
          </h1>
          <p className="text-lg mb-8" style={{ color: 'rgba(255,240,204,0.75)', maxWidth: 480 }}>
            Купите любой товар и платите частями от 3 до 24 месяцев — без процентов и скрытых комиссий
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/catalog"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-sm font-bold"
              style={{ backgroundColor: '#FFF0CC', color: '#004445' }}>
              Смотреть каталог
            </Link>
            <Link href="/apply?service=installment"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-sm font-semibold border"
              style={{ borderColor: 'rgba(255,240,204,0.40)', color: '#FFF0CC' }}>
              Подать заявку
            </Link>
          </div>
        </div>
      </div>

      {/* Terms bar */}
      <div style={{ backgroundColor: '#003332' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="text-sm font-semibold" style={{ color: 'rgba(255,240,204,0.60)' }}>Доступные сроки:</span>
            {TERMS.map(t => (
              <div key={t.months} className="flex items-center gap-1.5 px-4 py-1.5 rounded-full"
                style={{ backgroundColor: 'rgba(255,240,204,0.15)', border: '1px solid rgba(255,240,204,0.30)' }}>
                <span className="text-sm font-bold" style={{ color: '#FFF0CC' }}>{t.months} мес.</span>
                <span className="text-xs" style={{ color: 'rgba(255,240,204,0.55)' }}>{t.rate}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#16685B' }}>Популярные категории</p>
            <h2 className="text-3xl font-extrabold" style={{ color: '#0D1F1D' }}>Что можно купить в рассрочку</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.map(c => (
              <Link key={c.name} href="/catalog"
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-white transition-shadow hover:shadow-md"
                style={{ border: '1px solid #16685B' }}>
                <div className="mb-3">{c.emoji}</div>
                <h3 className="text-sm font-extrabold mb-1" style={{ color: '#0D1F1D' }}>{c.name}</h3>
                <p className="text-xs font-semibold" style={{ color: '#004445' }}>{c.sub}</p>
                <p className="text-xs mt-1" style={{ color: '#4A6B67' }}>{c.count}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator */}
      <CalculatorSection defaultProduct="phone" />

      {/* Documents */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#16685B' }}>Что нужно</p>
            <h2 className="text-3xl font-extrabold mb-2" style={{ color: '#0D1F1D' }}>Минимум документов</h2>
            <p className="text-sm" style={{ color: '#4A6B67' }}>Обязательные документы отмечены звёздочкой</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {DOCS.map(d => (
              <div key={d.label} className="flex items-start gap-4 p-4 rounded-xl"
                style={{ backgroundColor: '#FFFFFF', border: '1px solid #16685B' }}>
                <div className="shrink-0">{d.icon}</div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#0D1F1D' }}>
                    {d.label}{d.req && <span style={{ color: '#C62828' }}> *</span>}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: '#4A6B67' }}>
                    {d.req ? 'Обязательный документ' : 'При необходимости'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: '#003332' }} className="py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-4" style={{ color: '#FFF0CC' }}>
            Выберите товар и оформите рассрочку
          </h2>
          <p className="text-base mb-8" style={{ color: 'rgba(255,240,204,0.70)' }}>
            Более 200 товаров от ведущих брендов уже доступны — выберите нужное и оформите рассрочку онлайн
          </p>
          <Link href="/catalog"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-xl text-base font-bold"
            style={{ backgroundColor: '#FFF0CC', color: '#004445' }}>
            Смотреть каталог
          </Link>
        </div>
      </section>
    </div>
  );
}
