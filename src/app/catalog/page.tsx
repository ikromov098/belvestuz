'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Smartphone, Car, LayoutGrid,
  ChevronRight, Search, X, SlidersHorizontal,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DevModal from '@/components/DevModal';

// ─── Types ────────────────────────────────────────────────────────────────────

type Service = 'Рассрочка' | 'Лизинг' | 'Трейд-ин';
type BadgeType = 'Хит' | 'Лизинг' | 'Акция' | 'Трейд-ин' | 'Новинка';

interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  monthlyMin: number;
  badge?: BadgeType;
  services: Service[];
  inStock: boolean;
  isB2B: boolean;
}

// ─── Static data ──────────────────────────────────────────────────────────────
// Belvest finances cars and phones (+ high-value electronics like laptops).
// Low-margin home goods (TVs, furniture, appliances) and industrial equipment
// are intentionally not offered and were removed from the catalog.

const CATEGORIES = [
  { id: 'all',         Icon: LayoutGrid },
  { id: 'electronics', Icon: Smartphone },
  { id: 'transport',   Icon: Car        },
];

const ALL_SERVICES: Service[] = ['Рассрочка', 'Лизинг', 'Трейд-ин'];

// Bounds of the max-price filter slider (сум). Upper bound covers premium cars up to ~$100k.
const PRICE_MIN = 500_000;
const PRICE_MAX = 1_300_000_000;

const PRODUCTS: Product[] = [
  // Электроника (смартфоны и ноутбуки)
  { id: 1,  name: 'Samsung Galaxy S24 Ultra',   brand: 'Samsung',   category: 'electronics', price: 12_000_000,  monthlyMin: 1_000_000, badge: 'Хит',     services: ['Рассрочка', 'Трейд-ин'],  inStock: true,  isB2B: false },
  { id: 2,  name: 'MacBook Pro 14" M3',         brand: 'Apple',     category: 'electronics', price: 22_000_000,  monthlyMin: 1_833_000, badge: 'Новинка',  services: ['Рассрочка', 'Трейд-ин'],  inStock: true,  isB2B: false },
  // Транспорт (автомобили)
  { id: 10, name: 'Chevrolet Equinox 2024',     brand: 'Chevrolet', category: 'transport',   price: 285_000_000, monthlyMin: 5_950_000, badge: 'Хит',     services: ['Лизинг', 'Трейд-ин'],     inStock: true,  isB2B: false },
  { id: 11, name: 'Yamaha MT-07 2024',          brand: 'Yamaha',    category: 'transport',   price: 48_000_000,  monthlyMin: 2_000_000, badge: 'Лизинг',   services: ['Лизинг', 'Трейд-ин'],     inStock: true,  isB2B: false },

  // ── Автомобили по ценовым тарифам ──
  // Цены конвертированы из USD по курсу ≈ 12 600 сум/$. monthlyMin рассчитан на срок ~48 мес.
  // TODO: replace with real product photography (transport cards render a Car placeholder icon for now)
  // ~$10k тариф (Chevrolet)
  { id: 12, name: 'Chevrolet Spark',            brand: 'Chevrolet',     category: 'transport',   price: 116_000_000,   monthlyMin: 2_420_000,  services: ['Лизинг', 'Трейд-ин'],     inStock: true,  isB2B: false },
  { id: 13, name: 'Chevrolet Cobalt',           brand: 'Chevrolet',     category: 'transport',   price: 132_000_000,   monthlyMin: 2_750_000,  services: ['Лизинг', 'Трейд-ин'],     inStock: true,  isB2B: false },
  { id: 14, name: 'Chevrolet Nexia 3',          brand: 'Chevrolet',     category: 'transport',   price: 149_000_000,   monthlyMin: 3_100_000,  services: ['Лизинг', 'Трейд-ин'],     inStock: true,  isB2B: false },
  // ~$30k тариф (Chevrolet)
  { id: 15, name: 'Chevrolet Tracker',          brand: 'Chevrolet',     category: 'transport',   price: 353_000_000,   monthlyMin: 7_350_000,  services: ['Лизинг', 'Трейд-ин'],     inStock: true,  isB2B: false },
  { id: 16, name: 'Chevrolet Traverse',         brand: 'Chevrolet',     category: 'transport',   price: 435_000_000,   monthlyMin: 9_060_000,  services: ['Лизинг', 'Трейд-ин'],     inStock: true,  isB2B: false },
  // ~$50k тариф (немецкий премиум)
  { id: 17, name: 'Audi A4',                    brand: 'Audi',          category: 'transport',   price: 617_000_000,   monthlyMin: 12_850_000, services: ['Лизинг', 'Трейд-ин'],     inStock: true,  isB2B: false },
  { id: 18, name: 'BMW 3 Series',               brand: 'BMW',           category: 'transport',   price: 655_000_000,   monthlyMin: 13_650_000, services: ['Лизинг', 'Трейд-ин'],     inStock: true,  isB2B: false },
  { id: 19, name: 'Mercedes-Benz C-Class',      brand: 'Mercedes-Benz', category: 'transport',   price: 687_000_000,   monthlyMin: 14_310_000, services: ['Лизинг', 'Трейд-ин'],     inStock: true,  isB2B: false },
  // ~$100k тариф (немецкий премиум)
  { id: 20, name: 'BMW X7',                     brand: 'BMW',           category: 'transport',   price: 1_235_000_000, monthlyMin: 25_730_000, services: ['Лизинг', 'Трейд-ин'],     inStock: true,  isB2B: false },
  { id: 21, name: 'Mercedes-Benz GLE 450',      brand: 'Mercedes-Benz', category: 'transport',   price: 1_285_000_000, monthlyMin: 26_770_000, services: ['Лизинг', 'Трейд-ин'],     inStock: true,  isB2B: false },
];

