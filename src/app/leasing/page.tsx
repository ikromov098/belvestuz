import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Лизинг (Иджара) — Belvest',
  description: 'Финансовая аренда оборудования, техники и транспорта для бизнеса в Узбекистане. Без залога, без дополнительных платежей.',
};

// fmt helper for numbers with spaces as thousands separator
function fmt(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

const STEPS = [
  { n: 1, title: 'Выберите имущество', sub: 'Оборудование, технику, транспорт или недвижимость — любое имущество для вашего бизнеса' },
  { n: 2, title: 'Подайте заявку', sub: 'Заполните онлайн-форму за 5 минут, приложите документы компании' },
  { n: 3, title: 'Одобрение за 2 часа', sub: 'Наш специалист рассмотрит заявку и свяжется с вами для уточнения деталей' },
  { n: 4, title: 'Получите имущество', sub: 'Подпишите договор лизинга и сразу начните использовать имущество' },
];

const BENEFITS = [
  {
    title: 'Без залога',
    sub: 'Само лизинговое имущество является обеспечением по договору. Не нужно закладывать собственные активы.',
    icon: '🔓',
  },
  {
    title: 'Без дополнительных платежей',
    sub: 'Полная сумма фиксируется при подписании договора. Никаких скрытых комиссий или неожиданных платежей.',
    icon: '✅',
  },
  {
    title: 'Гибкий график',
    sub: 'Сезонные, нерегулярные или ступенчатые платежи — подстроим под денежный поток вашего бизнеса.',
    icon: '📅',
  },
];

const FOR_BUSINESS = [
  'Производственное оборудование',
  'Строительная и спецтехника',
  'Коммерческий транспорт',
  'Медицинское оборудование',
  'Торговое оборудование',
  'IT-инфраструктура',
];

const FOR_IP = [
  'Офисная и торговая техника',
  'Легковой и грузовой транспорт',
  'Сельскохозяйственная техника',
  'Оборудование для услуг',
];

const STATS = [
  { value: `от ${fmt(500_000)} сум/мес`, label: 'Минимальный платёж' },
  { value: '12–60 мес.', label: 'Срок лизинга' },
  { value: '2 часа', label: 'Срок одобрения' },
  { value: 'Маржа Мурабаха от 22%', label: 'Прибыльная маржа' },
];

export default function LeasingPage() {
  return (
    <div>
      {/* Hero */}
      <div style={{ backgroundColor: '#004445' }} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-1.5 mb-5 text-xs" style={{ color: 'rgba(255,240,204,0.55)' }}>
            <Link href="/" style={{ color: 'rgba(255,240,204,0.55)' }}>Главная</Link>
            <span>›</span>
            <span style={{ color: '#FFF0CC' }}>Лизинг</span>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#FFF0CC' }}>
            Финансовая аренда
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ color: '#FFF0CC', maxWidth: 640 }}>
            Лизинг (Иджара) для вашего бизнеса
          </h1>
          <p className="text-lg mb-8" style={{ color: 'rgba(255,240,204,0.75)', maxWidth: 500 }}>
            Получите оборудование, технику или автомобиль без крупных вложений — платите удобными частями
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/apply?service=leasing"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-sm font-bold"
              style={{ backgroundColor: '#FFF0CC', color: '#004445' }}>
              Подать заявку на лизинг
            </Link>
            <Link href="/catalog?service=Лизинг"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-sm font-semibold border"
              style={{ borderColor: 'rgba(255,240,204,0.40)', color: '#FFF0CC' }}>
              Смотреть каталог
            </Link>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ backgroundColor: '#003332' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map(s => (
            <div key={s.label} className="text-center">
              <p className="text-xl font-extrabold" style={{ color: '#FFF0CC' }}>{s.value}</p>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(255,240,204,0.60)' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#16685B' }}>Как это работает</p>
            <h2 className="text-3xl font-extrabold" style={{ color: '#0D1F1D' }}>Четыре шага до получения имущества</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {STEPS.map((s, i) => (
              <div key={s.n} className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-extrabold mb-4 relative"
                  style={{ backgroundColor: '#004445', color: '#FFF0CC' }}>
                  {s.n}
                  {i < STEPS.length - 1 && (
                    <div className="hidden md:block absolute left-full top-1/2 w-full h-0.5 -translate-y-1/2"
                      style={{ backgroundColor: 'rgba(0,68,69,0.20)', marginLeft: 8 }} />
                  )}
                </div>
                <h3 className="text-sm font-extrabold mb-2" style={{ color: '#0D1F1D' }}>{s.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: '#4A6B67' }}>{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#16685B' }}>Преимущества</p>
            <h2 className="text-3xl font-extrabold" style={{ color: '#0D1F1D' }}>Почему лизинг выгоднее кредита</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BENEFITS.map(b => (
              <div key={b.title} className="rounded-2xl p-6"
                style={{ backgroundColor: '#FFFFFF', border: '1px solid #16685B' }}>
                <div className="text-4xl mb-4">{b.icon}</div>
                <h3 className="text-base font-extrabold mb-2" style={{ color: '#0D1F1D' }}>{b.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#4A6B67' }}>{b.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#16685B' }}>Кому подходит</p>
            <h2 className="text-3xl font-extrabold" style={{ color: '#0D1F1D' }}>Лизинг для каждого бизнеса</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Для бизнеса */}
            <div className="bg-white rounded-2xl p-7" style={{ border: '1px solid #16685B' }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: '#004445' }}>
                  <span className="text-lg">🏢</span>
                </div>
                <div>
                  <h3 className="font-extrabold" style={{ color: '#0D1F1D' }}>Для юридических лиц</h3>
                  <p className="text-xs" style={{ color: '#4A6B67' }}>ООО, АО, производственные компании</p>
                </div>
              </div>
              <ul className="flex flex-col gap-2.5">
                {FOR_BUSINESS.map(item => (
                  <li key={item} className="flex items-center gap-2.5 text-sm" style={{ color: '#0D1F1D' }}>
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: 'rgba(0,68,69,0.10)' }}>
                      <svg width="10" height="10" viewBox="0 0 12 10" fill="none">
                        <path d="M1 5l3.5 3.5L11 1" stroke="#004445" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Для ИП */}
            <div className="bg-white rounded-2xl p-7" style={{ border: '1px solid #16685B' }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: '#548870' }}>
                  <span className="text-lg">👤</span>
                </div>
                <div>
                  <h3 className="font-extrabold" style={{ color: '#0D1F1D' }}>Для ИП и самозанятых</h3>
                  <p className="text-xs" style={{ color: '#4A6B67' }}>Индивидуальные предприниматели</p>
                </div>
              </div>
              <ul className="flex flex-col gap-2.5">
                {FOR_IP.map(item => (
                  <li key={item} className="flex items-center gap-2.5 text-sm" style={{ color: '#0D1F1D' }}>
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: 'rgba(84,136,112,0.15)' }}>
                      <svg width="10" height="10" viewBox="0 0 12 10" fill="none">
                        <path d="M1 5l3.5 3.5L11 1" stroke="#004445" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: '#003332' }} className="py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-4" style={{ color: '#FFF0CC' }}>
            Готовы начать?
          </h2>
          <p className="text-base mb-8" style={{ color: 'rgba(255,240,204,0.70)' }}>
            Оставьте заявку — наш специалист свяжется с вами в течение 2 часов и подберёт оптимальные условия
          </p>
          <Link href="/apply?service=leasing"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-xl text-base font-bold"
            style={{ backgroundColor: '#FFF0CC', color: '#004445' }}>
            Подать заявку на лизинг
          </Link>
        </div>
      </section>
    </div>
  );
}
