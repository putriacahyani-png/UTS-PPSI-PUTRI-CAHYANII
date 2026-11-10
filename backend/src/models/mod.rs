// CivicAI Lampung - Domain Models
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub enum UserRole {
    WARGA,
    VERIFIKATOR,
    PETUGAS_OPD,
    PIMPINAN,
    ADMIN,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub enum ComplaintStatus {
    DRAFT,
    SUBMITTED,
    UNDER_REVIEW,
    NEEDS_INFORMATION,
    VERIFIED,
    ASSIGNED,
    IN_PROGRESS,
    RESOLVED_PENDING_CONFIRMATION,
    RESOLVED,
    REJECTED,
    CLOSED,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub enum PriorityLevel {
    LOW,
    MEDIUM,
    HIGH,
    URGENT,
}

#[derive(Debug, Clone, Serialize, Deserialize, sqlx::FromRow)]
pub struct User {
    pub id: Uuid,
    pub email: String,
    #[serde(skip_serializing)]
    pub password_hash: String,
    pub name: String,
    pub phone_number: Option<String>,
    pub nik: Option<String>,
    pub address: Option<String>,
    pub organization_id: Option<Uuid>,
    pub is_verified: bool,
    pub is_active: bool,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize, sqlx::FromRow)]
pub struct Complaint {
    pub id: Uuid,
    pub ticket_number: String,
    pub user_id: Uuid,
    pub category_id: Uuid,
    pub subcategory_id: Option<Uuid>,
    pub organization_id: Option<Uuid>,
    pub region_id: Uuid,
    pub title: String,
    pub description: String,
    pub status: String,
    pub priority: String,
    pub incident_date: Option<DateTime<Utc>>,
    pub is_anonymous: bool,
    pub sla_deadline_at: Option<DateTime<Utc>>,
    pub resolved_at: Option<DateTime<Utc>>,
    pub rejection_reason: Option<String>,
    pub needs_info_reason: Option<String>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize, sqlx::FromRow)]
pub struct ComplaintLocation {
    pub id: Uuid,
    pub complaint_id: Uuid,
    pub province: String,
    pub regency_city: String,
    pub district: Option<String>,
    pub address: String,
    pub landmark: Option<String>,
    pub latitude: f64,
    pub longitude: f64,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize, sqlx::FromRow)]
pub struct ComplaintAttachment {
    pub id: Uuid,
    pub complaint_id: Uuid,
    pub uploader_id: Option<Uuid>,
    pub file_name: String,
    pub file_type: String,
    pub file_size_bytes: i64,
    pub storage_key: String,
    pub is_public: bool,
    pub attachment_type: String,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize, sqlx::FromRow)]
pub struct ComplaintStatusHistory {
    pub id: Uuid,
    pub complaint_id: Uuid,
    pub previous_status: Option<String>,
    pub new_status: String,
    pub changed_by_user_id: Option<Uuid>,
    pub reason: Option<String>,
    pub metadata: Option<serde_json::Value>,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize, sqlx::FromRow)]
pub struct Assignment {
    pub id: Uuid,
    pub complaint_id: Uuid,
    pub organization_id: Uuid,
    pub assigned_by_user_id: Option<Uuid>,
    pub assigned_to_user_id: Option<Uuid>,
    pub instructions: Option<String>,
    pub target_completion_at: Option<DateTime<Utc>>,
    pub is_active: bool,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize, sqlx::FromRow)]
pub struct ComplaintComment {
    pub id: Uuid,
    pub complaint_id: Uuid,
    pub user_id: Option<Uuid>,
    pub comment: String,
    pub is_internal_only: bool,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize, sqlx::FromRow)]
pub struct Notification {
    pub id: Uuid,
    pub user_id: Uuid,
    pub complaint_id: Option<Uuid>,
    pub title: String,
    pub message: String,
    pub notification_type: String,
    pub is_read: bool,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize, sqlx::FromRow)]
pub struct AuditLog {
    pub id: Uuid,
    pub user_id: Option<Uuid>,
    pub action: String,
    pub entity_type: String,
    pub entity_id: String,
    pub details: Option<serde_json::Value>,
    pub ip_address: Option<String>,
    pub created_at: DateTime<Utc>,
}

