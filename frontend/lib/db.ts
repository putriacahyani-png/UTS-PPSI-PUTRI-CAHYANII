// CivicAI Lampung - Local Persistent Database Engine
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

import fs from 'fs';
import path from 'path';
import {
  User,
  Organization,
  Region,
  Category,
  Complaint,
  NotificationItem,
  AuditLogItem,
} from '@/types';

const DATA_FILE = path.join(process.cwd(), '..', 'storage', 'civicai_db.json');

// Initial master data
export const INITIAL_REGIONS: Region[] = [
  { id: 'reg-1', code: 'REG-BDL', name: 'Kota Bandar Lampung', type: 'KOTA', latitude: -5.4297, longitude: 105.2625 },
  { id: 'reg-2', code: 'REG-MTR', name: 'Kota Metro', type: 'KOTA', latitude: -5.1136, longitude: 105.3067 },
  { id: 'reg-3', code: 'REG-LMS', name: 'Kabupaten Lampung Selatan', type: 'KABUPATEN', latitude: -5.7167, longitude: 105.5833 },
  { id: 'reg-4', code: 'REG-LMT', name: 'Kabupaten Lampung Tengah', type: 'KABUPATEN', latitude: -4.8667, longitude: 105.2167 },
  { id: 'reg-5', code: 'REG-LMU', name: 'Kabupaten Lampung Utara', type: 'KABUPATEN', latitude: -4.8167, longitude: 104.8333 },
  { id: 'reg-6', code: 'REG-LMB', name: 'Kabupaten Lampung Barat', type: 'KABUPATEN', latitude: -5.1500, longitude: 104.1833 },
  { id: 'reg-7', code: 'REG-LMTM', name: 'Kabupaten Lampung Timur', type: 'KABUPATEN', latitude: -5.1000, longitude: 105.6833 },
  { id: 'reg-8', code: 'REG-TGM', name: 'Kabupaten Tanggamus', type: 'KABUPATEN', latitude: -5.4833, longitude: 104.6167 },
  { id: 'reg-9', code: 'REG-TLB', name: 'Kabupaten Tulang Bawang', type: 'KABUPATEN', latitude: -4.5333, longitude: 105.6167 },
  { id: 'reg-10', code: 'REG-PES', name: 'Kabupaten Pesawaran', type: 'KABUPATEN', latitude: -5.4167, longitude: 105.1500 },
  { id: 'reg-11', code: 'REG-PRG', name: 'Kabupaten Pringsewu', type: 'KABUPATEN', latitude: -5.3500, longitude: 104.9833 },
  { id: 'reg-12', code: 'REG-MSJ', name: 'Kabupaten Mesuji', type: 'KABUPATEN', latitude: -4.0500, longitude: 105.4000 },
  { id: 'reg-13', code: 'REG-TBB', name: 'Kabupaten Tulang Bawang Barat', type: 'KABUPATEN', latitude: -4.4500, longitude: 105.0500 },
  { id: 'reg-14', code: 'REG-WAY', name: 'Kabupaten Way Kanan', type: 'KABUPATEN', latitude: -4.5167, longitude: 104.5333 },
  { id: 'reg-15', code: 'REG-PSB', name: 'Kabupaten Pesisir Barat', type: 'KABUPATEN', latitude: -5.1833, longitude: 103.9500 },
];

