# PRODUCT REQUIREMENT DOCUMENT (PRD)

## CivicAI – Smart Citizen Complaint

*Versi 1.0 | 10 November 2026*

Dokumen kebutuhan produk dan validasi teknologi

> Pemerintah Provinsi Lampung · Universitas Teknokrat Indonesia

---

## Daftar Isi

1. [Ringkasan Produk](#1-ringkasan-produk)
2. [Visi, Tujuan, dan Batasan](#2-visi-tujuan-dan-batasan)
3. [Pengguna dan Hak Akses](#3-pengguna-dan-hak-akses)
4. [Alur Bisnis Utama](#4-alur-bisnis-utama)
5. [Kebutuhan Fungsional](#5-kebutuhan-fungsional)
6. [Kebutuhan AI dan Batas Penggunaannya](#6-kebutuhan-ai-dan-batas-penggunaannya)
7. [Kebutuhan Nonfungsional](#7-kebutuhan-nonfungsional)
8. [Arsitektur dan Teknologi yang Direkomendasikan](#8-arsitektur-dan-teknologi-yang-direkomendasikan)
9. [Model Data Awal](#9-model-data-awal)
10. [API dan Integrasi](#10-api-dan-integrasi)
11. [Antarmuka dan Identitas Visual](#11-antarmuka-dan-identitas-visual)
12. [Prioritas dan Roadmap](#12-prioritas-dan-roadmap)
13. [Metrik Keberhasilan](#13-metrik-keberhasilan)
14. [Risiko dan Mitigasi](#14-risiko-dan-mitigasi)
15. [Validasi Kelayakan Rust dan PostgreSQL](#15-validasi-kelayakan-rust-dan-postgresql)
16. [Kriteria Penerimaan MVP](#16-kriteria-penerimaan-mvp)
17. [Pertanyaan yang Harus Diputuskan Sebelum Pengembangan](#17-pertanyaan-yang-harus-diputuskan-sebelum-pengembangan)
18. [Referensi Teknis](#18-referensi-teknis)

---

## 1. Ringkasan Produk

### 1.1 Deskripsi

CivicAI adalah platform pengaduan masyarakat berbasis web yang menghubungkan warga dengan perangkat daerah/OPD untuk menerima, memverifikasi, mendistribusikan, menindaklanjuti, dan mengevaluasi laporan publik. Sistem menyediakan nomor tiket, pelacakan status, bukti foto, lokasi kejadian, notifikasi, dashboard, dan analitik. Komponen AI digunakan sebagai alat bantu untuk mengelompokkan laporan, menemukan laporan yang mirip, dan memberi rekomendasi prioritas. **Keputusan akhir tetap berada pada petugas yang berwenang.**

### 1.2 Masalah yang Diselesaikan

Pengaduan sering tersebar di banyak kanal, sulit dilacak, berulang, tidak memiliki standar kategorisasi, dan kurang transparan bagi pelapor. Pimpinan juga membutuhkan ringkasan lintas OPD untuk melihat tren masalah, area dengan laporan tinggi, serta kinerja tindak lanjut.

### 1.3 Nilai Produk

- Satu kanal pengaduan
- Status dan riwayat yang dapat dipantau
- Penugasan yang tercatat
- Koordinasi lintas OPD
- Pemetaan laporan
- Pengurangan duplikasi
- Informasi kinerja yang lebih mudah dievaluasi

---

## 2. Visi, Tujuan, dan Batasan

### 2.1 Visi

Mewujudkan pengelolaan aspirasi dan pengaduan warga yang mudah diakses, terukur, transparan, dan dapat ditindaklanjuti.

### 2.2 Tujuan

- Memudahkan warga menyampaikan laporan
- Mempercepat verifikasi dan distribusi
- Menjaga jejak audit
- Menyediakan informasi progres
- Membantu pimpinan mengidentifikasi pola masalah
- Menyediakan dasar pengembangan layanan digital pemerintah daerah

### 2.3 Bukan Tujuan

CivicAI:

- **bukan** kanal darurat untuk ancaman keselamatan yang membutuhkan respons instan;
- **bukan** pengganti seluruh sistem resmi pengaduan pemerintah;
- **bukan** sistem yang secara otomatis menetapkan sanksi atau menyimpulkan kesalahan;
- **bukan** pengganti keputusan petugas lapangan.

### 2.4 Asumsi dan Keputusan Ruang Lingkup

Logo yang diberikan merupakan identitas Provinsi Lampung. PRD ini menetapkan konteks awal Pemda Lampung dengan konfigurasi OPD. Sebelum implementasi, pemilik produk wajib menetapkan apakah pilot berada pada tingkat Pemerintah Provinsi Lampung atau pemerintah kabupaten/kota tertentu. Struktur wilayah, daftar OPD, SLA, kanal eskalasi, dan kebijakan retensi harus mengikuti keputusan tersebut.

---

## 3. Pengguna dan Hak Akses

### 3.1 Warga/Pelapor

Membuat laporan; mengunggah foto; menentukan titik lokasi; melihat nomor tiket dan status; menambahkan informasi; memberi penilaian setelah selesai; melihat pengumuman publik. Warga hanya dapat melihat laporan miliknya, kecuali laporan yang memang dipublikasikan secara agregat atau anonim.

### 3.2 Petugas Verifikator

Memeriksa kelengkapan, validitas, kategori, lokasi, urgensi, potensi duplikasi, dan kelayakan laporan. Dapat meminta informasi tambahan, menolak dengan alasan, atau meneruskan ke OPD terkait.

### 3.3 Petugas OPD/Pelaksana

Melihat laporan yang ditugaskan kepada unitnya; memperbarui status; menambahkan catatan internal; mengunggah bukti tindak lanjut; dan mengusulkan penyelesaian.

### 3.4 Admin Sistem

Mengelola akun internal, role, unit OPD, kategori, parameter SLA, template notifikasi, konfigurasi sistem, dan audit akses. Admin tidak otomatis berhak membaca seluruh isi laporan sensitif tanpa kebutuhan tugas.

### 3.5 Pimpinan/Koordinator OPD

Memantau dashboard unit atau wilayah kewenangannya, beban laporan, SLA, backlog, tren kategori, dan laporan yang membutuhkan eskalasi. Akses bersifat *read-only* kecuali diberikan kewenangan operasional.

### 3.6 Matriks Hak Akses

RBAC wajib diterapkan pada API dan antarmuka. Hak akses minimal:

| Peran | Cakupan Akses Minimal |
|---|---|
| Warga | Laporan milik sendiri |
| Verifikator | Antrian verifikasi sesuai cakupan |
| Petugas OPD | Tiket unitnya |
| Pimpinan | Agregat dan tiket sesuai kewenangan |
| Admin | Konfigurasi dan administrasi |

Semua perubahan status, penugasan, dan akses administratif dicatat dalam audit log.

---

## 4. Alur Bisnis Utama

### 4.1 Alur Pengaduan

```
Warga mengisi formulir
  → Sistem memvalidasi data dan menyimpan tiket
  → Sistem memberi nomor tiket
  → AI memberi saran kategori/kemiripan/prioritas (bila modul tersedia)
  → Verifikator memeriksa
  → Laporan: diterima | diminta dilengkapi | ditolak dengan alasan | diteruskan
  → Koordinator menugaskan ke OPD
  → Petugas menangani dan mengunggah bukti
  → Verifikator/koordinator memvalidasi penyelesaian
  → Warga menerima notifikasi dan dapat memberi umpan balik
  → Data masuk ke analitik
```

### 4.2 Status Tiket

`DRAFT` (opsional sebelum dikirim), `SUBMITTED`, `UNDER_REVIEW`, `NEEDS_INFORMATION`, `VERIFIED`, `ASSIGNED`, `IN_PROGRESS`, `RESOLVED_PENDING_CONFIRMATION`, `RESOLVED`, `REJECTED`, dan `CLOSED`.

Transisi status harus dibatasi berdasarkan role dan dicatat dengan waktu, pelaku, alasan, serta perubahan terkait.

### 4.3 Eskalasi

Tiket yang mendekati atau melewati SLA ditandai dan masuk ke daftar eskalasi. Sistem mengirim pengingat ke petugas dan koordinator. Eskalasi tidak boleh mengubah isi laporan atau menetapkan prioritas secara otomatis tanpa aturan yang disetujui.

---

## 5. Kebutuhan Fungsional

| ID | Nama | Deskripsi |
|---|---|---|
| **FR-01** | Registrasi dan Autentikasi | Warga dapat membuat akun dan masuk dengan mekanisme yang ditentukan pemilik produk. Akun internal dibuat/diundang oleh admin. Mendukung pemulihan akses yang aman, verifikasi kontak, logout, dan pembatasan percobaan login. |
| **FR-02** | Pembuatan Laporan | Form berisi judul, deskripsi, kategori (opsional bila akan disarankan sistem), lokasi, waktu kejadian (opsional), foto/lampiran, dan persetujuan pemrosesan data. Validasi ukuran/jenis file, field wajib, serta koordinat. |
| **FR-03** | Nomor Tiket dan Pelacakan | Setiap laporan yang berhasil dikirim memperoleh ID unik yang tidak mudah ditebak. Pelapor dapat melihat status, riwayat publik, dan tanggapan yang boleh ditampilkan. |
| **FR-04** | Verifikasi dan Klarifikasi | Petugas dapat memeriksa, mengubah kategori dengan alasan, meminta data tambahan, menerima, atau menolak laporan. Alasan penolakan wajib dipilih/ditulis dan dapat dilihat pelapor. |
| **FR-05** | Penugasan OPD | Koordinator dapat menetapkan unit dan petugas, tenggat/SLA, serta catatan penugasan. Sistem menyimpan riwayat penugasan dan mendukung pengalihan dengan alasan. |
| **FR-06** | Penanganan dan Bukti | Petugas dapat memperbarui progres, menambahkan catatan internal, dan mengunggah bukti tindak lanjut. Informasi internal tidak boleh terlihat oleh pelapor. |
| **FR-07** | Notifikasi | Sistem mengirim notifikasi in-app dan/atau email; integrasi kanal pesan lain menjadi tahap lanjutan. Notifikasi dipicu oleh pengiriman, permintaan informasi, perubahan status, penugasan, eskalasi, dan penyelesaian. |
| **FR-08** | Dashboard | Menampilkan jumlah laporan masuk, status, kategori, tren waktu, distribusi wilayah, SLA, backlog, dan kinerja unit sesuai hak akses. |
| **FR-09** | Peta Laporan | Laporan berkoordinat dapat divisualisasikan pada peta dengan pengelompokan marker. Lokasi sensitif atau alamat pribadi tidak ditampilkan secara publik. |
| **FR-10** | Pencarian dan Filter | Pencarian berdasarkan nomor tiket, kata kunci, kategori, status, rentang waktu, wilayah, dan OPD; hasil mengikuti izin akses. |
| **FR-11** | Audit Trail | Sistem mencatat login penting, perubahan data, perubahan status, penugasan, keputusan verifikasi, ekspor, dan tindakan admin. Log tidak dapat diubah melalui antarmuka operasional biasa. |
| **FR-12** | Ekspor dan Pelaporan | Pengguna berwenang dapat mengunduh ringkasan sesuai filter ke CSV/XLSX/PDF. Ekspor data pribadi dibatasi, dicatat, dan dapat memerlukan alasan. |
| **FR-13** | Pengaturan Referensi | Admin mengelola kategori, subkategori, wilayah, OPD, SLA, template respons, serta aturan eskalasi dengan versioning atau catatan perubahan. |

---

## 6. Kebutuhan AI dan Batas Penggunaannya

| ID | Nama | Deskripsi |
|---|---|---|
| **AI-01** | Klasifikasi Teks | Model memprediksi kategori/subkategori dari judul dan deskripsi. Hasil ditampilkan sebagai rekomendasi beserta *confidence score*; petugas dapat menerima atau mengubahnya. |
| **AI-02** | Deteksi Kemiripan | Sistem memberi daftar laporan yang berpotensi duplikat berdasarkan teks, kategori, waktu, dan kedekatan lokasi. Sistem **tidak** menggabungkan atau menutup tiket secara otomatis. |
| **AI-03** | Rekomendasi Prioritas | Sistem dapat menyarankan prioritas berdasarkan aturan transparan seperti risiko keselamatan, dampak layanan publik, jumlah warga terdampak, dan urgensi. Rekomendasi wajib dapat dijelaskan dan dikonfigurasi. |
| **AI-04** | Analitik Tren | Agregasi kategori, wilayah, dan waktu untuk menemukan peningkatan laporan atau area berulang. Hasil analitik bukan bukti tunggal untuk menetapkan kebijakan. |
| **AI-05** | Human-in-the-Loop | Semua keluaran AI bersifat *advisory*. Petugas tetap memverifikasi, alasan override dapat dicatat, model dipantau untuk bias dan kesalahan, serta tersedia fallback manual ketika layanan AI gagal. |
| **AI-06** | Tahapan Implementasi | MVP tidak bergantung pada AI. Tahap awal dapat memakai kategori manual dan pencarian teks PostgreSQL. Modul AI dikembangkan setelah data berlabel, pedoman anotasi, evaluasi model, dan tata kelola data siap. |

---

## 7. Kebutuhan Nonfungsional

| ID | Aspek | Deskripsi |
|---|---|---|
| **NFR-01** | Kinerja | Target awal: 95% permintaan API umum selesai ≤ 2 detik pada beban pilot yang disepakati; dashboard agregat ≤ 5 detik; unggah file diproses secara asinkron bila diperlukan. Target harus diuji dengan data dan beban representatif. |
| **NFR-02** | Ketersediaan | Target pilot awal 99,5% per bulan di luar pemeliharaan terjadwal, dengan monitoring, backup, dan prosedur pemulihan. SLA final ditentukan pemilik layanan. |
| **NFR-03** | Keamanan | HTTPS/TLS; password hashing menggunakan algoritma modern; session/token aman; RBAC; validasi input; *parameterized query*; pembatasan rate; proteksi CSRF bila memakai cookie session; pembatasan unggahan; secret management; backup terenkripsi; dan pengujian keamanan. |
| **NFR-04** | Privasi | Minimasi data pribadi; tujuan pemrosesan jelas; persetujuan/landasan pemrosesan ditentukan; kontrol akses; retensi dan penghapusan terjadwal; masking pada tampilan publik; dan prosedur permintaan subjek data sesuai peraturan yang berlaku. |
| **NFR-05** | Aksesibilitas dan UX | Antarmuka responsif, bahasa Indonesia yang jelas, kontras memadai, label formulir, navigasi keyboard, pesan kesalahan yang mudah dipahami, dan dukungan perangkat mobile. |
| **NFR-06** | Skalabilitas | Pisahkan modul aplikasi secara logis; gunakan connection pooling; pagination; indeks; background worker untuk notifikasi, pemrosesan file, dan analitik; serta caching hanya bila terbukti diperlukan. |
| **NFR-07** | Maintainability | Kode terstruktur per domain, migrasi database terkontrol, dokumentasi API, test otomatis, CI/CD, logging terstruktur, tracing, dan konfigurasi environment. |
| **NFR-08** | Auditabilitas | Perubahan penting dapat ditelusuri ke pengguna, waktu, objek, dan alasan. Sinkronisasi waktu server dan kebijakan retensi log harus ditetapkan. |

---

## 8. Arsitektur dan Teknologi yang Direkomendasikan

### 8.1 Pola Arsitektur

*Modular monolith* untuk MVP dengan pemisahan domain dan service boundary yang jelas. Pendekatan ini lebih sederhana dioperasikan daripada microservices untuk tim dan beban pilot, tetapi tetap memungkinkan ekstraksi modul saat kebutuhan dan skala terbukti.

### 8.2 Backend Rust

Rust dengan **Tokio** sebagai async runtime dan **Axum** sebagai HTTP framework. Axum menyediakan routing, extractors, error handling, dan integrasi middleware Tower. Gunakan **SQLx** untuk akses PostgreSQL, migration, connection pool, dan query terparameterisasi. Gunakan **Serde** untuk serialisasi, **tracing** untuk observability, serta validator atau validasi domain eksplisit.

### 8.3 Database PostgreSQL

PostgreSQL menjadi sumber data utama untuk pengguna, organisasi, tiket, status, penugasan, komentar, notifikasi, audit, dan konfigurasi. Gunakan UUID/identity sesuai kebutuhan, foreign key, CHECK constraints, transaksi, indeks B-tree, GIN untuk full-text search bila diperlukan, dan PostGIS untuk query spasial ketika fitur peta menjadi kebutuhan inti.

### 8.4 Frontend

Frontend web responsif dapat menggunakan React/Next.js atau Vue/Nuxt. Pemilihan akhir mempertimbangkan kemampuan tim, dukungan aksesibilitas, dan integrasi API. Frontend berkomunikasi dengan backend melalui REST API ber-versioning.

### 8.5 Penyimpanan File

Foto/lampiran disimpan pada object storage kompatibel S3 atau penyimpanan privat terkelola; database menyimpan metadata dan object key, bukan binary besar. Terapkan validasi MIME, batas ukuran, malware scanning, signed URL, dan kebijakan retensi.

### 8.6 Background Jobs

Untuk notifikasi, thumbnail, pemindaian file, dan tugas berkala, gunakan worker terpisah yang membaca antrean persisten. Pada tahap sederhana dapat memakai tabel jobs/outbox PostgreSQL dan worker Rust; evaluasi broker khusus ketika throughput atau kebutuhan operasional meningkat.

### 8.7 Integrasi Peta

Peta menggunakan penyedia tile/geocoding yang dipilih berdasarkan lisensi, biaya, ketersediaan, dan kebijakan data. Koordinat disimpan dengan tipe spasial PostGIS jika diperlukan; jangan mengandalkan alamat teks saja untuk analisis lokasi.

### 8.8 AI Service

Model AI dapat dijalankan sebagai layanan terpisah berbasis Python atau Rust sesuai model dan library yang dipilih. Backend Rust memanggil AI melalui API internal atau job asynchronous. Hindari memasukkan inferensi berat ke request utama; simpan versi model, confidence, waktu inferensi, dan keputusan petugas.

### Ringkasan Stack

| Lapisan | Teknologi |
|---|---|
| Runtime / HTTP | Rust, Tokio, Axum (middleware Tower) |
| Akses data | SQLx, Serde, tracing |
| Database | PostgreSQL (+ GIN FTS, PostGIS bila perlu) |
| Frontend | React/Next.js atau Vue/Nuxt |
| File | Object storage kompatibel S3 + signed URL |
| Background | Worker Rust + tabel jobs/outbox PostgreSQL |
| AI | Layanan terpisah (Python/Rust), asinkron |

---

## 9. Model Data Awal

### Entitas Inti

`users`; `roles`; `permissions`; `user_roles`; `organizations` (Pemda/OPD/unit); `regions`; `complaint_categories`; `complaints`; `complaint_attachments`; `complaint_locations`; `complaint_status_history`; `assignments`; `complaint_comments`; `notifications`; `audit_logs`; `sla_policies`; `ai_predictions`; `ai_model_versions`; `feedback`.

### Relasi Utama

- Satu warga dapat membuat banyak laporan.
- Satu laporan memiliki satu kategori aktif, satu atau lebih lampiran, satu lokasi, banyak riwayat status, komentar, dan penugasan.
- OPD menerima banyak laporan.
- Prediksi AI terhubung ke laporan dan versi model.
- Audit log merekam tindakan aktor pada entitas.

### Aturan Integritas

- Gunakan foreign key dan constraint untuk menjaga relasi.
- Gunakan transaksi untuk perubahan status + history + notifikasi/outbox.
- Soft delete hanya bila dibutuhkan dan harus memiliki kebijakan.
- Hindari menyimpan salinan data pribadi berulang.
- Gunakan indeks untuk kolom filter utama seperti `status`, `created_at`, `category_id`, `organization_id`, `region_id`.

---

## 10. API dan Integrasi

### Kelompok Endpoint

| Method | Endpoint |
|---|---|
| POST | `/api/v1/auth/register` |
| POST | `/api/v1/auth/login` |
| POST | `/api/v1/complaints` |
| GET | `/api/v1/complaints/{id}` |
| GET | `/api/v1/me/complaints` |
| POST | `/api/v1/complaints/{id}/attachments` |
| POST | `/api/v1/complaints/{id}/verify` |
| POST | `/api/v1/complaints/{id}/assign` |
| PATCH | `/api/v1/complaints/{id}/status` |
| POST | `/api/v1/complaints/{id}/comments` |
| GET | `/api/v1/dashboard/summary` |
| GET | `/api/v1/map/complaints` |

Endpoint final mengikuti desain API dan kebijakan akses.

### Integrasi

Email/SMS/WhatsApp gateway, peta/geocoding, Single Sign-On atau identitas internal pemerintah, sistem pengaduan nasional/daerah lain, dan data referensi wilayah/OPD merupakan integrasi **opsional**. Semua integrasi memerlukan persetujuan pemilik sistem, kontrak API, perlindungan data, dan mekanisme retry.

---

## 11. Antarmuka dan Identitas Visual

### 11.1 Branding

Gunakan logo Pemda Lampung dan logo Universitas Teknokrat Indonesia yang disediakan sebagai identitas pada halaman login, dashboard, dan halaman informasi sesuai persetujuan penggunaan. Jangan mengubah proporsi, warna, atau bentuk logo. Sediakan ruang kosong yang cukup dan versi responsif.

### 11.2 Struktur Halaman

| Area | Halaman |
|---|---|
| **Publik** | Beranda, Buat Pengaduan, Lacak Tiket, Panduan, Statistik publik (agregat), Masuk/Daftar |
| **Warga** | Dashboard Saya, Form Pengaduan, Detail Tiket, Profil |
| **Internal** | Dashboard, Antrian Verifikasi, Detail Laporan, Penugasan, Penanganan, Peta, Analitik, Manajemen OPD/Pengguna, Kategori/SLA, Audit |

### 11.3 Footer Wajib

Seluruh halaman aplikasi menampilkan teks footer persis:

> **Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom**

Footer tidak boleh tertutup elemen navigasi atau modal dan harus terbaca pada desktop maupun mobile.

---

## 12. Prioritas dan Roadmap

### MVP – Tahap 1

Autentikasi; role; pembuatan laporan; lampiran; lokasi; nomor tiket; pelacakan; verifikasi; klarifikasi; penugasan OPD; update progres; penyelesaian; notifikasi dasar; dashboard operasional; audit log; kategori dan wilayah.

### Tahap 2

Peta interaktif; pencarian lanjutan; dashboard pimpinan; SLA dan eskalasi; ekspor; deteksi kemiripan berbasis aturan/teks; klasifikasi AI terbatas; survei kepuasan.

### Tahap 3

AI rekomendasi prioritas yang tervalidasi; analitik tren lanjutan; integrasi kanal eksternal; SSO; analitik spasial; optimasi alur kerja; aplikasi mobile/PWA jika dibutuhkan.

### Di Luar MVP

Microservices penuh; chatbot generatif sebagai pengambil keputusan; auto-reject; auto-close; pemeringkatan kinerja individu tanpa konteks; dan integrasi pihak ketiga tanpa persetujuan.

---

## 13. Metrik Keberhasilan

| Kategori | Metrik |
|---|---|
| **Adopsi** | Jumlah warga terdaftar, jumlah laporan valid, persentase laporan yang dikirim melalui kanal CivicAI, dan pengguna aktif. |
| **Operasional** | Waktu rata-rata verifikasi, waktu penugasan, waktu penyelesaian, persentase tiket sesuai SLA, backlog, tiket dikembalikan untuk klarifikasi, dan persentase tiket tanpa pembaruan. |
| **Kualitas** | Persentase laporan dengan lokasi dan bukti memadai, tingkat duplikasi, tingkat laporan tidak valid, kepuasan pelapor, dan jumlah keberatan atas keputusan. |
| **AI** | Macro-F1/precision/recall per kategori, top-k recall untuk kandidat duplikat, calibration/confidence, tingkat override petugas, false positive/negative, dan performa per wilayah/kategori. Metrik AI tidak boleh hanya berupa akurasi keseluruhan. |

---

## 14. Risiko dan Mitigasi

| Risiko | Mitigasi |
|---|---|
| **Penyalahgunaan/Spam** | Rate limiting, verifikasi kontak, CAPTCHA adaptif bila diperlukan, deteksi pola anomali, dan proses moderasi. |
| **Laporan Palsu atau Tidak Lengkap** | Verifikasi manusia, permintaan informasi tambahan, bukti pendukung, serta alasan keputusan yang transparan. |
| **Kebocoran Data** | Least privilege, pemisahan data publik/internal, enkripsi, audit, backup aman, uji penetrasi, dan prosedur respons insiden. |
| **Bias AI** | Data pelatihan representatif, evaluasi per kelompok kategori/wilayah, review manusia, pencatatan override, dan penghentian fitur AI jika kualitas turun. |
| **Ketergantungan Integrasi** | Timeout, retry dengan backoff, idempotency key, antrean/outbox, circuit breaker bila diperlukan, dan proses manual fallback. |
| **Adopsi OPD Rendah** | Pelibatan OPD sejak analisis, pelatihan, SLA realistis, penanggung jawab jelas, serta dashboard yang mendukung kebutuhan kerja. |
| **Ketidakjelasan Kewenangan** | Tetapkan pemilik produk, pengelola data, pengelola layanan, OPD penanggung jawab, SOP eskalasi, dan batas kewenangan sebelum pilot. |

---

## 15. Validasi Kelayakan Rust dan PostgreSQL

### 15.1 Kesimpulan

Rust + PostgreSQL layak dan sesuai untuk backend CivicAI. Kombinasi ini mendukung API asynchronous, validasi kuat di compile time, transaksi relasional, pencarian teks, dan pengolahan data spasial melalui ekstensi yang sesuai. Rekomendasi implementasi adalah **Rust + Tokio + Axum + SQLx + PostgreSQL**, dengan modular monolith untuk MVP.

### 15.2 Kesesuaian Rust

Axum cocok untuk routing HTTP dan middleware Tower; Tokio menangani asynchronous runtime; SQLx mendukung PostgreSQL, connection pool, query terparameterisasi, dan migrasi. Tim perlu menguasai ownership/borrowing, async Rust, error handling, observability, dan strategi build/deploy. Kurva belajar Rust lebih tinggi dibanding framework web konvensional, sehingga perlu prototipe teknis.

### 15.3 Kesesuaian PostgreSQL

PostgreSQL cocok untuk transaksi, relasi, constraint, indexing, full-text search, dan Row-Level Security (RLS) sebagai lapisan pertahanan tambahan. PostGIS direkomendasikan ketika pencarian radius, batas administrasi, dan agregasi spasial diperlukan. RLS tidak menggantikan RBAC pada aplikasi; kebijakan harus dirancang dan diuji.

### 15.4 Hal yang Perlu Diuji

- Koneksi pool di bawah beban
- Migrasi dan rollback
- Query dashboard
- Pagination
- Pencarian teks bahasa Indonesia
- Query spasial PostGIS
- Isolasi akses warga/OPD
- Transaksi perubahan status
- Backup-restore
- Beban unggah
- Pemulihan worker setelah gagal

### 15.5 Risiko Teknis

Ketersediaan developer Rust; biaya operasional PostGIS/hosting; desain indeks yang buruk; kompleksitas RLS; pengelolaan file; dan kebutuhan observability.

**Mitigasi:** proof of concept, standar coding, code review, staging, benchmark, migration review, dan runbook.

### 15.6 Putusan Validasi

> **STATUS: LAYAK DENGAN PRASYARAT.**
> Tidak ada ketidakcocokan mendasar antara kebutuhan CivicAI dan Rust/PostgreSQL. Validasi produksi belum dapat dinyatakan selesai sebelum proof of concept, uji beban, uji keamanan, uji backup-restore, dan uji penerimaan pengguna dilakukan.

---

## 16. Kriteria Penerimaan MVP

| ID | Kriteria |
|---|---|
| **AC-01** | Warga dapat membuat laporan dengan data wajib dan menerima nomor tiket unik. |
| **AC-02** | Warga hanya dapat melihat laporan miliknya dan informasi publik yang telah disanitasi. |
| **AC-03** | Verifikator dapat menerima, meminta kelengkapan, atau menolak laporan dengan alasan yang tercatat. |
| **AC-04** | Koordinator dapat menugaskan laporan ke OPD/petugas yang sesuai dan riwayat penugasan tersimpan. |
| **AC-05** | Petugas dapat memperbarui progres dan mengunggah bukti; warga dapat melihat status publik. |
| **AC-06** | Perubahan status dan tindakan administratif penting tercatat di audit log. |
| **AC-07** | Dashboard menyajikan jumlah laporan per status, kategori, wilayah, rentang waktu, dan OPD sesuai hak akses. |
| **AC-08** | Akses lintas warga/OPD diuji dan tidak memungkinkan pembacaan atau perubahan tiket tanpa izin. |
| **AC-09** | Logo Pemda Lampung dan Universitas Teknokrat Indonesia tampil dengan proporsi benar pada halaman yang disepakati. |
| **AC-10** | Footer menampilkan teks hak cipta persis seperti ketentuan pada seluruh halaman aplikasi. |
| **AC-11** | Backup database dapat dipulihkan pada lingkungan uji dan prosedur pemulihan terdokumentasi. |
| **AC-12** | Aplikasi tetap dapat menerima dan memproses laporan ketika modul AI tidak tersedia. |

---

## 17. Pertanyaan yang Harus Diputuskan Sebelum Pengembangan

| No | Keputusan |
|---|---|
| **1** | **Wilayah pilot:** Pemerintah Provinsi Lampung atau pemerintah kabupaten/kota tertentu? Logo yang disediakan menunjukkan identitas Provinsi Lampung. |
| **2** | Apakah laporan dapat dibuat tanpa akun, atau wajib login? Jika anonim diperbolehkan, tentukan mekanisme pelacakan dan mitigasi penyalahgunaan. |
| **3** | Siapa pemilik produk, admin utama, pengelola data, dan penanggung jawab tiap OPD? |
| **4** | Kategori, SLA, jam layanan, tingkat prioritas, dan jalur eskalasi resmi apa yang berlaku? |
| **5** | Apakah peta dan notifikasi WhatsApp/email termasuk MVP? Siapa penyedia dan pemilik kredensial integrasi? |
| **6** | Apakah penggunaan logo Pemda dan logo Universitas telah memperoleh izin/otorisasi dari pihak terkait? |
| **7** | Apa kebijakan retensi, klasifikasi, dan publikasi data laporan serta lampirannya? |

---

## 18. Referensi Teknis

- **Axum** — Dokumentasi crate Axum menjelaskan routing HTTP, extractors, error handling, dan integrasi Tower middleware.
  <https://docs.rs/axum/latest/axum/>
- **SQLx** — Dokumentasi SQLx menjelaskan dukungan PostgreSQL, async database access, connection pool, dan TLS.
  <https://docs.rs/sqlx/latest/sqlx/>
- **PostgreSQL Full Text Search** — Dokumentasi PostgreSQL menjelaskan pencarian teks, indeks, konfigurasi parser, dan ranking.
  <https://www.postgresql.org/docs/current/textsearch.html>
- **PostgreSQL Row Security** — Dokumentasi PostgreSQL menjelaskan kebijakan row-level security untuk membatasi baris yang dapat dibaca atau dimodifikasi.
  <https://www.postgresql.org/docs/current/ddl-rowsecurity.html>

---

**Footer aplikasi wajib:** Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom
