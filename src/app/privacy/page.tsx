'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function PrivacyPage() {
  const { lang } = useLanguage();
  const uz = lang === 'uz';

  const title = uz ? `Maxfiylik siyosati` : `Политика конфиденциальности`;
  const updated = uz ? `Oxirgi yangilanish: 06.08.2026` : `Последнее обновление: 06.08.2026`;

  const ru = [
    { h: `1. Кто мы`, p: [
      `Оператором персональных данных является [ЗАПОЛНИТЬ: полное наименование юридического лица], адрес: [ЗАПОЛНИТЬ: юридический адрес], Ташкент, Республика Узбекистан.`,
      `По любым вопросам, связанным с обработкой персональных данных, пишите на info@belvest.uz.`,
    ]},
    { h: `2. Какие данные мы собираем`, p: [
      `Через формы на сайте: имя, номер телефона, адрес электронной почты, а также выбранный продукт, сумма и срок финансирования, которые вы указываете в заявке.`,
      `Через чат-бот: текст ваших сообщений.`,
      `Мы не собираем на сайте паспортные данные, ПИНФЛ, биометрические или генетические данные. Платежи на сайте не принимаются.`,
    ]},
    { h: `3. Зачем мы их используем`, p: [
      `Только для того, чтобы связаться с вами по вашей заявке, подобрать условия финансирования и ответить на ваши вопросы. Мы не продаём ваши данные третьим лицам.`,
    ]},
    { h: `4. Куда передаются данные`, p: [
      `Заявки с сайта доставляются нашей команде через мессенджер Telegram. Сайт размещён на хостинге Vercel. Сообщения, отправленные чат-боту, обрабатываются сервисом Anthropic для формирования ответа.`,
      `Серверы этих сервисов расположены за пределами Республики Узбекистан. Отправляя форму, вы соглашаетесь на такую передачу.`,
    ]},
    { h: `5. Сколько мы храним данные`, p: [
      `[ЗАПОЛНИТЬ: срок хранения]. По истечении этого срока данные удаляются.`,
    ]},
    { h: `6. Ваши права`, p: [
      `Вы вправе запросить доступ к своим данным, их исправление или удаление. Направьте запрос на info@belvest.uz — мы ответим в срок, установленный законодательством Республики Узбекистан.`,
    ]},
    { h: `7. Изменения`, p: [
      `Мы можем обновлять эту политику. Актуальная версия всегда доступна на этой странице с датой последнего обновления.`,
    ]},
  ];

  const uzs = [
    { h: `1. Biz kimmiz`, p: [
      `Shaxsga doir ma'lumotlar operatori — [TO'LDIRISH: yuridik shaxsning to'liq nomi], manzil: [TO'LDIRISH: yuridik manzil], Toshkent, O'zbekiston Respublikasi.`,
      `Shaxsga doir ma'lumotlarni qayta ishlash bo'yicha savollar uchun: info@belvest.uz.`,
    ]},
    { h: `2. Qanday ma'lumotlarni to'playmiz`, p: [
      `Saytdagi shakllar orqali: ism, telefon raqami, elektron pochta manzili, shuningdek arizada ko'rsatgan mahsulot, summa va muddat.`,
      `Chat-bot orqali: yuborgan xabarlaringiz matni.`,
      `Saytda pasport ma'lumotlari, JShShIR, biometrik yoki genetik ma'lumotlar to'planmaydi. Saytda to'lovlar qabul qilinmaydi.`,
    ]},
    { h: `3. Nima uchun foydalanamiz`, p: [
      `Faqat arizangiz bo'yicha siz bilan bog'lanish, moliyalashtirish shartlarini tanlash va savollaringizga javob berish uchun. Ma'lumotlaringizni uchinchi shaxslarga sotmaymiz.`,
    ]},
    { h: `4. Ma'lumotlar qayerga uzatiladi`, p: [
      `Saytdan kelgan arizalar jamoamizga Telegram messenjeri orqali yetkaziladi. Sayt Vercel xostingida joylashgan. Chat-botga yuborilgan xabarlar javob shakllantirish uchun Anthropic xizmati tomonidan qayta ishlanadi.`,
      `Ushbu xizmatlarning serverlari O'zbekiston Respublikasi hududidan tashqarida joylashgan. Shaklni yuborish orqali siz bunday uzatishga rozilik bildirasiz.`,
    ]},
    { h: `5. Ma'lumotlar qancha saqlanadi`, p: [
      `[TO'LDIRISH: saqlash muddati]. Ushbu muddat tugagach ma'lumotlar o'chiriladi.`,
    ]},
    { h: `6. Sizning huquqlaringiz`, p: [
      `Siz o'z ma'lumotlaringizga kirish, ularni to'g'rilash yoki o'chirishni so'rashga haqlisiz. So'rovni info@belvest.uz manziliga yuboring — O'zbekiston Respublikasi qonunchiligida belgilangan muddatda javob beramiz.`,
    ]},
    { h: `7. O'zgartirishlar`, p: [
      `Ushbu siyosat yangilanishi mumkin. Amaldagi versiya har doim shu sahifada, oxirgi yangilanish sanasi bilan mavjud.`,
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
