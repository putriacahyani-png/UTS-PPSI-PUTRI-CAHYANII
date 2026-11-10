# STRUKTUR DATABASE POSTGRESQL & POSTGIS
## CivicAI Lampung
### Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

Database Engine: PostgreSQL 16+ dengan Ekstensi PostGIS & pgcrypto.

---

## 1. Entitas & Tabel Utama

1. **`users`**
   Menyimpan data identitas pengguna (warga dan internal).
   - `id` (UUID, PK)
   - `email` (VARCHAR, UNIQUE)
   - `password_hash` (VARCHAR)
   - `name` (VARCHAR)
   - `phone_number` (VARCHAR)
   - `nik` (VARCHAR)
   - `organization_id` (UUID, FK -> organizations)
   - `is_verified` (BOOLEAN)

2. **`roles` & `user_roles`**
   Role-Based Access Control (RBAC): `WARGA`, `VERIFIKATOR`, `PETUGAS_OPD`, `PIMPINAN`, `ADMIN`.

3. **`organizations`**
   Organisasi Perangkat Daerah (OPD) Pemprov Lampung (Dinas BMBK, Dinkes, Disdikbud, DLH, Dishub, Diskominfotik, dll).

4. **`regions`**
   15 Wilayah Kabupaten dan Kota di Provinsi Lampung beserta titik koordinat lintang & bujur.

5. **`complaint_categories` & `complaint_subcategories`**
   8 Kategori utama dan sub-kategori layanan pengaduan.

6. **`complaints`**
   Tabel transaksi utama pengaduan warga.
   - `id` (UUID, PK)
   - `ticket_number` (VARCHAR, UNIQUE) -> format `TKT-YYYYMMDD-XXXX`
   - `user_id` (UUID, FK -> users)
   - `category_id` (UUID, FK -> categories)
   - `region_id` (UUID, FK -> regions)
   - `organization_id` (UUID, FK -> organizations)
   - `title` (VARCHAR)
   - `description` (TEXT)
   - `status` (ENUM: `DRAFT`, `SUBMITTED`, `UNDER_REVIEW`, `NEEDS_INFORMATION`, `VERIFIED`, `ASSIGNED`, `IN_PROGRESS`, `RESOLVED`, `REJECTED`, `CLOSED`)
   - `priority` (ENUM: `LOW`, `MEDIUM`, `HIGH`, `URGENT`)
   - `sla_deadline_at` (TIMESTAMPTZ)
   - `rejection_reason` (TEXT)
   - `needs_info_reason` (TEXT)

7. **`complaint_locations`**
   Koordinat geografis, alamat lengkap, dan patokan lapangan.

8. **`complaint_attachments`**
   Metadata berkas lampiran bukti awal, progres lapangan, dan penyelesaian.

9. **`complaint_status_history`**
   Rekaman jejak perubahan status (audit log transisi status).

10. **`assignments`**
    Penugasan laporan dari koordinator ke OPD dan petugas lapangan.

11. **`complaint_comments`**
    Tanggapan publik dan catatan internal petugas OPD.

12. **`notifications`**
    Pemberitahuan in-app untuk warga dan petugas.

13. **`audit_logs`**
    Log audit yang bersifat *immutable* untuk akuntabilitas sistem.

14. **`sla_policies`**
    Kebijakan durasi verifikasi, penugasan, dan resolusi per tingkat prioritas.

15. **`ai_predictions`**
    Rekomendasi model AI (kategori, confidence score, deteksi duplikat, penjelasan faktor) dengan prinsip *Human-in-the-Loop*.

