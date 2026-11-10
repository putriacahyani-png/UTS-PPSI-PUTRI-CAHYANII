// CivicAI Lampung - Backend Entry Point
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

use std::net::SocketAddr;
use tower_http::cors::{Any, CorsLayer};
use tower_http::trace::TraceLayer;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

mod config;
mod handlers;
mod middleware;
mod models;
mod repositories;
mod routes;
mod services;
mod workers;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    dotenvy::dotenv().ok();

    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "civicai_backend=debug,tower_http=debug,axum=trace".into()),
        )
        .with(tracing_subscriber::fmt::layer())
        .init();

    let server_config = config::AppConfig::from_env();
    tracing::info!("CivicAI Lampung Backend starting on port {}", server_config.port);

    // Initialize Database Connection Pool
    let db_pool = config::init_db_pool(&server_config.database_url).await;
    tracing::info!("PostgreSQL connection established successfully.");

    // Start background worker for notifications & SLA escalation
    workers::start_sla_escalation_worker(db_pool.clone());

    // CORS configuration
    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    // Build Axum Router
    let app = routes::create_router(db_pool)
        .layer(cors)
        .layer(TraceLayer::new_for_http());

    let addr = SocketAddr::from(([0, 0, 0, 0], server_config.port));
    tracing::info!("Listening on {}", addr);

    let listener = tokio::net::TcpListener::bind(addr).await?;
    axum::serve(listener, app).await?;

    Ok(())
}

