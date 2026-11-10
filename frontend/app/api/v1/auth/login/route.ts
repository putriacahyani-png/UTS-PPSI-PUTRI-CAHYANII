// CivicAI Lampung - Auth Login API
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email dan kata sandi wajib diisi.' },
        { status: 400 }
      );
    }

    const user = db.users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Kombinasi email atau kata sandi tidak ditemukan.' },
        { status: 401 }
      );
    }

    db.addAuditLog(
      user.name,
      user.role,
      'USER_LOGIN',
      'User',
      user.id,
      `Pengguna masuk dengan role ${user.role}`
    );

    return NextResponse.json({
      success: true,
      message: 'Berhasil masuk ke CivicAI Lampung.',
      token: `jwt-token-${user.id}-${Date.now()}`,
      user,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan pada server.' },
      { status: 500 }
    );
  }
}

