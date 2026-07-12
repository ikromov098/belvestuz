'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, CheckCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

// ─── Types ───────────────────────────────────────────────────────────────────

type Product = 'carA' | 'carB' | 'phone';
type Bracket = 'low' | 'high';

// ─── Constants ───────────────────────────────────────────────────────────────

// Car, Option A (registered to buyer) — markup applied to remaining balance
const CAR_A_TERMS = [6, 12, 24];
const CAR_A_MARKUP: Record<number, number> = { 6: 0.13, 12: 0.25, 24: 0.50 };

// Car, Option B (registered to Belvest until paid off)
const CAR_B_TERMS = [13, 24];
const CAR_B_MARKUP: Record<number, number> = { 13: 0.22, 24: 0.44 };

// Phone — 54% annual markup, prorated by month: (0.54 / 12) * months
const PHONE_TERMS = [6, 7, 8, 9, 10, 11, 12];
const PHONE_ANNUAL_MARKUP = 0.54;

// Price ranges (no live FX rate, so the $18,000 threshold is a manual toggle)
const CAR_PRICE   = { min: 30_000_000, max: 5_000_000_000, step: 5_000_000 };
const PHONE_PRICE = { min: 500_000,    max: 50_000_000,    step: 500_000  };

function termsFor(p: Product) {
  return p === 'phone' ? PHONE_TERMS : p === 'carB' ? CAR_B_TERMS : CAR_A_TERMS;
}
function priceRangeFor(p: Product) {
  return p === 'phone' ? PHONE_PRICE : CAR_PRICE;
}
function minDownRateFor(p: Product, b: Bracket) {
  return p === 'phone' ? 0.20 : b === 'high' ? 0.50 : 0.30;
}
function markupRateFor(p: Product, b: Bracket, term: number) {
  if (p === 'phone') return (PHONE_ANNUAL_MARKUP / 12) * term;
  if (p === 'carB')  return CAR_B_MARKUP[term] ?? 0;
  return CAR_A_MARKUP[term] ?? 0;
}

const TRADE_IN_CATEGORIES: Record<'uz' | 'ru', string[]> = {
  ru: ['Смартфон', 'Автомобиль', 'Другая техника'],
  uz: ['Smartfon', 'Avtomobil', 'Boshqa texnika'],
};

const TRUST_BADGES = [
  'Без скрытых комиссий',
  'Решение за 5 минут',
  'От 0% первоначальный взнос',
  'Онлайн-оформление',
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return Math.round(n).toLocaleString('ru-RU');
}

/** Product-specific breakdown: down payment + term markup on the remaining balance. */
function calcBreakdown(price: number, down: number, markupRate: number, term: number) {
  const remaining = Math.max(0, price - down);
  const totalMarkup = remaining * markupRate;
  const totalToPay = remaining + totalMarkup;
  const monthly = term > 0 ? totalToPay / term : 0;
  return { remaining, totalMarkup, totalToPay, monthly };
}

