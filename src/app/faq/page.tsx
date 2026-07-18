'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const FAQS_BY_LANG: Record<'ru' | 'uz', { q: string; a: string }[]> = {
  ru: [
    {
      q: 'Есть ли вмешательство банка?',
      a: 'Средства привлекаются от учредителя и инвесторов.',
    },
    {
      q: 'Есть ли пени и штрафы?',
      a: 'Пени и штрафов нет.',
    },
    {
      q: 'Что будет, если я не оплачу ежемесячный платёж вовремя?',
      a: 'Необходимо предупредить организацию за 1-2 дня. Однако такая ситуация не может носить систематический характер.',
    },
    {
      q: 'Договор заключается на условиях купли-продажи в рассрочку (насия)?',
      a: 'Да, договор заключается на условиях купли-продажи в рассрочку (насия) и проверен квалифицированными юристами.',
    },
    {
      q: 'Как мы можем вам доверять?',
      a: 'Мы дорожим удовлетворённостью наших клиентов и после окончания срока переоформляем автомобиль на их имя без лишних хлопот.',
    },
    {
      q: 'Вы переоформите автомобиль на моё имя?',
      a: 'Это зависит от первоначального взноса за автомобиль и от собеседования с вами.',
    },
    {
      q: 'Можем ли мы сами выбрать автомобиль?',
      a: 'Да, конечно, вы можете выбрать у нас или в любом другом автосалоне по вашему желанию.',
    },
    {
      q: 'Можете ли вы сами подобрать автомобиль для меня?',
      a: 'Многие наши клиенты из-за нехватки времени в большинстве случаев доверяют это нам. В этом случае мы уточняем у клиента, какой автомобиль, цвет, пробег и подобные детали, а затем предлагаем несколько вариантов исходя из запроса.',
    },
    {
      q: 'Есть ли у вас автомобили в продаже?',
      a: 'На нашей стоянке есть автомобили разных типов, и вы можете не только оформить их в рассрочку, но и купить за наличные — это значит, что цены конкурентоспособны.',
    },
    {
      q: 'Есть ли услуга Trade-in?',
      a: 'Да, есть: мы оцениваем ваш автомобиль, и если цена вас устраивает, мы его выкупаем, после чего вы можете оформить Trade-in на автомобиль, который есть у нас.',
    },
    {
      q: 'Можете ли вы продать мою машину?',
      a: 'Конечно, у нас есть услуга продажи, и она бесплатна.',
    },
    {
      q: 'У вас цены на автомобили выше рыночных?',
      a: 'Наоборот, цены ниже рыночных, чтобы оставаться конкурентоспособными.',
    },
    {
      q: 'Процент — это харам? Странный вопрос.',
      a: 'Понятие процента не всегда означает ростовщичество. Процент означает 1/100 часть чего-либо. В Belvest вы можете приобрести автомобиль в рассрочку с годовой наценкой 22%.',
    },
  ],
  uz: [
    {
      q: "Bank aralashuvi yo'qmi?",
      a: 'Pul tasischi, investorlar tarafidan jalb qilingan.',
    },
    {
      q: "Peni va jarimalar yo'qmi?",
      a: "Peni va jarimalar yo'q.",
    },
    {
      q: "Oylik to'lovni vaqtida to'lamasam nima bo'ladi?",
      a: "Tashkilotni 1 yoki 2 kun oldin ogohlantirish zarur. Faqat bu holat surunkali bo'lishi mumkin emas.",
    },
    {
      q: 'Shartnoma Nasiya savdo shartlari asosida tuziladimi?',
      a: "Ha, Shartnoma Nasiya savdo shartlari asosida tuzilgan va malakali yuristlar tarafidan ham o'rganib chiqilgan.",
    },
    {
      q: 'Sizlarga qanday ishonishimiz mumkin?',
      a: "Bizni, xaridorlarimiz mamnunligi va muddat tugagach mashinalarini nomlariga ortiqcha bosh og'riqsiz rasmiylashtirib berishimizdan.",
    },
    {
      q: "Avtomobilni nomimizga o'tkazib berasizmi?",
      a: "Avtomobilni boshlang'ich to'lovi va siz bilan o'tadigan suhbatga bog'liq.",
    },
    {
      q: "Avtomobilni o'zimiz tanlasak bo'ladimi?",
      a: 'Ha, albatta siz bizdan yoki boshqa istagan avtosalondan tanlashingiz mumkin.',
    },
    {
      q: "Avtomobilni o'zingiz tanlab berolasizmi?",
      a: "Ko'p mijozlarimiz vaqti yo'qligi sababidan bu ishni aksar holatlarda bizga ishonib topshirishadi. Bunda mijozdan aniqlik bilan qanday avto, rangi, bosib o'tgan masofasi va shunga o'xshash savollarni berib aniqlab, so'ngra talabga qarab bir nechta takliflar beramiz.",
    },
    {
      q: "O'zingizda sotuvda avtomobillar bormi?",
      a: "Avtoparkimizda har xil turdagi avtomobillar mavjud, bizdan nafaqat bo'lib to'lashga, balki naqd savdoga ham olsangiz bo'ladi, bu degani narxlar raqobatdoshdir.",
    },
    {
      q: 'Trade-in xizmati bormi?',
      a: "Ha bor, bunda biz avtomobilingizni narxlab sizga maqul bo'lsa sotib olamiz, so'ngra bizdagi turgan avtomobilga Trade-in qilishingiz mumkin bo'ladi.",
    },
    {
      q: 'Mashinamni sotib bera olasizmi?',
      a: 'Albatta, bizda sotib berish xizmati bor va u tekin.',
    },
    {
      q: 'Sizlarda avtomobil narxlari bozordan qimmatmi?',
      a: "Aksincha, raqobatdosh bo'lish maqsadida narxlar bozordan arzonroq.",
    },
    {
      q: 'Foiz haromku. Tajubli savol.',
      a: "Foiz tushunchasi har doim sudxo'rlik ma'nosini anglatmaydi. Foiz biror narsaning 1/100 qismi degan ma'noni anglatadi. Belvestda yillik 22% ustama bilan bo'lib to'lashga avtomobil xarid qilishingiz mumkin.",
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
