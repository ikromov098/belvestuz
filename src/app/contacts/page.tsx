'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Phone, Send, MapPin, CheckCircle, Clock } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

function InstagramIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

const T = {
  ru: {
    home: 'Главная', crumb: 'Контакты', heroLabel: 'Контакты',
    heroTitle: 'Мы всегда на связи', heroSub: 'Свяжитесь с нами любым удобным способом — ответим быстро',
    cardLabels: { phone: 'Телефон', telegram: 'Telegram', instagram: 'Instagram', address: 'Адрес' } as Record<string, string>,
    addressValue: 'Ташкент, Узбекистан',
    fbLabel: 'Обратная связь', fbTitle: 'Напишите нам',
    thanks: 'Спасибо!', thanksSub: 'Мы свяжемся с вами в течение 1 рабочего дня',
    name: 'Имя', namePh: 'Ваше имя', phone: 'Телефон', phonePh: '77 480-99-99',
    topic: 'Тема', topicPh: 'Выберите тему...', message: 'Сообщение', messagePh: 'Опишите ваш вопрос...',
    submit: 'Отправить сообщение', errorFill: 'Пожалуйста, заполните все поля',
    topics: ['Рассрочка', 'Лизинг', 'Трейд-ин', 'Инвестиции', 'Другое'],
    mapTitle: 'Belvest на карте', hoursLabel: 'График', hoursTitle: 'Режим работы',
    days: ['Ежедневно'],
    times: ['9:00-18:00'],
  },
  uz: {
    home: 'Bosh sahifa', crumb: 'Kontaktlar', heroLabel: 'Kontaktlar',
    heroTitle: 'Biz doim aloqadamiz', heroSub: "Biz bilan istalgan qulay usulda bog'laning — tez javob beramiz",
    cardLabels: { phone: 'Telefon', telegram: 'Telegram', instagram: 'Instagram', address: 'Manzil' } as Record<string, string>,
    addressValue: "Toshkent, O'zbekiston",
    fbLabel: 'Qayta aloqa', fbTitle: 'Bizga yozing',
    thanks: 'Rahmat!', thanksSub: "Biz siz bilan 1 ish kuni ichida bog'lanamiz",
    name: 'Ism', namePh: 'Ismingiz', phone: 'Telefon', phonePh: '77 480-99-99',
    topic: 'Mavzu', topicPh: 'Mavzuni tanlang...', message: 'Xabar', messagePh: 'Savolingizni yozing...',
    submit: 'Xabar yuborish', errorFill: "Iltimos, barcha maydonlarni to'ldiring",
    topics: ['Nasiya savdo', 'Lizing', 'Treyd-in', 'Investitsiyalar', 'Boshqa'],
    mapTitle: 'Belvest xaritada', hoursLabel: 'Jadval', hoursTitle: 'Ish rejimi',
    days: ['Har kuni'],
    times: ['9:00-18:00'],
  },
};

function AddressText() {
  const { lang } = useLanguage();
  return <>{T[lang].addressValue}</>;
}

const CONTACT_CARDS = [
  {
    icon: <Phone size={24} />,
    label: 'phone',
    content: (
      <div className="flex flex-col gap-1">
        <a href="tel:+998774809999" className="text-sm font-bold transition-colors duration-150 contact-phone">
          +998 77 480-99-99
        </a>
        <a href="tel:+998774802222" className="text-sm font-bold transition-colors duration-150 contact-phone">
          +998 77 480-22-22
        </a>
      </div>
    ),
  },
  {
    icon: <Send size={24} />,
    label: 'telegram',
    content: (
      <a
        href="https://t.me/belvest_info"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-bold transition-colors duration-150 contact-link"
      >
        @belvest_info
      </a>
    ),
  },
  {
    icon: <InstagramIcon size={24} />,
    label: 'instagram',
    content: (
      <a
        href="https://www.instagram.com/belvest.uz/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-bold transition-colors duration-150 contact-link"
      >
        @belvest.uz
      </a>
    ),
  },
  {
    icon: <MapPin size={24} />,
    label: 'address',
    content: (
      <a
        href="#map"
        className="text-sm font-bold transition-colors duration-150 contact-link"
      >
        <AddressText />
      </a>
    ),
  },
];

