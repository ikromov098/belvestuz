'use client';

import { useState, useRef } from 'react';
import {
  Home, FileText, CreditCard, ClipboardList, FolderOpen,
  MessageCircle, Settings, Bell, TrendingUp, Calendar,
  ChevronRight, Smartphone, ArrowRight, ArrowLeft, LogOut,
} from 'lucide-react';
import BelvestIcon from '@/components/BelvestIcon';

// ── Utilities ─────────────────────────────────────────────────────────────────

type Screen = 'phone' | 'code' | 'dashboard';
type NavKey = 'home' | 'contracts' | 'payments' | 'applications' | 'documents' | 'support' | 'settings';

function fmt(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// ── Mock data ─────────────────────────────────────────────────────────────────

const CONTRACTS = [
  {
    id: 'BV-2024-0041',
    product: 'iPhone 15 Pro',
    type: 'Рассрочка',
    months: 12,
    paid: 8,
    nextDate: '15 мая',
    nextAmount: 350_000,
    progress: Math.round((8 / 12) * 100),
  },
  {
    id: 'BV-2024-0089',
    product: 'MacBook Air M2',
    type: 'Лизинг',
    months: 24,
    paid: 3,
    nextDate: '20 мая',
    nextAmount: 583_333,
    progress: Math.round((3 / 24) * 100),
  },
];

const APP_STEPS = [
  { label: 'Принята', done: true, current: false },
  { label: 'Документы проверены', done: true, current: false },
  { label: 'На рассмотрении', done: false, current: true },
  { label: 'Одобрена', done: false, current: false },
  { label: 'Договор', done: false, current: false },
];

const UPCOMING = [
  { date: '15 мая', label: 'iPhone 15 Pro', amount: 350_000 },
  { date: '20 мая', label: 'MacBook Air M2', amount: 583_333 },
  { date: '15 июня', label: 'iPhone 15 Pro', amount: 350_000 },
];

// ── Nav config ────────────────────────────────────────────────────────────────

type NavItem = { key: NavKey; label: string; Icon: React.ComponentType<{ size?: number; color?: string }> };

const NAV_ITEMS: NavItem[] = [
  { key: 'home',         label: 'Главная',       Icon: Home          },
  { key: 'contracts',    label: 'Мои договоры',  Icon: FileText      },
  { key: 'payments',     label: 'Платежи',        Icon: CreditCard    },
  { key: 'applications', label: 'Мои заявки',    Icon: ClipboardList },
  { key: 'documents',    label: 'Документы',      Icon: FolderOpen    },
  { key: 'support',      label: 'Поддержка',      Icon: MessageCircle },
  { key: 'settings',     label: 'Настройки',      Icon: Settings      },
];

const MOBILE_NAV = NAV_ITEMS.filter(n =>
  ['home','contracts','payments','applications','settings'].includes(n.key)
);

const SECTION_TITLES: Record<NavKey, string> = {
  home: 'Главная', contracts: 'Мои договоры', payments: 'Платежи',
  applications: 'Мои заявки', documents: 'Документы',
  support: 'Поддержка', settings: 'Настройки',
};

// ── Shared logo pieces ────────────────────────────────────────────────────────

function LogoMark({ color }: { color: string }) {
  return (
    <span style={{ color, display: 'inline-flex' }}>
      <BelvestIcon className="h-4 w-auto" />
    </span>
  );
}

function Checkmark() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// ── Login: Phone screen ───────────────────────────────────────────────────────

function PhoneScreen({ onNext }: { onNext: (phone: string) => void }) {
  const [phone, setPhone] = useState('');
  const ready = phone.replace(/\D/g, '').length >= 9;

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12"
      style={{ backgroundColor: '#FFFFFF' }}>
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8 gap-2.5 select-none items-center">
          <span style={{ fontWeight: 800, letterSpacing: '0.15em', fontSize: 24, color: '#004445' }}>
            BELVEST
          </span>
          <LogoMark color="#004445" />
        </div>

        <div className="bg-white rounded-2xl p-8"
          style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.09)', border: '1px solid #16685B' }}>
          <div className="flex items-center justify-center w-12 h-12 rounded-xl mb-5 mx-auto"
            style={{ backgroundColor: 'rgba(0,68,69,0.08)' }}>
            <Smartphone size={22} color="#004445" />
          </div>

          <h1 className="text-xl font-extrabold text-center mb-1" style={{ color: '#0D1F1D' }}>
            Вход в личный кабинет
          </h1>
          <p className="text-sm text-center mb-7" style={{ color: '#4A6B67' }}>
            Введите номер телефона для получения SMS-кода
          </p>

          <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
            style={{ color: '#4A6B67' }}>
            Номер телефона
          </label>
          <div className="flex rounded-xl overflow-hidden mb-5"
            style={{ border: '1.5px solid #16685B' }}>
            <div className="flex items-center px-3.5 shrink-0"
              style={{ backgroundColor: '#FFFFFF', borderRight: '1.5px solid #16685B' }}>
              <span className="text-sm font-bold" style={{ color: '#004445' }}>+998</span>
            </div>
            <input
              type="tel"
              inputMode="numeric"
              maxLength={12}
              placeholder="99 999 99 99"
              value={phone}
              onChange={e => setPhone(e.target.value.replace(/[^\d\s]/g, '').slice(0, 12))}
              className="flex-1 px-3 py-3.5 text-sm outline-none bg-white"
              style={{ color: '#0D1F1D' }}
            />
          </div>

          <button
            onClick={() => ready && onNext(phone.trim())}
            className="w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
            style={{
              backgroundColor: '#004445', color: '#FFF0CC',
              opacity: ready ? 1 : 0.45,
              cursor: ready ? 'pointer' : 'default',
            }}
          >
            Получить SMS-код <ArrowRight size={16} />
          </button>
        </div>

        <p className="text-center text-xs mt-4" style={{ color: '#4A6B67' }}>
          Нажимая «Получить SMS-код», вы соглашаетесь с{' '}
          <span style={{ color: '#004445', textDecoration: 'underline', cursor: 'pointer' }}>
            условиями использования
          </span>
        </p>
      </div>
    </div>
  );
}

