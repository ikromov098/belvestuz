import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return Response.json({ ok: false, error: 'Server not configured' }, { status: 500 });
    }

    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML',
      }),
    });

    const data = await tgRes.json();
    if (!data.ok) {
      return Response.json({ ok: false, error: 'Telegram error' }, { status: 500 });
    }
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: 'Request failed' }, { status: 500 });
  }
}
