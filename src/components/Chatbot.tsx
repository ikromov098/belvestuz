'use client';

import { useState, useRef, useEffect } from 'react';
import BelvestIcon from '@/components/BelvestIcon';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  ts: string;
}

const QUICK_REPLIES = [
  'Как оформить рассрочку?',
  'Условия лизинга',
  'Что такое трейд-ин?',
  'Сроки и ставки',
  'Как подать заявку?',
];

function now() {
  return new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}

function TypingDots() {
  return (
    <div className="flex items-end gap-1.5 px-4 py-3 rounded-2xl rounded-bl-sm"
      style={{ backgroundColor: '#004445', width: 56 }}>
      {[0, 1, 2].map((i) => (
        <span key={i} style={{
          width: 7, height: 7, borderRadius: '50%',
          backgroundColor: 'rgba(255,240,204,0.7)',
          display: 'inline-block',
          animation: `belvest-bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
        }} />
      ))}
    </div>
  );
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Здравствуйте! Я ассистент Belvest. Помогу с рассрочкой, лизингом и трейд-ин. Чем могу помочь?',
      ts: now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [showQuick, setShowQuick] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;

    setShowQuick(false);
    setInput('');
    const userMsg: Message = { role: 'user', content: trimmed, ts: now() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply, ts: now() }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Ошибка соединения. Напишите: @belvest_info', ts: now() },
      ]);
    } finally {
      setTyping(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  return (
    <>
      <style>{`
        @keyframes belvest-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,68,69,0.55); }
          50% { box-shadow: 0 0 0 10px rgba(0,68,69,0); }
        }
        @keyframes belvest-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
          40% { transform: translateY(-5px); opacity: 1; }
        }
        .chat-panel { animation: chat-in 0.22s cubic-bezier(.22,1,.36,1); }
        @keyframes chat-in {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .chat-messages::-webkit-scrollbar { width: 4px; }
        .chat-messages::-webkit-scrollbar-thumb { background: rgba(0,68,69,0.2); border-radius: 9999px; }
      `}</style>

      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Открыть чат"
          className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-1"
        >
          <div
            className="flex items-center justify-center rounded-full shadow-lg"
            style={{
              width: 56, height: 56,
              backgroundColor: '#004445',
              animation: 'belvest-pulse 2.4s ease-in-out infinite',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="#FFF0CC" />
            </svg>
          </div>
          <span className="text-xs font-semibold" style={{ color: '#004445' }}>Чат</span>
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div
          className="chat-panel fixed bottom-6 right-6 z-50 flex flex-col rounded-2xl overflow-hidden"
          style={{ width: 380, height: 520, boxShadow: '0 20px 60px rgba(0,0,0,0.22)', backgroundColor: '#FFFFFF' }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 shrink-0" style={{ backgroundColor: '#004445' }}>
            <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: 'rgba(255,240,204,0.15)' }}>
              <BelvestIcon className="h-4 w-auto text-[#FFF0CC]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate" style={{ color: '#FFF0CC' }}>Belvest Ассистент</p>
              <p className="text-xs" style={{ color: 'rgba(255,240,204,0.6)' }}>Онлайн</p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Закрыть" className="shrink-0 cursor-pointer"
              style={{ color: 'rgba(255,240,204,0.7)' }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="chat-messages flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className="max-w-[80%]">
                  <div
                    className="px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
                    style={msg.role === 'assistant'
                      ? { backgroundColor: '#004445', color: '#FFF0CC', borderBottomLeftRadius: 4 }
                      : { backgroundColor: '#548870', color: '#FFFFFF', borderBottomRightRadius: 4 }}
                  >
                    {msg.content}
                  </div>
                  <p className="text-xs mt-1 px-1" style={{ color: '#4A6B67' }}>{msg.ts}</p>
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <TypingDots />
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick replies */}
          {showQuick && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5 shrink-0">
              {QUICK_REPLIES.map((q) => (
                <button key={q} onClick={() => send(q)}
                  className="text-xs px-3 py-1.5 rounded-full border cursor-pointer transition-colors"
                  style={{ borderColor: '#004445', color: '#004445', backgroundColor: 'transparent' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#004445'; e.currentTarget.style.color = '#FFF0CC'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#004445'; }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-4 pb-4 pt-2 shrink-0 border-t" style={{ borderColor: '#16685B' }}>
            <div className="flex items-end gap-2 rounded-xl px-3 py-2" style={{ backgroundColor: '#fff', border: '1px solid #16685B' }}>
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Написать сообщение..."
                className="flex-1 resize-none text-sm outline-none bg-transparent"
                style={{ color: '#0D1F1D', maxHeight: 80 }}
              />
              <button
                onClick={() => send(input)}
                disabled={!input.trim() || typing}
                className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-opacity cursor-pointer"
                style={{ backgroundColor: '#004445', opacity: input.trim() && !typing ? 1 : 0.4 }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M13 1L1 7l5 2 2 5 5-13z" fill="#FFF0CC" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
