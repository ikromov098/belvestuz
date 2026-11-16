import Link from 'next/link';
import BelvestIcon from '@/components/BelvestIcon';

export default function InvestorFooter() {
  return (
    <footer style={{ backgroundColor: '#003332' }}>
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span
                className="text-[22px] font-extrabold leading-none"
                style={{ color: '#FFF0CC', letterSpacing: '0.15em' }}
              >
                BELVEST
              </span>
              <BelvestIcon className="h-7 w-auto text-[#FFF0CC]" />
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed" style={{ color: 'rgba(255,240,204,0.65)' }}>
              AI-first halal finance for small and medium businesses in Uzbekistan. Asset-backed
              Murabaha and Ijara, funded through Mudaraba pools.
            </p>
            <p className="mt-4 text-sm" style={{ color: 'rgba(255,240,204,0.5)' }}>
              Tashkent, Uzbekistan
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: '#FFF0CC' }}>
              Investor relations
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href="mailto:info@belvest.uz?subject=Investor%20enquiry" className="footer-link">
                  info@belvest.uz
                </a>
              </li>
              <li>
                <a href="tel:+998774809999" className="footer-link">
                  +998 77 480-99-99
                </a>
              </li>
              <li>
                <a href="#contact" className="footer-link">
                  Request the investor pack
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: '#FFF0CC' }}>
              Belvest
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/" className="footer-link">
                  Main site (RU / UZ)
                </Link>
              </li>
              <li>
                <Link href="/investments" className="footer-link">
                  Investment products
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="footer-link">
                  Contacts
                </Link>
              </li>
              <li>
                <Link href="/terms" className="footer-link">
                  Terms of use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-12 border-t pt-6 text-xs leading-relaxed"
          style={{ borderColor: 'rgba(255,240,204,0.18)', color: 'rgba(255,240,204,0.48)' }}
        >
          <p>
            This page is for information only. It is not an offer, solicitation or recommendation to buy
            or sell any security or investment product, and it does not create a client relationship.
            Target returns are not guaranteed; investment involves risk, including loss of capital.
            Any investment is made only under a written agreement and is intended for qualified and
            institutional investors. Figures and terms may change without notice.
          </p>
          <p className="mt-3">© 2026 Belvest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
