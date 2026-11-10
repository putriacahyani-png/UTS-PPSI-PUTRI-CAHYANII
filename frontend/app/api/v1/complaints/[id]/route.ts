// CivicAI Lampung - Single Complaint API
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { ComplaintStatus } from '@/types';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const complaint = db.complaints.find(
    (c) => c.id === id || c.ticket_number === id
  );

  if (!complaint) {
    return NextResponse.json(
      { success: false, message: 'Data pengaduan tidak ditemukan.' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: complaint,
  });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const { status, reason, actor_name = 'Petugas Verifikator', actor_role = 'VERIFIKATOR' } = body;

    const complaint = db.complaints.find(
      (c) => c.id === id || c.ticket_number === id
    );

    if (!complaint) {
      return NextResponse.json(
        { success: false, message: 'Data pengaduan tidak ditemukan.' },
        { status: 404 }
      );
    }

    const previousStatus = complaint.status;
    complaint.status = status as ComplaintStatus;
    complaint.updated_at = new Date().toISOString();

    if (reason) {
      if (status === 'REJECTED') complaint.rejection_reason = reason;
      if (status === 'NEEDS_INFORMATION') complaint.needs_info_reason = reason;
    }

    complaint.history.push({
      id: `h-${Date.now()}`,
      complaint_id: complaint.id,
      previous_status: previousStatus,
      new_status: status as ComplaintStatus,
      changed_by_name: actor_name,
      changed_by_role: actor_role,
      reason: reason || `Status diperbarui menjadi ${status}`,
      created_at: new Date().toISOString(),
    });

    // Notify citizen
    db.notifications.unshift({
      id: `notif-${Date.now()}`,
      user_id: complaint.user_id,
      complaint_id: complaint.id,
      ticket_number: complaint.ticket_number,
      title: `Pembaruan Status: ${status}`,
      message: `Status tiket ${complaint.ticket_number} kini: ${status}. Alasan: ${reason || '-'}`,
      type: 'STATUS_CHANGE',
      is_read: false,
      created_at: new Date().toISOString(),
    });

    db.addAuditLog(
      actor_name,
      actor_role,
      'UPDATE_COMPLAINT_STATUS',
      'Complaint',
      complaint.ticket_number,
      `Status diubah dari ${previousStatus} menjadi ${status}. Catatan: ${reason || '-'}`
    );

    db.save();

    return NextResponse.json({
      success: true,
      message: `Status pengaduan berhasil diperbarui menjadi ${status}.`,
      data: complaint,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Gagal memperbarui status pengaduan.' },
      { status: 500 }
    );
  }
}

