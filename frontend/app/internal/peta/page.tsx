// CivicAI Lampung - Peta Sebaran Laporan GIS Interaktif (Internal)
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import InternalSidebar from '@/components/InternalSidebar';
import InternalHeader from '@/components/InternalHeader';
import Footer from '@/components/Footer';
import {
  MapPin,
  Filter,
  Search,
  Compass,
  Layers,
  ArrowRight,
  ShieldCheck,
  Building2,
  Calendar,
  AlertCircle,
  Eye,
} from 'lucide-react';
import { Complaint, Region, Organization } from '@/types';

export default function InternalPetaPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Complaint | null>(null);
  const [regions, setRegions] = useState<Region[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterRegion, setFilterRegion] = useState('ALL');
  const [filterOpd, setFilterOpd] = useState('ALL');
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
      .finally(() => setLoading(false));

    fetch('/api/v1/references')
      .then((res) => res.json())
      .then((d) => {
        if (d.success) {
          setRegions(d.data.regions);
          setOrganizations(d.data.organizations);
        }
      });
  }, []);

  const filtered = complaints.filter((c) => {
    if (filterStatus !== 'ALL' && c.status !== filterStatus) return false;
    if (filterRegion !== 'ALL' && c.region_id !== filterRegion) return false;
    if (filterOpd !== 'ALL' && c.organization_id !== filterOpd) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-slatebg flex">
      <InternalSidebar role="VERIFIKATOR" userName="Siti Rahmawati, S.Sos" opdName="Diskominfotik Prov. Lampung" />

      <div className="pl-[250px] flex-1 flex flex-col justify-between min-h-screen">
        <InternalHeader
          breadcrumb="Peta Sebaran Laporan Spasial"
          userName="Siti Rahmawati, S.Sos"
          userRole="VERIFIKATOR"
          slaCount={14}
        />

        <main className="pt-20 pb-8 px-6 max-w-7xl w-full mx-auto space-y-4 flex-grow flex flex-col">
          {/* Top Control Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-lg border border-lineBorder shadow-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
              <span className="text-xs font-bold text-textMain">
                Sebaran Geospasial: {filtered.length} Titik Pengaduan di Provinsi Lampung
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="h-8 px-2.5 rounded border border-lineBorder bg-slate-50 text-xs font-medium"
              >
                <option value="ALL">Semua Status</option>
                <option value="SUBMITTED">Menunggu Verifikasi</option>
                <option value="IN_PROGRESS">Dalam Penanganan</option>
                <option value="RESOLVED">Selesai</option>
              </select>

              <select
                value={filterRegion}
                onChange={(e) => setFilterRegion(e.target.value)}
                className="h-8 px-2.5 rounded border border-lineBorder bg-slate-50 text-xs font-medium"
              >
                <option value="ALL">Seluruh 15 Kab/Kota</option>
                {regions.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>

              <select
                value={filterOpd}
                onChange={(e) => setFilterOpd(e.target.value)}
                className="h-8 px-2.5 rounded border border-lineBorder bg-slate-50 text-xs font-medium"
              >
                <option value="ALL">Seluruh OPD</option>
                {organizations.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.acronym}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* GIS MAP CANVAS & INSPECTOR DRAWER */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-grow min-h-[520px]">
            {/* GIS MAP WORKSPACE (matches Design.md Line 9924) */}
            <div className="lg:col-span-8 bg-[#0F172A] rounded-lg overflow-hidden border border-lineBorder relative flex flex-col justify-between p-5 shadow-card select-none">
              {/* GIS Grid Pattern Backdrop */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, #38bdf8 1px, transparent 1px), linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              ></div>

              {/* Waterbodies SVG Shapes (Teluk Lampung & Selat Sunda) */}
              <div className="absolute bottom-0 right-0 w-80 h-64 bg-cyan-950/40 rounded-tl-full blur-2xl pointer-events-none"></div>

              {/* Top GIS Toolbar */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="bg-slate-800/90 backdrop-blur-md px-3 py-1.5 rounded border border-slate-700 text-white text-xs flex items-center gap-2">
                  <Compass className="w-4 h-4 text-primary" />
                  <span className="font-mono text-[11px]">GIS Layer: Topografi &amp; Arteri Jalan Prov. Lampung</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-1 rounded border border-emerald-800">
                    REALTIME COORDINATES (POSTGIS)
                  </span>
                </div>
              </div>

              {/* Interactive Markers Grid across Lampung Coordinates */}
              <div className="relative z-10 my-auto py-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                  {filtered.map((item) => {
                    const isSelected = selectedTicket?.id === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedTicket(item)}
                        className={`p-3.5 rounded-lg text-left transition-all border ${
                          isSelected
                            ? 'bg-primary text-white border-white shadow-glow scale-105 ring-2 ring-primary-tint'
                            : 'bg-slate-800/85 hover:bg-slate-700 text-slate-200 border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-mono font-bold tracking-tight opacity-90">
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
                          Lat: {item.latitude.toFixed(4)}, Long: {item.longitude.toFixed(4)}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Map Footer Bar Legend */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-300 bg-slate-800/90 px-3.5 py-2 rounded border border-slate-700">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
                    <span>Antrean Verifikasi</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                    <span>Dalam Pengerjaan Fisik</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                    <span>Selesai Tuntas</span>
                  </div>
                </div>

                <span className="font-mono text-[10px] text-slate-400">
                  PostGIS Spatial Reference: EPSG:4326 (WGS84)
                </span>
              </div>
            </div>

            {/* RIGHT INSPECTOR DRAWER */}
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

                  <div className="text-xs space-y-2.5">
                    <div>
                      <span className="text-textMuted text-[10px] block font-semibold">Pelapor &amp; Kontak:</span>
                      <span className="font-bold text-textMain">{selectedTicket.citizen_name}</span>
                      <div className="text-[11px] font-mono text-textMuted">{selectedTicket.citizen_phone || '0812-xxxx-xxxx'}</div>
                    </div>

                    <div>
                      <span className="text-textMuted text-[10px] block font-semibold">Alamat Lapangan:</span>
                      <span className="font-medium text-textMain">{selectedTicket.address}</span>
                      <div className="text-[11px] text-textMuted">{selectedTicket.region_name}</div>
                    </div>

                    <div>
                      <span className="text-textMuted text-[10px] block font-semibold">Koordinat GPS:</span>
                      <span className="font-mono text-slate-700 text-xs">
                        {selectedTicket.latitude}, {selectedTicket.longitude}
                      </span>
                    </div>

                    <div>
                      <span className="text-textMuted text-[10px] block font-semibold">OPD Ditugaskan:</span>
                      <span className="font-bold text-primary">
                        {selectedTicket.organization_name || 'Menunggu Penugasan'}
                      </span>
                    </div>

                    <div>
                      <span className="text-textMuted text-[10px] block font-semibold">Deskripsi:</span>
                      <p className="text-textSec leading-relaxed text-[11px] bg-slate-50 p-2.5 rounded border border-lineBorder">
                        {selectedTicket.description}
                      </p>
                    </div>
                  </div>

                  {selectedTicket.attachments && selectedTicket.attachments.length > 0 && (
                    <div>
                      <span className="text-textMuted text-[10px] font-semibold block mb-1.5">Foto Bukti:</span>
                      <div className="aspect-video rounded border border-lineBorder overflow-hidden">
                        <img
                          src={selectedTicket.attachments[0].file_url}
                          alt="Foto bukti"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="my-auto text-center p-8 text-xs text-textMuted">
                  Pilih salah satu titik pengaduan pada kanvas peta untuk menampilkan rinciannya
                </div>
              )}

              {selectedTicket && (
                <div className="pt-4 border-t border-lineBorder flex gap-2">
                  <Link
                    href={`/internal/laporan/${selectedTicket.id}`}
                    className="flex-1 h-9 rounded bg-primary hover:bg-primary-hover text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Buka Lembar Verifikasi</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </main>

        <Footer className="border-t border-lineBorder" />
      </div>
    </div>
  );
}

