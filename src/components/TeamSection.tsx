'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface Localized {
  name: string;
  role: string;
  bio: string;
  initials: string;
}
interface Member {
  ru: Localized;
  uz: Localized;
}

const TEAM: Member[] = [
  {
    ru: {
      name: 'Умид Икрамов',
      role: 'Представитель',
      initials: 'УИ',
      bio: 'Представитель акционера и советник по вопросам корпоративного управления и аудита в Belvest. Более 20 лет опыта в аудите и корпоративном управлении, включая 4 года в компаниях Большой четвёрки в России и Центральной Азии, где руководил международными командами более 30 человек. 16 лет занимал позицию главного аудитора в международной компании с мультимиллиардными активами, выступая доверенным советником CEO и совета директоров. Присяжный бухгалтер США (US CPA), штат Нью-Гэмпшир.',
    },
    uz: {
      name: 'Umid Ikramov',
      role: 'Vakili',
      initials: 'UI',
      bio: "Belvestda aksiyador vakili va korporativ boshqaruv hamda audit masalalari bo'yicha maslahatchi. Audit va korporativ boshqaruvda 20 yildan ortiq tajribaga ega, jumladan Rossiya va Markaziy Osiyoda Big Four kompaniyalarida 4 yil ishlab, 30 dan ortiq kishidan iborat xalqaro jamoalarga rahbarlik qilgan. Multimilliard aktivlarga ega xalqaro kompaniyada 16 yil bosh auditor lavozimida ishlab, CEO va direktorlar kengashining ishonchli maslahatchisi bo'lgan. AQSh Prisyajniy buxgalteri (US CPA), Nyu-Xempshir shtati.",
    },
  },
  {
    ru: {
      name: 'Шерзод Иногамов',
      role: 'Управляющий директор',
      initials: 'ШИ',
      bio: 'Управляющий директор Belvest, отвечает за операционную стратегию и развитие направления автофинансирования. Более 15 лет опыта в горнодобывающей, финансовой и автомобильной отраслях. Начинал карьеру в Sandvik Mining & Construction на крупных проектах в Кыргызстане и Казахстане, затем развил экспертизу в финансах и продажах. Последние годы занимал руководящую должность в Markab, углубив знание автомобильного рынка и операционной эффективности.',
    },
    uz: {
      name: 'Sherzod Inogamov',
      role: 'Boshqaruvchi direktor',
      initials: 'SI',
      bio: "Belvestning boshqaruvchi hamkori, operatsion strategiya va avtomoliyalashtirish yo'nalishini rivojlantirish uchun javobgar. Kon-metallurgiya, moliya va avtomobil sohalarida 15 yildan ortiq tajribaga ega. Faoliyatini Sandvik Mining & Construction kompaniyasida Qirg'iziston va Qozog'istondagi yirik loyihalarda boshlagan, so'ngra moliya va sotuvlar sohasida ekspertiza rivojlantirgan. So'nggi yillarda Markab kompaniyasida rahbarlik lavozimida ishlab, avtomobil bozori va operatsion samaradorlik bo'yicha bilimini chuqurlashtirgan.",
    },
  },
  {
    ru: {
      name: 'София Юлдашева',
      role: 'Партнёр',
      initials: 'СЮ',
      bio: 'Партнёр Belvest, консультирует по вопросам корпоративного управления, управления рисками и внутреннего аудита. Более 30 лет опыта в аудите и корпоративном управлении, включая 11 лет в компаниях Большой четвёрки (Великобритания, Центральная Азия), где руководила международными командами свыше 70 человек. 5 лет занимала позиции директора и главного аудитора в инвестиционных компаниях на Ближнем Востоке и в США. CIA, FCCA, MAcc. Заместитель председателя совета узбекского отделения Института внутренних аудиторов США (The IIA).',
    },
    uz: {
      name: 'Sofiya Yuldasheva',
      role: 'Hamkor',
      initials: 'SY',
      bio: "Belvestning hamkori, korporativ boshqaruv, risklarni boshqarish va ichki audit masalalari bo'yicha maslahat beradi. Audit va korporativ boshqaruvda 30 yildan ortiq tajribaga ega, jumladan Buyuk Britaniya va Markaziy Osiyoda Big Four firmalarida 11 yil ishlab, 70 dan ortiq kishidan iborat xalqaro jamoalarga rahbarlik qilgan. Yaqin Sharq va AQShdagi investitsiya kompaniyalarida 5 yil direktor va bosh auditor lavozimlarida ishlagan. CIA, FCCA, MAcc unvonlariga ega. AQSh Ichki auditorlar institutining (The IIA) o'zbek bo'limi kengash raisi o'rinbosari.",
    },
  },
];

export default function TeamSection() {
  const { t, lang } = useLanguage();
  const [active, setActive] = useState<number | null>(null);
  const [shown, setShown] = useState(false);

  const close = () => {
    setShown(false);
    setActive(null);
  };

  useEffect(() => {
    if (active === null) return;
    const raf = requestAnimationFrame(() => setShown(true));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('keydown', onKey);
    };
  }, [active]);

  const activeMember = active !== null ? TEAM[active][lang] : null;

  return (
    <section style={{ padding: '80px 16px 40px' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold" style={{ color: '#0D1F1D' }}>
            {t.about.teamTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {TEAM.map((member, i) => {
            const d = member[lang];
            return (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                className="w-full bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer px-6 py-12 flex flex-col items-center text-center"
                style={{ border: '1px solid #16685B' }}
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-xl font-bold mb-4 shrink-0"
                  style={{ backgroundColor: '#004445', color: '#FFF0CC' }}
                >
                  {d.initials}
                </div>
                <p className="font-bold text-base" style={{ color: '#0D1F1D' }}>{d.name}</p>
                <p className="text-sm font-semibold mt-1" style={{ color: '#548870' }}>{d.role}</p>
              </button>
            );
          })}
        </div>
      </div>

      {activeMember && (
        <div
          onClick={close}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            backgroundColor: 'rgba(13,31,29,0.6)',
            opacity: shown ? 1 : 0,
            transition: 'opacity 200ms ease',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-2xl p-8 sm:p-10 w-full max-w-[500px] max-h-[85vh] overflow-y-auto"
            style={{
              boxShadow: '0 24px 64px rgba(0,0,0,0.28)',
              opacity: shown ? 1 : 0,
              transform: shown ? 'scale(1)' : 'scale(0.95)',
              transition: 'opacity 200ms ease, transform 200ms ease',
            }}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute top-4 right-4 p-1 cursor-pointer"
              style={{ color: '#4A6B67' }}
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div
                className="rounded-full flex items-center justify-center text-2xl font-bold mb-5 shrink-0"
                style={{ width: 100, height: 100, backgroundColor: '#004445', color: '#FFF0CC' }}
              >
                {activeMember.initials}
              </div>
              <p className="text-xl font-extrabold" style={{ color: '#0D1F1D' }}>
                {activeMember.name}
              </p>
              <p className="text-sm font-semibold mt-1 mb-5" style={{ color: '#548870' }}>
                {activeMember.role}
              </p>
              <p className="text-sm leading-relaxed text-left" style={{ color: '#4A6B67' }}>
                {activeMember.bio}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
