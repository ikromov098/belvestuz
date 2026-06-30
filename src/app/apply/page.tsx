'use client';

import { useState, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ShoppingCart, RefreshCw, ArrowLeftRight, TrendingUp,
  Check, X, Upload, Info, ChevronLeft, ChevronRight, AlertCircle,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
type ServiceId  = 'installment' | 'leasing' | 'tradein' | 'investment';
type EntityType = 'individual' | 'legal' | 'ip';
interface MockProduct { id: number; name: string; price: number; }

// ─── Constants ────────────────────────────────────────────────────────────────
const STEP_LABELS = ['Услуга и товар', 'Личные данные', 'Документы', 'Подтверждение'];

const SERVICES: { id: ServiceId; label: string; sub: string; Icon: React.ElementType }[] = [
  { id: 'installment', label: 'Рассрочка',  sub: 'Покупка товара с оплатой частями без процентов',  Icon: ShoppingCart   },
  { id: 'leasing',     label: 'Лизинг',     sub: 'Финансовая аренда имущества для физ. и юр. лиц', Icon: RefreshCw      },
  { id: 'tradein',     label: 'Трейд-ин',   sub: 'Сдайте старый товар в счёт покупки нового',      Icon: ArrowLeftRight },
  { id: 'investment',  label: 'Инвестиции', sub: 'Вложите средства с гарантированным доходом',     Icon: TrendingUp     },
];

const TERMS = [3, 6, 12, 18, 24, 36];
const TRADE_IN_CATS = ['Смартфон', 'Ноутбук / ПК', 'Телевизор', 'Холодильник', 'Стиральная машина', 'Кондиционер', 'Автомобиль', 'Другое'];

const MOCK_PRODUCTS: MockProduct[] = [
  { id: 1,  name: 'Samsung Galaxy S24 Ultra',   price: 12_000_000  },
  { id: 2,  name: 'MacBook Pro 14" M3',         price: 22_000_000  },
  { id: 3,  name: 'LG OLED TV 65"',            price: 15_000_000  },
  { id: 4,  name: 'Samsung Side-by-Side RF65',  price: 8_500_000   },
  { id: 5,  name: 'Bosch Serie 8 Стиральная',   price: 6_200_000   },
  { id: 6,  name: 'Midea Кондиционер 18000',    price: 4_800_000   },
  { id: 7,  name: 'Угловой диван Milano XXL',   price: 9_500_000   },
  { id: 8,  name: 'Шкаф-купе Luxe 3м',         price: 5_500_000   },
  { id: 9,  name: 'Кровать Royal 160×200',      price: 7_200_000   },
  { id: 10, name: 'Chevrolet Equinox 2024',     price: 285_000_000 },
  { id: 11, name: 'Yamaha MT-07 2024',          price: 48_000_000  },
  { id: 12, name: 'Экскаватор XCMG XE215D',     price: 250_000_000 },
  { id: 13, name: 'Генератор FG Wilson 100кВт', price: 45_000_000  },
  { id: 14, name: 'Станок ЧПУ DMG Mori NLX',   price: 180_000_000 },
];

const DOCS_INDIVIDUAL = [
  { key: 'passport_front', label: 'Паспорт — лицевая сторона',   req: true  },
  { key: 'passport_back',  label: 'Паспорт — страница прописки', req: true  },
  { key: 'selfie',         label: 'Селфи с паспортом в руках',   req: true  },
];
const DOCS_LEGAL = [
  { key: 'charter',      label: 'Устав компании',              req: true },
  { key: 'registration', label: 'Свидетельство о регистрации', req: true },
  { key: 'financials',   label: 'Финансовая отчётность',       req: true },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt     = (n: number) => Math.round(n).toLocaleString('ru-RU');
const fmtSize = (b: number) => b < 1_048_576 ? `${Math.round(b / 1024)} KB` : `${(b / 1_048_576).toFixed(1)} MB`;
const vPhone  = (p: string) => /^\d{9}$/.test(p.replace(/\D/g, '')) ? '' : 'Введите 9 цифр номера';
const vEmail  = (e: string) => !e || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) ? '' : 'Некорректный email';
const vPinfl  = (p: string) => /^\d{14}$/.test(p) ? '' : 'ПИНФЛ — 14 цифр';
const vSeries = (s: string) => /^[A-Za-z]{2}$/.test(s) ? '' : 'Формат: AA';
const vPassN  = (n: string) => /^\d{7}$/.test(n) ? '' : '7 цифр';

// ─── ProgressBar ──────────────────────────────────────────────────────────────
function ProgressBar({ step }: { step: number }) {
  return (
    <div className="flex items-start mb-10">
      {STEP_LABELS.map((label, i) => {
        const n = i + 1;
        const done   = step > n;
        const active = step === n;
        const last   = i === STEP_LABELS.length - 1;
        return (
          <div key={n} className="flex flex-col items-center" style={{ flex: last ? 'none' : 1 }}>
            <div className="flex items-center w-full">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all duration-200"
                style={{
                  backgroundColor: done ? '#004445' : active ? '#C9A84C' : '#FFFFFF',
                  color:           done ? '#FFF0CC' : active ? '#0D1F1D' : '#9CA3AF',
                  border:          `2px solid ${done ? '#004445' : active ? '#C9A84C' : '#16685B'}`,
                }}
              >
                {done ? <Check size={14} /> : n}
              </div>
              {!last && (
                <div className="flex-1 h-0.5 mx-1 transition-colors duration-200"
                  style={{ backgroundColor: step > n ? '#004445' : '#16685B' }} />
              )}
            </div>
            <span
              className="text-xs font-semibold mt-2 pr-2 text-center hidden sm:block"
              style={{ color: active ? '#C9A84C' : done ? '#004445' : '#9CA3AF', lineHeight: 1.3 }}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ─── FormField ────────────────────────────────────────────────────────────────
function Field({
  label, value, onChange, placeholder = '', type = 'text',
  error = '', valid = false, required = false, tooltip = '',
  prefix = '', disabled = false,
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; error?: string; valid?: boolean;
  required?: boolean; tooltip?: string; prefix?: string; disabled?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: '#0D1F1D' }}>
        {label}
        {required && <span style={{ color: '#C62828' }}>*</span>}
        {tooltip && (
          <span title={tooltip} className="cursor-help inline-flex" style={{ color: '#4A6B67' }}>
            <Info size={13} />
          </span>
        )}
      </label>
      <div className="flex">
        {prefix && (
          <div className="flex items-center px-3.5 rounded-l-lg text-sm font-semibold border-y border-l select-none"
            style={{ backgroundColor: '#FFFFFF', borderColor: '#16685B', color: '#4A6B67' }}>
            {prefix}
          </div>
        )}
        <div className="relative flex-1">
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className="w-full px-3.5 py-2.5 text-sm outline-none transition-all duration-150"
            style={{
              border:           `1.5px solid ${error ? '#C62828' : valid ? '#2E7D32' : '#16685B'}`,
              borderLeft:       prefix ? 'none' : undefined,
              borderRadius:     prefix ? '0 0.5rem 0.5rem 0' : '0.5rem',
              backgroundColor:  disabled ? '#F9F6F0' : '#ffffff',
              color:            '#0D1F1D',
              paddingRight:     valid && !error ? '2.25rem' : undefined,
            }}
          />
          {valid && !error && (
            <Check size={15} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#2E7D32' }} />
          )}
        </div>
      </div>
      {error && (
        <p className="flex items-center gap-1 text-xs" style={{ color: '#C62828' }}>
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  );
}

// ─── UploadZone ───────────────────────────────────────────────────────────────
function UploadZone({ label, docKey, file, onFile, required }: {
  label: string; docKey: string; file: File | null;
  onFile: (key: string, f: File | null) => void; required: boolean;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);

  const accept = (f: File) => {
    if (f.size > 10 * 1024 * 1024) return alert('Файл слишком большой. Максимум 10MB.');
    onFile(docKey, f);
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold" style={{ color: '#0D1F1D' }}>
        {label} {required && <span style={{ color: '#C62828' }}>*</span>}
      </label>
      {file ? (
        <div className="flex items-center gap-3 p-3.5 rounded-lg"
          style={{ border: '1.5px solid #2E7D32', backgroundColor: 'rgba(46,125,50,0.05)' }}>
          <Check size={18} style={{ color: '#2E7D32', flexShrink: 0 }} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate" style={{ color: '#0D1F1D' }}>{file.name}</p>
            <p className="text-xs" style={{ color: '#4A6B67' }}>{fmtSize(file.size)}</p>
          </div>
          <button type="button" onClick={() => onFile(docKey, null)} className="cursor-pointer p-1" style={{ color: '#C62828' }}>
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center gap-2 py-7 px-4 rounded-lg cursor-pointer transition-all duration-150"
          style={{
            border: `2px dashed ${drag ? '#004445' : '#16685B'}`,
            backgroundColor: drag ? 'rgba(0,68,69,0.05)' : '#FAFAF8',
          }}
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e)    => { e.preventDefault(); setDrag(false); if (e.dataTransfer.files[0]) accept(e.dataTransfer.files[0]); }}
          onClick={() => ref.current?.click()}
        >
          <Upload size={22} style={{ color: drag ? '#004445' : '#4A6B67' }} />
          <p className="text-sm text-center" style={{ color: '#4A6B67' }}>
            <span className="font-semibold" style={{ color: '#004445' }}>Перетащите файл</span> или нажмите для выбора
          </p>
          <p className="text-xs" style={{ color: '#9CA3AF' }}>JPG, PNG, PDF · до 10MB</p>
          <input ref={ref} type="file" accept=".jpg,.jpeg,.png,.pdf" className="hidden"
            onChange={(e) => { if (e.target.files?.[0]) accept(e.target.files[0]); }} />
        </div>
      )}
    </div>
  );
}

// ─── Policy Modal ─────────────────────────────────────────────────────────────
function PolicyModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.55)' }} onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[75vh] overflow-auto"
        style={{ border: '1px solid #16685B' }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 sticky top-0 bg-white"
          style={{ borderBottom: '1px solid #16685B' }}>
          <h3 className="font-bold" style={{ color: '#0D1F1D' }}>Политика обработки персональных данных</h3>
          <button type="button" onClick={onClose} className="cursor-pointer" style={{ color: '#4A6B67' }}><X size={20} /></button>
        </div>
        <div className="px-6 py-5 flex flex-col gap-4 text-sm leading-relaxed" style={{ color: '#4A6B67' }}>
          {['Общие положения', 'Сбор и использование данных', 'Хранение и защита данных', 'Права пользователя'].map((h, i) => (
            <div key={i}>
              <h4 className="font-bold mb-1" style={{ color: '#004445' }}>{i + 1}. {h}</h4>
              <p>Настоящая политика определяет порядок обработки персональных данных пользователей сервиса Belvest в соответствии с законодательством Республики Узбекистан. Мы обрабатываем ваши данные исключительно в целях предоставления финансовых услуг и не передаём их третьим лицам без вашего согласия.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Success Screen ───────────────────────────────────────────────────────────
function SuccessScreen({ appNumber }: { appNumber: string }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-20 rounded-2xl text-center px-8"
      style={{ backgroundColor: '#004445' }}>
      <motion.div
        initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 160, damping: 14 }}
        className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
        style={{ backgroundColor: 'rgba(255,240,204,0.15)', border: '3px solid rgba(255,240,204,0.55)' }}>
        <Check size={38} style={{ color: '#FFF0CC' }} />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <h2 className="text-2xl font-extrabold mb-2" style={{ color: '#FFF0CC' }}>Ваша заявка принята!</h2>
        <p className="text-base font-bold mb-1.5" style={{ color: '#C9A84C' }}>Номер заявки: {appNumber}</p>
        <p className="text-sm mb-8" style={{ color: 'rgba(255,240,204,0.70)' }}>
          Наш менеджер свяжется с вами в течение 1 рабочего дня
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
          <a
            href="https://t.me/belvest_info"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-150"
            style={{ backgroundColor: '#C9A84C', color: '#0D1F1D' }}
          >
            Telegram @belvest_info
          </a>
          <a
            href="tel:+998774809999"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border transition-all duration-150"
            style={{ borderColor: 'rgba(255,240,204,0.45)', color: '#FFF0CC' }}
          >
            Позвонить +998 77 480-99-99
          </a>
        </div>
        <Link href="/"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-sm transition-all duration-150"
          style={{ color: 'rgba(255,240,204,0.60)' }}>
          Вернуться на главную
        </Link>
      </motion.div>
    </motion.div>
  );
}

// ─── Inline error helper ──────────────────────────────────────────────────────
function Err({ msg }: { msg: string }) {
  if (!msg) return null;
  return (
    <p className="flex items-center gap-1 text-xs mt-1" style={{ color: '#C62828' }}>
      <AlertCircle size={12} /> {msg}
    </p>
  );
}

// ─── Section header (inside form card) ───────────────────────────────────────
function SectionHdr({ title }: { title: string }) {
  return <h2 className="text-lg font-extrabold mb-1" style={{ color: '#0D1F1D' }}>{title}</h2>;
}

// ─── Subsection panel ─────────────────────────────────────────────────────────
function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-5 p-5 rounded-xl" style={{ backgroundColor: '#FFFFFF', border: '1px solid #16685B' }}>
      {children}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
function ApplyPageContent() {
  const searchParams = useSearchParams();
  const initProductId = searchParams.get('product');
  const initService   = searchParams.get('service');

  // ── Navigation ──
  const [step, setStep] = useState(1);
  const [showErrors, setShowErrors] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [appNumber, setAppNumber] = useState('');
  const [showPolicy, setShowPolicy] = useState(false);

  // ── Step 1 ──
  const [service, setService] = useState<ServiceId | ''>(() => {
    if (initService && ['installment','leasing','tradein','investment'].includes(initService))
      return initService as ServiceId;
    if (initProductId) return 'installment';
    return '';
  });
  const [selectedProduct, setSelectedProduct] = useState<MockProduct | null>(() => {
    if (!initProductId) return null;
    return MOCK_PRODUCTS.find(p => p.id === Number(initProductId)) ?? null;
  });
  const [productSearch, setProductSearch] = useState('');
  const [showDropdown, setShowDropdown]   = useState(false);
  const [term, setTerm]                   = useState(12);
  const [tiCategory, setTiCategory]       = useState('');
  const [tiTarget, setTiTarget]           = useState('');
  const [invAmount, setInvAmount]         = useState('');
  const [invTerm, setInvTerm]             = useState(12);

  // ── Step 2 ──
  const [fullName, setFullName]           = useState('');
  const [phone, setPhone]                 = useState('');
  const [email, setEmail]                 = useState('');
  const [entityType, setEntityType]       = useState<EntityType>('individual');
  const [companyName, setCompanyName]     = useState('');
  const [inn, setInn]                     = useState('');
  const [passportSeries, setPassportSeries] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [pinfl, setPinfl]                 = useState('');

  // ── Step 3 ──
  const [docs, setDocs] = useState<Record<string, File | null>>({});
  const setDoc = (key: string, f: File | null) => setDocs((d) => ({ ...d, [key]: f }));

  // ── Step 4 ──
  const [consentData, setConsentData]         = useState(false);
  const [consentAccuracy, setConsentAccuracy] = useState(false);

  // ── Validation ──
  const step1Valid = () => {
    if (!service) return false;
    if (service === 'installment' || service === 'leasing') return !!selectedProduct;
    if (service === 'tradein') return tiCategory !== '' && tiTarget.trim() !== '';
    if (service === 'investment') return Number(invAmount) > 0;
    return false;
  };

  const step2Valid = () => {
    if (!fullName.trim()) return false;
    if (vPhone(phone)) return false;
    if (vEmail(email)) return false;
    if (entityType === 'individual') {
      if (vSeries(passportSeries) || vPassN(passportNumber) || vPinfl(pinfl)) return false;
    } else {
      if (!companyName.trim() || !inn.trim()) return false;
    }
    return true;
  };

  const step3Valid = () => {
    const reqDocs = entityType === 'individual' ? DOCS_INDIVIDUAL : DOCS_LEGAL;
    return reqDocs.filter((d) => d.req).every((d) => !!docs[d.key]);
  };

  const step4Valid = () => consentData && consentAccuracy;

  const currentValid = () =>
    step === 1 ? step1Valid() : step === 2 ? step2Valid() : step === 3 ? step3Valid() : step4Valid();

  const handleNext = () => {
    setShowErrors(true);
    if (!currentValid()) return;
    if (step === 4) {
      const n = `BV-${new Date().getFullYear()}-${String(Math.floor(1000 + Math.random() * 9000))}`;
      setAppNumber(n);
      setSubmitted(true);
    } else {
      setShowErrors(false);
      setStep((s) => s + 1);
    }
  };

  // ── Autocomplete data ──
  const filteredProducts = productSearch
    ? MOCK_PRODUCTS.filter((p) => p.name.toLowerCase().includes(productSearch.toLowerCase()))
    : [];

  // ── Summary helpers ──
  const serviceLabel = SERVICES.find((s) => s.id === service)?.label ?? '—';

  return (
    <div>
      {/* Page header */}
      <div style={{ backgroundColor: '#004445' }} className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <nav className="flex items-center gap-1.5 mb-3 text-xs" style={{ color: 'rgba(255,240,204,0.55)' }}>
            <Link href="/" style={{ color: 'rgba(255,240,204,0.55)' }}>Главная</Link>
            <ChevronRight size={12} />
            <span style={{ color: '#FFF0CC' }}>Подать заявку</span>
          </nav>
          <h1 className="text-3xl font-extrabold mb-1" style={{ color: '#FFF0CC' }}>Подать заявку</h1>
          <p style={{ color: 'rgba(255,240,204,0.70)' }}>Заполните форму — мы свяжемся в течение 1 рабочего дня</p>
        </div>
      </div>

      {/* Form card */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {submitted ? (
          <SuccessScreen appNumber={appNumber} />
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8" style={{ border: '1px solid #16685B' }}>
            <ProgressBar step={step} />

            {/* ═══════ STEP 1 ═══════ */}
            {step === 1 && (
              <div className="flex flex-col gap-6">
                <SectionHdr title="Выберите услугу и товар" />

                {showErrors && !service && (
                  <p className="flex items-center gap-1.5 text-sm" style={{ color: '#C62828' }}>
                    <AlertCircle size={14} /> Выберите услугу для продолжения
                  </p>
                )}

                {/* Service cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SERVICES.map(({ id, label, sub, Icon }) => {
                    const active = service === id;
                    return (
                      <button key={id} type="button" onClick={() => setService(id)}
                        className="flex items-start gap-4 p-4 rounded-xl text-left cursor-pointer transition-all duration-150"
                        style={{
                          border:           `2px solid ${active ? '#C9A84C' : '#16685B'}`,
                          backgroundColor:  active ? 'rgba(201,168,76,0.06)' : '#ffffff',
                        }}>
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: active ? 'rgba(0,68,69,0.10)' : '#FFFFFF' }}>
                          <Icon size={22} style={{ color: active ? '#004445' : '#4A6B67' }} />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-sm mb-0.5" style={{ color: '#0D1F1D' }}>{label}</p>
                          <p className="text-xs leading-relaxed" style={{ color: '#4A6B67' }}>{sub}</p>
                        </div>
                        {active && <Check size={18} className="flex-shrink-0 mt-0.5" style={{ color: '#C9A84C' }} />}
                      </button>
                    );
                  })}
                </div>

                {/* Рассрочка / Лизинг details */}
                {(service === 'installment' || service === 'leasing') && (
                  <Panel>
                    <p className="font-bold text-sm" style={{ color: '#004445' }}>
                      Детали {service === 'leasing' ? 'лизинга' : 'рассрочки'}
                    </p>

                    {/* Product autocomplete */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold" style={{ color: '#0D1F1D' }}>
                        {service === 'leasing' ? 'Имущество для лизинга' : 'Товар'}{' '}
                        <span style={{ color: '#C62828' }}>*</span>
                      </label>
                      {selectedProduct ? (
                        <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg"
                          style={{ border: '1.5px solid #004445', backgroundColor: 'rgba(0,68,69,0.05)' }}>
                          <Check size={15} style={{ color: '#004445' }} />
                          <div className="flex-1">
                            <p className="text-sm font-semibold" style={{ color: '#0D1F1D' }}>{selectedProduct.name}</p>
                            <p className="text-xs" style={{ color: '#4A6B67' }}>{fmt(selectedProduct.price)} сум</p>
                          </div>
                          <button type="button" onClick={() => { setSelectedProduct(null); setProductSearch(''); }}
                            className="cursor-pointer" style={{ color: '#C62828' }}>
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <div className="relative">
                          <input type="text" value={productSearch}
                            onChange={(e) => { setProductSearch(e.target.value); setShowDropdown(true); }}
                            onFocus={() => setShowDropdown(true)}
                            placeholder="Начните вводить название товара..."
                            className="w-full px-3.5 py-2.5 rounded-lg text-sm outline-none"
                            style={{
                              border: `1.5px solid ${showErrors && !selectedProduct ? '#C62828' : '#16685B'}`,
                              backgroundColor: '#ffffff', color: '#0D1F1D',
                            }}
                          />
                          {showDropdown && filteredProducts.length > 0 && (
                            <div className="absolute top-full left-0 right-0 mt-1 rounded-lg shadow-lg z-20 overflow-hidden"
                              style={{ border: '1px solid #16685B', backgroundColor: '#ffffff' }}>
                              {filteredProducts.slice(0, 6).map((p) => (
                                <button key={p.id} type="button"
                                  className="w-full flex items-center justify-between px-4 py-2.5 text-left text-sm cursor-pointer"
                                  style={{ color: '#0D1F1D' }}
                                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
                                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                                  onClick={() => { setSelectedProduct(p); setProductSearch(''); setShowDropdown(false); }}>
                                  <span>{p.name}</span>
                                  <span className="ml-4 text-xs flex-shrink-0" style={{ color: '#4A6B67' }}>{fmt(p.price)} сум</span>
                                </button>
                              ))}
                            </div>
                          )}
                          {showErrors && !selectedProduct && <Err msg="Выберите товар из списка" />}
                        </div>
                      )}
                    </div>

                    {/* Term pills */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold" style={{ color: '#0D1F1D' }}>Срок (месяцев)</label>
                      <div className="flex flex-wrap gap-2">
                        {TERMS.map((t) => (
                          <button key={t} type="button" onClick={() => setTerm(t)}
                            className="px-4 py-1.5 rounded-full text-sm font-semibold border cursor-pointer transition-all"
                            style={{
                              backgroundColor: term === t ? '#C9A84C' : '#ffffff',
                              color:           term === t ? '#0D1F1D' : '#004445',
                              borderColor:     term === t ? '#C9A84C' : '#004445',
                            }}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </Panel>
                )}

                {/* Трейд-ин details */}
                {service === 'tradein' && (
                  <Panel>
                    <p className="font-bold text-sm" style={{ color: '#004445' }}>Детали Трейд-ин</p>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold" style={{ color: '#0D1F1D' }}>
                        Что хотите сдать? <span style={{ color: '#C62828' }}>*</span>
                      </label>
                      <select value={tiCategory} onChange={(e) => setTiCategory(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg text-sm outline-none cursor-pointer"
                        style={{
                          border: `1.5px solid ${showErrors && !tiCategory ? '#C62828' : '#16685B'}`,
                          backgroundColor: '#ffffff', color: tiCategory ? '#0D1F1D' : '#9CA3AF',
                        }}>
                        <option value="" disabled>Выберите категорию...</option>
                        {TRADE_IN_CATS.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                      {showErrors && !tiCategory && <Err msg="Выберите категорию" />}
                    </div>
                    <Field label="Что хотите получить взамён?" value={tiTarget} onChange={setTiTarget}
                      placeholder="Например: iPhone 15 Pro" required
                      error={showErrors && !tiTarget.trim() ? 'Укажите желаемый товар' : ''}
                      valid={tiTarget.trim().length > 1} />
                  </Panel>
                )}

                {/* Инвестиции details */}
                {service === 'investment' && (
                  <Panel>
                    <p className="font-bold text-sm" style={{ color: '#004445' }}>Параметры инвестиции</p>
                    <Field label="Сумма инвестиции (сум)" value={invAmount}
                      onChange={(v) => setInvAmount(v.replace(/\D/g, ''))}
                      placeholder="10 000 000" required
                      error={showErrors && Number(invAmount) <= 0 ? 'Укажите сумму инвестиции' : ''}
                      valid={Number(invAmount) > 0} />
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold" style={{ color: '#0D1F1D' }}>Срок (месяцев)</label>
                      <div className="flex flex-wrap gap-2">
                        {TERMS.map((t) => (
                          <button key={t} type="button" onClick={() => setInvTerm(t)}
                            className="px-4 py-1.5 rounded-full text-sm font-semibold border cursor-pointer transition-all"
                            style={{
                              backgroundColor: invTerm === t ? '#C9A84C' : '#ffffff',
                              color:           invTerm === t ? '#0D1F1D' : '#004445',
                              borderColor:     invTerm === t ? '#C9A84C' : '#004445',
                            }}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </Panel>
                )}
              </div>
            )}

            {/* ═══════ STEP 2 ═══════ */}
            {step === 2 && (
              <div className="flex flex-col gap-6">
                <SectionHdr title="Личные данные" />

                {/* Entity type */}
                <div className="flex gap-2">
                  {(['individual', 'legal', 'ip'] as EntityType[]).map((t) => {
                    const labels: Record<EntityType, string> = { individual: 'Физ. лицо', legal: 'Юр. лицо', ip: 'ИП' };
                    const active = entityType === t;
                    return (
                      <button key={t} type="button" onClick={() => setEntityType(t)}
                        className="flex-1 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-all border"
                        style={{
                          backgroundColor: active ? '#004445' : '#ffffff',
                          color:           active ? '#FFF0CC' : '#4A6B67',
                          borderColor:     active ? '#004445' : '#16685B',
                        }}>
                        {labels[t]}
                      </button>
                    );
                  })}
                </div>

                {/* Common fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Field label="ФИО" value={fullName} onChange={setFullName}
                      placeholder="Иванов Иван Иванович" required
                      error={showErrors && !fullName.trim() ? 'Введите ФИО' : ''}
                      valid={fullName.trim().length > 3} />
                  </div>
                  <Field label="Номер телефона" value={phone} onChange={setPhone}
                    placeholder="991234567" prefix="+998" required
                    error={showErrors ? vPhone(phone) : ''}
                    valid={!vPhone(phone) && phone.length > 0} />
                  <Field label="Email" value={email} onChange={setEmail}
                    placeholder="example@mail.com" type="email"
                    error={showErrors ? vEmail(email) : ''}
                    valid={!vEmail(email) && email.length > 0} />
                </div>

                {/* Юр. лицо / ИП */}
                {entityType !== 'individual' && (
                  <Panel>
                    <p className="font-bold text-sm" style={{ color: '#004445' }}>
                      {entityType === 'legal' ? 'Данные компании' : 'Данные ИП'}
                    </p>
                    <Field label="Наименование организации" value={companyName} onChange={setCompanyName}
                      placeholder='ООО "Название"' required
                      error={showErrors && !companyName.trim() ? 'Укажите наименование' : ''}
                      valid={companyName.trim().length > 2} />
                    <Field label="ИНН" value={inn} onChange={setInn}
                      placeholder="123456789" required
                      error={showErrors && !inn.trim() ? 'Укажите ИНН' : ''}
                      valid={inn.trim().length >= 9} />
                  </Panel>
                )}

                {/* Физ. лицо */}
                {entityType === 'individual' && (
                  <Panel>
                    <p className="font-bold text-sm" style={{ color: '#004445' }}>Паспортные данные</p>
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Серия паспорта" value={passportSeries}
                        onChange={(v) => setPassportSeries(v.toUpperCase().slice(0, 2))}
                        placeholder="AB" required
                        error={showErrors ? vSeries(passportSeries) : ''}
                        valid={!vSeries(passportSeries)} />
                      <Field label="Номер паспорта" value={passportNumber}
                        onChange={(v) => setPassportNumber(v.replace(/\D/g, '').slice(0, 7))}
                        placeholder="1234567" required
                        error={showErrors ? vPassN(passportNumber) : ''}
                        valid={!vPassN(passportNumber)} />
                    </div>
                    <Field label="ПИНФЛ" value={pinfl}
                      onChange={(v) => setPinfl(v.replace(/\D/g, '').slice(0, 14))}
                      placeholder="12345678901234" required
                      tooltip="Персональный идентификационный номер физического лица — 14-значный номер, указан в паспорте или на странице биометрических данных"
                      error={showErrors ? vPinfl(pinfl) : ''}
                      valid={!vPinfl(pinfl)} />
                  </Panel>
                )}
              </div>
            )}

            {/* ═══════ STEP 3 ═══════ */}
            {step === 3 && (
              <div className="flex flex-col gap-6">
                <div>
                  <SectionHdr title="Загрузите документы" />
                  <p className="text-sm mt-1" style={{ color: '#4A6B67' }}>
                    Загрузите чёткие фото или сканы. Принимаются форматы JPG, PNG, PDF до 10MB.
                  </p>
                </div>

                {showErrors && !step3Valid() && (
                  <p className="flex items-center gap-1.5 text-sm" style={{ color: '#C62828' }}>
                    <AlertCircle size={14} /> Загрузите все обязательные документы
                  </p>
                )}

                <div className="flex flex-col gap-5">
                  {(entityType === 'individual' ? DOCS_INDIVIDUAL : DOCS_LEGAL).map((d) => (
                    <UploadZone key={d.key} label={d.label} docKey={d.key}
                      file={docs[d.key] ?? null} onFile={setDoc} required={d.req} />
                  ))}
                </div>
              </div>
            )}

            {/* ═══════ STEP 4 ═══════ */}
            {step === 4 && (
              <div className="flex flex-col gap-6">
                <SectionHdr title="Подтверждение" />

                {/* Summary card */}
                <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #16685B' }}>
                  <div className="px-5 py-3" style={{ backgroundColor: '#004445' }}>
                    <p className="text-sm font-bold" style={{ color: '#FFF0CC' }}>Сводка заявки</p>
                  </div>
                  <div className="divide-y" style={{ borderColor: '#16685B' }}>
                    {[
                      ['Услуга', serviceLabel],
                      ...(service === 'installment' || service === 'leasing'
                        ? [
                            ['Товар / имущество', selectedProduct?.name ?? '—'],
                            ['Стоимость', selectedProduct ? `${fmt(selectedProduct.price)} сум` : '—'],
                            ['Срок', `${term} мес.`],
                          ]
                        : []),
                      ...(service === 'tradein' ? [['Сдаёте', tiCategory], ['Хотите получить', tiTarget]] : []),
                      ...(service === 'investment'
                        ? [['Сумма', `${fmt(Number(invAmount))} сум`], ['Срок', `${invTerm} мес.`]]
                        : []),
                      ['ФИО', fullName || '—'],
                      ['Телефон', phone ? `+998 ${phone}` : '—'],
                      ...(email ? [['Email', email]] : []),
                      ['Тип клиента', entityType === 'individual' ? 'Физическое лицо' : entityType === 'legal' ? 'Юридическое лицо' : 'ИП'],
                      ...(entityType !== 'individual' && companyName ? [['Компания', companyName]] : []),
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between px-5 py-3 text-sm">
                        <span style={{ color: '#4A6B67' }}>{k}</span>
                        <span className="font-semibold text-right ml-4" style={{ color: '#0D1F1D' }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Documents summary */}
                {Object.entries(docs).filter(([, f]) => f).length > 0 && (
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-semibold" style={{ color: '#4A6B67' }}>Прикреплённые документы:</p>
                    {Object.entries(docs).filter(([, f]) => f).map(([key, f]) => (
                      <div key={key} className="flex items-center gap-2 text-sm" style={{ color: '#004445' }}>
                        <Check size={14} /> {f!.name} <span style={{ color: '#9CA3AF' }}>({fmtSize(f!.size)})</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Consents */}
                <div className="flex flex-col gap-3">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input type="checkbox" checked={consentData} onChange={() => setConsentData((v) => !v)}
                      className="mt-0.5 w-4 h-4 flex-shrink-0 cursor-pointer" style={{ accentColor: '#004445' }} />
                    <span className="text-sm" style={{ color: '#0D1F1D' }}>
                      Я согласен с{' '}
                      <button type="button" onClick={() => setShowPolicy(true)}
                        className="cursor-pointer underline" style={{ color: '#004445' }}>
                        условиями обработки персональных данных
                      </button>{' '}
                      <span style={{ color: '#C62828' }}>*</span>
                    </span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input type="checkbox" checked={consentAccuracy} onChange={() => setConsentAccuracy((v) => !v)}
                      className="mt-0.5 w-4 h-4 flex-shrink-0 cursor-pointer" style={{ accentColor: '#004445' }} />
                    <span className="text-sm" style={{ color: '#0D1F1D' }}>
                      Я подтверждаю достоверность предоставленных данных{' '}
                      <span style={{ color: '#C62828' }}>*</span>
                    </span>
                  </label>
                  {showErrors && !step4Valid() && (
                    <Err msg="Подтвердите оба пункта для отправки заявки" />
                  )}
                </div>
              </div>
            )}

            {/* ── Navigation ── */}
            <div className="flex items-center justify-between mt-8 pt-6" style={{ borderTop: '1px solid #16685B' }}>
              <button
                type="button"
                onClick={() => { setShowErrors(false); setStep((s) => s - 1); }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all border cursor-pointer ${step === 1 ? 'invisible' : ''}`}
                style={{ borderColor: '#16685B', color: '#4A6B67' }}
              >
                <ChevronLeft size={16} /> Назад
              </button>

              <div className="text-xs font-semibold" style={{ color: '#4A6B67' }}>
                Шаг {step} из {STEP_LABELS.length}
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold cursor-pointer transition-all"
                style={{ backgroundColor: '#C9A84C', color: '#0D1F1D' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#A8892E')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#C9A84C')}
              >
                {step === 4 ? 'Отправить заявку' : 'Далее'}
                {step < 4 && <ChevronRight size={16} />}
              </button>
            </div>
          </div>
        )}
      </div>

      {showPolicy && <PolicyModal onClose={() => setShowPolicy(false)} />}
    </div>
  );
}

export default function ApplyPage() {
  return (
    <Suspense>
      <ApplyPageContent />
    </Suspense>
  );
}
