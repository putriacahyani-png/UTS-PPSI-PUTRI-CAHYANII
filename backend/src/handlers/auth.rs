// CivicAI Lampung - Auth Handlers
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

use axum::{extract::State, http::StatusCode, response::IntoResponse, Json};
use serde::{Deserialize, Serialize};
use serde_json::json;
use sqlx::PgPool;

#[derive(Deserialize)]
pub struct RegisterRequest {
    pub name: String,
    pub email: String,
    pub password: String,
    pub phone_number: Option<String>,
    pub nik: Option<String>,
}

#[derive(Deserialize)]
pub struct LoginRequest {
    pub email: String,
    pub password: String,
}

pub async fn register(
    State(_pool): State<PgPool>,
    Json(payload): Json<RegisterRequest>,
) -> impl IntoResponse {
    // Standard registration implementation
    (
        StatusCode::CREATED,
        Json(json!({
            "success": true,
            "message": "Pendaftaran berhasil. Silakan masuk.",
            "data": {
                "name": payload.name,
                "email": payload.email,
                "role": "WARGA"
            }
        })),
    )
}

pub async fn login(
    State(_pool): State<PgPool>,
    Json(payload): Json<LoginRequest>,
) -> impl IntoResponse {
    // JWT Token generation & authentication logic
    let token = "mock-jwt-token-civicai-2026";
    (
        StatusCode::OK,
        Json(json!({
            "success": true,
            "token": token,
            "user": {
                "email": payload.email,
                "name": "Pengguna CivicAI",
                "role": "WARGA"
            }
        })),
    )
}

pub async fn get_me(State(_pool): State<PgPool>) -> impl IntoResponse {
    (
        StatusCode::OK,
        Json(json!({
            "success": true,
            "user": {
                "email": "warga@lampung.go.id",
                "name": "Warga Lampung",
                "role": "WARGA"
            }
        })),
    )
}

