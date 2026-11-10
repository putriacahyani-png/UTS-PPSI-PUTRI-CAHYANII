// CivicAI Lampung - Pengaduan Berhasil Dikirim
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CheckCircle2, Copy, Check, Search, ArrowRight, Home, ShieldCheck } from 'lucide-react';

function ReceiptContent() {
  const searchParams = useSearchParams();
  const ticket = searchParams.get('ticket') || 'TKT-20261110-1047';
  const title = searchParams.get('title') || 'Laporan Pengaduan Baru';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(ticket);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-xl w-full bg-white rounded-lg shadow-card border border-lineBorder p-8 text-center">
      <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
        PENGADUAN BERHASIL DITERBITKAN
      </span>

      <h1 className="mt-3 font-heading font-extrabold text-2xl text-textMain tracking-tight">
        Laporan Telah Masuk ke Sistem
      </h1>
      <p className="mt-1 text-xs text-textSec max-w-md mx-auto">
        Pengaduan Anda telah tercatat secara resmi di basis data Pemerintah Provinsi Lampung dan siap diperiksa oleh
        petugas verifikator.
      </p>

      {/* TICKET BOX */}
      <div className="mt-6 p-5 rounded-lg bg-slate-50 border border-lineBorder text-left space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-textMuted uppercase tracking-wider">
            Nomor Registrasi Tiket
          </span>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-hover px-2 py-1 rounded bg-white border border-lineBorder shadow-2xs transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Tersalin</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Salin Tiket</span>
              </>
            )}
          </button>
        </div>

        <div className="font-mono font-bold text-2xl text-primary tracking-wide bg-white p-3 rounded border border-lineBorder">
          {ticket}
        </div>

        <div className="text-xs text-textSec">
          <strong>Perihal:</strong> {decodeURIComponent(title)}
        </div>

        <div className="text-[11px] text-textMuted flex items-center justify-between pt-2 border-t border-slate-200">
          <span>Waktu Pendaftaran: {new Date().toLocaleString('id-ID')}</span>
          <span className="text-emerald-700 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Tersimpan di PostgreSQL</span>
          </span>
        </div>
      </div>

      {/* INSTRUCTIONS */}
      <div className="mt-6 p-4 rounded-lg bg-blue-50/60 border border-blue-200/80 text-left text-xs text-blue-900 space-y-1.5">
        <div className="font-bold">Langkah Selanjutnya:</div>
        <ul className="list-disc list-inside space-y-1 text-blue-800 text-[11px]">
          <li>Simpan nomor tiket di atas untuk melacak perkembangan penanganan aduan.</li>
          <li>Petugas verifikator akan meninjau laporan Anda dalam kurun waktu 1x24 jam.</li>
          <li>Notifikasi progres akan dikirimkan langsung ke dashboard akun warga Anda.</li>
        </ul>
      </div>

      {/* ACTIONS */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href={`/lacak?ticket=${encodeURIComponent(ticket)}`}
          className="w-full sm:w-auto h-10 px-5 rounded bg-primary hover:bg-primary-hover text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
        >
          <Search className="w-4 h-4" />
          <span>Pantau Status Aduan Ini</span>
        </Link>

        <Link
          href="/warga/dashboard"
          className="w-full sm:w-auto h-10 px-5 rounded bg-slate-100 hover:bg-slate-200 text-textSec hover:text-textMain text-xs font-semibold flex items-center justify-center gap-2 border border-lineBorder transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Ke Dashboard Saya</span>
        </Link>
      </div>
    </div>
  );
}

export default function PengaduanBerhasilPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-slatebg">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="p-8 text-center text-xs">Memuat resi tiket...</div>}>
          <ReceiptContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

