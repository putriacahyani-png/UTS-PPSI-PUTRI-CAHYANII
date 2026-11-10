// CivicAI Lampung - Detail Laporan Verifikasi
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import InternalSidebar from '@/components/InternalSidebar';
import InternalHeader from '@/components/InternalHeader';
import Footer from '@/components/Footer';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  MapPin,
  Clock,
  User,
  Phone,
  Mail,
  Send,
  AlertTriangle,
  FolderSync,
  UserCheck,
} from 'lucide-react';
import { Complaint, Category } from '@/types';

export default function DetailLaporanVerifikasiPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal Action State
  const [modalType, setModalType] = useState<'ACCEPT' | 'REJECT' | 'NEEDS_INFORMATION' | 'CHANGE_CATEGORY' | null>(null);
  const [reason, setReason] = useState('');
  const [selectedCatId, setSelectedCatId] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  const loadData = () => {
    fetch(`/api/v1/complaints/${id}`)
      .then((res) => res.json())
      .then((d) => {
        if (d.success) setComplaint(d.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));

    fetch('/api/v1/references')
      .then((res) => res.json())
      .then((d) => {
        if (d.success) setCategories(d.data.categories);
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (id) loadData();
  }, [id]);

  const handleActionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalType) return;
    setActionLoading(true);
    setStatusMsg('');

    try {
      const res = await fetch(`/api/v1/complaints/${id}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: modalType,
          reason,
          category_id: selectedCatId || undefined,
          verifier_name: 'Siti Rahmawati, S.Sos',
        }),
      });
      const data = await res.json();

      if (data.success) {
        setStatusMsg('Tindakan verifikasi berhasil dieksekusi.');
        setModalType(null);
        setReason('');
        loadData();
      } else {
        setStatusMsg(data.message || 'Gagal memproses tindakan.');
      }
    } catch {
      setStatusMsg('Terjadi kesalahan jaringan.');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slatebg flex">
        <InternalSidebar role="VERIFIKATOR" />
        <div className="pl-[250px] flex-1 flex flex-col justify-between">
          <main className="py-20 text-center text-xs text-textMuted">Memuat data pengaduan...</main>
          <Footer />
        </div>
      </div>
    );
  }

  if (!complaint) {
    return (
      <div className="min-h-screen bg-slatebg flex">
        <InternalSidebar role="VERIFIKATOR" />
        <div className="pl-[250px] flex-1 flex flex-col justify-between">
          <main className="py-20 text-center text-xs text-rose-600">Laporan tidak ditemukan.</main>
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slatebg flex">
      <InternalSidebar role="VERIFIKATOR" userName="Siti Rahmawati, S.Sos" opdName="Diskominfotik Prov. Lampung" />

      <div className="pl-[250px] flex-1 flex flex-col justify-between min-h-screen">
        <InternalHeader
          breadcrumb="Detail Laporan Verifikasi"
          userName="Siti Rahmawati, S.Sos"
          userRole="VERIFIKATOR"
          slaCount={14}
        />

        <main className="pt-20 pb-10 px-6 max-w-7xl w-full mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <Link
              href="/internal/antrean"
              className="text-xs text-textMuted hover:text-textMain flex items-center gap-1 font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Antrean Verifikasi</span>
            </Link>

            <span className="font-mono text-xs font-bold text-primary bg-primary-tint px-2.5 py-1 rounded">
              {complaint.ticket_number}
            </span>
          </div>

          {statusMsg && (
            <div className="p-3.5 rounded bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
              {statusMsg}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* LEFT COLUMN: Complaint & Evidence (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Header Box */}
              <div className="bg-white rounded-lg border border-lineBorder p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-lineBorder">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-textMuted">
                    RINCIAN PERMASALAHAN
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      complaint.status === 'RESOLVED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : complaint.status === 'VERIFIED'
                        ? 'bg-blue-100 text-blue-800'
                        : complaint.status === 'REJECTED'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {complaint.status}
                  </span>
                </div>

                <h1 className="font-heading font-extrabold text-xl text-textMain">
                  {complaint.title}
                </h1>

                <div className="text-xs text-textSec leading-relaxed bg-slate-50 p-4 rounded border border-lineBorder">
                  {complaint.description}
                </div>

                {/* Location */}
                <div className="p-3.5 rounded bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center gap-2 font-bold text-textMain">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{complaint.address}</span>
                  </div>
                  <div className="text-[11px] text-textMuted pl-6">
                    Wilayah: <strong>{complaint.region_name}</strong> | Patokan: {complaint.landmark || '-'}
                  </div>
                  <div className="text-[11px] font-mono text-textMuted pl-6">
                    Koordinat: {complaint.latitude}, {complaint.longitude}
                  </div>
                </div>

                {/* Attachments */}
                {complaint.attachments && complaint.attachments.length > 0 && (
                  <div>
                    <span className="text-[11px] font-bold text-textSec uppercase tracking-wider block mb-2">
                      Foto Bukti Lapangan dari Pelapor ({complaint.attachments.length})
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {complaint.attachments.map((att) => (
                        <div key={att.id} className="aspect-video rounded border border-lineBorder overflow-hidden relative group">
                          <img src={att.file_url} alt={att.file_name} className="w-full h-full object-cover" />
                          <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[10px] px-2 py-0.5 truncate font-mono">
                            {att.file_name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* ACTION BUTTONS BAR */}
              <div className="bg-white rounded-lg border border-lineBorder p-5 shadow-xs space-y-3">
                <span className="text-[10px] font-bold text-textMuted uppercase tracking-wider block">
                  KEPUTUSAN VERIFIKASI RESMI
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setModalType('ACCEPT');
                      setReason('Data lengkap dan kewenangan Pemerintah Provinsi Lampung valid.');
                    }}
                    className="h-10 px-4 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Terima Laporan</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setModalType('NEEDS_INFORMATION');
                      setReason('');
                    }}
                    className="h-10 px-4 rounded bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span>Minta Info Tambahan</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setModalType('CHANGE_CATEGORY');
                      setReason('');
                    }}
                    className="h-10 px-4 rounded bg-slate-100 hover:bg-slate-200 text-textMain text-xs font-semibold flex items-center gap-1.5 border border-lineBorder transition-colors"
                  >
                    <FolderSync className="w-4 h-4" />
                    <span>Ganti Kategori</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setModalType('REJECT');
                      setReason('');
                    }}
                    className="h-10 px-4 rounded bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center gap-1.5 border border-rose-200 transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Tolak Laporan</span>
                  </button>

                  <Link
                    href={`/internal/penugasan?id=${complaint.id}`}
                    className="h-10 px-4 rounded bg-primary hover:bg-primary-hover text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors ml-auto"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>Teruskan Penugasan OPD</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: AI Recommendation & Citizen Profile (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* AI RECOMMENDATION WIDGET (PRD AI-01, AI-05 Human in the loop) */}
              <div className="bg-gradient-to-br from-purple-50 via-white to-slate-50 rounded-lg border border-purple-200 p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-ai-violet">
                    <Sparkles className="w-4 h-4" />
                    <span>REKOMENDASI AI</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-purple-100 text-purple-800">
                    ADVISORY ONLY
                  </span>
                </div>

                <div className="text-xs space-y-2 pt-1">
                  <div>
                    <span className="text-textMuted text-[10px] block">Kategori yang Disarankan:</span>
                    <span className="font-bold text-textMain">{complaint.ai_prediction?.category_name}</span>
                    <div className="text-[10px] text-emerald-700 font-mono font-semibold">
                      Tingkat Akurasi: {((complaint.ai_prediction?.confidence || 0.94) * 100).toFixed(0)}%
                    </div>
                  </div>

                  <div>
                    <span className="text-textMuted text-[10px] block">Rekomendasi Tingkat Prioritas:</span>
                    <span className="font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 font-mono text-[11px]">
                      {complaint.ai_prediction?.suggested_priority || 'HIGH'}
                    </span>
                  </div>

                  <div>
                    <span className="text-textMuted text-[10px] block">Penjelasan Faktor AI:</span>
                    <p className="text-[11px] text-textSec leading-relaxed">
                      {complaint.ai_prediction?.explanation}
                    </p>
                  </div>
                </div>
              </div>

              {/* CITIZEN PROFILE ACCORDING TO VERIFIER SCOPE */}
              <div className="bg-white rounded-lg border border-lineBorder p-5 shadow-xs space-y-3">
                <span className="text-[10px] font-bold text-textMuted uppercase tracking-wider block">
                  PROFIL LENGKAP PELAPOR
                </span>
                <div className="text-xs space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-textMuted" />
                    <span className="font-bold text-textMain">{complaint.citizen_name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-textMuted" />
                    <span className="font-mono text-textSec">{complaint.citizen_phone || '0812-7890-1234'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-textMuted" />
                    <span className="text-textSec">{complaint.citizen_email || 'warga@lampung.go.id'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* MODAL ACTION HANDLER */}
        {modalType && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-card border border-lineBorder max-w-md w-full p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-lineBorder">
                <h3 className="font-heading font-bold text-sm text-textMain">
                  Konfirmasi Tindakan: {modalType}
                </h3>
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="text-textMuted hover:text-textMain text-sm"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleActionSubmit} className="space-y-3 text-xs">
                {modalType === 'CHANGE_CATEGORY' && (
                  <div>
                    <label className="block text-xs font-semibold text-textSec mb-1">
                      Pilih Kategori Baru
                    </label>
                    <select
                      value={selectedCatId}
                      onChange={(e) => setSelectedCatId(e.target.value)}
                      className="w-full h-10 px-3 rounded border border-lineBorder bg-slate-50 text-xs text-textMain"
                      required
                    >
                      <option value="">-- Pilih Kategori --</option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-textSec mb-1">
                    Catatan / Alasan Keputusan Verifikasi <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Tuliskan alasan lengkap tindakan ini..."
                    className="w-full p-2.5 rounded border border-lineBorder bg-slate-50 text-xs text-textMain focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary"
                  ></textarea>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setModalType(null)}
                    className="px-4 py-2 rounded border border-lineBorder bg-slate-100 text-xs font-semibold text-textSec hover:text-textMain"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="px-4 py-2 rounded bg-primary hover:bg-primary-hover text-white text-xs font-bold"
                  >
                    {actionLoading ? 'Menyimpan...' : 'Simpan Tindakan'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <Footer className="border-t border-lineBorder" />
      </div>
    </div>
  );
}

