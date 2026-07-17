'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const FAQS_BY_LANG: Record<'ru' | 'uz', { q: string; a: string }[]> = {
  ru: [
    {
      q: 'Чем Belvest отличается от обычного банка?',
      a: 'Belvest работает по принципу финансирования, основанного на ценностях. Мы не начисляем проценты — вместо этого используем фиксированную наценку (Мурабаха) или аренду с правом выкупа (Иджара). Полная стоимость известна до подписания договора и не меняется.',
    },
    {
      q: 'Что такое Мурабаха?',
      a: 'Мурабаха — структура финансирования с фиксированной наценкой. Мы покупаем товар и продаём вам по заранее согласованной цене. Наценка известна с самого начала и не увеличивается. Никаких процентов.',
    },
    {
      q: 'Есть ли скрытые платежи?',
      a: 'Нет. Полная стоимость фиксируется при оформлении и указывается в договоре. Никаких скрытых комиссий или изменения суммы в процессе выплат.',
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
  ],
  uz: [
    {
      q: 'Belvest oddiy bankdan nimasi bilan farq qiladi?',
      a: "Belvest qadriyatlarga asoslangan moliyalashtirish tamoyili asosida ishlaydi. Biz foiz undirmaymiz — buning o'rniga qat'iy ustama (Murabaha) yoki sotib olish huquqi bilan ijara (Ijara) qo'llaymiz. To'liq narx shartnoma imzolanishidan oldin ma'lum bo'ladi va o'zgarmaydi.",
    },
    {
      q: 'Murabaha nima?',
      a: "Murabaha — qat'iy ustamali moliyalashtirish tuzilmasi. Biz tovarni sotib olamiz va sizga oldindan kelishilgan narxda sotamiz. Ustama boshidanoq ma'lum va oshmaydi. Hech qanday foiz yo'q.",
    },
    {
      q: "Yashirin to'lovlar bormi?",
      a: "Yo'q. To'liq narx rasmiylashtirishda qat'iylashtiriladi va shartnomada ko'rsatiladi. To'lovlar davomida hech qanday yashirin komissiya yoki summa o'zgarishi yo'q.",
    },
    {
      q: 'Qanday hujjatlar kerak?',
      a: "O'zbekiston fuqarosining pasporti, PINFL, daromad to'g'risidagi ma'lumotnoma. Yuridik shaxslar uchun: ustav, ro'yxatdan o'tkanlik guvohnomasi.",
    },
    {
      q: "Muddatidan oldin to'lash mumkinmi?",
      a: "Ha, muddatidan oldin to'lash istalgan vaqtda jarimasiz amalga oshiriladi.",
    },
    {
      q: "Ariza qancha vaqt ko'rib chiqiladi?",
      a: "Odatda 1 ish kuni. Murakkab holatlar — 3 kungacha.",
    },
    {
      q: 'Yashirin komissiyalar bormi?',
      a: "Yo'q. To'liq narx ariza rasmiylashtirishda ko'rsatiladi. Hech qanday yashirin to'lovlar yo'q.",
    },
  ],
};

const FAQ_UI: Record<'ru' | 'uz', Record<string, string>> = {
  ru: {
    home: 'Главная',
    label: 'Вопросы и ответы',
    title: 'Часто задаваемые вопросы',
    subtitle: 'Всё о наших продуктах и финансировании, основанном на ценностях',
    ctaTitle: 'Остались вопросы?',
    ctaSub: 'Наши специалисты ответят на любые вопросы',
    ctaBtn: 'Связаться с нами',
  },
  uz: {
    home: 'Bosh sahifa',
    label: 'Savol va javoblar',
    title: "Ko'p so'raladigan savollar",
    subtitle: 'Mahsulotlarimiz va qadriyatlarga asoslangan moliyalashtirish haqida hammasi',
    ctaTitle: 'Savollaringiz qoldimi?',
    ctaSub: 'Mutaxassislarimiz har qanday savolga javob beradi',
    ctaBtn: "Biz bilan bog'lanish",
  },
};

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#004445"
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
  const { lang } = useLanguage();
  const FAQS = FAQS_BY_LANG[lang];
  const L = FAQ_UI[lang];
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div>
      {/* Hero */}
      <div style={{ backgroundColor: '#004445' }} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-1.5 mb-5 text-xs" style={{ color: 'rgba(255,240,204,0.55)' }}>
            <Link href="/" style={{ color: 'rgba(255,240,204,0.55)' }}>{L.home}</Link>
            <span>›</span>
            <span style={{ color: '#FFF0CC' }}>FAQ</span>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#FFF0CC' }}>
            {L.label}
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ color: '#FFF0CC' }}>
            {L.title}
          </h1>
          <p className="text-lg" style={{ color: 'rgba(255,240,204,0.75)', maxWidth: 480 }}>
            {L.subtitle}
          </p>
        </div>
      </div>

      {/* Accordion */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-3xl mx-auto flex flex-col gap-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden"
              style={{ border: '1px solid #16685B' }}
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
                        backgroundColor: '#FFFFFF',
                        borderTop: '1px solid #16685B',
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
      <section style={{ backgroundColor: '#003332' }} className="py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-extrabold mb-3" style={{ color: '#FFF0CC' }}>
            {L.ctaTitle}
          </h2>
          <p className="text-sm mb-6" style={{ color: 'rgba(255,240,204,0.70)' }}>
            {L.ctaSub}
          </p>
          <Link
            href="/contacts"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold"
            style={{ backgroundColor: '#FFF0CC', color: '#004445' }}
          >
            {L.ctaBtn}
          </Link>
        </div>
      </section>
    </div>
  );
}
