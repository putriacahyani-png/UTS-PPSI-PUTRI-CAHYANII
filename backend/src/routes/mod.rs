// CivicAI Lampung - Route Definitions
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

use axum::{
    routing::{get, patch, post},
    Router,
};
use sqlx::PgPool;

use crate::handlers;

pub fn create_router(pool: PgPool) -> Router {
    Router::new()
        // Health check
        .route("/api/v1/health", get(handlers::health_check))
        
        // Auth Routes
        .route("/api/v1/auth/register", post(handlers::auth::register))
        .route("/api/v1/auth/login", post(handlers::auth::login))
        .route("/api/v1/auth/me", get(handlers::auth::get_me))
        
        // Complaint Routes
        .route("/api/v1/complaints", post(handlers::complaint::create_complaint))
        .route("/api/v1/complaints", get(handlers::complaint::list_complaints))
        .route("/api/v1/complaints/:id", get(handlers::complaint::get_complaint))
        .route("/api/v1/complaints/:id/status", patch(handlers::complaint::update_status))
        .route("/api/v1/complaints/:id/verify", post(handlers::complaint::verify_complaint))
        .route("/api/v1/complaints/:id/assign", post(handlers::complaint::assign_complaint))
        .route("/api/v1/complaints/:id/comments", post(handlers::complaint::add_comment))
        .route("/api/v1/complaints/:id/attachments", post(handlers::complaint::upload_attachment))
        .route("/api/v1/complaints/track/:ticket_number", get(handlers::complaint::track_ticket))
        
        // Citizen Specific
        .route("/api/v1/me/complaints", get(handlers::complaint::list_my_complaints))
        
        // Dashboard & Analytics
        .route("/api/v1/dashboard/summary", get(handlers::dashboard::get_summary))
        .route("/api/v1/analytics/trends", get(handlers::dashboard::get_analytics))
        
        // Geospatial / Map
        .route("/api/v1/map/complaints", get(handlers::map::get_map_complaints))
        
        // Notifications
        .route("/api/v1/notifications", get(handlers::notification::get_notifications))
        .route("/api/v1/notifications/:id/read", patch(handlers::notification::mark_as_read))
        .route("/api/v1/notifications/read-all", patch(handlers::notification::mark_all_read))
        
        // References (Master Data)
        .route("/api/v1/references/categories", get(handlers::reference::get_categories))
        .route("/api/v1/references/regions", get(handlers::reference::get_regions))
        .route("/api/v1/references/organizations", get(handlers::reference::get_organizations))
        .route("/api/v1/references/sla-policies", get(handlers::reference::get_sla_policies))
        
        // Audit Logs
        .route("/api/v1/audit-logs", get(handlers::audit::list_audit_logs))
        
        .with_state(pool)
}

