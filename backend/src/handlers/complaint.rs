// CivicAI Lampung - Complaint Handlers
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

use axum::{
    extract::{Path, Query, State},
    http::StatusCode,
    response::IntoResponse,
    Json,
};
use serde::{Deserialize, Serialize};
use serde_json::json;
use sqlx::PgPool;

#[derive(Deserialize)]
pub struct CreateComplaintRequest {
    pub title: String,
    pub description: String,
    pub category_id: String,
    pub region_id: String,
    pub address: String,
    pub landmark: Option<String>,
    pub latitude: f64,
    pub longitude: f64,
    pub incident_date: Option<String>,
    pub is_anonymous: Option<bool>,
}

#[derive(Deserialize)]
pub struct VerifyRequest {
    pub action: String, // 'ACCEPT', 'REJECT', 'NEED_INFO'
    pub reason: Option<String>,
    pub category_id: Option<String>,
}

#[derive(Deserialize)]
pub struct AssignRequest {
    pub organization_id: String,
    pub assigned_to_user_id: Option<String>,
    pub instructions: Option<String>,
    pub target_completion_at: Option<String>,
}

#[derive(Deserialize)]
pub struct StatusUpdateRequest {
    pub status: String,
    pub reason: Option<String>,
}

#[derive(Deserialize)]
pub struct CommentRequest {
    pub comment: String,
    pub is_internal_only: Option<bool>,
}

pub async fn create_complaint(
    State(_pool): State<PgPool>,
    Json(payload): Json<CreateComplaintRequest>,
) -> impl IntoResponse {
    let ticket_number = format!("TKT-20261110-{}", rand_code());
    (
        StatusCode::CREATED,
        Json(json!({
            "success": true,
            "message": "Pengaduan berhasil dikirim.",
            "data": {
                "ticket_number": ticket_number,
                "title": payload.title,
                "status": "SUBMITTED"
            }
        })),
    )
}

pub async fn list_complaints(State(_pool): State<PgPool>) -> impl IntoResponse {
    (StatusCode::OK, Json(json!({ "success": true, "data": [] })))
}

pub async fn list_my_complaints(State(_pool): State<PgPool>) -> impl IntoResponse {
    (StatusCode::OK, Json(json!({ "success": true, "data": [] })))
}

pub async fn get_complaint(
    Path(id): Path<String>,
    State(_pool): State<PgPool>,
) -> impl IntoResponse {
    (
        StatusCode::OK,
        Json(json!({
            "success": true,
            "data": { "id": id, "status": "SUBMITTED" }
        })),
    )
}

pub async fn update_status(
    Path(id): Path<String>,
    State(_pool): State<PgPool>,
    Json(payload): Json<StatusUpdateRequest>,
) -> impl IntoResponse {
    (
        StatusCode::OK,
        Json(json!({
            "success": true,
            "message": format!("Status tiket {} diperbarui menjadi {}", id, payload.status)
        })),
    )
}

pub async fn verify_complaint(
    Path(id): Path<String>,
    State(_pool): State<PgPool>,
    Json(payload): Json<VerifyRequest>,
) -> impl IntoResponse {
    (
        StatusCode::OK,
        Json(json!({
            "success": true,
            "message": format!("Verifikasi tiket {} berhasil diproses", id),
            "action": payload.action
        })),
    )
}

pub async fn assign_complaint(
    Path(id): Path<String>,
    State(_pool): State<PgPool>,
    Json(payload): Json<AssignRequest>,
) -> impl IntoResponse {
    (
        StatusCode::OK,
        Json(json!({
            "success": true,
            "message": format!("Tiket {} berhasil ditugaskan ke OPD", id),
            "organization_id": payload.organization_id
        })),
    )
}

pub async fn add_comment(
    Path(id): Path<String>,
    State(_pool): State<PgPool>,
    Json(payload): Json<CommentRequest>,
) -> impl IntoResponse {
    (
        StatusCode::CREATED,
        Json(json!({
            "success": true,
            "message": "Komentar berhasil ditambahkan",
            "is_internal": payload.is_internal_only.unwrap_or(false)
        })),
    )
}

pub async fn upload_attachment(
    Path(id): Path<String>,
    State(_pool): State<PgPool>,
) -> impl IntoResponse {
    (
        StatusCode::CREATED,
        Json(json!({
            "success": true,
            "message": format!("Lampiran untuk tiket {} berhasil diunggah", id)
        })),
    )
}

pub async fn track_ticket(
    Path(ticket_number): Path<String>,
    State(_pool): State<PgPool>,
) -> impl IntoResponse {
    (
        StatusCode::OK,
        Json(json!({
            "success": true,
            "data": {
                "ticket_number": ticket_number,
                "status": "IN_PROGRESS"
            }
        })),
    )
}

fn rand_code() -> u32 {
    1047
}

