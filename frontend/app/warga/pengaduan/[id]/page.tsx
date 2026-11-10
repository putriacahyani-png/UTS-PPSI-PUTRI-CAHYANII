// CivicAI Lampung - Detail Tiket Warga
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  ArrowLeft,
  Clock,
  MapPin,
  Building2,
  FileText,
  Send,
  AlertCircle,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { Complaint } from '@/types';

export default function DetailTiketWargaPage() {
  const params = useParams();
  const id = params?.id as string;
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');

  const loadData = () => {
    fetch(`/api/v1/complaints/${id}`)
      .then((res) => res.json())
      .then((d) => {
        if (d.success) setComplaint(d.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (id) loadData();
  }, [id]);

  const handleSendResponse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setSubmitting(true);
    setMsg('');

    try {
      const res = await fetch(`/api/v1/complaints/${id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          comment: commentText,
          is_internal_only: false,
          user_name: 'Ahmad Fauzi, S.T. (Pelapor)',
          user_role: 'WARGA',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setCommentText('');
        setMsg('Tanggapan atau informasi tambahan Anda berhasil dikirim ke petugas.');
        loadData();
      }
    } catch {
      setMsg('Gagal mengirim tanggapan.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-slatebg">
        <Navbar />
        <main className="flex-grow py-12 text-center text-xs text-textMuted">
          Memuat rincian laporan pengaduan...
        </main>
        <Footer />
      </div>
    );
  }

  if (!complaint) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-slatebg">
        <Navbar />
        <main className="flex-grow py-12 text-center text-xs text-rose-600">
          Data pengaduan tidak ditemukan.
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slatebg">
      <Navbar />

      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-6">
        <div className="flex items-center gap-2">
          <Link
            href="/warga/pengaduan"
            className="text-xs text-textMuted hover:text-textMain flex items-center gap-1 font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Daftar Pengaduan</span>
          </Link>
        </div>

        {/* TICKET DETAILS HEADER */}
        <div className="bg-white rounded-lg shadow-card border border-lineBorder p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-lineBorder">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-base font-bold text-primary">
                  {complaint.ticket_number}
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-primary-tint text-primary">
                  TIKET SAYA
                </span>
              </div>
              <h1 className="font-heading font-extrabold text-xl text-textMain">
                {complaint.title}
              </h1>
            </div>

            <span
              className={`self-start sm:self-auto px-3 py-1 rounded-full text-xs font-bold ${
                complaint.status === 'RESOLVED'
                  ? 'bg-emerald-100 text-emerald-800'
                  : complaint.status === 'IN_PROGRESS'
                  ? 'bg-amber-100 text-amber-800'
                  : complaint.status === 'NEEDS_INFORMATION'
                  ? 'bg-orange-100 text-orange-800'
                  : 'bg-slate-100 text-slate-800'
              }`}
            >
              {complaint.status}
            </span>
          </div>

          {/* Alert if Needs Information */}
          {complaint.status === 'NEEDS_INFORMATION' && (
            <div className="p-4 rounded-lg bg-orange-50 border border-orange-200 text-xs text-orange-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-orange-600" />
                <span>Petugas Membutuhkan Informasi Tambahan</span>
              </div>
              <p className="text-orange-800 leading-relaxed">
                {complaint.needs_info_reason ||
                  'Harap berikan data pelengkap pada kolom tanggapan di bawah agar laporan dapat diproses ke dinas terkait.'}
              </p>
            </div>
          )}

          {/* Details Table */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2 text-xs">
            <div>
              <span className="text-textMuted block text-[11px]">Kategori</span>
              <span className="font-semibold text-textMain">{complaint.category_name}</span>
            </div>
            <div>
              <span className="text-textMuted block text-[11px]">Wilayah</span>
              <span className="font-semibold text-textMain">{complaint.region_name}</span>
            </div>
            <div>
              <span className="text-textMuted block text-[11px]">OPD Pelaksana</span>
              <span className="font-semibold text-primary">
                {complaint.organization_name || 'Menunggu Penugasan'}
              </span>
            </div>
            <div>
              <span className="text-textMuted block text-[11px]">Tanggal Pengajuan</span>
              <span className="font-mono text-textSec">
                {new Date(complaint.created_at).toLocaleDateString('id-ID')}
              </span>
            </div>
          </div>

          <div>
            <span className="text-[11px] font-bold text-textSec uppercase tracking-wider block mb-1">
              Deskripsi Masalah
            </span>
            <p className="text-xs text-textSec leading-relaxed bg-slate-50 p-3 rounded border border-lineBorder">
              {complaint.description}
            </p>
          </div>

          {/* Location */}
          <div className="p-3 rounded bg-slate-50 border border-slate-100 flex items-start gap-2.5 text-xs">
            <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-textMain">{complaint.address}</div>
              {complaint.landmark && (
                <div className="text-[11px] text-textMuted mt-0.5">Patokan: {complaint.landmark}</div>
              )}
            </div>
          </div>

          {/* Attachments */}
          {complaint.attachments && complaint.attachments.length > 0 && (
            <div className="pt-2">
              <span className="text-[11px] font-bold text-textSec uppercase tracking-wider block mb-2">
                Foto Bukti Lampiran
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {complaint.attachments.map((att) => (
                  <div key={att.id} className="aspect-video rounded border border-lineBorder overflow-hidden relative">
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

        {/* TIMELINE RIWAYAT */}
        <div className="bg-white rounded-lg shadow-card border border-lineBorder p-6">
          <h3 className="font-heading font-bold text-sm text-textMain mb-4 pb-2 border-b border-lineBorder flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <span>Perkembangan Penanganan Laporan</span>
          </h3>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {complaint.history.map((h) => (
              <div key={h.id} className="relative">
                <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-primary border-2 border-white ring-2 ring-primary/20"></div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                  <span className="font-bold text-textMain">{h.new_status}</span>
                  <span className="text-[11px] font-mono text-textMuted">
                    {new Date(h.created_at).toLocaleString('id-ID')}
                  </span>
                </div>
                <p className="text-xs text-textSec mt-1 leading-relaxed">{h.reason}</p>
                <span className="text-[10px] text-textMuted font-semibold mt-1 inline-block">
                  Oleh: {h.changed_by_name} ({h.changed_by_role})
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* TANGGAPAN DAN FORM RESPONS WARGA */}
        <div className="bg-white rounded-lg shadow-card border border-lineBorder p-6">
          <h3 className="font-heading font-bold text-sm text-textMain mb-4 pb-2 border-b border-lineBorder flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-600" />
            <span>Tanggapan &amp; Klarifikasi</span>
          </h3>

          {/* Comments List */}
          <div className="space-y-3 mb-6">
            {complaint.comments && complaint.comments.length > 0 ? (
              complaint.comments
                .filter((c) => !c.is_internal_only)
                .map((c) => (
                  <div key={c.id} className="p-3.5 rounded bg-slate-50 border border-slate-200 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-textMain">
                        {c.user_name} ({c.user_role})
                      </span>
                      <span className="text-[10px] font-mono text-textMuted">
                        {new Date(c.created_at).toLocaleString('id-ID')}
                      </span>
                    </div>
                    <p className="text-textSec mt-1 leading-relaxed">{c.comment}</p>
                  </div>
                ))
            ) : (
              <p className="text-xs text-textMuted">Belum ada tanggapan atau catatan publik pada tiket ini.</p>
            )}
          </div>

          {msg && (
            <div className="mb-4 p-3 rounded bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
              {msg}
            </div>
          )}

          {/* Form to add info/response */}
          <form onSubmit={handleSendResponse} className="space-y-3">
            <label className="block text-xs font-bold text-textMain">
              Tambahkan Informasi atau Klarifikasi Tambahan
            </label>
            <textarea
              rows={3}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Tuliskan keterangan tambahan atau tanggapan terkait penanganan laporan Anda di sini..."
              className="w-full p-3 rounded border border-lineBorder bg-slate-50 text-xs text-textMain focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary"
            ></textarea>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting || !commentText.trim()}
                className="h-9 px-4 rounded bg-primary hover:bg-primary-hover text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{submitting ? 'Mengirim...' : 'Kirim Tanggapan'}</span>
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

