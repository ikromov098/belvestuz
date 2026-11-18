import type { Metadata } from 'next';
import { LEADERSHIP_TEAM, OVERSIGHT_TEAM } from '@/data/team';
import { AUDITOR, AUM, FX_LINE, IR_EMAIL, LICENCE_STATUS } from '@/data/investor-config';
import InvestorHeader from '@/components/investors/InvestorHeader';
import InvestorFooter from '@/components/investors/InvestorFooter';
import InvestorContactForm from '@/components/investors/InvestorContactForm';
import SetDocumentLang from '@/components/investors/SetDocumentLang';

const DESCRIPTION =
  'Belvest buys the asset first, then sells or leases it to the customer at a fixed, disclosed price. Partnership structures, track record and due-diligence materials for institutional investors in Uzbekistan.';

export const metadata: Metadata = {
  title: 'Belvest — Investor relations',
  description: DESCRIPTION,
  alternates: { canonical: 'https://belvest.uz/en/investors/' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Belvest — Investor relations',
    description: DESCRIPTION,
    url: 'https://belvest.uz/en/investors/',
    siteName: 'Belvest',
    locale: 'en_US',
    type: 'website',
  },
};

const TRACK_RECORD: { value: string; label: string; note?: string }[] = [
  { value: '1,140+', label: 'Facilities funded' },
  { value: '1,090+', label: 'Customers served' },
  { value: '$2.6M+', label: 'Amount financed' },
  { value: '$1.9M', label: 'Repayments collected' },
  { value: '$2.0M', label: 'Receivables outstanding' },
  { value: '300+', label: 'Facilities fully repaid', note: 'about half ahead of schedule' },
];
if (AUM) TRACK_RECORD.push({ value: AUM, label: 'Assets under management' });

const TODAY_NEXT = [
  {
    tag: 'Today',
    title: 'Consumer and vehicle finance',
    body: 'Phones through a retail store and an electronics market, plus cars and a small number of homes. Every contract is secured on the financed asset; phones carry a remote lock.',
  },
  {
    tag: 'Next',
    title: 'Small-business lanes, piloted in 2027',
    body: 'Gym equipment, delivery motorbikes, taxi vehicles and distributor inventory.',
  },
];

const TERMS: [string, string][] = [
  [
    'Structures',
    'Mudaraba (profit-sharing); Wakala investment agency; co-financing of specific asset pools. Wakala and co-financing are available by arrangement.',
  ],
  ['Contracting entity', 'SEBZOR MOLIYA KSh, trading as Belvest.'],
  ['Currency', FX_LINE ? `USD or UZS. ${FX_LINE}` : 'USD or UZS.'],
  ['Tenor', 'Agreed per facility. Capital is returned in instalments of up to 33% a month after notice.'],
  [
    'Profit',
    'An agreed ratio of the pool’s profit. No fixed or guaranteed return. A profit equalisation reserve smooths quarterly distributions.',
  ],
  ['Distributions', 'Quarterly; paid out or reinvested.'],
  ['Reporting', 'Quarterly report by the 10th of the following month; monthly portfolio data on request.'],
  ...(AUDITOR ? ([['Auditor', AUDITOR]] as [string, string][]) : []),
  ...(LICENCE_STATUS ? ([['Licence status', LICENCE_STATUS]] as [string, string][]) : []),
  ['Ticket size', 'By discussion.'],
];

const GLOSSARY = [
  ['Mudaraba', 'The investor supplies capital and Belvest manages it. Profit is shared at an agreed ratio; a loss falls on the capital.'],
  ['Wakala', 'The investor appoints Belvest as its agent to deploy capital into financing.'],
  ['Murabaha', 'Belvest buys the asset, then sells it to the customer at a fixed price disclosed up front, paid in instalments.'],
  ['Ijara', 'Belvest owns the asset and leases it to the customer for an agreed payment.'],
];

