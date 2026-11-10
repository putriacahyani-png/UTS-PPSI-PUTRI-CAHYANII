// CivicAI Lampung - Penanganan Tiket (Workspace Petugas OPD)
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

'use client';

import React, { useState, useEffect } from 'react';
import InternalSidebar from '@/components/InternalSidebar';
import InternalHeader from '@/components/InternalHeader';
import Footer from '@/components/Footer';
import {
  Wrench,
  CheckCircle2,
  Upload,
  MessageSquare,
  Clock,
  MapPin,
  Calendar,
  AlertCircle,
  FileCheck2,
} from 'lucide-react';
import { Complaint } from '@/types';

export default function PenangananTiketPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [selectedId, setSelectedId] = useState('');
  const [progressPercent, setProgressPercent] = useState(65);
  const [comment, setComment] = useState('');
  const [proofUrl, setProofUrl] = useState(
    'https://images.unsplash.com/photo-1541888946425-d0fbb180c5f7?w=800&auto=format&fit=crop'
  );
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  const loadData = () => {
    fetch('/api/v1/complaints')
      .then((res) => res.json())
      .then((d) => {
        if (d.success) {
          const list = d.data.filter(
            (c: any) => c.status === 'ASSIGNED' || c.status === 'IN_PROGRESS' || c.status === 'RESOLVED'
          );
          setComplaints(list);
          if (list.length > 0 && !selectedId) {
            setSelectedId(list[0].id);
            setProgressPercent(list[0].progress_percent || 50);
          }
        }
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const current = complaints.find((c) => c.id === selectedId);

  const handleUpdateProgress = async (isResolve = false) => {
    if (!selectedId) return;
    setLoading(true);
    setStatusMsg('');

    try {
      const res = await fetch(`/api/v1/complaints/${selectedId}/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          progress_percent: isResolve ? 100 : progressPercent,
          comment,
          proof_photo_url: proofUrl,
          is_resolve: isResolve,
          officer_name: 'Ir. Bambang Kurniawan (Petugas OPD BMBK)',
        }),
      });
      const data = await res.json();

      if (data.success) {
        setStatusMsg(
          isResolve
            ? 'Pekerjaan dinyatakan SELESAI 100% dan bukti penyelesaian tersimpan.'
            : 'Progres penanganan berhasil diperbarui.'
        );
        setComment('');
        loadData();
      }
    } catch {
      setStatusMsg('Gagal memperbarui progres penanganan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slatebg flex">
      <InternalSidebar role="PETUGAS_OPD" userName="Ir. Bambang Kurniawan" opdName="Dinas Bina Marga & Bina Konstruksi" />

      <div className="pl-[250px] flex-1 flex flex-col justify-between min-h-screen">
        <InternalHeader
          breadcrumb="Penanganan Tiket Lapangan"
          userName="Ir. Bambang Kurniawan"
          userRole="PETUGAS_OPD"
          slaCount={14}
        />

        <main className="pt-20 pb-10 px-6 max-w-7xl w-full mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-heading font-extrabold text-2xl text-textMain tracking-tight">
                Lembar Kerja Penanganan Lapangan
              </h1>
              <p className="text-xs text-textSec mt-0.5">
                Pembaruan progres fisik, unggah bukti foto tindak lanjut, dan pengajuan penyelesaian tugas
              </p>
            </div>

            <div className="w-full sm:w-72">
              <select
                value={selectedId}
                onChange={(e) => {
                  setSelectedId(e.target.value);
                  const sel = complaints.find((c) => c.id === e.target.value);
                  if (sel) setProgressPercent(sel.progress_percent || 50);
                }}
                className="w-full h-9 px-3 rounded border border-lineBorder bg-white text-xs font-semibold text-textMain focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {complaints.map((c) => (
                  <option key={c.id} value={c.id}>
                    [{c.ticket_number}] {c.title.slice(0, 30)}...
                  </option>
                ))}
              </select>
            </div>
          </div>

          {statusMsg && (
            <div className="p-3.5 rounded bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>{statusMsg}</span>
            </div>
          )}

          {current ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Complaint & Task Brief (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-white rounded-lg border border-lineBorder p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-lineBorder">
                    <span className="font-mono text-xs font-bold text-primary">
                      {current.ticket_number}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                      {current.status}
                    </span>
                  </div>

                  <h2 className="font-heading font-bold text-base text-textMain">
                    {current.title}
                  </h2>

                  <div className="text-xs text-textSec leading-relaxed bg-slate-50 p-3 rounded border border-lineBorder">
                    {current.description}
                  </div>

                  <div className="p-3 rounded bg-slate-50 border border-slate-100 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-textMain">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{current.address}</span>
                    </div>
                    {current.landmark && (
                      <div className="text-[11px] text-textMuted pl-5">Patokan: {current.landmark}</div>
                    )}
                  </div>

                  {/* Initial Proof Photos */}
                  {current.attachments && current.attachments.length > 0 && (
                    <div>
                      <span className="text-[11px] font-bold text-textSec uppercase tracking-wider block mb-2">
                        Foto Kondisi Lapangan Awal
                      </span>
                      <div className="grid grid-cols-2 gap-3">
                        {current.attachments.map((att) => (
                          <div key={att.id} className="aspect-video rounded border border-lineBorder overflow-hidden relative">
                            <img src={att.file_url} alt={att.file_name} className="w-full h-full object-cover" />
                            <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[10px] px-2 py-0.5 truncate font-mono">
                              {att.attachment_type}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Update Progress Slider & Actions (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white rounded-lg border border-lineBorder p-6 shadow-xs space-y-5">
                  <h3 className="font-heading font-bold text-sm text-textMain pb-3 border-b border-lineBorder">
                    Pembaruan Progres Tindak Lanjut
                  </h3>

                  {/* Progress Range Slider (matches Design.md Line 9900) */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-textSec">Tingkat Kemajuan Fisik</span>
                      <span className="font-mono font-bold text-primary text-sm">
                        {progressPercent}% Selesai
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={progressPercent}
                      onChange={(e) => setProgressPercent(Number(e.target.value))}
                      className="w-full accent-primary h-2 bg-slate-200 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-textMuted font-mono">
                      <span>0% Mulai</span>
                      <span>50% Lapangan</span>
                      <span>100% Tuntas</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-textSec mb-1">
                      Catatan Penanganan Teknis
                    </label>
                    <textarea
                      rows={3}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Contoh: Telah dilakukan penambalan aspal hotmix dan pemadatan roller pada 3 titik lubang jalan..."
                      className="w-full p-2.5 rounded border border-lineBorder bg-slate-50 text-xs text-textMain focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-textSec mb-1">
                      Foto Bukti Hasil Penanganan (URL / Berkas)
                    </label>
                    <input
                      type="text"
                      value={proofUrl}
                      onChange={(e) => setProofUrl(e.target.value)}
                      className="w-full h-9 px-3 rounded border border-lineBorder bg-slate-50 text-xs text-textMain focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary mb-2"
                    />
                    {proofUrl && (
                      <div className="aspect-video rounded border border-lineBorder overflow-hidden">
                        <img src={proofUrl} alt="Bukti Penanganan" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>

                  <div className="pt-2 space-y-2">
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => handleUpdateProgress(false)}
                      className="w-full h-10 rounded bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span>Simpan Progres ({progressPercent}%)</span>
                    </button>

                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => handleUpdateProgress(true)}
                      className="w-full h-10 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Ajukan Penyelesaian Tuntas (100%)</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-lineBorder p-12 text-center text-xs text-textMuted">
              Tidak ada pengaduan yang sedang dalam penanganan unit Anda.
            </div>
          )}
        </main>

        <Footer className="border-t border-lineBorder" />
      </div>
    </div>
  );
}

