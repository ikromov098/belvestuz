import { NextRequest } from 'next/server';
import { sendLeadToCore, type LeadInput } from '@/lib/belvest-core';

// Telegram group message (as before) plus, when the form sends a `lead`, the same submission
// to the Belvest core. The two deliveries are independent: one failing or being unconfigured
// never blocks the other, and the customer's confirmation never depends on either.
async function sendTelegram(text: unknown): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId || typeof text !== 'string' || !text) return false;
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
  let payload: { text?: unknown; lead?: LeadInput };
  try {
    payload = await req.json();
  } catch {
    return Response.json({ ok: false, error: 'Request failed' }, { status: 400 });
  }

  const lead = payload.lead && typeof payload.lead === 'object' ? payload.lead : null;
  // Awaited, not fire-and-forget: the serverless function may be frozen once the response is sent.
  const [telegram, core] = await Promise.allSettled([
    sendTelegram(payload.text),
    lead ? sendLeadToCore(lead) : Promise.resolve('skipped' as const),
  ]);

  const telegramOk = telegram.status === 'fulfilled' && telegram.value;
  const coreResult = core.status === 'fulfilled' ? core.value : 'failed';
  const coreOk = coreResult === 'sent' || coreResult === 'duplicate';

  if (!telegramOk && !coreOk) {
    return Response.json({ ok: false, error: 'Delivery failed' }, { status: 500 });
  }
  return Response.json({ ok: true, telegram: telegramOk, core: coreResult });
}
