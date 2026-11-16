'use client';

import { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { postLead } from '@/lib/submit-lead';

const INVESTOR_TYPES = [
  'Family office',
  'Fund or asset manager',
  'Development finance institution',
  'Private investor',
  'Other',
];

const esc = (value: string) =>
  String(value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

type Errors = Partial<Record<'name' | 'email' | 'phone', string>>;

export default function InvestorContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [investorType, setInvestorType] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);

  function validate(): Errors {
    const next: Errors = {};
    if (name.trim().length < 2) next.name = 'Please enter your name.';
    if (!isEmail(email.trim())) next.email = 'Please enter a valid work email.';
    if (phone.replace(/\D/g, '').length < 9) next.phone = 'Please enter a full phone number.';
    return next;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    setFailed(false);
    if (Object.keys(next).length > 0) return;

    setSending(true);
    const summary = [
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      `Phone: +998 ${phone.trim()}`,
      organisation.trim() ? `Organisation: ${organisation.trim()}` : '',
      investorType ? `Investor type: ${investorType}` : '',
      message.trim() ? `Message: ${message.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    const text = `<b>🏦 Investor enquiry (EN)</b>

<b>Name:</b> ${esc(name.trim())}
<b>Email:</b> ${esc(email.trim())}
<b>Phone:</b> +998 ${esc(phone.trim())}
<b>Organisation:</b> ${esc(organisation.trim()) || '—'}
<b>Investor type:</b> ${esc(investorType) || '—'}
<b>Message:</b> ${esc(message.trim()) || '—'}`;

    const ok = await postLead(text, {
      phone,
      full_name: name.trim(),
      interest: investorType ? `Investor relations (EN) — ${investorType}` : 'Investor relations (EN)',
      message: summary,
      locale: 'en',
    }).catch(() => false);

    setSending(false);
    if (ok) {
      setSent(true);
    } else {
      setFailed(true);
    }
  }

  if (sent) {
    return (
      <div
        className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl p-8 text-center"
        style={{ backgroundColor: '#FFFFFF', border: '1px solid #16685B' }}
      >
        <div
          className="mb-5 flex h-14 w-14 items-center justify-center rounded-full"
          style={{ backgroundColor: 'rgba(0,68,69,0.10)' }}
        >
          <Check size={26} style={{ color: '#004445' }} />
        </div>
        <h3 className="text-xl font-extrabold" style={{ color: '#0D1F1D' }}>
          Request received
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed" style={{ color: '#4A6B67' }}>
          Thank you. The investor relations team will reply within one business day and send the
          investor pack. For urgent matters, email{' '}
          <a href="mailto:info@belvest.uz" className="font-semibold" style={{ color: '#004445' }}>
            info@belvest.uz
          </a>
          .
        </p>
      </div>
    );
  }

  const inputStyle = { border: '1.5px solid #16685B', color: '#0D1F1D', backgroundColor: '#FFFFFF' };
  const labelStyle = { color: '#0D1F1D' };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl p-6 sm:p-8"
      style={{ backgroundColor: '#FFFFFF', border: '1px solid #16685B' }}
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={labelStyle}>
            Full name *
          </span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            placeholder="Your name"
            className="w-full rounded-lg px-3.5 py-3 text-sm outline-none"
            style={inputStyle}
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && <span className="mt-1 block text-xs" style={{ color: '#C62828' }}>{errors.name}</span>}
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={labelStyle}>
            Work email *
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            placeholder="you@fund.com"
            className="w-full rounded-lg px-3.5 py-3 text-sm outline-none"
            style={inputStyle}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && <span className="mt-1 block text-xs" style={{ color: '#C62828' }}>{errors.email}</span>}
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={labelStyle}>
            Phone *
          </span>
          <div className="flex overflow-hidden rounded-lg" style={{ border: '1.5px solid #16685B' }}>
            <span
              className="flex shrink-0 items-center px-3 text-sm font-semibold"
              style={{ backgroundColor: '#F6FBF9', color: '#4A6B67', borderRight: '1.5px solid #16685B' }}
            >
              +998
            </span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/[^\d\s]/g, '').slice(0, 12))}
              autoComplete="tel-national"
              placeholder="93 500 66 00"
              className="w-full px-3.5 py-3 text-sm outline-none"
              style={{ color: '#0D1F1D', backgroundColor: '#FFFFFF' }}
              aria-invalid={Boolean(errors.phone)}
            />
          </div>
          {errors.phone && <span className="mt-1 block text-xs" style={{ color: '#C62828' }}>{errors.phone}</span>}
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={labelStyle}>
            Organisation
          </span>
          <input
            type="text"
            value={organisation}
            onChange={(e) => setOrganisation(e.target.value)}
            autoComplete="organization"
            placeholder="Fund, family office or company"
            className="w-full rounded-lg px-3.5 py-3 text-sm outline-none"
            style={inputStyle}
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={labelStyle}>
            Investor type
          </span>
          <select
            value={investorType}
            onChange={(e) => setInvestorType(e.target.value)}
            className="w-full cursor-pointer rounded-lg px-3.5 py-3 text-sm outline-none"
            style={{ ...inputStyle, color: investorType ? '#0D1F1D' : '#4A6B67' }}
          >
            <option value="">Select one</option>
            {INVESTOR_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={labelStyle}>
            What would you like to discuss?
          </span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value.slice(0, 1200))}
            rows={4}
            placeholder="Target allocation, timeline, due-diligence questions..."
            className="w-full resize-none rounded-lg px-3.5 py-3 text-sm outline-none"
            style={inputStyle}
          />
        </label>
      </div>

      {failed && (
        <p className="mt-4 text-sm leading-relaxed" style={{ color: '#C62828' }}>
          We could not send your request. Please email{' '}
          <a href="mailto:info@belvest.uz?subject=Investor%20enquiry" className="font-semibold underline">
            info@belvest.uz
          </a>{' '}
          and we will reply directly.
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold transition-opacity disabled:opacity-70 sm:w-auto sm:px-8"
        style={{ backgroundColor: '#004445', color: '#FFFFFF', cursor: sending ? 'default' : 'pointer' }}
      >
        {sending && <Loader2 size={16} className="animate-spin" />}
        {sending ? 'Sending…' : 'Request the investor pack'}
      </button>

      <p className="mt-4 text-xs leading-relaxed" style={{ color: '#4A6B67' }}>
        By submitting, you agree that Belvest may contact you about this enquiry. We use these details
        only to respond and do not sell them. Portfolio and raise materials are shared under NDA.
      </p>
    </form>
  );
}
