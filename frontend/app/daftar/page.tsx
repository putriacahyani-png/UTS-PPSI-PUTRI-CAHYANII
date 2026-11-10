// CivicAI Lampung - Daftar Akun Warga
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { UserPlus, Mail, Lock, User, Phone, CreditCard, MapPin, CheckCircle } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    nik: '',
    address: '',
    password: '',
    confirm_password: '',
  });
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      setErrorMsg('Konfirmasi kata sandi tidak cocok.');
      return;
    }
    if (!agree) {
      setErrorMsg('Anda harus menyetujui ketentuan pemrosesan data pengaduan.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/masuk');
        }, 2000);
      } else {
        setErrorMsg(data.message || 'Pendaftaran gagal.');
      }
    } catch {
      setErrorMsg('Gagal menghubungkan ke server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slatebg">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full bg-white rounded-lg shadow-card border border-lineBorder p-6 sm:p-8">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-full bg-primary-tint text-primary flex items-center justify-center mx-auto mb-3">
              <UserPlus className="w-6 h-6" />
            </div>
            <h1 className="font-heading font-extrabold text-2xl text-textMain tracking-tight">
              Pendaftaran Akun Warga
            </h1>
            <p className="mt-1 text-xs text-textSec">
              Daftarkan diri Anda untuk menyampaikan dan memantau status aduan di Provinsi Lampung
            </p>
          </div>

          {success ? (
            <div className="p-6 text-center space-y-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
              <div className="font-heading font-bold text-base text-emerald-800">
                Pendaftaran Berhasil!
              </div>
              <p className="text-xs text-emerald-700">
                Akun Anda telah terdaftar di CivicAI Lampung. Anda akan dialihkan ke halaman masuk...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 rounded bg-rose-50 border border-rose-200 text-xs text-rose-700">
                  {errorMsg}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-textSec mb-1">Nama Lengkap Sesuai KTP</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-3 text-textMuted" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full h-10 pl-9 pr-3 rounded border border-lineBorder bg-slate-50 text-xs text-textMain focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-textSec mb-1">Email</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-textMuted" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="nama@email.com"
                      className="w-full h-10 pl-9 pr-3 rounded border border-lineBorder bg-slate-50 text-xs text-textMain focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-textSec mb-1">Nomor WhatsApp / HP</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-3 text-textMuted" />
                    <input
                      type="tel"
                      value={formData.phone_number}
                      onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                      placeholder="0812-xxxx-xxxx"
                      className="w-full h-10 pl-9 pr-3 rounded border border-lineBorder bg-slate-50 text-xs text-textMain focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-textSec mb-1">NIK (16 Digit - Opsional)</label>
                  <div className="relative">
                    <CreditCard className="w-4 h-4 absolute left-3 top-3 text-textMuted" />
                    <input
                      type="text"
                      maxLength={16}
                      value={formData.nik}
                      onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
                      placeholder="1871xxxxxxxxxxxx"
                      className="w-full h-10 pl-9 pr-3 rounded border border-lineBorder bg-slate-50 text-xs text-textMain font-mono focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-textSec mb-1">Domisili / Alamat</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute left-3 top-3 text-textMuted" />
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Kabupaten/Kota di Lampung"
                      className="w-full h-10 pl-9 pr-3 rounded border border-lineBorder bg-slate-50 text-xs text-textMain focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-textSec mb-1">Kata Sandi</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-3 text-textMuted" />
                    <input
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full h-10 pl-9 pr-3 rounded border border-lineBorder bg-slate-50 text-xs text-textMain focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-textSec mb-1">Konfirmasi Sandi</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-3 text-textMuted" />
                    <input
                      type="password"
                      required
                      value={formData.confirm_password}
                      onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full h-10 pl-9 pr-3 rounded border border-lineBorder bg-slate-50 text-xs text-textMain focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-2 cursor-pointer text-xs text-textSec">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    className="mt-0.5 rounded text-primary focus:ring-primary"
                  />
                  <span>
                    Saya menyatakan data yang saya isi adalah benar dan menyetujui pemrosesan data pengaduan sesuai
                    ketentuan privasi Pemerintah Provinsi Lampung.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-10 bg-primary hover:bg-primary-hover active:bg-primary-pressed text-white text-xs font-bold rounded shadow-xs transition-colors flex items-center justify-center gap-2 mt-4"
              >
                {loading ? <span>Mendaftarkan Akun...</span> : <span>Daftar Akun Sekarang</span>}
              </button>
            </form>
          )}

          <div className="mt-6 text-center text-xs text-textSec">
            Sudah memiliki akun?{' '}
            <Link href="/masuk" className="font-bold text-primary hover:underline">
              Masuk di sini
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

