// CivicAI Lampung - Notifikasi Warga
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Bell, CheckCheck, Clock, ArrowRight } from 'lucide-react';
import { NotificationItem } from '@/types';

export default function WargaNotifikasiPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadNotif = () => {
    fetch('/api/v1/notifications?user_id=usr-warga-1')
      .then((res) => res.json())
      .then((d) => {
        if (d.success) setNotifications(d.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadNotif();
  }, []);

  const handleMarkAllRead = async () => {
    await fetch('/api/v1/notifications', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mark_all: true, user_id: 'usr-warga-1' }),
    });
    loadNotif();
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slatebg">
      <Navbar />

      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="flex items-center justify-between pb-4 border-b border-lineBorder mb-6">
          <div>
            <h1 className="font-heading font-extrabold text-2xl text-textMain tracking-tight">
              Pemberitahuan &amp; Notifikasi
            </h1>
            <p className="text-xs text-textSec mt-0.5">
              Pembaruan status laporan, hasil verifikasi, dan penanganan dinas terkait
            </p>
          </div>

          <button
            onClick={handleMarkAllRead}
            className="h-9 px-3.5 rounded bg-white hover:bg-slate-100 border border-lineBorder text-xs font-semibold text-primary flex items-center gap-1.5 shadow-2xs transition-colors"
          >
            <CheckCheck className="w-4 h-4" />
            <span>Tandai Semua Dibaca</span>
          </button>
        </div>

        <div className="space-y-3">
          {loading ? (
            <div className="py-12 text-center text-xs text-textMuted bg-white rounded-lg border border-lineBorder">
              Memuat notifikasi...
            </div>
          ) : notifications.length === 0 ? (
            <div className="py-12 text-center text-xs text-textMuted bg-white rounded-lg border border-lineBorder">
              Tidak ada pemberitahuan baru saat ini.
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`p-4 rounded-lg border transition-all flex items-start justify-between gap-4 ${
                  n.is_read
                    ? 'bg-white border-lineBorder'
                    : 'bg-primary-tint/30 border-primary/30 shadow-xs'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      n.is_read ? 'bg-slate-100 text-textMuted' : 'bg-primary text-white'
                    }`}
                  >
                    <Bell className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-bold text-xs text-textMain">{n.title}</span>
                      {n.ticket_number && (
                        <span className="font-mono text-[10px] font-bold text-primary bg-primary-tint px-1.5 py-0.5 rounded">
                          {n.ticket_number}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-textSec mt-1 leading-relaxed">{n.message}</p>
                    <span className="text-[10px] font-mono text-textMuted mt-1 block">
                      {new Date(n.created_at).toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                {n.ticket_number && (
                  <Link
                    href={`/lacak?ticket=${n.ticket_number}`}
                    className="flex-shrink-0 p-2 rounded hover:bg-slate-100 text-primary transition-colors"
                    title="Lihat Detail Tiket"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

