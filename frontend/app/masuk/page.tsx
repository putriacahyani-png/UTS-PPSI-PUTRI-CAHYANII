// CivicAI Lampung - Masuk / Login
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LogIn, KeyRound, Mail, Eye, EyeOff, UserCheck, ShieldAlert, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('warga@lampung.go.id');
  const [password, setPassword] = useState('warga123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem('civicai_token', data.token);
        localStorage.setItem('civicai_user', JSON.stringify(data.user));

        if (data.user.role === 'WARGA') {
          router.push('/warga/dashboard');
        } else {
          router.push('/internal/dashboard');
        }
      } else {
        setErrorMsg(data.message || 'Login gagal.');
      }
    } catch {
      setErrorMsg('Koneksi ke server gagal.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = (roleEmail: string, rolePass: string) => {
    setEmail(roleEmail);
    setPassword(rolePass);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slatebg">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-lg shadow-card border border-lineBorder p-6 sm:p-8">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-full bg-primary-tint text-primary flex items-center justify-center mx-auto mb-3">
              <LogIn className="w-6 h-6" />
            </div>
            <h1 className="font-heading font-extrabold text-2xl text-textMain tracking-tight">
              Masuk ke CivicAI
            </h1>
            <p className="mt-1 text-xs text-textSec">
              Akses akun pengaduan warga atau portal internal perangkat daerah
            </p>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 rounded bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-textSec mb-1">
                Alamat Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-textMuted pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full h-10 pl-9 pr-3 rounded border border-lineBorder bg-slate-50 text-xs text-textMain focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-textSec">Kata Sandi</label>
                <a href="#" className="text-[11px] text-primary hover:underline">
                  Lupa sandi?
                </a>
              </div>
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3 top-3 text-textMuted pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-10 pl-9 pr-10 rounded border border-lineBorder bg-slate-50 text-xs text-textMain focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-textMuted hover:text-textMain"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-10 bg-primary hover:bg-primary-hover active:bg-primary-pressed text-white text-xs font-bold rounded shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Memproses Masuk...</span>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Masuk Sekarang</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Switcher */}
          <div className="mt-6 pt-5 border-t border-lineBorder">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-textMuted mb-2">
              <Sparkles className="w-3.5 h-3.5 text-ai-violet" />
              <span>AKUN UJI COBA CEPAT (DEMO):</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <button
                type="button"
                onClick={() => handleQuickDemo('warga@lampung.go.id', 'warga123')}
                className="px-2.5 py-1.5 rounded bg-slate-100 hover:bg-primary-tint hover:text-primary text-textSec text-left transition-colors border border-slate-200"
              >
                <div className="font-bold">Warga Pelapor</div>
                <div className="truncate text-textMuted">warga@lampung.go.id</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('verifikator@lampung.go.id', 'verif123')}
                className="px-2.5 py-1.5 rounded bg-slate-100 hover:bg-primary-tint hover:text-primary text-textSec text-left transition-colors border border-slate-200"
              >
                <div className="font-bold">Verifikator Prov.</div>
                <div className="truncate text-textMuted">verifikator@...</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('petugas.bmbk@lampung.go.id', 'petugas123')}
                className="px-2.5 py-1.5 rounded bg-slate-100 hover:bg-primary-tint hover:text-primary text-textSec text-left transition-colors border border-slate-200"
              >
                <div className="font-bold">Petugas OPD BMBK</div>
                <div className="truncate text-textMuted">petugas.bmbk@...</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('pimpinan@lampung.go.id', 'pimpinan123')}
                className="px-2.5 py-1.5 rounded bg-slate-100 hover:bg-primary-tint hover:text-primary text-textSec text-left transition-colors border border-slate-200"
              >
                <div className="font-bold">Pimpinan OPD</div>
                <div className="truncate text-textMuted">pimpinan@...</div>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-textSec">
            Belum memiliki akun warga?{' '}
            <Link href="/daftar" className="font-bold text-primary hover:underline">
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

