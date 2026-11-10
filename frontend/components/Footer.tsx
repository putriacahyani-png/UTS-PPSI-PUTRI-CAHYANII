// CivicAI Lampung - Mandatory Footer
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

import React from 'react';

export default function Footer({ className = '' }: { className?: string }) {
  return (
    <footer className={`w-full bg-white border-t border-lineBorder py-5 z-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-textSec">
        <div className="font-semibold text-textMain tracking-tight">
          Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom
        </div>
        <div className="text-textMuted flex items-center gap-2">
          <span>Kolaborasi Riset Strategis:</span>
          <span className="font-medium text-textSec">Pemerintah Provinsi Lampung</span>
          <span>·</span>
          <span className="font-medium text-textSec">Universitas Teknokrat Indonesia</span>
        </div>
      </div>
    </footer>
  );
}

