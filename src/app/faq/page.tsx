'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
  {
    q: 'Является ли Belvest халяль?',
    a: 'Да. Все наши продукты проверены Шариатским советом. Мы не используем Риба (проценты). Наши продукты основаны на Мурабаха и Иджара.',
  },
  {
    q: 'Что такое Мурабаха?',
    a: 'Мурабаха — исламская структура финансирования. Мы покупаем товар и продаём вам по фиксированной цене с наценкой. Никаких процентов.',
  },
  {
    q: 'Чем отличается от банка?',
    a: 'Банк даёт деньги под проценты (Риба). Мы покупаем товар и передаём вам — без процентов, по принципу Мурабаха.',
  },
  {
    q: 'Какие документы нужны?',
    a: 'Паспорт гражданина Узбекистана, ПИНФЛ, справка о доходах. Для юр. лиц: устав, свидетельство о регистрации.',
  },
  {
    q: 'Можно ли погасить досрочно?',
    a: 'Да, досрочное погашение возможно в любой момент без штрафов.',
  },
  {
    q: 'Как долго рассматривается заявка?',
    a: 'Обычно 1 рабочий день. Сложные случаи — до 3 дней.',
  },
  {
    q: 'Есть ли скрытые комиссии?',
    a: 'Нет. Полная стоимость указывается при оформлении заявки. Никаких скрытых платежей.',
  },
];

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0D5C54"
      strokeWidth="2"
      strokeLinecap="round"
      style={{
        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.25s ease',
        flexShrink: 0,
      }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div>
      {/* Hero */}
      <div style={{ backgroundColor: '#0D5C54' }} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-1.5 mb-5 text-xs" style={{ color: 'rgba(232,223,200,0.55)' }}>
            <Link href="/" style={{ color: 'rgba(232,223,200,0.55)' }}>Главная</Link>
            <span>›</span>
            <span style={{ color: '#E8DFC8' }}>FAQ</span>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#C9A84C' }}>
            Вопросы и ответы
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ color: '#E8DFC8' }}>
            Часто задаваемые вопросы
          </h1>
          <p className="text-lg" style={{ color: 'rgba(232,223,200,0.75)', maxWidth: 480 }}>
            Всё, что вы хотели знать о наших продуктах и исламских финансах
          </p>
        </div>
      </div>

      {/* Accordion */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#F4EFE4' }}>
        <div className="max-w-3xl mx-auto flex flex-col gap-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden"
              style={{ border: '1px solid #D4C9B0' }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer"
                style={{ backgroundColor: open === i ? '#fff' : '#fff' }}
              >
                <span className="text-sm font-semibold pr-4" style={{ color: '#0D1F1D' }}>
                  {faq.q}
                </span>
                <ChevronIcon open={open === i} />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div
                      className="px-5 py-4 text-sm leading-relaxed"
                      style={{
                        color: '#4A6B67',
                        backgroundColor: '#F4EFE4',
                        borderTop: '1px solid #D4C9B0',
                      }}
                    >
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: '#094840' }} className="py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-extrabold mb-3" style={{ color: '#E8DFC8' }}>
            Остались вопросы?
          </h2>
          <p className="text-sm mb-6" style={{ color: 'rgba(232,223,200,0.70)' }}>
            Наши специалисты ответят на любые вопросы
          </p>
          <Link
            href="/contacts"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold"
            style={{ backgroundColor: '#C9A84C', color: '#0D1F1D' }}
          >
            Связаться с нами
          </Link>
        </div>
      </section>
    </div>
  );
}
