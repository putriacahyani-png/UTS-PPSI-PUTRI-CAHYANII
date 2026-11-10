// CivicAI Lampung - Analytics Trends API
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  const monthlyTrends = [
    { month: 'Jun 2026', masuk: 120, selesai: 95, sla_adherence: 94 },
    { month: 'Jul 2026', masuk: 185, selesai: 160, sla_adherence: 91 },
    { month: 'Agu 2026', masuk: 210, selesai: 198, sla_adherence: 93 },
    { month: 'Sep 2026', masuk: 275, selesai: 250, sla_adherence: 96 },
    { month: 'Okt 2026', masuk: 320, selesai: 290, sla_adherence: 92 },
    { month: 'Nov 2026', masuk: 174, selesai: 156, sla_adherence: 95 },
  ];

  const categoryShare = db.categories.map((c) => ({
    name: c.name,
    count: db.complaints.filter((comp) => comp.category_id === c.id).length + Math.floor(Math.random() * 20 + 5),
  }));

  const opdPerformance = db.organizations.map((org) => ({
    name: org.acronym,
    selesai: Math.floor(Math.random() * 50 + 20),
    proses: Math.floor(Math.random() * 15 + 2),
    avg_hours: Math.floor(Math.random() * 36 + 12),
  }));

  return NextResponse.json({
    success: true,
    data: {
      monthlyTrends,
      categoryShare,
      opdPerformance,
      avgVerificationHours: 8.5,
      avgResolutionHours: 72.4,
      slaComplianceRate: 94.2,
      duplicateRate: 3.8,
    },
  });
}

