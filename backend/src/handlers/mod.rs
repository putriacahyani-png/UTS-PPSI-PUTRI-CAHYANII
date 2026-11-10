// CivicAI Lampung - Handlers Aggregator
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

use axum::response::IntoResponse;
use axum::Json;
use serde_json::json;

pub mod auth;
pub mod complaint;
pub mod reference;

pub use reference::audit;
pub use reference::dashboard;
pub use reference::map;
pub use reference::notification;

pub async fn health_check() -> impl IntoResponse {
    Json(json!({
        "status": "healthy",
        "service": "CivicAI Lampung API",
        "version": "1.0.0",
        "copyright": "Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom"
    }))
}
