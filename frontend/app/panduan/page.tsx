// CivicAI Lampung - Panduan Pengguna & FAQ
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import EmergencyBanner from '@/components/EmergencyBanner';
import Footer from '@/components/Footer';
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  FileText,
  Search,
  CheckCircle2,
  Clock,
  Shield,
  PhoneCall,
  Sparkles,
} from 'lucide-react';

export default function PanduanPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const statuses = [
    {
      code: 'SUBMITTED',
      name: 'Menunggu Verifikasi',
      desc: 'Laporan telah berhasil dikirim oleh warga dan masuk ke antrean verifikasi Pemprov Lampung.',
      color: 'bg-slate-100 text-slate-800 border-slate-200',
    },
    {
      code: 'UNDER_REVIEW',
      name: 'Sedang Diperiksa',
      desc: 'Petugas verifikator sedang memeriksa keabsahan materi, foto, serta batas kewenangan wilayah OPD.',
      color: 'bg-amber-100 text-amber-800 border-amber-200',
    },
    {
      code: 'NEEDS_INFORMATION',
      name: 'Perlu Kelengkapan Informasi',
      desc: 'Data laporan belum lengkap (misal: koordinat kurang jelas atau bukti foto kabur). Warga dapat melengkapi data.',
      color: 'bg-orange-100 text-orange-800 border-orange-200',
    },
    {
      code: 'VERIFIED',
      name: 'Terverifikasi Valid',
      desc: 'Laporan dinyatakan sah dan memenuhi kriteria untuk ditindaklanjuti oleh perangkat daerah.',
      color: 'bg-blue-100 text-blue-800 border-blue-200',
    },
    {
      code: 'ASSIGNED',
      name: 'Ditugaskan ke OPD',
      desc: 'Laporan telah didistribusikan ke dinas teknis penanggung jawab (misal: Dinas BMBK, Dinkes, DLH) dengan target SLA.',
      color: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    },
    {
      code: 'IN_PROGRESS',
      name: 'Dalam Penanganan Lapangan',
      desc: 'Tim teknis atau satgas dinas terkait sedang melakukan pekerjaan perbaikan atau penanganan di lokasi.',
      color: 'bg-amber-100 text-amber-800 border-amber-200',
    },
    {
      code: 'RESOLVED',
      name: 'Selesai Ditindaklanjuti',
      desc: 'Pekerjaan telah rampung tuntas dan bukti perbaikan telah diunggah oleh petugas OPD.',
      color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    },
    {
      code: 'REJECTED',
      name: 'Ditolak dengan Alasan',
      desc: 'Laporan tidak dapat diproses (misal: bukan kewenangan pemprov, duplikat, atau mengandung unsur hoax).',
      color: 'bg-rose-100 text-rose-800 border-rose-200',
    },
  ];

  const faqs = [
    {
      q: 'Berapa lama laporan saya akan diverifikasi oleh petugas?',
      a: 'Verifikasi tahap awal dilakukan dalam waktu maksimal 1x24 jam kerja. Anda akan menerima notifikasi status segera setelah laporan selesai diverifikasi.',
    },
    {
      q: 'Apakah identitas saya aman saat menyampaikan pengaduan?',
      a: 'Sangat aman. CivicAI menerapkan proteksi privasi ketat. Anda dapat memilih opsi "Anonim Publik" agar nama Anda disamarkan di halaman publik. Data nomor telepon, NIK, dan email pelapor tidak pernah dibagikan kepada publik.',
    },
    {
      q: 'Bagaimana peran AI di dalam sistem CivicAI Lampung?',
      a: 'AI hanya berfungsi sebagai alat bantu (advisory). AI memberikan saran klasifikasi kategori, mendeteksi potensi duplikat, dan mengusulkan prioritas. Keputusan akhir untuk menerima, menugaskan, atau menolak laporan selalu diambil oleh petugas manusia berwenang.',
    },
    {
      q: 'Apa yang harus dilakukan jika terjadi kondisi darurat yang mengancam nyawa?',
      a: 'CivicAI BUKAN kanal gawat darurat instan. Untuk kondisi kebakaran, kecelakaan fatal, atau ancaman keselamatan jiwa, segera hubungi layanan panggilan darurat 112 (bebas pulsa dan beroperasi 24 jam).',
    },
    {
      q: 'Bagaimana cara menambahkan data jika status laporan "Perlu Kelengkapan"?',
      a: 'Masuk ke menu "Pengaduan Saya" di Portal Warga, buka rincian tiket terkait, dan gunakan formulir tanggapan untuk menambahkan penjelasan atau mengunggah bukti tambahan yang diminta.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slatebg">
      <Navbar />
      <EmergencyBanner />

      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-10">
        <div>
          <span className="text-xs font-mono font-bold text-primary uppercase tracking-wider bg-primary-tint px-2.5 py-1 rounded">
            PANDUAN RESMI CIVICAI
          </span>
          <h1 className="mt-2 font-heading font-extrabold text-2xl sm:text-3xl text-textMain tracking-tight">
            Panduan Pengguna &amp; Tata Cara Pengaduan
          </h1>
          <p className="mt-1 text-xs text-textSec">
            Informasi lengkap mengenai alur penanganan, arti status laporan, serta pertanyaan umum masyarakat
          </p>
        </div>

        {/* 4 LANGKAH PENGADUAN */}
        <section className="bg-white rounded-lg shadow-xs border border-lineBorder p-6">
          <h2 className="font-heading font-bold text-base text-textMain mb-4 pb-2 border-b border-lineBorder">
            Tata Cara Menyampaikan Pengaduan
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded bg-slate-50 border border-slate-100 space-y-1.5">
              <div className="font-bold text-textMain flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-primary text-white text-[11px] flex items-center justify-center font-mono">1</span>
                <span>Tuliskan Masalah Secara Jelas</span>
              </div>
              <p className="text-textSec leading-relaxed">
                Jelaskan apa kerusakan atau keluhan yang dialami, jalan/fasilitas apa yang terdampak, serta seberapa besar dampaknya bagi warga sekitar.
              </p>
            </div>

            <div className="p-4 rounded bg-slate-50 border border-slate-100 space-y-1.5">
              <div className="font-bold text-textMain flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-primary text-white text-[11px] flex items-center justify-center font-mono">2</span>
                <span>Tentukan Titik Lokasi &amp; GPS</span>
              </div>
              <p className="text-textSec leading-relaxed">
                Pilih Kabupaten/Kota di Lampung, masukkan alamat lengkap, dan manfaatkan tombol GPS untuk mencatat koordinat lintang dan bujur lokasi.
              </p>
            </div>

            <div className="p-4 rounded bg-slate-50 border border-slate-100 space-y-1.5">
              <div className="font-bold text-textMain flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-primary text-white text-[11px] flex items-center justify-center font-mono">3</span>
                <span>Unggah Foto Bukti Aktual</span>
              </div>
              <p className="text-textSec leading-relaxed">
                Lampirkan foto kondisi riil di lapangan. Foto yang jelas mempermudah tim dinas menentukan kebutuhan alat dan material perbaikan.
              </p>
            </div>

            <div className="p-4 rounded bg-slate-50 border border-slate-100 space-y-1.5">
              <div className="font-bold text-textMain flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-primary text-white text-[11px] flex items-center justify-center font-mono">4</span>
                <span>Simpan Nomor Tiket &amp; Pantau</span>
              </div>
              <p className="text-textSec leading-relaxed">
                Sistem akan menerbitkan nomor tiket unik (format TKT-YYYYMMDD-XXXX). Anda dapat memantau setiap langkah penanganan lewat portal.
              </p>
            </div>
          </div>
        </section>

        {/* ARTI STATUS LAPORAN */}
        <section className="bg-white rounded-lg shadow-xs border border-lineBorder p-6">
          <h2 className="font-heading font-bold text-base text-textMain mb-4 pb-2 border-b border-lineBorder">
            Penjelasan Arti Status Pengaduan
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {statuses.map((st, i) => (
              <div key={i} className="p-3.5 rounded border border-lineBorder bg-slate-50 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono border ${st.color}`}>
                      {st.name}
                    </span>
                    <span className="text-[10px] font-mono text-textMuted">{st.code}</span>
                  </div>
                  <p className="text-textSec mt-1 leading-relaxed text-[11px]">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ACCORDION FAQ */}
        <section className="bg-white rounded-lg shadow-xs border border-lineBorder p-6">
          <h2 className="font-heading font-bold text-base text-textMain mb-4 pb-2 border-b border-lineBorder">
            Tanya Jawab Seputar Layanan (FAQ)
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="border border-lineBorder rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left font-bold text-xs text-textMain bg-slate-50 hover:bg-slate-100 flex items-center justify-between transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-textSec" /> : <ChevronDown className="w-4 h-4 text-textSec" />}
                  </button>
                  {isOpen && (
                    <div className="p-4 bg-white text-xs text-textSec leading-relaxed border-t border-lineBorder">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