export const INITIAL_ORGANIZATIONS: Organization[] = [
  {
    id: 'opd-1',
    code: 'OPD-BMBK',
    name: 'Dinas Bina Marga & Bina Konstruksi Provinsi Lampung',
    acronym: 'Dinas BMBK',
    category: 'Infrastruktur',
    contact_email: 'bmbk@lampungprov.go.id',
    contact_phone: '0721-702345',
    address: 'Jl. Zainal Abidin Pagar Alam No. 1, Bandar Lampung',
  },
  {
    id: 'opd-2',
    code: 'OPD-DINKES',
    name: 'Dinas Kesehatan Provinsi Lampung',
    acronym: 'Dinkes',
    category: 'Kesehatan',
    contact_email: 'dinkes@lampungprov.go.id',
    contact_phone: '0721-703344',
    address: 'Jl. Dr. Susilo No. 44, Bandar Lampung',
  },
  {
    id: 'opd-3',
    code: 'OPD-DISDIK',
    name: 'Dinas Pendidikan & Kebudayaan Provinsi Lampung',
    acronym: 'Disdikbud',
    category: 'Pendidikan',
    contact_email: 'disdikbud@lampungprov.go.id',
    contact_phone: '0721-701234',
    address: 'Jl. Drs. Warsito No. 72, Bandar Lampung',
  },
  {
    id: 'opd-4',
    code: 'OPD-DLH',
    name: 'Dinas Lingkungan Hidup Provinsi Lampung',
    acronym: 'DLH',
    category: 'Lingkungan',
    contact_email: 'dlh@lampungprov.go.id',
    contact_phone: '0721-704567',
    address: 'Kompleks Kantor Gubernur Lampung',
  },
  {
    id: 'opd-5',
    code: 'OPD-DISHUB',
    name: 'Dinas Perhubungan Provinsi Lampung',
    acronym: 'Dishub',
    category: 'Transportasi',
    contact_email: 'dishub@lampungprov.go.id',
    contact_phone: '0721-705678',
    address: 'Jl. Cut Mutia No. 23, Bandar Lampung',
  },
  {
    id: 'opd-6',
    code: 'OPD-DISKOMINFO',
    name: 'Dinas Komunikasi, Informatika & Statistik',
    acronym: 'Diskominfotik',
    category: 'Komunikasi',
    contact_email: 'diskominfotik@lampungprov.go.id',
    contact_phone: '0721-706789',
    address: 'Jl. Wolter Monginsidi No. 69, Bandar Lampung',
  },
];

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    code: 'CAT-INFRA',
    name: 'Infrastruktur Jalan & Jembatan',
    icon: 'construction',
    description: 'Jalan berlubang, aspal amblas, jembatan retak, dan fasilitas jalan provinsi.',
    default_organization_id: 'opd-1',
  },
  {
    id: 'cat-2',
    code: 'CAT-DRAIN',
    name: 'Drainase & Pengendalian Banjir',
    icon: 'waves',
    description: 'Saluran air tersumbat, tanggul jebol, dan luapan air ke pemukiman warga.',
    default_organization_id: 'opd-1',
  },
  {
    id: 'cat-3',
    code: 'CAT-HEALTH',
    name: 'Fasilitas & Layanan Kesehatan',
    icon: 'hospital',
    description: 'Ketersediaan obat, fasilitas RSUD/Puskesmas, dan ambulans gawat darurat.',
    default_organization_id: 'opd-2',
  },
  {
    id: 'cat-4',
    code: 'CAT-EDU',
    name: 'Pendidikan & Sekolah',
    icon: 'graduation-cap',
    description: 'Kondisi gedung SMA/SMK Negeri, sarana belajar, dan beasiswa pendidikan.',
    default_organization_id: 'opd-3',
  },
  {
    id: 'cat-5',
    code: 'CAT-ENV',
    name: 'Kebersihan & Lingkungan Hidup',
    icon: 'trash-2',
    description: 'Pembuangan sampah liar, pencemaran air sungai, dan polusi udara.',
    default_organization_id: 'opd-4',
  },
  {
    id: 'cat-6',
    code: 'CAT-TRANS',
    name: 'Transportasi & Lampu Jalan',
    icon: 'traffic-cone',
    description: 'Penerangan Jalan Umum (PJU) mati, rambu lalu lintas roboh, dan angkutan.',
    default_organization_id: 'opd-5',
  },
  {
    id: 'cat-7',
    code: 'CAT-SOC',
    name: 'Sosial & Bantuan Publik',
    icon: 'users',
    description: 'Bansos tidak tepat sasaran, penanganan penyandang disabilitas, dan lansia.',
    default_organization_id: 'opd-6',
  },
  {
    id: 'cat-8',
    code: 'CAT-PUB',
    name: 'Ketertiban Umum & Perizinan',
    icon: 'shield-alert',
    description: 'Pungutan liar, gangguan ketertiban masyarakat, dan izin usaha daerah.',
    default_organization_id: 'opd-6',
  },
];

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-warga-1',
    email: 'warga@lampung.go.id',
    name: 'Ahmad Fauzi, S.T.',
    role: 'WARGA',
    phone_number: '0812-7890-1234',
    nik: '1871012304950002',
    address: 'Jl. Raden Intan No. 45, Enggal, Bandar Lampung',
    is_verified: true,
    created_at: '2026-01-10T08:00:00Z',
  },
  {
    id: 'usr-verif-1',
    email: 'verifikator@lampung.go.id',
    name: 'Siti Rahmawati, S.Sos',
    role: 'VERIFIKATOR',
    phone_number: '0813-9876-5432',
    organization_id: 'opd-6',
    organization_name: 'Dinas Komunikasi, Informatika & Statistik',
    is_verified: true,
    created_at: '2026-01-01T08:00:00Z',
  },
  {
    id: 'usr-opd-1',
    email: 'petugas.bmbk@lampung.go.id',
    name: 'Ir. Bambang Kurniawan',
    role: 'PETUGAS_OPD',
    phone_number: '0811-2345-6789',
    organization_id: 'opd-1',
    organization_name: 'Dinas Bina Marga & Bina Konstruksi',
    is_verified: true,
    created_at: '2026-01-05T08:00:00Z',
  },
  {
    id: 'usr-lead-1',
    email: 'pimpinan@lampung.go.id',
    name: 'Drs. H. Hendra Wijaya, M.Si',
    role: 'PIMPINAN',
    phone_number: '0812-3344-5566',
    is_verified: true,
    created_at: '2026-01-01T08:00:00Z',
  },
  {
    id: 'usr-admin-1',
    email: 'admin@lampung.go.id',
    name: 'Administrator Provinsi Lampung',
    role: 'ADMIN',
    phone_number: '0812-0000-1111',
    is_verified: true,
    created_at: '2026-01-01T08:00:00Z',
  },
];