const MARKET_FACTS: { value: string; title: string; body?: string; source: string }[] = [
  {
    value: '38%',
    title: 'avoid credit for religious reasons',
    source: 'World Bank Global Findex 2025; UNDP Uzbekistan survey 2020',
  },
  {
    value: '61%',
    title: 'ready to use ethical finance',
    source: 'World Bank Global Findex 2025; UNDP Uzbekistan survey 2020',
  },
  {
    value: '$2.4B',
    title: 'Islamic banking assets by 2033',
    body: 'Forecast at $1.1B by 2028 and $2.4B by 2033 in the base case.',
    source: 'EDB, IsDB Institute and LSEG, Islamic Finance in Central Asia, 2025',
  },
  {
    value: 'ZRU-1126',
    title: 'in force since 29 June 2026',
    body: 'Signed 27 March 2026. Six Islamic contracts are now legal, with tax neutrality for Islamic deals.',
    source: 'Law ZRU-1126, 2026',
  },
];

const DEAL_STEPS = [
  { n: '01', title: 'Apply', body: 'Telegram, phone, partner referral.' },
  { n: '02', title: 'Review', body: 'Credit bureau and payment history, with manual approval.' },
  { n: '03', title: 'Contract', body: 'Fixed-price sale (Murabaha) or lease (Ijara).' },
  { n: '04', title: 'Asset', body: 'Belvest pays the supplier and owns the asset first.' },
  { n: '05', title: 'Collect', body: 'Reminders by Telegram, SMS and phone.' },
];

const NDA_ITEMS = [
  'Collection performance and arrears (PAR)',
  'Vintage analysis',
  'Unit economics and financial model',
  'Full loan tape',
  'Financial statements',
  'Investor register summary',
  'Shariah review',
  'Current raise and terms',
];

function Eyebrow({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className="text-xs font-semibold uppercase tracking-[0.18em]"
      style={{ color: light ? 'rgba(255,240,204,0.62)' : '#16685B' }}
    >
      {children}
    </p>
  );
}

