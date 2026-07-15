'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import TeamSection from '@/components/TeamSection';

const STATS = [
  { value: '1 000+', label: 'клиентов' },
  { value: '4',      label: 'услуги' },
  { value: '2 часа', label: 'среднее одобрение' },
  { value: 'с 2025', label: 'на рынке' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

export default function AboutPage() {
  const { t } = useLanguage();

  const WHY = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="15" stroke="#004445" strokeWidth="2" />
          <path d="M10 16l4 4 8-8" stroke="#004445" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: t.about.why1Title,
      desc:  t.about.why1Desc,
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="15" stroke="#004445" strokeWidth="2" />
          <path d="M16 9v7l4 4" stroke="#004445" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: t.about.why2Title,
      desc:  t.about.why2Desc,
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="15" stroke="#004445" strokeWidth="2" />
          <path d="M16 8l1.8 5.5H23l-4.4 3.2 1.7 5.3L16 19l-4.3 3 1.7-5.3L9 13.5h5.2z" stroke="#004445" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      ),
      title: t.about.why3Title,
      desc:  t.about.why3Desc,
    },
  ];

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ backgroundColor: '#004445', paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: '#FFF0CC' }}
          >
            {t.about.heroLabel}
          </p>
          <h1
            className="text-4xl sm:text-5xl font-extrabold mb-5"
            style={{ color: '#FFF0CC', lineHeight: 1.15 }}
          >
            {t.about.heroTitle}
          </h1>
          <p className="text-base sm:text-lg" style={{ color: 'rgba(255,240,204,0.75)', maxWidth: 560, margin: '0 auto' }}>
            {t.about.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Mission */}
      <section style={{ backgroundColor: '#fff', padding: '72px 16px' }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            className="text-2xl sm:text-3xl font-bold leading-snug"
            style={{ color: '#0D1F1D' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true, amount: 0.4 }}
          >
            {t.about.missionQuote}
          </motion.p>
          <motion.p
            className="mt-5 text-sm leading-relaxed"
            style={{ color: '#4A6B67' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            viewport={{ once: true, amount: 0.4 }}
          >
            {t.about.missionBody}
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section style={{ backgroundColor: '#003332', padding: '56px 16px' }}>
        <motion.div
          className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {STATS.map((s) => (
            <motion.div key={s.label} variants={fadeUp} className="text-center">
              <p className="text-3xl sm:text-4xl font-extrabold" style={{ color: '#FFF0CC' }}>
                {s.value}
              </p>
              <p className="mt-1 text-sm font-medium" style={{ color: 'rgba(255,240,204,0.65)' }}>
                {s.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Team */}
      <TeamSection />

      {/* Why choose us */}
      <section style={{ backgroundColor: '#fff', padding: '80px 16px' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#16685B' }}>
              {t.about.whyLabel}
            </p>
            <h2 className="text-3xl font-extrabold" style={{ color: '#0D1F1D' }}>
              {t.about.whyTitle}
            </h2>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {WHY.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="flex flex-col items-center text-center p-6 rounded-2xl"
                style={{ backgroundColor: '#FFFFFF' }}
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold mb-2" style={{ color: '#0D1F1D' }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#4A6B67' }}>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact block */}
      <section style={{ backgroundColor: '#004445', padding: '72px 16px' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#FFF0CC' }}>
              {t.about.contactLabel}
            </p>
            <h2 className="text-3xl font-extrabold" style={{ color: '#FFF0CC' }}>
              {t.about.contactTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                label: t.about.contactAddrLabel,
                value: 'г. Ташкент, ул. Амира Тимура, 107Б',
                icon: '📍',
              },
              {
                label: t.about.contactPhoneLabel,
                value: '+998 71 200 00 00',
                icon: '📞',
              },
              {
                label: t.about.contactEmailLabel,
                value: 'info@belvest.uz',
                icon: '✉️',
              },
              {
                label: t.about.contactHoursLabel,
                value: 'Пн–Пт: 9:00–18:00\nСб: 10:00–15:00',
                icon: '🕐',
              },
            ].map((c) => (
              <div
                key={c.label}
                className="rounded-2xl p-5"
                style={{ backgroundColor: 'rgba(255,240,204,0.08)', border: '1px solid rgba(255,240,204,0.15)' }}
              >
                <p className="text-2xl mb-2">{c.icon}</p>
                <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'rgba(255,240,204,0.55)' }}>
                  {c.label}
                </p>
                <p className="text-sm font-medium whitespace-pre-line" style={{ color: '#FFF0CC' }}>
                  {c.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/apply"
              className="inline-block px-8 py-3 rounded-full text-sm font-semibold transition-all duration-150"
              style={{ backgroundColor: '#FFF0CC', color: '#004445' }}
            >
              {t.about.contactApply}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
