import type { Metadata } from 'next';
import Link from 'next/link';
import { INVESTMENT_PLANS } from '@/data/investments';
import { LEADERSHIP_TEAM, OVERSIGHT_TEAM } from '@/data/team';
import InvestorHeader from '@/components/investors/InvestorHeader';
import InvestorFooter from '@/components/investors/InvestorFooter';
import InvestorContactForm from '@/components/investors/InvestorContactForm';
import SetDocumentLang from '@/components/investors/SetDocumentLang';

export const metadata: Metadata = {
  title: 'Investor relations — Belvest',
  description:
    'Belvest is an AI-first halal finance platform for Uzbek SMEs. Mudaraba investment tiers, asset-backed Murabaha and Ijara, the team behind the book, and portfolio data on request.',
  alternates: { canonical: 'https://belvest.uz/en/investors/' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Investor relations — Belvest',
    description:
      'AI-first halal finance for Uzbek SMEs. Mudaraba profit sharing, asset-backed Murabaha and Ijara, and a team drawn from Big Four audit and international financial institutions.',
    url: 'https://belvest.uz/en/investors/',
    siteName: 'Belvest',
    locale: 'en_US',
    type: 'website',
  },
};

const TIER_COPY: Record<string, { name: string; features: string[] }> = {
  base: {
    name: 'Base',
    features: ['Monthly profit distribution', 'Early exit after 2 months', 'Online investor account'],
  },
  standard: {
    name: 'Standard',
    features: ['Monthly or quarterly payouts', 'Personal manager', 'Early exit after 2 months'],
  },
  premium: {
    name: 'Premium',
    features: ['Flexible payout schedule', 'Priority service', 'Tax support'],
  },
};

const money = (value: number) => `$${value.toLocaleString('en-US')}`;

const termLabel = (min: number, max: number) => (min === max ? `${max} months` : `${min}–${max} months`);

const MARKET_FACTS = [
  {
    value: '38%',
    title: 'avoid credit for religious reasons',
    body: 'while 61% of businesses say they are ready to use ethical finance. Only 12% of adults borrowed from a formal lender in the past year.',
    source: 'World Bank Global Findex 2025; UNDP Uzbekistan survey 2020',
  },
  {
    value: 'ZRU-1126',
    title: 'signed 27 March 2026',
    body: 'Six Islamic contracts are now legal, in force since 29 June 2026 with tax neutrality for Islamic deals. Microfinance firms have been allowed to offer ethical finance since April 2022.',
    source: 'Law ZRU-1126; Central Bank Islamic microfinance rules, 2024',
  },
  {
    value: '$2.4B',
    title: 'forecast by 2033',
    body: 'Islamic banking assets in Uzbekistan are forecast at $1.1B by 2028 and $2.4B by 2033 in the base case.',
    source: 'EDB, IsDB Institute and LSEG, Islamic Finance in Central Asia, 2025',
  },
];

const PLATFORM_STEPS = [
  {
    n: '01',
    title: 'Apply',
    body: 'Telegram, app or straight from a partner ERP. No forms.',
  },
  {
    n: '02',
    title: 'AI scoring',
    body: 'ERP sales, stock and receivables, plus credit bureau and payment data.',
  },
  {
    n: '03',
    title: 'Halal contract',
    body: 'Murabaha or Ijara drafted and signed digitally.',
  },
  {
    n: '04',
    title: 'Asset bought',
    body: 'Belvest pays the supplier. The asset secures the deal.',
  },
  {
    n: '05',
    title: 'Auto-collect',
    body: 'Auto-debit and AI voice reminders in Uzbek and Russian.',
  },
];

const FLOW = [
  {
    label: 'Investors',
    body: 'Mudaraba pools from 12 to 36 months, from $5,000. Investors receive 80% of profit.',
  },
  {
    label: 'Belvest platform',
    body: 'Sources, scores and services every deal. Keeps 20% of profit.',
  },
  {
    label: 'SME borrowers',
    body: 'Equipment, vehicles and stock on Murabaha or Ijara. The asset secures the deal.',
  },
];

