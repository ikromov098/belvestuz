'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, CheckCircle, ArrowRight, Info } from 'lucide-react';
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

// Fixed exchange rate — cars are priced in USD, converted to so'm for display only.
const USD_TO_UZS_RATE = 12700; // average rate for 2026, for illustration only

// Car price ranges are in USD; the $18,000 bracket sets the ceiling.
// "high" bracket ceiling = sum equivalent of 5 000 000 000 so'm, expressed in USD (~$393 700).
const CAR_PRICE_LOW  = { min: 1_000,  max: 18_000, step: 500 };
const CAR_PRICE_HIGH = { min: 18_000, max: Math.round(5_000_000_000 / USD_TO_UZS_RATE), step: 5_000 };
// Phones stay in so'm (no currency conversion).
const PHONE_PRICE = { min: 500_000, max: 50_000_000, step: 500_000 };

function termsFor(p: Product) {
  return p === 'phone' ? PHONE_TERMS : p === 'carB' ? CAR_B_TERMS : CAR_A_TERMS;
}
function priceRangeFor(p: Product, b: Bracket) {
  if (p === 'phone') return PHONE_PRICE;
  return b === 'high' ? CAR_PRICE_HIGH : CAR_PRICE_LOW;
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
  fmtBound?: (n: number) => string;
}

function SliderRow({ label, value, min, max, step, display, onChange, fmtBound = fmt }: SliderRowProps) {
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
        <span>{fmtBound(min)}</span>
        <span>{fmtBound(max)}</span>
      </div>
    </div>
  );
}

// ─── Main Calculator ──────────────────────────────────────────────────────────

