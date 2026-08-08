'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function TermsPage() {
  const { lang } = useLanguage();
  const uz = lang === 'uz';

  const title = uz ? `Foydalanish shartlari` : `Условия использования`;
  const updated = uz ? `Oxirgi yangilanish: 06.08.2026` : `Последнее обновление: 06.08.2026`;

  const ru = [
    { h: `1. О сайте`, p: [
      `Сайт носит информационный характер. Размещённые материалы не являются публичной офертой.`,
      `Платежи на сайте не принимаются. Оформление финансирования происходит офлайн, после подписания договора.`,
    ]},
    { h: `2. Калькулятор`, p: [
      `Расчёты калькулятора являются предварительными и служат для ориентировочной оценки. Они не являются обязательством предоставить финансирование на указанных условиях.`,
      `Окончательные условия определяются индивидуально и фиксируются в договоре.`,
    ]},
    { h: `3. Курс валют`, p: [
      `Суммы в долларах США пересчитываются в сумы по условному курсу, указанному на сайте, исключительно для наглядности. В реальной сделке применяется фактический курс Центрального банка Республики Узбекистан на дату операции.`,
    ]},
    { h: `4. Инвестиции`, p: [
      `Любые показатели доходности, указанные на сайте, являются прогнозируемыми и не гарантируются. Инвестиции связаны с риском, включая риск потери вложенных средств.`,
    ]},
    { h: `5. Заявки`, p: [
      `Отправка заявки не создаёт обязательств ни для вас, ни для нас. Мы вправе отказать в предоставлении финансирования без объяснения причин.`,
    ]},
    { h: `6. Интеллектуальная собственность`, p: [
      `Логотип, тексты, дизайн и иные материалы сайта принадлежат компании и не могут использоваться без письменного разрешения.`,
    ]},
    { h: `7. Контакты`, p: [
      `+998 77 480-99-99, +998 77 480-22-22, info@belvest.uz, Telegram @belvest_info.`,
    ]},
  ];

  const uzs = [
    { h: `1. Sayt haqida`, p: [
      `Sayt axborot xarakteriga ega. Joylashtirilgan materiallar ommaviy oferta hisoblanmaydi.`,
      `Saytda to'lovlar qabul qilinmaydi. Moliyalashtirish shartnoma imzolangandan so'ng oflayn rasmiylashtiriladi.`,
    ]},
    { h: `2. Kalkulyator`, p: [
      `Kalkulyator hisob-kitoblari dastlabki bo'lib, taxminiy baholash uchun xizmat qiladi. Ular ko'rsatilgan shartlarda moliyalashtirish berish majburiyatini anglatmaydi.`,
      `Yakuniy shartlar individual tarzda belgilanadi va shartnomada qayd etiladi.`,
    ]},
    { h: `3. Valyuta kursi`, p: [
      `AQSh dollaridagi summalar saytda ko'rsatilgan shartli kurs bo'yicha so'mga faqat ko'rgazmalilik uchun qayta hisoblanadi. Haqiqiy bitimda O'zbekiston Respublikasi Markaziy bankining amal qiluvchi kursi qo'llaniladi.`,
    ]},
    { h: `4. Investitsiyalar`, p: [
      `Saytda ko'rsatilgan har qanday daromadlilik ko'rsatkichlari prognoz qilingan bo'lib, kafolatlanmaydi. Investitsiyalar xavf bilan bog'liq, shu jumladan qo'yilgan mablag'ni yo'qotish xavfi mavjud.`,
    ]},
    { h: `5. Arizalar`, p: [
      `Ariza yuborish na siz uchun, na biz uchun majburiyat yaratmaydi. Biz sabablarini tushuntirmasdan moliyalashtirishni rad etish huquqiga egamiz.`,
    ]},
    { h: `6. Intellektual mulk`, p: [
      `Logotip, matnlar, dizayn va saytning boshqa materiallari kompaniyaga tegishli bo'lib, yozma ruxsatsiz foydalanish mumkin emas.`,
    ]},
    { h: `7. Kontaktlar`, p: [
      `+998 77 480-99-99, +998 77 480-22-22, info@belvest.uz, Telegram @belvest_info.`,
    ]},
  ];

  const sections = uz ? uzs : ru;

  return (
    <main className="min-h-screen py-20 px-4 sm:px-6" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-2" style={{ color: '#004445' }}>{title}</h1>
        <p className="text-sm mb-12" style={{ color: '#548870' }}>{updated}</p>
        {sections.map((s, i) => (
          <section key={i} className="mb-8">
            <h2 className="text-lg font-bold mb-3" style={{ color: '#004445' }}>{s.h}</h2>
            {s.p.map((txt, j) => (
              <p key={j} className="text-sm leading-relaxed mb-3" style={{ color: '#16685B' }}>{txt}</p>
            ))}
          </section>
        ))}
      </div>
    </main>
  );
}
