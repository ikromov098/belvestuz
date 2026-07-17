'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

function fmt(n: number) {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

const CATEGORIES = [
  { id: 'phone', emoji: '📱', basePrice: 3_000_000 },
  { id: 'car',   emoji: '🚗', basePrice: 15_000_000 },
  { id: 'other', emoji: '📦', basePrice: 3_500_000 },
];

const CONDITIONS = [
  { id: 'excellent', mult: 1.0 },
  { id: 'good',      mult: 0.7 },
  { id: 'fair',      mult: 0.4 },
];

const T = {
  ru: {
    catName: { phone: 'Смартфон', car: 'Автомобиль', other: 'Другие товары' } as Record<string, string>,
    condLabel: { excellent: 'Отличное', good: 'Хорошее', fair: 'Удовлетворительное' } as Record<string, string>,
    condDesc: {
      excellent: 'Как новый, без царапин',
      good: 'Небольшие следы использования',
      fair: 'Заметные царапины, потёртости',
    } as Record<string, string>,
    steps: [
      { title: 'Оцените товар онлайн', sub: 'Выберите категорию и состояние — получите предварительную стоимость за секунду' },
      { title: 'Привезите в офис', sub: 'Наш специалист проверит товар и подтвердит или скорректирует оценку' },
      { title: 'Получите скидку', sub: 'Стоимость трейд-ин засчитывается как скидка при покупке нового товара' },
    ],
    home: 'Главная', crumb: 'Трейд-ин',
    heroLabel: 'Обмен старого на новое', heroTitle: 'Обменяйте старое на новое',
    heroSub: 'Сдайте ваш старый товар и получите скидку на покупку нового — быстро, честно, выгодно',
    heroCta: 'Оценить мой товар',
    estLabel: 'Онлайн-оценка', estTitle: 'Узнайте стоимость вашего товара',
    estSub: 'Предварительная оценка — точная стоимость после осмотра в офисе',
    step1: '1. Выберите категорию товара', step2: '2. Состояние товара',
    ownValue: 'Примерная стоимость товара',
    resultLabel: 'Предварительная оценка трейд-ин', resultNote: 'Скидка при покупке нового товара', stateWord: 'состояние',
    apply: 'Оформить',
    hiwLabel: 'Как это работает', hiwTitle: 'Три шага к новому товару',
    acceptLabel: 'Принимаем', acceptTitle: 'Какие товары мы принимаем',
    acceptSub: 'Принимаем технику и электронику в любом состоянии — оценка бесплатна',
    ctaTitle: 'Оцените ваш товар прямо сейчас', ctaSub: 'Приезжайте в наш офис или оставьте заявку — оценим бесплатно за 15 минут',
    ctaBtn: 'Оценить мой товар', cur: 'сум',
  },
  uz: {
    catName: { phone: 'Smartfon', car: 'Avtomobil', other: 'Boshqa tovarlar' } as Record<string, string>,
    condLabel: { excellent: "A'lo", good: 'Yaxshi', fair: 'Qoniqarli' } as Record<string, string>,
    condDesc: {
      excellent: 'Yangidek, tirnalishsiz',
      good: 'Foydalanishning kichik izlari',
      fair: 'Sezilarli tirnalishlar, ishqalanishlar',
    } as Record<string, string>,
    steps: [
      { title: 'Tovarni onlayn baholang', sub: "Toifa va holatni tanlang — bir soniyada dastlabki qiymatni oling" },
      { title: 'Ofisga olib keling', sub: 'Mutaxassisimiz tovarni tekshiradi va bahoni tasdiqlaydi yoki tuzatadi' },
      { title: 'Chegirmani oling', sub: 'Trade-in qiymati yangi tovar sotib olishda chegirma sifatida hisobga olinadi' },
    ],
    home: 'Bosh sahifa', crumb: 'Treyd-in',
    heroLabel: 'Eskisini yangisiga almashtiring', heroTitle: 'Eskisini yangisiga almashtiring',
    heroSub: 'Eski tovaringizni topshiring va yangisini sotib olishda chegirma oling — tez, halol, foydali',
    heroCta: 'Tovarimni baholash',
    estLabel: 'Onlayn baholash', estTitle: 'Tovaringiz qiymatini bilib oling',
    estSub: "Dastlabki baholash — aniq qiymat ofisda ko'rikdan keyin",
    step1: '1. Tovar toifasini tanlang', step2: '2. Tovar holati',
    ownValue: 'Tovarning taxminiy qiymati',
    resultLabel: 'Trade-in dastlabki bahosi', resultNote: 'Yangi tovar sotib olishda chegirma', stateWord: 'holat',
    apply: 'Rasmiylashtirish',
    hiwLabel: 'Bu qanday ishlaydi', hiwTitle: 'Yangi tovargacha uch qadam',
    acceptLabel: 'Qabul qilamiz', acceptTitle: 'Qanday tovarlarni qabul qilamiz',
    acceptSub: 'Texnika va elektronikani istalgan holatda qabul qilamiz — baholash bepul',
    ctaTitle: 'Tovaringizni hoziroq baholang', ctaSub: 'Ofisimizga keling yoki ariza qoldiring — 15 daqiqada bepul baholaymiz',
    ctaBtn: 'Tovarimni baholash', cur: "so'm",
  },
};

export default function TradeInPage() {
  const { lang } = useLanguage();
  const L = T[lang];
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
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-sm font-bold"
            style={{ backgroundColor: '#FFF0CC', color: '#004445' }}>
            {L.heroCta}
          </Link>
        </div>
      </div>

      {/* Interactive Estimator */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#16685B' }}>{L.estLabel}</p>
            <h2 className="text-3xl font-extrabold" style={{ color: '#0D1F1D' }}>{L.estTitle}</h2>
            <p className="text-sm mt-2" style={{ color: '#4A6B67' }}>{L.estSub}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8" style={{ border: '1px solid #16685B', boxShadow: '0 2px 20px rgba(0,0,0,0.07)' }}>
            {/* Category selection */}
            <div className="mb-7">
              <p className="text-sm font-semibold mb-3" style={{ color: '#0D1F1D' }}>{L.step1}</p>
              <div className="grid grid-cols-3 gap-3">
                {CATEGORIES.map(cat => {
                  const active = selectedCategory === cat.id;
                  return (
                    <button key={cat.id}
                      onClick={() => setSelectedCategory(active ? null : cat.id)}
                      className="flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all"
                      style={{
                        border: `2px solid ${active ? '#004445' : '#16685B'}`,
                        backgroundColor: active ? 'rgba(84,136,112,0.10)' : '#fff',
                      }}>
                      <span className="text-2xl">{cat.emoji}</span>
                      <span className="text-xs font-semibold text-center" style={{ color: active ? '#0D1F1D' : '#4A6B67' }}>
                        {L.catName[cat.id]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Condition */}
            <div className="mb-7">
              <p className="text-sm font-semibold mb-3" style={{ color: '#0D1F1D' }}>{L.step2}</p>
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
                        {L.condLabel[cond.id]}
                      </span>
                      <span className="text-xs" style={{ color: '#4A6B67' }}>{L.condDesc[cond.id]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price slider (when no category selected) */}
            {!selectedCategory && (
              <div className="mb-7">
                <div className="flex justify-between text-sm mb-2">
                  <span style={{ color: '#4A6B67' }}>{L.ownValue}</span>
                  <span className="font-bold" style={{ color: '#004445' }}>{fmt(ownPrice)} {L.cur}</span>
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
                    background: `linear-gradient(to right, #004445 ${((ownPrice - 500_000) / (30_000_000 - 500_000)) * 100}%, #16685B 0%)`,
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
                <p className="text-sm" style={{ color: '#4A6B67' }}>{L.resultLabel}</p>
                <p className="text-3xl font-extrabold mt-0.5" style={{ color: '#004445' }}>
                  {fmt(estimatedValue)} <span className="text-base font-semibold">{L.cur}</span>
                </p>
                <p className="text-xs mt-1" style={{ color: '#4A6B67' }}>
                  {L.resultNote} · {L.condLabel[selectedCondition].toLowerCase()} {L.stateWord}
                </p>
              </div>
              <Link href="/apply?service=tradein"
                className="shrink-0 px-5 py-2.5 rounded-xl text-sm font-bold"
                style={{ backgroundColor: '#004445', color: '#FFFFFF' }}>
                {L.apply}
              </Link>
            </div>
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
                <span className="text-xl">{c.emoji}</span>
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
            className="inline-flex items-center gap-2 px-10 py-4 rounded-xl text-base font-bold"
            style={{ backgroundColor: '#FFF0CC', color: '#004445' }}>
            {L.ctaBtn}
          </Link>
        </div>
      </section>
    </div>
  );
}
