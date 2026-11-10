// CivicAI Lampung - Peta Sebaran Laporan Publik
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import EmergencyBanner from '@/components/EmergencyBanner';
import Footer from '@/components/Footer';
import {
  MapPin,
  Search,
  Filter,
  Layers,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Compass,
} from 'lucide-react';

export default function PetaPublikPage() {
  const [complaints, setComplaints] = useState<any[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedRegion, setSelectedRegion] = useState('ALL');
  const [regions, setRegions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/v1/complaints')
      .then((res) => res.json())
      .then((d) => {
        if (d.success) {
          setComplaints(d.data);
          if (d.data.length > 0) setSelectedTicket(d.data[0]);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));

    fetch('/api/v1/references')
      .then((res) => res.json())
      .then((d) => {
        if (d.success) setRegions(d.data.regions);
      })
      .catch(() => {});
  }, []);

  const filtered = complaints.filter((c) => {
    if (selectedStatus !== 'ALL' && c.status !== selectedStatus) return false;
    if (selectedRegion !== 'ALL' && c.region_id !== selectedRegion) return false;
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slatebg">
      <Navbar />
      <EmergencyBanner />

      <main className="flex-grow py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex flex-col">
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-mono font-bold text-textMuted uppercase tracking-wider">
                GIS SPASIAL PROVINSI LAMPUNG
              </span>
            </div>
            <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-textMain tracking-tight">
              Peta Sebaran Pengaduan Publik
            </h1>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="h-9 px-3 rounded border border-lineBorder bg-white text-xs font-medium text-textMain focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="ALL">Semua Status</option>
              <option value="SUBMITTED">Menunggu Verifikasi</option>
              <option value="IN_PROGRESS">Dalam Penanganan</option>
              <option value="RESOLVED">Selesai Tuntas</option>
            </select>

            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="h-9 px-3 rounded border border-lineBorder bg-white text-xs font-medium text-textMain focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="ALL">Seluruh Kabupaten/Kota</option>
              {regions.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>

            <div className="px-3 py-1.5 rounded bg-primary-tint text-primary font-mono font-bold">
              {filtered.length} Titik Terdeteksi
            </div>
          </div>
        </div>

        {/* MAP CANVAS & PREVIEW DRAWER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-grow min-h-[500px]">
          {/* Main Visual Map Area */}
          <div className="lg:col-span-8 bg-slate-900 rounded-lg overflow-hidden border border-lineBorder relative flex flex-col justify-between p-4 shadow-card">
            {/* Ambient GIS Vector Grid */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

            {/* Top Toolbar */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2 bg-slate-800/90 backdrop-blur-md px-3 py-1.5 rounded border border-slate-700 text-white text-xs">
                <Compass className="w-4 h-4 text-primary" />
                <span className="font-mono text-[11px]">Cakupan: 15 Kab/Kota Se-Provinsi Lampung</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-800/90 backdrop-blur-md px-2 py-1 rounded border border-slate-700 text-white text-[11px]">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Data Koordinat Aktif</span>
              </div>
            </div>

            {/* Simulated Interactive Pin Cluster on SVG Map of Lampung */}
            <div className="relative z-10 my-auto py-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {filtered.map((item) => {
                  const isSelected = selectedTicket?.id === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedTicket(item)}
                      className={`p-3 rounded-lg text-left transition-all border ${
                        isSelected
                          ? 'bg-primary text-white border-white shadow-glow scale-105'
                          : 'bg-slate-800/90 text-slate-200 border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono font-bold opacity-80">
                          {item.ticket_number}
                        </span>
                        <span
                          className={`w-2 h-2 rounded-full ${
                            item.status === 'RESOLVED'
                              ? 'bg-emerald-400'
                              : item.status === 'IN_PROGRESS'
                              ? 'bg-amber-400'
                              : 'bg-blue-400'
                          }`}
                        ></span>
                      </div>
                      <div className="font-bold text-xs line-clamp-1">{item.title}</div>
                      <div className="text-[10px] opacity-75 mt-0.5 truncate">{item.region_name}</div>
                      <div className="text-[9px] font-mono mt-1 opacity-60">
                        {item.latitude.toFixed(4)}, {item.longitude.toFixed(4)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Map Legend */}
            <div className="relative z-10 flex flex-wrap items-center gap-4 text-[11px] text-slate-300 bg-slate-800/80 px-3 py-2 rounded border border-slate-700">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
                <span>Terverifikasi</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                <span>Dalam Penanganan</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span>Tuntas Selesai</span>
              </div>
            </div>
          </div>

          {/* Right Selected Ticket Drawer */}
          <div className="lg:col-span-4 bg-white rounded-lg border border-lineBorder p-5 shadow-xs flex flex-col justify-between">
            {selectedTicket ? (
              <div className="space-y-4">
                <div className="pb-3 border-b border-lineBorder">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-bold text-primary">
                      {selectedTicket.ticket_number}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                      {selectedTicket.status}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-sm text-textMain">
                    {selectedTicket.title}
                  </h3>
                  <div className="text-xs text-primary font-semibold mt-0.5">
                    {selectedTicket.category_name}
                  </div>
                </div>

                <div className="text-xs space-y-2">
                  <div>
                    <span className="text-textMuted text-[11px] block">Wilayah &amp; Alamat:</span>
                    <span className="font-medium text-textMain">{selectedTicket.address}</span>
                    <div className="text-[11px] text-textSec">{selectedTicket.region_name}</div>
                  </div>

                  <div>
                    <span className="text-textMuted text-[11px] block">Titik Koordinat:</span>
                    <span className="font-mono text-slate-700 text-xs">
                      Lat: {selectedTicket.latitude}, Long: {selectedTicket.longitude}
                    </span>
                  </div>

                  <div>
                    <span className="text-textMuted text-[11px] block">OPD Penanggung Jawab:</span>
                    <span className="font-medium text-primary">
                      {selectedTicket.organization_name || 'Menunggu Penugasan'}
                    </span>
                  </div>

                  <div>
                    <span className="text-textMuted text-[11px] block">Deskripsi:</span>
                    <p className="text-textSec leading-relaxed text-[11px]">
                      {selectedTicket.description}
                    </p>
                  </div>
                </div>

                {selectedTicket.attachments && selectedTicket.attachments.length > 0 && (
                  <div>
                    <span className="text-textMuted text-[11px] block mb-1.5">Foto Bukti:</span>
                    <div className="aspect-video rounded border border-lineBorder overflow-hidden">
                      <img
                        src={selectedTicket.attachments[0].file_url}
                        alt="Bukti foto"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="my-auto text-center p-6 text-textMuted text-xs">
                Pilih salah satu titik laporan pada peta untuk menampilkan rinciannya
              </div>
            )}

            {selectedTicket && (
              <div className="pt-4 border-t border-lineBorder">
                <Link
                  href={`/lacak?ticket=${selectedTicket.ticket_number}`}
                  className="w-full h-9 rounded bg-primary hover:bg-primary-hover text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Lihat Progres Pelacakan Lengkap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

