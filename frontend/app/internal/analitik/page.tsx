// CivicAI Lampung - Analitik & Tren Eksekutif
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

'use client';

import React, { useState, useEffect } from 'react';
import InternalSidebar from '@/components/InternalSidebar';
import InternalHeader from '@/components/InternalHeader';
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
import { BarChart3, TrendingUp, Download, Calendar, ShieldCheck, Sparkles } from 'lucide-react';

export default function InternalAnalitikPage() {
  const [trends, setTrends] = useState<any[]>([]);
  const [opdPerf, setOpdPerf] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [exportNotice, setExportNotice] = useState('');

  useEffect(() => {
    fetch('/api/v1/analytics/trends')
      .then((res) => res.json())
      .then((d) => {
        if (d.success) {
          setTrends(d.data.monthlyTrends);
          setOpdPerf(d.data.opdPerformance);
          setCategories(d.data.categoryShare);
        }
      });
  }, []);

  const handleExport = (format: string) => {
    setExportNotice(`Mengekspor laporan ke format ${format.toUpperCase()}... Unduhan telah dimulai.`);
    setTimeout(() => setExportNotice(''), 4000);
  };

  return (
    <div className="min-h-screen bg-slatebg flex">
      <InternalSidebar role="PIMPINAN" userName="Drs. H. Hendra Wijaya, M.Si" opdName="Pemerintah Provinsi Lampung" />

      <div className="pl-[250px] flex-1 flex flex-col justify-between min-h-screen">
        <InternalHeader
          breadcrumb="Analitik &amp; Laporan Eksekutif"
          userName="Drs. H. Hendra Wijaya, M.Si"
          userRole="PIMPINAN"
          slaCount={14}
        />

        <main className="pt-20 pb-10 px-6 max-w-7xl w-full mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-[10px] font-mono font-bold text-primary bg-primary-tint px-2 py-0.5 rounded inline-block mb-1">
                EXECUTIVE ANALYTICS &amp; GOVERNANCE
              </div>
              <h1 className="font-heading font-extrabold text-2xl text-textMain tracking-tight">
                Analitik Kinerja Pengaduan Lintas OPD
              </h1>
              <p className="text-xs text-textSec mt-0.5">
                Evaluasi tren masalah publik, kecepatan respons dinas, dan kepatuhan SLA Provinsi Lampung
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleExport('csv')}
                className="h-9 px-3.5 rounded bg-white hover:bg-slate-50 border border-lineBorder text-xs font-semibold text-textSec flex items-center gap-1.5 shadow-2xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Ekspor CSV</span>
              </button>
              <button
                type="button"
                onClick={() => handleExport('pdf')}
                className="h-9 px-3.5 rounded bg-primary hover:bg-primary-hover text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh Laporan PDF</span>
              </button>
            </div>
          </div>

          {exportNotice && (
            <div className="p-3.5 rounded bg-blue-50 border border-blue-200 text-xs text-blue-900">
              {exportNotice}
            </div>
          )}

          {/* 4 EXECUTIVE SUMMARY CARDS */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-lg border border-lineBorder shadow-xs">
              <span className="text-textMuted text-xs font-semibold block">Rata-rata Waktu Verifikasi</span>
              <div className="font-heading font-extrabold text-2xl text-textMain mt-1">8,5 Jam</div>
              <div className="text-[11px] text-emerald-600 font-semibold mt-1">Di bawah batas SLA (24 jam)</div>
            </div>

            <div className="bg-white p-5 rounded-lg border border-lineBorder shadow-xs">
              <span className="text-textMuted text-xs font-semibold block">Rata-rata Waktu Penanganan</span>
              <div className="font-heading font-extrabold text-2xl text-emerald-600 mt-1">3,0 Hari</div>
              <div className="text-[11px] text-textSec mt-1">Standar provinsi: 5-7 hari</div>
            </div>

            <div className="bg-white p-5 rounded-lg border border-lineBorder shadow-xs">
              <span className="text-textMuted text-xs font-semibold block">Kepatuhan SLA Keseluruhan</span>
              <div className="font-heading font-extrabold text-2xl text-primary mt-1">94,2%</div>
              <div className="text-[11px] text-emerald-600 font-semibold mt-1">↑ +2.1% dari triwulan lalu</div>
            </div>

            <div className="bg-white p-5 rounded-lg border border-lineBorder shadow-xs">
              <span className="text-textMuted text-xs font-semibold block">Tingkat Laporan Duplikat</span>
              <div className="font-heading font-extrabold text-2xl text-amber-600 mt-1">3,8%</div>
              <div className="text-[11px] text-textMuted mt-1">Terdeteksi oleh NLP AI</div>
            </div>
          </div>

          {/* CHARTS ROW */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 bg-white p-6 rounded-lg border border-lineBorder shadow-xs">
              <h3 className="font-heading font-bold text-sm text-textMain mb-1">
                Tren Laporan Bulanan (Semester 2 - 2026)
              </h3>
              <p className="text-[11px] text-textMuted mb-4">Volume pengaduan masuk vs laporan selesai</p>
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

            <div className="lg:col-span-4 bg-white p-6 rounded-lg border border-lineBorder shadow-xs">
              <h3 className="font-heading font-bold text-sm text-textMain mb-1">
                Tren Kepatuhan SLA (%)
              </h3>
              <p className="text-[11px] text-textMuted mb-4">Target ketuntasan sesuai regulasi</p>
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
                      name="Kepatuhan SLA %"
                      stroke="#0D9488"
                      strokeWidth={2.5}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* OPD PERFORMANCE TABLE */}
          <div className="bg-white rounded-lg border border-lineBorder shadow-xs p-6">
            <h3 className="font-heading font-bold text-sm text-textMain mb-1">
              Evaluasi Kinerja Kecepatan Tindak Lanjut per OPD
            </h3>
            <p className="text-[11px] text-textMuted mb-4">
              Perbandingan beban penanganan dan rata-rata durasi penyelesaian di lapangan
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-lineBorder text-textMuted font-semibold text-[11px]">
                    <th className="py-2.5 px-3">PERANGKAT DAERAH (OPD)</th>
                    <th className="py-2.5 px-3">LAPORAN SELESAI</th>
                    <th className="py-2.5 px-3">SEDANG DIPROSES</th>
                    <th className="py-2.5 px-3">RATA-RATA RESPONS</th>
                    <th className="py-2.5 px-3 text-right">STATUS KINERJA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-lineBorder">
                  {opdPerf.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-3 font-bold text-textMain">{item.name}</td>
                      <td className="py-3 px-3 font-mono font-semibold text-emerald-700">
                        {item.selesai} Laporan
                      </td>
                      <td className="py-3 px-3 font-mono text-amber-700">{item.proses} Laporan</td>
                      <td className="py-3 px-3 font-mono text-textSec">{item.avg_hours} Jam</td>
                      <td className="py-3 px-3 text-right">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          SANGAT BAIK
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        <Footer className="border-t border-lineBorder" />
      </div>
    </div>
  );
}

