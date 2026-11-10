// CivicAI Lampung - Register API
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { User } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, phone_number, nik, address } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Nama lengkap, email, dan kata sandi wajib diisi.' },
        { status: 400 }
      );
    }

    const existing = db.users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (existing) {
      return NextResponse.json(
        { success: false, message: 'Email sudah terdaftar. Silakan gunakan email lain atau masuk.' },
        { status: 409 }
      );
    }

    const newUser: User = {
      id: `usr-${Date.now()}`,
      email: email.toLowerCase(),
      name,
      role: 'WARGA',
      phone_number: phone_number || '',
      nik: nik || '',
      address: address || '',
      is_verified: true,
      created_at: new Date().toISOString(),
    };

    db.users.push(newUser);
    db.save();

    db.addAuditLog(
      newUser.name,
      newUser.role,
      'USER_REGISTER',
      'User',
      newUser.id,
      `Pendaftaran akun warga baru: ${newUser.email}`
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Pendaftaran berhasil. Silakan masuk menggunakan akun Anda.',
        user: newUser,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan pada server.' },
      { status: 500 }
    );
  }
}

