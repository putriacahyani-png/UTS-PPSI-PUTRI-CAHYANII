// CivicAI Lampung - Saran AI (Human-in-the-Loop Advisory Center)
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import InternalSidebar from '@/components/InternalSidebar';
import InternalHeader from '@/components/InternalHeader';
import Footer from '@/components/Footer';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Copy,
  AlertTriangle,
  ArrowRight,
  HelpCircle,
  BrainCircuit,
} from 'lucide-react';
import { Complaint } from '@/types';

export default function SaranAIPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetch('/api/v1/complaints')
      .then((res) => res.json())
      .then((d) => {
        if (d.success) setComplaints(d.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleActionAI = (ticketNo: string, action: string) => {
    setMsg(`Rekomendasi AI untuk tiket ${ticketNo} telah ${action === 'ACCEPT' ? 'diterima' : 'dikesampingkan'}.`);
    setTimeout(() => setMsg(''), 4000);
  };

  return (
    <div className="min-h-screen bg-slatebg flex">
      <InternalSidebar role="VERIFIKATOR" userName="Siti Rahmawati, S.Sos" opdName="Diskominfotik Prov. Lampung" />

      <div className="pl-[250px] flex-1 flex flex-col justify-between min-h-screen">
        <InternalHeader
          breadcrumb="Saran AI (Advisory Only)"
          userName="Siti Rahmawati, S.Sos"
          userRole="VERIFIKATOR"
          slaCount={14}
        />

        <main className="pt-20 pb-10 px-6 max-w-7xl w-full mx-auto space-y-6">
          <div className="bg-gradient-to-r from-purple-900 to-indigo-950 text-white rounded-lg p-6 shadow-card">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-ai-violet/40 text-purple-200 text-[11px] font-mono font-bold mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>HUMAN-IN-THE-LOOP · ADVISORY ONLY</span>
                </div>
                <h1 className="font-heading font-extrabold text-2xl tracking-tight">
                  Pusat Rekomendasi Kecerdasan Buatan (AI)
                </h1>
                <p className="text-xs text-purple-200 mt-1 max-w-2xl leading-relaxed">
                  Model AI memprediksi klasifikasi kategori, mendeteksi potensi duplikasi laporan berdasarkan kedekatan
                  lokasi dan kemiripan teks, serta menyarankan tingkat prioritas. Seluruh keluaran AI bersifat pendukung
                  dan memerlukan konfirmasi petugas berwenang.
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-purple-300 block">Model Version</span>
                <span className="font-mono font-bold text-sm text-white">CivicAI-NLP-v2.6</span>
              </div>
            </div>
          </div>

          {msg && (
            <div className="p-3.5 rounded bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
              {msg}
            </div>
          )}

          {/* AI ADVISORY CARDS GRID */}
          <div className="space-y-4">
            {loading ? (
              <div className="py-12 text-center text-xs text-textMuted bg-white rounded-lg border border-lineBorder">
                Memuat rekomendasi model AI...
              </div>
            ) : (
              complaints.map((c) => (
                <div
                  key={c.id}
                  className="bg-white rounded-lg border border-lineBorder p-5 shadow-xs hover:border-purple-300 transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-lineBorder">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-primary">
                        {c.ticket_number}
                      </span>
                      <span className="font-bold text-xs text-textMain">{c.title}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-mono font-bold">
                      <span className="text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                        Match {( (c.ai_prediction?.confidence || 0.95) * 100).toFixed(0)}%
                      </span>
                      <span className="text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                        Prioritas {c.ai_prediction?.suggested_priority || 'MEDIUM'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 rounded bg-slate-50 border border-slate-100">
                      <span className="text-textMuted text-[10px] block font-semibold">Prediksi Kategori AI</span>
                      <span className="font-bold text-primary">{c.ai_prediction?.category_name || c.category_name}</span>
                    </div>

                    <div className="p-3 rounded bg-slate-50 border border-slate-100">
                      <span className="text-textMuted text-[10px] block font-semibold">Potensi Duplikasi Laporan</span>
                      {c.ai_prediction?.duplicate_candidates && c.ai_prediction.duplicate_candidates.length > 0 ? (
                        <span className="font-bold text-rose-600">
                          {c.ai_prediction.duplicate_candidates.length} Tiket Serupa (Radius &lt; 500m)
                        </span>
                      ) : (
                        <span className="font-semibold text-emerald-600">Laporan Tunggal / Unik</span>
                      )}
                    </div>

                    <div className="p-3 rounded bg-slate-50 border border-slate-100">
                      <span className="text-textMuted text-[10px] block font-semibold">Faktor Penilaian Prioritas</span>
                      <span className="text-textSec text-[11px]">
                        {c.ai_prediction?.factors ? c.ai_prediction.factors.join(', ') : 'Infrastruktur jalan utama'}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-textSec leading-relaxed">
                    <strong>Penjelasan Model:</strong> {c.ai_prediction?.explanation || 'Dianalisis dari kemiripan kata kunci judul dan foto bukti.'}
                  </p>

                  <div className="pt-2 flex items-center justify-between">
                    <Link
                      href={`/internal/laporan/${c.id}`}
                      className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                    >
                      <span>Buka Detail Verifikasi</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleActionAI(c.ticket_number, 'ACCEPT')}
                        className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
                      >
                        Terima Saran
                      </button>
                      <button
                        type="button"
                        onClick={() => handleActionAI(c.ticket_number, 'IGNORE')}
                        className="px-3 py-1 rounded bg-slate-100 hover:bg-slate-200 text-textSec text-xs font-semibold border border-lineBorder transition-colors"
                      >
                        Abaikan / Override
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>

        <Footer className="border-t border-lineBorder" />
      </div>
    </div>
  );
}

