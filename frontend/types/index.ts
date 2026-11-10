// CivicAI Lampung - TypeScript Domain Types
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

export type UserRole = 'WARGA' | 'VERIFIKATOR' | 'PETUGAS_OPD' | 'PIMPINAN' | 'ADMIN';

export type ComplaintStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'NEEDS_INFORMATION'
  | 'VERIFIED'
  | 'ASSIGNED'
  | 'IN_PROGRESS'
  | 'RESOLVED_PENDING_CONFIRMATION'
  | 'RESOLVED'
  | 'REJECTED'
  | 'CLOSED';

export type PriorityLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone_number?: string;
  nik?: string;
  address?: string;
  organization_id?: string;
  organization_name?: string;
  is_verified: boolean;
  avatar_url?: string;
  created_at: string;
}

export interface Organization {
  id: string;
  code: string;
  name: string;
  acronym: string;
  category: string;
  contact_email: string;
  contact_phone: string;
  address: string;
}

export interface Region {
  id: string;
  code: string;
  name: string;
  type: 'KABUPATEN' | 'KOTA';
  latitude: number;
  longitude: number;
}

export interface Category {
  id: string;
  code: string;
  name: string;
  icon: string;
  description: string;
  default_organization_id: string;
}

export interface ComplaintAttachment {
  id: string;
  complaint_id: string;
  file_name: string;
  file_url: string;
  file_type: string;
  file_size_bytes: number;
  attachment_type: 'INITIAL_EVIDENCE' | 'PROGRESS_PROOF' | 'RESOLUTION_PROOF';
  created_at: string;
}

export interface ComplaintStatusHistory {
  id: string;
  complaint_id: string;
  previous_status?: ComplaintStatus;
  new_status: ComplaintStatus;
  changed_by_name: string;
  changed_by_role: UserRole;
  reason?: string;
  created_at: string;
}

export interface ComplaintComment {
  id: string;
  complaint_id: string;
  user_name: string;
  user_role: UserRole;
  comment: string;
  is_internal_only: boolean;
  created_at: string;
}

export interface AIPrediction {
  category_name: string;
  confidence: number;
  suggested_priority: PriorityLevel;
  priority_confidence: number;
  duplicate_candidates: {
    ticket_number: string;
    title: string;
    similarity_score: number;
    distance_km: number;
  }[];
  explanation: string;
  factors: string[];
}

export interface Complaint {
  id: string;
  ticket_number: string;
  user_id: string;
  citizen_name: string;
  citizen_phone?: string;
  citizen_email?: string;
  category_id: string;
  category_name: string;
  category_icon: string;
  organization_id?: string;
  organization_name?: string;
  region_id: string;
  region_name: string;
  title: string;
  description: string;
  status: ComplaintStatus;
  priority: PriorityLevel;
  incident_date: string;
  address: string;
  landmark?: string;
  latitude: number;
  longitude: number;
  progress_percent?: number;
  attachments: ComplaintAttachment[];
  history: ComplaintStatusHistory[];
  comments: ComplaintComment[];
  ai_prediction?: AIPrediction;
  assigned_to?: string;
  assigned_officer_name?: string;
  sla_deadline_at?: string;
  rejection_reason?: string;
  needs_info_reason?: string;
  created_at: string;
  updated_at: string;
}

export interface NotificationItem {
  id: string;
  user_id: string;
  complaint_id?: string;
  ticket_number?: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
}

export interface AuditLogItem {
  id: string;
  user_name: string;
  user_role: UserRole;
  action: string;
  entity_type: string;
  entity_id: string;
  details: string;
  ip_address: string;
  created_at: string;
}