export default function InvestorsPage() {
  return (
    <div lang="en" className="min-h-screen overflow-x-hidden" style={{ backgroundColor: '#FFFFFF', color: '#0D1F1D' }}>
      <SetDocumentLang lang="en" />
      <InvestorHeader />

      {/* 1. Hero */}
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
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <Eyebrow light>Investor relations · Tashkent</Eyebrow>
              <h1
                className="mt-5 max-w-2xl text-3xl font-extrabold leading-[1.1] sm:text-5xl lg:text-[3.4rem]"
                style={{ color: '#FFF0CC' }}
              >
                Asset-backed finance in Uzbekistan, structured to Islamic standards.
              </h1>
              <p
                className="mt-6 max-w-xl text-base leading-relaxed sm:text-lg"
                style={{ color: 'rgba(255,240,204,0.78)' }}
              >
                Belvest buys the asset first, then sells or leases it to the customer on a fixed,
                disclosed price. We work with institutional partners through profit-sharing, agency
                and co-financing structures.
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
                  href={`mailto:${IR_EMAIL}?subject=Investor%20enquiry`}
                  className="inline-flex items-center justify-center rounded-xl border px-7 py-3.5 text-sm font-bold"
                  style={{ borderColor: 'rgba(255,240,204,0.45)', color: '#FFF0CC' }}
                >
                  Email investor relations
                </a>
              </div>

              <p className="mt-6 max-w-xl text-xs leading-relaxed" style={{ color: 'rgba(255,240,204,0.6)' }}>
                For institutional and qualified investors. Not an offer to invest. Returns are not
                guaranteed and capital is at risk.
              </p>
            </div>

            <aside
              className="rounded-3xl p-6 backdrop-blur sm:p-7"
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
                  ['Structures', 'Mudaraba, Wakala, co-financing'],
                  ['Entity', 'SEBZOR MOLIYA KSh'],
                  ['Currency', 'USD or UZS'],
                  ['Security', 'The financed asset'],
                  ['Reporting', 'Quarterly'],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-baseline justify-between gap-4 border-b pb-4 last:border-0 last:pb-0"
                    style={{ borderColor: 'rgba(255,240,204,0.14)' }}
                  >
                    <dt className="text-xs font-medium uppercase tracking-wider" style={{ color: 'rgba(255,240,204,0.55)' }}>
                      {label}
                    </dt>
                    <dd className="text-right text-sm font-semibold" style={{ color: '#FFF0CC' }}>
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </div>
      </section>

      {/* 2. Track record */}
      <section id="track-record" className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <Eyebrow>Track record</Eyebrow>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl" style={{ color: '#0D1F1D' }}>
              Portfolio to date
            </h2>
          </div>

          <dl
            className="mt-10 grid gap-px overflow-hidden rounded-2xl sm:grid-cols-2 lg:grid-cols-3"
            style={{ backgroundColor: 'rgba(22,104,91,0.25)', border: '1px solid rgba(22,104,91,0.25)' }}
          >
            {TRACK_RECORD.map((item) => (
              <div key={item.label} className="flex flex-col-reverse justify-end bg-white p-6">
                <dt className="mt-1 text-sm font-semibold" style={{ color: '#4A6B67' }}>
                  {item.label}
                  {item.note && (
                    <span className="block text-xs font-normal" style={{ color: '#7A938E' }}>
                      {item.note}
                    </span>
                  )}
                </dt>
                <dd className="text-3xl font-extrabold tabular-nums sm:text-4xl" style={{ color: '#004445' }}>
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 max-w-4xl text-sm leading-relaxed" style={{ color: '#4A6B67' }}>
            Average ticket: about $1,000 for phones and $12,000 for vehicles. Typical tenor: 6 months
            for phones, 12 months for vehicles. Book by balance: vehicles 60%, phones 22%, housing 18%.
          </p>
          <p className="mt-3 max-w-4xl text-xs leading-relaxed" style={{ color: '#7A938E' }}>
            Management data from 1C, unaudited, 20 June 2025 to 15 November 2026. Amount financed is
            the contract sale price less the customer’s down payment. Repayments collected include
            down payments. Receivables outstanding are scheduled instalments still due, including the
            agreed markup, so the figures do not net against each other.
          </p>
        </div>
      </section>

      {/* 3. What we finance */}
      <section id="book" className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:px-8" style={{ backgroundColor: '#F7FBF9' }}>
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <Eyebrow>What we finance</Eyebrow>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl" style={{ color: '#0D1F1D' }}>
              Assets we buy and hold until they are paid for
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {TODAY_NEXT.map((item) => (
              <article
                key={item.tag}
                className="flex flex-col rounded-2xl bg-white p-6"
                style={{ border: '1px solid rgba(22,104,91,0.35)' }}
              >
                <p className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: '#548870' }}>
                  {item.tag}
                </p>
                <h3 className="mt-2 text-xl font-extrabold" style={{ color: '#004445' }}>
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: '#4A6B67' }}>
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Partnership terms */}
      <section id="terms" className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:px-8" style={{ backgroundColor: '#003332' }}>
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <Eyebrow light>Partnership terms</Eyebrow>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl" style={{ color: '#FFF0CC' }}>
              How we work with institutional partners
            </h2>
            <p className="mt-4 text-base leading-relaxed" style={{ color: 'rgba(255,240,204,0.72)' }}>
              Amount, tenor and profit ratio are agreed with each partner and set in a written
              agreement.
            </p>
          </div>

          <dl
            className="mt-10 rounded-2xl px-5 sm:px-6"
            style={{ backgroundColor: 'rgba(255,240,204,0.05)', border: '1px solid rgba(255,240,204,0.18)' }}
          >
            {TERMS.map(([term, text], index) => (
              <div
                key={term}
                className="grid gap-1 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6"
                style={index > 0 ? { borderTop: '1px solid rgba(255,240,204,0.14)' } : undefined}
              >
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] sm:pt-0.5" style={{ color: 'rgba(255,240,204,0.6)' }}>
                  {term}
                </dt>
                <dd className="text-sm leading-relaxed" style={{ color: '#FFF0CC' }}>
                  {text}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: 'rgba(255,240,204,0.62)' }}>
              The terms in plain language
            </h3>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              {GLOSSARY.map(([term, text]) => (
                <div key={term} className="rounded-2xl p-5" style={{ border: '1px solid rgba(255,240,204,0.14)' }}>
                  <dt className="text-sm font-bold" style={{ color: '#FFF0CC' }}>{term}</dt>
                  <dd className="mt-1.5 text-xs leading-relaxed" style={{ color: 'rgba(255,240,204,0.7)' }}>
                    {text}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* 5. Market */}
      <section id="market" className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <Eyebrow>The market</Eyebrow>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl" style={{ color: '#0D1F1D' }}>
              Demand for ethical finance, and a legal framework now in place
            </h2>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {MARKET_FACTS.map((fact) => (
              <article
                key={fact.value}
                className="rounded-2xl border p-6"
                style={{ borderColor: 'rgba(22,104,91,0.35)', backgroundColor: '#F7FBF9' }}
              >
                <p className="text-2xl font-extrabold" style={{ color: '#004445' }}>{fact.value}</p>
                <h3 className="mt-2 text-sm font-bold" style={{ color: '#0D1F1D' }}>{fact.title}</h3>
                {fact.body && (
                  <p className="mt-2 text-xs leading-relaxed" style={{ color: '#4A6B67' }}>{fact.body}</p>
                )}
                <p className="mt-4 text-[11px] leading-snug" style={{ color: '#7A938E' }}>
                  Source: {fact.source}
                </p>
              </article>
            ))}
          </div>

          <p
            className="mt-5 rounded-2xl px-6 py-5 text-sm font-semibold leading-relaxed"
            style={{ backgroundColor: '#004445', color: '#FFF0CC' }}
          >
            Halal business finance has no dominant digital provider yet.
            <span className="mt-1 block text-xs font-normal" style={{ color: 'rgba(255,240,204,0.65)' }}>
              Belvest management view, November 2026.
            </span>
          </p>
        </div>
      </section>

      {/* 6. How a deal works */}
      <section id="process" className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:px-8" style={{ backgroundColor: '#F7FBF9' }}>
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <Eyebrow>How a deal works</Eyebrow>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl" style={{ color: '#0D1F1D' }}>
              From application to the last instalment
            </h2>
          </div>

          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {DEAL_STEPS.map((step) => (
              <li key={step.n} className="rounded-2xl border bg-white p-5" style={{ borderColor: 'rgba(22,104,91,0.3)' }}>
                <span className="text-xs font-bold tracking-widest" style={{ color: '#548870' }}>{step.n}</span>
                <h3 className="mt-2 text-sm font-bold" style={{ color: '#0D1F1D' }}>{step.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed" style={{ color: '#4A6B67' }}>{step.body}</p>
              </li>
            ))}
          </ol>

          <p className="mt-6 max-w-4xl text-sm leading-relaxed" style={{ color: '#4A6B67' }}>
            Rolling out in 2027: ERP-based scoring, automated payments and AI-assisted collections. AI
            handles intake and servicing work, not credit decisions.
          </p>
        </div>
      </section>

      {/* 7. Team and oversight */}
      <section id="team" className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <Eyebrow>Team and oversight</Eyebrow>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl" style={{ color: '#0D1F1D' }}>
              Audit, IFI and auto finance in one team
            </h2>
            <p className="mt-4 text-base leading-relaxed" style={{ color: '#4A6B67' }}>
              Big Four audit, international financial institutions and operating experience.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {LEADERSHIP_TEAM.map((member) => (
              <article
                key={member.id}
                className="flex flex-col rounded-2xl p-6"
                style={{ border: '1px solid #16685B', backgroundColor: '#FFFFFF' }}
              >
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
                <article
                  key={member.id}
                  className="flex gap-4 rounded-2xl bg-white p-5"
                  style={{ border: '1px solid rgba(22,104,91,0.3)' }}
                >
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

      {/* 8. Under NDA */}
      <section id="contact" className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:px-8" style={{ backgroundColor: '#F7FBF9' }}>
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>Available under NDA</Eyebrow>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl" style={{ color: '#0D1F1D' }}>
              Request the investor pack
            </h2>
            <p className="mt-4 text-base leading-relaxed" style={{ color: '#4A6B67' }}>
              We do not publish performance detail on this page. After an NDA we share:
            </p>
            <ul className="mt-5 space-y-2.5">
              {NDA_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm" style={{ color: '#0D1F1D' }}>
                  <span
                    aria-hidden="true"
                    className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: '#548870' }}
                  />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm" style={{ color: '#4A6B67' }}>
              Or email{' '}
              <a
                href={`mailto:${IR_EMAIL}?subject=Investor%20enquiry`}
                className="font-semibold underline"
                style={{ color: '#004445' }}
              >
                {IR_EMAIL}
              </a>
              .
            </p>
          </div>

          <InvestorContactForm />
        </div>
      </section>

      <InvestorFooter />
    </div>
  );
}