function InstallmentCalculator({ defaultProduct = 'carA' }: { defaultProduct?: Product }) {
  const { t, lang } = useLanguage();

  const initPrice = defaultProduct === 'phone' ? 4_500_000 : 15_000;

  const [product, setProduct] = useState<Product>(defaultProduct);
  const [bracket, setBracket] = useState<Bracket>('low');
  const [price, setPrice]     = useState(initPrice);
  const [term, setTerm]       = useState(termsFor(defaultProduct)[0]);
  const [down, setDown]       = useState(Math.round(initPrice * minDownRateFor(defaultProduct, 'low')));

  // ── Derived values ──
  const range     = priceRangeFor(product, bracket);
  const minRate   = minDownRateFor(product, bracket);
  const minDown   = Math.round(price * minRate);
  const maxDown   = Math.round(price * 0.95);
  const downStep  = product === 'phone' ? 100_000 : 500;
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
    const r = priceRangeFor(p, bracket);
    const np = Math.min(Math.max(price, r.min), r.max);
    setPrice(np);
    setDown(Math.round(np * minDownRateFor(p, bracket)));
  };
  const changeBracket = (b: Bracket) => {
    setBracket(b);
    const r = priceRangeFor(product, b);
    const np = Math.min(Math.max(price, r.min), r.max);
    setPrice(np);
    setDown(Math.round(np * minDownRateFor(product, b)));
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
      disclaimer: 'Курс указан для примера (1$ = 12 700 сум, средний курс 2026 года). При заключении реальной сделки применяется актуальный курс ЦБ на день оплаты.',
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
      disclaimer: "Kurs faqat namuna uchun ko'rsatilgan (1$ = 12 700 so'm, 2026-yil o'rtacha kursi). Haqiqiy bitim tuzilganda to'lov kunidagi amaldagi Markaziy bank kursi qo'llaniladi.",
    },
  }[lang];

  // Cars are priced in USD; results show both currencies. Phones stay in so'm.
  const money = (v: number) =>
    isCar
      ? `$${fmt(v)} (≈ ${fmt(Math.round(v * USD_TO_UZS_RATE))} ${L.cur})`
      : `${fmt(v)} ${L.cur}`;
  const priceDisplay = (v: number) => (isCar ? `$${fmt(v)}` : `${fmt(v)} ${L.cur}`);
  const bound = (n: number) => (isCar ? `$${fmt(n)}` : fmt(n));

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
          <p className="text-xs -mt-3 leading-relaxed flex items-start gap-1.5" style={{ color: '#4A6B67' }}>
            <Info size={14} className="shrink-0 mt-0.5" style={{ color: '#548870' }} />
            {L.carBNote}
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
          display={priceDisplay(price)}
          fmtBound={bound}
          onChange={changePrice}
        />

        {/* Down payment slider */}
        <SliderRow
          label={`${L.down} (${Math.round(downRatePct * 100)}%)`}
          value={clampedDown}
          min={minDown}
          max={maxDown}
          step={downStep}
          display={priceDisplay(clampedDown)}
          fmtBound={bound}
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
          <BreakdownLine label={L.down} value={money(clampedDown)} />
          <BreakdownLine label={L.brkRemaining} value={money(remaining)} />
          <div className="pt-2" style={{ borderTop: '1px solid rgba(0,68,69,0.15)' }}>
            <BreakdownLine label={L.brkTotal} value={money(totalToPay)} strong />
            <p className="text-right text-[11px] font-semibold mt-1" style={{ color: '#548870' }}>{L.markupTag}</p>
          </div>

          <div className="text-center mt-3">
            <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: '#4A6B67' }}>
              {L.brkMonthly}
            </p>
            <p className="text-4xl font-extrabold leading-none" style={{ color: '#004445' }}>
              {isCar ? `$${fmt(monthly)}` : fmt(monthly)}{' '}
              {!isCar && <span className="text-2xl font-bold" style={{ color: '#16685B' }}>{L.cur}</span>}
            </p>
            {isCar && (
              <p className="text-sm font-bold mt-1" style={{ color: '#16685B' }}>
                ≈ {fmt(Math.round(monthly * USD_TO_UZS_RATE))} {L.cur}
              </p>
            )}
          </div>
        </div>

        {/* Exchange-rate disclaimer (cars only — USD-based) */}
        {isCar && (
          <p className="text-[11px] leading-relaxed" style={{ color: '#8A9B98' }}>
            {L.disclaimer}
          </p>
        )}

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
  const { lang } = useLanguage();
  const [category, setCategory] = useState('');
  const [estimate, setEstimate] = useState(300);   // USD
  const [newPrice, setNewPrice] = useState(800);   // USD

  const topay = Math.max(0, newPrice - estimate);
  const categories = TRADE_IN_CATEGORIES[lang];

  const L = {
    ru: {
      title: 'Оценка Trade-in',
      intro: 'Узнайте примерную стоимость вашего товара и размер доплаты за новый.',
      whatGive: 'Что хотите сдать?',
      selectPlaceholder: 'Выберите категорию...',
      oldValue: 'Примерная стоимость вашего товара',
      newValue: 'Стоимость нового товара',
      resultOld: 'Стоимость вашего товара:',
      resultTopay: 'Доплата за новый товар:',
      cta: 'Оценить точнее',
      cur: 'сум',
      disclaimer: 'Курс указан для примера (1$ = 12 700 сум, средний курс 2026 года). При заключении реальной сделки применяется актуальный курс ЦБ на день оплаты.',
    },
    uz: {
      title: 'Trade-in baholash',
      intro: "Tovaringizning taxminiy qiymatini va yangisi uchun qo'shimcha to'lovni bilib oling.",
      whatGive: 'Nimani topshirmoqchisiz?',
      selectPlaceholder: 'Toifani tanlang...',
      oldValue: 'Tovaringizning taxminiy qiymati',
      newValue: 'Yangi tovar narxi',
      resultOld: 'Tovaringizning qiymati:',
      resultTopay: "Yangi tovar uchun qo'shimcha to'lov:",
      cta: 'Aniqroq baholash',
      cur: "so'm",
      disclaimer: "Kurs faqat namuna uchun ko'rsatilgan (1$ = 12 700 so'm, 2026-yil o'rtacha kursi). Haqiqiy bitim tuzilganda to'lov kunidagi amaldagi Markaziy bank kursi qo'llaniladi.",
    },
  }[lang];

  const dual = (v: number) => `$${fmt(v)} (≈ ${fmt(Math.round(v * USD_TO_UZS_RATE))} ${L.cur})`;
  const usdBound = (n: number) => `$${fmt(n)}`;

  return (
    <div
      className="rounded-2xl shadow-xl overflow-hidden"
      style={{ border: '1px solid #16685B', backgroundColor: '#ffffff' }}
    >
      <CardHeader
        icon={<ArrowRight size={20} />}
        title={L.title}
        gold
      />

      <div className="p-6 flex flex-col gap-5">
        <p className="text-sm" style={{ color: '#4A6B67' }}>
          {L.intro}
        </p>

        {/* Step 1 — Category */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold" style={{ color: '#4A6B67' }}>
            {L.whatGive}
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
            <option value="" disabled>{L.selectPlaceholder}</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Step 2 — Estimate slider (USD) */}
        <SliderRow
          label={L.oldValue}
          value={estimate}
          min={50}
          max={5_000}
          step={50}
          display={`$${fmt(estimate)}`}
          fmtBound={usdBound}
          onChange={setEstimate}
        />

        {/* Step 3 — New item price (USD) */}
        <SliderRow
          label={L.newValue}
          value={newPrice}
          min={100}
          max={50_000}
          step={100}
          display={`$${fmt(newPrice)}`}
          fmtBound={usdBound}
          onChange={setNewPrice}
        />

        {/* Result — both currencies */}
        <div
          className="rounded-xl p-5"
          style={{ backgroundColor: 'rgba(84,136,112,0.08)', border: '1px solid rgba(84,136,112,0.25)' }}
        >
          <div className="flex justify-between items-center gap-3 mb-3">
            <span className="text-sm" style={{ color: '#4A6B67' }}>{L.resultOld}</span>
            <span className="text-sm font-bold text-right" style={{ color: '#004445' }}>
              {dual(estimate)}
            </span>
          </div>
          <div
            className="flex justify-between items-center gap-3 pt-3"
            style={{ borderTop: '1px solid rgba(84,136,112,0.25)' }}
          >
            <span className="text-sm font-semibold" style={{ color: '#0D1F1D' }}>{L.resultTopay}</span>
            <span className="text-sm font-extrabold text-right" style={{ color: '#16685B' }}>
              {dual(topay)}
            </span>
          </div>
        </div>

        {/* Exchange-rate disclaimer */}
        <p className="text-[11px] leading-relaxed" style={{ color: '#8A9B98' }}>
          {L.disclaimer}
        </p>

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
          {L.cta} <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

// ─── Exported Section ─────────────────────────────────────────────────────────

export default function CalculatorSection({ defaultProduct = 'carA' }: { defaultProduct?: Product }) {
  const { lang } = useLanguage();
  const H = {
    ru: {
      label: 'Финансовые инструменты',
      title: 'Рассчитайте платёж прямо сейчас',
      sub: 'Подберите удобный срок и сумму — получите ответ мгновенно.',
    },
    uz: {
      label: 'Moliyaviy vositalar',
      title: "To'lovni hoziroq hisoblang",
      sub: "Qulay muddat va summani tanlang — javobni bir zumda oling.",
    },
  }[lang];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <div className="text-center mb-10">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: '#4A6B67' }}
          >
            {H.label}
          </p>
          <h2 className="text-3xl font-extrabold" style={{ color: '#0D1F1D' }}>
            {H.title}
          </h2>
          <p className="mt-2 text-base" style={{ color: '#4A6B67', maxWidth: 480, margin: '8px auto 0' }}>
            {H.sub}
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
