'use client';
import { motion } from 'framer-motion';

const TESTIMONIALS = [
  {
    name: 'Камол Расулов',
    city: 'Ташкент',
    rating: 5,
    text: 'Оформил рассрочку на смартфон за 20 минут. Никаких очередей, никакого банка — всё онлайн. Менеджер перезвонил сам и объяснил все условия.',
  },
  {
    name: 'Нилуфар Юсупова',
    city: 'Самарканд',
    rating: 5,
    text: 'Взяла холодильник в рассрочку без первоначального взноса. Платежи небольшие, всё прозрачно. Belvest — это честный сервис без скрытых комиссий.',
  },
  {
    name: 'Бахтиёр Хасанов',
    city: 'Андижан',
    rating: 5,
    text: 'Лизинг на спецтехнику для бизнеса. Belvest помогли с документами и одобрили заявку за 1 день. Теперь рекомендую всем деловым партнёрам.',
  },
];

const card = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

export default function Testimonials() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#F4EFE4' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#C9A84C' }}>
            Отзывы клиентов
          </p>
          <h2 className="text-3xl font-extrabold" style={{ color: '#0D1F1D' }}>
            Нам доверяют тысячи клиентов
          </h2>
          <p className="text-sm mt-2" style={{ color: '#4A6B67' }}>
            Реальные истории тех, кто уже воспользовался нашими услугами
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {TESTIMONIALS.map((t) => (
            <motion.div
              key={t.name}
              variants={card}
              className="bg-white rounded-2xl p-6 flex flex-col"
              style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.07)', border: '1px solid #D4C9B0' }}
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} style={{ color: '#C9A84C', fontSize: 18, lineHeight: 1 }}>★</span>
                ))}
              </div>
              <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: '#4A6B67' }}>
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid #F4EFE4' }}>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                  style={{ backgroundColor: '#0D5C54', color: '#E8DFC8' }}
                >
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-sm" style={{ color: '#0D1F1D' }}>{t.name}</p>
                  <p className="text-xs" style={{ color: '#4A6B67' }}>{t.city}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
