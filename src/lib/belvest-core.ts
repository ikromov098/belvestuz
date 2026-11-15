// Server-only: sends a website lead to the Belvest core (dashboard "Заявки"/leads).
// The token must never reach the browser, so this file is imported only by route handlers.
// Both variables are optional: when either is missing the call is a no-op, so previews and
// local development keep working with Telegram only.
//   BELVEST_CORE_URL    e.g. https://app.belvest.uz   (the public landing-lead route)
//   BELVEST_LANDING_TOKEN   the core's LANDING_TOKEN

export type LeadInput = {
  submission_id?: string;
  occurred_at?: string;
  phone: string;
  full_name?: string;
  interest?: string;
  message?: string;
  locale?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referrer?: string;
  landing_path?: string;
};

// A retry under the same submission_id must carry the same occurred_at, or the core answers 409
// instead of recognising a replay. The form sends the time it created the submission; accept it
// only when it is plausible, otherwise use the server's clock.
function occurredAt(raw: unknown): string {
  const t = typeof raw === 'string' ? Date.parse(raw) : NaN;
  const now = Date.now();
  return Number.isFinite(t) && Math.abs(now - t) < 24 * 3600 * 1000 ? new Date(t).toISOString() : new Date(now).toISOString();
}

export type CoreResult = 'sent' | 'duplicate' | 'skipped' | 'failed';

// The core's limits count bytes (Go len), and Cyrillic is two bytes per letter.
function clip(value: unknown, maxBytes: number): string {
  const text = typeof value === 'string' ? value.replace(/\0/g, '').trim() : '';
  const encoder = new TextEncoder();
  let used = 0;
  let out = '';
  for (const ch of text) {
    const size = encoder.encode(ch).length;
    if (used + size > maxBytes) break;
    used += size;
    out += ch;
  }
  return out.trim();
}

// "+998 99 999 99 99", "998999999999" or "999999999" -> "+998999999999". Anything else is
// rejected here rather than sent to the core as a guess.
export function toE164(raw: unknown): string | null {
  if (typeof raw !== 'string') return null;
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 9) return `+998${digits}`;
  if (digits.length === 12 && digits.startsWith('998')) return `+${digits}`;
  if (raw.trim().startsWith('+') && /^[1-9]\d{7,14}$/.test(digits)) return `+${digits}`;
  return null;
}

export async function sendLeadToCore(lead: LeadInput): Promise<CoreResult> {
  const base = process.env.BELVEST_CORE_URL?.replace(/\/+$/, '');
  const token = process.env.BELVEST_LANDING_TOKEN;
  if (!base || !token) return 'skipped';

  const phone = toE164(lead.phone);
  if (!phone) return 'skipped';

  const submissionId = clip(lead.submission_id, 200) || crypto.randomUUID();
  const locale = lead.locale === 'uz' || lead.locale === 'ru' ? lead.locale : undefined;
  // Only schema fields: the core rejects unknown fields. contact_consent is deliberately not
  // sent: neither form records consent to be contacted (see docs/landing-plan.md).
  const body: Record<string, unknown> = {
    submission_id: submissionId,
    phone,
    occurred_at: occurredAt(lead.occurred_at),
    full_name: clip(lead.full_name, 200),
    interest: clip(lead.interest, 200),
    message: clip(lead.message, 4000),
    locale,
    utm_source: clip(lead.utm_source, 200),
    utm_medium: clip(lead.utm_medium, 200),
    utm_campaign: clip(lead.utm_campaign, 200),
    utm_content: clip(lead.utm_content, 200),
    utm_term: clip(lead.utm_term, 200),
    referrer: clip(lead.referrer, 2000),
    landing_path: clip(lead.landing_path, 2000),
  };
  for (const key of Object.keys(body)) {
    if (body[key] === '' || body[key] === undefined) delete body[key];
  }

  try {
    const res = await fetch(`${base}/v1/intake/landing-leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(4000),
      cache: 'no-store',
    });
    if (res.status === 201) return 'sent';
    if (res.status === 200) return 'duplicate';
    // Status only: the body and the request contain personal data.
    console.error('belvest core rejected landing lead', res.status);
    return 'failed';
  } catch (err) {
    console.error('belvest core unreachable', err instanceof Error ? err.name : 'error');
    return 'failed';
  }
}