// ── Login: Code screen ────────────────────────────────────────────────────────

function CodeScreen({ phone, onBack, onSuccess }: {
  phone: string;
  onBack: () => void;
  onSuccess: () => void;
}) {
  const [digits, setDigits] = useState<string[]>(Array(6).fill(''));
  const containerRef = useRef<HTMLDivElement>(null);
  const filled = digits.filter(Boolean).length;

  function getInputAt(i: number): HTMLInputElement | null {
    return containerRef.current?.querySelectorAll('input')[i] as HTMLInputElement ?? null;
  }

  function handleChange(i: number, val: string) {
    const ch = val.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[i] = ch;
    setDigits(next);
    if (ch && i < 5) getInputAt(i + 1)?.focus();
  }

  function handleKeyDown(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      getInputAt(i - 1)?.focus();
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12"
      style={{ backgroundColor: '#FFFFFF' }}>
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8 gap-2.5 select-none items-center">
          <span style={{ fontWeight: 800, letterSpacing: '0.15em', fontSize: 24, color: '#004445' }}>
            BELVEST
          </span>
          <LogoMark color="#004445" />
        </div>

        <div className="bg-white rounded-2xl p-8"
          style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.09)', border: '1px solid #16685B' }}>
          <h1 className="text-xl font-extrabold text-center mb-1" style={{ color: '#0D1F1D' }}>
            Введите код из SMS
          </h1>
          <p className="text-sm text-center mb-7" style={{ color: '#4A6B67' }}>
            Код отправлен на{' '}
            <strong style={{ color: '#004445' }}>+998 {phone}</strong>
          </p>

          <div ref={containerRef} className="flex gap-2.5 justify-center mb-2">
            {digits.map((d, i) => (
              <input
                key={i}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={e => handleChange(i, e.target.value)}
                onKeyDown={e => handleKeyDown(i, e)}
                className="text-center text-xl font-bold rounded-xl outline-none transition-all"
                style={{
                  width: 46, height: 54,
                  border: d ? '2px solid #C9A84C' : '1.5px solid #16685B',
                  backgroundColor: d ? 'rgba(201,168,76,0.06)' : '#fff',
                  color: '#0D1F1D',
                }}
              />
            ))}
          </div>

          <p className="text-center text-xs mb-6 mt-3" style={{ color: '#4A6B67' }}>
            Не получили код?{' '}
            <span style={{ color: '#004445', cursor: 'pointer', fontWeight: 600 }}>
              Отправить повторно
            </span>
          </p>

          <button
            onClick={() => filled >= 4 && onSuccess()}
            className="w-full py-3.5 rounded-xl text-sm font-bold"
            style={{
              backgroundColor: '#004445', color: '#FFF0CC',
              opacity: filled >= 4 ? 1 : 0.45,
              cursor: filled >= 4 ? 'pointer' : 'default',
            }}
          >
            Войти
          </button>

          <button
            onClick={onBack}
            className="mt-3 w-full py-2 rounded-xl text-sm flex items-center justify-center gap-1.5"
            style={{ color: '#4A6B67' }}
          >
            <ArrowLeft size={14} /> Изменить номер
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Sidebar (desktop) ─────────────────────────────────────────────────────────

function Sidebar({ active, onNav }: { active: NavKey; onNav: (k: NavKey) => void }) {
  return (
    <aside className="hidden md:flex flex-col shrink-0 overflow-y-auto"
      style={{
        width: 240, backgroundColor: '#003332',
        position: 'sticky', top: 0, height: '100vh',
      }}>
      <div className="px-6 pt-7 pb-6 flex items-center gap-2.5 select-none">
        <span style={{ fontWeight: 800, letterSpacing: '0.15em', fontSize: 17, color: '#FFF0CC' }}>
          BELVEST
        </span>
        <LogoMark color="#FFF0CC" />
      </div>

      <nav className="flex-1 px-3 pb-4">
        {NAV_ITEMS.map(({ key, label, Icon }) => {
          const on = key === active;
          return (
            <button
              key={key}
              onClick={() => onNav(key)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 text-sm text-left transition-colors"
              style={{
                borderLeft: `3px solid ${on ? '#C9A84C' : 'transparent'}`,
                color: on ? '#FFF0CC' : 'rgba(255,240,204,0.50)',
                backgroundColor: on ? 'rgba(255,240,204,0.08)' : 'transparent',
                fontWeight: on ? 600 : 400,
              }}
            >
              <Icon size={17} color={on ? '#C9A84C' : 'rgba(255,240,204,0.40)'} />
              {label}
            </button>
          );
        })}
      </nav>

      <div className="px-5 py-4" style={{ borderTop: '1px solid rgba(255,240,204,0.12)' }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
            style={{ backgroundColor: '#C9A84C', color: '#0D1F1D' }}>
            АК
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate" style={{ color: '#FFF0CC' }}>
              Алишер Каримов
            </p>
            <p className="text-xs truncate" style={{ color: 'rgba(255,240,204,0.45)' }}>
              +998 99 123-45-67
            </p>
          </div>
          <LogOut size={15} color="rgba(255,240,204,0.35)" style={{ cursor: 'pointer', flexShrink: 0 }} />
        </div>
      </div>
    </aside>
  );
}

// ── Mobile top bar ────────────────────────────────────────────────────────────

function MobileTopBar() {
  return (
    <div className="md:hidden flex items-center justify-between px-4 py-3 shrink-0"
      style={{ backgroundColor: '#003332' }}>
      <div className="flex items-center gap-2.5 select-none">
        <span style={{ fontWeight: 800, letterSpacing: '0.15em', fontSize: 16, color: '#FFF0CC' }}>
          BELVEST
        </span>
        <LogoMark color="#FFF0CC" />
      </div>
      <div className="flex items-center gap-3">
        <Bell size={18} color="rgba(255,240,204,0.65)" />
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
          style={{ backgroundColor: '#C9A84C', color: '#0D1F1D' }}>
          АК
        </div>
      </div>
    </div>
  );
}

// ── Mobile bottom tab bar ─────────────────────────────────────────────────────

function MobileTabBar({ active, onNav }: { active: NavKey; onNav: (k: NavKey) => void }) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex"
      style={{ backgroundColor: '#003332', borderTop: '1px solid rgba(255,240,204,0.12)' }}>
      {MOBILE_NAV.map(({ key, label, Icon }) => {
        const on = key === active;
        return (
          <button
            key={key}
            onClick={() => onNav(key)}
            className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5"
          >
            <Icon size={20} color={on ? '#C9A84C' : 'rgba(255,240,204,0.40)'} />
            <span className="text-[10px] font-medium"
              style={{ color: on ? '#C9A84C' : 'rgba(255,240,204,0.40)' }}>
              {label.split(' ')[0]}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

// ── Home dashboard content ────────────────────────────────────────────────────

function HomeDashboard() {
  const todayRaw = new Date().toLocaleDateString('ru-RU', {
    weekday: 'long', day: 'numeric', month: 'long',
  });
  const today = todayRaw.charAt(0).toUpperCase() + todayRaw.slice(1);

  return (
    <div className="p-5 md:p-8 pb-28 md:pb-10">
      {/* Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-7">
        <div>
          <h1 className="text-2xl font-extrabold" style={{ color: '#004445' }}>
            Добро пожаловать, Алишер
          </h1>
          <p className="text-sm mt-0.5" style={{ color: '#4A6B67' }}>Личный кабинет клиента</p>
        </div>
        <p className="text-sm shrink-0" style={{ color: '#4A6B67' }}>{today}</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-7">
        {[
          { label: 'Активных договоров', value: '2',                         sub: '2 договора',      Icon: FileText    },
          { label: 'Следующий платёж',   value: '15 мая',                    sub: 'через 13 дней',   Icon: Calendar    },
          { label: 'Сумма платежа',      value: `${fmt(350_000)} сум`,       sub: 'iPhone 15 Pro',   Icon: CreditCard  },
          { label: 'Выплачено всего',    value: `${fmt(2_100_000)} сум`,     sub: 'за всё время',    Icon: TrendingUp  },
        ].map(({ label, value, sub, Icon }) => (
          <div key={label} className="bg-white rounded-xl p-4"
            style={{ borderLeft: '4px solid #004445', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
            <div className="flex items-start justify-between gap-2 mb-2">
              <p className="text-xs font-medium leading-tight" style={{ color: '#4A6B67' }}>{label}</p>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: 'rgba(0,68,69,0.08)' }}>
                <Icon size={15} color="#004445" />
              </div>
            </div>
            <p className="text-base font-extrabold leading-snug" style={{ color: '#0D1F1D' }}>{value}</p>
            <p className="text-xs mt-0.5" style={{ color: '#4A6B67' }}>{sub}</p>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-7">
        {/* Contracts — 2/3 */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h2 className="text-base font-extrabold" style={{ color: '#0D1F1D' }}>Активные договоры</h2>

          {CONTRACTS.map(c => (
            <div key={c.id} className="bg-white rounded-xl p-5"
              style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid #E5E0D5' }}>
              {/* Title row */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold text-base" style={{ color: '#0D1F1D' }}>{c.product}</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold"
                      style={{ backgroundColor: 'rgba(46,125,50,0.10)', color: '#2E7D32' }}>
                      Активен
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold"
                      style={{ backgroundColor: 'rgba(0,68,69,0.08)', color: '#004445' }}>
                      {c.type}
                    </span>
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: '#4A6B67' }}>
                    {c.months} мес. · {c.paid} из {c.months} платежей · №{c.id}
                  </p>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1.5">
                  <span style={{ color: '#4A6B67' }}>Прогресс погашения</span>
                  <span style={{ color: '#004445', fontWeight: 700 }}>{c.progress}%</span>
                </div>
                <div className="rounded-full overflow-hidden" style={{ height: 7, backgroundColor: '#E9E4DA' }}>
                  <div className="h-full rounded-full"
                    style={{ width: `${c.progress}%`, backgroundColor: '#004445' }} />
                </div>
              </div>

              {/* Next payment */}
              <div className="flex items-center justify-between px-4 py-3 rounded-xl mb-4"
                style={{ backgroundColor: '#FFFFFF' }}>
                <div>
                  <p className="text-xs" style={{ color: '#4A6B67' }}>Следующий платёж</p>
                  <p className="text-sm font-bold" style={{ color: '#0D1F1D' }}>{c.nextDate}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs" style={{ color: '#4A6B67' }}>Сумма</p>
                  <p className="text-sm font-extrabold" style={{ color: '#004445' }}>
                    {fmt(c.nextAmount)} сум
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2.5">
                <a href="tel:+998774809999"
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-center transition-colors"
                  style={{ border: '1.5px solid #004445', color: '#004445', backgroundColor: 'transparent' }}>
                  Связаться с менеджером
                </a>
                <button className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                  style={{ border: '1.5px solid #004445', color: '#004445', backgroundColor: 'transparent' }}>
                  Подробнее
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming payments — 1/3 */}
        <div className="flex flex-col gap-4">
          <h2 className="text-base font-extrabold" style={{ color: '#0D1F1D' }}>Ближайшие платежи</h2>

          <div className="bg-white rounded-xl p-4"
            style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid #E5E0D5' }}>
            {UPCOMING.map((p, i) => (
              <div key={i}
                className="flex items-center gap-3 py-3.5"
                style={{ borderBottom: i < UPCOMING.length - 1 ? '1px solid #FFFFFF' : 'none' }}>
                <div className="flex items-center justify-center w-10 h-10 rounded-full shrink-0"
                  style={{
                    backgroundColor: i === 0 ? '#004445' : 'rgba(0,68,69,0.08)',
                  }}>
                  <span className="text-xs font-extrabold"
                    style={{ color: i === 0 ? '#FFF0CC' : '#004445' }}>
                    {p.date.split(' ')[0]}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate" style={{ color: '#0D1F1D' }}>{p.label}</p>
                  <p className="text-xs" style={{ color: '#4A6B67' }}>{p.date}</p>
                </div>
                <p className="text-xs font-extrabold shrink-0" style={{ color: '#004445' }}>
                  {fmt(p.amount)}<br />
                  <span style={{ color: '#4A6B67', fontWeight: 400 }}>сум</span>
                </p>
              </div>
            ))}

            <div className="mt-2 pt-3" style={{ borderTop: '1px solid #FFFFFF' }}>
              <div className="flex justify-between items-center text-xs">
                <span style={{ color: '#4A6B67' }}>Итого (3 платежа)</span>
                <span className="font-extrabold" style={{ color: '#0D1F1D' }}>
                  {fmt(350_000 + 583_333 + 350_000)} сум
                </span>
              </div>
            </div>
          </div>

          {/* Reminder */}
          <div className="rounded-xl p-4"
            style={{ backgroundColor: 'rgba(0,68,69,0.06)', border: '1px solid rgba(0,68,69,0.15)' }}>
            <div className="flex gap-2.5">
              <Bell size={15} color="#004445" style={{ marginTop: 1, flexShrink: 0 }} />
              <div>
                <p className="text-xs font-semibold mb-1" style={{ color: '#004445' }}>Напоминание</p>
                <p className="text-xs leading-relaxed" style={{ color: '#4A6B67' }}>
                  До следующего платежа осталось 13 дней. Убедитесь, что на счёте достаточно средств.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application tracker */}
      <h2 className="text-base font-extrabold mb-4" style={{ color: '#0D1F1D' }}>Мои заявки</h2>
      <div className="bg-white rounded-xl p-5"
        style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid #E5E0D5' }}>
        <div className="flex items-start justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-0.5">
              <span className="font-extrabold" style={{ color: '#0D1F1D' }}>Samsung TV 55&quot;</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold"
                style={{ backgroundColor: 'rgba(230,168,23,0.12)', color: '#B07A00' }}>
                На рассмотрении
              </span>
            </div>
            <p className="text-xs" style={{ color: '#4A6B67' }}>
              Подана 28 апреля · №BV-APP-2025-0012
            </p>
          </div>
          <button className="text-xs font-semibold shrink-0 flex items-center gap-0.5"
            style={{ color: '#004445' }}>
            Подробнее <ChevronRight size={12} />
          </button>
        </div>

        {/* Step tracker */}
        <div className="relative">
          {/* Connector lines */}
          <div className="absolute top-4 inset-x-0 flex px-4" style={{ zIndex: 0 }}>
            {APP_STEPS.slice(0, -1).map((step, i) => {
              const nextStep = APP_STEPS[i + 1];
              const active = step.done && (nextStep.done || nextStep.current);
              return (
                <div key={i} className="flex-1 mx-2"
                  style={{
                    height: 2, marginTop: 6,
                    backgroundColor: active ? '#004445' : '#E5E7EB',
                    transition: 'background-color 0.3s',
                  }}
                />
              );
            })}
          </div>

          <div className="relative flex justify-between" style={{ zIndex: 1 }}>
            {APP_STEPS.map((step, i) => (
              <div key={i} className="flex flex-col items-center gap-2" style={{ flex: 1, minWidth: 0 }}>
                <div className="flex items-center justify-center rounded-full"
                  style={{
                    width: 32, height: 32,
                    backgroundColor: step.done ? '#004445' : '#fff',
                    border: step.done
                      ? 'none'
                      : step.current
                      ? '2.5px solid #C9A84C'
                      : '2px solid #16685B',
                  }}>
                  {step.done ? (
                    <Checkmark />
                  ) : step.current ? (
                    <div className="rounded-full" style={{ width: 10, height: 10, backgroundColor: '#C9A84C' }} />
                  ) : (
                    <div className="rounded-full" style={{ width: 8, height: 8, backgroundColor: '#16685B' }} />
                  )}
                </div>

                <p className="text-center leading-tight"
                  style={{
                    fontSize: 10,
                    maxWidth: 70,
                    color: step.done ? '#004445' : step.current ? '#B07A00' : '#9CA3AF',
                    fontWeight: step.done || step.current ? 600 : 400,
                  }}>
                  {step.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Placeholder for other sections ────────────────────────────────────────────

function PlaceholderSection({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center h-full p-8 pb-28 md:pb-8" style={{ minHeight: 400 }}>
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: 'rgba(0,68,69,0.08)' }}>
          <FileText size={28} color="#004445" />
        </div>
        <h2 className="text-xl font-extrabold mb-2" style={{ color: '#0D1F1D' }}>{title}</h2>
        <p className="text-sm" style={{ color: '#4A6B67' }}>Раздел в разработке</p>
      </div>
    </div>
  );
}

// ── Main page export ──────────────────────────────────────────────────────────

export default function PortalPage() {
  const [screen, setScreen] = useState<Screen>('phone');
  const [phone, setPhone] = useState('');
  const [activeNav, setActiveNav] = useState<NavKey>('home');

  if (screen === 'phone') {
    return <PhoneScreen onNext={p => { setPhone(p); setScreen('code'); }} />;
  }

  if (screen === 'code') {
    return (
      <CodeScreen
        phone={phone}
        onBack={() => setScreen('phone')}
        onSuccess={() => setScreen('dashboard')}
      />
    );
  }

  return (
    <div className="flex" style={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      <Sidebar active={activeNav} onNav={setActiveNav} />

      <div className="flex-1 flex flex-col min-w-0">
        <MobileTopBar />

        {/* Desktop header bar */}
        <div className="hidden md:flex items-center justify-between px-8 py-3.5 shrink-0 bg-white"
          style={{ borderBottom: '1px solid #E5E0D5' }}>
          <div className="flex items-center gap-2 text-sm" style={{ color: '#4A6B67' }}>
            <span>Портал</span>
            <ChevronRight size={14} />
            <span style={{ color: '#0D1F1D', fontWeight: 600 }}>{SECTION_TITLES[activeNav]}</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg"
              style={{ backgroundColor: 'rgba(0,68,69,0.06)' }}>
              <Bell size={17} color="#004445" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                style={{ backgroundColor: '#C9A84C' }} />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ backgroundColor: '#C9A84C', color: '#0D1F1D' }}>
                АК
              </div>
              <span className="text-sm font-semibold" style={{ color: '#0D1F1D' }}>Алишер Каримов</span>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto" style={{ backgroundColor: '#FFFFFF' }}>
          {activeNav === 'home'
            ? <HomeDashboard />
            : <PlaceholderSection title={SECTION_TITLES[activeNav]} />
          }
        </main>

        <MobileTabBar active={activeNav} onNav={setActiveNav} />
      </div>
    </div>
  );
}