export const INITIAL_COMPLAINTS: Complaint[] = [
  {
    id: 'c-101',
    ticket_number: 'TKT-20261108-0142',
    user_id: 'usr-warga-1',
    citizen_name: 'Ahmad Fauzi, S.T.',
    citizen_phone: '0812-7890-1234',
    citizen_email: 'warga@lampung.go.id',
    category_id: 'cat-1',
    category_name: 'Infrastruktur Jalan & Jembatan',
    category_icon: 'construction',
    organization_id: 'opd-1',
    organization_name: 'Dinas Bina Marga & Bina Konstruksi',
    region_id: 'reg-3',
    region_name: 'Kabupaten Lampung Selatan',
    title: 'Jalan Raya Natar Berlubang Parah Membahayakan Pengendara',
    description:
      'Terdapat rentetan lubang jalan sedalam 15-20 cm sepanjang 50 meter di ruas Jl. Raya Natar KM 22 depan SPBU. Sudah sering memicu kecelakaan pemotor terutama saat hujan deras karena tergenang.',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    incident_date: '2026-11-08T07:30:00Z',
    address: 'Jl. Raya Natar KM 22, Kec. Natar',
    landmark: 'Tepat di depan SPBU Natar arah Branti',
    latitude: -5.3184,
    longitude: 105.2012,
    progress_percent: 65,
    assigned_to: 'usr-opd-1',
    assigned_officer_name: 'Ir. Bambang Kurniawan',
    sla_deadline_at: '2026-11-13T12:00:00Z',
    created_at: '2026-11-08T08:15:00Z',
    updated_at: '2026-11-09T14:30:00Z',
    attachments: [
      {
        id: 'att-1',
        complaint_id: 'c-101',
        file_name: 'foto_lubang_jalan_natar.jpg',
        file_url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop',
        file_type: 'image/jpeg',
        file_size_bytes: 2450000,
        attachment_type: 'INITIAL_EVIDENCE',
        created_at: '2026-11-08T08:15:00Z',
      },
      {
        id: 'att-2',
        complaint_id: 'c-101',
        file_name: 'progres_penambalan_awal.jpg',
        file_url: 'https://images.unsplash.com/photo-1541888946425-d0fbb180c5f7?w=800&auto=format&fit=crop',
        file_type: 'image/jpeg',
        file_size_bytes: 1980000,
        attachment_type: 'PROGRESS_PROOF',
        created_at: '2026-11-09T14:30:00Z',
      },
    ],
    history: [
      {
        id: 'h-1',
        complaint_id: 'c-101',
        new_status: 'SUBMITTED',
        changed_by_name: 'Ahmad Fauzi, S.T.',
        changed_by_role: 'WARGA',
        reason: 'Laporan baru dibuat oleh warga',
        created_at: '2026-11-08T08:15:00Z',
      },
      {
        id: 'h-2',
        complaint_id: 'c-101',
        previous_status: 'SUBMITTED',
        new_status: 'VERIFIED',
        changed_by_name: 'Siti Rahmawati, S.Sos',
        changed_by_role: 'VERIFIKATOR',
        reason: 'Verifikasi validitas lokasi dan foto jalan provinsi lengkap',
        created_at: '2026-11-08T10:20:00Z',
      },
      {
        id: 'h-3',
        complaint_id: 'c-101',
        previous_status: 'VERIFIED',
        new_status: 'ASSIGNED',
        changed_by_name: 'Siti Rahmawati, S.Sos',
        changed_by_role: 'VERIFIKATOR',
        reason: 'Ditugaskan ke Tim Satgas Jalan Dinas BMBK Provinsi Lampung',
        created_at: '2026-11-08T11:00:00Z',
      },
      {
        id: 'h-4',
        complaint_id: 'c-101',
        previous_status: 'ASSIGNED',
        new_status: 'IN_PROGRESS',
        changed_by_name: 'Ir. Bambang Kurniawan',
        changed_by_role: 'PETUGAS_OPD',
        reason: 'Tim teknis unit wilayah I telah turun ke lapangan membawa material cold-mix',
        created_at: '2026-11-09T09:00:00Z',
      },
    ],
    comments: [
      {
        id: 'com-1',
        complaint_id: 'c-101',
        user_name: 'Ir. Bambang Kurniawan',
        user_role: 'PETUGAS_OPD',
        comment: 'Pengerjaan lapis pondasi agregat kelas A telah selesai. Besok pagi diagendakan pengaspalan hotmix.',
        is_internal_only: false,
        created_at: '2026-11-09T14:35:00Z',
      },
      {
        id: 'com-2',
        complaint_id: 'c-101',
        user_name: 'Ir. Bambang Kurniawan',
        user_role: 'PETUGAS_OPD',
        comment: 'Catatan internal: koordinasi dengan Polsek Natar untuk rekayasa lalu lintas saat pengaspalan.',
        is_internal_only: true,
        created_at: '2026-11-09T14:40:00Z',
      },
    ],
    ai_prediction: {
      category_name: 'Infrastruktur Jalan & Jembatan',
      confidence: 0.96,
      suggested_priority: 'HIGH',
      priority_confidence: 0.89,
      duplicate_candidates: [
        {
          ticket_number: 'TKT-20261105-0089',
          title: 'Lubang jalan raya natar spbu',
          similarity_score: 0.82,
          distance_km: 0.15,
        },
      ],
      explanation: 'Judul dan foto mengindikasikan kerusakan jalan arteri utama berlubang dengan risiko keselamatan pengendara bermotor.',
      factors: ['Jalan arteri padat', 'Risiko laka lantas pemotor tinggi', 'Genangan air musim hujan'],
    },
  },
  {
    id: 'c-102',
    ticket_number: 'TKT-20261109-0205',
    user_id: 'usr-warga-1',
    citizen_name: 'Ahmad Fauzi, S.T.',
    citizen_phone: '0812-7890-1234',
    citizen_email: 'warga@lampung.go.id',
    category_id: 'cat-2',
    category_name: 'Drainase & Pengendalian Banjir',
    category_icon: 'waves',
    organization_id: 'opd-1',
    organization_name: 'Dinas Bina Marga & Bina Konstruksi',
    region_id: 'reg-1',
    region_name: 'Kota Bandar Lampung',
    title: 'Gorong-gorong Ambrol Menimbulkan Genangan di Way Halim',
    description:
      'Dinding drainase utama ambrol tertimbun sedimentasi di dekat perempatan Jl. Ki Maja. Air meluap ke badan jalan setiap turun hujan lebih dari 30 menit.',
    status: 'UNDER_REVIEW',
    priority: 'MEDIUM',
    incident_date: '2026-11-09T11:00:00Z',
    address: 'Jl. Ki Maja No. 88, Way Halim',
    landmark: 'Dekat pasar Way Halim',
    latitude: -5.3972,
    longitude: 105.2758,
    created_at: '2026-11-09T11:45:00Z',
    updated_at: '2026-11-09T12:00:00Z',
    attachments: [
      {
        id: 'att-3',
        complaint_id: 'c-102',
        file_name: 'drainase_way_halim.jpg',
        file_url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop',
        file_type: 'image/jpeg',
        file_size_bytes: 3100000,
        attachment_type: 'INITIAL_EVIDENCE',
        created_at: '2026-11-09T11:45:00Z',
      },
    ],
    history: [
      {
        id: 'h-5',
        complaint_id: 'c-102',
        new_status: 'SUBMITTED',
        changed_by_name: 'Ahmad Fauzi, S.T.',
        changed_by_role: 'WARGA',
        reason: 'Laporan dikirim pelapor',
        created_at: '2026-11-09T11:45:00Z',
      },
      {
        id: 'h-6',
        complaint_id: 'c-102',
        previous_status: 'SUBMITTED',
        new_status: 'UNDER_REVIEW',
        changed_by_name: 'Siti Rahmawati, S.Sos',
        changed_by_role: 'VERIFIKATOR',
        reason: 'Sedang diperiksa kewenangan antara drainase kota dan provinsi',
        created_at: '2026-11-09T12:00:00Z',
      },
    ],
    comments: [],
    ai_prediction: {
      category_name: 'Drainase & Pengendalian Banjir',
      confidence: 0.94,
      suggested_priority: 'MEDIUM',
      priority_confidence: 0.85,
      duplicate_candidates: [],
      explanation: 'Masalah gorong-gorong dan drainase tersumbat yang menyebabkan genangan berkala.',
      factors: ['Potensi banjir genangan', 'Sedimentasi saluran'],
    },
  },
  {
    id: 'c-103',
    ticket_number: 'TKT-20261107-0091',
    user_id: 'usr-warga-2',
    citizen_name: 'Ratna Kusuma Dewi',
    citizen_phone: '0857-1122-3344',
    category_id: 'cat-6',
    category_name: 'Transportasi & Lampu Jalan',
    category_icon: 'traffic-cone',
    organization_id: 'opd-5',
    organization_name: 'Dinas Perhubungan',
    region_id: 'reg-2',
    region_name: 'Kota Metro',
    title: 'Lampu PJU Padam Sepanjang 300 Meter di Jalur Lintas Metro',
    description: 'Penerangan jalan umum padam selama 4 hari berturut-turut. Kondisi jalan sangat gelap dan rawan tindak kejahatan malam hari.',
    status: 'RESOLVED',
    priority: 'MEDIUM',
    incident_date: '2026-11-07T19:00:00Z',
    address: 'Jl. Jendral Sudirman, Metro Barat',
    landmark: 'Depan Lapangan Samber',
    latitude: -5.1189,
    longitude: 105.3051,
    progress_percent: 100,
    created_at: '2026-11-07T20:10:00Z',
    updated_at: '2026-11-09T16:00:00Z',
    attachments: [
      {
        id: 'att-4',
        complaint_id: 'c-103',
        file_name: 'pju_padam.jpg',
        file_url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop',
        file_type: 'image/jpeg',
        file_size_bytes: 1800000,
        attachment_type: 'INITIAL_EVIDENCE',
        created_at: '2026-11-07T20:10:00Z',
      },
      {
        id: 'att-5',
        complaint_id: 'c-103',
        file_name: 'bukti_pju_menyala.jpg',
        file_url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&auto=format&fit=crop',
        file_type: 'image/jpeg',
        file_size_bytes: 2100000,
        attachment_type: 'RESOLUTION_PROOF',
        created_at: '2026-11-09T16:00:00Z',
      },
    ],
    history: [
      {
        id: 'h-7',
        complaint_id: 'c-103',
        new_status: 'SUBMITTED',
        changed_by_name: 'Ratna Kusuma Dewi',
        changed_by_role: 'WARGA',
        reason: 'Laporan dikirim',
        created_at: '2026-11-07T20:10:00Z',
      },
      {
        id: 'h-8',
        complaint_id: 'c-103',
        previous_status: 'SUBMITTED',
        new_status: 'VERIFIED',
        changed_by_name: 'Siti Rahmawati, S.Sos',
        changed_by_role: 'VERIFIKATOR',
        reason: 'Validasi disetujui',
        created_at: '2026-11-08T08:30:00Z',
      },
      {
        id: 'h-9',
        complaint_id: 'c-103',
        previous_status: 'VERIFIED',
        new_status: 'ASSIGNED',
        changed_by_name: 'Siti Rahmawati, S.Sos',
        changed_by_role: 'VERIFIKATOR',
        reason: 'Ditugaskan ke Dishub Prov. Lampung',
        created_at: '2026-11-08T09:00:00Z',
      },
      {
        id: 'h-10',
        complaint_id: 'c-103',
        previous_status: 'ASSIGNED',
        new_status: 'IN_PROGRESS',
        changed_by_name: 'Petugas Dishub Wilayah Metro',
        changed_by_role: 'PETUGAS_OPD',
        reason: 'Perbaikan panel trafo dan penggantian 6 bohlam LED PJU',
        created_at: '2026-11-09T10:00:00Z',
      },
      {
        id: 'h-11',
        complaint_id: 'c-103',
        previous_status: 'IN_PROGRESS',
        new_status: 'RESOLVED',
        changed_by_name: 'Petugas Dishub Wilayah Metro',
        changed_by_role: 'PETUGAS_OPD',
        reason: 'PJU telah menyala normal dan dites uji operasional malam hari',
        created_at: '2026-11-09T16:00:00Z',
      },
    ],
    comments: [
      {
        id: 'com-3',
        complaint_id: 'c-103',
        user_name: 'Petugas Dishub Wilayah Metro',
        user_role: 'PETUGAS_OPD',
        comment: 'Seluruh bohlam PJU dan kabel jaringan korsleting telah diganti baru. Kondisi lampu menyala terang.',
        is_internal_only: false,
        created_at: '2026-11-09T16:05:00Z',
      },
    ],
  },
  {
    id: 'c-104',
    ticket_number: 'TKT-20261110-0012',
    user_id: 'usr-warga-3',
    citizen_name: 'Dedi Prasetyo',
    citizen_phone: '0821-8899-0011',
    category_id: 'cat-3',
    category_name: 'Fasilitas & Layanan Kesehatan',
    category_icon: 'hospital',
    organization_id: 'opd-2',
    organization_name: 'Dinas Kesehatan',
    region_id: 'reg-4',
    region_name: 'Kabupaten Lampung Tengah',
    title: 'Kelangkaan Obat Hipertensi dan Antidiabetes di Puskesmas Bandar Jaya',
    description: 'Pasien rujukan BPJS Lansia tidak mendapatkan obat rutin karena stok obat puskesmas kosong sejak 2 minggu terakhir.',
    status: 'NEEDS_INFORMATION',
    priority: 'MEDIUM',
    incident_date: '2026-11-10T09:00:00Z',
    address: 'Jl. Proklamator Raya No. 12, Bandar Jaya Barat',
    landmark: 'Puskesmas Rawat Inap Bandar Jaya',
    latitude: -4.8973,
    longitude: 105.2155,
    needs_info_reason: 'Mohon cantumkan foto resep dokter atau nomor kartu BPJS untuk validasi pengecekan ke apotek farmasi.',
    created_at: '2026-11-10T09:30:00Z',
    updated_at: '2026-11-10T10:15:00Z',
    attachments: [],
    history: [
      {
        id: 'h-12',
        complaint_id: 'c-104',
        new_status: 'SUBMITTED',
        changed_by_name: 'Dedi Prasetyo',
        changed_by_role: 'WARGA',
        reason: 'Laporan dikirim',
        created_at: '2026-11-10T09:30:00Z',
      },
      {
        id: 'h-13',
        complaint_id: 'c-104',
        previous_status: 'SUBMITTED',
        new_status: 'NEEDS_INFORMATION',
        changed_by_name: 'Siti Rahmawati, S.Sos',
        changed_by_role: 'VERIFIKATOR',
        reason: 'Bukti resep obat dan kartu BPJS belum dilampirkan pelapor',
        created_at: '2026-11-10T10:15:00Z',
      },
    ],
    comments: [],
  },
  {
    id: 'c-105',
    ticket_number: 'TKT-20261110-0034',
    user_id: 'usr-warga-1',
    citizen_name: 'Ahmad Fauzi, S.T.',
    category_id: 'cat-5',
    category_name: 'Kebersihan & Lingkungan Hidup',
    category_icon: 'trash-2',
    organization_id: 'opd-4',
    organization_name: 'Dinas Lingkungan Hidup',
    region_id: 'reg-8',
    region_name: 'Kabupaten Tanggamus',
    title: 'Tumpukan Sampah Liar Menumpuk di Bantaran Sungai Way Semaka',
    description: 'Bantaran sungai dijadikan tempat pembuangan sampah ilegal warga sekitar. Bau menyengat dan mencemari air sungai untuk pertanian.',
    status: 'SUBMITTED',
    priority: 'LOW',
    incident_date: '2026-11-10T08:00:00Z',
    address: 'Kecamatan Wonosobo, Tanggamus',
    landmark: 'Bawah jembatan gantung Way Semaka',
    latitude: -5.4789,
    longitude: 104.5982,
    created_at: '2026-11-10T08:30:00Z',
    updated_at: '2026-11-10T08:30:00Z',
    attachments: [
      {
        id: 'att-6',
        complaint_id: 'c-105',
        file_name: 'sampah_sungai_tanggamus.jpg',
        file_url: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800&auto=format&fit=crop',
        file_type: 'image/jpeg',
        file_size_bytes: 2300000,
        attachment_type: 'INITIAL_EVIDENCE',
        created_at: '2026-11-10T08:30:00Z',
      },
    ],
    history: [
      {
        id: 'h-14',
        complaint_id: 'c-105',
        new_status: 'SUBMITTED',
        changed_by_name: 'Ahmad Fauzi, S.T.',
        changed_by_role: 'WARGA',
        reason: 'Laporan berhasil dikirim pelapor',
        created_at: '2026-11-10T08:30:00Z',
      },
    ],
    comments: [],
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    user_id: 'usr-warga-1',
    complaint_id: 'c-101',
    ticket_number: 'TKT-20261108-0142',
    title: 'Laporan Ditindaklanjuti',
    message: 'Pengaduan Anda mengenai Jalan Raya Natar sedang dalam penanganan oleh Dinas BMBK.',
    type: 'PROGRESS',
    is_read: false,
    created_at: '2026-11-09T09:00:00Z',
  },
  {
    id: 'notif-2',
    user_id: 'usr-warga-1',
    complaint_id: 'c-102',
    ticket_number: 'TKT-20261109-0205',
    title: 'Laporan Dalam Verifikasi',
    message: 'Pengaduan gorong-gorong Way Halim sedang diperiksa oleh Verifikator Pemprov Lampung.',
    type: 'VERIFICATION',
    is_read: true,
    created_at: '2026-11-09T12:00:00Z',
  },
  {
    id: 'notif-3',
    user_id: 'usr-verif-1',
    complaint_id: 'c-105',
    ticket_number: 'TKT-20261110-0034',
    title: 'Pengaduan Baru Masuk',
    message: 'Terdapat laporan baru di Kabupaten Tanggamus menunggu verifikasi.',
    type: 'NEW_TICKET',
    is_read: false,
    created_at: '2026-11-10T08:30:00Z',
  },
];

