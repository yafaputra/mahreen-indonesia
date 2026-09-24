'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  FileBadge,
  Printer,
  Share2,
  CheckCircle2,
  ShieldCheck,
  QrCode,
  Award,
  Globe,
  MapPin,
  Calendar,
  Compass,
  Trophy,
  Copy,
  ExternalLink,
  Download,
  Stamp,
  User,
  Zap,
  Lock,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import badgesData from '@/data/badges.json';
import { useMahreenStore } from '@/store/useMahreenStore';
import { Spotlight, BackgroundGrid, SparklesCore, BorderBeam } from '@/components/aceternity';

function PasporContent() {
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabParam === 'sertifikat' ? 'sertifikat' : 'paspor');
  const [copied, setCopied] = useState(false);
  const certRef = useRef(null);

  // Store data
  const isAuthenticated = useMahreenStore((state) => state.isAuthenticated);
  const login = useMahreenStore((state) => state.login);
  const currentUser = useMahreenStore((state) => state.currentUser);
  const totalXp = useMahreenStore((state) => state.totalXp);
  const characterProfile = useMahreenStore((state) => state.characterProfile);
  const unlockedBadgeIds = useMahreenStore((state) => state.unlockedBadgeIds);
  const quizCompleted = useMahreenStore((state) => state.quizCompleted);
  const registeredFestivals = useMahreenStore((state) => state.registeredFestivals);
  const exploredPillarIds = useMahreenStore((state) => state.exploredPillarIds);

  useEffect(() => {
    setMounted(true);
    if (tabParam === 'sertifikat' || tabParam === 'paspor') {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const getUserTier = (xp) => {
    if (xp >= 350) return { name: 'Mahreen Champion', title: 'Adipati Karya', color: 'platinum', code: 'TIER-IV' };
    if (xp >= 220) return { name: 'Penggerak Emas', title: 'Punggawa Emas', color: 'gold', code: 'TIER-III' };
    if (xp >= 150) return { name: 'Pejuang Perak', title: 'Ksatria Perak', color: 'silver', code: 'TIER-II' };
    return { name: 'Perintis Muda', title: 'Taruna Perintis', color: 'bronze', code: 'TIER-I' };
  };

  const currentTier = getUserTier(totalXp);

  const passportNumber = `MHRN-IDN-${(currentUser?.id || 'DEMO01').toUpperCase().replace(/[^A-Z0-9]/g, '')}-2026`;
  const certSerial = `MHRN/CERT/2026/XI/${Math.floor(100000 + (totalXp * 7) % 900000)}`;

  // Island stamps
  const stamps = [
    { id: 'jawa', name: 'Zona Jawa', code: 'Z-01 JKT/DIY', date: 'Aktif 2026', visited: true },
    { id: 'bali-nusra', name: 'Bali & Nusra', code: 'Z-02 DPS/KOE', date: 'Okt 2026', visited: registeredFestivals.some(f => f.zoneId === 'bali-nusra') || totalXp >= 150 },
    { id: 'sumatera', name: 'Zona Sumatera', code: 'Z-03 MDN/PDG', date: 'Nov 2026', visited: registeredFestivals.some(f => f.zoneId === 'sumatera') || exploredPillarIds.length >= 3 },
    { id: 'kalimantan', name: 'Zona Kalimantan', code: 'Z-04 BPN/IKN', date: 'Des 2026', visited: registeredFestivals.some(f => f.zoneId === 'kalimantan') },
    { id: 'timur', name: 'Indonesia Timur', code: 'Z-05 AMQ/JAP', date: 'Jan 2027', visited: registeredFestivals.some(f => f.zoneId === 'indonesia-timur') || totalXp >= 250 },
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (!mounted) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center text-xs text-zinc-500">
        Mempersiapkan dokumen kenegaraan digital...
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 sm:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* NON-PRINT HEADER NAVIGASI */}
        <div className="print:hidden space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-xs font-semibold text-amber-900 mb-2">
                <Stamp className="w-3.5 h-3.5 text-amber-700" />
                <span>Dokumen Otentikasi Talenta Bangsa</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-nusantara-charcoal">
                Paspor Digital & Sertifikat Resmi
              </h1>
              <p className="text-xs sm:text-sm text-nusantara-charcoalMuted max-w-2xl mt-1">
                Bukti sah kontribusi, identitas karakter pemuda, dan lencana kehormatanmu dalam ekosistem Mahreen OS.
              </p>
            </div>

            {/* Print, Share & Public Notice Actions */}
            <div className="flex flex-wrap items-center gap-2.5">
              <Link href="/internship?program=certification">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900"
                  leftIcon={<Award className="w-3.5 h-3.5 text-amber-700" />}
                >
                  Pengumuman &amp; Verifikasi Terbuka
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyLink}
                leftIcon={<Share2 className="w-3.5 h-3.5" />}
              >
                {copied ? 'Tautan Disalin!' : 'Bagikan Tautan'}
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handlePrint}
                leftIcon={<Printer className="w-4 h-4" />}
                className="shadow-subtle"
              >
                Cetak / Simpan PDF
              </Button>
            </div>
          </div>

          {/* TAB SWITCHER */}
          <div className="pt-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
              <TabsList className="bg-ivory-100 p-1.5 rounded-2xl border border-ivory-200">
                <TabsTrigger
                  value="paspor"
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2"
                >
                  <Stamp className="w-4 h-4" />
                  <span>Buku Paspor Digital</span>
                </TabsTrigger>
                <TabsTrigger
                  value="sertifikat"
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2"
                >
                  <Award className="w-4 h-4" />
                  <span>Piagam Sertifikat Resmi</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* TAB 1: PASPOR DIGITAL NUSANTARA */}
        {activeTab === 'paspor' && (
          <div className="space-y-8 print:block">
            {/* BOOK CONTAINER */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* LEFT PAGE: BIOMETRIC & IDENTITY (6 cols) */}
              <div className="lg:col-span-6 bg-[#1C1816] text-[#FAF8F4] rounded-2xl border-4 border-[#2E2824] shadow-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
                <BorderBeam size={280} duration={10} colorFrom="#F59E0B" colorTo="#E64A27" borderWidth={2} />
                {/* Garuda / Watermark Background */}
                <div className="absolute -right-10 -bottom-10 w-64 h-64 opacity-5 pointer-events-none text-amber-200">
                  <ShieldCheck className="w-full h-full" />
                </div>

                {/* Top Header of Passport Page */}
                <div className="border-b border-[#3D352F] pb-4 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] tracking-widest uppercase font-bold text-amber-300/80">
                      REPUBLIK INDONESIA
                    </span>
                    <h3 className="text-base font-bold font-display text-white tracking-wide">
                      PASPOR TALENTA MAHREEN OS
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] uppercase tracking-wider text-ivory-300 block">No. Paspor</span>
                    <span className="text-xs font-mono font-bold text-amber-200">{passportNumber}</span>
                  </div>
                </div>

                {/* Biometric & Profile Photo Row */}
                <div className="flex gap-5 items-start">
                  <div className="relative shrink-0">
                    <img
                      src={
                        currentUser?.avatar ||
                        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=240&q=80'
                      }
                      alt={currentUser?.name || 'Talenta Mahreen'}
                      className="w-24 h-32 rounded-lg object-cover border-2 border-amber-300/60 shadow-md grayscale contrast-125"
                    />
                    <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded bg-terracotta-700 text-white text-[9px] font-bold border border-white/20">
                      IDN
                    </div>
                  </div>

                  <div className="space-y-2.5 text-xs flex-1 min-w-0">
                    <div>
                      <span className="text-[10px] text-ivory-300 uppercase block">Nama Lengkap / Full Name</span>
                      <span className="font-bold text-sm text-white uppercase tracking-tight truncate block">
                        {currentUser?.name || 'Ksatria Muda Nusantara'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[10px] text-ivory-300 uppercase block">Peran / Role</span>
                        <span className="font-semibold text-amber-200 truncate block">
                          {currentUser?.role || 'Talenta Kreatif'}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-ivory-300 uppercase block">Asal / Province</span>
                        <span className="font-semibold text-white truncate block">
                          {currentUser?.province || 'D.I. Yogyakarta'}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#3D352F]">
                      <div>
                        <span className="text-[10px] text-ivory-300 uppercase block">Jenjang / Tier</span>
                        <span className="font-bold text-amber-300">{currentTier.name}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-ivory-300 uppercase block">Status Portofolio</span>
                        <span className="font-bold text-white">Terverifikasi</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Character Profile Archetype (if Quiz Completed) */}
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-amber-300 font-semibold flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5" />
                      <span>{characterProfile?.title || 'Profil Karakter Belum Ditetapkan'}</span>
                    </span>
                    <span className="text-[10px] text-ivory-300">{quizCompleted ? 'Terverifikasi' : 'Tahap Kuis'}</span>
                  </div>
                  <p className="text-[11px] text-ivory-200 line-clamp-2">
                    {characterProfile?.tagline ||
                      'Ikuti Onboarding Quiz 4-Dimensi untuk menetapkan arketipe karakter kontribusimu.'}
                  </p>
                </div>

                {/* Machine Readable Zone (MRZ) - Authentic Passport Vibe */}
                <div className="font-mono text-[9px] sm:text-[10px] tracking-wider leading-relaxed text-amber-100/70 border-t border-[#3D352F] pt-3 break-all select-all">
                  P&lt;IDN{currentUser?.name?.toUpperCase().replace(/\s+/g, '&lt;') || 'KSATRIA&lt;MUDA'}&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
                  <br />
                  {passportNumber}&lt;0IDN0108269M2608304&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;06
                </div>
              </div>

              {/* RIGHT PAGE: VISA ENTRY STAMPS & WAX SEALS (6 cols) */}
              <div className="lg:col-span-6 bg-[#FAF7F0] rounded-2xl border-4 border-ivory-300 shadow-xl p-6 sm:p-8 space-y-6">
                <div className="border-b border-ivory-300 pb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Stamp className="w-4 h-4 text-terracotta-700" />
                    <h4 className="text-sm font-bold uppercase tracking-wider text-nusantara-charcoal">
                      Stempel Visa Penjelajahan Nusantara
                    </h4>
                  </div>
                  <span className="text-xs text-nusantara-charcoalMuted">Halaman 2 dari 4</span>
                </div>

                {/* Stamps Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {stamps.map((s) => (
                    <div
                      key={s.id}
                      className={`p-3 rounded-xl border-2 flex flex-col items-center text-center justify-between min-h-[110px] transition-all relative overflow-hidden ${
                        s.visited
                          ? 'border-terracotta-600/70 bg-terracotta-50/60 rotate-[-1deg] shadow-xs'
                          : 'border-dashed border-ivory-300 opacity-40 bg-white/40'
                      }`}
                    >
                      <div className="w-full text-center">
                        <span className="text-[9px] font-mono tracking-widest font-bold uppercase text-terracotta-700 block">
                          MAHREEN VISITOR
                        </span>
                        <span className="text-xs font-extrabold text-nusantara-charcoal mt-1 block">
                          {s.name}
                        </span>
                      </div>

                      <div className="my-1.5">
                        {s.visited ? (
                          <div className="w-8 h-8 rounded-full border border-terracotta-600/60 flex items-center justify-center text-terracotta-700">
                            <Stamp className="w-4 h-4" />
                          </div>
                        ) : (
                          <span className="text-[10px] font-semibold text-nusantara-charcoalMuted">Terkunci</span>
                        )}
                      </div>

                      <div className="text-[9px] font-mono text-terracotta-800">
                        {s.visited ? s.code : 'Belum Dijelajahi'}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Badges Wax Seals Section */}
                <div className="space-y-3 pt-2">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-terracotta-700 flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>Lencana Segel Kehormatan Terbuka ({unlockedBadgeIds.length})</span>
                  </h5>

                  <div className="flex flex-wrap gap-2.5">
                    {badgesData.map((b) => {
                      const isUnlocked = unlockedBadgeIds.includes(b.id);
                      return (
                        <div
                          key={b.id}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                            isUnlocked
                              ? 'bg-amber-100/90 border-amber-300 text-amber-900 shadow-xs'
                              : 'bg-ivory-100/50 border-ivory-200 text-nusantara-charcoalMuted opacity-50'
                          }`}
                          title={b.description}
                        >
                          <span>{isUnlocked ? '🏅' : '🔒'}</span>
                          <span>{b.name}</span>
                          <span className="text-[10px] text-terracotta-700">{b.tier}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SERTIFIKAT RESMI KELAYAKAN KONTRIBUSI */}
        {activeTab === 'sertifikat' && (
          <div className="space-y-6">
            {/* INSTRUCTION BANNER (HIDDEN ON PRINT) */}
            <div className="print:hidden p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Printer className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  Gunakan tombol <strong>Cetak / Simpan PDF</strong> untuk mengekspor piagam beresolusi tinggi ke format A4 Landscape.
                </span>
              </div>
              <Button size="xs" variant="primary" onClick={handlePrint}>
                Cetak Sekarang
              </Button>
            </div>

            {/* OFFICIAL CERTIFICATE FRAME (PRINTABLE A4 LANDSCAPE OPTIMIZED) */}
            <div
              ref={certRef}
              className="w-full bg-[#FCFAF6] text-[#211D1B] rounded-2xl border-[10px] border-[#913E2A] p-8 sm:p-14 shadow-2xl relative overflow-hidden print:p-10 print:m-0 print:border-[8px] print:shadow-none print:w-full print:h-screen"
            >
              <div className="print:hidden">
                <BorderBeam size={360} duration={12} colorFrom="#B45309" colorTo="#E64A27" borderWidth={3} />
              </div>
              {/* Inner Double Filigree Gold Border */}
              <div className="border-2 border-[#B45309] p-6 sm:p-10 rounded-xl relative space-y-8">
                {/* Corner Batik Accents */}
                <div className="absolute top-2 left-2 text-[#913E2A]/30 text-xs font-serif select-none">
                  ❖ ━━━━━━━━
                </div>
                <div className="absolute top-2 right-2 text-[#913E2A]/30 text-xs font-serif select-none">
                  ━━━━━━━━ ❖
                </div>
                <div className="absolute bottom-2 left-2 text-[#913E2A]/30 text-xs font-serif select-none">
                  ❖ ━━━━━━━━
                </div>
                <div className="absolute bottom-2 right-2 text-[#913E2A]/30 text-xs font-serif select-none">
                  ━━━━━━━━ ❖
                </div>

                {/* Certificate Header */}
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#913E2A]">
                    <span>EKOSISTEM DIGITAL MAHREEN INDONESIA</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-extrabold font-serif tracking-tight text-[#211D1B] uppercase">
                    Piagam Penghargaan Kontribusi
                  </h2>
                  <p className="text-xs sm:text-sm font-serif italic text-nusantara-charcoalMuted">
                    Nomor Registrasi: {certSerial}
                  </p>
                </div>

                {/* Recipient Presentation */}
                <div className="text-center space-y-4 py-2">
                  <p className="text-xs sm:text-sm uppercase tracking-widest text-[#793120] font-medium">
                    Dengan bangga diberikan kepada pemuda pelopor:
                  </p>
                  <div className="inline-block border-b-2 border-[#913E2A] pb-1 px-8">
                    <h3 className="text-3xl sm:text-5xl font-extrabold font-display text-[#913E2A] tracking-tight">
                      {currentUser?.name || 'Ksatria Muda Nusantara'}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-nusantara-charcoal max-w-2xl mx-auto leading-relaxed font-serif">
                    Atas dedikasi, inisiatif karya, dan kontribusi nyata dalam menghubungkan talenta muda, UMKM lokal, dan komunitas Nusantara melalui platform <strong>MAHREEN OS — Berkarya untuk Indonesia</strong>.
                  </p>
                </div>

                {/* Contribution Metrics Badges Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2 text-center">
                  <div className="p-3 rounded-lg bg-ivory-100/90 border border-ivory-300">
                    <span className="text-[10px] uppercase font-bold text-nusantara-charcoalMuted block">Status Portofolio</span>
                    <span className="text-lg font-bold text-[#913E2A] font-display">Tervalidasi</span>
                  </div>
                  <div className="p-3 rounded-lg bg-ivory-100/90 border border-ivory-300">
                    <span className="text-[10px] uppercase font-bold text-nusantara-charcoalMuted block">Predikat Jenjang</span>
                    <span className="text-lg font-bold text-[#B45309] font-display">{currentTier.name}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-ivory-100/90 border border-ivory-300">
                    <span className="text-[10px] uppercase font-bold text-nusantara-charcoalMuted block">Profil Karakter</span>
                    <span className="text-sm font-bold text-[#235347] font-display truncate block mt-0.5">
                      {characterProfile?.title || 'Ksatria Pemuda'}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-ivory-100/90 border border-ivory-300">
                    <span className="text-[10px] uppercase font-bold text-nusantara-charcoalMuted block">Provinsi Terpilih</span>
                    <span className="text-sm font-bold text-nusantara-charcoal font-display truncate block mt-0.5">
                      {currentUser?.province || 'D.I. Yogyakarta'}
                    </span>
                  </div>
                </div>

                {/* Footer Signatures & Official Stamp */}
                <div className="pt-6 border-t border-ivory-300 flex flex-col sm:flex-row items-center justify-between gap-6">
                  {/* Left: Kurator Ekosistem */}
                  <div className="text-center sm:text-left space-y-1">
                    <div className="font-serif italic text-base text-nusantara-charcoal font-bold">
                      Raden Mas Pradipta
                    </div>
                    <div className="w-36 h-0.5 bg-nusantara-charcoalMuted/40 mx-auto sm:mx-0" />
                    <span className="text-[10px] uppercase tracking-wider text-nusantara-charcoalMuted block">
                      Dewan Kurator Mahreen OS
                    </span>
                  </div>

                  {/* Center: Wax Seal & QR Code */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-[#913E2A] text-white flex flex-col items-center justify-center shadow-lg border-2 border-amber-300 text-center leading-none">
                      <span className="text-[8px] uppercase tracking-widest font-bold">CAP</span>
                      <span className="text-[11px] font-bold font-serif">RESMI</span>
                      <span className="text-[7px]">2026</span>
                    </div>

                    <div className="p-1.5 bg-white rounded border border-ivory-300 flex items-center justify-center">
                      <QrCode className="w-11 h-11 text-nusantara-charcoal" />
                    </div>
                  </div>

                  {/* Right: Inisiator Gerakan */}
                  <div className="text-center sm:text-right space-y-1">
                    <div className="font-serif italic text-base text-nusantara-charcoal font-bold">
                      Dian Sastrowardoyo
                    </div>
                    <div className="w-36 h-0.5 bg-nusantara-charcoalMuted/40 mx-auto sm:ml-auto" />
                    <span className="text-[10px] uppercase tracking-wider text-nusantara-charcoalMuted block">
                      Inisiator Kolaborasi Nusantara
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PasporPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-6xl mx-auto px-4 py-16 text-center text-xs text-zinc-500">
          Memuat Paspor &amp; Sertifikat...
        </div>
      }
    >
      <PasporContent />
    </Suspense>
  );
}

