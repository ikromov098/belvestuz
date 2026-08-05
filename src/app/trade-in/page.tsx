'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Smartphone, Car, Home, Package } from 'lucide-react';

// Fixed trade-in categories. This selector must stay restricted to these four —
// it feeds a manual evaluation, unlike the free-text product fields on /apply.
const CATEGORIES = [
  { id: 'phone',      emoji: <Smartphone size={24} style={{ color: '#004445' }} /> },
  { id: 'car',        emoji: <Car size={24} style={{ color: '#004445' }} /> },
  { id: 'realestate', emoji: <Home size={24} style={{ color: '#004445' }} /> },
  { id: 'other',      emoji: <Package size={24} style={{ color: '#004445' }} /> },
];

const T = {
  ru: {
    catName: { phone: 'Телефоны', car: 'Автомобили', realestate: 'Недвижимость', other: 'Другое' } as Record<string, string>,
    steps: [
      { title: 'Выберите категорию', sub: 'Укажите, что хотите сдать, и оставьте заявку — это займёт минуту' },
      { title: 'Оценка в офисе', sub: 'Наш специалист осмотрит товар и назовёт точную стоимость трейд-ин' },
      { title: 'Получите скидку', sub: 'Стоимость трейд-ин засчитывается как скидка при покупке нового товара' },
    ],
    home: 'Главная', crumb: 'Трейд-ин',
    heroLabel: 'Обмен старого на новое', heroTitle: 'Обменяйте старое на новое',
    heroSub: 'Сдайте ваш старый товар и получите скидку на покупку нового — быстро, честно, выгодно',
    heroCta: 'Оставить заявку',
    estLabel: 'Заявка на трейд-ин', leadTitle: 'Что хотите сдать?',
    leadSub: 'Выберите категорию и оставьте заявку — оценим бесплатно после осмотра в офисе',
    whatToTrade: 'Что хотите сдать',
    apply: 'Оставить заявку',
    hiwLabel: 'Как это работает', hiwTitle: 'Три шага к новому товару',
    acceptLabel: 'Принимаем', acceptTitle: 'Какие товары мы принимаем',
    acceptSub: 'Принимаем технику и электронику в любом состоянии — оценка бесплатна',
    ctaTitle: 'Оцените ваш товар прямо сейчас', ctaSub: 'Приезжайте в наш офис или оставьте заявку — оценим бесплатно за 15 минут',
    ctaBtn: 'Оставить заявку', cur: 'сум',
  },
  uz: {
    catName: { phone: 'Telefonlar', car: 'Avtomobillar', realestate: "Ko'chmas mulk", other: 'Boshqa' } as Record<string, string>,
    steps: [
      { title: 'Toifani tanlang', sub: "Nimani topshirmoqchi ekaningizni belgilang va ariza qoldiring — bir daqiqa vaqt oladi" },
      { title: 'Ofisda baholash', sub: "Mutaxassisimiz tovarni ko'rikdan o'tkazadi va aniq trade-in qiymatini aytadi" },
      { title: 'Chegirmani oling', sub: 'Trade-in qiymati yangi tovar sotib olishda chegirma sifatida hisobga olinadi' },
    ],
    home: 'Bosh sahifa', crumb: 'Treyd-in',
    heroLabel: 'Eskisini yangisiga almashtiring', heroTitle: 'Eskisini yangisiga almashtiring',
    heroSub: 'Eski tovaringizni topshiring va yangisini sotib olishda chegirma oling — tez, halol, foydali',
    heroCta: 'Ariza qoldirish',
    estLabel: 'Trade-in uchun ariza', leadTitle: 'Nimani topshirmoqchisiz?',
    leadSub: "Toifani tanlang va ariza qoldiring — ofisda ko'rikdan keyin bepul baholaymiz",
    whatToTrade: 'Nimani topshirmoqchisiz',
    apply: 'Ariza qoldirish',
    hiwLabel: 'Bu qanday ishlaydi', hiwTitle: 'Yangi tovargacha uch qadam',
    acceptLabel: 'Qabul qilamiz', acceptTitle: 'Qanday tovarlarni qabul qilamiz',
    acceptSub: 'Texnika va elektronikani istalgan holatda qabul qilamiz — baholash bepul',
    ctaTitle: 'Tovaringizni hoziroq baholang', ctaSub: 'Ofisimizga keling yoki ariza qoldiring — 15 daqiqada bepul baholaymiz',
    ctaBtn: 'Ariza qoldirish', cur: "so'm",
  },
};

