import Link from 'next/link';
import BelvestIcon from '@/components/BelvestIcon';

const LINKS = [
  { label: 'Opportunity', href: '#opportunity' },
  { label: 'Returns', href: '#returns' },
  { label: 'Platform', href: '#platform' },
  { label: 'Team', href: '#team' },
];

export default function InvestorHeader() {
  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur"
      style={{ backgroundColor: 'rgba(0,51,50,0.94)', borderColor: 'rgba(255,240,204,0.18)' }}
    >
      <div className="mx-auto flex h-[70px] max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/en/investors/" className="flex items-center gap-2.5 select-none" aria-label="Belvest investor relations">
          <span
            className="text-[22px] font-extrabold leading-none"
            style={{ color: '#FFF0CC', letterSpacing: '0.15em' }}
          >
            BELVEST
          </span>
          <BelvestIcon className="h-7 w-auto text-[#FFF0CC]" />
          <span
            className="ml-1 hidden border-l pl-3 text-[10px] font-semibold uppercase tracking-[0.18em] sm:inline"
            style={{ borderColor: 'rgba(255,240,204,0.3)', color: 'rgba(255,240,204,0.6)' }}
          >
            Investor relations
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Investor page sections">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors"
              style={{ color: 'rgba(255,240,204,0.72)' }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="hidden text-xs font-semibold uppercase tracking-wider transition-colors sm:inline"
            style={{ color: 'rgba(255,240,204,0.6)' }}
          >
            belvest.uz
          </Link>
          <a
            href="#contact"
            className="rounded-full px-4 py-2 text-sm font-bold transition-colors"
            style={{ backgroundColor: '#FFF0CC', color: '#004445' }}
          >
            Request the pack
          </a>
        </div>
      </div>
    </header>
  );
}
