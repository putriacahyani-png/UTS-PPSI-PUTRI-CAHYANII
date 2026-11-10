// CivicAI Lampung - Statistik Publik
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import EmergencyBanner from '@/components/EmergencyBanner';
import Footer from '@/components/Footer';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from 'recharts';
import { BarChart3, TrendingUp, CheckCircle, Clock, ShieldCheck, Filter } from 'lucide-react';

export default function StatistikPublikPage() {
  const [trends, setTrends] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/v1/analytics/trends')
      .then((res) => res.json())
      .then((d) => {
        if (d.success) {
          setTrends(d.data.monthlyTrends);
          setCategories(d.data.categoryShare);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slatebg">
      <Navbar />
      <EmergencyBanner />

      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-primary uppercase tracking-wider bg-primary-tint px-2.5 py-1 rounded">
                TRANSPARANSI KINERJA PEMERINTAH DAERAH
              </span>
              <h1 className="mt-2 font-heading font-extrabold text-2xl sm:text-3xl text-textMain tracking-tight">
                Statistik &amp; Analitik Pengaduan Masyarakat
              </h1>
              <p className="mt-1 text-xs text-textSec">
                Data agregat penanganan laporan di seluruh wilayah kerja Pemerintah Provinsi Lampung
              </p>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-mono text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>TERHUBUNG DATA RESMI PEMPROV</span>
            </div>
          </div>
        </div>

        {/* TOP KPI CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-lg border border-lineBorder shadow-xs">
            <span className="text-textMuted text-xs font-semibold block">Total Pengaduan Masuk</span>
            <div className="font-heading font-extrabold text-2xl text-textMain mt-1">1.284</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">↑ +14% dari bulan lalu</div>
          </div>

          <div className="bg-white p-5 rounded-lg border border-lineBorder shadow-xs">
            <span className="text-textMuted text-xs font-semibold block">Laporan Ditangani Tuntas</span>
            <div className="font-heading font-extrabold text-2xl text-emerald-600 mt-1">782</div>
            <div className="text-[11px] text-textSec mt-1">Tingkat penyelesaian 60.9%</div>
          </div>

          <div className="bg-white p-5 rounded-lg border border-lineBorder shadow-xs">
            <span className="text-textMuted text-xs font-semibold block">Dalam Tindak Lanjut OPD</span>
            <div className="font-heading font-extrabold text-2xl text-amber-600 mt-1">298</div>
            <div className="text-[11px] text-textSec mt-1">Sedang pengerjaan fisik</div>
          </div>

          <div className="bg-white p-5 rounded-lg border border-lineBorder shadow-xs">
            <span className="text-textMuted text-xs font-semibold block">Kepatuhan Target SLA</span>
            <div className="font-heading font-extrabold text-2xl text-primary mt-1">94.2%</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">Tuntas sebelum deadline</div>
          </div>
        </div>

        {/* CHARTS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Monthly Trend Chart */}
          <div className="lg:col-span-8 bg-white p-6 rounded-lg border border-lineBorder shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-lineBorder">
              <div>
                <h3 className="font-heading font-bold text-sm text-textMain">
                  Tren Laporan Masuk vs Penanganan Tuntas
                </h3>
                <p className="text-[11px] text-textMuted">Perbandingan per bulan tahun 2026</p>
              </div>
              <span className="text-[10px] font-mono text-primary bg-primary-tint px-2 py-0.5 rounded">
                6 Bulan Terakhir
              </span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderColor: '#e2e8f0',
                      borderRadius: '8px',
                      fontSize: '11px',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  <Bar dataKey="masuk" name="Laporan Masuk" fill="#2F5BEA" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="selesai" name="Tuntas Selesai" fill="#059669" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* SLA Adherence Trend */}
          <div className="lg:col-span-4 bg-white p-6 rounded-lg border border-lineBorder shadow-xs">
            <div className="mb-4 pb-3 border-b border-lineBorder">
              <h3 className="font-heading font-bold text-sm text-textMain">
                Kepatuhan SLA (%)
              </h3>
              <p className="text-[11px] text-textMuted">Persentase tiket sesuai tenggat waktu</p>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis domain={[80, 100]} tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderColor: '#e2e8f0',
                      borderRadius: '8px',
                      fontSize: '11px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="sla_adherence"
                    name="SLA Adherence %"
                    stroke="#7C3AED"
                    strokeWidth={2.5}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* CATEGORY BREAKDOWN TABLE */}
        <div className="bg-white rounded-lg border border-lineBorder shadow-xs p-6">
          <div className="mb-4 pb-3 border-b border-lineBorder">
            <h3 className="font-heading font-bold text-sm text-textMain">
              Sebaran Laporan Berdasarkan Kategori Layanan
            </h3>
            <p className="text-[11px] text-textMuted">Total laporan terdaftar di seluruh OPD Provinsi Lampung</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((c, i) => (
              <div key={i} className="p-3.5 rounded bg-slate-50 border border-slate-100 flex items-center justify-between">
                <span className="text-xs font-medium text-textMain truncate pr-2">{c.name}</span>
                <span className="font-mono text-xs font-bold text-primary bg-primary-tint px-2 py-0.5 rounded">
                  {c.count} Aduan
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

