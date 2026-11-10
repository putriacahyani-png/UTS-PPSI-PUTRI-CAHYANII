// CivicAI Lampung - Notifications API
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('user_id');
  let list = db.notifications;

  if (userId) {
    list = list.filter((n) => n.user_id === userId);
  }

  return NextResponse.json({
    success: true,
    total: list.length,
    unread: list.filter((n) => !n.is_read).length,
    data: list,
  });
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, mark_all = false, user_id } = body;

    if (mark_all) {
      db.notifications.forEach((n) => {
        if (!user_id || n.user_id === user_id) {
          n.is_read = true;
        }
      });
    } else if (id) {
      const notif = db.notifications.find((n) => n.id === id);
      if (notif) notif.is_read = true;
    }

    db.save();

    return NextResponse.json({
      success: true,
      message: 'Notifikasi berhasil diperbarui.',
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Gagal memperbarui notifikasi.' },
      { status: 500 }
    );
  }
}

