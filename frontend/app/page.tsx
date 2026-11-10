// CivicAI Lampung - Beranda Publik
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import EmergencyBanner from '@/components/EmergencyBanner';
import Footer from '@/components/Footer';
import {
  Search,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Construction,
  Waves,
  HeartPulse,
  GraduationCap,
  Trash2,
  TrafficCone,
  Users,
  Building2,
  FileCheck2,
  Send,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [ticketInput, setTicketInput] = useState('');

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketInput.trim()) return;
    router.push(`/lacak?ticket=${encodeURIComponent(ticketInput.trim())}`);
  };

  const categories = [
    {
      title: 'Infrastruktur Jalan & Jembatan',
      desc: 'Jalan berlubang, aspal amblas, jembatan rusak atau retak pada ruas provinsi.',
      icon: Construction,
      code: 'CAT-INFRA',
    },
    {
      title: 'Drainase & Banjir',
      desc: 'Saluran air tersumbat, gorong-gorong ambrol, dan genangan air jalan raya.',
      icon: Waves,
      code: 'CAT-DRAIN',
    },
    {
      title: 'Layanan Kesehatan',
      desc: 'Pelayanan RSUD, Puskesmas keliling, ketersediaan obat, dan ambulans gawat darurat.',
      icon: HeartPulse,
      code: 'CAT-HEALTH',
    },
    {
      title: 'Pendidikan & Sekolah',
      desc: 'Kondisi gedung SMA/SMK Negeri, sarana prasarana sekolah, dan dana bantuan siswa.',
      icon: GraduationCap,
      code: 'CAT-EDU',
    },
    {
      title: 'Kebersihan & Lingkungan',
      desc: 'Timbunan sampah liar di bahu jalan, limbah industri, dan pencemaran aliran sungai.',
      icon: Trash2,
      code: 'CAT-ENV',
    },
    {
      title: 'Transportasi & Lampu Jalan',
      desc: 'Lampu PJU mati padam, rambu jalan rusak, marka hilang, dan kelayakan angkutan umum.',
      icon: TrafficCone,
      code: 'CAT-TRANS',
    },
    {
      title: 'Bansos & Masalah Sosial',
      desc: 'Penyaluran bantuan sosial, penanganan lansia terlantar, dan fasilitas disabilitas.',
      icon: Users,
      code: 'CAT-SOC',
    },
    {
      title: 'Ketertiban & Perizinan',
      desc: 'Pungli, perizinan pelayanan daerah terhambat, dan gangguan ketertiban umum.',
      icon: Building2,
      code: 'CAT-PUB',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-primary-tint selection:text-primary">
      <Navbar />
      <EmergencyBanner />

      <main className="flex-grow">
        {/* HERO SECTION with soft mesh gradient */}
        <section className="hero-mesh relative overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-lineBorder">
          <div className="absolute -top-16 -left-16 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute top-1/2 -right-16 w-96 h-96 bg-ai-violet/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Column: Copy & Primary CTAs */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-lineBorder shadow-hairline mb-5">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  <span className="text-[11px] font-semibold text-textSec tracking-wide uppercase font-mono">
                    Platform Resmi Pengaduan Publik Prov. Lampung
                  </span>
                </div>

                <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-[42px] leading-tight text-textMain tracking-tight">
                  Sampaikan Pengaduan, <br className="hidden sm:inline" />
                  <span className="bg-gradient-to-r from-primary via-primary-hover to-ai-violet bg-clip-text text-transparent">
                    Pantau Penanganannya.
                  </span>
                </h1>

                <p className="mt-4 text-base sm:text-lg text-textSec leading-relaxed max-w-2xl font-normal">
                  Satu kanal resmi terpadu untuk menyampaikan laporan infrastruktur rusak dan layanan publik di
                  wilayah Provinsi Lampung. Terhubung langsung dengan OPD penanggung jawab.
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-3.5">
                  <Link
                    href="/buat-pengaduan"
                    className="h-10 px-5 inline-flex items-center justify-center gap-2 rounded-[4px] text-[14px] font-semibold text-white bg-primary hover:bg-primary-hover active:bg-primary-pressed shadow-hairline hover:shadow-glow transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Buat Pengaduan</span>
                  </Link>
                  <Link
                    href="/lacak"
                    className="h-10 px-5 inline-flex items-center justify-center gap-2 rounded-[4px] text-[14px] font-semibold text-primary bg-primary-tint hover:bg-primary-tint2 border border-primary-tint2 transition-all"
                  >
                    <Search className="w-4 h-4" />
                    <span>Lacak Tiket</span>
                  </Link>
                  <div className="flex items-center gap-1.5 text-xs text-textMuted ml-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Validasi Human-in-the-Loop</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2.5 text-xs text-textSec">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                  </span>
                  <span>
                    Rata-rata respons verifikasi tahap awal di bawah <strong>12 jam</strong> kerja.
                  </span>
                </div>
              </div>

              {/* Right Column: Fast-Tracking Card */}
              <div className="lg:col-span-5">
                <div className="bg-white rounded-[8px] p-6 shadow-card border border-lineBorder relative">
                  <div className="flex items-center justify-between pb-4 border-b border-lineBorder">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded bg-primary-tint flex items-center justify-center text-primary">
                        <Search className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-sm text-textMain">Cek Status Aduan</h3>
                        <p className="text-[11px] text-textMuted">Pantau progres laporan Anda secara real-time</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      PUBLIK
                    </span>
                  </div>

                  <form onSubmit={handleTrackSubmit} className="mt-5">
                    <label className="block text-xs font-semibold text-textSec mb-1.5">
                      Nomor Registrasi Tiket
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={ticketInput}
                        onChange={(e) => setTicketInput(e.target.value)}
                        placeholder="Contoh: TKT-20261108-0142"
                        className="w-full h-11 pl-3.5 pr-24 rounded border border-lineBorder bg-slate-50 text-xs font-mono text-textMain focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all uppercase"
                      />
                      <button
                        type="submit"
                        className="absolute right-1.5 top-1.5 bottom-1.5 px-3.5 bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded flex items-center gap-1 transition-colors"
                      >
                        <span>Cari</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-[11px] text-textMuted">
                      <span>Format: TKT-YYYYMMDD-XXXX</span>
                      <button
                        type="button"
                        onClick={() => setTicketInput('TKT-20261108-0142')}
                        className="text-primary hover:underline font-mono"
                      >
                        Gunakan contoh demo
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS SUMMARY BAR */}
        <section className="bg-white border-b border-lineBorder py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-center gap-3.5 p-3 rounded-lg bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 rounded-md bg-blue-50 text-primary flex items-center justify-center">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-heading font-extrabold text-2xl text-textMain">1.284</div>
                  <div className="text-xs text-textSec font-medium">Laporan Diterima</div>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3 rounded-lg bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 rounded-md bg-amber-50 text-warning flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-heading font-extrabold text-2xl text-textMain">298</div>
                  <div className="text-xs text-textSec font-medium">Dalam Penanganan</div>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3 rounded-lg bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 rounded-md bg-emerald-50 text-success flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-heading font-extrabold text-2xl text-textMain">782</div>
                  <div className="text-xs text-textSec font-medium">Laporan Selesai</div>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3 rounded-lg bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 rounded-md bg-purple-50 text-ai-violet flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-heading font-extrabold text-2xl text-textMain">94,2%</div>
                  <div className="text-xs text-textSec font-medium">Kepatuhan SLA OPD</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8 KATEGORI PENGADUAN */}
        <section id="kategori" className="py-16 bg-[#F6F8FC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-mono font-bold text-primary uppercase tracking-wider bg-primary-tint px-2.5 py-1 rounded">
                Bidang Layanan Publik
              </span>
              <h2 className="mt-3 font-heading font-bold text-2xl sm:text-3xl text-textMain">
                Kategori Pengaduan Masyarakat
              </h2>
              <p className="mt-2 text-sm text-textSec">
                Pilih jenis masalah yang Anda alami di lingkungan Anda. AI akan membantu merekomendasikan OPD teknis terkait.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {categories.map((cat, idx) => {
                const IconComponent = cat.icon;
                return (
                  <Link
                    key={idx}
                    href={`/buat-pengaduan?cat=${cat.code}`}
                    className="p-5 bg-white rounded-lg border border-lineBorder hover:border-primary hover:shadow-card transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded bg-primary-tint text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h3 className="mt-4 font-heading font-bold text-sm text-textMain group-hover:text-primary transition-colors">
                        {cat.title}
                      </h3>
                      <p className="mt-1.5 text-xs text-textSec leading-relaxed">
                        {cat.desc}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-primary">
                      <span>Buat Aduan</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ALUR KERJA APLIKASI */}
        <section className="py-16 bg-white border-t border-lineBorder">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-mono font-bold text-secondary uppercase tracking-wider bg-secondary-tint px-2.5 py-1 rounded">
                Transparan &amp; Terstruktur
              </span>
              <h2 className="mt-3 font-heading font-bold text-2xl sm:text-3xl text-textMain">
                Alur Penanganan Pengaduan
              </h2>
              <p className="mt-2 text-sm text-textSec">
                Setiap laporan yang masuk diproses dengan alur resmi dan dapat dipantau oleh warga pelapor.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="p-5 rounded-lg bg-slate-50 border border-lineBorder relative">
                <div className="font-mono text-2xl font-black text-primary/40 mb-2">01</div>
                <h3 className="font-heading font-bold text-sm text-textMain mb-1">Kirim Pengaduan</h3>
                <p className="text-xs text-textSec leading-relaxed">
                  Isi formulir, unggah foto bukti lapangan, dan tentukan titik koordinat peta secara akurat.
                </p>
              </div>

              <div className="p-5 rounded-lg bg-slate-50 border border-lineBorder relative">
                <div className="font-mono text-2xl font-black text-primary/40 mb-2">02</div>
                <h3 className="font-heading font-bold text-sm text-textMain mb-1">Verifikasi &amp; AI</h3>
                <p className="text-xs text-textSec leading-relaxed">
                  AI menyarankan kategori dan prioritas. Petugas verifikator memeriksa keabsahan aduan.
                </p>
              </div>

              <div className="p-5 rounded-lg bg-slate-50 border border-lineBorder relative">
                <div className="font-mono text-2xl font-black text-primary/40 mb-2">03</div>
                <h3 className="font-heading font-bold text-sm text-textMain mb-1">Tindak Lanjut OPD</h3>
                <p className="text-xs text-textSec leading-relaxed">
                  Laporan diteruskan ke dinas teknis terkait untuk penanganan lapangan sesuai target SLA.
                </p>
              </div>

              <div className="p-5 rounded-lg bg-slate-50 border border-lineBorder relative">
                <div className="font-mono text-2xl font-black text-primary/40 mb-2">04</div>
                <h3 className="font-heading font-bold text-sm text-textMain mb-1">Tuntas &amp; Umpan Balik</h3>
                <p className="text-xs text-textSec leading-relaxed">
                  Bukti perbaikan diunggah petugas. Warga menerima notifikasi dan memberikan ulasan kepuasan.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TATA KELOLA AI (PRD Section 6) */}
        <section className="py-12 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-ai-violet/30 border border-ai-violet/40 text-xs font-mono font-medium text-purple-200 mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-purple-300" />
                  <span>PRINSIP TATA KELOLA AI (ADVISORY ONLY)</span>
                </div>
                <h3 className="font-heading font-bold text-xl sm:text-2xl tracking-tight">
                  Kecerdasan Buatan sebagai Pendukung, Keputusan Tetap pada Manusia
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  CivicAI menerapkan standar <em>Human-in-the-Loop</em>. Modul AI hanya memberikan rekomendasi
                  klasifikasi, deteksi potensi laporan duplikat, dan kalkulasi prioritas. Seluruh keputusan verifikasi,
                  penolakan, dan penugasan dilakukan oleh pejabat dan petugas berwenang Pemerintah Provinsi Lampung.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  href="/panduan#ai"
                  className="px-4 py-2.5 rounded bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors border border-white/20"
                >
                  <span>Baca Pedoman AI</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/buat-pengaduan"
                  className="px-5 py-2.5 rounded bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  Laporkan Sekarang
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

