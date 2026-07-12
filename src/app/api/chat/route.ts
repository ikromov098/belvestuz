import Anthropic from '@anthropic-ai/sdk';
import { NextRequest } from 'next/server';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const systemPrompt = `Ты — вежливый ассистент компании Belvest (Узбекистан).
Belvest предоставляет 3 продукта:
1) Автомобили в рассрочку — регистрация на имя клиента (первый взнос 30% до $18,000, 50% свыше; сроки 6/12/24 мес; при взносе 60% авто сразу переоформляется на клиента) или на имя Belvest (сроки 13/24 мес)
2) Телефоны в рассрочку — первый взнос от 20%, сроки 6-12 месяцев
3) Инвестиции (Мудараба) — Базовый от 5000$ ~12%, Стандарт от 10000$ ~15%, Премиум от 50000$ до 20% прогнозируемой доходности
Отвечай кратко, дружелюбно и по делу. Если не знаешь точный ответ или вопрос требует персональной консультации — предложи написать в Telegram @belvest_info или позвонить +998 77 480-99-99. Отвечай на языке пользователя (узбекский или русский).`;

    const response = await anthropic.messages.create({
      model:  'claude-haiku-4-5-20251001',
      max_tokens: 400,
      system: systemPrompt,
      messages: messages,
    });

    const textContent = response.content.find(
      (block): block is Anthropic.TextBlock => block.type === 'text',
    );
    return Response.json({ reply: textContent?.text || 'Извините, попробуйте ещё раз.' });
  } catch {
    return Response.json(
      { reply: 'Произошла ошибка. Напишите нам: @belvest_info или позвоните +998 77 480-99-99' },
      { status: 500 }
    );
  }
}
