'use client';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const TESTIMONIALS_BY_LANG = {
  ru: [
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
    {
      name: 'Аваз Норматов',
      city: 'Нукус',
      rating: 5,
      text: 'Живу в Нукусе, боялся, что придётся ехать в Ташкент несколько раз. Но всё оформил онлайн — документы отправил через приложение, машину доставили прямо ко мне. Даже расстояние в 1200 км не помешало.',
    },
    {
      name: 'Жасур Тошматов',
      city: 'Ташкент',
      rating: 5,
      text: 'Взял iPhone 17 Pro Max в рассрочку за 15 минут через сайт. Честно, оказалось проще, чем торговаться на Малике — никаких переплат и подделок, всё официально.',
    },
    {
      name: 'Дилноза Каримова',
      city: 'Ташкент',
      rating: 5,
      text: 'Оформили инвестиционный пакет через Belvest и через год смогли позволить себе 3-комнатную квартиру в комплексе C-1. Менеджеры подробно объяснили каждый шаг, никакого давления.',
    },
  ],
  uz: [
    {
      name: 'Kamol Rasulov',
      city: 'Toshkent',
      rating: 5,
      text: "Smartfonni 20 daqiqada muddatli to'lovga rasmiylashtirdim. Navbat yo'q, bank yo'q — hammasi onlayn. Menejer o'zi qo'ng'iroq qilib, barcha shartlarni tushuntirdi.",
    },
    {
      name: 'Nilufar Yusupova',
      city: 'Samarqand',
      rating: 5,
      text: "Muzlatgichni boshlang'ich to'lovsiz muddatli to'lovga oldim. To'lovlar kichik, hammasi shaffof. Belvest — yashirin komissiyalarsiz halol xizmat.",
    },
    {
      name: 'Baxtiyor Xasanov',
      city: 'Andijon',
      rating: 5,
      text: "Biznes uchun maxsus texnikaga lizing. Belvest hujjatlar bilan yordam berdi va arizani 1 kunda ma'qulladi. Endi barcha ish hamkorlarimga tavsiya qilaman.",
    },
    {
      name: 'Avaz Normatov',
      city: 'Nukus',
      rating: 5,
      text: "Nukusda yashayman, Toshkentga bir necha marta borishga to'g'ri keladi deb qo'rqqandim. Lekin hammasini onlayn rasmiylashtirdim — hujjatlarni ilova orqali yubordim, mashinani esa to'g'ridan-to'g'ri yetkazib berishdi. 1200 km masofa ham to'sqinlik qilmadi.",
    },
    {
      name: 'Jasur Toshmatov',
      city: 'Toshkent',
      rating: 5,
      text: "iPhone 17 Pro Max ni sayt orqali 15 daqiqada muddatli to'lovga oldim. Rostini aytsam, Malika bozorida savdolashishdan ko'ra osonroq bo'ldi — ortiqcha to'lov yo'q, qalbakisi yo'q, hammasi rasmiy.",
    },
    {
      name: 'Dilnoza Karimova',
      city: 'Toshkent',
      rating: 5,
      text: "Belvest orqali investitsiya paketini rasmiylashtirdik va bir yildan so'ng C-1 turar-joy majmuasidan 3 xonali kvartira sotib olishga muvaffaq bo'ldik. Menejerlar har bir qadamni batafsil tushuntirishdi, hech qanday bosim bo'lmadi.",
    },
  ],
};

const card = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

export default function Testimonials() {
  const { lang } = useLanguage();
  const testimonials = TESTIMONIALS_BY_LANG[lang] ?? TESTIMONIALS_BY_LANG.ru;
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#16685B' }}>
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
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={card}
              className="bg-white rounded-2xl p-6 flex flex-col"
              style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.07)', border: '1px solid #16685B' }}
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} style={{ color: '#548870', fontSize: 18, lineHeight: 1 }}>★</span>
                ))}
              </div>
              <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: '#4A6B67' }}>
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid #FFFFFF' }}>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                  style={{ backgroundColor: '#004445', color: '#FFF0CC' }}
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
