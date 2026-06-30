'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Send, Phone } from 'lucide-react';

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

type ServiceType = 'installment' | 'leasing';

const BRANDS: { name: string; service: ServiceType }[] = [
  { name: 'Apple',     service: 'installment' },
  { name: 'Samsung',   service: 'installment' },
  { name: 'LG',        service: 'leasing'     },
  { name: 'Bosch',     service: 'leasing'     },
  { name: 'Xiaomi',    service: 'installment' },
  { name: 'Huawei',    service: 'installment' },
  { name: 'Hyundai',   service: 'leasing'     },
  { name: 'Chevrolet', service: 'leasing'     },
  { name: 'Dell',      service: 'installment' },
  { name: 'Sony',      service: 'installment' },
  { name: 'Dyson',     service: 'leasing'     },
  { name: 'Artel',     service: 'installment' },
];

const BENEFITS = [
  '✓ Бесплатное подключение',
  '✓ Быстрая интеграция',
  '✓ Поддержка 24/7',
];

function BrandCard({ name, service }: { name: string; service: ServiceType }) {
  const [hovered, setHovered] = useState(false);
  const isLeasing = service === 'leasing';

  return (
    <div
      className="bg-white rounded-xl p-6 flex flex-col items-center text-center gap-3 transition-all duration-200 cursor-default"
      style={{
        border: `1.5px solid ${hovered ? '#004445' : '#16685B'}`,
        boxShadow: hovered ? '0 8px 28px rgba(0,68,69,0.14)' : '0 1px 4px rgba(0,0,0,0.05)',
        transform: hovered ? 'translateY(-3px)' : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className="font-extrabold"
        style={{ fontSize: 28, color: '#004445', letterSpacing: '-0.01em', lineHeight: 1 }}
      >
        {name}
      </span>
      <span className="text-xs" style={{ color: '#4A6B67' }}>
        {isLeasing ? 'Доступно в лизинг' : 'Доступно в рассрочку'}
      </span>
      <span
        className="px-3 py-1 rounded-full text-xs font-bold"
        style={
          isLeasing
            ? { backgroundColor: 'rgba(201,168,76,0.15)', color: '#A8892E' }
            : { backgroundColor: 'rgba(0,68,69,0.10)', color: '#004445' }
        }
      >
        {isLeasing ? 'Иджара' : 'Мурабаха'}
      </span>
    </div>
  );
}

export default function PartnersPage() {
  return (
    <div>
      {/* Hero */}
      <div style={{ backgroundColor: '#004445' }} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-1.5 mb-5 text-xs" style={{ color: 'rgba(255,240,204,0.55)' }}>
            <Link href="/" style={{ color: 'rgba(255,240,204,0.55)' }}>Главная</Link>
            <span>›</span>
            <span style={{ color: '#FFF0CC' }}>Партнёры</span>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#C9A84C' }}>
            Партнёрская сеть
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ color: '#FFF0CC' }}>
            Наши партнёры
          </h1>
          <p className="text-lg" style={{ color: 'rgba(255,240,204,0.75)', maxWidth: 480 }}>
            Бренды и магазины доступные в рассрочку и лизинг Belvest
          </p>
        </div>
      </div>

      {/* Brand grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#C9A84C' }}>
              Бренды-партнёры
            </p>
            <h2 className="text-3xl font-extrabold" style={{ color: '#0D1F1D' }}>
              Ведущие мировые бренды
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {BRANDS.map((b) => (
              <BrandCard key={b.name} name={b.name} service={b.service} />
            ))}
          </div>
        </div>
      </section>

      {/* Become a partner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#004445' }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#C9A84C' }}>
            Для бизнеса
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: '#FFF0CC' }}>
            Станьте партнёром Belvest
          </h2>
          <p className="text-base mb-8" style={{ color: 'rgba(255,240,204,0.70)', maxWidth: 480, margin: '0 auto 32px' }}>
            Предлагайте халяль рассрочку своим клиентам. Увеличьте продажи без дополнительных затрат.
          </p>

          {/* Benefit pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {BENEFITS.map((b) => (
              <span
                key={b}
                className="px-4 py-2 rounded-full text-sm font-semibold"
                style={{ backgroundColor: 'rgba(255,240,204,0.12)', color: '#FFF0CC', border: '1px solid rgba(255,240,204,0.25)' }}
              >
                {b}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold transition-all duration-150"
              style={{ backgroundColor: '#C9A84C', color: '#0D1F1D' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#A8892E')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#C9A84C')}
            >
              Оставить заявку
            </Link>
            <a
              href="https://t.me/belvest_info"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold border transition-all duration-150"
              style={{ borderColor: 'rgba(255,240,204,0.40)', color: '#FFF0CC' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,240,204,0.08)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <Send size={16} />
              Написать в Telegram
            </a>
          </div>
        </div>
      </section>

      {/* Contact row */}
      <section className="py-10 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
          <span className="text-sm font-semibold" style={{ color: '#4A6B67' }}>
            Вопросы по партнёрству:
          </span>
          <a
            href="tel:+998774809999"
            className="inline-flex items-center gap-2 text-sm font-bold transition-colors duration-150"
            style={{ color: '#004445' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#C9A84C')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#004445')}
          >
            <Phone size={15} />
            +998 77 480-99-99
          </a>
          <a
            href="https://www.instagram.com/belvest.uz/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold transition-colors duration-150"
            style={{ color: '#004445' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#C9A84C')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#004445')}
          >
            <InstagramIcon size={15} />
            @belvest.uz
          </a>
          <a
            href="https://t.me/belvest_info"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold transition-colors duration-150"
            style={{ color: '#004445' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#C9A84C')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#004445')}
          >
            <Send size={15} />
            @belvest_info
          </a>
        </div>
      </section>
    </div>
  );
}
