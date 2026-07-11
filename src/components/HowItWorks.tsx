'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      n: 1,
      title: t.howItWorks.step1,
      sub: 'Электроника, мебель, транспорт, лизинг для бизнеса — более 200 позиций в каталоге.',
    },
    {
      n: 2,
      title: t.howItWorks.step2,
      sub: 'Заполните форму за 5 минут. Документы загружаются прямо с телефона.',
    },
    {
      n: 3,
      title: t.howItWorks.step3,
      sub: 'Менеджер перезвонит, подпишете договор — и товар ваш без лишних хлопот.',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#003332' }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#FFF0CC' }}>
            {t.howItWorks.title}
          </p>
          <h2 className="text-3xl font-extrabold" style={{ color: '#FFF0CC' }}>
            Три шага до вашей покупки
          </h2>
        </div>

        <div className="relative flex flex-col md:flex-row gap-10 md:gap-0">
          {/* Desktop connecting line */}
          <div
            className="hidden md:block absolute"
            style={{
              top: 32,
              left: 'calc(16.67% + 20px)',
              right: 'calc(16.67% + 20px)',
              height: 2,
              backgroundColor: 'rgba(84,136,112,0.30)',
            }}
          />

          {steps.map((s) => (
            <div key={s.n} className="flex-1 flex flex-col items-center text-center px-4 md:px-8 relative">
              {/* Mobile connector */}
              {s.n < 3 && (
                <div
                  className="md:hidden absolute"
                  style={{
                    top: 64,
                    left: '50%',
                    width: 2,
                    height: 40,
                    backgroundColor: 'rgba(84,136,112,0.30)',
                    transform: 'translateX(-50%)',
                  }}
                />
              )}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-extrabold mb-5 relative z-10"
                style={{ backgroundColor: '#FFF0CC', color: '#004445' }}
              >
                {s.n}
              </div>
              <h3 className="text-base font-extrabold mb-2" style={{ color: '#FFF0CC' }}>
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,240,204,0.60)' }}>
                {s.sub}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link
            href="/apply"
            className="px-8 py-3.5 rounded-xl text-sm font-bold"
            style={{ backgroundColor: '#FFF0CC', color: '#004445' }}
          >
            {t.header.apply}
          </Link>
        </div>
      </div>
    </section>
  );
}
