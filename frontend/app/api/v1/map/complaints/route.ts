// CivicAI Lampung - Geospatial Complaints API
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const status = searchParams.get('status');
  const categoryId = searchParams.get('category_id');
  const regionId = searchParams.get('region_id');

  let list = db.complaints;

  if (status && status !== 'ALL') {
    list = list.filter((c) => c.status === status);
  }
  if (categoryId && categoryId !== 'ALL') {
    list = list.filter((c) => c.category_id === categoryId);
  }
  if (regionId && regionId !== 'ALL') {
    list = list.filter((c) => c.region_id === regionId);
  }

  const features = list.map((c) => ({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [c.longitude, c.latitude],
    },
    properties: {
      id: c.id,
      ticket_number: c.ticket_number,
      title: c.title,
      description: c.description,
      category_name: c.category_name,
      status: c.status,
      priority: c.priority,
      address: c.address,
      region_name: c.region_name,
      organization_name: c.organization_name || 'Menunggu Penugasan',
      created_at: c.created_at,
    },
  }));

  return NextResponse.json({
    type: 'FeatureCollection',
    features,
  });
}

