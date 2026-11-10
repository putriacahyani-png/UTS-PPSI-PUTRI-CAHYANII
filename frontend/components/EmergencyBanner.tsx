// CivicAI Lampung - Emergency 112 Banner
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

import React from 'react';
import { PhoneCall } from 'lucide-react';

export default function EmergencyBanner() {
  return (
    <div className="bg-amber-50 border-b border-amber-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 text-[12px] sm:text-[13px] text-amber-900 font-medium">
        <div className="flex items-center gap-2">
          <PhoneCall className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>
            <strong>CivicAI bukan kanal darurat.</strong> Untuk keadaan darurat yang mengancam keselamatan jiwa, mohon segera hubungi{' '}
            <strong className="underline text-amber-800">112</strong> (Bebas Pulsa).
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono text-amber-800 bg-white/80 px-2 py-0.5 rounded border border-amber-300">
          <span>LAYANAN TANGGAP DARURAT 24/7</span>
        </div>
      </div>
    </div>
  );
}

