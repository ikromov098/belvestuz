'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, RefreshCw, CheckCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

// ─── Types ───────────────────────────────────────────────────────────────────

type Tab = 'installment' | 'leasing';

// ─── Constants ───────────────────────────────────────────────────────────────

const TERMS = [3, 6, 12, 18, 24, 36];

const TRADE_IN_CATEGORIES = [
  'Смартфон',
  'Ноутбук / ПК',
  'Телевизор',
  'Холодильник / стиральная машина',
  'Кондиционер',
  'Другая техника',
];

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

/** Simple flat monthly payment (no interest for installment, ~18% annual for leasing) */
function calcMonthly(price: number, down: number, months: number, isLeasing: boolean) {
  const principal = price - down;
  if (months === 0) return 0;
  if (!isLeasing) return principal / months;
  const r = 0.18 / 12;
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function CardHeader({ icon, title, gold }: { icon: React.ReactNode; title: string; gold?: boolean }) {
  return (
    <div
      className="flex items-center gap-3 px-6 py-4 rounded-t-2xl"
      style={{ backgroundColor: gold ? '#C9A84C' : '#0D5C54' }}
    >
      <span style={{ color: gold ? '#0D1F1D' : '#E8DFC8' }}>{icon}</span>
      <span
        className="text-base font-bold tracking-wide"
        style={{ color: gold ? '#0D1F1D' : '#E8DFC8', letterSpacing: '0.04em' }}
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
    background: `linear-gradient(to right, #0D5C54 ${pct}%, #D4C9B0 ${pct}%)`,
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold" style={{ color: '#4A6B67' }}>{label}</span>
        <span className="text-sm font-bold" style={{ color: '#0D5C54' }}>{display}</span>
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

function InstallmentCalculator() {
  const [tab, setTab] = useState<Tab>('installment');
  const [price, setPrice] = useState(5_000_000);
  const [down, setDown] = useState(1_000_000);
  const [term, setTerm] = useState(12);
  const { t } = useLanguage();

  const isLeasing = tab === 'leasing';
  const monthly = calcMonthly(price, down, term, isLeasing);
  const maxDown = Math.round(price * 0.7);

  const handlePriceChange = (v: number) => {
    setPrice(v);
    if (down > Math.round(v * 0.7)) setDown(Math.round(v * 0.7));
  };

  return (
    <div
      className="rounded-2xl shadow-xl overflow-hidden"
      style={{ border: '1px solid #D4C9B0', backgroundColor: '#ffffff' }}
    >
      <CardHeader
        icon={isLeasing ? <RefreshCw size={20} /> : <ShoppingCart size={20} />}
        title={isLeasing ? t.services.leasing : t.calculator.title}
      />

      {/* Tabs */}
      <div className="flex border-b" style={{ borderColor: '#D4C9B0' }}>
        {(['installment', 'leasing'] as Tab[]).map((tabVal) => (
          <button
            key={tabVal}
            onClick={() => setTab(tabVal)}
            className="flex-1 py-3 text-sm font-semibold transition-all duration-150 cursor-pointer"
            style={{
              color: tab === tabVal ? '#0D5C54' : '#4A6B67',
              borderBottom: tab === tabVal ? '2px solid #0D5C54' : '2px solid transparent',
              backgroundColor: tab === tabVal ? 'rgba(13,92,84,0.05)' : 'transparent',
            }}
          >
            {tabVal === 'installment' ? t.services.installment : t.services.leasing}
          </button>
        ))}
      </div>

      <div className="p-6 flex flex-col gap-6">
        {/* Sliders */}
        <SliderRow
          label={isLeasing ? t.services.leasing : t.calculator.propertyValue}
          value={price}
          min={500_000}
          max={50_000_000}
          step={500_000}
          display={`${fmt(price)} сум`}
          onChange={handlePriceChange}
        />
        <SliderRow
          label="Первоначальный взнос"
          value={down}
          min={0}
          max={maxDown}
          step={100_000}
          display={`${fmt(down)} сум`}
          onChange={setDown}
        />

        {/* Term pills */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold" style={{ color: '#4A6B67' }}>{t.calculator.term}</span>
          <div className="flex flex-wrap gap-2">
            {TERMS.map((t) => {
              const active = term === t;
              return (
                <button
                  key={t}
                  onClick={() => setTerm(t)}
                  className="px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-150 cursor-pointer"
                  style={{
                    backgroundColor: active ? '#C9A84C' : '#F4EFE4',
                    color: active ? '#0D1F1D' : '#0D5C54',
                    borderColor: active ? '#C9A84C' : '#0D5C54',
                  }}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        {/* Result */}
        <div
          className="rounded-xl p-5 text-center"
          style={{ backgroundColor: 'rgba(13,92,84,0.06)', border: '1px solid rgba(13,92,84,0.12)' }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: '#4A6B67' }}>
            {t.calculator.monthlyPayment}
          </p>
          <p className="text-4xl font-extrabold leading-none" style={{ color: '#0D5C54' }}>
            {fmt(monthly)}{' '}
            <span className="text-2xl font-bold" style={{ color: '#C9A84C' }}>сум</span>
          </p>
          <p className="text-xs mt-2" style={{ color: '#4A6B67' }}>
            Итого: {fmt(monthly * term)} сум · Срок: {term} мес.
          </p>
        </div>

        {/* CTA */}
        <Link
          href="/apply"
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-lg text-sm font-bold transition-all duration-150"
          style={{ backgroundColor: '#C9A84C', color: '#0D1F1D' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#A8892E')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#C9A84C')}
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
              style={{ backgroundColor: 'rgba(13,92,84,0.10)', color: '#0D5C54' }}
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

  const topay = Math.max(0, newPrice - estimate);

  return (
    <div
      className="rounded-2xl shadow-xl overflow-hidden"
      style={{ border: '1px solid #D4C9B0', backgroundColor: '#ffffff' }}
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
              borderColor: '#D4C9B0',
              color: category ? '#0D1F1D' : '#4A6B67',
              backgroundColor: '#F4EFE4',
            }}
          >
            <option value="" disabled>Выберите категорию...</option>
            {TRADE_IN_CATEGORIES.map((c) => (
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
          style={{ backgroundColor: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.25)' }}
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm" style={{ color: '#4A6B67' }}>Стоимость вашего товара:</span>
            <span className="text-base font-bold" style={{ color: '#0D5C54' }}>
              {fmt(estimate)} <span style={{ color: '#C9A84C' }}>сум</span>
            </span>
          </div>
          <div
            className="flex justify-between items-center pt-3"
            style={{ borderTop: '1px solid rgba(201,168,76,0.25)' }}
          >
            <span className="text-sm font-semibold" style={{ color: '#0D1F1D' }}>Доплата за новый товар:</span>
            <span className="text-xl font-extrabold" style={{ color: '#C9A84C' }}>
              {fmt(topay)} сум
            </span>
          </div>
        </div>

        <Link
          href="/trade-in"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-lg text-sm font-bold border transition-all duration-150"
          style={{ borderColor: '#C9A84C', color: '#C9A84C', backgroundColor: 'transparent' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#C9A84C';
            e.currentTarget.style.color = '#0D1F1D';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#C9A84C';
          }}
        >
          Оценить точнее <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

// ─── Exported Section ─────────────────────────────────────────────────────────

export default function CalculatorSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#F4EFE4' }}>
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
          <InstallmentCalculator />
          <TradeInEstimator />
        </div>
      </div>
    </section>
  );
}