const REQUEST_ITEMS = [
  'Deployed capital and portfolio composition',
  'Collection performance and PAR',
  'Unit economics and the current financial model',
  'Current raise and allocation terms',
];

export default function InvestorsPage() {
  return (
    <div lang="en" className="min-h-screen" style={{ backgroundColor: '#FFFFFF', color: '#0D1F1D' }}>
      <SetDocumentLang lang="en" />
      <InvestorHeader />

      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          backgroundColor: '#003332',
          backgroundImage:
            "linear-gradient(90deg, rgba(0,45,46,0.97) 0%, rgba(0,51,50,0.92) 48%, rgba(0,51,50,0.62) 100%), url('/investors/hero-pattern.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
        }}
      >
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-[0.22em]"
                style={{ color: 'rgba(255,240,204,0.7)' }}
              >
                Investor relations · Tashkent
              </p>
              <h1
                className="mt-5 max-w-2xl text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-6xl"
                style={{ color: '#FFF0CC' }}
              >
                Halal finance for Uzbekistan’s SMEs, built on real business data.
              </h1>
              <p
                className="mt-6 max-w-xl text-base leading-relaxed sm:text-lg"
                style={{ color: 'rgba(255,240,204,0.78)' }}
              >
                Belvest is an AI-first Islamic finance platform. We fund asset-backed Murabaha and
                Ijara for small and medium businesses, and we offer Mudaraba pools to qualified and
                institutional investors.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contact"
                  className="depth-btn inline-flex items-center justify-center rounded-xl px-7 py-3.5 text-sm font-bold"
                  style={{ backgroundColor: '#FFF0CC', color: '#004445' }}
                >
                  Request the investor pack
                </a>
                <a
                  href="#returns"
                  className="inline-flex items-center justify-center rounded-xl border px-7 py-3.5 text-sm font-bold"
                  style={{ borderColor: 'rgba(255,240,204,0.45)', color: '#FFF0CC' }}
                >
                  See the returns
                </a>
              </div>

              <p className="mt-6 max-w-xl text-xs leading-relaxed" style={{ color: 'rgba(255,240,204,0.55)' }}>
                For qualified and institutional investors. Target returns are not guaranteed and
                capital is at risk. This page is not an offer to invest.
              </p>
            </div>

            <aside
              className="rounded-3xl p-7 backdrop-blur"
              style={{
                backgroundColor: 'rgba(0,51,50,0.66)',
                border: '1px solid rgba(255,240,204,0.22)',
                boxShadow: '0 24px 60px rgba(0,0,0,0.22)',
              }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: 'rgba(255,240,204,0.62)' }}>
                At a glance
              </p>
              <dl className="mt-5 space-y-4">
                {[
                  ['Structure', 'Mudaraba profit sharing'],
                  ['Term', '12–36 months'],
                  ['Minimum', 'from $5,000'],
                  ['Focus', 'Asset-backed SME finance'],
                  ['Portfolio data', 'On request'],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-baseline justify-between gap-4 border-b pb-4 last:border-0 last:pb-0"
                    style={{ borderColor: 'rgba(255,240,204,0.14)' }}>
                    <dt className="text-xs font-medium uppercase tracking-wider" style={{ color: 'rgba(255,240,204,0.55)' }}>
                      {label}
                    </dt>
                    <dd className="text-right text-sm font-semibold" style={{ color: '#FFF0CC' }}>
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
              <a
                href="#contact"
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl py-3 text-sm font-bold"
                style={{ backgroundColor: 'rgba(255,240,204,0.12)', color: '#FFF0CC', border: '1px solid rgba(255,240,204,0.28)' }}
              >
                Talk to the team
              </a>
            </aside>
          </div>
        </div>
      </section>

      {/* Headline market strip */}
      <div style={{ backgroundColor: '#003332' }}>
        <div className="mx-auto grid max-w-6xl gap-6 border-t px-4 py-7 sm:grid-cols-3 sm:px-6 lg:px-8"
          style={{ borderColor: 'rgba(255,240,204,0.12)' }}>
          {[
            ['38%', 'of businesses avoid credit for religious reasons'],
            ['61%', 'are ready to use ethical finance'],
            ['$2.4B', 'forecast Islamic banking assets by 2033'],
          ].map(([value, label]) => (
            <div key={label} className="flex items-baseline gap-3">
              <span className="text-2xl font-extrabold" style={{ color: '#FFF0CC' }}>{value}</span>
              <span className="text-xs leading-snug" style={{ color: 'rgba(255,240,204,0.6)' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Opportunity */}
      <section id="opportunity" className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: '#16685B' }}>
              The opportunity
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl" style={{ color: '#0D1F1D' }}>
              Demand is measured. Halal supply for businesses is only starting.
            </h2>
            <p className="mt-4 text-base leading-relaxed" style={{ color: '#4A6B67' }}>
              Uzbekistan has a large, religiously motivated demand for credit-free finance and a
              regulatory framework that is now in place. Consumer instalments are crowded; business
              finance is not.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {MARKET_FACTS.map((fact) => (
              <article
                key={fact.value}
                className="rounded-2xl border p-6"
                style={{ borderColor: 'rgba(22,104,91,0.35)', backgroundColor: '#F7FBF9' }}
              >
                <p className="text-2xl font-extrabold" style={{ color: '#004445' }}>{fact.value}</p>
                <h3 className="mt-2 text-sm font-bold" style={{ color: '#0D1F1D' }}>{fact.title}</h3>
                <p className="mt-2 text-xs leading-relaxed" style={{ color: '#4A6B67' }}>{fact.body}</p>
                <p className="mt-4 text-[10px] leading-snug" style={{ color: '#7A938E' }}>{fact.source}</p>
              </article>
            ))}
            <article className="rounded-2xl p-6" style={{ backgroundColor: '#004445' }}>
              <p className="text-2xl font-extrabold" style={{ color: '#FFF0CC' }}>No digital leader</p>
              <h3 className="mt-2 text-sm font-bold" style={{ color: '#FFFFFF' }}>in halal SME finance</h3>
              <p className="mt-2 text-xs leading-relaxed" style={{ color: 'rgba(255,240,204,0.68)' }}>
                Halal consumer instalments are competitive. Halal business finance has no dominant
                digital provider yet — the segment Belvest is built for.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Returns */}
      <section id="returns" className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8" style={{ backgroundColor: '#003332' }}>
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: 'rgba(255,240,204,0.62)' }}>
              Mudaraba
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl" style={{ color: '#FFF0CC' }}>
              Returns offered so far
            </h2>
            <p className="mt-4 text-base leading-relaxed" style={{ color: 'rgba(255,240,204,0.7)' }}>
              The current Mudaraba offering is tiered by amount. Rates below are target annual profit
              shares, not guaranteed. The final split, term and schedule are set in the pool agreement.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {INVESTMENT_PLANS.map((plan) => {
              const copy = TIER_COPY[plan.id];
              const rate = plan.capped ? `up to ${plan.rate}%` : `~${plan.rate}%`;
              return (
                <article
                  key={plan.id}
                  className="relative flex flex-col rounded-2xl p-6"
                  style={{
                    backgroundColor: plan.recommended ? '#FFF0CC' : 'rgba(255,240,204,0.06)',
                    border: plan.recommended ? '1px solid #FFF0CC' : '1px solid rgba(255,240,204,0.22)',
                  }}
                >
                  {plan.recommended && (
                    <span
                      className="absolute -top-3 left-6 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                      style={{ backgroundColor: '#548870', color: '#FFFFFF' }}
                    >
                      Recommended
                    </span>
                  )}
                  <h3 className="text-lg font-extrabold" style={{ color: plan.recommended ? '#004445' : '#FFF0CC' }}>
                    {copy?.name ?? plan.id}
                  </h3>
                  <p className="mt-1 text-xs" style={{ color: plan.recommended ? '#4A6B67' : 'rgba(255,240,204,0.6)' }}>
                    from {money(plan.minAmount)}
                  </p>
                  <p className="mt-6 text-4xl font-extrabold leading-none" style={{ color: plan.recommended ? '#004445' : '#FFF0CC' }}>
                    {rate}
                  </p>
                  <p className="mt-1 text-xs" style={{ color: plan.recommended ? '#4A6B67' : 'rgba(255,240,204,0.6)' }}>
                    target annual profit share
                  </p>
                  <p className="mt-4 text-sm font-semibold" style={{ color: plan.recommended ? '#0D1F1D' : '#FFF0CC' }}>
                    Term: {termLabel(plan.termMin, plan.termMax)}
                  </p>
                  <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                    {(copy?.features ?? []).map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-xs leading-relaxed"
                        style={{ color: plan.recommended ? '#4A6B67' : 'rgba(255,240,204,0.68)' }}>
                        <span aria-hidden="true" className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: plan.recommended ? '#548870' : '#FFF0CC' }} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className="mt-6 inline-flex items-center justify-center rounded-xl py-2.5 text-sm font-bold"
                    style={
                      plan.recommended
                        ? { backgroundColor: '#004445', color: '#FFFFFF' }
                        : { border: '1px solid rgba(255,240,204,0.6)', color: '#FFF0CC' }
                    }
                  >
                    Discuss this tier
                  </a>
                </article>
              );
            })}
          </div>

          <div
            className="mt-6 grid gap-5 rounded-2xl p-6 md:grid-cols-[1.2fr_1fr]"
            style={{ backgroundColor: 'rgba(255,240,204,0.06)', border: '1px solid rgba(255,240,204,0.16)' }}
          >
            <div>
              <h3 className="text-sm font-bold" style={{ color: '#FFF0CC' }}>How the profit share works</h3>
              <p className="mt-2 text-xs leading-relaxed" style={{ color: 'rgba(255,240,204,0.65)' }}>
                Mudaraba is a profit-sharing partnership, not a loan. Under the current target terms,
                investors receive 80% of profit earned by the pool and Belvest receives 20%; the final
                split is agreed per pool. Returns depend on portfolio performance and are not guaranteed.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold" style={{ color: '#FFF0CC' }}>Liquidity</h3>
              <p className="mt-2 text-xs leading-relaxed" style={{ color: 'rgba(255,240,204,0.65)' }}>
                The minimum investment term is 12 months. Early exit is possible no earlier than two
                months after the start, with prior notice, on the terms of the Mudaraba agreement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform */}
      <section id="platform" className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: '#16685B' }}>
              The platform
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl" style={{ color: '#0D1F1D' }}>
              AI-first lending, humans only on exceptions
            </h2>
            <p className="mt-4 text-base leading-relaxed" style={{ color: '#4A6B67' }}>
              Belvest underwrites on the data a business already produces, not only on a credit score.
              Decisions take two hours today with manual review; AI modules and ERP links are rolling out.
            </p>
          </div>

          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {PLATFORM_STEPS.map((step) => (
              <li key={step.n} className="rounded-2xl border p-5" style={{ borderColor: 'rgba(22,104,91,0.3)' }}>
                <span className="text-xs font-bold tracking-widest" style={{ color: '#548870' }}>{step.n}</span>
                <h3 className="mt-2 text-sm font-bold" style={{ color: '#0D1F1D' }}>{step.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed" style={{ color: '#4A6B67' }}>{step.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <article className="rounded-2xl p-6" style={{ backgroundColor: '#F7FBF9', border: '1px solid rgba(22,104,91,0.3)' }}>
              <h3 className="text-lg font-extrabold" style={{ color: '#004445' }}>
                What we underwrite
              </h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed" style={{ color: '#4A6B67' }}>
                <li>ERP sales, stock and receivables, with the client’s consent.</li>
                <li>KATM credit-bureau data and payment history.</li>
                <li>Income and tax data (ICAN Business or iHamkor).</li>
                <li>Asset value, supplier and contract terms.</li>
              </ul>
            </article>
            <article className="rounded-2xl p-6" style={{ backgroundColor: '#F7FBF9', border: '1px solid rgba(22,104,91,0.3)' }}>
              <h3 className="text-lg font-extrabold" style={{ color: '#004445' }}>
                Controls around each deal
              </h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed" style={{ color: '#4A6B67' }}>
                <li>Human review on exceptions and manual approval at today’s scale.</li>
                <li>Belvest owns the asset before it reaches the borrower.</li>
                <li>Digital Murabaha or Ijara contract with a fixed schedule.</li>
                <li>Auto-debit and recorded reminder calls for collections.</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* Business model */}
      <section className="px-4 py-20 sm:px-6 lg:px-8" style={{ backgroundColor: '#F7FBF9' }}>
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: '#16685B' }}>
              Business model
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl" style={{ color: '#0D1F1D' }}>
              Investors fund the book. Equity funds growth.
            </h2>
            <p className="mt-4 text-base leading-relaxed" style={{ color: '#4A6B67' }}>
              Investor capital is deployed through Mudaraba pools into approved, asset-backed
              facilities. Belvest earns a share of the profit, not interest. Belvest’s own capital and
              shareholders fund operations and growth.
            </p>
          </div>

          <div className="mt-10 grid items-stretch gap-4 md:grid-cols-3">
            {FLOW.map((item, index) => (
              <div key={item.label} className="relative rounded-2xl bg-white p-6"
                style={{ border: '1px solid #16685B' }}>
                <p className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: '#548870' }}>
                  {index + 1}
                </p>
                <h3 className="mt-2 text-lg font-extrabold" style={{ color: '#004445' }}>{item.label}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: '#4A6B67' }}>{item.body}</p>
              </div>
            ))}
          </div>

          <p className="mt-5 text-xs leading-relaxed" style={{ color: '#7A938E' }}>
            Use of pool capital is governed by the Mudaraba agreement. The 80/20 split is the current
            target; the final terms are set in the agreement for each pool.
          </p>
        </div>
      </section>

      {/* Shariah governance */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: '#16685B' }}>
                Shariah structure
              </p>
              <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl" style={{ color: '#0D1F1D' }}>
                Halal structure in every deal
              </h2>
              <p className="mt-4 text-base leading-relaxed" style={{ color: '#4A6B67' }}>
                Belvest does not charge interest. Income comes from a disclosed markup on a sale
                (Murabaha) or from lease rentals (Ijara). Both structures require Belvest to own the
                asset, so the deal is backed by real equipment, vehicles or stock.
              </p>
              <p className="mt-4 text-sm leading-relaxed" style={{ color: '#4A6B67' }}>
                Six Islamic contracts were legalised by Law ZRU-1126, in force since 29 June 2026 with
                tax neutrality. Contract structure and Shariah documentation can be reviewed during
                due diligence.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ['No interest', 'A fixed, disclosed markup or lease rental replaces interest.'],
                ['Asset-backed', 'Belvest buys and owns the asset before it reaches the borrower.'],
                ['Documented', 'Each contract states the asset, price, term and payment schedule.'],
                ['Oversight', 'The team includes CIA, FCCA and US CPA credential holders, with internal audit and risk experience.'],
              ].map(([title, body]) => (
                <article key={title} className="rounded-2xl p-5" style={{ backgroundColor: '#F7FBF9', border: '1px solid rgba(22,104,91,0.3)' }}>
                  <h3 className="text-sm font-bold" style={{ color: '#004445' }}>{title}</h3>
                  <p className="mt-2 text-xs leading-relaxed" style={{ color: '#4A6B67' }}>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio on request */}
      <section className="px-4 py-20 sm:px-6 lg:px-8" style={{ backgroundColor: '#004445' }}>
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: 'rgba(255,240,204,0.62)' }}>
              Portfolio and performance
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl" style={{ color: '#FFF0CC' }}>
              The numbers we do not publish here
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed" style={{ color: 'rgba(255,240,204,0.72)' }}>
              Portfolio size, collection rates, PAR and unit economics are commercially sensitive and
              can be misread without context. Qualified investors can request the current investor pack
              under NDA, including:
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="depth-btn inline-flex items-center justify-center rounded-xl px-7 py-3.5 text-sm font-bold"
                style={{ backgroundColor: '#FFF0CC', color: '#004445' }}
              >
                Request the pack
              </a>
              <a
                href="mailto:info@belvest.uz?subject=Investor%20pack"
                className="inline-flex items-center justify-center rounded-xl border px-7 py-3.5 text-sm font-bold"
                style={{ borderColor: 'rgba(255,240,204,0.5)', color: '#FFF0CC' }}
              >
                Email investor relations
              </a>
            </div>
          </div>

          <ul className="space-y-3">
            {REQUEST_ITEMS.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl px-5 py-4 text-sm"
                style={{ backgroundColor: 'rgba(255,240,204,0.07)', border: '1px solid rgba(255,240,204,0.16)', color: '#FFF0CC' }}
              >
                <span aria-hidden="true" className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: '#FFF0CC' }} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: '#16685B' }}>
              Team
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl" style={{ color: '#0D1F1D' }}>
              Audit, IFI and auto finance in one team
            </h2>
            <p className="mt-4 text-base leading-relaxed" style={{ color: '#4A6B67' }}>
              Big Four audit, international financial institutions and operating experience — the main
              difference between Belvest and other lenders in Uzbekistan.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {LEADERSHIP_TEAM.map((member) => (
              <article key={member.id} className="flex flex-col rounded-2xl p-6"
                style={{ border: '1px solid #16685B', backgroundColor: '#FFFFFF' }}>
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-full text-lg font-bold"
                  style={{ backgroundColor: '#004445', color: '#FFF0CC' }}
                  aria-hidden="true"
                >
                  {member.initials}
                </div>
                <h3 className="mt-5 text-lg font-extrabold" style={{ color: '#0D1F1D' }}>{member.en.name}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider" style={{ color: '#548870' }}>
                  {member.en.role}
                </p>
                <p className="mt-3 text-xs leading-relaxed" style={{ color: '#4A6B67' }}>{member.en.bio}</p>
              </article>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: '#16685B' }}>
              Shareholders and compliance oversight
            </h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {OVERSIGHT_TEAM.map((member) => (
                <article key={member.id} className="flex gap-4 rounded-2xl p-5"
                  style={{ backgroundColor: '#F7FBF9', border: '1px solid rgba(22,104,91,0.3)' }}>
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                    style={{ backgroundColor: '#004445', color: '#FFF0CC' }}
                    aria-hidden="true"
                  >
                    {member.initials}
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold" style={{ color: '#0D1F1D' }}>{member.en.name}</h4>
                    <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: '#548870' }}>
                      {member.en.role}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed" style={{ color: '#4A6B67' }}>{member.en.bio}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8" style={{ backgroundColor: '#F7FBF9' }}>
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: '#16685B' }}>
              Contact
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl" style={{ color: '#0D1F1D' }}>
              Talk to the investor relations team
            </h2>
            <p className="mt-4 text-base leading-relaxed" style={{ color: '#4A6B67' }}>
              Tell us what you are looking for. We will send the investor pack and arrange a call with
              the managing director. We can sign an NDA before sharing portfolio data.
            </p>

            <dl className="mt-8 space-y-5">
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: '#7A938E' }}>Email</dt>
                <dd className="mt-1">
                  <a href="mailto:info@belvest.uz?subject=Investor%20enquiry" className="text-sm font-semibold" style={{ color: '#004445' }}>
                    info@belvest.uz
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: '#7A938E' }}>Phone</dt>
                <dd className="mt-1">
                  <a href="tel:+998774809999" className="text-sm font-semibold" style={{ color: '#004445' }}>
                    +998 77 480-99-99
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: '#7A938E' }}>Office</dt>
                <dd className="mt-1 text-sm" style={{ color: '#4A6B67' }}>
                  Tashkent, Uzbekistan
                </dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: '#7A938E' }}>Response</dt>
                <dd className="mt-1 text-sm" style={{ color: '#4A6B67' }}>
                  Within one business day
                </dd>
              </div>
            </dl>

            <p className="mt-8 text-xs leading-relaxed" style={{ color: '#7A938E' }}>
              Prefer the main site? <Link href="/" className="font-semibold underline" style={{ color: '#004445' }}>belvest.uz</Link>
            </p>
          </div>

          <InvestorContactForm />
        </div>
      </section>

      <InvestorFooter />
    </div>
  );
}
