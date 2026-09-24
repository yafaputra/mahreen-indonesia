'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Handshake,
  GraduationCap,
  Building2,
  HeartHandshake,
  Sparkles as SparklesIcon,
  CheckCircle2,
  ArrowRight,
  Send,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Globe2,
  Users,
  Briefcase,
  Compass,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import { useMahreenStore } from '@/store/useMahreenStore';

const PARTNERSHIP_TRACKS = [
  {
    id: 'kampus',
    title: 'Mitra Kampus & Perguruan Tinggi',
    subtitle: 'Mahreen Indonesia Internship & Learning',
    icon: GraduationCap,
    badge: 'Akademik & SKS',
    color: 'emerald',
    description:
      'Kolaborasi strategis penyaluran mahasiswa magang berbasis proyek dunia nyata dengan konversi akademik (s/d 20 SKS), kuliah tamu praktisi, dan sertifikasi keahlian terverifikasi.',
    benefits: [
      'Penyaluran magang batch terstruktur (Batch 2: 1 Okt 2026 - 31 Jan 2027)',
      'Kurikulum berbasis industri: Tech, Design, Social Media, Video & BD',
      'Kredensial sertifikat resmi ber-QR dan portofolio karya nyata',
      'Joint seminar, workshop, dan riset terapan kampus',
    ],
    existingPartners: 'IPB University, ITS Surabaya, UGM, Undip, UIN Sayyid Ali Rahmatullah, ITHB, UTB, dll.',
  },
  {
    id: 'umkm',
    title: 'Mitra Bisnis & UMKM Daerah',
    subtitle: 'Tanya Mahreen (Solusi Digital & Agensi)',
    icon: Building2,
    badge: 'Solusi Bisnis',
    color: 'amber',
    description:
      'Membantu UMKM, brand lokal, dan koperasi naik kelas melalui re-branding visual, website development profesional, strategi digital marketing, dan packaging modern.',
    benefits: [
      'Pendampingan digitalisasi 1-on-1 bersama talenta terbaik',
      'Pengembangan website e-commerce & katalog digital responsif',
      'Strategi visual branding, konten media sosial & optimasi omzet',
      'Akses ke marketplace tantangan UMKM Connect',
    ],
    existingPartners: '127+ UMKM Sentra Wastra, Kopi Gayo, Olahan Pangan Nusantara',
  },
  {
    id: 'csr',
    title: 'Mitra Korporasi & Social Impact',
    subtitle: 'Mahreen CSR & Peduli Mahreen',
    icon: HeartHandshake,
    badge: 'Social Impact',
    color: 'rose',
    description:
      'Mengelola alokasi program CSR perusahaan secara terukur, akuntabel, dan berdampak nyata bagi pengentasan kemiskinan, pendidikan 3T, dan pelestarian alam Nusantara.',
    benefits: [
      'Laporan dampak sosial berkala & matriks ESG terstandarisasi',
      'Penyaluran tepat sasaran di 34 provinsi (komunitas perajin, nelayan, tani)',
      'Publikasi eksposur brand di ekosistem digital dan newsroom nasional',
      'Pendanaan hibah prototipe karya pemuda pedesaan',
    ],
    existingPartners: 'Bank BRI, Yayasan Fauzan Adzima, Athaf Yatim, MDT Al Fauziyah',
  },
  {
    id: 'studio',
    title: 'Mitra Kolaborasi Kreatif & Brand',
    subtitle: 'Mahreen Studio (Creative Lifestyle)',
    icon: SparklesIcon,
    badge: 'Creative Lifestyle',
    color: 'indigo',
    description:
      'Kolaborasi kreatif lintas industri untuk pembuatan apparel, official merchandise berkarakter, identitas visual modern, dan aktivasi event bersama.',
    benefits: [
      'Desain eksklusif dengan sentuhan estetika modern & kearifan lokal',
      'Produksi berkualitas tinggi untuk seragam, apparel, dan merchandise',
      'Kolaborasi campaign kreatif dan aktivasi komunitas pemuda',
      'Peluang co-branding di panggung Festival Karya Nusantara',
    ],
    existingPartners: 'Komunitas Kreatif Cimahi, Brand Indie, & Partner Ekosistem',
  },
];

