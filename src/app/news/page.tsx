'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Send, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

type Category = 'Все' | 'Ценностное финансирование' | 'Гиды и советы';

interface Localized {
  date: string;
  title: string;
  excerpt: string;
  body: string;
}

interface Article {
  id: number;
  category: Exclude<Category, 'Все'>;
  ru: Localized;
  uz: Localized;
}

const ARTICLES: Article[] = [
  {
    id: 1,
    category: 'Ценностное финансирование',
    ru: {
      date: '10 июля 2025',
      title: 'Рынок ценностного финансирования растёт в Центральной Азии',
      excerpt: 'Спрос на прозрачные, беспроцентные модели финансирования — лизинг, рассрочку и инвестиционные партнёрства — устойчиво растёт в регионе...',
      body: 'Спрос на прозрачные, беспроцентные модели финансирования — лизинг, рассрочку и инвестиционные партнёрства — устойчиво растёт в регионе. Клиенты всё чаще выбирают схемы без скрытых комиссий и переплат, где условия фиксируются заранее и не меняются в процессе выплат. Это особенно заметно в сегменте автотранспорта и потребительской электроники.',
    },
    uz: {
      date: '2025-yil 10-iyul',
      title: "Markaziy Osiyoda qadriyatlarga asoslangan moliyalashtirish bozori o'smoqda",
      excerpt: "Mintaqada shaffof, foizsiz moliyalashtirish modellariga — lizing, muddatli to'lov va investitsiya hamkorligiga — talab barqaror o'smoqda...",
      body: "Mintaqada shaffof, foizsiz moliyalashtirish modellariga — lizing, muddatli to'lov va investitsiya hamkorligiga — talab barqaror o'smoqda. Mijozlar tobora ko'proq yashirin komissiyasiz, oldindan belgilangan va to'lov jarayonida o'zgarmaydigan shartlarni tanlamoqda. Bu ayniqsa avtotransport va iste'mol elektronikasi segmentida sezilarli.",
    },
  },
  {
    id: 2,
    category: 'Ценностное финансирование',
    ru: {
      date: '2 июля 2025',
      title: 'Как рассрочка помогает малому бизнесу расти',
      excerpt: 'Для многих небольших компаний покупка техники или транспорта за наличные — непосильная нагрузка на оборотный капитал...',
      body: 'Для многих небольших компаний покупка техники или транспорта за наличные — непосильная нагрузка на оборотный капитал. Рассрочка и лизинг позволяют получить нужное оборудование сразу, распределив платежи на удобный срок, без залога личного имущества владельца бизнеса.',
    },
    uz: {
      date: '2025-yil 2-iyul',
      title: "Muddatli to'lov kichik biznesga qanday yordam beradi",
      excerpt: "Ko'plab kichik kompaniyalar uchun texnika yoki transportni naqd pulga sotib olish aylanma mablag'ga og'ir yuk bo'ladi...",
      body: "Ko'plab kichik kompaniyalar uchun texnika yoki transportni naqd pulga sotib olish aylanma mablag'ga og'ir yuk bo'ladi. Muddatli to'lov va lizing kerakli jihozni darhol olish imkonini beradi, to'lovlarni qulay muddatga taqsimlab, biznes egasining shaxsiy mulkini garovga qo'ymasdan.",
    },
  },
  {
    id: 3,
    category: 'Гиды и советы',
    ru: {
      date: '24 июня 2025',
      title: 'На что обратить внимание при выборе автомобиля в лизинг',
      excerpt: 'При выборе авто в лизинг важно смотреть не только на ежемесячный платёж, но и на итоговую переплату...',
      body: 'При выборе авто в лизинг важно смотреть не только на ежемесячный платёж, но и на итоговую переплату, условия досрочного погашения и момент перехода права собственности. Разные схемы регистрации — на покупателя сразу или после полной выплаты — влияют на условия использования автомобиля в переходный период.',
    },
    uz: {
      date: '2025-yil 24-iyun',
      title: "Lizingga avtomobil tanlashda nimalarga e'tibor berish kerak",
      excerpt: "Lizingga avtomobil tanlashda nafaqat oylik to'lovga, balki umumiy ustama, muddatidan oldin to'lash shartlariga ham e'tibor berish muhim...",
      body: "Lizingga avtomobil tanlashda nafaqat oylik to'lovga, balki umumiy ustama, muddatidan oldin to'lash shartlari va mulk huquqi o'tish vaqtiga ham e'tibor berish muhim. Ro'yxatga olishning turli sxemalari — darhol xaridor nomiga yoki to'liq to'langandan keyin — o'tish davrida avtomobildan foydalanish shartlariga ta'sir qiladi.",
    },
  },
  {
    id: 4,
    category: 'Гиды и советы',
    ru: {
      date: '16 июня 2025',
      title: 'Трейд-ин: как обменять старый автомобиль на новый без доплаты наличными',
      excerpt: 'Схема трейд-ин позволяет зачесть стоимость имеющегося автомобиля в счёт первоначального взноса за новый...',
      body: 'Схема трейд-ин позволяет зачесть стоимость имеющегося автомобиля в счёт первоначального взноса за новый — оценка занимает один день, а разницу можно оформить в лизинг или рассрочку. Это особенно удобно для тех, кто хочет обновить автомобиль без необходимости продавать старый самостоятельно.',
    },
    uz: {
      date: '2025-yil 16-iyun',
      title: "Trade-in: eski avtomobilni naqd pulsiz yangisiga qanday almashtirish mumkin",
      excerpt: "Trade-in sxemasi mavjud avtomobil qiymatini yangisi uchun boshlang'ich to'lov hisobiga kiritish imkonini beradi...",
      body: "Trade-in sxemasi mavjud avtomobil qiymatini yangisi uchun boshlang'ich to'lov hisobiga kiritish imkonini beradi — baholash bir kun davom etadi, farqni esa lizing yoki muddatli to'lovga rasmiylashtirish mumkin. Bu ayniqsa eski avtomobilni mustaqil sotishni istamaydiganlar uchun qulay.",
    },
  },
];

