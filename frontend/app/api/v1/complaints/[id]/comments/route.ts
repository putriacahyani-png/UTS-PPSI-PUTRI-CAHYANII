// CivicAI Lampung - Comments & Internal Notes API
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
      comment,
      is_internal_only = false,
      user_name = 'Pengguna',
      user_role = 'WARGA',
    } = body;

    if (!comment) {
      return NextResponse.json(
        { success: false, message: 'Komentar tidak boleh kosong.' },
        { status: 400 }
      );
    }

    const complaint = db.complaints.find(
      (c) => c.id === id || c.ticket_number === id
    );

    if (!complaint) {
      return NextResponse.json(
        { success: false, message: 'Pengaduan tidak ditemukan.' },
        { status: 404 }
      );
    }

    const newComment = {
      id: `com-${Date.now()}`,
      complaint_id: complaint.id,
      user_name,
      user_role,
      comment,
      is_internal_only: Boolean(is_internal_only),
      created_at: new Date().toISOString(),
    };

    complaint.comments.push(newComment);

    db.addAuditLog(
      user_name,
      user_role,
      is_internal_only ? 'ADD_INTERNAL_NOTE' : 'ADD_PUBLIC_COMMENT',
      'Complaint',
      complaint.ticket_number,
      `Menambahkan ${is_internal_only ? 'catatan internal OPD' : 'tanggapan publik'}`
    );

    db.save();

    return NextResponse.json({
      success: true,
      message: 'Komentar berhasil ditambahkan.',
      data: newComment,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Gagal menambahkan komentar.' },
      { status: 500 }
    );
  }
}

