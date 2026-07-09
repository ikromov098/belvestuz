'use client';

import { X } from 'lucide-react';
import BelvestIcon from '@/components/BelvestIcon';
import { useLanguage } from '@/context/LanguageContext';

export default function DevModal({ onClose }: { onClose: () => void }) {
  const { lang } = useLanguage();

  const message =
    lang === 'uz'
      ? 'Hozircha ishlab chiqilmoqda. Hurmat bilan, Belvest jamoasi'
      : 'Страница находится в разработке. С уважением, команда Belvest';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl px-8 py-10 max-w-sm w-full text-center"
        style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.22)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full cursor-pointer transition-colors"
          style={{ color: '#4A6B67' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f4f3')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="flex justify-center mb-5">
          <BelvestIcon className="h-14 w-auto text-[#004445]" />
        </div>

        <p className="text-sm font-semibold leading-relaxed" style={{ color: '#0D1F1D' }}>
          {message}
        </p>
      </div>
    </div>
  );
}
