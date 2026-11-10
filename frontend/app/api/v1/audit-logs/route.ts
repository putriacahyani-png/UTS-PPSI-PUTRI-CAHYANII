// CivicAI Lampung - Audit Logs API
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const search = searchParams.get('search')?.toLowerCase();
  const action = searchParams.get('action');

  let list = db.auditLogs;

  if (action && action !== 'ALL') {
    list = list.filter((l) => l.action === action);
  }

  if (search) {
    list = list.filter(
      (l) =>
        l.user_name.toLowerCase().includes(search) ||
        l.details.toLowerCase().includes(search) ||
        l.entity_id.toLowerCase().includes(search) ||
        l.action.toLowerCase().includes(search)
    );
  }

  return NextResponse.json({
    success: true,
    total: list.length,
    data: list,
  });
}

