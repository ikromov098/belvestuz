'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Send, X } from 'lucide-react';

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

type Category = 'Все' | 'Новости компании' | 'Ценностное финансирование' | 'Гиды и советы';

interface Article {
  id: number;
  category: Exclude<Category, 'Все'>;
  date: string;
  title: string;
  excerpt: string;
  body: string;
}

const ARTICLES: Article[] = [
  {
    id: 1,
    category: 'Новости компании',
    date: '1 мая 2025',
    title: 'Belvest запускает новую программу лизинга для малого бизнеса',
    excerpt: 'Теперь предприниматели могут получить оборудование по программе Иджара с первоначальным взносом от 0%...',
    body: 'Belvest рада объявить о запуске обновлённой программы лизинга для малого и среднего бизнеса. Начиная с мая 2025 года, предприниматели могут получить производственное оборудование, транспорт и спецтехнику по структуре Иджара без первоначального взноса.\n\nПрограмма основана на принципах честного финансирования без процентов. Срок лизинга — от 12 до 60 месяцев. Одобрение заявки занимает 1 рабочий день.\n\nДля участия достаточно свидетельства о регистрации ИП или ООО и базовых финансовых документов. Персональный менеджер сопроводит вас на каждом этапе сделки.\n\nПо словам генерального директора Азиза Каримова: «Мы верим, что каждый предприниматель заслуживает доступа к честному финансированию. Эта программа — наш вклад в развитие честного бизнеса в Узбекистане».\n\nПодать заявку можно онлайн на сайте belvest.uz или позвонив по номеру +998 77 480-99-99.',
  },
  {
    id: 2,
    category: 'Ценностное финансирование',
    date: '25 апреля 2025',
    title: 'Что такое Мурабаха и чем она отличается от кредита?',
    excerpt: 'Мурабаха — это исламский способ финансирования покупки товара. В отличие от банковского кредита...',
    body: 'Мурабаха — структура финансирования с фиксированной наценкой, основанная на ценностях честной торговли. В отличие от традиционного кредита, при Мурабаха финансовая компания сначала сама покупает товар, а затем продаёт его клиенту по заранее оговорённой цене с фиксированной наценкой.\n\nГлавное отличие от банковского кредита — отсутствие процентов. Наценка известна с самого начала и не может увеличиться в процессе выплат. Это делает финансирование прозрачным и предсказуемым.\n\nКлиент всегда знает полную стоимость товара до подписания договора.\n\nПо принципу Мурабаха в Belvest работают: рассрочка на электронику, бытовую технику, мебель и смартфоны. Срок — от 3 до 24 месяцев. Ставка наценки фиксирована на весь период.\n\nЕсли у вас остались вопросы, обратитесь к нашим специалистам по телефону +998 77 480-99-99 или в Telegram @belvest_info.',
  },
  {
    id: 3,
    category: 'Гиды и советы',
    date: '18 апреля 2025',
    title: '5 вещей которые нужно знать перед оформлением рассрочки',
    excerpt: 'Перед тем как оформить рассрочку важно понять условия, сроки и права покупателя...',
    body: '1. Убедитесь в отсутствии скрытых комиссий. В Belvest полная стоимость всегда указывается в договоре. Никаких дополнительных платежей после подписания.\n\n2. Выберите подходящий срок. Рассрочка доступна на 3, 6, 12, 18 и 24 месяца. Чем короче срок — тем меньше переплата.\n\n3. Убедитесь в прозрачности условий. Все продукты Belvest основаны на принципе фиксированной наценки — итоговая сумма не меняется.\n\n4. Подготовьте документы заранее. Потребуется паспорт и ПИНФЛ. Решение принимается за 1 рабочий день.\n\n5. Вы можете погасить досрочно. Досрочное погашение возможно в любой момент без штрафов и пересчёта наценки.\n\nЕсли после прочтения остались вопросы — наши менеджеры готовы помочь по телефону +998 77 480-99-99.',
  },
  {
    id: 4,
    category: 'Новости компании',
    date: '10 апреля 2025',
    title: 'Belvest открывает новый офис в Ташкенте',
    excerpt: 'Мы рады сообщить об открытии нового офиса для удобства наших клиентов в центре Ташкента...',
    body: 'Belvest открывает новый офис обслуживания клиентов в центре Ташкента. Новый офис расположен по адресу: ул. Амира Тимура, и будет принимать клиентов с понедельника по пятницу с 9:00 до 18:00, а в субботу — с 10:00 до 15:00.\n\nВ новом офисе можно: подать заявку на рассрочку или лизинг, получить консультацию по всем продуктам, подписать договор и получить товар, а также получить консультацию по финансовым вопросам.\n\nОткрытие нового офиса — часть нашей стратегии по расширению физического присутствия в Узбекистане. В ближайшие месяцы планируется открытие представительств в Самарканде и Намангане.\n\nМы приглашаем всех действующих и потенциальных клиентов посетить нас. Все услуги оказываются бесплатно. Запись по телефону: +998 77 480-22-22.',
  },
  {
    id: 5,
    category: 'Ценностное финансирование',
    date: '5 апреля 2025',
    title: 'Иджара — исламский лизинг: как это работает?',
    excerpt: 'Иджара — это аренда имущества с правом выкупа. Прозрачные условия и фиксированные платежи...',
    body: 'Иджара — аналог лизинга, основанный на принципе аренды с последующей передачей права собственности. Слово «Иджара» в переводе с арабского означает «аренда» или «услуга».\n\nКак работает Иджара в Belvest: компания приобретает имущество (оборудование, транспорт, технику) и передаёт его клиенту в пользование. Клиент платит фиксированные арендные платежи. По окончании срока имущество переходит в собственность клиента.\n\nВажные отличия от традиционного лизинга: нет процентов, платежи фиксированы и не изменяются, структура основана на ценностях честного финансирования, возможен досрочный выкуп без штрафов.\n\nИджара подходит для: производственного оборудования, коммерческого транспорта, строительной и сельскохозяйственной техники, медицинского оборудования.\n\nСрок финансирования — от 12 до 60 месяцев. Минимальный платёж от 500 000 сум в месяц. Для получения консультации: +998 77 480-99-99.',
  },
  {
    id: 6,
    category: 'Гиды и советы',
    date: '1 апреля 2025',
    title: 'Как быстро получить одобрение заявки в Belvest?',
    excerpt: 'Следуйте этим простым шагам чтобы ваша заявка была рассмотрена в течение одного рабочего дня...',
    body: 'Чтобы ваша заявка была рассмотрена максимально быстро, следуйте этим рекомендациям:\n\nШаг 1. Подготовьте документы. Для физических лиц: паспорт и ПИНФЛ (14 цифр). Для ИП: свидетельство о регистрации. Для ООО: устав и свидетельство.\n\nШаг 2. Заполните заявку полностью. Незаполненные поля замедляют рассмотрение. Укажите точную сумму и желаемый срок.\n\nШаг 3. Загрузите качественные фото документов. Размытые или обрезанные фото — частая причина задержки.\n\nШаг 4. Будьте доступны по телефону. Менеджер может позвонить для уточнения деталей. Ответьте на звонок — это ускоряет процесс.\n\nШаг 5. Выберите удобный способ получения. Онлайн-подписание договора значительно быстрее визита в офис.\n\nПри соблюдении всех условий одобрение занимает от 2 до 4 часов. Вопросы: +998 77 480-99-99.',
  },
];

