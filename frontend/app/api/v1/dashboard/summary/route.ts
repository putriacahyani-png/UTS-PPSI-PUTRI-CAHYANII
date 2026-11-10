// CivicAI Lampung - Dashboard Summary API
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  const complaints = db.complaints;

  const total = complaints.length;
  const submitted = complaints.filter((c) => c.status === 'SUBMITTED').length;
  const underReview = complaints.filter((c) => c.status === 'UNDER_REVIEW').length;
  const needsInfo = complaints.filter((c) => c.status === 'NEEDS_INFORMATION').length;
  const verified = complaints.filter((c) => c.status === 'VERIFIED').length;
  const assigned = complaints.filter((c) => c.status === 'ASSIGNED').length;
  const inProgress = complaints.filter((c) => c.status === 'IN_PROGRESS').length;
  const resolved = complaints.filter((c) => c.status === 'RESOLVED').length;
  const rejected = complaints.filter((c) => c.status === 'REJECTED').length;

  const waitingVerification = submitted + underReview;
  const activeProcessing = assigned + inProgress;

  // Category counts
  const categoryCounts = db.categories.map((cat) => ({
    category_id: cat.id,
    name: cat.name,
    icon: cat.icon,
    count: complaints.filter((c) => c.category_id === cat.id).length,
  }));

  // Region counts
  const regionCounts = db.regions.map((reg) => ({
    region_id: reg.id,
    name: reg.name,
    count: complaints.filter((c) => c.region_id === reg.id).length,
  }));

  return NextResponse.json({
    success: true,
    data: {
      total,
      waitingVerification,
      activeProcessing,
      resolved,
      rejected,
      needsInfo,
      slaWarningCount: 14,
      breakdown: {
        submitted,
        underReview,
        verified,
        assigned,
        inProgress,
        resolved,
        rejected,
        needsInfo,
      },
      categoryCounts,
      regionCounts,
    },
  });
}

