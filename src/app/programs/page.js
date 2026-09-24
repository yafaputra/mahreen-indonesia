'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  Search,
  Filter,
  Bookmark,
  BookmarkCheck,
  MapPin,
  Users,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Clock,
  Compass,
} from 'lucide-react';
import {
  parseISO,
  differenceInDays,
  isBefore,
  isAfter,
} from 'date-fns';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import EmptyState from '@/components/ui/EmptyState';
import programsData from '@/data/programs.json';
import { useMahreenStore } from '@/store/useMahreenStore';
import Spotlight from '@/components/aceternity/Spotlight';
import BackgroundGrid from '@/components/aceternity/BackgroundGrid';
import Sparkles from '@/components/aceternity/Sparkles';
import CardSpotlight from '@/components/aceternity/CardSpotlight';
import MotionPillFilter from '@/components/motion/MotionPillFilter';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { StaggerContainer, StaggerItem, FadeInView } from '@/components/motion/MotionView';

// Reference date anchored around current October 2026 context
const CURRENT_DATE = new Date(2026, 8, 29); // 29 September 2026

function calculateProgramStatus(program) {
  const deadline = parseISO(program.registrationDeadline);
  const start = parseISO(program.startDate);
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
      variant: 'terracotta',
      urgent: true,
    };
  }

  if (isBefore(CURRENT_DATE, parseISO(program.startDate)) && daysToDeadline > 7) {
    return { label: 'Pendaftaran Dibuka', variant: 'terracotta' };
  }

  return { label: 'Pendaftaran Aktif', variant: 'terracotta' };
}