export const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'aud-1',
    user_name: 'Siti Rahmawati, S.Sos',
    user_role: 'VERIFIKATOR',
    action: 'VERIFY_COMPLAINT',
    entity_type: 'Complaint',
    entity_id: 'TKT-20261108-0142',
    details: 'Status diubah menjadi VERIFIED (Jalan Provinsi terverifikasi valid)',
    ip_address: '10.15.2.40',
    created_at: '2026-11-08T10:20:00Z',
  },
  {
    id: 'aud-2',
    user_name: 'Siti Rahmawati, S.Sos',
    user_role: 'VERIFIKATOR',
    action: 'ASSIGN_OPD',
    entity_type: 'Complaint',
    entity_id: 'TKT-20261108-0142',
    details: 'Penugasan diteruskan ke Dinas BMBK dengan target SLA 5 hari kerja',
    ip_address: '10.15.2.40',
    created_at: '2026-11-08T11:00:00Z',
  },
  {
    id: 'aud-3',
    user_name: 'Ir. Bambang Kurniawan',
    user_role: 'PETUGAS_OPD',
    action: 'UPDATE_PROGRESS',
    entity_type: 'Complaint',
    entity_id: 'TKT-20261108-0142',
    details: 'Progres diperbarui ke 65%, bukti foto pengerjaan lapis pondasi diunggah',
    ip_address: '10.18.5.12',
    created_at: '2026-11-09T14:30:00Z',
  },
  {
    id: 'aud-4',
    user_name: 'Ahmad Fauzi, S.T.',
    user_role: 'WARGA',
    action: 'CREATE_COMPLAINT',
    entity_type: 'Complaint',
    entity_id: 'TKT-20261109-0205',
    details: 'Warga membuat laporan drainase Way Halim',
    ip_address: '182.1.200.85',
    created_at: '2026-11-09T11:45:00Z',
  },
];

