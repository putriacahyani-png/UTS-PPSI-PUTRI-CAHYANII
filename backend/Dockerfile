# CivicAI Lampung - Rust Axum Dockerfile
FROM rust:1.80-slim as builder
WORKDIR /app
COPY . .
RUN cargo build --release

FROM debian:bookworm-slim
WORKDIR /app
RUN apt-get update && apt-get install -y ca-certificates libssl3 && rm -rf /var/lib/apt/lists/*
COPY --from=builder /app/target/release/civicai-backend /app/civicai-backend
EXPOSE 8080
CMD ["/app/civicai-backend"]