export default function ProgramsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPillar, setSelectedPillar] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Store
  const bookmarkedProgramIds = useMahreenStore((state) => state.bookmarkedProgramIds);
  const toggleBookmark = useMahreenStore((state) => state.toggleBookmark);

  // Pillar tabs
  const pillarTabs = [
    { id: 'all', label: 'Semua Pilar' },
    { id: 'bisnis', label: 'Bisnis & UMKM' },
    { id: 'teknologi', label: 'Teknologi' },
    { id: 'kreativitas', label: 'Kreativitas' },
    { id: 'talenta', label: 'Talenta' },
    { id: 'komunitas', label: 'Komunitas' },
    { id: 'sosial', label: 'Sosial' },
  ];

  // Filtered Programs
  const filteredPrograms = useMemo(() => {
    return programsData.filter((prog) => {
      const matchPillar = selectedPillar === 'all' || prog.pillarId === selectedPillar;
      const matchSearch =
        searchQuery === '' ||
        prog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prog.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prog.location.toLowerCase().includes(searchQuery.toLowerCase());

      const status = calculateProgramStatus(prog);
      const matchStatus =
        selectedStatus === 'all' ||
        (selectedStatus === 'urgent' && status.urgent) ||
        (selectedStatus === 'active' && !status.urgent) ||
        (selectedStatus === 'bookmarked' && bookmarkedProgramIds.includes(prog.id));

      return matchPillar && matchSearch && matchStatus;
    });
  }, [selectedPillar, searchQuery, selectedStatus, bookmarkedProgramIds]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 min-h-screen">
      {/* 1. SECTION HEADER (CLEAN WHITE / AIRY AESTHETIC) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-200">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-terracotta-50 text-terracotta-800 text-xs font-semibold border border-terracotta-200 shadow-xs">
            <Layers className="w-3.5 h-3.5 text-terracotta-700" />
            <span>Katalog Program &amp; Gerakan Sinergi</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-zinc-900 tracking-tight">
            Program Inkubasi &amp; <br />
            <span className="text-terracotta-700">Kolaborasi Pemuda.</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
            Temukan inkubasi UMKM, riset teknologi terapan, fellowship publik, dan ekspedisi sosial. Daftarkan dirimu dan raih peluang terbaik untuk Indonesia.
          </p>
        </div>

        {/* Aggregate Stats Badges & Calendar Action */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div className="p-3 rounded-2xl bg-white border border-black text-center min-w-[76px]">
            <div className="text-lg sm:text-xl font-bold font-display text-black">6</div>
            <div className="text-[10px] font-semibold text-black uppercase tracking-wider">Pilar</div>
          </div>
          <div className="p-3 rounded-2xl bg-white border border-black text-center min-w-[76px]">
            <div className="text-lg sm:text-xl font-bold font-display text-black">{programsData.length}+</div>
            <div className="text-[10px] font-semibold text-black uppercase tracking-wider">Program</div>
          </div>
          <div className="p-3 rounded-2xl bg-white border border-black text-center min-w-[76px]">
            <div className="text-lg sm:text-xl font-bold font-display text-black">100%</div>
            <div className="text-[10px] font-semibold text-black uppercase tracking-wider">Bebas Biaya</div>
          </div>
        </div>
      </div>



      {/* 3. FILTER & SEARCH CONTROLS */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-nusantara-charcoalMuted pointer-events-none" />
            <input
              type="text"
              placeholder="Cari nama program, topik, atau lokasi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-ivory-300 bg-white text-xs sm:text-sm text-nusantara-charcoal focus:outline-none focus:ring-2 focus:ring-terracotta-500 shadow-xs"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl border border-ivory-300 bg-white text-xs sm:text-sm text-nusantara-charcoal font-medium focus:outline-none focus:ring-2 focus:ring-terracotta-500 shadow-xs"
            >
              <option value="all">Semua Status</option>
              <option value="urgent">Segera Ditutup (&le; 3 Hari)</option>
              <option value="active">Pendaftaran Buka</option>
              <option value="bookmarked">Telah Ditandai ({bookmarkedProgramIds.length})</option>
            </select>
          </div>
        </div>

        {/* Pillar Category Tabs with Motion.dev sliding spring pill */}
        <div className="overflow-x-auto pb-2 scrollbar-none">
          <MotionPillFilter
            items={pillarTabs}
            activeId={selectedPillar}
            onChange={setSelectedPillar}
            layoutId="programPillarPill"
          />
        </div>
      </div>

      {/* 4. PROGRAM DIRECTORY CARDS GRID */}
      {filteredPrograms.length === 0 ? (
        <EmptyState
          title="Tidak ada program yang sesuai"
          description="Coba ubah kata kunci pencarian atau ganti filter pilar di atas."
          actionLabel="Reset Filter"
          onAction={() => {
            setSearchQuery('');
            setSelectedPillar('all');
            setSelectedStatus('all');
          }}
        />
      ) : (
        <StaggerContainer
          staggerDelay={0.07}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {filteredPrograms.map((prog) => {
            const status = calculateProgramStatus(prog);
            const isBookmarked = bookmarkedProgramIds.includes(prog.id);

            // Uniform signature Coklat (Terracotta) spotlight saat di-hover
            const pSpot = {
              spot: 'rgba(100, 59, 23, 0.14)',
              border: 'rgba(100, 59, 23, 0.45)',
            };

            return (
              <StaggerItem key={prog.id} className="h-full">
                <CardSpotlight
                  spotlightColor={pSpot.spot}
                  borderColor={pSpot.border}
                  className="flex flex-col justify-between h-full overflow-hidden bg-white border border-zinc-200 hover:border-terracotta-500 hover:shadow-card transition-all group rounded-2xl"
                >
                  <div>
                    {/* Image Cover */}
                    <div className="relative h-48 w-full overflow-hidden bg-zinc-100">
                      <img
                        src={prog.coverImage}
                        alt={prog.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <Badge variant={status.variant} size="xs">
                          {status.label}
                        </Badge>
                      </div>

                      <button
                        onClick={() => toggleBookmark(prog.id)}
                        className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-xs transition-colors shadow-xs cursor-pointer ${
                          isBookmarked
                            ? 'bg-terracotta-700 text-white'
                            : 'bg-black/40 text-white hover:bg-black/60'
                        }`}
                        title={isBookmarked ? 'Hapus dari daftar minat' : 'Simpan program'}
                      >
                        {isBookmarked ? (
                          <BookmarkCheck className="w-4 h-4" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Body Content */}
                    <div className="p-6 space-y-3">
                      <span className="text-[10px] font-bold text-terracotta-700 tracking-wider uppercase">
                        {prog.pillarName}
                      </span>

                      <h3 className="text-lg font-bold font-display text-zinc-900 leading-snug group-hover:text-terracotta-800 transition-colors">
                        {prog.title}
                      </h3>

                      <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                        {prog.summary}
                      </p>

                      <div className="pt-2 space-y-1.5 text-xs text-zinc-700">
                        <div className="flex items-center gap-1.5 text-zinc-500">
                          <MapPin className="w-3.5 h-3.5 text-terracotta-600 shrink-0" />
                          <span className="truncate">{prog.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-zinc-500">
                          <Users className="w-3.5 h-3.5 text-terracotta-600 shrink-0" />
                          <span>Kapasitas: {prog.capacity} Pemuda</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="p-6 pt-0 mt-2 border-t border-zinc-100 flex items-center justify-between">
                    <div className="text-[11px] text-zinc-500">
                      <span>Batas: </span>
                      <span className="font-semibold text-terracotta-700">{prog.registrationDeadline}</span>
                    </div>

                    <Link href={`/programs/${prog.id}`}>
                      <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                        Rincian Modul
                      </Button>
                    </Link>
                  </div>
                </CardSpotlight>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      )}
    </div>
  );
}