// In-Memory Database store with disk persistence
class CivicAIDatabase {
  public users: User[] = [...INITIAL_USERS];
  public organizations: Organization[] = [...INITIAL_ORGANIZATIONS];
  public regions: Region[] = [...INITIAL_REGIONS];
  public categories: Category[] = [...INITIAL_CATEGORIES];
  public complaints: Complaint[] = [...INITIAL_COMPLAINTS];
  public notifications: NotificationItem[] = [...INITIAL_NOTIFICATIONS];
  public auditLogs: AuditLogItem[] = [...INITIAL_AUDIT_LOGS];

  constructor() {
    this.load();
  }

  private load() {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        const data = JSON.parse(raw);
        if (data.complaints) this.complaints = data.complaints;
        if (data.users) this.users = data.users;
        if (data.notifications) this.notifications = data.notifications;
        if (data.auditLogs) this.auditLogs = data.auditLogs;
      }
    } catch {
      // file read fallback
    }
  }

  public save() {
    try {
      const dir = path.dirname(DATA_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(
        DATA_FILE,
        JSON.stringify(
          {
            complaints: this.complaints,
            users: this.users,
            notifications: this.notifications,
            auditLogs: this.auditLogs,
          },
          null,
          2
        )
      );
    } catch {
      // file save fallback
    }
  }

  public addAuditLog(
    userName: string,
    userRole: any,
    action: string,
    entityType: string,
    entityId: string,
    details: string,
    ip = '127.0.0.1'
  ) {
    const log: AuditLogItem = {
      id: `aud-${Date.now()}`,
      user_name: userName,
      user_role: userRole,
      action,
      entity_type: entityType,
      entity_id: entityId,
      details,
      ip_address: ip,
      created_at: new Date().toISOString(),
    };
    this.auditLogs.unshift(log);
    this.save();
    return log;
  }
}

// Global singleton
const globalForDb = global as unknown as { civicaiDb?: CivicAIDatabase };
export const db = globalForDb.civicaiDb || new CivicAIDatabase();
if (process.env.NODE_ENV !== 'production') globalForDb.civicaiDb = db;