export default function ContactsPage() {
  const { lang } = useLanguage();
  const L = T[lang];
  const TOPICS = L.topics;
  const HOURS = L.days.map((day, i) => ({ day, time: L.times[i], closed: i === 2 }));
  const [form, setForm] = useState({ name: '', phone: '', topic: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.topic || !form.message.trim()) {
      setError(L.errorFill);
      return;
    }
    setError('');
    setSubmitted(true);
  };

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
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ color: '#FFF0CC' }}>
            {L.heroTitle}
          </h1>
          <p className="text-lg" style={{ color: 'rgba(255,240,204,0.75)', maxWidth: 480 }}>
            {L.heroSub}
          </p>
        </div>
      </div>

      {/* Contact cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CONTACT_CARDS.map((card) => (
              <div
                key={card.label}
                className="bg-white rounded-2xl p-5 flex flex-col gap-3"
                style={{ border: '1px solid #16685B', boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: 'rgba(0,68,69,0.10)', color: '#004445' }}
                >
                  {card.icon}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#4A6B67' }}>
                    {L.cardLabels[card.label]}
                  </p>
                  {card.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#16685B' }}>
              {L.fbLabel}
            </p>
            <h2 className="text-3xl font-extrabold" style={{ color: '#0D1F1D' }}>
              {L.fbTitle}
            </h2>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                style={{ backgroundColor: 'rgba(0,68,69,0.10)' }}
              >
                <CheckCircle size={36} style={{ color: '#004445' }} />
              </div>
              <h3 className="text-xl font-extrabold mb-2" style={{ color: '#0D1F1D' }}>{L.thanks}</h3>
              <p className="text-sm" style={{ color: '#4A6B67', maxWidth: 340 }}>
                {L.thanksSub}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold" style={{ color: '#4A6B67' }}>{L.name}</label>
                  <input
                    type="text"
                    placeholder={L.namePh}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="px-4 py-2.5 rounded-lg text-sm outline-none"
                    style={{ border: '1px solid #16685B', backgroundColor: '#FFFFFF', color: '#0D1F1D' }}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold" style={{ color: '#4A6B67' }}>{L.phone}</label>
                  <div className="flex rounded-lg overflow-hidden" style={{ border: '1px solid #16685B' }}>
                    <span
                      className="px-3 flex items-center text-sm font-semibold shrink-0"
                      style={{ backgroundColor: '#E8E0D0', color: '#4A6B67', borderRight: '1px solid #16685B' }}
                    >
                      +998
                    </span>
                    <input
                      type="tel"
                      placeholder="77 480-99-99"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="flex-1 px-3 py-2.5 text-sm outline-none"
                      style={{ backgroundColor: '#FFFFFF', color: '#0D1F1D' }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold" style={{ color: '#4A6B67' }}>{L.topic}</label>
                <select
                  value={form.topic}
                  onChange={(e) => setForm({ ...form, topic: e.target.value })}
                  className="px-4 py-2.5 rounded-lg text-sm outline-none cursor-pointer"
                  style={{
                    border: '1px solid #16685B',
                    backgroundColor: '#FFFFFF',
                    color: form.topic ? '#0D1F1D' : '#4A6B67',
                  }}
                >
                  <option value="" disabled>{L.topicPh}</option>
                  {TOPICS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold" style={{ color: '#4A6B67' }}>{L.message}</label>
                <textarea
                  rows={4}
                  placeholder={L.messagePh}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="px-4 py-2.5 rounded-lg text-sm outline-none resize-none"
                  style={{ border: '1px solid #16685B', backgroundColor: '#FFFFFF', color: '#0D1F1D' }}
                />
              </div>

              {error && (
                <p className="text-sm font-semibold" style={{ color: '#C62828' }}>{error}</p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl text-sm font-bold transition-all duration-150 cursor-pointer"
                style={{ backgroundColor: '#004445', color: '#FFFFFF' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#16685B')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#004445')}
              >
                {L.submit}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Yandex Map */}
      <section id="map" className="py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#FFFFFF', scrollMarginTop: 80 }}>
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl overflow-hidden" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.10)' }}>
            <iframe
              src="https://yandex.uz/map-widget/v1/org/8069766461/?ll=69.253505,41.329161&z=16"
              width="100%"
              height="400"
              frameBorder={0}
              allowFullScreen
              style={{ display: 'block' }}
              title={L.mapTitle}
            />
          </div>
        </div>
      </section>

      {/* Working hours */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: 'rgba(0,68,69,0.10)', color: '#004445' }}
            >
              <Clock size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#16685B' }}>{L.hoursLabel}</p>
              <h2 className="text-xl font-extrabold" style={{ color: '#0D1F1D' }}>{L.hoursTitle}</h2>
            </div>
          </div>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid #16685B' }}
          >
            {HOURS.map((row, i) => (
              <div
                key={row.day}
                className="flex items-center justify-between px-5 py-4"
                style={{
                  backgroundColor: i % 2 === 0 ? '#fff' : '#FFFFFF',
                  borderBottom: i < HOURS.length - 1 ? '1px solid #E8E0D0' : 'none',
                }}
              >
                <span className="text-sm font-medium" style={{ color: '#0D1F1D' }}>{row.day}</span>
                <span
                  className="text-sm font-bold"
                  style={{ color: row.closed ? '#C62828' : '#004445' }}
                >
                  {row.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
