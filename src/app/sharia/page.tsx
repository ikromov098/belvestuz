'use client';

import Link from 'next/link';

const SCHOLARS = [
  {
    name: 'Dr. Abdulloh Karimov',
    role: 'Председатель совета',
    credentials: 'PhD Islamic Finance, Al-Azhar University',
    bio: 'Более 20 лет опыта в области исламского права и финансов, автор ряда научных трудов по исламской экономике.',
  },
  {
    name: 'Sheikh Mahmud Umarov',
    role: 'Член совета',
    credentials: 'Islamic Jurisprudence, Tashkent Islamic University',
    bio: 'Специалист по исламскому праву с обширным опытом в сфере халяль-сертификации финансовых продуктов.',
  },
  {
    name: 'Dr. Fatima Rashidova',
    role: 'Член совета',
    credentials: 'Sharia Audit Specialist',
    bio: 'Эксперт по шариатскому аудиту, специализируется на проверке соответствия финансовых продуктов нормам ислама.',
  },
];

function initials(name: string) {
  return name.split(' ').slice(0, 2).map((w) => w[0]).join('');
}

export default function ShariaPage() {
  return (
    <div>
      {/* Hero */}
      <div style={{ backgroundColor: '#0D5C54' }} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-1.5 mb-5 text-xs" style={{ color: 'rgba(232,223,200,0.55)' }}>
            <Link href="/" style={{ color: 'rgba(232,223,200,0.55)' }}>Главная</Link>
            <span>›</span>
            <span style={{ color: '#E8DFC8' }}>Шариатский совет</span>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#C9A84C' }}>
            Исламское соответствие
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ color: '#E8DFC8', maxWidth: 640 }}>
            Шариатский Наблюдательный Совет
          </h1>
          <p className="text-lg" style={{ color: 'rgba(232,223,200,0.75)', maxWidth: 520 }}>
            Все продукты Belvest проверены и одобрены независимыми исламскими учёными
          </p>
        </div>
      </div>

      {/* Scholar cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#F4EFE4' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#C9A84C' }}>
              Состав совета
            </p>
            <h2 className="text-3xl font-extrabold" style={{ color: '#0D1F1D' }}>
              Независимые исламские учёные
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SCHOLARS.map((s) => (
              <div
                key={s.name}
                className="bg-white rounded-xl p-6 flex flex-col"
                style={{ border: '1px solid #D4C9B0', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold mb-4 shrink-0"
                  style={{ backgroundColor: '#0D5C54', color: '#E8DFC8' }}
                >
                  {initials(s.name)}
                </div>
                <p className="font-extrabold text-base mb-0.5" style={{ color: '#0D1F1D' }}>{s.name}</p>
                <p className="text-xs font-semibold mb-1" style={{ color: '#C9A84C' }}>{s.role}</p>
                <p className="text-xs mb-3" style={{ color: '#4A6B67' }}>{s.credentials}</p>
                <p className="text-sm leading-relaxed" style={{ color: '#4A6B67' }}>{s.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification statement */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#C9A84C' }}>
              Сертификат соответствия
            </p>
            <h2 className="text-3xl font-extrabold" style={{ color: '#0D1F1D' }}>
              Официальное подтверждение
            </h2>
          </div>

          <div
            className="rounded-2xl p-8 text-center"
            style={{
              backgroundColor: 'rgba(13,92,84,0.04)',
              border: '2px solid #C9A84C',
            }}
          >
            <div className="text-4xl mb-5">☪️</div>
            <p className="text-base leading-relaxed font-medium" style={{ color: '#0D1F1D', maxWidth: 520, margin: '0 auto' }}>
              «Настоящим подтверждается, что финансовые продукты Belvest соответствуют нормам Исламского Шариата и свободны от Риба (процентов)»
            </p>
            <div className="mt-6 pt-6" style={{ borderTop: '1px solid rgba(201,168,76,0.30)' }}>
              <p className="text-xs" style={{ color: '#4A6B67' }}>
                Шариатский Наблюдательный Совет Belvest · Ташкент, Узбекистан
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => alert('Документ готовится')}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-bold transition-all duration-150 cursor-pointer"
              style={{ backgroundColor: '#C9A84C', color: '#0D1F1D' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#A8892E')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#C9A84C')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Скачать сертификат соответствия (PDF)
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
