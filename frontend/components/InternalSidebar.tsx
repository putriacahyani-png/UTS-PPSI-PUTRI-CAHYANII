// CivicAI Lampung - Internal Dashboard Sidebar
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Inbox,
  Sparkles,
  FileText,
  UserCheck,
  MapPin,
  BarChart3,
  History,
  Wrench,
  ShieldCheck,
  Settings,
  Users,
  LayoutDashboard,
  LogOut,
} from 'lucide-react';
import { UserRole } from '@/types';

interface InternalSidebarProps {
  role?: UserRole;
  userName?: string;
  opdName?: string;
}

export default function InternalSidebar({
  role = 'VERIFIKATOR',
  userName = 'Operator Verifikasi',
  opdName = 'Diskominfotik Prov. Lampung',
}: InternalSidebarProps) {
  const pathname = usePathname();

  const navItems = [
    {
      section: 'MODUL OPERASIONAL',
      links: [
        {
          href: '/internal/dashboard',
          label: 'Dashboard',
          icon: LayoutDashboard,
          roles: ['VERIFIKATOR', 'PETUGAS_OPD', 'PIMPINAN', 'ADMIN'],
        },
        {
          href: '/internal/antrean',
          label: 'Antrean Verifikasi',
          icon: Inbox,
          badge: '42',
          roles: ['VERIFIKATOR', 'ADMIN'],
        },
        {
          href: '/internal/saran-ai',
          label: 'Saran AI',
          icon: Sparkles,
          roles: ['VERIFIKATOR', 'ADMIN'],
        },
        {
          href: '/internal/penugasan',
          label: 'Penugasan OPD',
          icon: UserCheck,
          roles: ['VERIFIKATOR', 'PIMPINAN', 'ADMIN'],
        },
        {
          href: '/internal/penanganan',
          label: 'Penanganan Tiket',
          icon: Wrench,
          roles: ['PETUGAS_OPD', 'ADMIN'],
        },
        {
          href: '/internal/peta',
          label: 'Peta Sebaran Laporan',
          icon: MapPin,
          roles: ['VERIFIKATOR', 'PETUGAS_OPD', 'PIMPINAN', 'ADMIN'],
        },
      ],
    },
    {
      section: 'TATA KELOLA & ANALITIK',
      links: [
        {
          href: '/internal/analitik',
          label: 'Analitik & Tren',
          icon: BarChart3,
          roles: ['PIMPINAN', 'VERIFIKATOR', 'ADMIN'],
        },
        {
          href: '/internal/pengguna',
          label: 'Manajemen Pengguna',
          icon: Users,
          roles: ['ADMIN'],
        },
        {
          href: '/internal/referensi',
          label: 'Pengaturan Referensi',
          icon: Settings,
          roles: ['ADMIN'],
        },
        {
          href: '/internal/audit',
          label: 'Audit Trail',
          icon: History,
          roles: ['ADMIN', 'PIMPINAN'],
        },
      ],
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-[250px] bg-white border-r border-lineBorder z-50 flex flex-col justify-between shadow-xs">
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Workspace Card Header */}
        <div className="p-4 bg-slate-50 border-b border-lineBorder">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-semibold text-textMuted uppercase tracking-wider">
              Wilayah Kerja
            </span>
            <span className="text-[10px] font-mono text-primary font-medium bg-primary-tint px-1.5 py-0.5 rounded">
              v1.0-PROV
            </span>
          </div>
          <div className="font-heading font-bold text-sm text-textMain truncate">
            Pemprov Lampung
          </div>
          <div className="text-[11px] text-textSec truncate mb-2.5">
            {opdName}
          </div>
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary-tint text-primary text-[10px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            {role}
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="px-3 py-4 space-y-6">
          {navItems.map((group) => {
            const visibleLinks = group.links.filter(
              (item) => !item.roles || item.roles.includes(role)
            );
            if (visibleLinks.length === 0) return null;

            return (
              <div key={group.section}>
                <div className="px-2 mb-2 text-[10px] font-bold font-mono text-textMuted uppercase tracking-wider">
                  {group.section}
                </div>
                <nav className="space-y-1">
                  {visibleLinks.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center justify-between px-3 py-2 rounded text-[13px] font-medium transition-all ${
                          isActive
                            ? 'bg-primary text-white font-semibold shadow-xs'
                            : 'text-textSec hover:bg-slate-100 hover:text-textMain'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-textSec'}`} />
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span
                            className={`px-1.5 py-0.5 text-[10px] font-mono font-bold rounded ${
                              isActive
                                ? 'bg-white/20 text-white'
                                : 'bg-primary-tint text-primary'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            );
          })}
        </div>
      </div>

      {/* Affiliation & User Footnote */}
      <div className="p-3 bg-slate-50 border-t border-lineBorder">
        <div className="text-[10px] font-semibold text-textMuted uppercase mb-0.5">
          Afiliasi Riset Strategis
        </div>
        <p className="text-[11px] text-textSec leading-tight mb-3">
          Universitas Teknokrat Indonesia &amp; Pemprov Lampung
        </p>
        <Link
          href="/"
          className="flex items-center gap-2 text-xs text-rose-600 hover:text-rose-700 font-medium px-2 py-1.5 rounded hover:bg-rose-50 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Keluar ke Beranda</span>
        </Link>
      </div>
    </aside>
  );
}

