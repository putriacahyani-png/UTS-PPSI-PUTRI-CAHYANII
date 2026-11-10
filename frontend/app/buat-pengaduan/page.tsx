// CivicAI Lampung - Buat Pengaduan Baru (4-Step Wizard)
// Copyright©2026 by Putri Cahyani dan Dr. Erliyan Redy Susanto, M.Kom

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import EmergencyBanner from '@/components/EmergencyBanner';
import Footer from '@/components/Footer';
import {
  FileText,
  MapPin,
  Camera,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Upload,
  X,
  Compass,
  AlertTriangle,
  HelpCircle,
} from 'lucide-react';
import { Category, Region } from '@/types';

export default function BuatPengaduanPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('cat-1');
  const [incidentDate, setIncidentDate] = useState(new Date().toISOString().slice(0, 16));
  const [regionId, setRegionId] = useState('reg-1');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [latitude, setLatitude] = useState(-5.4297);
  const [longitude, setLongitude] = useState(105.2625);
  const [photos, setPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop',
  ]);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // AI Live Suggestion Simulation
  const [aiSuggestion, setAiSuggestion] = useState<{
    category: string;
    confidence: number;
    priority: string;
  } | null>(null);

  useEffect(() => {
    fetch('/api/v1/references')
      .then((res) => res.json())
      .then((d) => {
        if (d.success) {
          setCategories(d.data.categories);
          setRegions(d.data.regions);
        }
      })
      .catch(() => {});
  }, []);

  // Update AI recommendation live when title or description changes
  useEffect(() => {
    if (title.length > 5 || description.length > 15) {
      const lower = (title + ' ' + description).toLowerCase();
      let suggested = 'Infrastruktur Jalan & Jembatan';
      let prio = 'MEDIUM';

      if (lower.includes('banjir') || lower.includes('drainase') || lower.includes('gorong')) {
        suggested = 'Drainase & Pengendalian Banjir';
      } else if (lower.includes('obat') || lower.includes('puskesmas') || lower.includes('sakit')) {
        suggested = 'Fasilitas & Layanan Kesehatan';
      } else if (lower.includes('sekolah') || lower.includes('guru') || lower.includes('gedung')) {
        suggested = 'Pendidikan & Sekolah';
      } else if (lower.includes('sampah') || lower.includes('limbah') || lower.includes('bau')) {
        suggested = 'Kebersihan & Lingkungan Hidup';
      } else if (lower.includes('lampu') || lower.includes('pju') || lower.includes('rambu')) {
        suggested = 'Transportasi & Lampu Jalan';
      }

      if (lower.includes('parah') || lower.includes('darurat') || lower.includes('korban') || lower.includes('amblas')) {
        prio = 'HIGH';
      }

      setAiSuggestion({
        category: suggested,
        confidence: 0.94,
        priority: prio,
      });
    } else {
      setAiSuggestion(null);
    }
  }, [title, description]);

  const handleUseGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLatitude(Number(pos.coords.latitude.toFixed(6)));
          setLongitude(Number(pos.coords.longitude.toFixed(6)));
          setLandmark('Lokasi terdeteksi via GPS perangkat');
        },
        () => {
          // Default Bandar Lampung
          setLatitude(-5.4297);
          setLongitude(105.2625);
        }
      );
    }
  };

  const handleAddPhoto = () => {
    const samplePhotos = [
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800&auto=format&fit=crop',
    ];
    const nextPhoto = samplePhotos[photos.length % samplePhotos.length];
    setPhotos([...photos, nextPhoto]);
  };

  const handleRemovePhoto = (idx: number) => {
    setPhotos(photos.filter((_, i) => i !== idx));
  };

  const handleNextStep = () => {
    setErrorMsg('');
    if (currentStep === 1) {
      if (!title.trim() || !description.trim()) {
        setErrorMsg('Judul dan deskripsi masalah wajib diisi.');
        return;
      }
    } else if (currentStep === 2) {
      if (!address.trim()) {
        setErrorMsg('Alamat lengkap kejadian wajib diisi.');
        return;
      }
    } else if (currentStep === 3) {
      if (photos.length === 0) {
        setErrorMsg('Harap lampirkan minimal 1 foto bukti kondisi lapangan.');
        return;
      }
    }
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handleSubmit = async () => {
    if (!agreed) {
      setErrorMsg('Anda wajib menyetujui pernyataan kebenaran laporan.');
      return;
    }
    setLoading(true);
    setErrorMsg('');

    try {
      const payload = {
        title,
        description,
        category_id: categoryId,
        region_id: regionId,
        incident_date: incidentDate,
        address,
        landmark,
        latitude,
        longitude,
        is_anonymous: isAnonymous,
        attachments: photos.map((url, i) => ({
          file_name: `bukti_lapangan_${i + 1}.jpg`,
          file_url: url,
          file_type: 'image/jpeg',
          file_size_bytes: 2100000,
        })),
      };

      const res = await fetch('/api/v1/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success) {
        router.push(
          `/pengaduan-berhasil?ticket=${data.data.ticket_number}&title=${encodeURIComponent(
            data.data.title
          )}`
        );
      } else {
        setErrorMsg(data.message || 'Gagal mengirim pengaduan.');
      }
    } catch {
      setErrorMsg('Terjadi gangguan jaringan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slatebg">
      <Navbar />
      <EmergencyBanner />

      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        {/* Wizard Header Progress */}
        <div className="bg-white rounded-lg shadow-xs border border-lineBorder p-5 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-lineBorder">
            <div>
              <h1 className="font-heading font-extrabold text-xl text-textMain">
                Formulir Pengaduan Masyarakat
              </h1>
              <p className="text-xs text-textSec mt-0.5">
                Pemerintah Provinsi Lampung · Terhubung langsung dengan OPD terkait
              </p>
            </div>
            <div className="text-xs font-mono font-semibold px-2.5 py-1 bg-primary-tint text-primary rounded border border-primary-tint2 self-start sm:self-auto">
              LANGKAH {currentStep} DARI 4
            </div>
          </div>

          {/* Stepper Navigation */}
          <div className="grid grid-cols-4 gap-2 pt-4 text-center">
            {[
              { num: 1, title: 'Rincian & Kategori', icon: FileText },
              { num: 2, title: 'Lokasi Kejadian', icon: MapPin },
              { num: 3, title: 'Bukti Foto', icon: Camera },
              { num: 4, title: 'Konfirmasi', icon: CheckCircle2 },
            ].map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.num;
              const isDone = currentStep > step.num;
              return (
                <div
                  key={step.num}
                  className={`flex flex-col items-center p-2 rounded transition-all ${
                    isActive
                      ? 'bg-primary-tint text-primary font-bold'
                      : isDone
                      ? 'text-emerald-700 font-semibold'
                      : 'text-textMuted'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs mb-1 ${
                      isActive
                        ? 'bg-primary text-white shadow-xs'
                        : isDone
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 text-textSec'
                    }`}
                  >
                    {isDone ? '✓' : step.num}
                  </div>
                  <span className="text-[11px] hidden sm:inline">{step.title}</span>
                </div>
              );
            })}
          </div>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3.5 rounded bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* STEP 1: Rincian & Kategori */}
        {currentStep === 1 && (
          <div className="bg-white rounded-lg shadow-card border border-lineBorder p-6 space-y-5">
            <div>
              <label className="block text-xs font-bold text-textMain mb-1">
                Judul Laporan Pengaduan <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Jalan Poros Lintas Natar Berlubang Parah Sepanjang 50 Meter"
                className="w-full h-10 px-3 rounded border border-lineBorder bg-slate-50 text-xs text-textMain focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <p className="text-[11px] text-textMuted mt-1">
                Tuliskan inti masalah secara singkat dan jelas.
              </p>
            </div>

            {/* AI LIVE SUGGESTION PILL (PRD Requirement) */}
            {aiSuggestion && (
              <div className="p-3.5 rounded-lg bg-purple-50 border border-purple-200 text-xs flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-ai-violet flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-purple-900 font-heading">
                      Rekomendasi AI (Advisory):
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-200 text-purple-800">
                      {(aiSuggestion.confidence * 100).toFixed(0)}% Match
                    </span>
                  </div>
                  <p className="text-[11px] text-purple-800 mt-0.5">
                    Sistem mendeteksi kategori sesuai: <strong>{aiSuggestion.category}</strong> dengan
                    prioritas penanganan <strong>{aiSuggestion.priority}</strong>.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      const matched = categories.find((c) => c.name === aiSuggestion.category);
                      if (matched) setCategoryId(matched.id);
                    }}
                    className="mt-1.5 text-[11px] font-bold text-ai-violet hover:underline inline-flex items-center gap-1"
                  >
                    <span>Terapkan rekomendasi kategori ini</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-textMain mb-1">
                Kategori Masalah <span className="text-rose-500">*</span>
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full h-10 px-3 rounded border border-lineBorder bg-slate-50 text-xs text-textMain focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-textMain mb-1">
                Deskripsi Lengkap Kejadian <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ceritakan kronologi, dampak terhadap warga sekitar, kedalaman atau luas kerusakan, serta kapan masalah ini mulai timbul..."
                className="w-full p-3 rounded border border-lineBorder bg-slate-50 text-xs text-textMain focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary leading-relaxed"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-bold text-textMain mb-1">
                Waktu Kejadian
              </label>
              <input
                type="datetime-local"
                value={incidentDate}
                onChange={(e) => setIncidentDate(e.target.value)}
                className="w-full sm:w-72 h-10 px-3 rounded border border-lineBorder bg-slate-50 text-xs text-textMain focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        )}

        {/* STEP 2: Lokasi Kejadian */}
        {currentStep === 2 && (
          <div className="bg-white rounded-lg shadow-card border border-lineBorder p-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-textMain mb-1">
                  Provinsi
                </label>
                <input
                  type="text"
                  disabled
                  value="Lampung"
                  className="w-full h-10 px-3 rounded border border-lineBorder bg-slate-100 text-xs text-textSec font-semibold cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-textMain mb-1">
                  Kabupaten / Kota di Lampung <span className="text-rose-500">*</span>
                </label>
                <select
                  value={regionId}
                  onChange={(e) => {
                    setRegionId(e.target.value);
                    const sel = regions.find((r) => r.id === e.target.value);
                    if (sel) {
                      setLatitude(sel.latitude);
                      setLongitude(sel.longitude);
                    }
                  }}
                  className="w-full h-10 px-3 rounded border border-lineBorder bg-slate-50 text-xs text-textMain focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  {regions.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-textMain mb-1">
                Alamat Lengkap Lokasi <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Nama jalan, nomor, RT/RW, kelurahan/desa, kecamatan"
                className="w-full h-10 px-3 rounded border border-lineBorder bg-slate-50 text-xs text-textMain focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-textMain mb-1">
                Patokan / Titik Acuan Lapangan
              </label>
              <input
                type="text"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                placeholder="Contoh: Depan SPBU 24-351 Natar, 50 meter sebelum jembatan"
                className="w-full h-10 px-3 rounded border border-lineBorder bg-slate-50 text-xs text-textMain focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* GPS & MAP COORDINATE SECTION */}
            <div className="p-4 rounded-lg bg-slate-50 border border-lineBorder">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold text-textMain">Titik Koordinat Geospasial</span>
                </div>
                <button
                  type="button"
                  onClick={handleUseGPS}
                  className="h-8 px-3 rounded bg-white hover:bg-slate-100 border border-lineBorder text-xs font-semibold text-primary flex items-center gap-1.5 shadow-2xs transition-colors"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Ambil GPS Perangkat</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-textMuted uppercase">Latitude</span>
                  <input
                    type="number"
                    step="0.0001"
                    value={latitude}
                    onChange={(e) => setLatitude(parseFloat(e.target.value))}
                    className="w-full h-9 px-2.5 rounded border border-lineBorder bg-white text-xs"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-textMuted uppercase">Longitude</span>
                  <input
                    type="number"
                    step="0.0001"
                    value={longitude}
                    onChange={(e) => setLongitude(parseFloat(e.target.value))}
                    className="w-full h-9 px-2.5 rounded border border-lineBorder bg-white text-xs"
                  />
                </div>
              </div>

              {/* Interactive Visual Map Preview Placeholder */}
              <div className="mt-3 h-48 w-full rounded border border-lineBorder overflow-hidden relative bg-slate-200 flex items-center justify-center">
                <div className="text-center p-4">
                  <MapPin className="w-8 h-8 text-rose-600 mx-auto animate-bounce" />
                  <div className="text-xs font-bold text-textMain mt-1">
                    Titik Terpilih: {latitude.toFixed(4)}, {longitude.toFixed(4)}
                  </div>
                  <div className="text-[11px] text-textSec mt-0.5">
                    Koordinat otomatis disimpan untuk integrasi peta spasial OPD
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Bukti Foto */}
        {currentStep === 3 && (
          <div className="bg-white rounded-lg shadow-card border border-lineBorder p-6 space-y-5">
            <div>
              <h3 className="font-heading font-bold text-sm text-textMain">
                Unggah Foto Bukti Lapangan <span className="text-rose-500">*</span>
              </h3>
              <p className="text-xs text-textSec mt-0.5">
                Lampirkan foto kondisi aktual untuk memudahkan verifikasi dan penilaian tingkat keparahan oleh petugas.
              </p>
            </div>

            {/* Photo Preview Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {photos.map((url, idx) => (
                <div key={idx} className="relative aspect-video rounded-lg border border-lineBorder overflow-hidden group">
                  <img src={url} alt={`Bukti ${idx + 1}`} className="w-full h-full object-cover" />
                  <div className="absolute top-1.5 left-1.5 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
                    Foto #{idx + 1}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(idx)}
                    className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              {photos.length < 5 && (
                <button
                  type="button"
                  onClick={handleAddPhoto}
                  className="aspect-video rounded-lg border-2 border-dashed border-primary/40 hover:border-primary bg-primary-tint/30 hover:bg-primary-tint/50 flex flex-col items-center justify-center gap-1 text-primary transition-all p-3"
                >
                  <Upload className="w-6 h-6" />
                  <span className="text-xs font-bold">+ Tambah Foto</span>
                  <span className="text-[10px] text-textMuted">JPG, PNG maks 5MB</span>
                </button>
              )}
            </div>

            <div className="p-3.5 rounded bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start gap-2">
              <HelpCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" />
              <span>
                <strong>Tips Bukti Efektif:</strong> Ambil foto dari jarak dekat yang memperlihatkan detail kerusakan,
                serta foto dari jarak cukup jauh yang menampilkan latar belakang bangunan atau marka jalan.
              </span>
            </div>
          </div>
        )}

        {/* STEP 4: Konfirmasi & Kirim */}
        {currentStep === 4 && (
          <div className="bg-white rounded-lg shadow-card border border-lineBorder p-6 space-y-5">
            <div>
              <h3 className="font-heading font-bold text-sm text-textMain">
                Tinjauan Ringkasan Pengaduan
              </h3>
              <p className="text-xs text-textSec mt-0.5">
                Pastikan seluruh data yang Anda masukkan sudah akurat sebelum mengirim laporan.
              </p>
            </div>

            <div className="divide-y divide-lineBorder border border-lineBorder rounded-lg p-4 text-xs space-y-3">
              <div className="flex justify-between items-start pt-2">
                <span className="text-textMuted">Judul Aduan:</span>
                <span className="font-bold text-textMain text-right max-w-sm">{title}</span>
              </div>
              <div className="flex justify-between items-start pt-2">
                <span className="text-textMuted">Kategori:</span>
                <span className="font-semibold text-primary">
                  {categories.find((c) => c.id === categoryId)?.name}
                </span>
              </div>
              <div className="flex justify-between items-start pt-2">
                <span className="text-textMuted">Wilayah:</span>
                <span className="font-semibold text-textMain">
                  {regions.find((r) => r.id === regionId)?.name}
                </span>
              </div>
              <div className="flex justify-between items-start pt-2">
                <span className="text-textMuted">Alamat:</span>
                <span className="text-textMain text-right max-w-sm">{address}</span>
              </div>
              <div className="flex justify-between items-start pt-2">
                <span className="text-textMuted">Koordinat:</span>
                <span className="font-mono text-textSec">
                  {latitude}, {longitude}
                </span>
              </div>
              <div className="flex justify-between items-start pt-2">
                <span className="text-textMuted">Jumlah Foto Bukti:</span>
                <span className="font-semibold text-textMain">{photos.length} Berkas Foto</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-textSec">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="mt-0.5 rounded text-primary focus:ring-primary"
                />
                <span>
                  <strong>Samarkan identitas saya (Anonim Publik):</strong> Nama saya tidak akan ditampilkan pada
                  pelacakan publik, hanya verifikator berwenang yang dapat melihat identitas akun.
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-textSec">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 rounded text-primary focus:ring-primary"
                />
                <span>
                  <strong className="text-textMain">Pernyataan Kebenaran:</strong> Saya menyatakan bahwa laporan ini
                  dibuat dengan sebenar-benarnya dan bertanggung jawab atas materi pengaduan serta foto yang dikirimkan.
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="mt-6 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
              className="h-10 px-4 rounded border border-lineBorder bg-white text-xs font-semibold text-textSec hover:text-textMain hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>
          ) : (
            <div></div>
          )}

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="h-10 px-5 rounded bg-primary hover:bg-primary-hover active:bg-primary-pressed text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors"
            >
              <span>Lanjut Langkah Berikutnya</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              disabled={loading || !agreed}
              onClick={handleSubmit}
              className={`h-10 px-6 rounded text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors ${
                agreed && !loading
                  ? 'bg-emerald-600 hover:bg-emerald-700 cursor-pointer'
                  : 'bg-slate-400 cursor-not-allowed'
              }`}
            >
              {loading ? (
                <span>Menerbitkan Nomor Tiket...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Kirim Laporan Pengaduan</span>
                </>
              )}
            </button>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

