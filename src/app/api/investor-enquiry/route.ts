import { NextRequest } from 'next/server';
import { IR_EMAIL } from '@/data/investor-config';
import { parseEnquiry, type InvestorEnquiry } from '@/lib/investor-enquiry';

// Investor-page enquiries. Sends the enquiry to investor relations by email (Resend's HTTP API,
// server side only; needs RESEND_API_KEY and INVESTOR_MAIL_FROM, a sender on a verified domain)
// and, independently, to the existing Telegram group so a missing mail key cannot lose a lead.
// The enquiry is not stored, logged or sent anywhere else. The request succeeds if either
// delivery works.

const esc = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

async function sendEmail(e: InvestorEnquiry): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.INVESTOR_MAIL_FROM;
  if (!key || !from) return false;
  const to = process.env.IR_EMAIL || IR_EMAIL;
  const rows: [string, string][] = [
    ['Name', e.name],
    ['Institution', e.institution],
    ['Institution type', e.institutionType],
    ['Indicative ticket', e.ticket],
    ['Work email', e.email],
    ['Message', e.message || '(none)'],
  ];
  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n');
  const html = `<table cellpadding="6">${rows
    .map(([k, v]) => `<tr><td><b>${k}</b></td><td style="white-space:pre-wrap">${esc(v)}</td></tr>`)
    .join('')}</table>`;
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: e.email,
        subject: `Investor enquiry: ${e.institution}`,
        text,
        html,
      }),
      signal: AbortSignal.timeout(8000),
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function sendTelegram(e: InvestorEnquiry): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;
  const text = `<b>🏦 Investor enquiry (EN)</b>

<b>Name:</b> ${esc(e.name)}
<b>Institution:</b> ${esc(e.institution)}
<b>Type:</b> ${esc(e.institutionType)}
<b>Ticket:</b> ${esc(e.ticket)}
<b>Email:</b> ${esc(e.email)}
<b>Message:</b> ${esc(e.message || '(none)')}`;
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
      signal: AbortSignal.timeout(8000),
    });
    const data = await res.json();
    return data.ok === true;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return Response.json({ ok: false, error: 'Request failed' }, { status: 400 });
  }

  // Honeypot filled in: pretend it worked and send nothing.
  if (payload && typeof payload === 'object' && (payload as { website?: unknown }).website) {
    return Response.json({ ok: true });
  }

  const enquiry = parseEnquiry(payload);
  if (!enquiry) return Response.json({ ok: false, error: 'Invalid enquiry' }, { status: 400 });

  // Awaited, not fire-and-forget: the serverless function may be frozen once the response is sent.
  const [mail, telegram] = await Promise.allSettled([sendEmail(enquiry), sendTelegram(enquiry)]);
  const delivered =
    (mail.status === 'fulfilled' && mail.value) || (telegram.status === 'fulfilled' && telegram.value);

  if (!delivered) return Response.json({ ok: false, error: 'Delivery failed' }, { status: 500 });
  return Response.json({ ok: true });
}
