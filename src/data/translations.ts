export type Lang = 'uz' | 'ru' | 'en';

export const translations = {
  ru: {
    nav: {
      catalog:     'Каталог',
      leasing:     'Лизинг',
      installment: 'Рассрочка',
      tradein:     'Трейд-ин',
      investments: 'Инвестиции',
      about:       'О нас',
    },
    header: {
      cabinet: 'Личный кабинет',
      apply:   'Подать заявку',
    },
    hero: {
      title:    'Ваш надёжный партнёр для роста и развития',
      subtitle: 'Лизинг, рассрочка, трейд-ин и инвестиции',
    },
    buttons: {
      learnMore: 'Узнать больше',
      calculate: 'Рассчитать',
    },
    services: {
      leasing:     'Лизинг (Иджара)',
      installment: 'Рассрочка (Мурабаха)',
      tradein:     'Трейд-ин',
      investments: 'Инвестиции (Мудараба)',
    },
    calculator: {
      title:          'Калькулятор рассрочки',
      propertyValue:  'Стоимость товара',
      term:           'Срок (месяцев)',
      monthlyPayment: 'Ежемесячный платёж',
      applyButton:    'Оформить рассрочку',
    },
    howItWorks: {
      title: 'Как это работает',
      step1: 'Выберите товар',
      step2: 'Подайте заявку',
      step3: 'Получите одобрение',
    },
    trust: {
      badge1: 'Без скрытых комиссий',
      badge2: 'Одобрение за 1 день',
      badge3: '0% первоначальный взнос',
    },
    halal: {
      sectionLabel: 'Исламские финансы',
      title:        'Почему Халяль финансирование лучше',
      badge:        'Одобрено Шариатским советом',
      bankCol:      'Обычный банк',
      belvestCol:   'Belvest Халяль',
      row1:         'Без Риба (без процентов)',
      row2:         'Фиксированная наценка (Мурабаха)',
      row3:         'Полная прозрачность условий',
      row4:         'Соответствие Шариату',
      row5:         'Разделение прибыли (Мудараба)',
    },
    catalog: {
      breadcrumbHome:  'Главная',
      title:           'Каталог товаров',
      subtitle:        'Все товары доступны в рассрочку и лизинг',
      search:          'Поиск по названию или бренду...',
      filters:         'Фильтры',
      clear:           'Сбросить',
      servicesLabel:   'Услуги',
      maxPrice:        'Макс. цена',
      brandLabel:      'Бренд',
      inStockOnly:     'Только в наличии',
      outOfStock:      'Нет в наличии',
      from:            'от',
      applyLeasing:    'Оформить лизинг',
      applyInstallment:'Оформить рассрочку',
      noResults:       'Ничего не найдено',
      noResultsSub:    'Попробуйте изменить параметры фильтра',
      resetFilters:    'Сбросить фильтры',
      filtersBtn:      'Фильтры',
      inStock:         'В наличии',
      itemsCount:      'товаров',
      categories: {
        all:         'Все товары',
        electronics: 'Электроника',
        appliances:  'Бытовая техника',
        furniture:   'Мебель',
        transport:   'Транспорт',
        equipment:   'Спецтехника / Оборудование',
      },
      serviceNames: {
        installment: 'Рассрочка',
        leasing:     'Лизинг',
        tradein:     'Трейд-ин',
      },
    },
    about: {
      heroLabel:        'О компании',
      heroTitle:        'О компании Belvest',
      heroSubtitle:     'Надёжный финансовый партнёр для жителей и бизнеса Узбекистана',
      missionQuote:     '«Наша миссия — сделать финансовые услуги доступными для каждого»',
      missionBody:      'Мы верим, что качественные финансовые инструменты — лизинг, рассрочка, трейд-ин и инвестиции — должны быть доступны каждому жителю и бизнесу Узбекистана, независимо от размера и опыта.',
      teamLabel:        'Наша команда',
      teamTitle:        'Люди, которым вы доверяете',
      whyLabel:         'Почему Belvest',
      whyTitle:         'Наши принципы',
      why1Title:        'Прозрачность',
      why1Desc:         'Никаких скрытых комиссий и дополнительных платежей. Все условия прописаны в договоре.',
      why2Title:        'Скорость',
      why2Desc:         'Заявка рассматривается в течение 1 рабочего дня. Деньги или товар — без лишних ожиданий.',
      why3Title:        'Надёжность',
      why3Desc:         'Лицензированная компания, работающая в соответствии с законодательством Узбекистана.',
      contactLabel:     'Контакты',
      contactTitle:     'Мы всегда на связи',
      contactApply:     'Подать заявку',
      contactAddrLabel: 'Адрес',
      contactPhoneLabel:'Телефон',
      contactEmailLabel:'Email',
      contactHoursLabel:'Режим работы',
    },
  },
  uz: {
    nav: {
      catalog:     'Katalog',
      leasing:     'Lizing',
      installment: 'Nasiya',
      tradein:     'Treyd-in',
      investments: 'Investitsiya',
      about:       'Biz haqimizda',
    },
    header: {
      cabinet: 'Shaxsiy kabinet',
      apply:   'Ariza berish',
    },
    hero: {
      title:    "O'sish va rivojlanish uchun ishonchli hamkoringiz",
      subtitle: 'Lizing, nasiya, treyd-in va investitsiyalar',
    },
    buttons: {
      learnMore: 'Batafsil',
      calculate: 'Hisoblash',
    },
    services: {
      leasing:     'Lizing (Ijara)',
      installment: 'Nasiya (Murabaha)',
      tradein:     'Treyd-in',
      investments: 'Investitsiya (Mudaraba)',
    },
    calculator: {
      title:          'Nasiya kalkulyatori',
      propertyValue:  'Tovar narxi',
      term:           "Muddat (oy)",
      monthlyPayment: "Oylik to'lov",
      applyButton:    'Nasiya rasmiylashtirish',
    },
    howItWorks: {
      title: 'Bu qanday ishlaydi',
      step1: 'Tovarni tanlang',
      step2: 'Ariza bering',
      step3: 'Tasdiqlash oling',
    },
    trust: {
      badge1: "Yashirin to'lovlar yo'q",
      badge2: '1 kunda tasdiqlash',
      badge3: "0% boshlang'ich to'lov",
    },
    halal: {
      sectionLabel: 'Islom moliyasi',
      title:        'Nima uchun Halol moliyalashtirish yaxshiroq',
      badge:        'Shariat kengashi tomonidan tasdiqlangan',
      bankCol:      'Oddiy bank',
      belvestCol:   'Belvest Halol',
      row1:         "Riba yo'q (foizsiz)",
      row2:         'Belgilangan ustama (Murabaha)',
      row3:         "To'liq shaffoflik",
      row4:         'Shariat talablariga muvofiqlik',
      row5:         'Foyda taqsimoti (Mudaraba)',
    },
    catalog: {
      breadcrumbHome:  'Bosh sahifa',
      title:           'Tovarlar katalogi',
      subtitle:        'Barcha tovarlar nasiya va lizingda mavjud',
      search:          "Nom yoki brend bo'yicha qidirish...",
      filters:         'Filtrlar',
      clear:           'Tozalash',
      servicesLabel:   'Xizmatlar',
      maxPrice:        'Maks. narx',
      brandLabel:      'Brend',
      inStockOnly:     'Faqat mavjud',
      outOfStock:      'Mavjud emas',
      from:            'dan',
      applyLeasing:    'Lizing rasmiylashtirish',
      applyInstallment:'Nasiya rasmiylashtirish',
      noResults:       'Hech narsa topilmadi',
      noResultsSub:    "Filtr parametrlarini o'zgartiring",
      resetFilters:    'Filtrlarni tozalash',
      filtersBtn:      'Filtrlar',
      inStock:         'Mavjud',
      itemsCount:      'tovar',
      categories: {
        all:         'Barcha tovarlar',
        electronics: 'Elektronika',
        appliances:  'Maishiy texnika',
        furniture:   'Mebel',
        transport:   'Transport',
        equipment:   'Maxsus texnika / Uskunalar',
      },
      serviceNames: {
        installment: 'Nasiya',
        leasing:     'Lizing',
        tradein:     'Treyd-in',
      },
    },
    about: {
      heroLabel:        'Kompaniya haqida',
      heroTitle:        'Belvest haqida',
      heroSubtitle:     "O'zbekiston aholisi va biznesi uchun ishonchli moliyaviy hamkor",
      missionQuote:     '«Bizning missiyamiz — moliyaviy xizmatlarni hamma uchun ochiq qilish»',
      missionBody:      "Biz sifatli moliyaviy vositalar — lizing, nasiya, treyd-in va investitsiyalar — O'zbekistonning har bir fuqarosi va biznesi uchun ochiq bo'lishi kerak deb ishoniladi.",
      teamLabel:        'Bizning jamoamiz',
      teamTitle:        'Siz ishongan odamlar',
      whyLabel:         'Nima uchun Belvest',
      whyTitle:         'Bizning tamoyillarimiz',
      why1Title:        'Shaffoflik',
      why1Desc:         "Hech qanday yashirin to'lovlar va qo'shimcha to'lovlar yo'q. Barcha shartlar shartnomada ko'rsatilgan.",
      why2Title:        'Tezlik',
      why2Desc:         "Ariza 1 ish kuni ichida ko'rib chiqiladi. Pul yoki tovar — ortiqcha kutmasdan.",
      why3Title:        'Ishonchlilik',
      why3Desc:         "O'zbekiston qonunchiligiga muvofiq ishlaydigan litsenziyalangan kompaniya.",
      contactLabel:     'Aloqa',
      contactTitle:     'Biz doim aloqadamiz',
      contactApply:     'Ariza berish',
      contactAddrLabel: 'Manzil',
      contactPhoneLabel:'Telefon',
      contactEmailLabel:'Email',
      contactHoursLabel:'Ish vaqti',
    },
  },
  en: {
    nav: {
      catalog:     'Catalog',
      leasing:     'Leasing',
      installment: 'Installment',
      tradein:     'Trade-in',
      investments: 'Investments',
      about:       'About us',
    },
    header: {
      cabinet: 'My Account',
      apply:   'Apply Now',
    },
    hero: {
      title:    'Your reliable partner for growth and development',
      subtitle: 'Leasing, installment, trade-in and investments',
    },
    buttons: {
      learnMore: 'Learn more',
      calculate: 'Calculate',
    },
    services: {
      leasing:     'Leasing (Ijara)',
      installment: 'Installment (Murabaha)',
      tradein:     'Trade-in',
      investments: 'Investments (Mudaraba)',
    },
    calculator: {
      title:          'Installment Calculator',
      propertyValue:  'Product value',
      term:           'Term (months)',
      monthlyPayment: 'Monthly payment',
      applyButton:    'Apply now',
    },
    howItWorks: {
      title: 'How it works',
      step1: 'Choose a product',
      step2: 'Submit application',
      step3: 'Get approved',
    },
    trust: {
      badge1: 'No hidden fees',
      badge2: '1-day approval',
      badge3: '0% down payment',
    },
    halal: {
      sectionLabel: 'Islamic Finance',
      title:        'Why Halal Financing is Better',
      badge:        'Approved by Sharia Board',
      bankCol:      'Regular bank',
      belvestCol:   'Belvest Halal',
      row1:         'No Riba (no interest)',
      row2:         'Fixed markup (Murabaha)',
      row3:         'Full transparency',
      row4:         'Sharia compliance',
      row5:         'Profit sharing (Mudaraba)',
    },
    catalog: {
      breadcrumbHome:  'Home',
      title:           'Product catalog',
      subtitle:        'All products available on installment and leasing',
      search:          'Search by name or brand...',
      filters:         'Filters',
      clear:           'Clear',
      servicesLabel:   'Services',
      maxPrice:        'Max price',
      brandLabel:      'Brand',
      inStockOnly:     'In stock only',
      outOfStock:      'Out of stock',
      from:            'from',
      applyLeasing:    'Apply for leasing',
      applyInstallment:'Apply for installment',
      noResults:       'Nothing found',
      noResultsSub:    'Try adjusting your filters',
      resetFilters:    'Reset filters',
      filtersBtn:      'Filters',
      inStock:         'In stock',
      itemsCount:      'products',
      categories: {
        all:         'All products',
        electronics: 'Electronics',
        appliances:  'Appliances',
        furniture:   'Furniture',
        transport:   'Transport',
        equipment:   'Equipment / Machinery',
      },
      serviceNames: {
        installment: 'Installment',
        leasing:     'Leasing',
        tradein:     'Trade-in',
      },
    },
    about: {
      heroLabel:        'About us',
      heroTitle:        'About Belvest',
      heroSubtitle:     'Reliable financial partner for residents and businesses of Uzbekistan',
      missionQuote:     '«Our mission — to make financial services accessible to everyone»',
      missionBody:      'We believe quality financial tools — leasing, installment, trade-in and investments — should be accessible to every resident and business in Uzbekistan, regardless of size or experience.',
      teamLabel:        'Our team',
      teamTitle:        'People you trust',
      whyLabel:         'Why Belvest',
      whyTitle:         'Our principles',
      why1Title:        'Transparency',
      why1Desc:         'No hidden fees or extra charges. All terms are written in the contract.',
      why2Title:        'Speed',
      why2Desc:         'Applications reviewed within 1 business day. Money or goods — without unnecessary waiting.',
      why3Title:        'Reliability',
      why3Desc:         'A licensed company operating in accordance with the legislation of Uzbekistan.',
      contactLabel:     'Contacts',
      contactTitle:     'Always in touch',
      contactApply:     'Apply now',
      contactAddrLabel: 'Address',
      contactPhoneLabel:'Phone',
      contactEmailLabel:'Email',
      contactHoursLabel:'Working hours',
    },
  },
} satisfies Record<Lang, {
  nav:        { catalog: string; leasing: string; installment: string; tradein: string; investments: string; about: string };
  header:     { cabinet: string; apply: string };
  hero:       { title: string; subtitle: string };
  buttons:    { learnMore: string; calculate: string };
  services:   { leasing: string; installment: string; tradein: string; investments: string };
  calculator: { title: string; propertyValue: string; term: string; monthlyPayment: string; applyButton: string };
  howItWorks: { title: string; step1: string; step2: string; step3: string };
  trust:      { badge1: string; badge2: string; badge3: string };
  halal: {
    sectionLabel: string; title: string; badge: string;
    bankCol: string; belvestCol: string;
    row1: string; row2: string; row3: string; row4: string; row5: string;
  };
  catalog: {
    breadcrumbHome: string; title: string; subtitle: string; search: string;
    filters: string; clear: string; servicesLabel: string; maxPrice: string;
    brandLabel: string; inStockOnly: string; outOfStock: string; from: string;
    applyLeasing: string; applyInstallment: string; noResults: string;
    noResultsSub: string; resetFilters: string; filtersBtn: string;
    inStock: string; itemsCount: string;
    categories: { all: string; electronics: string; appliances: string; furniture: string; transport: string; equipment: string };
    serviceNames: { installment: string; leasing: string; tradein: string };
  };
  about: {
    heroLabel: string; heroTitle: string; heroSubtitle: string;
    missionQuote: string; missionBody: string;
    teamLabel: string; teamTitle: string;
    whyLabel: string; whyTitle: string;
    why1Title: string; why1Desc: string;
    why2Title: string; why2Desc: string;
    why3Title: string; why3Desc: string;
    contactLabel: string; contactTitle: string; contactApply: string;
    contactAddrLabel: string; contactPhoneLabel: string; contactEmailLabel: string; contactHoursLabel: string;
  };
}>;

export type Translations = typeof translations.ru;
