-- CivicAI Lampung - Seed Data Migration
-- Migration: 0002_seed_data.sql
-- Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

-- 1. Insert Roles
INSERT INTO roles (id, name, description) VALUES
('11111111-1111-1111-1111-111111111111', 'WARGA', 'Masyarakat pelapor pengaduan publik'),
('22222222-2222-2222-2222-222222222222', 'VERIFIKATOR', 'Petugas pemeriksa kelayakan dan validitas aduan'),
('33333333-3333-3333-3333-333333333333', 'PETUGAS_OPD', 'Pelaksana tindak lanjut dan penanganan di lapangan'),
('44444444-4444-4444-4444-444444444444', 'PIMPINAN', 'Pimpinan / Koordinator pemantau SLA dan performa'),
('55555555-5555-5555-5555-555555555555', 'ADMIN', 'Administrator sistem & pengelola data referensi')
ON CONFLICT (name) DO NOTHING;

-- 2. Insert Organizations (OPD Provinsi Lampung)
INSERT INTO organizations (id, code, name, acronym, category, contact_email, contact_phone, address) VALUES
('a0000000-0000-0000-0000-000000000001', 'OPD-BMBK', 'Dinas Bina Marga dan Bina Konstruksi Provinsi Lampung', 'Dinas BMBK', 'Infrastruktur', 'bmbk@lampungprov.go.id', '0721-702345', 'Jl. Zainal Abidin Pagar Alam No. 1, Bandar Lampung'),
('a0000000-0000-0000-0000-000000000002', 'OPD-DINKES', 'Dinas Kesehatan Provinsi Lampung', 'Dinkes', 'Kesehatan', 'dinkes@lampungprov.go.id', '0721-703344', 'Jl. Dr. Susilo No. 44, Bandar Lampung'),
('a0000000-0000-0000-0000-000000000003', 'OPD-DISDIK', 'Dinas Pendidikan dan Kebudayaan Provinsi Lampung', 'Disdikbud', 'Pendidikan', 'disdikbud@lampungprov.go.id', '0721-701234', 'Jl. Drs. Warsito No. 72, Teluk Betung, Bandar Lampung'),
('a0000000-0000-0000-0000-000000000004', 'OPD-DLH', 'Dinas Lingkungan Hidup Provinsi Lampung', 'DLH', 'Lingkungan', 'dlh@lampungprov.go.id', '0721-704567', 'Jl. Beringin No. 2, Kompleks Pemprov Lampung'),
('a0000000-0000-0000-0000-000000000005', 'OPD-DISHUB', 'Dinas Perhubungan Provinsi Lampung', 'Dishub', 'Transportasi', 'dishub@lampungprov.go.id', '0721-705678', 'Jl. Cut Mutia No. 23, Bandar Lampung'),
('a0000000-0000-0000-0000-000000000006', 'OPD-DISKOMINFO', 'Dinas Komunikasi, Informatika dan Statistik Provinsi Lampung', 'Diskominfotik', 'Komunikasi', 'diskominfotik@lampungprov.go.id', '0721-706789', 'Jl. Wolter Monginsidi No. 69, Bandar Lampung'),
('a0000000-0000-0000-0000-000000000007', 'OPD-SATPOLPP', 'Satuan Polisi Pamong Praja Provinsi Lampung', 'Satpol PP', 'Ketertiban', 'satpolpp@lampungprov.go.id', '0721-707890', 'Kompleks Kantor Gubernur Lampung')
ON CONFLICT (code) DO NOTHING;