const BADGE_STYLE: Record<BadgeType, { backgroundColor: string; color: string }> = {
  'Хит':      { backgroundColor: '#548870', color: '#FFFFFF' },
  'Лизинг':   { backgroundColor: '#004445', color: '#FFF0CC' },
  'Акция':    { backgroundColor: '#C62828', color: '#ffffff' },
  'Трейд-ин': { backgroundColor: '#6B3FA0', color: '#ffffff' },
  'Новинка':  { backgroundColor: '#16685B', color: '#ffffff' },
};

const SERVICE_PILL: Record<Service, { backgroundColor: string; color: string }> = {
  'Рассрочка': { backgroundColor: 'rgba(0,68,69,0.10)', color: '#004445' },
  'Лизинг':   { backgroundColor: '#004445',              color: '#FFF0CC' },
  'Трейд-ин': { backgroundColor: 'rgba(107,63,160,0.12)', color: '#6B3FA0' },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return Math.round(n).toLocaleString('ru-RU');
}

// ─── ProductCard ──────────────────────────────────────────────────────────────

function ProductCard({ product, onShowModal }: { product: Product; onShowModal: () => void }) {
  const { t } = useLanguage();
  const [hovered, setHovered] = useState(false);
  const [ctaHovered, setCtaHovered] = useState(false);

  const ctaBg   = product.isB2B ? '#004445' : '#548870';
  const ctaBgHov = product.isB2B ? '#003332' : '#16685B';
  const ctaColor = '#FFF0CC';

  const svcName = (s: string) => {
    const map: Record<string, string> = {
      'Рассрочка': t.catalog.serviceNames.installment,
      'Лизинг':   t.catalog.serviceNames.leasing,
      'Трейд-ин': t.catalog.serviceNames.tradein,
    };
    return map[s] ?? s;
  };

  return (
    <div
      className="flex flex-col rounded-xl overflow-hidden transition-all duration-200"
      style={{
        backgroundColor: '#ffffff',
        border: `1.5px solid ${hovered ? '#004445' : '#16685B'}`,
        boxShadow: hovered
          ? '0 10px 32px rgba(0,68,69,0.16)'
          : '0 1px 4px rgba(0,0,0,0.06)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image placeholder — brand-colored icon until real photography exists */}
      {/* TODO: replace with real product photography when available */}
      <div
        className="relative h-48 flex items-center justify-center select-none"
        style={{ background: '#004445' }}
      >
        {product.badge && (
          <span
            className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-bold"
            style={BADGE_STYLE[product.badge]}
          >
            {product.badge}
          </span>
        )}
        {!product.inStock && (
          <span
            className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-xs font-semibold"
            style={{ backgroundColor: 'rgba(0,0,0,0.55)', color: '#ffffff' }}
          >
            {t.catalog.outOfStock}
          </span>
        )}
        {product.category === 'transport'
          ? <Car size={56} style={{ color: '#FFF0CC' }} />
          : <Smartphone size={56} style={{ color: '#FFF0CC' }} />}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: '#4A6B67' }}>
            {product.brand}
          </p>
          <h3 className="text-sm font-bold leading-snug" style={{ color: '#0D1F1D' }}>
            {product.name}
          </h3>
        </div>

        {/* Price block */}
        <div>
          <p className="text-base font-extrabold" style={{ color: '#0D1F1D' }}>
            {fmt(product.price)} сум
          </p>
          <p className="text-sm font-bold" style={{ color: '#004445' }}>
            {t.catalog.from} {fmt(product.monthlyMin)} сум/мес
          </p>
        </div>

        {/* Service tags */}
        <div className="flex flex-wrap gap-1.5">
          {product.services.map((s) => (
            <span
              key={s}
              className="px-2 py-0.5 rounded-full text-xs font-semibold"
              style={SERVICE_PILL[s]}
            >
              {svcName(s)}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-auto pt-1">
          <button
            onClick={onShowModal}
            className="block w-full text-center py-2.5 rounded-lg text-sm font-bold transition-colors duration-150 cursor-pointer"
            style={{ backgroundColor: ctaHovered ? ctaBgHov : ctaBg, color: ctaColor }}
            onMouseEnter={() => setCtaHovered(true)}
            onMouseLeave={() => setCtaHovered(false)}
          >
            {product.isB2B ? t.catalog.applyLeasing : t.catalog.applyInstallment}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

interface SidebarProps {
  activeServices: Service[];
  activeBrands: string[];
  priceMax: number;
  inStockOnly: boolean;
  allBrands: string[];
  onToggleService: (s: Service) => void;
  onToggleBrand: (b: string) => void;
  onPriceMax: (v: number) => void;
  onStockToggle: () => void;
  onClear: () => void;
  filterCount: number;
}

function FilterSidebar({
  activeServices, activeBrands, priceMax, inStockOnly, allBrands,
  onToggleService, onToggleBrand, onPriceMax, onStockToggle, onClear, filterCount,
}: SidebarProps) {
  const { t } = useLanguage();
  const pct = ((priceMax - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;

  const svcName = (s: string) => {
    const map: Record<string, string> = {
      'Рассрочка': t.catalog.serviceNames.installment,
      'Лизинг':   t.catalog.serviceNames.leasing,
      'Трейд-ин': t.catalog.serviceNames.tradein,
    };
    return map[s] ?? s;
  };

  return (
    <div
      className="rounded-xl p-5 flex flex-col gap-5"
      style={{ backgroundColor: '#ffffff', border: '1px solid #16685B' }}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-bold" style={{ color: '#0D1F1D' }}>{t.catalog.filters}</h3>
        {filterCount > 0 && (
          <button
            onClick={onClear}
            className="text-xs font-semibold flex items-center gap-1 cursor-pointer"
            style={{ color: '#C62828' }}
          >
            <X size={12} /> {t.catalog.clear}
          </button>
        )}
      </div>

      {/* Services */}
      <div>
        <h4 className="text-xs font-semibold uppercase mb-3" style={{ color: '#16685B', letterSpacing: '0.08em' }}>
          {t.catalog.servicesLabel}
        </h4>
        <div className="flex flex-col gap-2">
          {ALL_SERVICES.map((s) => (
            <label key={s} className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={activeServices.includes(s)}
                onChange={() => onToggleService(s)}
                className="w-4 h-4 rounded cursor-pointer"
                style={{ accentColor: '#004445' }}
              />
              <span className="text-sm" style={{ color: '#0D1F1D' }}>{svcName(s)}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h4 className="text-xs font-semibold uppercase mb-3" style={{ color: '#16685B', letterSpacing: '0.08em' }}>
          {t.catalog.maxPrice}
        </h4>
        <p className="text-sm font-bold mb-2" style={{ color: '#004445' }}>
          до {fmt(priceMax)} сум
        </p>
        <input
          type="range"
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={500_000}
          value={priceMax}
          onChange={(e) => onPriceMax(Number(e.target.value))}
          className="belvest-slider w-full"
          style={{ background: `linear-gradient(to right,#004445 ${pct}%,#16685B ${pct}%)` }}
        />
      </div>

      {/* Brands */}
      <div>
        <h4 className="text-xs font-semibold uppercase mb-3" style={{ color: '#16685B', letterSpacing: '0.08em' }}>
          {t.catalog.brandLabel}
        </h4>
        <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
          {allBrands.map((b) => (
            <label key={b} className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={activeBrands.includes(b)}
                onChange={() => onToggleBrand(b)}
                className="w-4 h-4 rounded cursor-pointer"
                style={{ accentColor: '#004445' }}
              />
              <span className="text-sm" style={{ color: '#0D1F1D' }}>{b}</span>
            </label>
          ))}
        </div>
      </div>

      {/* In stock */}
      <label className="flex items-center gap-2.5 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={onStockToggle}
          className="w-4 h-4 rounded cursor-pointer"
          style={{ accentColor: '#004445' }}
        />
        <span className="text-sm font-semibold" style={{ color: '#0D1F1D' }}>
          {t.catalog.inStockOnly}
        </span>
      </label>
    </div>
  );
}

// ─── Skeleton card ────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: '1.5px solid #16685B', backgroundColor: '#fff' }}>
      <div className="skeleton-shimmer" style={{ height: 192 }} />
      <div className="p-4 flex flex-col gap-3">
        <div className="skeleton-shimmer rounded" style={{ height: 12, width: '40%' }} />
        <div className="skeleton-shimmer rounded" style={{ height: 16, width: '75%' }} />
        <div className="skeleton-shimmer rounded" style={{ height: 22, width: '55%' }} />
        <div className="flex gap-1.5">
          <div className="skeleton-shimmer rounded-full" style={{ height: 22, width: 70 }} />
          <div className="skeleton-shimmer rounded-full" style={{ height: 22, width: 70 }} />
        </div>
        <div className="skeleton-shimmer rounded-lg" style={{ height: 38 }} />
      </div>
    </div>
  );
}

// ─── Page (inner, uses hooks) ─────────────────────────────────────────────────

function CatalogPageInner() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const initService = searchParams.get('service') as Service | null;

  const [showModal, setShowModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeServices, setActiveServices] = useState<Service[]>(() =>
    initService && ALL_SERVICES.includes(initService) ? [initService] : []
  );
  const [activeBrands, setActiveBrands]     = useState<string[]>([]);
  const [priceMax, setPriceMax]             = useState(PRICE_MAX);
  const [inStockOnly, setInStockOnly]       = useState(false);
  const [search, setSearch]                 = useState('');
  const [mobileSidebar, setMobileSidebar]   = useState(false);
  const [loading, setLoading]               = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const allBrands = useMemo(
    () => [...new Set(PRODUCTS.map((p) => p.brand))].sort(),
    []
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return PRODUCTS.filter((p) => {
      if (activeCategory !== 'all' && p.category !== activeCategory) return false;
      if (activeServices.length && !activeServices.some((s) => p.services.includes(s))) return false;
      if (activeBrands.length && !activeBrands.includes(p.brand)) return false;
      if (p.price > priceMax) return false;
      if (inStockOnly && !p.inStock) return false;
      if (q && !p.name.toLowerCase().includes(q) && !p.brand.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [activeCategory, activeServices, activeBrands, priceMax, inStockOnly, search]);

  const filterCount =
    (activeCategory !== 'all' ? 1 : 0) +
    activeServices.length +
    activeBrands.length +
    (inStockOnly ? 1 : 0) +
    (priceMax < PRICE_MAX ? 1 : 0);

  const toggleService  = (s: Service) => setActiveServices((p) => p.includes(s) ? p.filter((x) => x !== s) : [...p, s]);
  const toggleBrand    = (b: string)  => setActiveBrands((p) => p.includes(b)  ? p.filter((x) => x !== b)  : [...p, b]);
  const clearAll       = () => { setActiveCategory('all'); setActiveServices([]); setActiveBrands([]); setPriceMax(PRICE_MAX); setInStockOnly(false); setSearch(''); };

  const sidebarProps = {
    activeServices, activeBrands, priceMax, inStockOnly, allBrands, filterCount,
    onToggleService: toggleService, onToggleBrand: toggleBrand,
    onPriceMax: setPriceMax, onStockToggle: () => setInStockOnly((v) => !v),
    onClear: clearAll,
  };

  const catName = (id: string) => {
    const map: Record<string, string> = {
      all:         t.catalog.categories.all,
      electronics: t.catalog.categories.electronics,
      appliances:  t.catalog.categories.appliances,
      furniture:   t.catalog.categories.furniture,
      transport:   t.catalog.categories.transport,
      equipment:   t.catalog.categories.equipment,
    };
    return map[id] ?? id;
  };

  return (
    <div>
      {showModal && <DevModal onClose={() => setShowModal(false)} />}
      {/* ── Page header ── */}
      <div style={{ backgroundColor: '#004445' }} className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-1.5 mb-3 text-xs" style={{ color: 'rgba(255,240,204,0.55)' }}>
            <Link href="/" style={{ color: 'rgba(255,240,204,0.55)' }}>{t.catalog.breadcrumbHome}</Link>
            <ChevronRight size={12} />
            <span style={{ color: '#FFF0CC' }}>{t.catalog.title}</span>
          </nav>
          <h1 className="text-3xl font-extrabold mb-1" style={{ color: '#FFF0CC' }}>
            {t.catalog.title}
          </h1>
          <p style={{ color: 'rgba(255,240,204,0.70)' }}>
            {t.catalog.subtitle}
          </p>
        </div>
      </div>

      {/* ── Category hero banner ── */}
      <div
        style={{
          backgroundColor: '#004445',
          borderBottom: '1px solid rgba(255,240,204,0.15)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-4 pt-2" style={{ scrollbarWidth: 'none' }}>
            {CATEGORIES.map(({ id, Icon }) => {
              const active = activeCategory === id;
              return (
                <button
                  key={id}
                  onClick={() => setShowModal(true)}
                  className="flex flex-col items-center gap-1.5 px-5 py-3 rounded-xl flex-shrink-0 transition-all duration-150 cursor-pointer"
                  style={{
                    backgroundColor: active ? 'rgba(84,136,112,0.20)' : 'rgba(255,240,204,0.07)',
                    border: `2px solid ${active ? '#548870' : 'transparent'}`,
                    color:  active ? '#FFF0CC' : 'rgba(255,240,204,0.70)',
                  }}
                >
                  <Icon size={22} />
                  <span className="text-xs font-semibold whitespace-nowrap">{catName(id)}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-7 items-start">

          {/* Sidebar — desktop */}
          <aside className="hidden lg:block w-60 flex-shrink-0 sticky top-[78px]">
            <FilterSidebar {...sidebarProps} />
          </aside>

          {/* Grid area */}
          <div className="flex-1 min-w-0">

            {/* Toolbar */}
            <div className="flex items-center gap-3 mb-6">
              <div className="relative flex-1">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#4A6B67' }} />
                <input
                  type="text"
                  placeholder={t.catalog.search}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm outline-none"
                  style={{ border: '1px solid #16685B', backgroundColor: '#ffffff', color: '#0D1F1D' }}
                />
              </div>

              {/* Mobile filter toggle */}
              <button
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold cursor-pointer flex-shrink-0"
                style={{ border: '1px solid #16685B', backgroundColor: '#ffffff', color: '#0D1F1D' }}
                onClick={() => setMobileSidebar((v) => !v)}
              >
                <SlidersHorizontal size={15} />
                {t.catalog.filtersBtn}
                {filterCount > 0 && (
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-bold"
                    style={{ backgroundColor: '#004445', color: '#FFFFFF' }}
                  >
                    {filterCount}
                  </span>
                )}
              </button>

              <span className="text-sm hidden sm:block flex-shrink-0" style={{ color: '#4A6B67' }}>
                {filtered.length} {t.catalog.itemsCount}
              </span>
            </div>

            {/* Mobile sidebar */}
            {mobileSidebar && (
              <div className="lg:hidden mb-6">
                <FilterSidebar {...sidebarProps} />
              </div>
            )}

            {/* Active filter pills */}
            {filterCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {activeCategory !== 'all' && (
                  <span
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold cursor-pointer"
                    style={{ backgroundColor: 'rgba(0,68,69,0.10)', color: '#004445' }}
                    onClick={() => setActiveCategory('all')}
                  >
                    {catName(activeCategory)} <X size={11} />
                  </span>
                )}
                {activeServices.map((s) => (
                  <span
                    key={s}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold cursor-pointer"
                    style={{ backgroundColor: 'rgba(0,68,69,0.10)', color: '#004445' }}
                    onClick={() => toggleService(s)}
                  >
                    {s} <X size={11} />
                  </span>
                ))}
                {activeBrands.map((b) => (
                  <span
                    key={b}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold cursor-pointer"
                    style={{ backgroundColor: 'rgba(0,68,69,0.10)', color: '#004445' }}
                    onClick={() => toggleBrand(b)}
                  >
                    {b} <X size={11} />
                  </span>
                ))}
                {inStockOnly && (
                  <span
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold cursor-pointer"
                    style={{ backgroundColor: 'rgba(0,68,69,0.10)', color: '#004445' }}
                    onClick={() => setInStockOnly(false)}
                  >
                    {t.catalog.inStock} <X size={11} />
                  </span>
                )}
              </div>
            )}

            {/* Grid or empty state */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="mb-4"><Search size={40} style={{ color: '#548870' }} /></div>
                <p className="text-lg font-bold mb-1.5" style={{ color: '#0D1F1D' }}>{t.catalog.noResults}</p>
                <p className="text-sm mb-5" style={{ color: '#4A6B67' }}>{t.catalog.noResultsSub}</p>
                <button
                  onClick={clearAll}
                  className="px-6 py-2.5 rounded-lg text-sm font-bold cursor-pointer"
                  style={{ backgroundColor: '#004445', color: '#FFFFFF' }}
                >
                  {t.catalog.resetFilters}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((p) => <ProductCard key={p.id} product={p} onShowModal={() => setShowModal(true)} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense>
      <CatalogPageInner />
    </Suspense>
  );
}
