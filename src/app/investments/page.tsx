'use client';

import { useState } from 'react';
import Link from 'next/link';

function fmt(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

const PLANS = [
  {
    id: 'base',
    name: 'Базовый',
    minAmount: 5_000_000,
    rate: 12,
    termMin: 6,
    termMax: 12,
    recommended: false,
    features: [
      'Минимальная сумма от 5 000 000 сум',
      'Ежемесячное распределение прибыли',
      'Досрочный вывод через 3 месяца',
      'Онлайн-управление через личный кабинет',
    ],
  },
  {
    id: 'standard',
    name: 'Стандарт',
    minAmount: 20_000_000,
    rate: 15,
    termMin: 12,
    termMax: 24,
    recommended: true,
    features: [
      'Минимальная сумма от 20 000 000 сум',
      'Ежеквартальная или ежемесячная выплата',
      'Прогнозируемая прибыль: от 15%',
      'Персональный менеджер',
      'Досрочный вывод через 6 месяцев',
    ],
  },
  {
    id: 'premium',
    name: 'Премиум',
    minAmount: 50_000_000,
    rate: 18,
    termMin: 24,
    termMax: 36,
    recommended: false,
    features: [
      'Минимальная сумма от 50 000 000 сум',
      'Прогнозируемая прибыль: от 18%',
      'Гибкий выбор периодичности выплат',
      'Приоритетное обслуживание',
      'Эксклюзивные условия для VIP-клиентов',
      'Налоговое сопровождение',
    ],
  },
];

const FAQS = [
  {
    q: 'Как начать инвестировать с Belvest?',
    a: 'Оставьте заявку через форму на сайте или в офисе. Наш менеджер свяжется с вами, расскажет об условиях и поможет выбрать подходящий план. Вся процедура занимает 1–2 рабочих дня.',
  },
  {
    q: 'Застрахованы ли мои вложения?',
    a: 'Belvest работает в соответствии с законодательством Республики Узбекистан. Средства клиентов используются исключительно для финансирования лизинговых и рассрочных сделок, обеспеченных реальным имуществом. Подробнее об условиях — у вашего менеджера.',
  },
  {
    q: 'Как выплачивается прибыль?',
    a: 'Периодичность выплат зависит от выбранного плана: ежемесячно, ежеквартально или по истечении срока. Средства поступают на ваш банковский счёт или карту в оговорённые даты.',
  },
  {
    q: 'Можно ли досрочно вывести средства?',
    a: 'Да, досрочный вывод возможен после минимального срока хранения (3–6 месяцев в зависимости от плана). При досрочном выводе прибыль пересчитывается по условиям базового тарифа за фактический срок.',
  },
];

const STATS = [
  { value: 'до 18%', label: 'Прогн. прибыль (Мудараба)' },
  { value: '3+ лет', label: 'На рынке Узбекистана' },
  { value: '500+', label: 'Активных инвесторов' },
  { value: '1 день', label: 'Срок оформления' },
];

export default function InvestmentsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div>
      {/* Hero */}
      <div style={{ backgroundColor: '#004445' }} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-1.5 mb-5 text-xs" style={{ color: 'rgba(255,240,204,0.55)' }}>
            <Link href="/" style={{ color: 'rgba(255,240,204,0.55)' }}>Главная</Link>
            <span>›</span>
            <span style={{ color: '#FFF0CC' }}>Инвестиции</span>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#C9A84C' }}>
            Доходные вложения
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ color: '#FFF0CC', maxWidth: 600 }}>
            Инвестируйте с Belvest
          </h1>
          <p className="text-lg mb-8" style={{ color: 'rgba(255,240,204,0.75)', maxWidth: 500 }}>
            Участвуйте в распределении прибыли до 18% в год по принципам Мудараба — прозрачно и этично
          </p>
          <Link href="/apply?service=investment"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-sm font-bold"
            style={{ backgroundColor: '#C9A84C', color: '#0D1F1D' }}>
            Стать инвестором
          </Link>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ backgroundColor: '#003332' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map(s => (
            <div key={s.label} className="text-center">
              <p className="text-xl font-extrabold" style={{ color: '#C9A84C' }}>{s.value}</p>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(255,240,204,0.60)' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Plans */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#C9A84C' }}>Инвестиционные планы</p>
            <h2 className="text-3xl font-extrabold" style={{ color: '#0D1F1D' }}>Мудараба — Партнёрские инвестиции</h2>
            <p className="text-xs mt-3" style={{ color: '#4A6B67' }}>
              Доходность не гарантирована. Структура Мудараба — разделение прибыли
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANS.map(plan => (
              <div key={plan.id}
                className="bg-white rounded-2xl p-6 flex flex-col relative"
                style={{
                  border: plan.recommended ? '2px solid #C9A84C' : '1px solid #16685B',
                  boxShadow: plan.recommended ? '0 4px 24px rgba(201,168,76,0.15)' : '0 1px 8px rgba(0,0,0,0.05)',
                }}>
                {plan.recommended && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold"
                    style={{ backgroundColor: '#C9A84C', color: '#0D1F1D' }}>
                    Рекомендуем
                  </div>
                )}
                <h3 className="text-lg font-extrabold mb-1" style={{ color: '#0D1F1D' }}>{plan.name}</h3>
                <p className="text-xs mb-4" style={{ color: '#4A6B67' }}>
                  от {fmt(plan.minAmount)} сум
                </p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-extrabold" style={{ color: '#004445' }}>{plan.rate}%</span>
                  <span className="text-sm" style={{ color: '#4A6B67' }}>прогн. прибыль</span>
                </div>
                <p className="text-xs mb-5" style={{ color: '#4A6B67' }}>
                  Срок: {plan.termMin}–{plan.termMax} месяцев
                </p>
                <ul className="flex flex-col gap-2 mb-6 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-xs" style={{ color: '#4A6B67' }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5">
                        <circle cx="7" cy="7" r="7" fill={plan.recommended ? '#C9A84C' : '#004445'} opacity="0.12"/>
                        <path d="M4 7l2 2 4-4" stroke={plan.recommended ? '#C9A84C' : '#004445'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/apply?service=investment"
                  className="block text-center py-2.5 rounded-xl text-sm font-bold"
                  style={plan.recommended
                    ? { backgroundColor: '#C9A84C', color: '#0D1F1D' }
                    : { border: '1.5px solid #004445', color: '#004445', backgroundColor: 'transparent' }
                  }>
                  Подробнее
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#C9A84C' }}>Вопросы и ответы</p>
            <h2 className="text-3xl font-extrabold" style={{ color: '#0D1F1D' }}>Часто задаваемые вопросы</h2>
          </div>
          <div className="flex flex-col gap-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="rounded-xl overflow-hidden"
                style={{ border: '1px solid #16685B' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                  style={{ backgroundColor: openFaq === i ? '#FFFFFF' : '#fff' }}>
                  <span className="text-sm font-semibold pr-4" style={{ color: '#0D1F1D' }}>{faq.q}</span>
                  <svg
                    width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="#004445" strokeWidth="2" strokeLinecap="round"
                    style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-5 py-4 text-sm leading-relaxed"
                    style={{ color: '#4A6B67', backgroundColor: '#FFFFFF', borderTop: '1px solid #16685B' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: '#003332' }} className="py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-4" style={{ color: '#FFF0CC' }}>
            Готовы начать инвестировать?
          </h2>
          <p className="text-base mb-8" style={{ color: 'rgba(255,240,204,0.70)' }}>
            Оставьте заявку — наш менеджер расскажет о деталях и поможет выбрать оптимальный план
          </p>
          <Link href="/apply?service=investment"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-xl text-base font-bold"
            style={{ backgroundColor: '#C9A84C', color: '#0D1F1D' }}>
            Стать инвестором
          </Link>
        </div>
      </section>
    </div>
  );
}