const OFFICIAL_PARTNERS = [
  { name: 'Bank BRI', role: 'Mitra Kolaborator Keuangan & UMKM' },
  { name: 'IPB University', role: 'Mitra Perguruan Tinggi' },
  { name: 'Institut Teknologi Sepuluh Nopember (ITS)', role: 'Mitra Perguruan Tinggi' },
  { name: 'Universitas Gadjah Mada (UGM)', role: 'Mitra Perguruan Tinggi' },
  { name: 'Universitas Diponegoro (Undip)', role: 'Mitra Perguruan Tinggi' },
  { name: 'Institut Teknologi Harapan Bangsa (ITHB)', role: 'Mitra Perguruan Tinggi' },
  { name: 'UIN Sayyid Ali Rahmatullah', role: 'Mitra Perguruan Tinggi' },
  { name: 'Universitas Brawijaya', role: 'Mitra Kampus Magang' },
  { name: 'Universitas Gunadarma', role: 'Mitra Kampus Magang' },
  { name: 'Universitas Pakuan', role: 'Mitra Kampus Magang' },
  { name: 'Yayasan Fauzan Adzima', role: 'Mitra Sosial & Komunitas' },
  { name: 'MDT Al Fauziyah', role: 'Mitra Pendidikan Sosial' },
  { name: 'SMP Dharma Kartini Cimahi', role: 'Mitra Sekolah Binaan' },
  { name: 'Ulinnuha Kids Center', role: 'Mitra Edukasi Anak' },
  { name: 'Athaf Yatim', role: 'Mitra Pemberdayaan Sosial' },
];

