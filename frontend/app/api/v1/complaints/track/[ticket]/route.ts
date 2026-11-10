// CivicAI Lampung - Public Ticket Tracking API
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  req: NextRequest,
  { params }: { params: { ticket: string } }
) {
  const { ticket } = params;
  const cleanTicket = decodeURIComponent(ticket).trim().toUpperCase();

  const complaint = db.complaints.find(
    (c) => c.ticket_number.toUpperCase() === cleanTicket
  );

  if (!complaint) {
    return NextResponse.json(
      {
        success: false,
        message: `Nomor tiket "${cleanTicket}" tidak ditemukan. Pastikan format nomor registrasi sudah benar (contoh: TKT-20261108-0142).`,
      },
      { status: 404 }
    );
  }

  // Mask citizen identity for public privacy protection
  const nameParts = complaint.citizen_name.split(' ');
  const maskedName =
    nameParts.length > 1
      ? `${nameParts[0]} ***`
      : `${complaint.citizen_name.slice(0, 2)}***`;

  // Filter out internal comments (only expose public ones)
  const publicComments = complaint.comments.filter((c) => !c.is_internal_only);

  // Filter out internal attachments
  const publicAttachments = complaint.attachments.filter((a) => a.attachment_type !== 'INTERNAL' as any);

  const sanitized = {
    ticket_number: complaint.ticket_number,
    category_name: complaint.category_name,
    category_icon: complaint.category_icon,
    organization_name: complaint.organization_name || 'Menunggu Penugasan OPD',
    region_name: complaint.region_name,
    title: complaint.title,
    description: complaint.description,
    status: complaint.status,
    priority: complaint.priority,
    incident_date: complaint.incident_date,
    address: complaint.address,
    landmark: complaint.landmark,
    progress_percent: complaint.progress_percent || 0,
    masked_reporter: maskedName,
    attachments: publicAttachments,
    history: complaint.history,
    comments: publicComments,
    created_at: complaint.created_at,
    updated_at: complaint.updated_at,
  };

  return NextResponse.json({
    success: true,
    data: sanitized,
  });
}

