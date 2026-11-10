// CivicAI Lampung - Manajemen Pengguna & OPD
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

'use client';

import React, { useState, useEffect } from 'react';
import InternalSidebar from '@/components/InternalSidebar';
import InternalHeader from '@/components/InternalHeader';
import Footer from '@/components/Footer';
import { Users, UserPlus, Shield, Building2, CheckCircle2, Search } from 'lucide-react';
import { User, Organization } from '@/types';

export default function ManajemenPenggunaPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'PETUGAS_OPD',
    organization_id: 'opd-1',
    phone_number: '',
  });
  const [msg, setMsg] = useState('');

  const loadData = () => {
    fetch('/api/v1/users')
      .then((res) => res.json())
      .then((d) => {
        if (d.success) setUsers(d.data);
      });

    fetch('/api/v1/references')
      .then((res) => res.json())
      .then((d) => {
        if (d.success) setOrganizations(d.data.organizations);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/v1/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setMsg('Pengguna internal baru berhasil didaftarkan.');
        setShowModal(false);
        setFormData({
          name: '',
          email: '',
          role: 'PETUGAS_OPD',
          organization_id: 'opd-1',
          phone_number: '',
        });
        loadData();
      }
    } catch {
      setMsg('Gagal menambahkan pengguna.');
    }
  };

  const filtered = users.filter((u) => {
    if (roleFilter !== 'ALL' && u.role !== roleFilter) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-slatebg flex">
      <InternalSidebar role="ADMIN" userName="Administrator Provinsi" opdName="Diskominfotik Prov. Lampung" />

      <div className="pl-[250px] flex-1 flex flex-col justify-between min-h-screen">
        <InternalHeader
          breadcrumb="Manajemen Pengguna &amp; OPD"
          userName="Administrator Provinsi"
          userRole="ADMIN"
          slaCount={14}
        />

        <main className="pt-20 pb-10 px-6 max-w-7xl w-full mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-heading font-extrabold text-2xl text-textMain tracking-tight">
                Manajemen Pengguna &amp; Akun Internal
              </h1>
              <p className="text-xs text-textSec mt-0.5">
                Kelola hak akses operator verifikator, koordinator pimpinan, dan satgas OPD
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="h-10 px-4 rounded bg-primary hover:bg-primary-hover text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              <span>Tambah Akun Internal</span>
            </button>
          </div>

          {msg && (
            <div className="p-3.5 rounded bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{msg}</span>
            </div>
          )}

          {/* Table */}
          <div className="bg-white rounded-lg border border-lineBorder shadow-xs overflow-hidden">
            <div className="p-4 border-b border-lineBorder flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-semibold text-textSec">Filter Peran:</span>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="h-8 px-2.5 rounded border border-lineBorder bg-slate-50 text-xs font-medium"
                >
                  <option value="ALL">Semua Peran</option>
                  <option value="WARGA">Warga Pelapor</option>
                  <option value="VERIFIKATOR">Verifikator</option>
                  <option value="PETUGAS_OPD">Petugas OPD</option>
                  <option value="PIMPINAN">Pimpinan</option>
                  <option value="ADMIN">Admin Sistem</option>
                </select>
              </div>

              <span className="text-xs font-mono text-textMuted">
                Total {filtered.length} Pengguna
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-lineBorder text-textMuted font-semibold text-[11px]">
                    <th className="py-3 px-4">NAMA LENGKAP</th>
                    <th className="py-3 px-4">EMAIL</th>
                    <th className="py-3 px-4">ROLE AKSES</th>
                    <th className="py-3 px-4">PERANGKAT DAERAH (OPD)</th>
                    <th className="py-3 px-4">NOMOR KONTAK</th>
                    <th className="py-3 px-4 text-right">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-lineBorder">
                  {filtered.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-bold text-textMain">{u.name}</td>
                      <td className="py-3 px-4 text-textSec font-mono">{u.email}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            u.role === 'ADMIN'
                              ? 'bg-purple-100 text-purple-800'
                              : u.role === 'VERIFIKATOR'
                              ? 'bg-blue-100 text-blue-800'
                              : u.role === 'PETUGAS_OPD'
                              ? 'bg-indigo-100 text-indigo-800'
                              : u.role === 'PIMPINAN'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-100 text-slate-800'
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-textSec">
                        {u.organization_name || 'Masyarakat Umum'}
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px] text-textMuted">
                        {u.phone_number || '-'}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          AKTIF
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        {/* MODAL CREATE INTERNAL USER */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-card border border-lineBorder max-w-md w-full p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-lineBorder">
                <h3 className="font-heading font-bold text-sm text-textMain">
                  Tambah Akun Internal Pemerintah
                </h3>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="text-textMuted hover:text-textMain text-sm"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateUser} className="space-y-3 text-xs">
                <div>
                  <label className="block text-xs font-semibold text-textSec mb-1">
                    Nama Lengkap &amp; Gelar <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Contoh: Ir. Eko Saputra, M.T."
                    className="w-full h-10 px-3 rounded border border-lineBorder bg-slate-50 text-xs text-textMain focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-textSec mb-1">
                    Email Dinas / Instansi <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="petugas@lampungprov.go.id"
                    className="w-full h-10 px-3 rounded border border-lineBorder bg-slate-50 text-xs text-textMain focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-textSec mb-1">
                      Role / Peran
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full h-10 px-3 rounded border border-lineBorder bg-slate-50 text-xs text-textMain"
                    >
                      <option value="VERIFIKATOR">VERIFIKATOR</option>
                      <option value="PETUGAS_OPD">PETUGAS_OPD</option>
                      <option value="PIMPINAN">PIMPINAN</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-textSec mb-1">
                      OPD Terkait
                    </label>
                    <select
                      value={formData.organization_id}
                      onChange={(e) => setFormData({ ...formData, organization_id: e.target.value })}
                      className="w-full h-10 px-3 rounded border border-lineBorder bg-slate-50 text-xs text-textMain"
                    >
                      {organizations.map((o) => (
                        <option key={o.id} value={o.id}>
                          {o.acronym}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-textSec mb-1">
                    Nomor WhatsApp / Kontak Petugas
                  </label>
                  <input
                    type="text"
                    value={formData.phone_number}
                    onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                    placeholder="0812-xxxx-xxxx"
                    className="w-full h-10 px-3 rounded border border-lineBorder bg-slate-50 text-xs text-textMain focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-lineBorder">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded border border-lineBorder bg-slate-100 text-xs font-semibold text-textSec hover:text-textMain"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-xs"
                  >
                    Buat Akun Petugas
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <Footer className="border-t border-lineBorder" />
      </div>
    </div>
  );
}

