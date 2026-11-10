// CivicAI Lampung - Assign Complaint to OPD API
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
      organization_id,
      assigned_officer_name = 'Tim Lapangan OPD',
      instructions = '',
      sla_days = 7,
      coordinator_name = 'Siti Rahmawati, S.Sos',
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

    const org = db.organizations.find((o) => o.id === organization_id);
    if (!org) {
      return NextResponse.json(
        { success: false, message: 'OPD tujuan tidak valid.' },
        { status: 400 }
      );
    }

    const prevStatus = complaint.status;
    complaint.status = 'ASSIGNED';
    complaint.organization_id = org.id;
    complaint.organization_name = org.name;
    complaint.assigned_officer_name = assigned_officer_name;

    const deadline = new Date();
    deadline.setDate(deadline.getDate() + Number(sla_days));
    complaint.sla_deadline_at = deadline.toISOString();
    complaint.updated_at = new Date().toISOString();

    const assignLog = `Ditugaskan ke ${org.acronym} (${assigned_officer_name}) dengan target SLA ${sla_days} hari. Instruksi: ${instructions || 'Tindak lanjuti sesuai SOP'}`;

    complaint.history.push({
      id: `h-${Date.now()}`,
      complaint_id: complaint.id,
      previous_status: prevStatus,
      new_status: 'ASSIGNED',
      changed_by_name: coordinator_name,
      changed_by_role: 'VERIFIKATOR',
      reason: assignLog,
      created_at: new Date().toISOString(),
    });

    db.notifications.unshift({
      id: `notif-${Date.now()}`,
      user_id: complaint.user_id,
      complaint_id: complaint.id,
      ticket_number: complaint.ticket_number,
      title: 'Laporan Telah Ditugaskan ke OPD',
      message: `Pengaduan ${complaint.ticket_number} telah diteruskan kepada ${org.name} untuk ditangani.`,
      type: 'ASSIGNMENT',
      is_read: false,
      created_at: new Date().toISOString(),
    });

    db.addAuditLog(
      coordinator_name,
      'VERIFIKATOR',
      'ASSIGN_COMPLAINT',
      'Complaint',
      complaint.ticket_number,
      assignLog
    );

    db.save();

    return NextResponse.json({
      success: true,
      message: `Pengaduan berhasil ditugaskan ke ${org.name}.`,
      data: complaint,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Gagal melakukan penugasan laporan.' },
      { status: 500 }
    );
  }
}

