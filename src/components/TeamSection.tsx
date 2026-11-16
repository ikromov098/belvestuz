'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Portal from '@/components/Portal';
import { useLanguage } from '@/context/LanguageContext';
import { ABOUT_TEAM } from '@/data/team';

export default function TeamSection() {
  const { t, lang } = useLanguage();
  const [active, setActive] = useState<number | null>(null);
  const [shown, setShown] = useState(false);

  const close = () => {
    setShown(false);
    setActive(null);
  };

  useEffect(() => {
    if (active === null) return;
    const raf = requestAnimationFrame(() => setShown(true));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('keydown', onKey);
    };
  }, [active]);

  const activeMember = active !== null ? ABOUT_TEAM[active] : null;
  const activeLocal = activeMember ? activeMember[lang] : null;

  return (
    <section style={{ padding: '80px 16px 40px' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold" style={{ color: '#0D1F1D' }}>
            {t.about.teamTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto" style={{ perspective: '1000px' }}>
          {ABOUT_TEAM.map((member, i) => {
            const d = member[lang];
            return (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                className="depth-card w-full bg-white rounded-xl shadow-sm cursor-pointer px-6 py-12 flex flex-col items-center text-center"
                style={{ border: '1px solid #16685B' }}
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-xl font-bold mb-4 shrink-0"
                  style={{ backgroundColor: '#004445', color: '#FFF0CC' }}
                >
                  {member.initials}
                </div>
                <p className="font-bold text-base" style={{ color: '#0D1F1D' }}>{d.name}</p>
                <p className="text-sm font-semibold mt-1" style={{ color: '#548870' }}>{d.role}</p>
              </button>
            );
          })}
        </div>
      </div>

      {activeMember && activeLocal && (
        <Portal>
        <div
          onClick={close}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            backgroundColor: 'rgba(13,31,29,0.6)',
            opacity: shown ? 1 : 0,
            transition: 'opacity 200ms ease',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-2xl p-8 sm:p-10 w-full max-w-[500px] max-h-[85vh] overflow-y-auto"
            style={{
              boxShadow: '0 24px 64px rgba(0,0,0,0.28)',
              opacity: shown ? 1 : 0,
              transform: shown ? 'scale(1)' : 'scale(0.95)',
              transition: 'opacity 200ms ease, transform 200ms ease',
            }}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute top-4 right-4 p-1 cursor-pointer"
              style={{ color: '#4A6B67' }}
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div
                className="rounded-full flex items-center justify-center text-2xl font-bold mb-5 shrink-0"
                style={{ width: 100, height: 100, backgroundColor: '#004445', color: '#FFF0CC' }}
              >
                {activeMember.initials}
              </div>
              <p className="text-xl font-extrabold" style={{ color: '#0D1F1D' }}>
                {activeLocal.name}
              </p>
              <p className="text-sm font-semibold mt-1 mb-5" style={{ color: '#548870' }}>
                {activeLocal.role}
              </p>
              <p className="text-sm leading-relaxed text-left" style={{ color: '#4A6B67' }}>
                {activeLocal.bio}
              </p>
            </div>
          </div>
        </div>
        </Portal>
      )}
    </section>
  );
}
