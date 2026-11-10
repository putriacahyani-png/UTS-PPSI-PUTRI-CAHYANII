// CivicAI Lampung - Pengaturan Referensi & Tata Kebijakan
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

'use client';

import React, { useState, useEffect } from 'react';
import InternalSidebar from '@/components/InternalSidebar';
import InternalHeader from '@/components/InternalHeader';
import Footer from '@/components/Footer';
import { Settings, Shield, Clock, MapPin, Building2, Layers, Check } from 'lucide-react';
import { Category, Region, Organization } from '@/types';

export default function PengaturanReferensiPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [activeTab, setActiveTab] = useState<'CATEGORIES' | 'REGIONS' | 'OPD' | 'SLA'>('CATEGORIES');
  const [savedMsg, setSavedMsg] = useState('');

  useEffect(() => {
    fetch('/api/v1/references')
      .then((res) => res.json())
      .then((d) => {
        if (d.success) {
          setCategories(d.data.categories);
          setRegions(d.data.regions);
          setOrganizations(d.data.organizations);
        }
      });
  }, []);

  const handleSavePolicy = () => {
    setSavedMsg('Konfigurasi tata kebijakan berhasil disimpan dan diterapkan.');
    setTimeout(() => setSavedMsg(''), 3000);
  };

  return (
    <div className="min-h-screen bg-slatebg flex">
      <InternalSidebar role="ADMIN" userName="Administrator Provinsi" opdName="Diskominfotik Prov. Lampung" />

      <div className="pl-[250px] flex-1 flex flex-col justify-between min-h-screen">
        <InternalHeader
          breadcrumb="Pengaturan Referensi &amp; Tata Kebijakan"
          userName="Administrator Provinsi"
          userRole="ADMIN"
          slaCount={14}
        />

        <main className="pt-20 pb-10 px-6 max-w-7xl w-full mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-heading font-extrabold text-2xl text-textMain tracking-tight">
                Pengaturan Referensi &amp; Tata Kebijakan SLA
              </h1>
              <p className="text-xs text-textSec mt-0.5">
                Konfigurasi master data kategori layanan, 15 wilayah kabupaten/kota, struktur OPD, dan aturan SLA
              </p>
            </div>

            <button
              type="button"
              onClick={handleSavePolicy}
              className="h-9 px-4 rounded bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-xs transition-colors"
            >
              Simpan Perubahan Kebijakan
            </button>
          </div>

          {savedMsg && (
            <div className="p-3.5 rounded bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{savedMsg}</span>
            </div>
          )}

          {/* Tabs Navigation */}
          <div className="flex border-b border-lineBorder bg-white rounded-t-lg px-4 gap-2 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('CATEGORIES')}
              className={`py-3 px-4 border-b-2 transition-colors ${
                activeTab === 'CATEGORIES'
                  ? 'border-primary text-primary font-bold'
                  : 'border-transparent text-textSec hover:text-textMain'
              }`}
            >
              8 Kategori Layanan Publik
            </button>
            <button
              onClick={() => setActiveTab('REGIONS')}
              className={`py-3 px-4 border-b-2 transition-colors ${
                activeTab === 'REGIONS'
                  ? 'border-primary text-primary font-bold'
                  : 'border-transparent text-textSec hover:text-textMain'
              }`}
            >
              15 Kabupaten / Kota di Lampung
            </button>
            <button
              onClick={() => setActiveTab('OPD')}
              className={`py-3 px-4 border-b-2 transition-colors ${
                activeTab === 'OPD'
                  ? 'border-primary text-primary font-bold'
                  : 'border-transparent text-textSec hover:text-textMain'
              }`}
            >
              Struktur Organisasi Perangkat Daerah (OPD)
            </button>
            <button
              onClick={() => setActiveTab('SLA')}
              className={`py-3 px-4 border-b-2 transition-colors ${
                activeTab === 'SLA'
                  ? 'border-primary text-primary font-bold'
                  : 'border-transparent text-textSec hover:text-textMain'
              }`}
            >
              Parameter SLA &amp; Aturan Eskalasi
            </button>
          </div>

          {/* TAB 1: CATEGORIES */}
          {activeTab === 'CATEGORIES' && (
            <div className="bg-white rounded-b-lg border border-t-0 border-lineBorder p-6 shadow-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {categories.map((c) => (
                  <div key={c.id} className="p-4 rounded border border-lineBorder bg-slate-50 flex items-start justify-between">
                    <div>
                      <span className="font-mono text-[10px] text-primary font-bold bg-primary-tint px-1.5 py-0.5 rounded">
                        {c.code}
                      </span>
                      <h3 className="font-heading font-bold text-xs text-textMain mt-1">{c.name}</h3>
                      <p className="text-[11px] text-textSec mt-0.5">{c.description}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      AKTIF
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: REGIONS */}
          {activeTab === 'REGIONS' && (
            <div className="bg-white rounded-b-lg border border-t-0 border-lineBorder p-6 shadow-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {regions.map((r) => (
                  <div key={r.id} className="p-3.5 rounded border border-lineBorder bg-slate-50 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-textMain">{r.name}</span>
                      <span className="font-mono text-[10px] text-textMuted bg-white px-1.5 py-0.5 rounded border border-lineBorder">
                        {r.type}
                      </span>
                    </div>
                    <div className="font-mono text-[10px] text-textMuted">
                      Lat: {r.latitude}, Long: {r.longitude}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: OPD */}
          {activeTab === 'OPD' && (
            <div className="bg-white rounded-b-lg border border-t-0 border-lineBorder p-6 shadow-xs space-y-3">
              {organizations.map((org) => (
                <div key={org.id} className="p-4 rounded border border-lineBorder bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold text-primary bg-primary-tint px-1.5 py-0.5 rounded">
                        {org.code}
                      </span>
                      <span className="font-bold text-textMain">{org.name}</span>
                    </div>
                    <div className="text-[11px] text-textSec mt-1">{org.address}</div>
                    <div className="text-[10px] text-textMuted font-mono mt-0.5">
                      Kontak: {org.contact_phone} | {org.contact_email}
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 self-start sm:self-center">
                    OPD TERHUBUNG
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: SLA POLICIES */}
          {activeTab === 'SLA' && (
            <div className="bg-white rounded-b-lg border border-t-0 border-lineBorder p-6 shadow-xs space-y-4">
              <h3 className="font-heading font-bold text-sm text-textMain pb-2 border-b border-lineBorder">
                Matriks Parameter Standar Pelayanan Minimal (SLA)
              </h3>
              <div className="overflow-x-auto text-xs">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 border-b border-lineBorder text-textMuted font-semibold text-[11px]">
                      <th className="py-2.5 px-3">TINGKAT PRIORITAS</th>
                      <th className="py-2.5 px-3">TARGET VERIFIKASI AWAL</th>
                      <th className="py-2.5 px-3">TARGET RESPON OPD</th>
                      <th className="py-2.5 px-3">TARGET PENYELESAIAN TUNTAS</th>
                      <th className="py-2.5 px-3">ATURAN ESKALASI OTOMATIS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-lineBorder">
                    <tr>
                      <td className="py-3 px-3 font-bold text-rose-700">URGENT (Bahaya Jiwa)</td>
                      <td className="py-3 px-3 font-mono">&le; 6 Jam</td>
                      <td className="py-3 px-3 font-mono">&le; 12 Jam</td>
                      <td className="py-3 px-3 font-mono">&le; 48 Jam (2 Hari)</td>
                      <td className="py-3 px-3 text-textSec">Notifikasi Kepala Dinas &amp; Sekda</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-bold text-rose-600">HIGH (Jalan Arteri / Banjir)</td>
                      <td className="py-3 px-3 font-mono">&le; 12 Jam</td>
                      <td className="py-3 px-3 font-mono">&le; 24 Jam</td>
                      <td className="py-3 px-3 font-mono">&le; 72 Jam (3 Hari)</td>
                      <td className="py-3 px-3 text-textSec">Peringatan Koordinator Lapangan</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-bold text-amber-600">MEDIUM (Standar Pelayanan)</td>
                      <td className="py-3 px-3 font-mono">&le; 24 Jam</td>
                      <td className="py-3 px-3 font-mono">&le; 48 Jam</td>
                      <td className="py-3 px-3 font-mono">&le; 168 Jam (7 Hari)</td>
                      <td className="py-3 px-3 text-textSec">Pengingat berkala ke OPD</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-bold text-slate-700">LOW (Keluhan Minor)</td>
                      <td className="py-3 px-3 font-mono">&le; 48 Jam</td>
                      <td className="py-3 px-3 font-mono">&le; 72 Jam</td>
                      <td className="py-3 px-3 font-mono">&le; 336 Jam (14 Hari)</td>
                      <td className="py-3 px-3 text-textSec">Jadwal pemeliharaan rutin</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>

        <Footer className="border-t border-lineBorder" />
      </div>
    </div>
  );
}