const CATEGORIES: Category[] = ['Все', 'Ценностное финансирование', 'Гиды и советы'];

const CATEGORY_ACCENT: Record<Exclude<Category, 'Все'>, string> = {
  'Ценностное финансирование': '#548870',
  'Гиды и советы': '#16685B',
};

type Lang = 'ru' | 'uz';

const CATEGORY_LABEL: Record<Lang, Record<Category, string>> = {
  ru: {
    'Все': 'Все',
    'Ценностное финансирование': 'Ценностное финансирование',
    'Гиды и советы': 'Гиды и советы',
  },
  uz: {
    'Все': 'Barchasi',
    'Ценностное финансирование': 'Qadriyatli moliyalashtirish',
    'Гиды и советы': "Qo'llanmalar va maslahatlar",
  },
};

const UI: Record<Lang, {
  breadcrumbHome: string; breadcrumbNews: string;
  eyebrow: string; title: string; subtitle: string; readMore: string;
  subTitle: string; subText: string; telegram: string;
}> = {
  ru: {
    breadcrumbHome: 'Главная', breadcrumbNews: 'Новости',
    eyebrow: 'Блог и новости', title: 'Новости и статьи',
    subtitle: 'Ценностное финансирование и полезные материалы',
    readMore: 'Читать далее →',
    subTitle: 'Подпишитесь на новости',
    subText: 'Узнавайте первыми об акциях и новых продуктах',
    telegram: 'Telegram канал',
  },
  uz: {
    breadcrumbHome: 'Bosh sahifa', breadcrumbNews: 'Yangiliklar',
    eyebrow: 'Blog va yangiliklar', title: 'Yangiliklar va maqolalar',
    subtitle: 'Qadriyatli moliyalashtirish va foydali materiallar',
    readMore: 'Batafsil →',
    subTitle: "Yangiliklarga obuna bo'ling",
    subText: "Aksiyalar va yangi mahsulotlar haqida birinchi bo'lib biling",
    telegram: 'Telegram kanal',
  },
};