const CATEGORIES: Category[] = ['Все', 'Новости компании', 'Ценностное финансирование', 'Гиды и советы'];

const CATEGORY_ACCENT: Record<Exclude<Category, 'Все'>, string> = {
  'Новости компании': '#004445',
  'Ценностное финансирование': '#C9A84C',
  'Гиды и советы': '#16685B',
};

function ArticleModal({ article, onClose }: { article: Article; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(13,31,29,0.65)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-white p-8"
        style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-150 cursor-pointer"
          style={{ backgroundColor: '#FFFFFF', color: '#4A6B67' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FFF0CC')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
        >
          <X size={16} />
        </button>

        <span
          className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4"
          style={{ backgroundColor: `${CATEGORY_ACCENT[article.category]}18`, color: CATEGORY_ACCENT[article.category] }}
        >
          {article.category}
        </span>

        <p className="text-xs mb-3" style={{ color: '#4A6B67' }}>{article.date}</p>
        <h2 className="text-xl font-extrabold mb-5 leading-snug" style={{ color: '#0D1F1D' }}>{article.title}</h2>

        <div className="text-sm leading-relaxed whitespace-pre-line" style={{ color: '#4A6B67' }}>
          {article.body}
        </div>
      </div>
    </div>
  );
}

function ArticleCard({ article, onRead }: { article: Article; onRead: () => void }) {
  const accent = CATEGORY_ACCENT[article.category];
  return (
    <div
      className="bg-white rounded-xl flex flex-col overflow-hidden"
      style={{
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        border: '1px solid #16685B',
        borderTop: `3px solid ${accent}`,
      }}
    >
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div className="flex items-center justify-between">
          <span
            className="px-2.5 py-0.5 rounded-full text-xs font-bold"
            style={{ backgroundColor: `${accent}18`, color: accent }}
          >
            {article.category}
          </span>
          <span className="text-xs" style={{ color: '#4A6B67' }}>{article.date}</span>
        </div>
        <h3 className="text-sm font-extrabold leading-snug" style={{ color: '#004445' }}>
          {article.title}
        </h3>
        <p className="text-sm leading-relaxed flex-1" style={{ color: '#4A6B67' }}>
          {article.excerpt}
        </p>
        <button
          onClick={onRead}
          className="text-sm font-bold text-left transition-colors duration-150 cursor-pointer w-fit"
          style={{ color: '#C9A84C' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#A8892E')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#C9A84C')}
        >
          Читать далее →
        </button>
      </div>
    </div>
  );
}

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('Все');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const filtered = activeCategory === 'Все'
    ? ARTICLES
    : ARTICLES.filter((a) => a.category === activeCategory);

  return (
    <div>
      {/* Hero */}
      <div style={{ backgroundColor: '#004445' }} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-1.5 mb-5 text-xs" style={{ color: 'rgba(255,240,204,0.55)' }}>
            <Link href="/" style={{ color: 'rgba(255,240,204,0.55)' }}>Главная</Link>
            <span>›</span>
            <span style={{ color: '#FFF0CC' }}>Новости</span>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#C9A84C' }}>
            Блог и новости
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ color: '#FFF0CC' }}>
            Новости и статьи
          </h1>
          <p className="text-lg" style={{ color: 'rgba(255,240,204,0.75)', maxWidth: 480 }}>
            Ценностное финансирование, новости компании и полезные материалы
          </p>
        </div>
      </div>

      {/* Category filter */}
      <div style={{ backgroundColor: '#003332', borderBottom: '1px solid rgba(255,240,204,0.10)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer"
                  style={{
                    backgroundColor: active ? '#C9A84C' : 'rgba(255,240,204,0.10)',
                    color: active ? '#0D1F1D' : 'rgba(255,240,204,0.75)',
                    border: `1px solid ${active ? '#C9A84C' : 'transparent'}`,
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Articles grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onRead={() => setSelectedArticle(article)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <section style={{ backgroundColor: '#004445' }} className="py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-extrabold mb-2" style={{ color: '#FFF0CC' }}>
            Подпишитесь на новости
          </h2>
          <p className="text-sm mb-8" style={{ color: 'rgba(255,240,204,0.70)' }}>
            Узнавайте первыми об акциях и новых продуктах
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://t.me/belvest_info"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-bold transition-all duration-150"
              style={{ backgroundColor: '#C9A84C', color: '#0D1F1D' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#A8892E')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#C9A84C')}
            >
              <Send size={16} />
              Telegram канал
            </a>
            <a
              href="https://www.instagram.com/belvest.uz/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold border transition-all duration-150"
              style={{ borderColor: 'rgba(255,240,204,0.40)', color: '#FFF0CC' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,240,204,0.08)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <InstagramIcon size={16} />
              Instagram
            </a>
          </div>
        </div>
      </section>

      {/* Article modal */}
      {selectedArticle && (
        <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
      )}
    </div>
  );
}
