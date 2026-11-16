// Team and shareholder data shared by /about and /en/investors.
// Names, roles and facts come from the owner: the about page, and the October 2026
// seed equity deck ("Belvest Seed equity raise.html"). Do not add a claim that is not
// in one of those sources; biographies and photos need the owner's approval.

export type LocalizedTeamMember = {
  name: string;
  role: string;
  bio: string;
};

export type TeamMember = {
  id: string;
  initials: string;
  group: 'leadership' | 'oversight';
  about: boolean;
  ru: LocalizedTeamMember;
  uz: LocalizedTeamMember;
  en: LocalizedTeamMember;
};

export const TEAM: TeamMember[] = [
  {
    id: 'umid',
    initials: 'UI',
    group: 'oversight',
    about: true,
    ru: {
      name: 'Умид Икрамов',
      role: 'Представитель',
      bio: 'Представитель акционера и советник по вопросам корпоративного управления и аудита в Belvest. Более 20 лет опыта в аудите и корпоративном управлении, включая 4 года в компаниях Большой четвёрки в России и Центральной Азии, где руководил международными командами более 30 человек. 16 лет занимал позицию главного аудитора в международной компании с мультимиллиардными активами, выступая доверенным советником CEO и совета директоров. Присяжный бухгалтер США (US CPA), штат Нью-Гэмпшир.',
    },
    uz: {
      name: 'Umid Ikramov',
      role: 'Vakili',
      bio: "Belvestda aksiyador vakili va korporativ boshqaruv hamda audit masalalari bo'yicha maslahatchi. Audit va korporativ boshqaruvda 20 yildan ortiq tajribaga ega, jumladan Rossiya va Markaziy Osiyoda Big Four kompaniyalarida 4 yil ishlab, 30 dan ortiq kishidan iborat xalqaro jamoalarga rahbarlik qilgan. Multimilliard aktivlarga ega xalqaro kompaniyada 16 yil bosh auditor lavozimida ishlab, CEO va direktorlar kengashining ishonchli maslahatchisi bo'lgan. AQSh Prisyajniy buxgalteri (US CPA), Nyu-Xempshir shtati.",
    },
    en: {
      name: 'Umid Ikramov',
      role: 'Shareholder Representative',
      bio: 'Shareholder representative and adviser on corporate governance and audit. More than 20 years in audit and corporate governance, including four years at Big Four firms in Russia and Central Asia, leading international teams of 30+. He spent 16 years as chief auditor at an international company with multi-billion-dollar assets, advising the CEO and the board. US CPA (New Hampshire).',
    },
  },
  {
    id: 'sherzod',
    initials: 'SI',
    group: 'leadership',
    about: true,
    ru: {
      name: 'Шерзод Иногамов',
      role: 'Управляющий директор',
      bio: 'Управляющий директор Belvest, отвечает за операционную стратегию и развитие направления автофинансирования. Более 15 лет опыта в горнодобывающей, финансовой и автомобильной отраслях. Начинал карьеру в Sandvik Mining & Construction на крупных проектах в Кыргызстане и Казахстане, затем развил экспертизу в финансах и продажах. Последние годы занимал руководящую должность в Markab, углубив знание автомобильного рынка и операционной эффективности.',
    },
    uz: {
      name: 'Sherzod Inogamov',
      role: 'Boshqaruvchi direktor',
      bio: "Belvestning boshqaruvchi hamkori, operatsion strategiya va avtomoliyalashtirish yo'nalishini rivojlantirish uchun javobgar. Kon-metallurgiya, moliya va avtomobil sohalarida 15 yildan ortiq tajribaga ega. Faoliyatini Sandvik Mining & Construction kompaniyasida Qirg'iziston va Qozog'istondagi yirik loyihalarda boshlagan, so'ngra moliya va sotuvlar sohasida ekspertiza rivojlantirgan. So'nggi yillarda Markab kompaniyasida rahbarlik lavozimida ishlab, avtomobil bozori va operatsion samaradorlik bo'yicha bilimini chuqurlashtirgan.",
    },
    en: {
      name: 'Sherzod Inogʻamov',
      role: 'Managing Director',
      bio: 'Managing Director, responsible for operating strategy and the auto-finance direction. 15+ years in mining, finance and automotive. He began at Sandvik Mining & Construction on major projects in Kyrgyzstan and Kazakhstan, then built expertise in finance and sales. Most recently he held a senior role at Markab, deepening his knowledge of the automotive market and operational efficiency.',
    },
  },
  {
    id: 'sofiya',
    initials: 'SY',
    group: 'leadership',
    about: true,
    ru: {
      name: 'София Юлдашева',
      role: 'Партнёр',
      bio: 'Партнёр Belvest, консультирует по вопросам корпоративного управления, управления рисками и внутреннего аудита. Более 30 лет опыта в аудите и корпоративном управлении, включая 11 лет в компаниях Большой четвёрки (Великобритания, Центральная Азия), где руководила международными командами свыше 70 человек. 5 лет занимала позиции директора и главного аудитора в инвестиционных компаниях на Ближнем Востоке и в США. CIA, FCCA, MAcc. Заместитель председателя совета узбекского отделения Института внутренних аудиторов США (The IIA).',
    },
    uz: {
      name: 'Sofiya Yuldasheva',
      role: 'Hamkor',
      bio: "Belvestning hamkori, korporativ boshqaruv, risklarni boshqarish va ichki audit masalalari bo'yicha maslahat beradi. Audit va korporativ boshqaruvda 30 yildan ortiq tajribaga ega, jumladan Buyuk Britaniya va Markaziy Osiyoda Big Four firmalarida 11 yil ishlab, 70 dan ortiq kishidan iborat xalqaro jamoalarga rahbarlik qilgan. Yaqin Sharq va AQShdagi investitsiya kompaniyalarida 5 yil direktor va bosh auditor lavozimlarida ishlagan. CIA, FCCA, MAcc unvonlariga ega. AQSh Ichki auditorlar institutining (The IIA) o'zbek bo'limi kengash raisi o'rinbosari.",
    },
    en: {
      name: 'Sofiya Yuldasheva',
      role: 'Partner · CIA, FCCA, MAcc',
      bio: 'Partner, advising on corporate governance, risk management and internal audit. More than 30 years in audit and corporate governance, including 11 years at Big Four firms in the UK and Central Asia, leading international teams of 70+. Five years as a director and chief auditor at investment companies in the Middle East and the US. CIA, FCCA, MAcc. Deputy Chair of the board of the Uzbek chapter of the Institute of Internal Auditors (The IIA).',
    },
  },
  {
    id: 'abdurauf',
    initials: 'AZ',
    group: 'leadership',
    about: true,
    ru: {
      name: 'Абдурауф Зупаров',
      role: 'Партнёр',
      bio: 'Более 25 лет в индустрии HoReCa. Руководил командами численностью свыше 300 человек, открыл несколько гостиниц уровня 4★+ и более 15 ресторанов в Узбекистане и Казахстане. В 2007, 2012, 2013 и 2014 годах реализовал проекты с наиболее высокой прибыльностью и выручкой в Астане, при этом одну из самых низких себестоимостей в отрасли. С 2014 по 2019 год стабильно входил в число лучших и самых посещаемых ресторанов столицы. Сегодня сосредоточен на развитии инновационных, энергоэффективных и устойчивых решений в гостиничном и ресторанном бизнесе, а также на инвестициях в финансовые услуги и строительство.',
    },
    uz: {
      name: 'Abdurauf Zuparov',
      role: 'Hamkor',
      bio: "HoReCa sohasida 25 yildan ortiq tajribaga ega. 300 dan ortiq kishidan iborat jamoalarga rahbarlik qilgan, O'zbekiston va Qozog'istonda bir nechta 4★+ darajali mehmonxonalar va 15 dan ortiq restoran ochgan. 2007, 2012, 2013 va 2014-yillarda Ostonada eng yuqori daromadlilik va tushumga ega, shu bilan birga sohadagi eng past tannarxlardan biriga ega loyihalarni amalga oshirgan. 2014–2019-yillarda poytaxtning eng yaxshi va eng ko'p tashrif buyuriladigan restoranlari qatorida barqaror o'rin egallagan. Bugungi kunda mehmonxona va restoran biznesida innovatsion, energiya samarali va barqaror yechimlarni rivojlantirishga, shuningdek moliyaviy xizmatlar va qurilishga investitsiyalarga e'tibor qaratmoqda.",
    },
    en: {
      name: 'Abdurauf Zuparov',
      role: 'Partner',
      bio: 'Partner. 25+ years in HoReCa, leading teams of 300+. He has opened several 4★+ hotels and more than 15 restaurants in Uzbekistan and Kazakhstan, with projects recognised for high profitability and low cost in Astana. Since 2014 he has focused on innovative, energy-efficient hospitality and on investments in financial services and construction.',
    },
  },
  {
    id: 'anvar',
    initials: 'AN',
    group: 'oversight',
    about: false,
    ru: {
      name: 'Анвар Нигматов',
      role: 'Представитель акционера',
      bio: 'Представитель акционера. 19 лет в международных финансовых институтах; Wharton, ICC, CIBAFI; управлял портфелем $500 млн.',
    },
    uz: {
      name: 'Anvar Nigmatov',
      role: 'Aksiyador vakili',
      bio: "Aksiyador vakili. Xalqaro moliya institutlarida 19 yil; Wharton, ICC, CIBAFI; $500 mln portfelni boshqargan.",
    },
    en: {
      name: 'Anvar Nigmatov',
      role: 'Shareholder Representative',
      bio: 'Shareholder representative. 19 years at international financial institutions; Wharton; ICC and CIBAFI; has managed a $500M portfolio.',
    },
  },
];

export const ABOUT_TEAM = TEAM.filter((member) => member.about);
export const LEADERSHIP_TEAM = TEAM.filter((member) => member.group === 'leadership');
export const OVERSIGHT_TEAM = TEAM.filter((member) => member.group === 'oversight');
