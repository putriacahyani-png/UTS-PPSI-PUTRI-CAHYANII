// CivicAI Lampung - Dashboard Saya (Portal Warga)
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  Search,
  ArrowRight,
  ChevronRight,
  Bell,
  MapPin,
  Calendar,
} from 'lucide-react';
import { Complaint } from '@/types';

export default function WargaDashboardPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/v1/complaints?user_id=usr-warga-1')
      .then((res) => res.json())
      .then((d) => {
        if (d.success) setComplaints(d.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const total = complaints.length;
  const waiting = complaints.filter((c) => c.status === 'SUBMITTED' || c.status === 'UNDER_REVIEW').length;
  const inProgress = complaints.filter((c) => c.status === 'ASSIGNED' || c.status === 'IN_PROGRESS').length;
  const resolved = complaints.filter((c) => c.status === 'RESOLVED').length;

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slatebg">
      <Navbar />

      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Welcome Banner */}
        <div className="bg-white rounded-lg border border-lineBorder p-6 mb-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono font-bold text-primary bg-primary-tint px-2.5 py-1 rounded inline-block mb-2">
              PORTAL WARGA LAMPUNG
            </div>
            <h1 className="font-heading font-extrabold text-2xl text-textMain tracking-tight">
              Selamat Datang, Ahmad Fauzi, S.T.
            </h1>
            <p className="text-xs text-textSec mt-0.5">
              Pantau laporan pengaduan infrastruktur dan layanan publik yang Anda ajukan ke Pemerintah Provinsi Lampung
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/buat-pengaduan"
              className="h-10 px-4 rounded bg-primary hover:bg-primary-hover active:bg-primary-pressed text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Buat Pengaduan Baru</span>
            </Link>
          </div>
        </div>

        {/* 4 SUMMARY STATS CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-lg border border-lineBorder shadow-xs">
            <div className="flex items-center justify-between text-textMuted mb-2">
              <span className="text-xs font-semibold">Total Pengaduan Saya</span>
              <FileText className="w-4 h-4 text-primary" />
            </div>
            <div className="font-heading font-extrabold text-2xl text-textMain">{total}</div>
            <div className="text-[11px] text-textMuted mt-1">Semua riwayat aduan</div>
          </div>

          <div className="bg-white p-5 rounded-lg border border-lineBorder shadow-xs">
            <div className="flex items-center justify-between text-textMuted mb-2">
              <span className="text-xs font-semibold">Menunggu Verifikasi</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="font-heading font-extrabold text-2xl text-amber-600">{waiting}</div>
            <div className="text-[11px] text-textMuted mt-1">Dalam antrean verifikator</div>
          </div>

          <div className="bg-white p-5 rounded-lg border border-lineBorder shadow-xs">
            <div className="flex items-center justify-between text-textMuted mb-2">
              <span className="text-xs font-semibold">Dalam Penanganan</span>
              <AlertCircle className="w-4 h-4 text-primary" />
            </div>
            <div className="font-heading font-extrabold text-2xl text-primary">{inProgress}</div>
            <div className="text-[11px] text-textMuted mt-1">Satgas OPD di lapangan</div>
          </div>

          <div className="bg-white p-5 rounded-lg border border-lineBorder shadow-xs">
            <div className="flex items-center justify-between text-textMuted mb-2">
              <span className="text-xs font-semibold">Laporan Selesai</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="font-heading font-extrabold text-2xl text-emerald-600">{resolved}</div>
            <div className="text-[11px] text-textMuted mt-1">Tuntas ditindaklanjuti</div>
          </div>
        </div>

        {/* RECENT TICKETS TABLE */}
        <div className="bg-white rounded-lg border border-lineBorder shadow-xs p-6">
          <div className="flex items-center justify-between pb-4 border-b border-lineBorder mb-4">
            <div>
              <h2 className="font-heading font-bold text-base text-textMain">
                Pengaduan Terbaru Saya
              </h2>
              <p className="text-xs text-textMuted">Daftar laporan aktif Anda</p>
            </div>
            <Link
              href="/warga/pengaduan"
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
            >
              <span>Lihat Semua ({complaints.length})</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="py-8 text-center text-xs text-textMuted">Memuat data pengaduan...</div>
          ) : complaints.length === 0 ? (
            <div className="py-10 text-center text-xs text-textMuted">
              Anda belum pernah menyampaikan pengaduan. Klik &quot;Buat Pengaduan Baru&quot; di atas.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-lineBorder text-textMuted font-semibold text-[11px]">
                    <th className="py-2.5 px-3">NO. TIKET</th>
                    <th className="py-2.5 px-3">JUDUL LAPORAN</th>
                    <th className="py-2.5 px-3">KATEGORI</th>
                    <th className="py-2.5 px-3">WILAYAH</th>
                    <th className="py-2.5 px-3">TANGGAL</th>
                    <th className="py-2.5 px-3">STATUS</th>
                    <th className="py-2.5 px-3 text-right">AKSI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-lineBorder">
                  {complaints.slice(0, 5).map((item) => (
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
                      <td className="py-3 px-3 font-mono text-[11px] text-textMuted whitespace-nowrap">
                        {new Date(item.created_at).toLocaleDateString('id-ID')}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            item.status === 'RESOLVED'
                              ? 'bg-emerald-100 text-emerald-800'
                              : item.status === 'IN_PROGRESS'
                              ? 'bg-amber-100 text-amber-800'
                              : item.status === 'NEEDS_INFORMATION'
                              ? 'bg-orange-100 text-orange-800'
                              : 'bg-slate-100 text-slate-800'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right whitespace-nowrap">
                        <Link
                          href={`/warga/pengaduan/${item.id}`}
                          className="px-2.5 py-1 rounded bg-slate-100 hover:bg-primary-tint text-textSec hover:text-primary font-semibold transition-colors"
                        >
                          Detail
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

