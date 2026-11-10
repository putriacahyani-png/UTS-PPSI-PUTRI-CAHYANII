// CivicAI Lampung - Dashboard Verifikator & Internal
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import InternalSidebar from '@/components/InternalSidebar';
import InternalHeader from '@/components/InternalHeader';
import Footer from '@/components/Footer';
import {
  Inbox,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  MapPin,
  Building2,
  Calendar,
} from 'lucide-react';
import { Complaint } from '@/types';

export default function InternalDashboardPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/v1/dashboard/summary')
      .then((res) => res.json())
      .then((d) => {
        if (d.success) setSummary(d.data);
      })
      .catch(() => {});

    fetch('/api/v1/complaints')
      .then((res) => res.json())
      .then((d) => {
        if (d.success) setComplaints(d.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const pendingList = complaints.filter(
    (c) => c.status === 'SUBMITTED' || c.status === 'UNDER_REVIEW'
  );

  return (
    <div className="min-h-screen bg-slatebg flex">
      <InternalSidebar role="VERIFIKATOR" userName="Siti Rahmawati, S.Sos" opdName="Diskominfotik Prov. Lampung" />

      <div className="pl-[250px] flex-1 flex flex-col justify-between min-h-screen">
        <InternalHeader
          breadcrumb="Dashboard Operasional"
          userName="Siti Rahmawati, S.Sos"
          userRole="VERIFIKATOR"
          slaCount={summary?.slaWarningCount || 14}
        />

        <main className="pt-20 pb-10 px-6 max-w-7xl w-full mx-auto space-y-6">
          {/* Welcome Banner */}
          <div className="bg-white rounded-lg border border-lineBorder p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="text-[10px] font-mono font-bold text-textMuted uppercase tracking-wider">
                  PUSAT OPERASIONAL VERIFIKASI PROV. LAMPUNG
                </span>
              </div>
              <h1 className="font-heading font-extrabold text-xl text-textMain tracking-tight">
                Ringkasan Antrean &amp; Kinerja Penanganan
              </h1>
              <p className="text-xs text-textSec mt-0.5">
                Verifikasi validitas laporan masyarakat dan distribusikan ke perangkat daerah teknis
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/internal/antrean"
                className="h-9 px-4 rounded bg-primary hover:bg-primary-hover text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Inbox className="w-4 h-4" />
                <span>Buka Antrean Verifikasi ({pendingList.length})</span>
              </Link>
            </div>
          </div>

          {/* 4 CORE KPI METRICS */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-lg border border-lineBorder shadow-xs">
              <div className="flex items-center justify-between text-textMuted mb-1">
                <span className="text-xs font-semibold">Menunggu Verifikasi</span>
                <Inbox className="w-4 h-4 text-amber-500" />
              </div>
              <div className="font-heading font-extrabold text-2xl text-amber-600">
                {pendingList.length} Aduan
              </div>
              <div className="text-[11px] text-textMuted mt-1">Perlu ditindaklanjuti segera</div>
            </div>

            <div className="bg-white p-5 rounded-lg border border-lineBorder shadow-xs">
              <div className="flex items-center justify-between text-textMuted mb-1">
                <span className="text-xs font-semibold">Mendekati Batas SLA</span>
                <AlertTriangle className="w-4 h-4 text-rose-500" />
              </div>
              <div className="font-heading font-extrabold text-2xl text-rose-600">14 Aduan</div>
              <div className="text-[11px] text-rose-600 font-semibold mt-1">Target 12 jam respons</div>
            </div>

            <div className="bg-white p-5 rounded-lg border border-lineBorder shadow-xs">
              <div className="flex items-center justify-between text-textMuted mb-1">
                <span className="text-xs font-semibold">Dalam Penanganan OPD</span>
                <Clock className="w-4 h-4 text-primary" />
              </div>
              <div className="font-heading font-extrabold text-2xl text-primary">
                {complaints.filter((c) => c.status === 'IN_PROGRESS' || c.status === 'ASSIGNED').length} Aduan
              </div>
              <div className="text-[11px] text-textMuted mt-1">Dinas BMBK, Dinkes, DLH dll</div>
            </div>

            <div className="bg-white p-5 rounded-lg border border-lineBorder shadow-xs">
              <div className="flex items-center justify-between text-textMuted mb-1">
                <span className="text-xs font-semibold">Tuntas Selesai Bulan Ini</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="font-heading font-extrabold text-2xl text-emerald-600">
                {complaints.filter((c) => c.status === 'RESOLVED').length} Aduan
              </div>
              <div className="text-[11px] text-emerald-600 font-semibold mt-1">94.2% Kepatuhan SLA</div>
            </div>
          </div>

          {/* QUEUE TABLE */}
          <div className="bg-white rounded-lg border border-lineBorder shadow-xs p-5">
            <div className="flex items-center justify-between pb-3 border-b border-lineBorder mb-4">
              <div>
                <h2 className="font-heading font-bold text-sm text-textMain">
                  Antrean Laporan Baru Menunggu Verifikasi
                </h2>
                <p className="text-[11px] text-textMuted">Periksa bukti foto dan kesesuaian kewenangan</p>
              </div>
              <Link
                href="/internal/antrean"
                className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
              >
                <span>Lihat Seluruh Antrean</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-lineBorder text-textMuted font-semibold text-[11px]">
                    <th className="py-2.5 px-3">NO. TIKET</th>
                    <th className="py-2.5 px-3">JUDUL PENGADUAN</th>
                    <th className="py-2.5 px-3">KATEGORI</th>
                    <th className="py-2.5 px-3">WILAYAH</th>
                    <th className="py-2.5 px-3">PRIORITAS</th>
                    <th className="py-2.5 px-3">STATUS</th>
                    <th className="py-2.5 px-3 text-right">TINDAKAN</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-lineBorder">
                  {pendingList.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-primary whitespace-nowrap">
                        {item.ticket_number}
                      </td>
                      <td className="py-3 px-3 font-semibold text-textMain max-w-xs truncate">
                        {item.title}
                      </td>
                      <td className="py-3 px-3 text-textSec whitespace-nowrap">
                        {item.category_name}
                      </td>
                      <td className="py-3 px-3 text-textMuted whitespace-nowrap">
                        {item.region_name}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            item.priority === 'HIGH' || item.priority === 'URGENT'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-slate-100 text-slate-800'
                          }`}
                        >
                          {item.priority}
                        </span>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right whitespace-nowrap">
                        <Link
                          href={`/internal/laporan/${item.id}`}
                          className="px-3 py-1 rounded bg-primary text-white hover:bg-primary-hover font-semibold transition-colors shadow-2xs"
                        >
                          Verifikasi
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        <Footer className="border-t border-lineBorder" />
      </div>
    </div>
  );
}

