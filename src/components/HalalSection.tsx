'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function HalalSection() {
  const { t } = useLanguage();

  const rows = [
    t.halal.row1,
    t.halal.row2,
    t.halal.row3,
    t.halal.row4,
    t.halal.row5,
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold mb-3" style={{ color: '#0D1F1D' }}>
            {t.halal.title}
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Header row */}
          <div className="col-span-1" />
          <div className="text-center py-2 rounded-t-xl font-bold text-sm" style={{ backgroundColor: '#e0e0e0', color: '#555' }}>
            {t.halal.bankCol}
          </div>
          <div className="text-center py-2 rounded-t-xl font-bold text-sm" style={{ backgroundColor: '#004445', color: '#FFF0CC' }}>
            {t.halal.belvestCol}
          </div>

          {/* Rows */}
          {rows.map((label, i) => (
            <React.Fragment key={`row-${i}`}>
              <div
                className="flex items-center px-3 py-3 text-sm font-medium"
                style={{
                  color: '#0D1F1D',
                  backgroundColor: i % 2 === 0 ? '#fff' : '#FFFFFF',
                  borderRadius: '8px 0 0 8px',
                }}>
                {label}
              </div>
              <div
                className="flex items-center justify-center py-3"
                style={{ backgroundColor: i % 2 === 0 ? '#fff' : '#FFFFFF' }}>
                <span className="text-lg" style={{ color: '#C62828' }}>✗</span>
              </div>
              <div
                className="flex items-center justify-center py-3"
                style={{
                  backgroundColor: i % 2 === 0 ? 'rgba(0,68,69,0.06)' : 'rgba(0,68,69,0.10)',
                  borderRadius: '0 8px 8px 0',
                }}>
                <span className="text-lg" style={{ color: '#004445' }}>✓</span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
