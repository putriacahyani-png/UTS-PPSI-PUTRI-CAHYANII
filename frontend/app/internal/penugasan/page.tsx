// CivicAI Lampung - Penugasan OPD
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import InternalSidebar from '@/components/InternalSidebar';
import InternalHeader from '@/components/InternalHeader';
import Footer from '@/components/Footer';
import {
  UserCheck,
  Building2,
  Calendar,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { Complaint, Organization } from '@/types';

function PenugasanContent() {
  const searchParams = useSearchParams();
  const preselectedId = searchParams.get('id');

  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [selectedComplaintId, setSelectedComplaintId] = useState(preselectedId || '');
  const [selectedOrgId, setSelectedOrgId] = useState('opd-1');
  const [officerName, setOfficerName] = useState('Tim Lapangan Satgas Jalan BMBK');
  const [instructions, setInstructions] = useState('Segera lakukan survei lapangan dan perbaikan aspal lubang sesuai standar teknis.');
  const [slaDays, setSlaDays] = useState('5');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetch('/api/v1/complaints')
      .then((res) => res.json())
      .then((d) => {
        if (d.success) {
          setComplaints(d.data);
          if (!preselectedId && d.data.length > 0) {
            setSelectedComplaintId(d.data[0].id);
          }
        }
      });

    fetch('/api/v1/references')
      .then((res) => res.json())
      .then((d) => {
        if (d.success) setOrganizations(d.data.organizations);
      });
  }, [preselectedId]);

  const handleAssignSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedComplaintId || !selectedOrgId) return;

    setLoading(true);
    setSuccessMsg('');

    try {
      const res = await fetch(`/api/v1/complaints/${selectedComplaintId}/assign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organization_id: selectedOrgId,
          assigned_officer_name: officerName,
          instructions,
          sla_days: Number(slaDays),
          coordinator_name: 'Siti Rahmawati, S.Sos',
        }),
      });
      const data = await res.json();

      if (data.success) {
        setSuccessMsg(data.message);
      }
    } catch {
      setSuccessMsg('Gagal melakukan penugasan.');
    } finally {
      setLoading(false);
    }
  };

  const currentComplaint = complaints.find((c) => c.id === selectedComplaintId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading font-extrabold text-2xl text-textMain tracking-tight">
          Distribusi &amp; Penugasan Laporan ke OPD
        </h1>
        <p className="text-xs text-textSec mt-0.5">
          Tetapkan organisasi perangkat daerah (OPD) penanggung jawab, petugas pelaksana, dan batas tenggat SLA
        </p>
      </div>

      {successMsg && (
        <div className="p-4 rounded bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Assignment Form */}
        <div className="lg:col-span-7 bg-white rounded-lg border border-lineBorder p-6 shadow-xs">
          <h2 className="font-heading font-bold text-sm text-textMain pb-3 border-b border-lineBorder mb-4">
            Formulir Penugasan Resmi
          </h2>

          <form onSubmit={handleAssignSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-xs font-semibold text-textSec mb-1">
                Pilih Laporan Pengaduan
              </label>
              <select
                value={selectedComplaintId}
                onChange={(e) => setSelectedComplaintId(e.target.value)}
                className="w-full h-10 px-3 rounded border border-lineBorder bg-slate-50 text-xs text-textMain focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {complaints.map((c) => (
                  <option key={c.id} value={c.id}>
                    [{c.ticket_number}] {c.title} ({c.status})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-textSec mb-1">
                OPD Penanggung Jawab Teknis <span className="text-rose-500">*</span>
              </label>
              <select
                value={selectedOrgId}
                onChange={(e) => setSelectedOrgId(e.target.value)}
                className="w-full h-10 px-3 rounded border border-lineBorder bg-slate-50 text-xs text-textMain focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {organizations.map((org) => (
                  <option key={org.id} value={org.id}>
                    {org.name} ({org.acronym})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-textSec mb-1">
                  Nama Petugas / Unit Pelaksana
                </label>
                <input
                  type="text"
                  value={officerName}
                  onChange={(e) => setOfficerName(e.target.value)}
                  className="w-full h-10 px-3 rounded border border-lineBorder bg-slate-50 text-xs text-textMain focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-textSec mb-1">
                  Target Penyelesaian (SLA Hari Kerja)
                </label>
                <select
                  value={slaDays}
                  onChange={(e) => setSlaDays(e.target.value)}
                  className="w-full h-10 px-3 rounded border border-lineBorder bg-slate-50 text-xs text-textMain focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="2">2 Hari Kerja (Urgensi Tinggi / Bahaya)</option>
                  <option value="5">5 Hari Kerja (Standar Perbaikan Cepat)</option>
                  <option value="7">7 Hari Kerja (Infrastruktur Menengah)</option>
                  <option value="14">14 Hari Kerja (Pekerjaan Kompleks)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-textSec mb-1">
                Instruksi Kerja Khusus / Catatan Lapangan
              </label>
              <textarea
                rows={4}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Tuliskan instruksi koordinasi teknis untuk unit pelaksana..."
                className="w-full p-3 rounded border border-lineBorder bg-slate-50 text-xs text-textMain focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary"
              ></textarea>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full h-10 rounded bg-primary hover:bg-primary-hover text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <UserCheck className="w-4 h-4" />
                <span>{loading ? 'Menyimpan Penugasan...' : 'Terbitkan Surat Tugas OPD'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Selected Complaint Snapshot */}
        <div className="lg:col-span-5 bg-white rounded-lg border border-lineBorder p-6 shadow-xs space-y-4">
          <h2 className="font-heading font-bold text-sm text-textMain pb-3 border-b border-lineBorder">
            Pratinjau Aduan Terpilih
          </h2>

          {currentComplaint ? (
            <div className="text-xs space-y-3">
              <div>
                <span className="font-mono text-xs font-bold text-primary block">
                  {currentComplaint.ticket_number}
                </span>
                <h3 className="font-bold text-sm text-textMain mt-0.5">
                  {currentComplaint.title}
                </h3>
              </div>

              <div className="p-3 rounded bg-slate-50 border border-slate-100 text-textSec leading-relaxed">
                {currentComplaint.description}
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-textMuted block">Wilayah:</span>
                  <span className="font-semibold text-textMain">{currentComplaint.region_name}</span>
                </div>
                <div>
                  <span className="text-textMuted block">Status Saat Ini:</span>
                  <span className="font-semibold text-amber-700">{currentComplaint.status}</span>
                </div>
              </div>

              <div>
                <span className="text-textMuted text-[11px] block">Alamat:</span>
                <span className="text-textSec">{currentComplaint.address}</span>
              </div>
            </div>
          ) : (
            <div className="text-xs text-textMuted py-8 text-center">
              Pilih salah satu laporan pada dropdown di samping
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PenugasanPage() {
  return (
    <div className="min-h-screen bg-slatebg flex">
      <InternalSidebar role="VERIFIKATOR" userName="Siti Rahmawati, S.Sos" opdName="Diskominfotik Prov. Lampung" />

      <div className="pl-[250px] flex-1 flex flex-col justify-between min-h-screen">
        <InternalHeader
          breadcrumb="Penugasan OPD"
          userName="Siti Rahmawati, S.Sos"
          userRole="VERIFIKATOR"
          slaCount={14}
        />

        <main className="pt-20 pb-10 px-6 max-w-7xl w-full mx-auto">
          <Suspense fallback={<div className="p-8 text-center text-xs">Memuat formulir penugasan...</div>}>
            <PenugasanContent />
          </Suspense>
        </main>

        <Footer className="border-t border-lineBorder" />
      </div>
    </div>
  );
}

