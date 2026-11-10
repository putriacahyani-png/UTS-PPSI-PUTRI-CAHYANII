// CivicAI Lampung - Log Audit & Akuntabilitas Sistem
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

'use client';

import React, { useState, useEffect } from 'react';
import InternalSidebar from '@/components/InternalSidebar';
import InternalHeader from '@/components/InternalHeader';
import Footer from '@/components/Footer';
import { History, ShieldCheck, Search, Filter, Lock } from 'lucide-react';
import { AuditLogItem } from '@/types';

export default function AuditTrailPage() {
  const [logs, setLogs] = useState<AuditLogItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/v1/audit-logs')
      .then((res) => res.json())
      .then((d) => {
        if (d.success) setLogs(d.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = logs.filter((l) => {
    if (actionFilter !== 'ALL' && l.action !== actionFilter) return false;
    if (
      searchTerm &&
      !l.user_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !l.details.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !l.entity_id.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slatebg flex">
      <InternalSidebar role="ADMIN" userName="Administrator Provinsi" opdName="Diskominfotik Prov. Lampung" />

      <div className="pl-[250px] flex-1 flex flex-col justify-between min-h-screen">
        <InternalHeader
          breadcrumb="Log Audit &amp; Jejak Akuntabilitas"
          userName="Administrator Provinsi"
          userRole="ADMIN"
          slaCount={14}
        />

        <main className="pt-20 pb-10 px-6 max-w-7xl w-full mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 inline-flex mb-1">
                <Lock className="w-3 h-3" />
                <span>IMMUTABLE AUDIT TRAIL LOGGING (PRD FR-11)</span>
              </div>
              <h1 className="font-heading font-extrabold text-2xl text-textMain tracking-tight">
                Log Audit &amp; Akuntabilitas Sistem
              </h1>
              <p className="text-xs text-textSec mt-0.5">
                Pencatatan seluruh aktivitas operasional penting, verifikasi, penugasan, perubahan status, dan intervensi admin
              </p>
            </div>

            <div className="font-mono text-xs font-bold px-3 py-1.5 rounded bg-primary-tint text-primary border border-primary-tint2 self-start sm:self-auto">
              Total {filtered.length} Rekaman Audit
            </div>
          </div>

          {/* Filter Bar */}
          <div className="bg-white rounded-lg border border-lineBorder p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-textMuted" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari aktor, nomor tiket, atau rincian..."
                className="w-full h-9 pl-9 pr-3 rounded border border-lineBorder bg-slate-50 text-xs text-textMain focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-textSec">Jenis Aksi:</span>
              <select
                value={actionFilter}
                onChange={(e) => setActionFilter(e.target.value)}
                className="h-8 px-2.5 rounded border border-lineBorder bg-slate-50 text-xs font-medium"
              >
                <option value="ALL">Semua Aksi</option>
                <option value="USER_LOGIN">USER_LOGIN</option>
                <option value="CREATE_COMPLAINT">CREATE_COMPLAINT</option>
                <option value="VERIFY_COMPLAINT">VERIFY_COMPLAINT</option>
                <option value="ASSIGN_COMPLAINT">ASSIGN_COMPLAINT</option>
                <option value="UPDATE_PROGRESS">UPDATE_PROGRESS</option>
                <option value="UPDATE_COMPLAINT_STATUS">UPDATE_COMPLAINT_STATUS</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg border border-lineBorder shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-lineBorder text-textMuted font-semibold text-[11px]">
                    <th className="py-3 px-4">WAKTU (WIB)</th>
                    <th className="py-3 px-4">PENGGUNA / AKTOR</th>
                    <th className="py-3 px-4">PERAN</th>
                    <th className="py-3 px-4">JENIS TINDAKAN</th>
                    <th className="py-3 px-4">OBJEK ENTITAS</th>
                    <th className="py-3 px-4">DETAIL PERUBAHAN</th>
                    <th className="py-3 px-4 text-right">IP ADDRESS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-lineBorder">
                  {loading ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-textMuted">
                        Memuat data catatan audit...
                      </td>
                    </tr>
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-textMuted">
                        Tidak ada log yang sesuai filter.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-mono text-[11px] text-textMuted whitespace-nowrap">
                          {new Date(log.created_at).toLocaleString('id-ID')}
                        </td>
                        <td className="py-3 px-4 font-bold text-textMain whitespace-nowrap">
                          {log.user_name}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800">
                            {log.user_role}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono font-semibold text-primary whitespace-nowrap">
                          {log.action}
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px] text-textSec whitespace-nowrap">
                          {log.entity_id}
                        </td>
                        <td className="py-3 px-4 text-textSec max-w-sm truncate">
                          {log.details}
                        </td>
                        <td className="py-3 px-4 text-right font-mono text-[11px] text-textMuted whitespace-nowrap">
                          {log.ip_address}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        <Footer className="border-t border-lineBorder" />
      </div>
    </div>
  );
}

