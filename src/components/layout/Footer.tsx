import Link from 'next/link';
import BelvestIcon from '@/components/BelvestIcon';

function BelvестLogo() {
  return (
    <div className="flex items-center gap-2.5 select-none">
      <span style={{ fontWeight: 800, letterSpacing: '0.15em', fontSize: '22px', color: '#FFF0CC', lineHeight: 1 }}>
        BELVEST
      </span>
      <BelvestIcon className="h-7 w-auto text-[#FFF0CC]" />
    </div>
  );
}

const COLUMNS = [
  {
    heading: 'Услуги',
    links: [
      { label: 'Лизинг',      href: '/leasing'     },
      { label: 'Рассрочка',   href: '/rassrochka'  },
      { label: 'Трейд-ин',    href: '/trade-in'    },
      { label: 'Инвестиции',  href: '/investments' },
    ],
  },
  {
    heading: 'Клиентам',
    links: [
      { label: 'Личный кабинет', href: '/portal'  },
      { label: 'Подать заявку',  href: '/apply'   },
      { label: 'Калькулятор',    href: '/'        },
      { label: 'FAQ',            href: '/faq'     },
    ],
  },
  {
    heading: 'Компания',
    links: [
      { label: 'О нас',    href: '/about'    },
      { label: 'Партнёры', href: '/partners' },
      { label: 'Новости',            href: '/news'     },
      { label: 'Контакты',           href: '/contacts' },
      { label: 'FAQ',                href: '/faq'      },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#003332' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-10">
          <BelvестLogo />
          <p className="text-sm" style={{ color: 'rgba(255,240,204,0.65)', maxWidth: '320px' }}>
            Надёжный финансовый партнёр в Узбекистане
          </p>
        </div>

        {/* Four columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h4 className="text-sm font-semibold uppercase mb-4"
                style={{ color: '#C9A84C', letterSpacing: '0.05em' }}>
                {col.heading}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="footer-link text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contacts */}
          <div>
            <h4 className="text-sm font-semibold uppercase mb-4"
              style={{ color: '#C9A84C', letterSpacing: '0.05em' }}>
              Контакты
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li className="text-sm" style={{ color: 'rgba(255,240,204,0.65)' }}>
                Ташкент, Узбекистан
              </li>
              <li>
                <a href="tel:+998774809999" className="footer-link text-sm">
                  +998 77 480-99-99
                </a>
              </li>
              <li>
                <a href="tel:+998774802222" className="footer-link text-sm">
                  +998 77 480-22-22
                </a>
              </li>
              <li>
                <a href="mailto:info@belvest.uz" className="footer-link text-sm">
                  info@belvest.uz
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/belvest.uz/" target="_blank" rel="noopener noreferrer" className="footer-link text-sm">
                  @belvest.uz
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t" style={{ borderColor: 'rgba(255,240,204,0.20)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: 'rgba(255,240,204,0.60)' }}>
            © 2025 Belvest. Все права защищены.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="footer-link-sm text-xs">
              Политика конфиденциальности
            </Link>
            <span style={{ color: 'rgba(255,240,204,0.30)' }}>•</span>
            <Link href="/terms" className="footer-link-sm text-xs">
              Условия использования
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
