'use client';

import { Send, Phone } from 'lucide-react';

function InstagramIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

export default function ContactStrip() {
  return (
    <section style={{ backgroundColor: '#003332' }} className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#C9A84C' }}>
          Связаться с нами
        </p>
        <h2 className="text-3xl font-extrabold mb-8" style={{ color: '#FFF0CC' }}>
          Мы всегда на связи
        </h2>

        {/* Social buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <a
            href="https://www.instagram.com/belvest.uz/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-150"
            style={{ backgroundColor: 'rgba(255,240,204,0.10)', color: '#FFF0CC', border: '1px solid rgba(255,240,204,0.25)' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,240,204,0.18)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,240,204,0.10)')}
          >
            <InstagramIcon size={18} />
            @belvest.uz
          </a>
          <a
            href="https://t.me/belvest_info"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-150"
            style={{ backgroundColor: '#C9A84C', color: '#0D1F1D' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#A8892E')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#C9A84C')}
          >
            <Send size={18} />
            Telegram
          </a>
        </div>

        {/* Phone numbers */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <a
            href="tel:+998774809999"
            className="inline-flex items-center gap-2 text-base font-bold transition-colors duration-150"
            style={{ color: '#FFF0CC' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#C9A84C')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#FFF0CC')}
          >
            <Phone size={16} />
            +998 77 480-99-99
          </a>
          <span style={{ color: 'rgba(255,240,204,0.30)' }} className="hidden sm:inline">•</span>
          <a
            href="tel:+998774802222"
            className="inline-flex items-center gap-2 text-base font-bold transition-colors duration-150"
            style={{ color: '#FFF0CC' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#C9A84C')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#FFF0CC')}
          >
            <Phone size={16} />
            +998 77 480-22-22
          </a>
        </div>

        <p className="text-sm" style={{ color: 'rgba(255,240,204,0.55)' }}>
          Пн–Сб: 9:00 — 18:00
        </p>
      </div>
    </section>
  );
}
