// CivicAI Lampung - Verify Complaint API
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { ComplaintStatus } from '@/types';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const {
      action, // 'ACCEPT' | 'REJECT' | 'NEEDS_INFORMATION' | 'CHANGE_CATEGORY'
      reason = '',
      category_id,
      verifier_name = 'Siti Rahmawati, S.Sos',
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
    let nextStatus: ComplaintStatus = complaint.status;
    let actionLog = '';

    if (action === 'ACCEPT') {
      nextStatus = 'VERIFIED';
      actionLog = `Laporan diverifikasi valid. Catatan: ${reason || 'Kelayakan terpenuhi'}`;
    } else if (action === 'REJECT') {
      if (!reason) {
        return NextResponse.json(
          { success: false, message: 'Alasan penolakan wajib disertakan.' },
          { status: 400 }
        );
      }
      nextStatus = 'REJECTED';
      complaint.rejection_reason = reason;
      actionLog = `Laporan ditolak. Alasan: ${reason}`;
    } else if (action === 'NEEDS_INFORMATION') {
      if (!reason) {
        return NextResponse.json(
          { success: false, message: 'Kebutuhan data tambahan wajib dijelaskan.' },
          { status: 400 }
        );
      }
      nextStatus = 'NEEDS_INFORMATION';
      complaint.needs_info_reason = reason;
      actionLog = `Permintaan klarifikasi/informasi tambahan: ${reason}`;
    } else if (action === 'CHANGE_CATEGORY') {
      if (category_id) {
        const cat = db.categories.find((c) => c.id === category_id);
        if (cat) {
          complaint.category_id = cat.id;
          complaint.category_name = cat.name;
          actionLog = `Kategori diubah menjadi: ${cat.name}. Alasan: ${reason || '-'}`;
        }
      }
    }

    complaint.status = nextStatus;
    complaint.updated_at = new Date().toISOString();

    complaint.history.push({
      id: `h-${Date.now()}`,
      complaint_id: complaint.id,
      previous_status: prevStatus,
      new_status: nextStatus,
      changed_by_name: verifier_name,
      changed_by_role: 'VERIFIKATOR',
      reason: actionLog,
      created_at: new Date().toISOString(),
    });

    db.notifications.unshift({
      id: `notif-${Date.now()}`,
      user_id: complaint.user_id,
      complaint_id: complaint.id,
      ticket_number: complaint.ticket_number,
      title: `Hasil Verifikasi: ${nextStatus}`,
      message: actionLog,
      type: 'VERIFICATION',
      is_read: false,
      created_at: new Date().toISOString(),
    });

    db.addAuditLog(
      verifier_name,
      'VERIFIKATOR',
      'VERIFY_COMPLAINT',
      'Complaint',
      complaint.ticket_number,
      actionLog
    );

    db.save();

    return NextResponse.json({
      success: true,
      message: 'Tindakan verifikasi berhasil dicatat.',
      data: complaint,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Gagal memproses verifikasi.' },
      { status: 500 }
    );
  }
}

