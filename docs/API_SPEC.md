# DOKUMENTASI REST API CIVICAI LAMPUNG
## Version: v1.0.0
### Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

Base URL: `/api/v1`

---

## 1. Autentikasi
### `POST /api/v1/auth/register`
Mendaftarkan akun warga baru.
- Request Body:
  ```json
  {
    "name": "Budi Santoso",
    "email": "budi@email.com",
    "password": "password123",
    "phone_number": "0812-3456-7890",
    "nik": "1871012345670001",
    "address": "Bandar Lampung"
  }
  ```
- Response: 201 Created

### `POST /api/v1/auth/login`
Autentikasi akun warga dan petugas internal.
- Request Body:
  ```json
  {
    "email": "warga@lampung.go.id",
    "password": "warga123"
  }
  ```
- Response: 200 OK + JWT Bearer Token

### `GET /api/v1/auth/me`
Mengambil profil pengguna aktif yang sedang login.

---

## 2. Pengaduan Masyarakat (Complaints)
### `GET /api/v1/complaints`
Mengambil daftar laporan pengaduan dengan filter:
- Query Parameters: `status`, `category_id`, `region_id`, `user_id`, `search`

### `POST /api/v1/complaints`
Membuat laporan pengaduan baru. Otomatis menghasilkan nomor tiket unik format `TKT-YYYYMMDD-XXXX`.
- Request Body:
  ```json
  {
    "title": "Jalan Poros Natar Rusak",
    "description": "Terdapat lubang jalan sedalam 15cm...",
    "category_id": "cat-1",
    "region_id": "reg-3",
    "address": "Jl. Raya Natar KM 22",
    "latitude": -5.3184,
    "longitude": 105.2012,
    "attachments": [...]
  }
  ```

### `GET /api/v1/complaints/{id}`
Mengambil rincian pengaduan lengkap beserta riwayat timeline dan foto lampiran.

### `PATCH /api/v1/complaints/{id}/status`
Memperbarui status pengaduan dengan pencatatan audit log.

### `POST /api/v1/complaints/{id}/verify`
Verifikasi laporan oleh petugas:
- Action: `ACCEPT` | `REJECT` | `NEEDS_INFORMATION` | `CHANGE_CATEGORY`

### `POST /api/v1/complaints/{id}/assign`
Distribusi laporan ke OPD terkait:
- Request Body: `organization_id`, `assigned_officer_name`, `instructions`, `sla_days`

### `POST /api/v1/complaints/{id}/progress`
Pembaruan progres fisik oleh petugas OPD di lapangan:
- Request Body: `progress_percent`, `comment`, `proof_photo_url`, `is_resolve`

### `GET /api/v1/complaints/track/{ticket_number}`
Pelacakan publik nomor tiket dengan perlindungan penyamaran data pribadi pelapor (*masked identity*).

---

## 3. Peta Geospasial
### `GET /api/v1/map/complaints`
Menyajikan data koordinat titik pengaduan dalam format GeoJSON FeatureCollection.

---

## 4. Dashboard & Analitik
### `GET /api/v1/dashboard/summary`
Ringkasan KPI operasional: jumlah antrean, dalam proses, tuntas, dan indikator SLA.

### `GET /api/v1/analytics/trends`
Tren bulanan laporan masuk vs selesai dan evaluasi performa per OPD.

---

## 5. Referensi Master Data & Audit
### `GET /api/v1/references`
Data master 8 Kategori, 15 Kabupaten/Kota Provinsi Lampung, dan OPD.

### `GET /api/v1/audit-logs`
Catatan jejak audit (*immutable audit trail*) aktivitas operasional.