export default function PartnershipPage() {
  const showToast = useMahreenStore((state) => state.showToast);

  const [formData, setFormData] = useState({
    institutionName: '',
    partnerType: 'kampus',
    picName: '',
    picRole: '',
    email: '',
    phone: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.institutionName || !formData.picName || !formData.email) {
      showToast('Mohon lengkapi nama lembaga, nama kontak, dan email!', 'info');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      showToast('Proposal kerja sama berhasil dikirimkan ke Tim Kemitraan Mahreen!', 'success');
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 min-h-screen bg-white">
      {/* 1. SECTION HEADER (CLEAN WHITE / EDITORIAL DISPLAY) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-200">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200 shadow-xs">
            <Handshake className="w-3.5 h-3.5 text-emerald-700" />
            <span>Business Development &amp; Strategic Partnership</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-zinc-900 tracking-tight">
            Mari Bangun Sesuatu yang <br />
            <span className="text-terracotta-700">Bermakna Bersama.</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
            Peluang kolaborasi strategis bersama Mahreen Indonesia untuk Perguruan Tinggi, Pelaku UMKM, Korporasi CSR, dan Komunitas Penggerak dalam ekosistem berkarya untuk Indonesia.
          </p>
        </div>

        {/* Right side: Stats Badges */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div className="p-3 rounded-2xl bg-white border border-black text-center min-w-[80px]">
            <div className="text-lg sm:text-xl font-bold font-display text-black">50+</div>
            <div className="text-[10px] font-semibold text-black uppercase tracking-wider">Mitra Kampus</div>
          </div>
          <div className="p-3 rounded-2xl bg-white border border-black text-center min-w-[80px]">
            <div className="text-lg sm:text-xl font-bold font-display text-black">15+</div>
            <div className="text-[10px] font-semibold text-black uppercase tracking-wider">Kolaborasi</div>
          </div>
          <div className="p-3 rounded-2xl bg-white border border-black text-center min-w-[80px]">
            <div className="text-lg sm:text-xl font-bold font-display text-black">10+</div>
            <div className="text-[10px] font-semibold text-black uppercase tracking-wider">Program CSR</div>
          </div>
        </div>
      </div>

      {/* 2. 4 JALUR KEMITRAAN UTAMA */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
            Jalur Sinergi Ekosistem
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 font-display mt-1">
            4 Model Kemitraan Strategis Mahreen Indonesia
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1 max-w-2xl">
            Setiap pilar bisnis Mahreen Indonesia dirancang untuk saling melengkapi dan memberi nilai tambah mutualisme bagi seluruh pemangku kepentingan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PARTNERSHIP_TRACKS.map((track) => {
            const Icon = track.icon;
            return (
              <div
                key={track.id}
                className="p-6 sm:p-7 rounded-3xl border border-zinc-200/90 bg-white hover:border-terracotta-300 transition-all shadow-xs flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-2xl bg-terracotta-50 text-terracotta-700 border border-terracotta-200/80 flex items-center justify-center font-bold shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <Badge variant={track.color} size="sm">
                      {track.badge}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-bold font-display text-zinc-900">
                      {track.title}
                    </h3>
                    <div className="text-xs font-semibold text-terracotta-700 mt-0.5">
                      {track.subtitle}
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mt-2">
                      {track.description}
                    </p>
                  </div>

                  {/* Bullet Benefits */}
                  <div className="space-y-2 pt-2 border-t border-zinc-100">
                    {track.benefits.map((b, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-zinc-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-100 text-[11px] text-zinc-500">
                  <span className="font-semibold text-zinc-700">Contoh Mitra: </span>
                  <span>{track.existingPartners}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. TRUSTED BY PARTNERS (LOGO & NAME STRIP) */}
      <div className="p-8 sm:p-10 rounded-3xl bg-zinc-50 border border-zinc-200 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            Jejaring Kredibel
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-zinc-900">
            Dipercaya oleh Mitra Kampus, Korporasi &amp; Komunitas
          </h2>
          <p className="text-xs text-zinc-500">
            Bersinergi mencetak talenta unggul dan memberdayakan ekonomi rakyat di seluruh Nusantara.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
          {OFFICIAL_PARTNERS.map((partner, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-white border border-zinc-200/90 text-center flex flex-col justify-center items-center shadow-2xs hover:border-terracotta-300 transition-colors"
            >
              <div className="text-xs font-bold text-zinc-900 leading-tight">
                {partner.name}
              </div>
              <div className="text-[10px] text-zinc-500 mt-1 line-clamp-1">
                {partner.role}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. INTERACTIVE FORMULIR PENGAJUAN KEMITRAAN */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
        {/* Left Information */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-terracotta-700">
              Formulir Kerja Sama
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-zinc-900 leading-tight">
              Ajukan Minat Kolaborasi Bersama Mahreen
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
              Tim Business Development kami akan meninjau dokumen/minat kerja sama Anda dan menjadwalkan sesi penjajakan resmi dalam 1-2 hari kerja.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3.5 text-xs text-zinc-700">
            <div className="flex items-center gap-2.5 font-bold text-zinc-900 text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Entitas Legalitas Resmi</span>
            </div>
            <div className="space-y-1 text-zinc-600 pl-6">
              <div><strong>SK Kemenkumham:</strong> AHU-A089408.AH.01.30 Tahun 2026</div>
              <div><strong>Kantor Pusat:</strong> Jl. Kebon Kopi No. 153 Kota Cimahi, Jawa Barat 40535</div>
              <div><strong>Email Resmi:</strong> info@mahreenindonesia.com</div>
              <div><strong>Hotline Sinergi:</strong> +62 896-5264-7385</div>
            </div>
          </div>
        </div>

        {/* Right Form Card */}
        <div className="lg:col-span-7">
          <Card className="p-6 sm:p-8 space-y-5 bg-white border border-zinc-200/90 shadow-sm">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold font-display text-zinc-900">
                    Pengajuan Kemitraan Berhasil Dikirimkan!
                  </h3>
                  <p className="text-xs text-zinc-600 max-w-md mx-auto">
                    Terima kasih atas minat kolaborasi Anda. Tim Business Development Mahreen Indonesia akan segera menghubungi narahubung melalui email/WhatsApp yang terdaftar.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      institutionName: '',
                      partnerType: 'kampus',
                      picName: '',
                      picRole: '',
                      email: '',
                      phone: '',
                      message: '',
                    });
                  }}
                  className="mt-2"
                >
                  Kirim Pengajuan Lain
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">
                      Nama Instansi / Perusahaan / Kampus *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="contoh: Universitas Diponegoro / PT Sinergi"
                      value={formData.institutionName}
                      onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-xs focus:ring-2 focus:ring-terracotta-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">
                      Kategori Kemitraan *
                    </label>
                    <select
                      value={formData.partnerType}
                      onChange={(e) => setFormData({ ...formData, partnerType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-xs focus:ring-2 focus:ring-terracotta-500 focus:outline-none bg-white cursor-pointer"
                    >
                      <option value="kampus">Perguruan Tinggi (Magang MSIB / SKS)</option>
                      <option value="umkm">UMKM / Bisnis (Layanan Tanya Mahreen)</option>
                      <option value="csr">Korporasi CSR &amp; Social Impact</option>
                      <option value="studio">Brand / Komunitas Kreatif</option>
                      <option value="lainnya">Lainnya / Kolaborasi Bebas</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">
                      Nama PIC / Narahubung *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nama lengkap Anda"
                      value={formData.picName}
                      onChange={(e) => setFormData({ ...formData, picName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-xs focus:ring-2 focus:ring-terracotta-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">
                      Jabatan / Posisi
                    </label>
                    <input
                      type="text"
                      placeholder="contoh: Ketua Program Studi / CSR Lead"
                      value={formData.picRole}
                      onChange={(e) => setFormData({ ...formData, picRole: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-xs focus:ring-2 focus:ring-terracotta-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">
                      Alamat Email Resmi *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="email@instansi.ac.id"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-xs focus:ring-2 focus:ring-terracotta-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">
                      Nomor WhatsApp
                    </label>
                    <input
                      type="tel"
                      placeholder="+62 8..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-xs focus:ring-2 focus:ring-terracotta-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Gagasan / Rencana Kolaborasi yang Diharapkan
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Ceritakan secara ringkas tujuan sinergi, estimasi timeline, atau kebutuhan kolaborasi..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-xs focus:ring-2 focus:ring-terracotta-500 focus:outline-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={isSubmitting}
                  leftIcon={<Send className="w-4 h-4 text-white" />}
                  className="w-full shadow-sm cursor-pointer"
                >
                  {isSubmitting ? 'Mengirimkan...' : 'Kirim Penjajakan Kemitraan (1-Klik)'}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
