'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe2,
  Users,
  Building2,
  MapPin,
  Trophy,
  ArrowRight,
  ExternalLink,
  Search,
  Linkedin,
  GraduationCap,
  Sparkles,
  Briefcase,
  Share2,
  CheckCircle2,
  HeartHandshake,
  Compass,
  Award,
  ChevronRight,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import CardSpotlight from '@/components/aceternity/CardSpotlight';
import IndonesiaMapSection from '@/components/home/IndonesiaMapSection';
import { FadeInView, StaggerContainer, StaggerItem } from '@/components/motion/MotionView';
import { useMahreenStore } from '@/store/useMahreenStore';

// Data Ikatan Alumni Mahreen Indonesia
const ALUMNI_DATA = [
  {
    id: 'raka-pratama',
    name: 'Raka Pratama',
    role: 'Chief Design Officer',
    company: 'Mahreen Creative Studio',
    batch: 'Alumni Batch 10 (2024)',
    division: 'UI/UX & Product Design',
    trackKey: 'design',
    origin: 'Bandung, Jawa Barat',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com',
    quote: 'Mahreen membentuk cara berpikir strategis dan ketelitian eksekusi berstandar luxury agency. Portofolio proyek nyata yang kami bangun langsung diakui industri.',
    skills: ['Design Systems', 'Art Direction', 'Luxury UI/UX'],
    mentorAvailable: true,
  },
  {
    id: 'siti-mahreen',
    name: 'Siti Rahmawati',
    role: 'Lead Fullstack Developer',
    company: 'Digital Nusantara Hub',
    batch: 'Alumni Batch 8 (2023)',
    division: 'Tech & Engineering',
    trackKey: 'tech',
    origin: 'Jakarta Selatan, DKI Jakarta',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com',
    quote: 'Dari proyek IoT dan dashboard agensi Mahreen, saya belajar arsitektur kode modern yang scalable dan standar keamanan enterprise tingkat tinggi.',
    skills: ['Next.js', 'Cloud Architecture', 'PostgreSQL'],
    mentorAvailable: true,
  },
  {
    id: 'dimas-andre',
    name: 'Dimas Andrean',
    role: 'Growth Strategist & Analytics',
    company: 'Fintech Solutions Indonesia',
    batch: 'Alumni Batch 11 (2025)',
    division: 'Business & Growth Strategy',
    trackKey: 'business',
    origin: 'Surabaya, Jawa Timur',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com',
    quote: 'Mendampingi UMKM naik kelas di Jawa Timur memberi saya data empiris riil tentang funneling bisnis dan growth hacking pasar lokal Indonesia.',
    skills: ['Growth Hacking', 'Omnichannel Marketing', 'Data Analytics'],
    mentorAvailable: false,
  },
  {
    id: 'maya-kania',
    name: 'Maya Kania Putri',
    role: 'Senior Multimedia & Motion Director',
    company: 'Vanguard Visual Lab',
    batch: 'Alumni Batch 9 (2024)',
    division: 'Multimedia & Creative Content',
    trackKey: 'multimedia',
    origin: 'Sleman, DI Yogyakarta',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com',
    quote: 'Standar estetika Mahreen yang anggun, warm terracotta, dan presisi mengajarkan saya membedakan karya amatir dengan eksekusi visual kelas dunia.',
    skills: ['Cinema 4D', 'After Effects', 'Creative Direction'],
    mentorAvailable: true,
  },
  {
    id: 'fakhri-ramadhan',
    name: 'Fakhri Ramadhan',
    role: 'IoT Hardware Systems Engineer',
    company: 'AgriTech Nusantara',
    batch: 'Alumni Batch 11 (2025)',
    division: 'Tech & Engineering',
    trackKey: 'tech',
    origin: 'Malang, Jawa Timur',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com',
    quote: 'Mengembangkan stasiun sensor cuaca microhidro di pedesaan mengajarkan ketahanan hardware dan empati mendalam pada pengguna di pelosok.',
    skills: ['LoRaWAN', 'Embedded C++', 'Sensor Telemetry'],
    mentorAvailable: true,
  },
  {
    id: 'annisa-larasati',
    name: 'Annisa Larasati',
    role: 'Product Manager & EdTech Strategist',
    company: 'EduKarya Bangsa',
    batch: 'Alumni Batch 7 (2023)',
    division: 'Business & Growth Strategy',
    trackKey: 'business',
    origin: 'Semarang, Jawa Tengah',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com',
    quote: 'Ritme kolaborasi lintas bidang di Mahreen menempa kemampuan product discovery dan ownership yang langsung relevan di industri rintisan.',
    skills: ['Product Discovery', 'Scrum / Agile', 'User Research'],
    mentorAvailable: false,
  },
  {
    id: 'bagus-wicaksono',
    name: 'Bagus Wicaksono',
    role: 'Lead Brand Identity Specialist',
    company: 'Nusantara Heritage Studio',
    batch: 'Alumni Batch 10 (2024)',
    division: 'UI/UX & Product Design',
    trackKey: 'design',
    origin: 'Denpasar, Bali',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com',
    quote: 'Pendampingan wastra tenun dan kopi daerah membuktikan kearifan lokal Nusantara memiliki daya jual global bila dikemas secara kontemporer.',
    skills: ['Brand Identity', 'Eco Packaging', 'Design Research'],
    mentorAvailable: true,
  },
  {
    id: 'devi-maharani',
    name: 'Devi Maharani',
    role: 'Regional Community Partnership Lead',
    company: 'Inisiatif Bahari Timur',
    batch: 'Alumni Batch 9 (2024)',
    division: 'Social Impact & Partnerships',
    trackKey: 'social',
    origin: 'Kupang, Nusa Tenggara Timur',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com',
    quote: 'Jejaring Mahreen bukan sekadar platform magang, melainkan keluarga pejuang kemajuan pemuda dari pelosok kepulauan Nusantara.',
    skills: ['Community Organizing', 'Stakeholder Management', 'Social Impact Assessment'],
    mentorAvailable: true,
  },
];

