// CivicAI Lampung - Pengaduan Saya
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Search, Filter, Plus, ArrowRight, Clock, FileText } from 'lucide-react';
import { Complaint } from '@/types';

export default function PengaduanSayaPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
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

  const filtered = complaints.filter((c) => {
    if (statusFilter !== 'ALL' && c.status !== statusFilter) return false;
    if (
      searchTerm &&
      !c.ticket_number.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !c.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slatebg">
      <Navbar />

      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="font-heading font-extrabold text-2xl text-textMain tracking-tight">
              Daftar Pengaduan Saya
            </h1>
            <p className="text-xs text-textSec mt-0.5">
              Seluruh riwayat laporan pengaduan yang telah Anda kirimkan
            </p>
          </div>

          <Link
            href="/buat-pengaduan"
            className="h-10 px-4 rounded bg-primary hover:bg-primary-hover text-white text-xs font-bold flex items-center gap-2 self-start sm:self-auto shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Buat Laporan Baru</span>
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-lineBorder p-4 mb-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-textMuted" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari nomor tiket atau judul..."
              className="w-full h-9 pl-9 pr-3 rounded border border-lineBorder bg-slate-50 text-xs text-textMain focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-textMuted" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-9 px-3 rounded border border-lineBorder bg-white text-xs text-textMain focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="ALL">Semua Status</option>
              <option value="SUBMITTED">Menunggu Verifikasi</option>
              <option value="UNDER_REVIEW">Sedang Diperiksa</option>
              <option value="NEEDS_INFORMATION">Perlu Kelengkapan</option>
              <option value="VERIFIED">Terverifikasi</option>
              <option value="ASSIGNED">Ditugaskan</option>
              <option value="IN_PROGRESS">Dalam Penanganan</option>
              <option value="RESOLVED">Selesai</option>
            </select>
          </div>
        </div>

        {/* Complaints Cards / Table */}
        <div className="space-y-3">
          {loading ? (
            <div className="py-12 text-center text-xs text-textMuted bg-white rounded-lg border border-lineBorder">
              Memuat daftar pengaduan Anda...
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-12 text-center text-xs text-textMuted bg-white rounded-lg border border-lineBorder">
              Tidak ada laporan yang sesuai kriteria pencarian.
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg border border-lineBorder p-5 hover:border-primary/50 transition-all shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-bold text-primary">
                      {item.ticket_number}
                    </span>
                    <span className="text-[10px] text-textMuted font-mono">
                      {new Date(item.created_at).toLocaleDateString('id-ID')}
                    </span>
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
                  </div>

                  <h3 className="font-heading font-bold text-sm text-textMain">
                    {item.title}
                  </h3>

                  <p className="text-xs text-textSec line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="text-[11px] text-textMuted flex items-center gap-4 pt-1">
                    <span>Kategori: <strong>{item.category_name}</strong></span>
                    <span>Wilayah: <strong>{item.region_name}</strong></span>
                    {item.organization_name && (
                      <span>OPD: <strong>{item.organization_name}</strong></span>
                    )}
                  </div>
                </div>

                <div className="self-end sm:self-center">
                  <Link
                    href={`/warga/pengaduan/${item.id}`}
                    className="h-9 px-4 rounded bg-slate-100 hover:bg-primary-tint text-textSec hover:text-primary text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <span>Rincian Tiket</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

