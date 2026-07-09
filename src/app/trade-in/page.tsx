'use client';

import { useState } from 'react';
import Link from 'next/link';

function fmt(n: number) {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

const CATEGORIES = [
  { id: 'phone', emoji: '📱', name: 'Смартфон',      basePrice: 3_000_000 },
  { id: 'car',   emoji: '🚗', name: 'Автомобиль',    basePrice: 15_000_000 },
  { id: 'other', emoji: '📦', name: 'Другие товары', basePrice: 3_500_000 },
];

const CONDITIONS = [
  { id: 'excellent', label: 'Отличное',           mult: 1.0, desc: 'Как новый, без царапин' },
  { id: 'good',      label: 'Хорошее',            mult: 0.7, desc: 'Небольшие следы использования' },
  { id: 'fair',      label: 'Удовлетворительное', mult: 0.4, desc: 'Заметные царапины, потёртости' },
];

const HOW_STEPS = [
  { n: 1, title: 'Оцените товар онлайн',  sub: 'Выберите категорию и состояние — получите предварительную стоимость за секунду' },
  { n: 2, title: 'Привезите в офис',      sub: 'Наш специалист проверит товар и подтвердит или скорректирует оценку' },
  { n: 3, title: 'Получите скидку',       sub: 'Стоимость трейд-ин засчитывается как скидка при покупке нового товара' },
];

export default function TradeInPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCondition, setSelectedCondition] = useState<string>('good');
  const [ownPrice, setOwnPrice] = useState(3_000_000);

  const category = CATEGORIES.find(c => c.id === selectedCategory);
  const condition = CONDITIONS.find(c => c.id === selectedCondition)!;
  const estimatedValue = category
    ? Math.round(category.basePrice * condition.mult)
    : Math.round(ownPrice * condition.mult);

  return (
    <div>
      {/* Hero */}
      <div style={{ backgroundColor: '#004445' }} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-1.5 mb-5 text-xs" style={{ color: 'rgba(255,240,204,0.55)' }}>
            <Link href="/" style={{ color: 'rgba(255,240,204,0.55)' }}>Главная</Link>
            <span>›</span>
            <span style={{ color: '#FFF0CC' }}>Трейд-ин</span>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#C9A84C' }}>
            Обмен старого на новое
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ color: '#FFF0CC', maxWidth: 580 }}>
            Обменяйте старое на новое
          </h1>
          <p className="text-lg mb-8" style={{ color: 'rgba(255,240,204,0.75)', maxWidth: 480 }}>
            Сдайте ваш старый товар и получите скидку на покупку нового — быстро, честно, выгодно
          </p>
          <Link href="/apply?service=tradein"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-sm font-bold"
            style={{ backgroundColor: '#C9A84C', color: '#0D1F1D' }}>
            Оценить мой товар
          </Link>
        </div>
      </div>

      {/* Interactive Estimator */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#C9A84C' }}>Онлайн-оценка</p>
            <h2 className="text-3xl font-extrabold" style={{ color: '#0D1F1D' }}>Узнайте стоимость вашего товара</h2>
            <p className="text-sm mt-2" style={{ color: '#4A6B67' }}>Предварительная оценка — точная стоимость после осмотра в офисе</p>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8" style={{ border: '1px solid #16685B', boxShadow: '0 2px 20px rgba(0,0,0,0.07)' }}>
            {/* Category selection */}
            <div className="mb-7">
              <p className="text-sm font-semibold mb-3" style={{ color: '#0D1F1D' }}>1. Выберите категорию товара</p>
              <div className="grid grid-cols-3 gap-3">
                {CATEGORIES.map(cat => {
                  const active = selectedCategory === cat.id;
                  return (
                    <button key={cat.id}
                      onClick={() => setSelectedCategory(active ? null : cat.id)}
                      className="flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all"
                      style={{
                        border: `2px solid ${active ? '#C9A84C' : '#16685B'}`,
                        backgroundColor: active ? 'rgba(201,168,76,0.07)' : '#fff',
                      }}>
                      <span className="text-2xl">{cat.emoji}</span>
                      <span className="text-xs font-semibold text-center" style={{ color: active ? '#0D1F1D' : '#4A6B67' }}>
                        {cat.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Condition */}
            <div className="mb-7">
              <p className="text-sm font-semibold mb-3" style={{ color: '#0D1F1D' }}>2. Состояние товара</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {CONDITIONS.map(cond => {
                  const active = selectedCondition === cond.id;
                  return (
                    <button key={cond.id}
                      onClick={() => setSelectedCondition(cond.id)}
                      className="flex flex-col items-start gap-0.5 px-4 py-3 rounded-xl text-left transition-all"
                      style={{
                        border: `2px solid ${active ? '#004445' : '#16685B'}`,
                        backgroundColor: active ? 'rgba(0,68,69,0.05)' : '#fff',
                      }}>
                      <span className="text-sm font-bold" style={{ color: active ? '#004445' : '#0D1F1D' }}>
                        {cond.label}
                      </span>
                      <span className="text-xs" style={{ color: '#4A6B67' }}>{cond.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price slider (when no category selected) */}
            {!selectedCategory && (
              <div className="mb-7">
                <div className="flex justify-between text-sm mb-2">
                  <span style={{ color: '#4A6B67' }}>Примерная стоимость товара</span>
                  <span className="font-bold" style={{ color: '#004445' }}>{fmt(ownPrice)} сум</span>
                </div>
                <input
                  type="range"
                  min={500_000}
                  max={30_000_000}
                  step={500_000}
                  value={ownPrice}
                  onChange={e => setOwnPrice(Number(e.target.value))}
                  className="belvest-slider w-full"
                  style={{
                    background: `linear-gradient(to right, #C9A84C ${((ownPrice - 500_000) / (30_000_000 - 500_000)) * 100}%, #16685B 0%)`,
                  }}
                />
                <div className="flex justify-between text-xs mt-1" style={{ color: '#9CA3AF' }}>
                  <span>500 000</span>
                  <span>30 000 000</span>
                </div>
              </div>
            )}

            {/* Result */}
            <div className="rounded-xl p-5 flex items-center justify-between gap-4"
              style={{ backgroundColor: '#FFFFFF', border: '1px solid #16685B' }}>
              <div>
                <p className="text-sm" style={{ color: '#4A6B67' }}>Предварительная оценка трейд-ин</p>
                <p className="text-3xl font-extrabold mt-0.5" style={{ color: '#004445' }}>
                  {fmt(estimatedValue)} <span className="text-base font-semibold">сум</span>
                </p>
                <p className="text-xs mt-1" style={{ color: '#4A6B67' }}>
                  Скидка при покупке нового товара · {condition.label.toLowerCase()} состояние
                </p>
              </div>
              <Link href="/apply?service=tradein"
                className="shrink-0 px-5 py-2.5 rounded-xl text-sm font-bold"
                style={{ backgroundColor: '#C9A84C', color: '#0D1F1D' }}>
                Оформить
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#003332' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#C9A84C' }}>Как это работает</p>
            <h2 className="text-3xl font-extrabold" style={{ color: '#FFF0CC' }}>Три шага к новому товару</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_STEPS.map(s => (
              <div key={s.n} className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-extrabold mb-4"
                  style={{ backgroundColor: '#C9A84C', color: '#0D1F1D' }}>
                  {s.n}
                </div>
                <h3 className="text-sm font-extrabold mb-2" style={{ color: '#FFF0CC' }}>{s.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,240,204,0.60)' }}>{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accepted categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#C9A84C' }}>Принимаем</p>
          <h2 className="text-3xl font-extrabold mb-3" style={{ color: '#0D1F1D' }}>Какие товары мы принимаем</h2>
          <p className="text-sm mb-10" style={{ color: '#4A6B67' }}>
            Принимаем технику и электронику в любом состоянии — оценка бесплатна
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {CATEGORIES.map(c => (
              <div key={c.id} className="flex items-center gap-2 px-5 py-3 rounded-xl"
                style={{ backgroundColor: '#FFFFFF', border: '1px solid #16685B' }}>
                <span className="text-xl">{c.emoji}</span>
                <span className="text-sm font-semibold" style={{ color: '#0D1F1D' }}>{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: '#004445' }} className="py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-4" style={{ color: '#FFF0CC' }}>
            Оцените ваш товар прямо сейчас
          </h2>
          <p className="text-base mb-8" style={{ color: 'rgba(255,240,204,0.70)' }}>
            Приезжайте в наш офис или оставьте заявку — оценим бесплатно за 15 минут
          </p>
          <Link href="/apply?service=tradein"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-xl text-base font-bold"
            style={{ backgroundColor: '#C9A84C', color: '#0D1F1D' }}>
            Оценить мой товар
          </Link>
        </div>
      </section>
    </div>
  );
}
