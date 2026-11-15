import { NextRequest } from 'next/server';

// Terms are unchanged from the Claude version (owner, 16 Nov 2026: keep the UZ/RU content as it
// is). Only the hand-off paragraph at the end is new.
const TELEGRAM_BOT_LINK = 'https://t.me/demobelvest_bot?start=landing';

const SYSTEM_PROMPT = `Ты — вежливый ассистент компании Belvest (Узбекистан).
Belvest предоставляет 3 продукта:
1) Автомобили в рассрочку — регистрация на имя клиента (первый взнос 30% до $18,000, 50% свыше; сроки 6/12/24 мес; при взносе 60% авто сразу переоформляется на клиента) или на имя Belvest (сроки 13/24 мес)
2) Телефоны в рассрочку — первый взнос от 20%, сроки 6-12 месяцев
3) Инвестиции (Мудараба) — Базовый от 5000$ ~12%, Стандарт от 10000$ ~15%, Премиум от 50000$ до 20% прогнозируемой доходности
Отвечай кратко, дружелюбно и по делу. Если не знаешь точный ответ или вопрос требует персональной консультации — предложи написать в Telegram @belvest_info или позвонить +998 77 480-99-99. Отвечай на языке пользователя (узбекский или русский).
Когда клиент готов оформить заявку или хочет персональный расчёт, предложи два способа: оставить номер телефона через кнопку «Перезвоним» (внизу слева на странице; перезвоним в течение 1 часа) или написать в Telegram-бот Belvest: ${TELEGRAM_BOT_LINK} — в этом случае пришли ссылку целиком. Не проси присылать номер телефона в этом чате и не обещай одобрение или точные условия, которых нет выше.`;

const MAX_TURNS = 12;
const MAX_CHARS = 2000;
const FALLBACK = 'Произошла ошибка. Напишите нам: @belvest_info или позвоните +998 77 480-99-99';

type Turn = { role: 'user' | 'assistant'; content: string };

// The browser is untrusted: keep only user/assistant text turns (a client-sent "system" turn
// would otherwise be obeyed), bound the size, and mask phone numbers and emails before the text
// leaves for the model provider.
function sanitize(input: unknown): Turn[] {
  if (!Array.isArray(input)) return [];
  const turns: Turn[] = [];
  for (const item of input.slice(-MAX_TURNS)) {
    if (!item || typeof item !== 'object') continue;
    const { role, content } = item as { role?: unknown; content?: unknown };
    if ((role !== 'user' && role !== 'assistant') || typeof content !== 'string') continue;
    const text = content
      .slice(0, MAX_CHARS)
      .replace(/[\w.+-]+@[\w-]+\.[\w.-]+/g, '[EMAIL]')
      .replace(/\+?\d[\d\s().-]{6,}\d/g, '[PHONE]')
      .trim();
    if (text) turns.push({ role, content: text });
  }
  // The conversation must end with the visitor's message.
  while (turns.length && turns[turns.length - 1].role !== 'user') turns.pop();
  return turns;
}

export async function POST(req: NextRequest) {
  const key = process.env.DEEPSEEK_API_KEY;
  if (!key) return Response.json({ reply: FALLBACK }, { status: 503 });

  let turns: Turn[];
  try {
    turns = sanitize((await req.json()).messages);
  } catch {
    return Response.json({ reply: FALLBACK }, { status: 400 });
  }
  if (!turns.length) return Response.json({ reply: FALLBACK }, { status: 400 });

  try {
    const res = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      // Same model and settings as the Belvest Instagram assistant (Abdulloh).
      body: JSON.stringify({
        model: 'deepseek-flash',
        thinking: { type: 'disabled' },
        max_tokens: 400,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...turns],
      }),
      signal: AbortSignal.timeout(20000),
    });
    if (!res.ok) {
      console.error('deepseek error', res.status);
      return Response.json({ reply: FALLBACK }, { status: 502 });
    }
    const data = await res.json();
    const reply = data?.choices?.[0]?.message?.content;
    return Response.json({ reply: typeof reply === 'string' && reply.trim() ? reply.trim() : 'Извините, попробуйте ещё раз.' });
  } catch (err) {
    console.error('deepseek unreachable', err instanceof Error ? err.name : 'error');
    return Response.json({ reply: FALLBACK }, { status: 502 });
  }
}
