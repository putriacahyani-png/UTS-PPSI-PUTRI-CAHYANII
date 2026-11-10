// CivicAI Lampung - Public Navigation Bar
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/buat-pengaduan', label: 'Buat Pengaduan' },
    { href: '/lacak', label: 'Lacak Tiket' },
    { href: '/peta-publik', label: 'Peta Sebaran' },
    { href: '/statistik', label: 'Statistik' },
    { href: '/panduan', label: 'Panduan' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-lineBorder">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logos & Brand */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="flex items-center gap-2">
            {/* Lampung Province Crest SVG Replica */}
            <div
              className="w-9 h-9 rounded-md bg-[#FFF9E6] border border-[#F6E05E] p-1 flex items-center justify-center shadow-xs"
              title="Lambang Resmi Pemerintah Provinsi Lampung"
            >
              <svg viewBox="0 0 40 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4L7 9V20C7 28 12.5 35.5 20 37.5C27.5 35.5 33 28 33 20V9L20 4Z" fill="#D97706" />
                <path d="M20 7L10 11V20C10 26.5 14.5 32.5 20 34.5C25.5 32.5 30 26.5 30 20V11L20 7Z" fill="#FEF3C7" />
                <path d="M20 12L23 18H28L24 22L25.5 28L20 24.5L14.5 28L16 22L12 18H17L20 12Z" fill="#B45309" />
                <circle cx="20" cy="20" r="3" fill="#D97706" />
                <path d="M15 28C17 29.5 23 29.5 25 28" stroke="#1E3A8A" stroke-width="1.5" stroke-linecap="round" />
              </svg>
            </div>
            {/* Universitas Teknokrat Indonesia Seal SVG Replica */}
            <div
              className="w-9 h-9 rounded-md bg-[#EFF6FF] border border-[#BFDBFE] p-1 flex items-center justify-center shadow-xs"
              title="Lambang Resmi Universitas Teknokrat Indonesia"
            >
              <svg viewBox="0 0 40 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="16" fill="#1E40AF" />
                <circle cx="20" cy="20" r="13" stroke="#FDE047" strokeWidth="1.5" strokeDasharray="2 1" />
                <path d="M20 11L13 18H17V27H23V18H27L20 11Z" fill="#F8FAFC" />
                <path d="M15 22L20 26L25 22" stroke="#FDE047" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
          <div className="h-6 w-[1px] bg-lineBorder"></div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-bold text-base tracking-tight text-textMain group-hover:text-primary transition-colors">
                CivicAI
              </span>
              <span className="text-[11px] font-semibold text-primary px-1.5 py-0.5 rounded bg-primary-tint border border-primary-tint2 font-heading">
                Lampung
              </span>
            </div>
            <span className="text-[10px] text-textMuted leading-none font-medium">Pemprov Lampung & Teknokrat</span>
          </div>
        </Link>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-1 text-[13px] font-medium text-textSec">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-[4px] transition-colors ${
                  isActive
                    ? 'text-primary font-semibold bg-primary-tint'
                    : 'hover:text-textMain hover:bg-slate-100'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Auth Actions */}
        <div className="hidden sm:flex items-center gap-2.5">
          <Link
            href="/masuk"
            className="h-9 px-3.5 inline-flex items-center justify-center rounded-[4px] text-[13px] font-semibold text-primary bg-primary-tint hover:bg-primary-tint2 transition-all"
          >
            Masuk
          </Link>
          <Link
            href="/daftar"
            className="h-9 px-4 inline-flex items-center justify-center rounded-[4px] text-[13px] font-semibold text-white bg-primary hover:bg-primary-hover active:bg-primary-pressed shadow-xs transition-all"
          >
            Daftar
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded text-textSec hover:text-textMain hover:bg-slate-100 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-lineBorder bg-white px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded text-sm font-medium text-textSec hover:text-primary hover:bg-primary-tint"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-lineBorder flex gap-2">
            <Link
              href="/masuk"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 py-2 text-center rounded text-sm font-semibold text-primary bg-primary-tint"
            >
              Masuk
            </Link>
            <Link
              href="/daftar"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 py-2 text-center rounded text-sm font-semibold text-white bg-primary"
            >
              Daftar
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

