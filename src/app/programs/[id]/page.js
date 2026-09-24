'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Calendar,
  CalendarDays,
  MapPin,
  Users,
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
  Share2,
  Building2,
  Award,
  Layers,
  Clock,
  Target,
} from 'lucide-react';
import { parseISO, differenceInDays, isBefore, isAfter } from 'date-fns';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import programsData from '@/data/programs.json';
import { useMahreenStore } from '@/store/useMahreenStore';

const CURRENT_DATE = new Date(2026, 8, 29); // 29 September 2026

function calculateProgramStatus(program) {
  const deadline = parseISO(program.registrationDeadline);
  const end = parseISO(program.endDate);

  if (isAfter(CURRENT_DATE, end)) {
    return { label: 'Sudah Selesai', variant: 'neutral' };
  }
  if (isAfter(CURRENT_DATE, deadline)) {
    return { label: 'Pendaftaran Ditutup', variant: 'neutral' };
  }

  const daysToDeadline = differenceInDays(deadline, CURRENT_DATE);
  if (daysToDeadline <= 3 && daysToDeadline >= 0) {
    return {
      label: `Ditutup ${daysToDeadline === 0 ? 'Hari Ini' : `${daysToDeadline} Hari Lagi`}`,
      variant: 'rose',
      urgent: true,
    };
  }

  if (isBefore(CURRENT_DATE, parseISO(program.startDate)) && daysToDeadline > 7) {
    return { label: 'Pendaftaran Dibuka', variant: 'emerald' };
  }

  return { label: 'Pendaftaran Aktif', variant: 'terracotta' };
}

