// CivicAI Lampung - Progress & Resolution API
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const {
      progress_percent,
      comment,
      proof_photo_url,
      is_resolve = false,
      officer_name = 'Ir. Bambang Kurniawan',
    } = body;

    const complaint = db.complaints.find(
      (c) => c.id === id || c.ticket_number === id
    );

    if (!complaint) {
      return NextResponse.json(
        { success: false, message: 'Pengaduan tidak ditemukan.' },
        { status: 404 }
      );
    }

    const prevStatus = complaint.status;
    const nowIso = new Date().toISOString();

    if (progress_percent !== undefined) {
      complaint.progress_percent = Number(progress_percent);
      if (complaint.status === 'ASSIGNED') {
        complaint.status = 'IN_PROGRESS';
      }
    }

    if (is_resolve || Number(progress_percent) === 100) {
      complaint.status = 'RESOLVED';
      complaint.progress_percent = 100;
    }

    if (proof_photo_url) {
      complaint.attachments.push({
        id: `att-proof-${Date.now()}`,
        complaint_id: complaint.id,
        file_name: is_resolve ? 'bukti_penyelesaian.jpg' : 'bukti_progres_lapangan.jpg',
        file_url: proof_photo_url,
        file_type: 'image/jpeg',
        file_size_bytes: 2000000,
        attachment_type: is_resolve ? 'RESOLUTION_PROOF' : 'PROGRESS_PROOF',
        created_at: nowIso,
      });
    }

    if (comment) {
      complaint.comments.push({
        id: `com-${Date.now()}`,
        complaint_id: complaint.id,
        user_name: officer_name,
        user_role: 'PETUGAS_OPD',
        comment,
        is_internal_only: false,
        created_at: nowIso,
      });
    }

    const logMsg = is_resolve
      ? `Penanganan selesai 100% oleh OPD. Catatan: ${comment || 'Pekerjaan perbaikan tuntas'}`
      : `Progres diperbarui ke ${complaint.progress_percent}%. Catatan: ${comment || '-'}`;

    complaint.history.push({
      id: `h-${Date.now()}`,
      complaint_id: complaint.id,
      previous_status: prevStatus,
      new_status: complaint.status,
      changed_by_name: officer_name,
      changed_by_role: 'PETUGAS_OPD',
      reason: logMsg,
      created_at: nowIso,
    });

    db.notifications.unshift({
      id: `notif-${Date.now()}`,
      user_id: complaint.user_id,
      complaint_id: complaint.id,
      ticket_number: complaint.ticket_number,
      title: is_resolve ? 'Laporan Anda Telah Selesai' : 'Pembaruan Progres Tindak Lanjut',
      message: logMsg,
      type: is_resolve ? 'RESOLUTION' : 'PROGRESS',
      is_read: false,
      created_at: nowIso,
    });

    db.addAuditLog(
      officer_name,
      'PETUGAS_OPD',
      'UPDATE_PROGRESS',
      'Complaint',
      complaint.ticket_number,
      logMsg
    );

    db.save();

    return NextResponse.json({
      success: true,
      message: 'Pembaruan progres penanganan berhasil disimpan.',
      data: complaint,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Gagal memperbarui progres pengaduan.' },
      { status: 500 }
    );
  }
}

