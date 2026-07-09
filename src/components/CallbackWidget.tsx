'use client';

import { useState, useEffect } from 'react';
import { Phone, X } from 'lucide-react';

type Stage = 'idle' | 'open' | 'success';

const SERVICES = ['Рассрочка', 'Лизинг', 'Трейд-ин', 'Инвестиции'];

export default function CallbackWidget() {
  const [stage, setStage] = useState<Stage>('idle');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');

  const canSubmit = name.trim().length > 1 && phone.replace(/\D/g, '').length >= 9;

  // Submissions go to Formspree (email inbox delivery).
  // Direct Telegram delivery requires a backend Telegram Bot API integration
  // (bot token + chat ID) — to be added later.
  async function handleSubmit() {
    if (!canSubmit) return;
    fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        phone: `+998 ${phone}`,
        service: service || 'не указана',
        _subject: `Заказ звонка: ${name} - +998 ${phone} - ${service || 'не указана'}`,
      }),
    }).catch(console.error);
    setStage('success');
  }

  useEffect(() => {
    if (stage !== 'success') return;
    const id = setTimeout(() => {
      setStage('idle');
      setName('');
      setPhone('');
      setService('');
    }, 3000);
    return () => clearTimeout(id);
  }, [stage]);

  return (
    <div className="fixed bottom-6 left-4 z-40 flex flex-col items-start gap-3">
      {/* Card */}
      {stage !== 'idle' && (
        <div
          className="rounded-2xl p-5 w-72 shadow-2xl"
          style={{ backgroundColor: '#ffffff', border: '1px solid #16685B' }}
        >
          {stage === 'success' ? (
            <div className="flex flex-col items-center justify-center py-4 text-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'rgba(0,68,69,0.10)' }}
              >
                <Phone size={22} style={{ color: '#004445' }} />
              </div>
              <p className="text-sm font-bold" style={{ color: '#0D1F1D' }}>
                Спасибо! Позвоним в течение 1 часа
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-extrabold" style={{ color: '#0D1F1D' }}>
                  Заказать звонок
                </p>
                <button
                  type="button"
                  onClick={() => setStage('idle')}
                  className="cursor-pointer"
                  style={{ color: '#4A6B67' }}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {/* Name */}
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                  style={{ border: '1.5px solid #16685B', color: '#0D1F1D', backgroundColor: '#fff' }}
                />

                {/* Phone */}
                <div className="flex rounded-lg overflow-hidden" style={{ border: '1.5px solid #16685B' }}>
                  <div
                    className="flex items-center px-3 text-sm font-semibold shrink-0"
                    style={{ backgroundColor: '#FFFFFF', color: '#4A6B67', borderRight: '1.5px solid #16685B' }}
                  >
                    +998
                  </div>
                  <input
                    type="tel"
                    placeholder="99 999 99 99"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/[^\d\s]/g, '').slice(0, 12))}
                    className="flex-1 px-3 py-2.5 text-sm outline-none bg-white"
                    style={{ color: '#0D1F1D' }}
                  />
                </div>

                {/* Service */}
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none cursor-pointer"
                  style={{
                    border: '1.5px solid #16685B',
                    color: service ? '#0D1F1D' : '#9CA3AF',
                    backgroundColor: '#fff',
                  }}
                >
                  <option value="">Выберите услугу</option>
                  {SERVICES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>

                {/* Submit */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full py-2.5 rounded-lg text-sm font-bold transition-all duration-150"
                  style={{
                    backgroundColor: canSubmit ? '#C9A84C' : '#16685B',
                    color: canSubmit ? '#0D1F1D' : '#9CA3AF',
                    cursor: canSubmit ? 'pointer' : 'default',
                  }}
                >
                  Перезвоните мне
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setStage(stage === 'open' ? 'idle' : 'open')}
        className="flex items-center gap-2.5 px-4 py-3 rounded-full shadow-lg transition-all duration-150 cursor-pointer"
        style={{ backgroundColor: '#004445' }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#003332')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#004445')}
        aria-label="Заказать обратный звонок"
      >
        <Phone size={18} style={{ color: '#FFF0CC' }} />
        <span className="text-sm font-semibold" style={{ color: '#FFF0CC' }}>Перезвоним</span>
      </button>
    </div>
  );
}