export default function JejaringPage() {
  const [alumniSearch, setAlumniSearch] = useState('');
  const [selectedAlumniTrack, setSelectedAlumniTrack] = useState('Semua');
  const [activeTabSection, setActiveTabSection] = useState('peta'); // 'peta' | 'alumni' | 'sentra'
  const { showToast } = useMahreenStore();

  const trackTabs = [
    { id: 'Semua', label: 'Semua Bidang' },
    { id: 'tech', label: 'Tech & Engineering' },
    { id: 'design', label: 'UI/UX & Design' },
    { id: 'business', label: 'Business & Growth' },
    { id: 'multimedia', label: 'Multimedia & Motion' },
    { id: 'social', label: 'Social & Community' },
  ];

  const filteredAlumni = useMemo(() => {
    return ALUMNI_DATA.filter((alum) => {
      const matchSearch =
        alumniSearch === '' ||
        alum.name.toLowerCase().includes(alumniSearch.toLowerCase()) ||
        alum.role.toLowerCase().includes(alumniSearch.toLowerCase()) ||
        alum.company.toLowerCase().includes(alumniSearch.toLowerCase()) ||
        alum.origin.toLowerCase().includes(alumniSearch.toLowerCase()) ||
        alum.skills.some((sk) => sk.toLowerCase().includes(alumniSearch.toLowerCase()));

      if (!matchSearch) return false;

      if (selectedAlumniTrack === 'Semua') return true;
      return alum.trackKey === selectedAlumniTrack;
    });
  }, [alumniSearch, selectedAlumniTrack]);

  const handleCopyProfile = (alum) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(`${alum.name} - ${alum.role} at ${alum.company} (Ikatan Alumni Mahreen Indonesia)`);
      showToast(`Tautan profil ${alum.name} disalin!`, 'success');
    }
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-20 bg-white min-h-screen">
      {/* 1. TOP HEADER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-200">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-terracotta-50 text-terracotta-800 text-xs font-semibold border border-terracotta-200 shadow-2xs">
              <Globe2 className="w-3.5 h-3.5 text-terracotta-700" />
              <span>Jejaring Nasional • 34 Provinsi Terkoneksi</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-zinc-900 tracking-tight leading-tight">
              Peta Sebaran &amp; <br />
              <span className="text-terracotta-700">Jejaring Kebanggaan Mahreen.</span>
            </h1>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
              Jelajahi sentra pendampingan UMKM, laboratorium riset IoT tepat guna, dan ekspedisi pemuda di 34 provinsi Nusantara secara interaktif, serta kiprah para alumni Mahreen yang kini berkiprah di pucuk industri kreatif dan teknologi tanah air.
            </p>
          </div>

          {/* Quick Summary Badges (Matching Hub Aesthetic) */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="p-3 sm:px-4 rounded-2xl bg-white border border-black text-center min-w-[84px] shadow-2xs">
              <div className="text-xl sm:text-2xl font-bold font-display text-black">34</div>
              <div className="text-[10px] font-bold text-black uppercase tracking-wider mt-0.5">Provinsi</div>
            </div>
            <div className="p-3 sm:px-4 rounded-2xl bg-white border border-black text-center min-w-[84px] shadow-2xs">
              <div className="text-xl sm:text-2xl font-bold font-display text-black">127+</div>
              <div className="text-[10px] font-bold text-black uppercase tracking-wider mt-0.5">UMKM Binaan</div>
            </div>
            <div className="p-3 sm:px-4 rounded-2xl bg-white border border-black text-center min-w-[84px] shadow-2xs">
              <div className="text-xl sm:text-2xl font-bold font-display text-black">5.240+</div>
              <div className="text-[10px] font-bold text-black uppercase tracking-wider mt-0.5">Talenta</div>
            </div>
            <div className="p-3 sm:px-4 rounded-2xl bg-white border border-black text-center min-w-[84px] shadow-2xs">
              <div className="text-xl sm:text-2xl font-bold font-display text-black">1.2K+</div>
              <div className="text-[10px] font-bold text-black uppercase tracking-wider mt-0.5">Alumni</div>
            </div>
          </div>
        </div>

      </section>

      {/* 3. PETA SEBARAN NUSANTARA (INTERACTIVE MAP SECTION) */}
      <IndonesiaMapSection />

      {/* 4. IKATAN ALUMNI MAHREEN INDONESIA SECTION */}
      <section id="ikatan-alumni" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24 space-y-8">
        {/* Alumni Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200 pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 text-xs font-semibold border border-zinc-200">
              <Award className="w-3.5 h-3.5 text-terracotta-700" />
              <span>Jejaring Kebanggaan • Alumni Network</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-zinc-900 tracking-tight">
              Ikatan Alumni <br />
              <span className="text-terracotta-700">Mahreen Indonesia.</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
              Melihat jejak langkah para alumni program magang dan pelatihan intensif Mahreen yang kini berkiprah di pucuk agensi kreatif terkemuka, perbankan, teknologi terapan, hingga ekosistem inovasi nasional.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500">
            <span>Menampilkan <strong className="text-zinc-900">{filteredAlumni.length}</strong> profil alumni</span>
          </div>
        </div>

        {/* Search & Filter Alumni */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Cari nama alumni, profesi, perusahaan, kota, atau keahlian..."
                value={alumniSearch}
                onChange={(e) => setAlumniSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-zinc-300 bg-white text-xs sm:text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-terracotta-500 shadow-2xs"
              />
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-0">
            {trackTabs.map((tab) => {
              const isActive = selectedAlumniTrack === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedAlumniTrack(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                    isActive
                      ? 'bg-terracotta-700 text-white shadow-2xs'
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Alumni Grid Cards */}
        {filteredAlumni.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-3xl border border-dashed border-zinc-300 bg-zinc-50/50 space-y-3">
            <GraduationCap className="w-10 h-10 text-zinc-400 mx-auto" />
            <div className="text-base font-bold text-zinc-800">Tidak ada profil alumni yang cocok</div>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              Coba gunakan kata kunci pencarian lain atau pilih kategori bidang keahlian yang berbeda.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setAlumniSearch('');
                setSelectedAlumniTrack('Semua');
              }}
              className="mt-2"
            >
              Reset Pencarian
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredAlumni.map((alum) => (
              <div
                key={alum.id}
                className="p-6 rounded-3xl bg-white border border-zinc-200 shadow-2xs hover:shadow-xs transition-all duration-200 flex flex-col justify-between group space-y-4 relative"
              >
                {/* Header Card: Avatar & Badge */}
                <div className="space-y-4 text-center">
                  <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-terracotta-200 shadow-2xs group-hover:scale-105 transition-transform">
                    <img
                      src={alum.avatar}
                      alt={alum.name}
                      className="w-full h-full object-cover"
                    />
                    {alum.mentorAvailable && (
                      <span
                        title="Tersedia untuk Sesi Mentoring"
                        className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"
                      />
                    )}
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-zinc-900 font-display group-hover:text-terracotta-800 transition-colors">
                      {alum.name}
                    </h3>
                    <div className="text-xs font-semibold text-terracotta-700">
                      {alum.role}
                    </div>
                    <div className="text-xs text-zinc-600 font-medium">
                      {alum.company}
                    </div>
                    <div className="inline-flex items-center gap-1 text-[11px] font-medium text-zinc-400 pt-0.5">
                      <MapPin className="w-3 h-3 text-zinc-400" />
                      <span>{alum.origin}</span>
                    </div>
                  </div>
                </div>

                {/* Batch & Track Tag */}
                <div className="space-y-2 pt-2 border-t border-zinc-100 text-center">
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-zinc-100 text-[11px] font-semibold text-zinc-700 border border-zinc-200">
                    {alum.batch}
                  </div>
                  <p className="text-[11px] text-zinc-500 italic line-clamp-3 leading-relaxed">
                    &ldquo;{alum.quote}&rdquo;
                  </p>
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
                  {alum.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-terracotta-50 text-terracotta-800 border border-terracotta-100"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Card Action Footer */}
                <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
                  <button
                    onClick={() => handleCopyProfile(alum)}
                    title="Salin ringkasan profil"
                    className="text-zinc-400 hover:text-zinc-600 p-1 rounded-md transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href={alum.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-zinc-700 hover:text-terracotta-700 flex items-center gap-1.5 transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-zinc-500 group-hover:text-terracotta-700" />
                    <span>Profil LinkedIn ↗</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 5. INITIATIVE & REGIONAL PARTNERSHIP CTA */}
      <section id="kemitraan-daerah" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="rounded-3xl bg-zinc-900 text-white p-8 sm:p-12 relative overflow-hidden shadow-md border border-zinc-800">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-terracotta-200 text-xs font-semibold backdrop-blur-xs border border-white/10">
                <HeartHandshake className="w-3.5 h-3.5 text-terracotta-300" />
                <span>Kolaborasi Inisiatif Daerah &amp; Kampus</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
                Ingin Membawa Sentra &amp; Laboratorium Mahreen ke Daerahmu?
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                Kami membuka kemitraan strategis dengan Pemerintah Daerah, Perguruan Tinggi, Konsorsium Industri, dan Komunitas Penggerak Pemuda di seluruh pelosok Indonesia untuk mendirikan sentra pendampingan terpadu dan penyaluran talenta magang bersertifikat.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <Link href="/partnership">
                <Button variant="primary" className="w-full sm:w-auto shadow-sm">
                  Ajukan Kemitraan Daerah <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
              <Link href="/internship">
                <Button variant="outline" className="w-full sm:w-auto bg-transparent text-white border-white/20 hover:bg-white/10">
                  Daftar Magang Terkoneksi
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
