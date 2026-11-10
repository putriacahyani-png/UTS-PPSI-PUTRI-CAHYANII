// CivicAI Lampung - References Master Data API
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  return NextResponse.json({
    success: true,
    data: {
      categories: db.categories,
      regions: db.regions,
      organizations: db.organizations,
    },
  });
}

