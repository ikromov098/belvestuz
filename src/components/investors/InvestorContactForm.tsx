'use client';

import { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { IR_EMAIL } from '@/data/investor-config';
import { INSTITUTION_TYPES, TICKET_RANGES } from '@/lib/investor-enquiry';

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

type Field = 'name' | 'institution' | 'institutionType' | 'ticket' | 'email';
type Errors = Partial<Record<Field, string>>;

// Collects only the fields below: no attribution, no cookies, no analytics. The browser posts to
// our own /api/investor-enquiry route, which forwards the message to investor relations.
export default function InvestorContactForm() {
  const [name, setName] = useState('');
  const [institution, setInstitution] = useState('');
  const [institutionType, setInstitutionType] = useState('');
  const [ticket, setTicket] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // honeypot, left empty by people
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);

  function validate(): Errors {
    const next: Errors = {};
    if (name.trim().length < 2) next.name = 'Please enter your name.';
    if (institution.trim().length < 2) next.institution = 'Please enter your institution.';
    if (!institutionType) next.institutionType = 'Please choose an institution type.';
    if (!ticket) next.ticket = 'Please choose an indicative ticket range.';
    if (!isEmail(email.trim())) next.email = 'Please enter a valid work email.';
    return next;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    setFailed(false);
    if (Object.keys(next).length > 0) return;

    setSending(true);
    let ok = false;
    try {
      const res = await fetch('/api/investor-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          institution: institution.trim(),
          institutionType,
          ticket,
          email: email.trim(),
          message: message.trim(),
          website,
        }),
        signal: AbortSignal.timeout(15000),
      });
      const data = res.ok ? await res.json().catch(() => null) : null;
      ok = data?.ok === true;
    } catch {
      ok = false;
    }
    setSending(false);
    if (ok) setSent(true);
    else setFailed(true);
  }

  if (sent) {
    return (
      <div
        className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl p-8 text-center"
        style={{ backgroundColor: '#FFFFFF', border: '1px solid #16685B' }}
        role="status"
      >
        <div
          className="mb-5 flex h-14 w-14 items-center justify-center rounded-full"
          style={{ backgroundColor: 'rgba(0,68,69,0.10)' }}
        >
          <Check size={26} style={{ color: '#004445' }} />
        </div>
        <p className="text-xl font-extrabold" style={{ color: '#0D1F1D' }}>
          Thank you. We reply within two business days.
        </p>
      </div>
    );
  }

  const inputStyle = { border: '1.5px solid #16685B', color: '#0D1F1D', backgroundColor: '#FFFFFF' };
  const inputClass = 'w-full rounded-lg px-3.5 py-3 text-base outline-none sm:text-sm';
  const labelClass = 'mb-1.5 block text-xs font-semibold uppercase tracking-wider';
  const err = (text?: string) =>
    text ? (
      <span className="mt-1 block text-xs" style={{ color: '#C62828' }}>
        {text}
      </span>
    ) : null;

  return (
    <form
      onSubmit={handleSubmit}
      className="min-w-0 rounded-2xl p-5 sm:p-8"
      style={{ backgroundColor: '#FFFFFF', border: '1px solid #16685B' }}
      noValidate
    >
      <div className="grid gap-5">
        <label className="block">
          <span className={labelClass} style={{ color: '#0D1F1D' }}>Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            maxLength={120}
            className={inputClass}
            style={inputStyle}
            aria-invalid={Boolean(errors.name)}
          />
          {err(errors.name)}
        </label>

        <label className="block">
          <span className={labelClass} style={{ color: '#0D1F1D' }}>Institution</span>
          <input
            type="text"
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
            autoComplete="organization"
            maxLength={160}
            className={inputClass}
            style={inputStyle}
            aria-invalid={Boolean(errors.institution)}
          />
          {err(errors.institution)}
        </label>

        <label className="block">
          <span className={labelClass} style={{ color: '#0D1F1D' }}>Institution type</span>
          <select
            value={institutionType}
            onChange={(e) => setInstitutionType(e.target.value)}
            className={inputClass}
            style={inputStyle}
            aria-invalid={Boolean(errors.institutionType)}
          >
            <option value="">Select…</option>
            {INSTITUTION_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {err(errors.institutionType)}
        </label>

        <label className="block">
          <span className={labelClass} style={{ color: '#0D1F1D' }}>Indicative ticket range</span>
          <select
            value={ticket}
            onChange={(e) => setTicket(e.target.value)}
            className={inputClass}
            style={inputStyle}
            aria-invalid={Boolean(errors.ticket)}
          >
            <option value="">Select…</option>
            {TICKET_RANGES.map((range) => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
          {err(errors.ticket)}
        </label>

        <label className="block">
          <span className={labelClass} style={{ color: '#0D1F1D' }}>Work email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            maxLength={200}
            placeholder="you@institution.com"
            className={inputClass}
            style={inputStyle}
            aria-invalid={Boolean(errors.email)}
          />
          {err(errors.email)}
        </label>

        <label className="block">
          <span className={labelClass} style={{ color: '#0D1F1D' }}>Message</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            maxLength={2000}
            className={`${inputClass} resize-y`}
            style={inputStyle}
          />
        </label>

        {/* Honeypot: hidden from people and assistive tech. */}
        <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
          <label>
            Website
            <input type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
          </label>
        </div>
      </div>

      {failed && (
        <p className="mt-4 text-sm leading-relaxed" style={{ color: '#C62828' }} role="alert">
          We could not send your request. Please email{' '}
          <a href={`mailto:${IR_EMAIL}?subject=Investor%20enquiry`} className="font-semibold underline">
            {IR_EMAIL}
          </a>{' '}
          and we will reply directly.
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold transition-opacity disabled:opacity-70"
        style={{ backgroundColor: '#004445', color: '#FFFFFF', cursor: sending ? 'default' : 'pointer' }}
      >
        {sending && <Loader2 size={16} className="animate-spin" />}
        {sending ? 'Sending…' : 'Request the investor pack'}
      </button>

      <p className="mt-4 text-xs leading-relaxed" style={{ color: '#4A6B67' }}>
        We use these details only to reply to your request.
      </p>
    </form>
  );
}
