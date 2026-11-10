// CivicAI Lampung - Antrean Verifikasi
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import InternalSidebar from '@/components/InternalSidebar';
import InternalHeader from '@/components/InternalHeader';
import Footer from '@/components/Footer';
import { Search, Filter, ArrowRight, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { Complaint } from '@/types';

export default function AntreanVerifikasiPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [regionFilter, setRegionFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/v1/complaints')
      .then((res) => res.json())
      .then((d) => {
        if (d.success) setComplaints(d.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = complaints.filter((c) => {
    if (statusFilter !== 'ALL' && c.status !== statusFilter) return false;
    if (regionFilter !== 'ALL' && c.region_id !== regionFilter) return false;
    if (
      searchTerm &&
      !c.ticket_number.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !c.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !c.citizen_name.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slatebg flex">
      <InternalSidebar role="VERIFIKATOR" userName="Siti Rahmawati, S.Sos" opdName="Diskominfotik Prov. Lampung" />

      <div className="pl-[250px] flex-1 flex flex-col justify-between min-h-screen">
        <InternalHeader
          breadcrumb="Antrean Verifikasi"
          userName="Siti Rahmawati, S.Sos"
          userRole="VERIFIKATOR"
          slaCount={14}
        />

        <main className="pt-20 pb-10 px-6 max-w-7xl w-full mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-heading font-extrabold text-2xl text-textMain tracking-tight">
                Antrean Verifikasi Laporan Masuk
              </h1>
              <p className="text-xs text-textSec mt-0.5">
                Kelola pemeriksaan materi aduan, foto bukti, dan kesesuaian kewenangan OPD
              </p>
            </div>
            <div className="font-mono text-xs font-bold px-3 py-1.5 rounded bg-primary-tint text-primary border border-primary-tint2 self-start sm:self-auto">
              Total {filtered.length} Laporan Ditampilkan
            </div>
          </div>

          {/* Filters Bar */}
          <div className="bg-white rounded-lg border border-lineBorder p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-textMuted" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari tiket, judul, atau nama pelapor..."
                className="w-full h-9 pl-9 pr-3 rounded border border-lineBorder bg-slate-50 text-xs text-textMain focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto text-xs">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-9 px-3 rounded border border-lineBorder bg-white text-xs font-medium text-textMain focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="ALL">Semua Status</option>
                <option value="SUBMITTED">Menunggu Verifikasi</option>
                <option value="UNDER_REVIEW">Sedang Diperiksa</option>
                <option value="NEEDS_INFORMATION">Perlu Info Tambahan</option>
                <option value="VERIFIED">Terverifikasi</option>
                <option value="ASSIGNED">Ditugaskan ke OPD</option>
                <option value="IN_PROGRESS">Dalam Penanganan</option>
                <option value="RESOLVED">Selesai</option>
              </select>
            </div>
          </div>

          {/* Main Table */}
          <div className="bg-white rounded-lg border border-lineBorder shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-lineBorder text-textMuted font-semibold text-[11px]">
                    <th className="py-3 px-4">NOMOR TIKET</th>
                    <th className="py-3 px-4">PELAPOR</th>
                    <th className="py-3 px-4">JUDUL PENGADUAN</th>
                    <th className="py-3 px-4">KATEGORI</th>
                    <th className="py-3 px-4">WILAYAH</th>
                    <th className="py-3 px-4">PRIORITAS</th>
                    <th className="py-3 px-4">STATUS</th>
                    <th className="py-3 px-4 text-right">AKSI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-lineBorder">
                  {loading ? (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-textMuted">
                        Memuat data antrean verifikasi...
                      </td>
                    </tr>
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-textMuted">
                        Tidak ada laporan yang sesuai kriteria filter.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-primary whitespace-nowrap">
                          {item.ticket_number}
                        </td>
                        <td className="py-3 px-4 font-medium text-textMain whitespace-nowrap">
                          {item.citizen_name}
                        </td>
                        <td className="py-3 px-4 font-semibold text-textMain max-w-xs truncate">
                          {item.title}
                        </td>
                        <td className="py-3 px-4 text-textSec whitespace-nowrap">
                          {item.category_name}
                        </td>
                        <td className="py-3 px-4 text-textMuted whitespace-nowrap">
                          {item.region_name}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
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
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              item.status === 'RESOLVED'
                                ? 'bg-emerald-100 text-emerald-800'
                                : item.status === 'IN_PROGRESS'
                                ? 'bg-amber-100 text-amber-800'
                                : item.status === 'NEEDS_INFORMATION'
                                ? 'bg-orange-100 text-orange-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <Link
                            href={`/internal/laporan/${item.id}`}
                            className="px-3 py-1 rounded bg-primary text-white hover:bg-primary-hover font-semibold transition-colors shadow-2xs"
                          >
                            Periksa
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
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

