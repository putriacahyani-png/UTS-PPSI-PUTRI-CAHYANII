// CivicAI Lampung - Lacak Tiket Publik
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import EmergencyBanner from '@/components/EmergencyBanner';
import Footer from '@/components/Footer';
import {
  Search,
  CheckCircle2,
  Clock,
  MapPin,
  Building2,
  ShieldCheck,
  Calendar,
  AlertCircle,
  FileText,
  UserCheck,
  Wrench,
  Sparkles,
} from 'lucide-react';

function TrackTicketContent() {
  const searchParams = useSearchParams();
  const initialTicket = searchParams.get('ticket') || '';
  const [ticketInput, setTicketInput] = useState(initialTicket);
  const [loading, setLoading] = useState(false);
  const [ticketData, setTicketData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchTicket = async (ticketNumber: string) => {
    if (!ticketNumber.trim()) return;
    setLoading(true);
    setErrorMsg('');
    setTicketData(null);

    try {
      const res = await fetch(`/api/v1/complaints/track/${encodeURIComponent(ticketNumber.trim())}`);
      const data = await res.json();

      if (data.success) {
        setTicketData(data.data);
      } else {
        setErrorMsg(data.message || 'Nomor tiket tidak ditemukan.');
      }
    } catch {
      setErrorMsg('Gagal terhubung ke basis data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialTicket) {
      setTicketInput(initialTicket);
      fetchTicket(initialTicket);
    }
  }, [initialTicket]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTicket(ticketInput);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'SUBMITTED':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800">Menunggu Verifikasi</span>;
      case 'UNDER_REVIEW':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">Sedang Diperiksa</span>;
      case 'NEEDS_INFORMATION':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800">Perlu Kelengkapan</span>;
      case 'VERIFIED':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">Terverifikasi</span>;
      case 'ASSIGNED':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800">Ditugaskan ke OPD</span>;
      case 'IN_PROGRESS':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">Dalam Penanganan Lapangan</span>;
      case 'RESOLVED':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">Selesai Ditindaklanjuti</span>;
      case 'REJECTED':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800">Ditolak</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">{status}</span>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full">
      {/* SEARCH CARD */}
      <div className="bg-white rounded-lg shadow-card border border-lineBorder p-6 sm:p-8 mb-8">
        <div className="text-center max-w-xl mx-auto mb-6">
          <h1 className="font-heading font-extrabold text-2xl text-textMain tracking-tight">
            Lacak Status Pengaduan Publik
          </h1>
          <p className="mt-1 text-xs text-textSec">
            Masukkan nomor registrasi tiket laporan Anda untuk melihat perkembangan penanganan oleh OPD Pemprov Lampung
          </p>
        </div>

        <form onSubmit={handleSearch} className="max-w-lg mx-auto">
          <div className="relative">
            <input
              type="text"
              value={ticketInput}
              onChange={(e) => setTicketInput(e.target.value)}
              placeholder="Contoh: TKT-20261108-0142"
              className="w-full h-11 pl-4 pr-24 rounded border border-lineBorder bg-slate-50 text-xs font-mono text-textMain uppercase focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded flex items-center gap-1.5 transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
              <span>{loading ? 'Mencari...' : 'Lacak'}</span>
            </button>
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] text-textMuted px-1">
            <span>Data terlindungi dengan penyamaran privasi warga</span>
            <button
              type="button"
              onClick={() => {
                setTicketInput('TKT-20261108-0142');
                fetchTicket('TKT-20261108-0142');
              }}
              className="text-primary hover:underline font-mono"
            >
              Demo Tiket Aktif
            </button>
          </div>
        </form>
      </div>

      {errorMsg && (
        <div className="mb-8 p-4 rounded bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-bold">Laporan Tidak Ditemukan</div>
            <div className="mt-0.5">{errorMsg}</div>
          </div>
        </div>
      )}

      {/* TICKET DETAIL DISPLAY */}
      {ticketData && (
        <div className="space-y-6">
          {/* Main Info Box */}
          <div className="bg-white rounded-lg shadow-card border border-lineBorder p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-lineBorder">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-base font-bold text-primary">
                    {ticketData.ticket_number}
                  </span>
                  <span className="text-[10px] font-mono text-textMuted bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    PUBLIK
                  </span>
                </div>
                <h2 className="font-heading font-bold text-lg text-textMain">
                  {ticketData.title}
                </h2>
              </div>
              <div className="self-start sm:self-auto">
                {getStatusBadge(ticketData.status)}
              </div>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 text-xs">
              <div>
                <span className="text-textMuted block text-[11px]">Kategori</span>
                <span className="font-semibold text-textMain">{ticketData.category_name}</span>
              </div>
              <div>
                <span className="text-textMuted block text-[11px]">OPD Penanggung Jawab</span>
                <span className="font-semibold text-primary">{ticketData.organization_name}</span>
              </div>
              <div>
                <span className="text-textMuted block text-[11px]">Wilayah / Kabupaten</span>
                <span className="font-semibold text-textMain">{ticketData.region_name}</span>
              </div>
              <div>
                <span className="text-textMuted block text-[11px]">Pelapor</span>
                <span className="font-mono text-textSec">{ticketData.masked_reporter}</span>
              </div>
            </div>

            {/* Progress Bar (if in progress) */}
            {ticketData.progress_percent !== undefined && ticketData.progress_percent > 0 && (
              <div className="pt-2 pb-4">
                <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                  <span className="text-textSec">Progres Penanganan Lapangan</span>
                  <span className="font-mono text-primary font-bold">{ticketData.progress_percent}% Selesai</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${ticketData.progress_percent}%` }}
                  ></div>
                </div>
              </div>
            )}

            <div className="pt-3 border-t border-lineBorder">
              <span className="text-[11px] font-bold text-textSec uppercase tracking-wider block mb-1">
                Deskripsi Aduan
              </span>
              <p className="text-xs text-textSec leading-relaxed">
                {ticketData.description}
              </p>
            </div>

            {/* Location & Landmark */}
            <div className="mt-4 p-3 rounded bg-slate-50 border border-slate-100 flex items-start gap-2.5 text-xs">
              <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-textMain">{ticketData.address}</div>
                {ticketData.landmark && (
                  <div className="text-[11px] text-textMuted mt-0.5">
                    Patokan: {ticketData.landmark}
                  </div>
                )}
              </div>
            </div>

            {/* Public Attachments */}
            {ticketData.attachments && ticketData.attachments.length > 0 && (
              <div className="mt-5 pt-4 border-t border-lineBorder">
                <span className="text-[11px] font-bold text-textSec uppercase tracking-wider block mb-2.5">
                  Foto Bukti yang Dapat Dipublikasikan
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {ticketData.attachments.map((att: any, idx: number) => (
                    <div key={idx} className="relative aspect-video rounded border border-lineBorder overflow-hidden">
                      <img src={att.file_url} alt={att.file_name} className="w-full h-full object-cover" />
                      <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[10px] px-2 py-0.5 truncate font-mono">
                        {att.attachment_type === 'RESOLUTION_PROOF' ? 'Bukti Selesai' : 'Bukti Awal'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* TIMELINE RIWAYAT STATUS PUBLIK */}
          <div className="bg-white rounded-lg shadow-card border border-lineBorder p-6">
            <h3 className="font-heading font-bold text-sm text-textMain mb-4 pb-2 border-b border-lineBorder flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>Riwayat Perkembangan Penanganan</span>
            </h3>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {ticketData.history?.map((h: any, idx: number) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-primary border-2 border-white ring-2 ring-primary/20"></div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                    <span className="font-bold text-textMain">
                      {h.new_status}
                    </span>
                    <span className="text-[11px] font-mono text-textMuted">
                      {new Date(h.created_at).toLocaleString('id-ID')}
                    </span>
                  </div>
                  <p className="text-xs text-textSec mt-1 leading-relaxed">
                    {h.reason}
                  </p>
                  <span className="text-[10px] font-semibold text-textMuted mt-1 inline-block">
                    Aktor: {h.changed_by_name} ({h.changed_by_role})
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* PUBLIC RESPONSES */}
          {ticketData.comments && ticketData.comments.length > 0 && (
            <div className="bg-white rounded-lg shadow-card border border-lineBorder p-6">
              <h3 className="font-heading font-bold text-sm text-textMain mb-4 pb-2 border-b border-lineBorder flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>Tanggapan Resmi Petugas OPD</span>
              </h3>

              <div className="space-y-3">
                {ticketData.comments.map((c: any, idx: number) => (
                  <div key={idx} className="p-3.5 rounded-lg bg-emerald-50/50 border border-emerald-100 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-emerald-900">{c.user_name} ({c.user_role})</span>
                      <span className="text-[10px] font-mono text-emerald-700">
                        {new Date(c.created_at).toLocaleString('id-ID')}
                      </span>
                    </div>
                    <p className="text-textSec mt-1 leading-relaxed">
                      {c.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function LacakTiketPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-slatebg">
      <Navbar />
      <EmergencyBanner />
      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="p-8 text-center text-xs">Memuat formulir pelacakan...</div>}>
          <TrackTicketContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

