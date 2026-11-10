// CivicAI Lampung - Internal Top Header
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Bell, User as UserIcon, ChevronRight } from 'lucide-react';

interface InternalHeaderProps {
  title?: string;
  breadcrumb?: string;
  userName?: string;
  userRole?: string;
  slaCount?: number;
}

export default function InternalHeader({
  title = 'CivicAI Lampung',
  breadcrumb = 'Peta Sebaran Laporan',
  userName = 'Operator Sektor I',
  userRole = 'VERIFIKATOR',
  slaCount = 14,
}: InternalHeaderProps) {
  const [showNotif, setShowNotif] = useState(false);

  return (
    <header className="fixed top-0 left-[250px] right-0 h-16 bg-white/95 backdrop-blur-md z-40 px-6 flex items-center justify-between border-b border-lineBorder shadow-xs">
      {/* Brand & Breadcrumbs */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-8 h-8 rounded bg-primary text-white font-heading font-bold text-xs flex items-center justify-center shadow-xs">
              PL
            </div>
            <div className="w-8 h-8 rounded bg-ai-violet text-white font-heading font-bold text-xs flex items-center justify-center shadow-xs">
              UT
            </div>
          </div>
          <div>
            <div className="font-heading font-bold text-sm text-textMain tracking-tight leading-none">
              CivicAI Lampung
            </div>
            <div className="text-[11px] text-textMuted leading-tight mt-0.5">
              Portal Tata Kelola &amp; Layanan Publik
            </div>
          </div>
        </div>

        <div className="hidden xl:flex items-center gap-1.5 text-xs text-textMuted font-medium">
          <span className="hover:text-textMain transition-colors cursor-pointer">Dashboard</span>
          <ChevronRight className="w-3.5 h-3.5 text-textMuted" />
          <span className="hover:text-textMain transition-colors cursor-pointer">Modul Operasional</span>
          <ChevronRight className="w-3.5 h-3.5 text-textMuted" />
          <span className="text-textMain font-semibold">{breadcrumb}</span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Search Input */}
        <div className="relative hidden md:flex items-center">
          <Search className="w-4 h-4 absolute left-3 text-textMuted pointer-events-none" />
          <input
            type="text"
            placeholder="Cari tiket, lokasi, nama..."
            className="w-56 lg:w-72 h-9 pl-9 pr-12 rounded bg-slate-100 text-xs text-textMain placeholder:text-textMuted focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary transition-all border border-transparent focus:border-primary"
          />
          <kbd className="absolute right-2 px-1.5 py-0.5 text-[10px] font-mono text-textMuted bg-white rounded border border-lineBorder shadow-2xs">
            ⌘K
          </kbd>
        </div>

        {/* SLA Warning Badge */}
        {slaCount > 0 && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold border border-rose-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            <span>{slaCount} Mendekati SLA</span>
          </div>
        )}

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotif(!showNotif)}
            className="w-9 h-9 rounded flex items-center justify-center text-textSec hover:bg-slate-100 hover:text-textMain transition-colors relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary ring-2 ring-white"></span>
          </button>

          {showNotif && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-card border border-lineBorder p-3 z-50">
              <div className="flex items-center justify-between pb-2 border-b border-lineBorder">
                <span className="text-xs font-bold text-textMain">Notifikasi Sistem</span>
                <span className="text-[10px] font-mono text-primary font-semibold">3 Baru</span>
              </div>
              <div className="mt-2 space-y-2 text-xs">
                <div className="p-2 rounded bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                  <div className="font-semibold text-textMain">Laporan Baru Masuk</div>
                  <div className="text-[11px] text-textSec">Jalan Raya Natar KM 22 membutuhkan verifikasi.</div>
                  <div className="text-[10px] text-textMuted mt-1">10 menit yang lalu</div>
                </div>
                <div className="p-2 rounded bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                  <div className="font-semibold text-textMain">SLA Peringatan 48 Jam</div>
                  <div className="text-[11px] text-textSec">Tiket TKT-20261108-0142 melewati separuh masa SLA.</div>
                  <div className="text-[10px] text-textMuted mt-1">1 jam yang lalu</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="h-6 w-px bg-lineBorder"></div>

        {/* User Pill */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="font-semibold text-xs text-textMain leading-tight">{userName}</div>
            <div className="font-mono text-[10px] text-textMuted">{userRole} · ID #DISP-084</div>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs shadow-xs">
            <UserIcon className="w-4 h-4" />
          </div>
        </div>
      </div>
    </header>
  );
}

