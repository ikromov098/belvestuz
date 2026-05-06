'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Phone, Send, MapPin, CheckCircle, Clock } from 'lucide-react';

function InstagramIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

const CONTACT_CARDS = [
  {
    icon: <Phone size={24} />,
    label: 'Телефон',
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
    label: 'Telegram',
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
    label: 'Instagram',
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
    label: 'Адрес',
    content: (
      <a
        href="https://yandex.uz/maps/org/8069766461/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-bold transition-colors duration-150 contact-link"
      >
        Ташкент, Узбекистан
      </a>
    ),
  },
];

const TOPICS = ['Рассрочка', 'Лизинг', 'Трейд-ин', 'Инвестиции', 'Другое'];

const HOURS = [
  { day: 'Понедельник — Пятница', time: '9:00 — 18:00', closed: false },
  { day: 'Суббота', time: '10:00 — 15:00', closed: false },
  { day: 'Воскресенье', time: 'Выходной', closed: true },
];

export default function ContactsPage() {
  const [form, setForm] = useState({ name: '', phone: '', topic: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.topic || !form.message.trim()) {
      setError('Пожалуйста, заполните все поля');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <div>
      {/* Hero */}
      <div style={{ backgroundColor: '#0D5C54' }} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-1.5 mb-5 text-xs" style={{ color: 'rgba(232,223,200,0.55)' }}>
            <Link href="/" style={{ color: 'rgba(232,223,200,0.55)' }}>Главная</Link>
            <span>›</span>
            <span style={{ color: '#E8DFC8' }}>Контакты</span>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#C9A84C' }}>
            Контакты
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ color: '#E8DFC8' }}>
            Мы всегда на связи
          </h1>
          <p className="text-lg" style={{ color: 'rgba(232,223,200,0.75)', maxWidth: 480 }}>
            Свяжитесь с нами любым удобным способом — ответим быстро
          </p>
        </div>
      </div>

      {/* Contact cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#F4EFE4' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CONTACT_CARDS.map((card) => (
              <div
                key={card.label}
                className="bg-white rounded-2xl p-5 flex flex-col gap-3"
                style={{ border: '1px solid #D4C9B0', boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: 'rgba(13,92,84,0.10)', color: '#0D5C54' }}
                >
                  {card.icon}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#4A6B67' }}>
                    {card.label}
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
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#C9A84C' }}>
              Обратная связь
            </p>
            <h2 className="text-3xl font-extrabold" style={{ color: '#0D1F1D' }}>
              Напишите нам
            </h2>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                style={{ backgroundColor: 'rgba(13,92,84,0.10)' }}
              >
                <CheckCircle size={36} style={{ color: '#0D5C54' }} />
              </div>
              <h3 className="text-xl font-extrabold mb-2" style={{ color: '#0D1F1D' }}>Спасибо!</h3>
              <p className="text-sm" style={{ color: '#4A6B67', maxWidth: 340 }}>
                Мы свяжемся с вами в течение 1 рабочего дня
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold" style={{ color: '#4A6B67' }}>Имя</label>
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="px-4 py-2.5 rounded-lg text-sm outline-none"
                    style={{ border: '1px solid #D4C9B0', backgroundColor: '#F4EFE4', color: '#0D1F1D' }}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold" style={{ color: '#4A6B67' }}>Телефон</label>
                  <div className="flex rounded-lg overflow-hidden" style={{ border: '1px solid #D4C9B0' }}>
                    <span
                      className="px-3 flex items-center text-sm font-semibold shrink-0"
                      style={{ backgroundColor: '#E8E0D0', color: '#4A6B67', borderRight: '1px solid #D4C9B0' }}
                    >
                      +998
                    </span>
                    <input
                      type="tel"
                      placeholder="77 480-99-99"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="flex-1 px-3 py-2.5 text-sm outline-none"
                      style={{ backgroundColor: '#F4EFE4', color: '#0D1F1D' }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold" style={{ color: '#4A6B67' }}>Тема</label>
                <select
                  value={form.topic}
                  onChange={(e) => setForm({ ...form, topic: e.target.value })}
                  className="px-4 py-2.5 rounded-lg text-sm outline-none cursor-pointer"
                  style={{
                    border: '1px solid #D4C9B0',
                    backgroundColor: '#F4EFE4',
                    color: form.topic ? '#0D1F1D' : '#4A6B67',
                  }}
                >
                  <option value="" disabled>Выберите тему...</option>
                  {TOPICS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold" style={{ color: '#4A6B67' }}>Сообщение</label>
                <textarea
                  rows={4}
                  placeholder="Опишите ваш вопрос..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="px-4 py-2.5 rounded-lg text-sm outline-none resize-none"
                  style={{ border: '1px solid #D4C9B0', backgroundColor: '#F4EFE4', color: '#0D1F1D' }}
                />
              </div>

              {error && (
                <p className="text-sm font-semibold" style={{ color: '#C62828' }}>{error}</p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl text-sm font-bold transition-all duration-150 cursor-pointer"
                style={{ backgroundColor: '#C9A84C', color: '#0D1F1D' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#A8892E')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#C9A84C')}
              >
                Отправить сообщение
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Yandex Map */}
      <section className="py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#F4EFE4' }}>
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl overflow-hidden" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.10)' }}>
            <iframe
              src="https://yandex.uz/map-widget/v1/org/8069766461/?ll=69.253505,41.329161&z=16"
              width="100%"
              height="400"
              frameBorder={0}
              allowFullScreen
              style={{ display: 'block' }}
              title="Belvest на карте"
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
              style={{ backgroundColor: 'rgba(13,92,84,0.10)', color: '#0D5C54' }}
            >
              <Clock size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#C9A84C' }}>График</p>
              <h2 className="text-xl font-extrabold" style={{ color: '#0D1F1D' }}>Режим работы</h2>
            </div>
          </div>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid #D4C9B0' }}
          >
            {HOURS.map((row, i) => (
              <div
                key={row.day}
                className="flex items-center justify-between px-5 py-4"
                style={{
                  backgroundColor: i % 2 === 0 ? '#fff' : '#F4EFE4',
                  borderBottom: i < HOURS.length - 1 ? '1px solid #E8E0D0' : 'none',
                }}
              >
                <span className="text-sm font-medium" style={{ color: '#0D1F1D' }}>{row.day}</span>
                <span
                  className="text-sm font-bold"
                  style={{ color: row.closed ? '#C62828' : '#0D5C54' }}
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
