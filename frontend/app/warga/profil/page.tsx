// CivicAI Lampung - Profil & Pengaturan Warga
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { User, Mail, Phone, CreditCard, MapPin, Lock, ShieldCheck, LogOut, Check } from 'lucide-react';

export default function WargaProfilPage() {
  const [name, setName] = useState('Ahmad Fauzi, S.T.');
  const [email] = useState('warga@lampung.go.id');
  const [phone, setPhone] = useState('0812-7890-1234');
  const [nik] = useState('1871012304950002');
  const [address, setAddress] = useState('Jl. Raden Intan No. 45, Enggal, Bandar Lampung');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slatebg">
      <Navbar />

      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-6">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-textMain tracking-tight">
            Profil &amp; Pengaturan Akun
          </h1>
          <p className="text-xs text-textSec mt-0.5">
            Kelola data diri, kontak aktif, dan preferensi privasi akun pengaduan Anda
          </p>
        </div>

        {saved && (
          <div className="p-3.5 rounded bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Perubahan data profil berhasil disimpan.</span>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-card border border-lineBorder p-6 space-y-5">
          <div className="flex items-center gap-4 pb-4 border-b border-lineBorder">
            <div className="w-16 h-16 rounded-full bg-primary-tint text-primary font-bold text-xl flex items-center justify-center border border-primary-tint2 font-heading">
              AF
            </div>
            <div>
              <div className="font-heading font-bold text-base text-textMain">{name}</div>
              <div className="text-xs text-textMuted">{email}</div>
              <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                AKUN WARGA TERVERIFIKASI
              </span>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-textSec mb-1">Nama Lengkap</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-3 text-textMuted" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-10 pl-9 pr-3 rounded border border-lineBorder bg-slate-50 text-xs text-textMain focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-textSec mb-1">Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-3 text-textMuted" />
                  <input
                    type="email"
                    disabled
                    value={email}
                    className="w-full h-10 pl-9 pr-3 rounded border border-lineBorder bg-slate-100 text-xs text-textMuted cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-textSec mb-1">Nomor Telepon</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-3 text-textMuted" />
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-10 pl-9 pr-3 rounded border border-lineBorder bg-slate-50 text-xs text-textMain focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-textSec mb-1">NIK (KTP)</label>
                <div className="relative">
                  <CreditCard className="w-4 h-4 absolute left-3 top-3 text-textMuted" />
                  <input
                    type="text"
                    disabled
                    value={nik}
                    className="w-full h-10 pl-9 pr-3 rounded border border-lineBorder bg-slate-100 text-xs font-mono text-textMuted cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-textSec mb-1">Alamat Domisili</label>
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3 top-3 text-textMuted" />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full h-10 pl-9 pr-3 rounded border border-lineBorder bg-slate-50 text-xs text-textMain focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="h-10 px-5 rounded bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-xs transition-colors"
              >
                Simpan Perubahan Profil
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