-- 3. Insert Regions (15 Kabupaten/Kota di Provinsi Lampung)
INSERT INTO regions (id, code, name, type, latitude, longitude) VALUES
('b0000000-0000-0000-0000-000000000001', 'REG-BDL', 'Kota Bandar Lampung', 'KOTA', -5.4297, 105.2625),
('b0000000-0000-0000-0000-000000000002', 'REG-MTR', 'Kota Metro', 'KOTA', -5.1136, 105.3067),
('b0000000-0000-0000-0000-000000000003', 'REG-LMS', 'Kabupaten Lampung Selatan', 'KABUPATEN', -5.7167, 105.5833),
('b0000000-0000-0000-0000-000000000004', 'REG-LMT', 'Kabupaten Lampung Tengah', 'KABUPATEN', -4.8667, 105.2167),
('b0000000-0000-0000-0000-000000000005', 'REG-LMU', 'Kabupaten Lampung Utara', 'KABUPATEN', -4.8167, 104.8333),
('b0000000-0000-0000-0000-000000000006', 'REG-LMB', 'Kabupaten Lampung Barat', 'KABUPATEN', -5.1500, 104.1833),
('b0000000-0000-0000-0000-000000000007', 'REG-LMTM', 'Kabupaten Lampung Timur', 'KABUPATEN', -5.1000, 105.6833),
('b0000000-0000-0000-0000-000000000008', 'REG-TGM', 'Kabupaten Tanggamus', 'KABUPATEN', -5.4833, 104.6167),
('b0000000-0000-0000-0000-000000000009', 'REG-TLB', 'Kabupaten Tulang Bawang', 'KABUPATEN', -4.5333, 105.6167),
('b0000000-0000-0000-0000-000000000010', 'REG-PES', 'Kabupaten Pesawaran', 'KABUPATEN', -5.4167, 105.1500),
('b0000000-0000-0000-0000-000000000011', 'REG-PRG', 'Kabupaten Pringsewu', 'KABUPATEN', -5.3500, 104.9833),
('b0000000-0000-0000-0000-000000000012', 'REG-MSJ', 'Kabupaten Mesuji', 'KABUPATEN', -4.0500, 105.4000),
('b0000000-0000-0000-0000-000000000013', 'REG-TBB', 'Kabupaten Tulang Bawang Barat', 'KABUPATEN', -4.4500, 105.0500),
('b0000000-0000-0000-0000-000000000014', 'REG-WAY', 'Kabupaten Way Kanan', 'KABUPATEN', -4.5167, 104.5333),
('b0000000-0000-0000-0000-000000000015', 'REG-PSB', 'Kabupaten Pesisir Barat', 'KABUPATEN', -5.1833, 103.9500)
ON CONFLICT (code) DO NOTHING;

-- 4. Insert Categories (8 Kategori Utama Sesuai Design.md)
INSERT INTO complaint_categories (id, code, name, icon, description, default_organization_id) VALUES
('c0000000-0000-0000-0000-000000000001', 'CAT-INFRA', 'Infrastruktur Jalan & Jembatan', 'add_road', 'Kerusakan jalan provinsi, jembatan retak, lubang jalan, dan marka', 'a0000000-0000-0000-0000-000000000001'),
('c0000000-0000-0000-0000-000000000002', 'CAT-DRAIN', 'Drainase & Pengendalian Banjir', 'water_damage', 'Saluran air tersumbat, gorong-gorong ambrol, luapan banjir jalanan', 'a0000000-0000-0000-0000-000000000001'),
('c0000000-0000-0000-0000-000000000003', 'CAT-HEALTH', 'Fasilitas & Layanan Kesehatan', 'local_hospital', 'Pelayanan RSUD, Puskesmas, ketersediaan obat, BPJS, ambulans', 'a0000000-0000-0000-0000-000000000002'),
('c0000000-0000-0000-0000-000000000004', 'CAT-EDU', 'Pendidikan & Sekolah', 'school', 'Sarana sekolah SMA/SMK provinsi, BOS, pungli, fasilitas belajar', 'a0000000-0000-0000-0000-000000000003'),
('c0000000-0000-0000-0000-000000000005', 'CAT-ENV', 'Kebersihan & Lingkungan Hidup', 'delete', 'Tumpukan sampah liar, polusi limbah pabrik, pemangkasan pohon', 'a0000000-0000-0000-0000-000000000004'),
('c0000000-0000-0000-0000-000000000006', 'CAT-TRANS', 'Transportasi & Lampu Jalan', 'traffic', 'PJU mati, rambu lalu lintas rusak, terminal, izin trayek', 'a0000000-0000-0000-0000-000000000005'),
('c0000000-0000-0000-0000-000000000007', 'CAT-SOC', 'Sosial & Bantuan Publik', 'diversity_3', 'Penyaluran bansos, lansia terlantar, penanganan disabilitas', 'a0000000-0000-0000-0000-000000000006'),
('c0000000-0000-0000-0000-000000000008', 'CAT-PUB', 'Ketertiban Umum & Perizinan', 'gavel', 'Gangguan ketertiban, pungutan liar, perizinan terhambat', 'a0000000-0000-0000-0000-000000000007')
ON CONFLICT (code) DO NOTHING;

-- 5. Insert SLA Policies
INSERT INTO sla_policies (category_id, priority, verification_sla_hours, response_sla_hours, resolution_sla_hours) VALUES
('c0000000-0000-0000-0000-000000000001', 'URGENT', 6, 12, 48),
('c0000000-0000-0000-0000-000000000001', 'HIGH', 12, 24, 72),
('c0000000-0000-0000-0000-000000000001', 'MEDIUM', 24, 48, 168),
('c0000000-0000-0000-0000-000000000001', 'LOW', 48, 72, 336);