export default function TradeInPage() {
  const { lang } = useLanguage();
  const L = T[lang];
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div>
      {/* Hero */}
      <div style={{ backgroundColor: '#004445' }} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-1.5 mb-5 text-xs" style={{ color: 'rgba(255,240,204,0.55)' }}>
            <Link href="/" style={{ color: 'rgba(255,240,204,0.55)' }}>{L.home}</Link>
            <span>›</span>
            <span style={{ color: '#FFF0CC' }}>{L.crumb}</span>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#FFF0CC' }}>
            {L.heroLabel}
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ color: '#FFF0CC', maxWidth: 580 }}>
            {L.heroTitle}
          </h1>
          <p className="text-lg mb-8" style={{ color: 'rgba(255,240,204,0.75)', maxWidth: 480 }}>
            {L.heroSub}
          </p>
          <Link href="/apply?service=tradein"
            className="depth-btn inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-sm font-bold"
            style={{ backgroundColor: '#FFF0CC', color: '#004445' }}>
            {L.heroCta}
          </Link>
        </div>
      </div>

      {/* Trade-in request — pick a fixed category, then continue to the lead form */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#16685B' }}>{L.estLabel}</p>
            <h2 className="text-3xl font-extrabold" style={{ color: '#0D1F1D' }}>{L.leadTitle}</h2>
            <p className="text-sm mt-2" style={{ color: '#4A6B67' }}>{L.leadSub}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8" style={{ border: '1px solid #16685B', boxShadow: '0 2px 20px rgba(0,0,0,0.07)' }}>
            <p className="text-sm font-semibold mb-3" style={{ color: '#0D1F1D' }}>{L.whatToTrade}</p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {CATEGORIES.map(cat => {
                const active = selectedCategory === cat.id;
                return (
                  <button key={cat.id}
                    onClick={() => setSelectedCategory(active ? null : cat.id)}
                    className="flex items-center gap-2.5 p-3.5 rounded-xl text-left transition-all"
                    style={{
                      border: `2px solid ${active ? '#004445' : '#16685B'}`,
                      backgroundColor: active ? 'rgba(84,136,112,0.10)' : '#fff',
                    }}>
                    <span className="shrink-0">{cat.emoji}</span>
                    <span className="text-sm font-semibold" style={{ color: active ? '#0D1F1D' : '#4A6B67' }}>
                      {L.catName[cat.id]}
                    </span>
                  </button>
                );
              })}
            </div>
            <Link
              href={selectedCategory ? `/apply?service=tradein&category=${selectedCategory}` : '/apply?service=tradein'}
              className="block w-full text-center px-5 py-3 rounded-xl text-sm font-bold"
              style={{ backgroundColor: '#004445', color: '#FFFFFF' }}>
              {L.apply}
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#003332' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#FFF0CC' }}>{L.hiwLabel}</p>
            <h2 className="text-3xl font-extrabold" style={{ color: '#FFF0CC' }}>{L.hiwTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {L.steps.map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-extrabold mb-4"
                  style={{ backgroundColor: '#FFF0CC', color: '#004445' }}>
                  {i + 1}
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
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#16685B' }}>{L.acceptLabel}</p>
          <h2 className="text-3xl font-extrabold mb-3" style={{ color: '#0D1F1D' }}>{L.acceptTitle}</h2>
          <p className="text-sm mb-10" style={{ color: '#4A6B67' }}>
            {L.acceptSub}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {CATEGORIES.map(c => (
              <div key={c.id} className="flex items-center gap-2 px-5 py-3 rounded-xl"
                style={{ backgroundColor: '#FFFFFF', border: '1px solid #16685B' }}>
                <span>{c.emoji}</span>
                <span className="text-sm font-semibold" style={{ color: '#0D1F1D' }}>{L.catName[c.id]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: '#004445' }} className="py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-4" style={{ color: '#FFF0CC' }}>
            {L.ctaTitle}
          </h2>
          <p className="text-base mb-8" style={{ color: 'rgba(255,240,204,0.70)' }}>
            {L.ctaSub}
          </p>
          <Link href="/apply?service=tradein"
            className="depth-btn inline-flex items-center gap-2 px-10 py-4 rounded-xl text-base font-bold"
            style={{ backgroundColor: '#FFF0CC', color: '#004445' }}>
            {L.ctaBtn}
          </Link>
        </div>
      </section>
    </div>
  );
}