function BreakdownLine({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex justify-between items-baseline gap-3">
      <span className="text-sm" style={{ color: '#4A6B67' }}>{label}</span>
      <span
        className={strong ? 'text-base font-extrabold' : 'text-sm font-bold'}
        style={{ color: strong ? '#004445' : '#0D1F1D' }}
      >
        {value}
      </span>
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function CardHeader({ icon, title, gold }: { icon: React.ReactNode; title: string; gold?: boolean }) {
  return (
    <div
      className="flex items-center gap-3 px-6 py-4 rounded-t-2xl"
      style={{ backgroundColor: gold ? '#548870' : '#004445' }}
    >
      <span style={{ color: gold ? '#0D1F1D' : '#FFF0CC' }}>{icon}</span>
      <span
        className="text-base font-bold tracking-wide"
        style={{ color: gold ? '#0D1F1D' : '#FFF0CC', letterSpacing: '0.04em' }}
      >
        {title}
      </span>
    </div>
  );
}

interface SliderRowProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
}

function SliderRow({ label, value, min, max, step, display, onChange }: SliderRowProps) {
  const pct = ((value - min) / (max - min)) * 100;
  const trackStyle = {
    background: `linear-gradient(to right, #004445 ${pct}%, #16685B ${pct}%)`,
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold" style={{ color: '#4A6B67' }}>{label}</span>
        <span className="text-sm font-bold" style={{ color: '#004445' }}>{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="belvest-slider"
        style={trackStyle}
      />
      <div className="flex justify-between text-xs" style={{ color: '#4A6B67' }}>
        <span>{fmt(min)}</span>
        <span>{fmt(max)}</span>
      </div>
    </div>
  );
}

// ─── Main Calculator ──────────────────────────────────────────────────────────

function InstallmentCalculator({ defaultProduct = 'carA' }: { defaultProduct?: Product }) {
  const { t, lang } = useLanguage();

  const initPrice = defaultProduct === 'phone' ? 4_500_000 : 200_000_000;

  const [product, setProduct] = useState<Product>(defaultProduct);
  const [bracket, setBracket] = useState<Bracket>('low');
  const [price, setPrice]     = useState(initPrice);
  const [term, setTerm]       = useState(termsFor(defaultProduct)[0]);
  const [down, setDown]       = useState(Math.round(initPrice * minDownRateFor(defaultProduct, 'low')));

  // ── Derived values ──
  const range     = priceRangeFor(product);
  const minRate   = minDownRateFor(product, bracket);
  const minDown   = Math.round(price * minRate);
  const maxDown   = Math.round(price * 0.95);
  const downStep  = product === 'phone' ? 100_000 : 1_000_000;
  const clampedDown = Math.min(Math.max(down, minDown), maxDown);
  const downRatePct = price > 0 ? clampedDown / price : 0;

  const isCar        = product !== 'phone';
  const markupRate   = markupRateFor(product, bracket, term);
  const { remaining, totalToPay, monthly } = calcBreakdown(price, clampedDown, markupRate, term);
  const showInstantBadge = product === 'carA' && downRatePct >= 0.60;

  // ── Handlers (re-clamp dependent state on change) ──
  const changeProduct = (p: Product) => {
    setProduct(p);
    setTerm(termsFor(p)[0]);
    const r = priceRangeFor(p);
    const np = Math.min(Math.max(price, r.min), r.max);
    setPrice(np);
    setDown(Math.round(np * minDownRateFor(p, bracket)));
  };
  const changeBracket = (b: Bracket) => {
    setBracket(b);
    setDown(Math.round(price * minDownRateFor(product, b)));
  };
  const changePrice = (v: number) => {
    setPrice(v);
    const nMin = Math.round(v * minRate);
    const nMax = Math.round(v * 0.95);
    setDown((d) => Math.min(Math.max(d, nMin), nMax));
  };

  // ── Localized labels ──
  const L = {
    ru: {
      productLabel: 'Продукт',
      products: {
        carA: 'Автомобиль — на имя клиента',
        carB: 'Автомобиль — на имя Belvest',
        phone: 'Телефон',
      } as Record<Product, string>,
      bracketLabel: 'Стоимость автомобиля',
      bracketLow: 'До 18 000 $',
      bracketHigh: 'Свыше 18 000 $',
      carBNote: 'Автомобиль регистрируется на имя Belvest до полной оплаты',
      instantBadge: 'Автомобиль будет сразу зарегистрирован на ваше имя!',
      price: 'Стоимость',
      down: 'Первоначальный взнос',
      term: 'Срок',
      months: 'мес.',
      brkRemaining: 'Остаток',
      markupTag: '+ наценка BELVEST',
      brkTotal: 'Итого к оплате',
      brkMonthly: 'Ежемесячный платёж',
      cur: 'сум',
    },
    uz: {
      productLabel: 'Mahsulot',
      products: {
        carA: 'Avtomobil — mijoz nomiga',
        carB: 'Avtomobil — Belvest nomiga',
        phone: 'Telefon',
      } as Record<Product, string>,
      bracketLabel: 'Avtomobil narxi',
      bracketLow: '18 000 $ gacha',
      bracketHigh: '18 000 $ dan yuqori',
      carBNote: "Avtomobil to'liq to'lovgacha Belvest korxonasi nomida ro'yxatdan o'tkaziladi",
      instantBadge: "Avtomobil darhol sizning nomingizga ro'yxatdan o'tkaziladi!",
      price: 'Narxi',
      down: "Boshlang'ich to'lov",
      term: 'Muddat',
      months: 'oy',
      brkRemaining: 'Qolgan summa',
      markupTag: '+ BELVEST USTAMASI',
      brkTotal: "Jami to'lov",
      brkMonthly: "Oylik to'lov",
      cur: "so'm",
    },
  }[lang];

  return (
    <div
      className="rounded-2xl shadow-xl overflow-hidden"
      style={{ border: '1px solid #16685B', backgroundColor: '#ffffff' }}
    >
      <CardHeader icon={<ShoppingCart size={20} />} title={t.calculator.title} />

      <div className="p-6 flex flex-col gap-6">
        {/* Product selector */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold" style={{ color: '#4A6B67' }}>{L.productLabel}</span>
          <div className="flex flex-col sm:flex-row gap-2">
            {(['carA', 'carB', 'phone'] as Product[]).map((p) => {
              const active = product === p;
              return (
                <button
                  key={p}
                  onClick={() => changeProduct(p)}
                  className="flex-1 px-3 py-2 rounded-lg text-xs font-semibold border transition-all duration-150 cursor-pointer text-center"
                  style={{
                    backgroundColor: active ? '#004445' : '#FFFFFF',
                    color: active ? '#FFF0CC' : '#004445',
                    borderColor: '#004445',
                  }}
                >
                  {L.products[p]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Option B ownership note */}
        {product === 'carB' && (
          <p className="text-xs -mt-3 leading-relaxed" style={{ color: '#4A6B67' }}>
            ℹ️ {L.carBNote}
          </p>
        )}

        {/* Price bracket (cars only) */}
        {isCar && (
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold" style={{ color: '#4A6B67' }}>{L.bracketLabel}</span>
            <div className="flex gap-2">
              {(['low', 'high'] as Bracket[]).map((b) => {
                const active = bracket === b;
                return (
                  <button
                    key={b}
                    onClick={() => changeBracket(b)}
                    className="flex-1 px-3 py-1.5 rounded-full text-sm font-semibold border transition-all duration-150 cursor-pointer"
                    style={{
                      backgroundColor: active ? '#004445' : '#FFFFFF',
                      color: active ? '#FFFFFF' : '#004445',
                      borderColor: active ? '#004445' : '#004445',
                    }}
                  >
                    {b === 'low' ? L.bracketLow : L.bracketHigh}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Price slider */}
        <SliderRow
          label={L.price}
          value={price}
          min={range.min}
          max={range.max}
          step={range.step}
          display={`${fmt(price)} ${L.cur}`}
          onChange={changePrice}
        />

        {/* Down payment slider */}
        <SliderRow
          label={`${L.down} (${Math.round(downRatePct * 100)}%)`}
          value={clampedDown}
          min={minDown}
          max={maxDown}
          step={downStep}
          display={`${fmt(clampedDown)} ${L.cur}`}
          onChange={setDown}
        />

        {/* Instant-registration badge (Option A, ≥ 60%) */}
        {showInstantBadge && (
          <div
            className="rounded-lg px-4 py-3 text-sm font-semibold text-center"
            style={{ backgroundColor: 'rgba(84,136,112,0.15)', color: '#16685B', border: '1px solid #548870' }}
          >
            ✓ {L.instantBadge}
          </div>
        )}

        {/* Term pills */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold" style={{ color: '#4A6B67' }}>{L.term}</span>
          <div className="flex flex-wrap gap-2">
            {termsFor(product).map((m) => {
              const active = term === m;
              return (
                <button
                  key={m}
                  onClick={() => setTerm(m)}
                  className="px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-150 cursor-pointer"
                  style={{
                    backgroundColor: active ? '#004445' : '#FFFFFF',
                    color: active ? '#FFFFFF' : '#004445',
                    borderColor: active ? '#004445' : '#004445',
                  }}
                >
                  {m} {L.months}
                </button>
              );
            })}
          </div>
        </div>

        {/* Breakdown result */}
        <div
          className="rounded-xl p-5 flex flex-col gap-2.5"
          style={{ backgroundColor: 'rgba(0,68,69,0.06)', border: '1px solid rgba(0,68,69,0.12)' }}
        >
          <BreakdownLine label={L.down} value={`${fmt(clampedDown)} ${L.cur}`} />
          <BreakdownLine label={L.brkRemaining} value={`${fmt(remaining)} ${L.cur}`} />
          <div className="pt-2" style={{ borderTop: '1px solid rgba(0,68,69,0.15)' }}>
            <BreakdownLine label={L.brkTotal} value={`${fmt(totalToPay)} ${L.cur}`} strong />
            <p className="text-right text-[11px] font-semibold mt-1" style={{ color: '#548870' }}>{L.markupTag}</p>
          </div>

          <div className="text-center mt-3">
            <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: '#4A6B67' }}>
              {L.brkMonthly}
            </p>
            <p className="text-4xl font-extrabold leading-none" style={{ color: '#004445' }}>
              {fmt(monthly)}{' '}
              <span className="text-2xl font-bold" style={{ color: '#16685B' }}>{L.cur}</span>
            </p>
          </div>
        </div>

        {/* CTA */}
        <Link
          href="/apply"
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-lg text-sm font-bold transition-all duration-150"
          style={{ backgroundColor: '#004445', color: '#FFFFFF' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#16685B')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#004445')}
        >
          {t.calculator.applyButton}
          <ArrowRight size={16} />
        </Link>

        {/* Trust badges */}
        <div className="flex flex-wrap gap-2 justify-center pt-1">
          {[t.trust.badge1, t.trust.badge2, t.trust.badge3].map((badge) => (
            <span
              key={badge}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
              style={{ backgroundColor: 'rgba(0,68,69,0.10)', color: '#004445' }}
            >
              <CheckCircle size={12} />
              {badge}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Trade-in Estimator ───────────────────────────────────────────────────────

function TradeInEstimator() {
  const [category, setCategory] = useState('');
  const [estimate, setEstimate] = useState(1_200_000);
  const [newPrice, setNewPrice] = useState(4_200_000);
  const { lang } = useLanguage();

  const topay = Math.max(0, newPrice - estimate);
  const categories = TRADE_IN_CATEGORIES[lang];

  return (
    <div
      className="rounded-2xl shadow-xl overflow-hidden"
      style={{ border: '1px solid #16685B', backgroundColor: '#ffffff' }}
    >
      <CardHeader
        icon={<ArrowRight size={20} />}
        title="Оценка Trade-in"
        gold
      />

      <div className="p-6 flex flex-col gap-5">
        <p className="text-sm" style={{ color: '#4A6B67' }}>
          Узнайте примерную стоимость вашего товара и размер доплаты за новый.
        </p>

        {/* Step 1 — Category */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold" style={{ color: '#4A6B67' }}>
            Что хотите сдать?
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg text-sm border outline-none cursor-pointer"
            style={{
              borderColor: '#16685B',
              color: category ? '#0D1F1D' : '#4A6B67',
              backgroundColor: '#FFFFFF',
            }}
          >
            <option value="" disabled>Выберите категорию...</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Step 2 — Estimate slider */}
        <SliderRow
          label="Примерная стоимость вашего товара"
          value={estimate}
          min={100_000}
          max={10_000_000}
          step={100_000}
          display={`${fmt(estimate)} сум`}
          onChange={setEstimate}
        />

        {/* Step 3 — New item price */}
        <SliderRow
          label="Стоимость нового товара"
          value={newPrice}
          min={500_000}
          max={30_000_000}
          step={100_000}
          display={`${fmt(newPrice)} сум`}
          onChange={setNewPrice}
        />

        {/* Result */}
        <div
          className="rounded-xl p-5"
          style={{ backgroundColor: 'rgba(84,136,112,0.08)', border: '1px solid rgba(84,136,112,0.25)' }}
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm" style={{ color: '#4A6B67' }}>Стоимость вашего товара:</span>
            <span className="text-base font-bold" style={{ color: '#004445' }}>
              {fmt(estimate)} <span style={{ color: '#16685B' }}>сум</span>
            </span>
          </div>
          <div
            className="flex justify-between items-center pt-3"
            style={{ borderTop: '1px solid rgba(84,136,112,0.25)' }}
          >
            <span className="text-sm font-semibold" style={{ color: '#0D1F1D' }}>Доплата за новый товар:</span>
            <span className="text-xl font-extrabold" style={{ color: '#16685B' }}>
              {fmt(topay)} сум
            </span>
          </div>
        </div>

        <Link
          href="/trade-in"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-lg text-sm font-bold border transition-all duration-150"
          style={{ borderColor: '#004445', color: '#004445', backgroundColor: 'transparent' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#004445';
            e.currentTarget.style.color = '#FFFFFF';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#004445';
          }}
        >
          Оценить точнее <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

// ─── Exported Section ─────────────────────────────────────────────────────────

export default function CalculatorSection({ defaultProduct = 'carA' }: { defaultProduct?: Product }) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <div className="text-center mb-10">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: '#4A6B67' }}
          >
            Финансовые инструменты
          </p>
          <h2 className="text-3xl font-extrabold" style={{ color: '#0D1F1D' }}>
            Рассчитайте платёж прямо сейчас
          </h2>
          <p className="mt-2 text-base" style={{ color: '#4A6B67', maxWidth: 480, margin: '8px auto 0' }}>
            Подберите удобный срок и сумму — получите ответ мгновенно.
          </p>
        </div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <InstallmentCalculator defaultProduct={defaultProduct} />
          <TradeInEstimator />
        </div>
      </div>
    </section>
  );
}
