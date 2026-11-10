// CivicAI Lampung - Current User Profile API
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId') || 'usr-warga-1';
  const user = db.users.find((u) => u.id === userId) || db.users[0];

  return NextResponse.json({
    success: true,
    user,
  });
}

