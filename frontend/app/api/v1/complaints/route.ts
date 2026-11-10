// CivicAI Lampung - Complaints API
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Complaint, PriorityLevel } from '@/types';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const status = searchParams.get('status');
  const categoryId = searchParams.get('category_id');
  const regionId = searchParams.get('region_id');
  const userId = searchParams.get('user_id');
  const search = searchParams.get('search')?.toLowerCase();

  let list = [...db.complaints];

  if (userId) {
    list = list.filter((c) => c.user_id === userId);
  }
  if (status && status !== 'ALL') {
    list = list.filter((c) => c.status === status);
  }
  if (categoryId && categoryId !== 'ALL') {
    list = list.filter((c) => c.category_id === categoryId);
  }
  if (regionId && regionId !== 'ALL') {
    list = list.filter((c) => c.region_id === regionId);
  }
  if (search) {
    list = list.filter(
      (c) =>
        c.ticket_number.toLowerCase().includes(search) ||
        c.title.toLowerCase().includes(search) ||
        c.description.toLowerCase().includes(search) ||
        c.address.toLowerCase().includes(search) ||
        c.citizen_name.toLowerCase().includes(search)
    );
  }

  // Sort newest first
  list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return NextResponse.json({
    success: true,
    total: list.length,
    data: list,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      user_id = 'usr-warga-1',
      citizen_name = 'Ahmad Fauzi, S.T.',
      title,
      description,
      category_id,
      region_id,
      incident_date,
      address,
      landmark,
      latitude,
      longitude,
      attachments = [],
    } = body;

    if (!title || !description || !category_id || !region_id || !address) {
      return NextResponse.json(
        { success: false, message: 'Harap lengkapi semua bidang wajib formulir.' },
        { status: 400 }
      );
    }

    const category = db.categories.find((c) => c.id === category_id);
    const region = db.regions.find((r) => r.id === region_id);

    // Generate unique Ticket ID format: TKT-YYYYMMDD-XXXX
    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const ticketNumber = `TKT-${dateStr}-${randNum}`;

    const newId = `c-${Date.now()}`;
    const nowIso = new Date().toISOString();

    // AI Assisted Classification Simulation
    const aiCategory = category?.name || 'Infrastruktur Jalan & Jembatan';
    const isHighPriority =
      title.toLowerCase().includes('rusak') ||
      title.toLowerCase().includes('parah') ||
      title.toLowerCase().includes('banjir') ||
      title.toLowerCase().includes('ambrol');

    const suggestedPriority: PriorityLevel = isHighPriority ? 'HIGH' : 'MEDIUM';

    const newComplaint: Complaint = {
      id: newId,
      ticket_number: ticketNumber,
      user_id,
      citizen_name,
      category_id,
      category_name: category?.name || 'Kategori Umum',
      category_icon: category?.icon || 'help-circle',
      region_id,
      region_name: region?.name || 'Provinsi Lampung',
      title,
      description,
      status: 'SUBMITTED',
      priority: suggestedPriority,
      incident_date: incident_date || nowIso,
      address,
      landmark: landmark || '',
      latitude: Number(latitude) || -5.4297,
      longitude: Number(longitude) || 105.2625,
      progress_percent: 0,
      attachments: attachments.map((att: any, idx: number) => ({
        id: `att-${Date.now()}-${idx}`,
        complaint_id: newId,
        file_name: att.file_name || `lampiran_${idx + 1}.jpg`,
        file_url: att.file_url || 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop',
        file_type: att.file_type || 'image/jpeg',
        file_size_bytes: att.file_size_bytes || 1500000,
        attachment_type: 'INITIAL_EVIDENCE',
        created_at: nowIso,
      })),
      history: [
        {
          id: `h-${Date.now()}`,
          complaint_id: newId,
          new_status: 'SUBMITTED',
          changed_by_name: citizen_name,
          changed_by_role: 'WARGA',
          reason: 'Laporan pengaduan baru berhasil dikirim oleh warga',
          created_at: nowIso,
        },
      ],
      comments: [],
      ai_prediction: {
        category_name: aiCategory,
        confidence: 0.93,
        suggested_priority: suggestedPriority,
        priority_confidence: 0.88,
        duplicate_candidates: [],
        explanation: 'AI mengklasifikasi berdasarkan kata kunci kerusakan infrastruktur dan lokasi kejadian.',
        factors: ['Kejelasan deskripsi masalah', 'Lokasi geografis valid', 'Lampiran bukti visual'],
      },
      created_at: nowIso,
      updated_at: nowIso,
    };

    db.complaints.unshift(newComplaint);

    // Create In-App Notification for Citizen & Verifiers
    db.notifications.unshift({
      id: `notif-${Date.now()}`,
      user_id,
      complaint_id: newId,
      ticket_number: ticketNumber,
      title: 'Laporan Berhasil Terdaftar',
      message: `Pengaduan ${ticketNumber} "${title}" telah diterima sistem dan menunggu pemeriksaan verifikator.`,
      type: 'SUBMISSION',
      is_read: false,
      created_at: nowIso,
    });

    db.addAuditLog(
      citizen_name,
      'WARGA',
      'CREATE_COMPLAINT',
      'Complaint',
      ticketNumber,
      `Pendaftaran pengaduan baru: "${title}" di ${region?.name}`
    );

    db.save();

    return NextResponse.json(
      {
        success: true,
        message: 'Pengaduan Anda berhasil dikirim ke CivicAI Lampung.',
        data: newComplaint,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: 'Gagal memproses pembuatan laporan.' },
      { status: 500 }
    );
  }
}

