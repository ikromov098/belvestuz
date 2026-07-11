'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function StatsBar() {
  const { t } = useLanguage();
  return (
    <div style={{ backgroundColor: '#003332' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {t.stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-2xl font-extrabold" style={{ color: '#FFF0CC' }}>{s.value}</p>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,240,204,0.60)' }}>{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
