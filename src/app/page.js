'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Calendar,
  Layers,
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
  ChevronRight,
  Users,
  Building2,
  Cpu,
  Heart,
  Globe2,
  ArrowRight,
  MapPin,
  Trophy,
  Palette,
  Briefcase,
  Share2,
  Lightbulb,
  Sprout,
  TrendingUp,
  Code,
  Camera,
  Video,
  Sparkles as SparklesIcon,
  Clock,
  Award,
  Phone,
  Send,
  ExternalLink,
  GraduationCap,
  Star,
  Linkedin,
  Rocket,
  Target,
  Move,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import StatCounter from '@/components/landing/StatCounter';
import programsData from '@/data/programs.json';
import pillarsData from '@/data/pillars.json';
import eventsData from '@/data/events.json';
import { useMahreenStore } from '@/store/useMahreenStore';
import { getPillarTheme } from '@/utils/pillarTheme';
import { FadeInView } from '@/components/motion/MotionView';
import {
  Spotlight,
  BackgroundGrid,
  Sparkles,
  BorderBeam,
  FlipWords,
  BackgroundLines,
} from '@/components/aceternity';
import { WordReveal } from '@/components/motion/MotionText';

export default function HomePage() {
  const bookmarkedProgramIds = useMahreenStore((state) => state.bookmarkedProgramIds);
  const toggleBookmark = useMahreenStore((state) => state.toggleBookmark);
  const { showToast, addActivityLog } = useMahreenStore();

  const featuredPrograms = programsData.slice(0, 3);
  const { events } = eventsData;


  // 3 Mahreen Learning Tracks (Dual Style & Motion.dev monochrome)
  const learningTracks = [
    {
      index: '01',
      title: 'Bootcamp Intensif (12 Minggu)',
      badge: 'Karier Siap Kerja',
      desc: 'Program akselerasi komprehensif mengubah talenta pemula menjadi praktisi siap kerja berstandar industri dengan bimbingan mentor 1-on-1 dan job connector.',
      tracks: ['Fullstack Web Development', 'UI/UX & Product Design', 'Digital Marketing & Growth Strategy'],
      action: 'Daftar Bootcamp',
      link: '/programs',
      badgeColor: 'amber',
      btnVariant: 'primary', // Dual Style: Solid Black
    },
    {
      index: '02',
      title: 'Workshop Praktis (Hands-on)',
      badge: '1-2 Hari Intensif',
      desc: 'Sesi bimbingan langsung membedah studi kasus nyata industri, perancangan prototipe produk, hingga penguasaan tools modern terkini.',
      tracks: ['UI/UX Mastery: Design Systems', 'Figma Advanced Components', 'Rapid Video Content Creation'],
      action: 'Jadwal Workshop & Event',
      link: '/newsroom',
      badgeColor: 'amber',
      btnVariant: 'outline', // Dual Style: Thick Black Border
    },
    {
      index: '03',
      title: 'Sertifikasi Terverifikasi',
      badge: 'Standar Industri',
      desc: 'Uji kompetensi resmi dan penerbitan Sertifikat Kelulusan Industri dengan QR-code terverifikasi yang diakui 50+ perguruan tinggi mitra dan korporasi.',
      tracks: ['Sertifikat Akreditasi Proyek', 'Verifikasi Publik Terbuka', 'Rekomendasi Magang Industri'],
      action: 'Pengumuman & Cek Sertifikat',
      link: '/internship?program=certification#sertifikat-resmi',
      badgeColor: 'amber',
      btnVariant: 'outline', // Dual Style: Thick Black Border
    },
  ];

  const whyMahreen = [
    {
      title: 'Real Project Experience',
      desc: 'Terlibat langsung dalam penanganan proyek klien nyata yang memberikan wawasan industri sesungguhnya.',
      icon: Briefcase,
    },
    {
      title: 'Professional Mentors',
      desc: 'Dibimbing oleh praktisi ahli yang telah berpengalaman bertahun-tahun di bidangnya masing-masing.',
      icon: Users,
    },
    {
      title: 'Industry Portfolio',
      desc: 'Bangun portofolio yang mengesankan untuk menarik perhatian rekruter di perusahaan ternama.',
      icon: Star,
    },
    {
      title: 'Official Certificate',
      desc: 'Sertifikat resmi terakreditasi dengan nomor registrasi unik dan QR verifikasi publik tanpa perlu akun dashboard.',
      icon: Award,
    },
    {
      title: 'Career Prep',
      desc: 'Persiapan resume ATS, simulasi interview profesional, serta panduan personal branding dari konsultan karier.',
      icon: GraduationCap,
    },
    {
      title: 'Elite Networking',
      desc: 'Koneksi eksklusif ke komunitas 1.2K+ alumni dan ekosistem jaringan bisnis Mahreen di 34 provinsi.',
      icon: Globe2,
    },
    {
      title: 'Growth Mindset',
      desc: 'Budaya kerja suportif yang melatih pemecahan masalah kompleks, iterasi cepat, dan standar eksekusi luxury.',
      icon: SparklesIcon,
    },
  ];

  return (
    <div className="min-h-screen space-y-16 sm:space-y-24 pb-20 bg-[#fff]">
      {/* 1. HERO SECTION (ACETERNITY UI + MOTION.DEV POWERED) */}
      <section className="relative pt-8 sm:pt-14 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8 border-b border-zinc-100 overflow-hidden bg-white">
        {/* Aceternity UI Dual Directional Spotlights */}
        <Spotlight
          className="-top-40 left-0 md:left-40 md:-top-20"
          fill="rgba(100, 59, 23, 0.12)"
          fillSecondary="rgba(217, 119, 6, 0.06)"
          fillOpacity={1}
          fillSecondaryOpacity={1}
        />
        <Spotlight
          className="-top-20 -right-20 md:-right-10 opacity-70"
          fill="rgba(24, 24, 27, 0.06)"
          fillSecondary="rgba(100, 59, 23, 0.08)"
          fillOpacity={1}
          fillSecondaryOpacity={1}
        />

        <BackgroundLines className="py-2">
          <BackgroundGrid pattern="grid" dotColor="rgba(0, 0, 0, 0.035)">
            <div className="max-w-5xl mx-auto text-center space-y-7 relative">
              {/* Aceternity Eyebrow Badge with BorderBeam */}
              <div className="relative inline-flex items-center justify-center">
                <Sparkles count={14} minSize={2} maxSize={3.5} />
                <motion.div
                  initial={{ opacity: 0, y: -12, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="relative z-10 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/95 border border-zinc-300 text-zinc-900 text-xs font-semibold shadow-xs hover:border-black transition-colors overflow-hidden"
                >
                  <BorderBeam size={160} duration={6} colorFrom="#000000" colorTo="#a1a1aa" />
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terracotta-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-terracotta-600" />
                  </span>
                  <span className="font-bold text-zinc-950">Membangun Ekosistem Generasi Masa Depan</span>
                </motion.div>
              </div>

              {/* Main Headline with Aceternity FlipWords */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="space-y-4 max-w-3xl mx-auto"
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-zinc-950 tracking-tight font-display leading-[1.18]">
                  Dari Talenta Muda, <br className="hidden sm:inline" />
                  <span className="relative inline-block text-terracotta-800">
                    Berkarya Nyata
                    <svg
                      className="absolute -bottom-1.5 sm:-bottom-2.5 left-0 w-full h-3 text-terracotta-700 overflow-visible"
                      viewBox="0 0 250 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="none"
                    >
                      <motion.path
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.2, delay: 0.4, ease: 'easeInOut' }}
                        d="M3 9C50 3 150 2 247 7C180 11 90 10 3 9Z"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        fill="currentColor"
                      />
                    </svg>
                  </span>{' '}
                  untuk <br className="sm:hidden" />
                  <FlipWords
                    words={['Indonesia.', 'UMKM Daerah.', 'Masa Depan.', 'Generasi Emas.']}
                    className="font-black text-black underline decoration-terracotta-500/40 decoration-wavy underline-offset-4"
                    duration={3000}
                  />
                </h1>
                <p className="max-w-2xl mx-auto text-base sm:text-lg text-zinc-600 leading-relaxed font-normal">
                  Memberdayakan bisnis, mahasiswa, komunitas, dan organisasi melalui kreativitas, teknologi, pendidikan, dan kolaborasi yang bermakna. Building Ideas. Creating Impact.
                </p>
              </motion.div>

            {/* Action Buttons (Dual Style Motion.dev) */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2"
            >
              <Link href="/programs">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto"
                  rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
                >
                  <span>Jelajahi Ekosistem Program</span>
                </Button>
              </Link>
              <Link href="/quiz">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                  leftIcon={<SparklesIcon className="w-4 h-4 mr-1 text-zinc-900" />}
                >
                  <span>Mulai Quiz Karakter</span>
                </Button>
              </Link>
            </motion.div>

            {/* Motion.dev Interactive Draggable Micro-Chips with Clean SVGs */}
            <div className="hidden sm:flex flex-wrap items-center justify-center gap-2.5 pt-3 text-xs select-none">
              <span className="text-zinc-400 font-mono text-[11px] flex items-center gap-1.5">
                <Move className="w-3 h-3 text-zinc-400" />
                <span>Coba seret lencana:</span>
              </span>
              {[
                { label: '34 Provinsi Terkoneksi', icon: Globe2, rotate: -1.5 },
                { label: 'Batch 2 Terbuka', icon: Rocket, rotate: 1.5 },
                { label: 'UI/UX Luxury Standard', icon: Palette, rotate: -2 },
                { label: '100% Real Project', icon: Target, rotate: 2 },
              ].map((chip, idx) => {
                const IconComp = chip.icon;
                return (
                  <motion.div
                    key={idx}
                    drag
                    dragConstraints={{ left: -50, right: 50, top: -25, bottom: 25 }}
                    dragElastic={0.25}
                    whileHover={{ scale: 1.08, rotate: 0, cursor: 'grab' }}
                    whileTap={{ scale: 0.95, cursor: 'grabbing' }}
                    initial={{ opacity: 0, scale: 0.8, rotate: chip.rotate }}
                    animate={{ opacity: 1, scale: 1, rotate: chip.rotate }}
                    transition={{ type: 'spring', stiffness: 450, damping: 20, delay: 0.35 + idx * 0.08 }}
                    className="px-3 py-1.5 rounded-md bg-white border border-zinc-200 text-zinc-800 shadow-2xs font-semibold cursor-grab hover:border-black hover:shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <IconComp className="w-3.5 h-3.5 shrink-0 text-zinc-900" />
                    <span>{chip.label}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </BackgroundGrid>
      </BackgroundLines>
    </section>

      {/* 2. LIVE METRICS COUNTER STRIP (MOTION.DEV REAL-TIME STATS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-2xl bg-white border border-zinc-200 shadow-sm"
        >
          <div className="text-center space-y-1 border-r border-zinc-100 last:border-0">
            <div className="text-2xl sm:text-4xl font-black font-display text-zinc-950">
              <StatCounter end={34} suffix="" duration={1600} label="" />
            </div>
            <div className="text-xs font-bold text-zinc-800">Provinsi Terkoneksi</div>
            <div className="text-[11px] text-zinc-500">Dari Sabang sampai Merauke</div>
          </div>
          <div className="text-center space-y-1 md:border-r border-zinc-100 last:border-0">
            <div className="text-2xl sm:text-4xl font-black font-display text-zinc-950">
              <StatCounter end={127} suffix="+" duration={1800} label="" />
            </div>
            <div className="text-xs font-bold text-zinc-800">UMKM Binaan</div>
            <div className="text-[11px] text-zinc-500">Pendampingan digitalisasi</div>
          </div>
          <div className="text-center space-y-1 border-r border-zinc-100 last:border-0">
            <div className="text-2xl sm:text-4xl font-black font-display text-zinc-950">
              <StatCounter end={5240} suffix="+" duration={2000} label="" />
            </div>
            <div className="text-xs font-bold text-zinc-800">Talenta Terlatih</div>
            <div className="text-[11px] text-zinc-500">Magang &amp; bootcamp intensif</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-2xl sm:text-4xl font-black font-display text-zinc-950">
              <StatCounter end={100} suffix="%" duration={1500} label="" />
            </div>
            <div className="text-xs font-bold text-zinc-800">Akses Terbuka</div>
            <div className="text-[11px] text-zinc-500">Verifikasi sertifikat publik</div>
          </div>
        </motion.div>
      </section>

      {/* 4. MAHREEN LEARNING SHOWCASE (BOOTCAMP, WORKSHOP, SERTIFIKASI) */}
      <section id="mahreen-learning" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="p-8 sm:p-10 rounded-2xl bg-white border border-zinc-200 space-y-8 shadow-xs">
          <FadeInView className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-terracotta-800 bg-terracotta-50 px-3 py-1 rounded-md border border-terracotta-200">
              Akselerasi Karier Digital
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 font-display">
              Mahreen Learning Ecosystem
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              Jembatan antara teori akademis dan kebutuhan industri modern. Dirancang untuk mahasiswa dan talenta muda agar memiliki portofolio proyek teruji.
            </p>
          </FadeInView>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {learningTracks.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ type: 'spring', stiffness: 400, damping: 24 }}
                className="relative p-6 sm:p-7 rounded-xl border border-black bg-white hover:border-black transition-all duration-200 flex flex-col justify-between space-y-6 shadow-2xs hover:shadow-lg group overflow-hidden"
              >
                {idx === 0 && (
                  <BorderBeam size={220} duration={9} colorFrom="#000000" colorTo="#a1a1aa" />
                )}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-zinc-400 group-hover:text-zinc-900 transition-colors">
                      {item.index}
                    </span>
                    <Badge variant={item.badgeColor} size="xs">
                      {item.badge}
                    </Badge>
                  </div>

                  <h3 className="text-lg font-bold text-zinc-900 font-display group-hover:text-black transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {item.desc}
                  </p>

                  <div className="pt-3 border-t border-zinc-100 space-y-2">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider font-mono">
                      Fokus Kurikulum:
                    </span>
                    <ul className="space-y-1.5 text-xs text-zinc-700">
                      {item.tracks.map((t, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-zinc-900 shrink-0" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link href={item.link} className="block pt-2">
                  <Button
                    variant={item.btnVariant}
                    size="md"
                    className="w-full justify-between"
                    rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
                  >
                    <span>{item.action}</span>
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MENGAPA MAHREEN? (NILAI UTAMA - 7 PILLARS) */}
      <section id="mengapa-mahreen" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <FadeInView className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-terracotta-700 bg-terracotta-50 px-3 py-1 rounded-full border border-terracotta-200">
              Nilai Utama
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 font-display">
              Mengapa Mahreen?
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              Ekosistem pembelajaran yang mengutamakan portofolio nyata, standar kerja agensi profesional, dan bimbingan berkelanjutan.
            </p>
          </FadeInView>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyMahreen.map((item, i) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -5, scale: 1.015 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                  className="p-6 rounded-3xl bg-white border border-zinc-200 hover:border-terracotta-400 transition-all space-y-3 shadow-2xs hover:shadow-md group cursor-default"
                >
                  <div className="w-11 h-11 rounded-2xl bg-terracotta-50 border border-terracotta-200 text-terracotta-700 flex items-center justify-center font-bold shadow-2xs group-hover:scale-110 transition-transform">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-zinc-900 font-display group-hover:text-terracotta-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ADMISSION WINDOW (TIMELINE PENDAFTARAN) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <FadeInView className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-terracotta-800 bg-terracotta-50 px-3 py-1 rounded-full border border-terracotta-200">
              Jadwal Pendaftaran
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 font-display">
              Admission Window
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              Pantau jadwal pembukaan pendaftaran batch magang dan program pengembangan talenta Mahreen.
            </p>
          </FadeInView>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Window 1 */}
            <motion.div
              whileHover={{ y: -6, scale: 1.015 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="p-7 rounded-3xl bg-white border border-black shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-terracotta-50 text-terracotta-800 border border-terracotta-200">
                  Jadwal sedang dikonfirmasi
                </span>
                <h3 className="text-xl font-bold font-display text-zinc-900">
                  Batch Internship Berikutnya
                </h3>
                <div className="text-xs font-semibold text-terracotta-700">
                  Periode pendaftaran akan diumumkan
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Our most ambitious batch yet, focusing on sustainable digital solutions and high-fashion branding.
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-400">Status: Belum Dibuka</span>
                <Link
                  href="/internship"
                  className="px-3.5 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-xs font-bold text-zinc-800 transition-colors cursor-pointer"
                >
                  Pre-Register
                </Link>
              </div>
            </motion.div>

            {/* Window 2 */}
            <motion.div
              whileHover={{ y: -6, scale: 1.015 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="p-7 rounded-3xl bg-white border border-black shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-terracotta-50 text-terracotta-800 border border-terracotta-200">
                  Coming Soon
                </span>
                <h3 className="text-xl font-bold font-display text-zinc-900">
                  Program Pengembangan Berikutnya
                </h3>
                <div className="text-xs font-semibold text-terracotta-700">
                  Jadwal akan diumumkan
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Exploring the intersection of AI and Luxury Brand Management. Early interest list is open.
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-400">Status: Belum Dibuka</span>
                <Link
                  href="/programs"
                  className="px-3.5 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-xs font-bold text-zinc-800 transition-colors cursor-pointer"
                >
                  Early Interest
                </Link>
              </div>
            </motion.div>

            {/* Window 3 */}
            <div className="p-7 rounded-3xl bg-white border border-black shadow-2xs flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-zinc-200 text-zinc-700">
                  Closed
                </span>
                <h3 className="text-xl font-bold font-display text-zinc-900">
                  Batch 12: Horizon
                </h3>
                <div className="text-xs font-semibold text-zinc-500">
                  Finished: Aug 2024
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  A successful journey of 85 graduates now making an impact in Indonesia's tech ecosystem.
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-200/60 flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-500">Status: Selesai</span>
                <span className="text-xs font-bold text-zinc-400">85 Lulusan</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. NEWSROOM & DAFTAR EVENT MAHREEN (OFFICIAL 5 EVENTS & KEYNOTE SPEAKERS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <FadeInView className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-terracotta-700 bg-terracotta-50 px-3 py-1 rounded-full border border-terracotta-200">
                Mahreen Newsroom &amp; Events
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 font-display">
                Daftar Event &amp; Masterclass Mahreen
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 max-w-xl">
                Tingkatkan kompetensi digital bersama para pakar terkemuka. Tersedia program berbayar intensif dan seminar nasional gratis.
              </p>
            </div>
            <Link href="/newsroom">
              <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                Buka Seluruh Event Newsroom
              </Button>
            </Link>
          </FadeInView>

          {/* Event Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.slice(0, 3).map((ev) => {
              const isPaid = ev.pricingType === 'PAID';
              return (
                <motion.div
                  key={ev.id}
                  whileHover={{ y: -6, scale: 1.015 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className="rounded-3xl border border-zinc-200/90 bg-white overflow-hidden shadow-2xs hover:shadow-lg hover:border-terracotta-400 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-44 w-full overflow-hidden bg-zinc-100">
                      <img
                        src={ev.coverImage}
                        alt={ev.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span
                          className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider ${
                            isPaid ? 'bg-terracotta-100 text-terracotta-900 border border-terracotta-200' : 'bg-terracotta-700 text-white'
                          }`}
                        >
                          {ev.pricingType}
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-white/95 text-zinc-800">
                          {ev.category}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 text-white text-xs bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-xs flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-terracotta-200" />
                        <span>{ev.dateDisplay} • {ev.time}</span>
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <h3 className="text-base font-bold font-display text-zinc-900 group-hover:text-terracotta-700 transition-colors line-clamp-2">
                        {ev.title}
                      </h3>
                      <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                        {ev.summary}
                      </p>

                      <div className="pt-2 flex items-center gap-2.5 p-2 rounded-xl bg-white border border-zinc-200">
                        <img
                          src={ev.speaker.avatar}
                          alt={ev.speaker.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-zinc-900 truncate">{ev.speaker.name}</div>
                          <div className="text-[10px] text-zinc-500 truncate">{ev.speaker.role}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0 mt-2 border-t border-zinc-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-900">{ev.price}</span>
                    <Link href={`/newsroom/webinar/${ev.slug}`}>
                      <span className="text-xs font-bold text-terracotta-700 hover:text-terracotta-900 flex items-center gap-1">
                        Detail Event <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. LIMA PILAR BISNIS & EKOSISTEM RESMI MAHREEN INDONESIA */}
      <section id="pilar-bisnis" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <FadeInView className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-terracotta-700 bg-terracotta-50 px-3 py-1 rounded-full border border-terracotta-200">
              Ekosistem Mahreen Indonesia
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 font-display">
              5 Pilar Bisnis &amp; Sinergi Karya
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
              Membangun bisnis, mengembangkan talenta, mendorong kreativitas, serta menciptakan dampak sosial berkelanjutan.
            </p>
          </FadeInView>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Pilar 1 */}
            <Link
              href="/internship#posisi-magang"
              className="group p-5 rounded-2xl border border-zinc-200/90 bg-white hover:border-terracotta-300 transition-all flex flex-col justify-between space-y-3 shadow-2xs hover:shadow-xs"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-terracotta-700 uppercase tracking-wider block">
                  Talenta • WFH / WFO
                </span>
                <h3 className="text-base font-bold text-zinc-900 group-hover:text-terracotta-700 transition-colors">
                  Mahreen Internship
                </h3>
                <p className="text-xs text-zinc-500 line-clamp-3 leading-relaxed">
                  Program magang karier 4 bulan berbasis proyek nyata. Tersedia 6 posisi divisi dengan pilihan WFH (Remote), WFO (Studio Cimahi), dan Hybrid.
                </p>
              </div>
              <span className="text-xs font-semibold text-terracotta-700 flex items-center gap-1 pt-2 border-t border-zinc-100">
                Lihat 6 Posisi Lowongan →
              </span>
            </Link>

            {/* Pilar 2 */}
            <Link
              href="/partnership"
              className="group p-5 rounded-2xl border border-zinc-200/90 bg-white hover:border-terracotta-300 transition-all flex flex-col justify-between space-y-3 shadow-2xs hover:shadow-xs"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-terracotta-700 uppercase tracking-wider block">
                  Solusi Bisnis
                </span>
                <h3 className="text-base font-bold text-zinc-900 group-hover:text-terracotta-700 transition-colors">
                  Tanya Mahreen
                </h3>
                <p className="text-xs text-zinc-500 line-clamp-3 leading-relaxed">
                  Solusi digital dan kreatif untuk membantu brand dan perusahaan bertumbuh melalui teknologi, branding, dan kemitraan strategis.
                </p>
              </div>
              <span className="text-xs font-semibold text-terracotta-700 flex items-center gap-1 pt-2 border-t border-zinc-100">
                Eksplorasi Solusi →
              </span>
            </Link>

            {/* Pilar 3 */}
            <Link
              href="/karya"
              className="group p-5 rounded-2xl border border-zinc-200/90 bg-white hover:border-terracotta-300 transition-all flex flex-col justify-between space-y-3 shadow-2xs hover:shadow-xs"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-terracotta-700 uppercase tracking-wider block">
                  Studio Kreatif
                </span>
                <h3 className="text-base font-bold text-zinc-900 group-hover:text-terracotta-700 transition-colors">
                  Mahreen Studio
                </h3>
                <p className="text-xs text-zinc-500 line-clamp-3 leading-relaxed">
                  Creative lifestyle yang berfokus pada pengembangan apparel, visual branding, dan identitas kreatif kontemporer.
                </p>
              </div>
              <span className="text-xs font-semibold text-terracotta-700 flex items-center gap-1 pt-2 border-t border-zinc-100">
                Lihat Karya →
              </span>
            </Link>

            {/* Pilar 4 */}
            <Link
              href="/partnership"
              className="group p-5 rounded-2xl border border-zinc-200/90 bg-white hover:border-terracotta-300 transition-all flex flex-col justify-between space-y-3 shadow-2xs hover:shadow-xs"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-terracotta-700 uppercase tracking-wider block">
                  Creative Agency
                </span>
                <h3 className="text-base font-bold text-zinc-900 group-hover:text-terracotta-700 transition-colors">
                  Peduli Mahreen
                </h3>
                <p className="text-xs text-zinc-500 line-clamp-3 leading-relaxed">
                  Mendorong perubahan melalui pendidikan, pemberdayaan masyarakat, dan aksi sosial yang berdampak nyata di pelosok.
                </p>
              </div>
              <span className="text-xs font-semibold text-terracotta-700 flex items-center gap-1 pt-2 border-t border-zinc-100">
                Lihat Aksi Sosial →
              </span>
            </Link>

            {/* Pilar 5 */}
            <Link
              href="/partnership"
              className="group p-5 rounded-2xl border border-zinc-200/90 bg-white hover:border-terracotta-300 transition-all flex flex-col justify-between space-y-3 shadow-2xs hover:shadow-xs"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-terracotta-700 uppercase tracking-wider block">
                  Social Impact
                </span>
                <h3 className="text-base font-bold text-zinc-900 group-hover:text-terracotta-700 transition-colors">
                  Mahreen CSR
                </h3>
                <p className="text-xs text-zinc-500 line-clamp-3 leading-relaxed">
                  Membangun kolaborasi CSR yang berkelanjutan bersama perusahaan dan berbagai mitra strategis nasional.
                </p>
              </div>
              <span className="text-xs font-semibold text-terracotta-700 flex items-center gap-1 pt-2 border-t border-zinc-100">
                Kemitraan CSR →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. TEASER JEJARING & PETA SEBARAN NUSANTARA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-zinc-900 text-white p-8 sm:p-12 relative overflow-hidden shadow-md border border-zinc-800">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-terracotta-200 text-xs font-semibold backdrop-blur-xs border border-white/10">
                <Globe2 className="w-3.5 h-3.5 text-terracotta-300" />
                <span>Jejaring Nasional • 34 Provinsi Terkoneksi</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
                Dari Sabang sampai Merauke, <br />
                <span className="text-terracotta-400">Denyut Karya Nyata Pemuda.</span>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                Jelajahi sentra pendampingan 127+ UMKM, laboratorium riset IoT di 34 provinsi Nusantara secara interaktif, serta kiprah 1.2K+ ikatan alumni Mahreen yang kini memimpin industri.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <Link href="/jejaring">
                <Button
                  variant="dark"
                  size="lg"
                  className="w-full sm:w-auto"
                  rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
                >
                  <span>Jelajahi Peta &amp; Alumni</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* 11. FINAL CTA SECTION (MULAI LANGKAH NYATA) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white text-zinc-900 p-8 sm:p-12 text-center space-y-6 relative overflow-hidden border border-zinc-200 shadow-sm">
          <Spotlight
            className="-top-20 left-1/2 -translate-x-1/2"
            fill="#FFFFFF"
            fillSecondary="#FAFAFA"
            fillOpacity={0.07}
            fillSecondaryOpacity={0.04}
          />

          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-terracotta-700 bg-terracotta-50 px-3.5 py-1 rounded-full border border-terracotta-200">
              Mulai Langkah Nyata
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-display tracking-tight text-zinc-900">
              Siap Mengembangkan Karier Bersama Mahreen?
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              Mulai perjalanan profesionalmu bersama ekosistem kreatif dan digital Mahreen Indonesia. Bergabunglah bersama ratusan talenta muda lainnya.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2 relative z-10">
            <Link href="/internship">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
                rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
              >
                <span>Lihat Posisi Magang</span>
              </Button>
            </Link>

            <Link href="/partnership">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <span>Hubungi Kami (Kemitraan)</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
