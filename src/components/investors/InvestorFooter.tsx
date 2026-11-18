import Link from 'next/link';
import BelvestIcon from '@/components/BelvestIcon';
import { IR_EMAIL } from '@/data/investor-config';

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
              Asset-backed finance in Uzbekistan, structured to Islamic standards. Contracting entity:
              SEBZOR MOLIYA KSh, trading as Belvest.
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
                <a href={`mailto:${IR_EMAIL}?subject=Investor%20enquiry`} className="footer-link">
                  {IR_EMAIL}
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
            This page is for information only and is not an offer or solicitation to invest. Figures
            are management data and unaudited unless stated. Past results do not indicate future
            returns. Capital is at risk.
          </p>
          <p className="mt-3">© 2026 Belvest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
