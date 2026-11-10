// CivicAI Lampung - Users Management API
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { User } from '@/types';

export async function GET(req: NextRequest) {
  const role = req.nextUrl.searchParams.get('role');
  let list = db.users;

  if (role && role !== 'ALL') {
    list = list.filter((u) => u.role === role);
  }

  return NextResponse.json({
    success: true,
    total: list.length,
    data: list,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, role, organization_id, phone_number } = body;

    if (!name || !email || !role) {
      return NextResponse.json(
        { success: false, message: 'Nama, email, dan peran akun wajib diisi.' },
        { status: 400 }
      );
    }

    const org = db.organizations.find((o) => o.id === organization_id);

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      role,
      organization_id,
      organization_name: org?.name,
      phone_number: phone_number || '',
      is_verified: true,
      created_at: new Date().toISOString(),
    };

    db.users.push(newUser);

    db.addAuditLog(
      'Administrator',
      'ADMIN',
      'CREATE_INTERNAL_USER',
      'User',
      newUser.id,
      `Membuat akun internal baru: ${name} (${role}) - ${org?.acronym || 'Umum'}`
    );

    db.save();

    return NextResponse.json({
      success: true,
      message: 'Akun internal berhasil dibuat.',
      data: newUser,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Gagal membuat pengguna baru.' },
      { status: 500 }
    );
  }
}