function ArticleModal({ article, onClose }: { article: Article; onClose: () => void }) {
  const { lang } = useLanguage();
  const d = article[lang as Lang];
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(13,31,29,0.65)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-white p-8"
        style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-150 cursor-pointer"
          style={{ backgroundColor: '#FFFFFF', color: '#4A6B67' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FFF0CC')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
        >
          <X size={16} />
        </button>

        <span
          className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4"
          style={{ backgroundColor: `${CATEGORY_ACCENT[article.category]}18`, color: CATEGORY_ACCENT[article.category] }}
        >
          {CATEGORY_LABEL[lang as Lang][article.category]}
        </span>

        <p className="text-xs mb-3" style={{ color: '#4A6B67' }}>{d.date}</p>
        <h2 className="text-xl font-extrabold mb-5 leading-snug" style={{ color: '#0D1F1D' }}>{d.title}</h2>

        <div className="text-sm leading-relaxed whitespace-pre-line" style={{ color: '#4A6B67' }}>
          {d.body}
        </div>
      </div>
    </div>
  );
}

function ArticleCard({ article, onRead }: { article: Article; onRead: () => void }) {
  const { lang } = useLanguage();
  const d = article[lang as Lang];
  const accent = CATEGORY_ACCENT[article.category];
  return (
    <div
      className="bg-white rounded-xl flex flex-col overflow-hidden"
      style={{
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        border: '1px solid #16685B',
        borderTop: `3px solid ${accent}`,
      }}
    >
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div className="flex items-center justify-between">
          <span
            className="px-2.5 py-0.5 rounded-full text-xs font-bold"
            style={{ backgroundColor: `${accent}18`, color: accent }}
          >
            {CATEGORY_LABEL[lang as Lang][article.category]}
          </span>
          <span className="text-xs" style={{ color: '#4A6B67' }}>{d.date}</span>
        </div>
        <h3 className="text-sm font-extrabold leading-snug" style={{ color: '#004445' }}>
          {d.title}
        </h3>
        <p className="text-sm leading-relaxed flex-1" style={{ color: '#4A6B67' }}>
          {d.excerpt}
        </p>
        <button
          onClick={onRead}
          className="text-sm font-bold text-left transition-colors duration-150 cursor-pointer w-fit"
          style={{ color: '#16685B' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#004445')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#16685B')}
        >
          {UI[lang as Lang].readMore}
        </button>
      </div>
    </div>
  );
}

export default function NewsPage() {
  const { lang } = useLanguage();
  const ui = UI[lang as Lang];
  const [activeCategory, setActiveCategory] = useState<Category>('Все');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const filtered = activeCategory === 'Все'
    ? ARTICLES
    : ARTICLES.filter((a) => a.category === activeCategory);

  return (
    <div>
      {/* Hero */}
      <div style={{ backgroundColor: '#004445' }} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-1.5 mb-5 text-xs" style={{ color: 'rgba(255,240,204,0.55)' }}>
            <Link href="/" style={{ color: 'rgba(255,240,204,0.55)' }}>{ui.breadcrumbHome}</Link>
            <span>›</span>
            <span style={{ color: '#FFF0CC' }}>{ui.breadcrumbNews}</span>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#FFF0CC' }}>
            {ui.eyebrow}
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ color: '#FFF0CC' }}>
            {ui.title}
          </h1>
          <p className="text-lg" style={{ color: 'rgba(255,240,204,0.75)', maxWidth: 480 }}>
            {ui.subtitle}
          </p>
        </div>
      </div>

      {/* Category filter */}
      <div style={{ backgroundColor: '#003332', borderBottom: '1px solid rgba(255,240,204,0.10)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer"
                  style={{
                    backgroundColor: active ? '#FFF0CC' : 'rgba(255,240,204,0.10)',
                    color: active ? '#0D1F1D' : 'rgba(255,240,204,0.75)',
                    border: `1px solid ${active ? '#FFF0CC' : 'transparent'}`,
                  }}
                >
                  {CATEGORY_LABEL[lang as Lang][cat]}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Articles grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onRead={() => setSelectedArticle(article)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <section style={{ backgroundColor: '#004445' }} className="py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-extrabold mb-2" style={{ color: '#FFF0CC' }}>
            {ui.subTitle}
          </h2>
          <p className="text-sm mb-8" style={{ color: 'rgba(255,240,204,0.70)' }}>
            {ui.subText}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://t.me/belvest_info"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-bold transition-all duration-150"
              style={{ backgroundColor: '#FFF0CC', color: '#004445' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFF0CC')}
            >
              <Send size={16} />
              {ui.telegram}
            </a>
            <a
              href="https://www.instagram.com/belvest.uz/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold border transition-all duration-150"
              style={{ borderColor: 'rgba(255,240,204,0.40)', color: '#FFF0CC' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,240,204,0.08)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <InstagramIcon size={16} />
              Instagram
            </a>
          </div>
        </div>
      </section>

      {/* Article modal */}
      {selectedArticle && (
        <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
      )}
    </div>
  );
}