export default function ProgramDetailPage() {
  const params = useParams();
  const router = useRouter();
  const programId = params.id;

  const program = programsData.find((p) => p.id === programId) || programsData[0];

  const bookmarkedProgramIds = useMahreenStore((state) => state.bookmarkedProgramIds);
  const toggleBookmark = useMahreenStore((state) => state.toggleBookmark);
  const showToast = useMahreenStore((state) => state.showToast);

  const isBookmarked = bookmarkedProgramIds.includes(program.id);
  const status = calculateProgramStatus(program);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      showToast('Tautan program berhasil disalin ke papan klip!', 'info');
    }
  };

  return (
    <div className="min-h-screen py-10 sm:py-16 bg-batik-pattern">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* BREADCRUMB & BACK ACTION */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-xs font-bold text-terracotta-700 hover:text-terracotta-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Direktori Program</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-nusantara-charcoalMuted">
            <Link href="/" className="hover:text-nusantara-charcoal">Beranda</Link>
            <span>/</span>
            <Link href="/programs" className="hover:text-nusantara-charcoal">Program</Link>
            <span>/</span>
            <span className="font-semibold text-nusantara-charcoal truncate max-w-[200px]">{program.title}</span>
          </div>
        </div>

        {/* HERO CARD */}
        <div className="rounded-3xl border border-ivory-300 bg-white overflow-hidden shadow-card">
          <div className="relative h-64 sm:h-96 w-full overflow-hidden bg-ivory-200">
            <img
              src={program.coverImage}
              alt={program.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <Badge variant="terracotta">{program.pillarName}</Badge>
              <Badge variant={status.variant}>{status.label}</Badge>
              <Badge variant="gold">+{program.xpReward} XP</Badge>
            </div>

            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <span className="text-xs uppercase font-bold tracking-widest text-amber-300">
                Inisiatif Pilar {program.pillarName}
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-white leading-tight">
                {program.title}
              </h1>
              <p className="text-xs sm:text-sm text-ivory-200 line-clamp-2 max-w-3xl">
                {program.summary}
              </p>
            </div>
          </div>

          {/* KEY METRICS BAR */}
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-ivory-200 border-b border-ivory-200 bg-ivory-50/70 p-4 text-center">
            <div className="p-2">
              <span className="text-[10px] uppercase font-bold text-nusantara-charcoalMuted block">Tanggal Mulai</span>
              <span className="text-sm font-bold text-nusantara-charcoal">{program.startDate}</span>
            </div>
            <div className="p-2">
              <span className="text-[10px] uppercase font-bold text-nusantara-charcoalMuted block">Tanggal Selesai</span>
              <span className="text-sm font-bold text-nusantara-charcoal">{program.endDate}</span>
            </div>
            <div className="p-2">
              <span className="text-[10px] uppercase font-bold text-rose-700 block">Batas Pendaftaran</span>
              <span className="text-sm font-bold text-rose-700">{program.registrationDeadline}</span>
            </div>
            <div className="p-2">
              <span className="text-[10px] uppercase font-bold text-amber-700 block">Reward Kontribusi</span>
              <span className="text-sm font-bold text-amber-800 font-display">+{program.xpReward} XP</span>
            </div>
          </div>

          {/* CONTENT DETAILS */}
          <div className="p-6 sm:p-10 space-y-8">
            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold font-display text-nusantara-charcoal">
                Deskripsi & Latar Belakang Program
              </h3>
              <p className="text-sm text-nusantara-charcoal leading-relaxed">
                {program.description}
              </p>
            </div>

            {/* Target & Logistics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-ivory-100/70 border border-ivory-200 text-xs">
              <div className="space-y-1">
                <span className="font-bold text-nusantara-charcoal flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-terracotta-600 flex-shrink-0" />
                  <span>Lokasi Pelaksanaan:</span>
                </span>
                <span className="text-nusantara-charcoalMuted pl-5 block">{program.location}</span>
              </div>
              <div className="space-y-1">
                <span className="font-bold text-nusantara-charcoal flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-terracotta-600 flex-shrink-0" />
                  <span>Kapasitas Peserta:</span>
                </span>
                <span className="text-nusantara-charcoalMuted pl-5 block">{program.capacity} Talenta Pemuda</span>
              </div>
              <div className="space-y-1">
                <span className="font-bold text-nusantara-charcoal flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-terracotta-600 flex-shrink-0" />
                  <span>Target Peserta:</span>
                </span>
                <span className="text-nusantara-charcoalMuted pl-5 block">
                  Talenta Desain, Pengembang Web, Mahasiswa Vokasi, Pelaku UMKM Kriya &amp; Pangan Lokal.
                </span>
              </div>
              <div className="space-y-1">
                <span className="font-bold text-nusantara-charcoal flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-terracotta-600 flex-shrink-0" />
                  <span>Mitra Pendukung:</span>
                </span>
                <span className="text-nusantara-charcoalMuted pl-5 block">{(program.partners || program.collaborators || ['Kementerian & Mitra Pemuda']).join(', ')}</span>
              </div>
            </div>

            {/* Curriculum Modules */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold font-display text-nusantara-charcoal">
                Rencana Modul & Kurikulum Pembelajaran
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {program.curriculum?.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white border border-ivory-200 flex items-start gap-3 shadow-xs"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-nusantara-charcoal block">Modul 0{idx + 1}</span>
                      <span className="text-xs text-nusantara-charcoalMuted">{item}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ACTIONS FOOTER */}
            <div className="pt-6 border-t border-ivory-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => toggleBookmark(program.id)}
                  className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-colors ${
                    isBookmarked
                      ? 'bg-amber-100 border-amber-300 text-amber-900'
                      : 'bg-white border-ivory-300 text-nusantara-charcoal hover:bg-ivory-50'
                  }`}
                >
                  {isBookmarked ? (
                    <>
                      <BookmarkCheck className="w-4 h-4 text-amber-700" />
                      <span>Program Telah Ditandai</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-4 h-4" />
                      <span>Tandai ke Kalender (+20 XP)</span>
                    </>
                  )}
                </button>

                <Button
                  variant="outline"
                  size="md"
                  onClick={handleShare}
                  leftIcon={<Share2 className="w-4 h-4" />}
                >
                  Bagikan
                </Button>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Link href="/kalender" className="w-full sm:w-auto">
                  <Button variant="outline" size="md" className="w-full sm:w-auto">
                    Cek di Kalender
                  </Button>
                </Link>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    toggleBookmark(program.id);
                    showToast(`Pendaftaran minat untuk ${program.title} berhasil dicatat! (+20 XP)`, 'success');
                  }}
                  className="w-full sm:w-auto shadow-terracotta"
                >
                  Daftarkan Minat Saya (+20 XP)
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
