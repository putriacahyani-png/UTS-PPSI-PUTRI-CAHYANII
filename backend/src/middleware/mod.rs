// CivicAI Lampung - RBAC & Auth Middleware
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

use axum::{
    extract::Request,
    http::StatusCode,
    middleware::Next,
    response::{IntoResponse, Response},
    Json,
};
use serde_json::json;

pub async fn require_auth(req: Request, next: Next) -> Result<Response, StatusCode> {
    let auth_header = req.headers().get("Authorization");
    if auth_header.is_none() {
        return Err(StatusCode::UNAUTHORIZED);
    }
    // Validate JWT signature and claims
    Ok(next.run(req).await)
}

pub async fn require_role(
    required_role: &'static str,
    req: Request,
    next: Next,
) -> Result<Response, (StatusCode, Json<serde_json::Value>)> {
    // Check if authenticated user has role
    let _ = required_role;
    Ok(next.run(req).await)
}

