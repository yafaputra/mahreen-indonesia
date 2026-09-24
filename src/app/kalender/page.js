'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CalendarDays,
  Clock as TimelineIcon,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  BookmarkCheck,
  AlertTriangle,
  MapPin,
  Users,
  Trophy,
  ArrowRight,
  CheckCircle2,
  X,
  Calendar as CalendarIcon,
  Sparkles,
  Flame,
  Info,
} from 'lucide-react';
import {
  format,
  parseISO,
  differenceInDays,
  isBefore,
  isAfter,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
  addMonths,
  subMonths,
} from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import programsData from '@/data/programs.json';
import { useMahreenStore } from '@/store/useMahreenStore';

// Reference anchor date
const CURRENT_DATE = new Date(2026, 8, 29); // 29 September 2026

// Short names for clean, uncluttered calendar cell badges
const PROGRAM_SHORT_NAMES = {
  'prog-1': 'Karya UMKM',
  'prog-2': 'Hilirisasi Tekno',
  'prog-3': 'Festival Sinema',
  'prog-4': 'Ekspedisi Pesisir',
  'prog-5': 'Inkubasi Hijau',
  'prog-6': 'Lab Wastra',
  'prog-7': 'GovTech Youth',
  'prog-8': 'Akselerator Pemimpin',
};

// Theme colors per pillar
const PILLAR_COLORS = {
  bisnis: { dot: 'bg-amber-500', text: 'text-amber-800', badge: 'amber' },
  teknologi: { dot: 'bg-emerald-500', text: 'text-emerald-800', badge: 'emerald' },
  kreativitas: { dot: 'bg-purple-500', text: 'text-purple-800', badge: 'purple' },
  talenta: { dot: 'bg-orange-500', text: 'text-orange-800', badge: 'terracotta' },
  komunitas: { dot: 'bg-blue-500', text: 'text-blue-800', badge: 'indigo' },
  sosial: { dot: 'bg-rose-500', text: 'text-rose-800', badge: 'rose' },
};

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
      variant: 'rose',
      urgent: true,
    };
  }

  if (isBefore(CURRENT_DATE, parseISO(program.startDate)) && daysToDeadline > 7) {
    return { label: 'Pendaftaran Dibuka', variant: 'emerald' };
  }

  return { label: 'Pendaftaran Aktif', variant: 'terracotta' };
}

export default function KalenderPage() {
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' | 'timeline'
  const [selectedPillar, setSelectedPillar] = useState('all');
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);

  // Month state anchored in October 2026
  const [calendarMonth, setCalendarMonth] = useState(new Date(2026, 9, 1));

  // Default selected date: 2 Oktober 2026 (first major deadline of October)
  const [selectedDay, setSelectedDay] = useState(new Date(2026, 9, 2));

  // Store
  const bookmarkedProgramIds = useMahreenStore((state) => state.bookmarkedProgramIds);
  const toggleBookmark = useMahreenStore((state) => state.toggleBookmark);
  const getScheduleConflicts = useMahreenStore((state) => state.getScheduleConflicts);

  const scheduleConflicts = useMemo(() => getScheduleConflicts(), [bookmarkedProgramIds]);

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
      const matchBookmarked = !onlyBookmarked || bookmarkedProgramIds.includes(prog.id);
      return matchPillar && matchBookmarked;
    });
  }, [selectedPillar, onlyBookmarked, bookmarkedProgramIds]);

  // True calendar interval with startOfWeek and endOfWeek (Sunday start)
  const monthStart = startOfMonth(calendarMonth);
  const monthEnd = endOfMonth(calendarMonth);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 }); // Sunday
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 }); // Saturday
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  // Analyze events per date into milestones vs ongoing
  const getDateBreakdown = (date) => {
    const deadlines = [];
    const starts = [];
    const ends = [];
    const ongoing = [];

    filteredPrograms.forEach((prog) => {
      const start = parseISO(prog.startDate);
      const end = parseISO(prog.endDate);
      const deadline = parseISO(prog.registrationDeadline);

      if (isSameDay(date, deadline)) {
        deadlines.push(prog);
      } else if (isSameDay(date, start)) {
        starts.push(prog);
      } else if (isSameDay(date, end)) {
        ends.push(prog);
      } else if (isAfter(date, start) && isBefore(date, end)) {
        ongoing.push(prog);
      }
    });

    return {
      deadlines,
      starts,
      ends,
      ongoing,
      totalCount: deadlines.length + starts.length + ends.length + ongoing.length,
      hasMilestone: deadlines.length > 0 || starts.length > 0 || ends.length > 0,
    };
  };

  // Inspector programs on selected day
  const selectedDayBreakdown = useMemo(() => {
    if (!selectedDay) return null;
    return getDateBreakdown(selectedDay);
  }, [selectedDay, filteredPrograms]);

  // Upcoming deadlines in the currently viewed month
  const upcomingDeadlinesInMonth = useMemo(() => {
    return programsData
      .filter((p) => {
        const d = parseISO(p.registrationDeadline);
        return isSameMonth(d, calendarMonth);
      })
      .sort((a, b) => parseISO(a.registrationDeadline) - parseISO(b.registrationDeadline));
  }, [calendarMonth]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 bg-white min-h-screen">
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-200">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-terracotta-800 text-xs font-semibold border border-orange-200 shadow-xs">
            <CalendarDays className="w-3.5 h-3.5 text-terracotta-700" />
            <span>Pusat Waktu &amp; Agenda Sinergi Nusantara</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-display text-zinc-900 tracking-tight">
            Kalender Agenda Gerakan
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
            Pantau linimasa kegiatan, batas pendaftaran penting, dan deteksi potensi jadwal bertabrakan secara terstruktur.
          </p>
        </div>

        {/* View Switcher using shadcn + Motion Tabs */}
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/programs">
            <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Katalog Program
            </Button>
          </Link>

          <Tabs value={viewMode} onValueChange={setViewMode} className="w-auto">
            <TabsList className="bg-zinc-100 p-1 rounded-xl border border-zinc-200">
              <TabsTrigger
                value="calendar"
                icon={<CalendarDays className="w-3.5 h-3.5" />}
                className="px-3.5 py-1.5"
              >
                Kalender Bulanan
              </TabsTrigger>
              <TabsTrigger
                value="timeline"
                icon={<TimelineIcon className="w-3.5 h-3.5" />}
                className="px-3.5 py-1.5"
              >
                Timeline Linimasa
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* 2. SCHEDULE CONFLICT WARNING BANNER */}
      {scheduleConflicts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-2xl bg-amber-50 border-2 border-amber-300 shadow-xs space-y-3"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-200 text-amber-900 shrink-0">
              <AlertTriangle className="w-5 h-5 text-amber-800" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-amber-950">
                Peringatan: Potensi Jadwal Program Bertabrakan!
              </h4>
              <p className="text-xs text-amber-900/90 leading-relaxed">
                Kamu menandai agenda dengan rentang waktu yang bersamaan. Pastikan alokasi waktu dan komitmen belajarmu tidak bentrok:
              </p>
            </div>
          </div>
          <div className="pl-11 space-y-2">
            {scheduleConflicts.map((c, i) => (
              <div
                key={i}
                className="text-xs bg-white/95 p-2.5 rounded-xl border border-amber-200 text-amber-950 font-medium flex items-center gap-2"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                <span>
                  Agenda <strong className="text-terracotta-800 underline">{c.programA.title}</strong> dan{' '}
                  <strong className="text-terracotta-800 underline">{c.programB.title}</strong> berjalan bersamaan.
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* 3. FILTER PILLARS & BOOKMARKS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Pillar Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {pillarTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedPillar(tab.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedPillar === tab.id
                  ? 'bg-terracotta-600 text-white shadow-xs'
                  : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border border-zinc-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Bookmark Toggle */}
        <button
          onClick={() => setOnlyBookmarked(!onlyBookmarked)}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all shrink-0 cursor-pointer ${
            onlyBookmarked
              ? 'bg-amber-100 border-amber-300 text-amber-900'
              : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50'
          }`}
        >
          <BookmarkCheck className="w-3.5 h-3.5 text-amber-600" />
          <span>Hanya Ditandai ({bookmarkedProgramIds.length})</span>
        </button>
      </div>

      {/* 4. CALENDAR VIEW (RESPONSIVE SPLIT-SCREEN LAYOUT) */}
      {viewMode === 'calendar' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: CALENDAR GRID (8 of 12 columns) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Month Navigation & Legend Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-zinc-200 shadow-xs">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCalendarMonth(subMonths(calendarMonth, 1))}
                  className="p-2 rounded-xl text-zinc-700 hover:bg-zinc-100 transition-colors border border-zinc-200 cursor-pointer"
                  title="Bulan sebelumnya"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div>
                  <h3 className="text-base sm:text-lg font-bold font-display text-zinc-900 capitalize">
                    {format(calendarMonth, 'MMMM yyyy', { locale: localeId })}
                  </h3>
                  <span className="text-[11px] text-zinc-500">
                    {filteredPrograms.length} Agenda Terjadwal
                  </span>
                </div>

                <button
                  onClick={() => setCalendarMonth(addMonths(calendarMonth, 1))}
                  className="p-2 rounded-xl text-zinc-700 hover:bg-zinc-100 transition-colors border border-zinc-200 cursor-pointer"
                  title="Bulan berikutnya"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setCalendarMonth(new Date(2026, 9, 1));
                    setSelectedDay(new Date(2026, 9, 2));
                  }}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border border-zinc-200 cursor-pointer ml-1"
                >
                  Oktober 2026
                </button>
              </div>

              {/* Clean Legend */}
              <div className="flex flex-wrap items-center gap-3 text-[11px] text-zinc-600 font-medium">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                  <span>Batas Pendaftaran</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span>Hari Mulai</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
                  <span>Selesai</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                  <span>Berjalan</span>
                </div>
              </div>
            </div>

            {/* Calendar Grid Container */}
            <div className="rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-xs">
              {/* Days of week header (Sun = Min to Sat = Sab) */}
              <div className="grid grid-cols-7 border-b border-zinc-200 bg-zinc-50 text-center py-2.5 text-xs font-bold text-zinc-700 tracking-wider">
                <span className="text-rose-600">Min</span>
                <span>Sen</span>
                <span>Sel</span>
                <span>Rab</span>
                <span>Kam</span>
                <span>Jum</span>
                <span className="text-zinc-500">Sab</span>
              </div>

              {/* 35-Day Grid */}
              <div className="grid grid-cols-7 divide-x divide-y divide-zinc-100 text-xs">
                {calendarDays.map((day, idx) => {
                  const dayData = getDateBreakdown(day);
                  const isCurrentMonth = isSameMonth(day, calendarMonth);
                  const isSelected = selectedDay && isSameDay(day, selectedDay);
                  const isToday = isSameDay(day, CURRENT_DATE);

                  return (
                    <motion.div
                      key={idx}
                      onClick={() => setSelectedDay(day)}
                      whileHover={{ scale: 0.995 }}
                      transition={{ duration: 0.1 }}
                      className={`min-h-[92px] sm:min-h-[105px] p-2 flex flex-col justify-between cursor-pointer transition-colors relative ${
                        !isCurrentMonth
                          ? 'bg-zinc-50/50 opacity-40 hover:opacity-80'
                          : isSelected
                          ? 'bg-orange-50/70 ring-2 ring-inset ring-terracotta-500 z-10'
                          : isToday
                          ? 'bg-amber-50/40 hover:bg-amber-50/70'
                          : 'bg-white hover:bg-zinc-50/80'
                      }`}
                    >
                      {/* Top Bar: Date Number + Event Count */}
                      <div className="flex items-center justify-between">
                        <span
                          className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold transition-transform ${
                            isToday
                              ? 'bg-terracotta-600 text-white ring-2 ring-terracotta-200'
                              : isSelected
                              ? 'bg-zinc-900 text-white'
                              : isCurrentMonth
                              ? 'text-zinc-800'
                              : 'text-zinc-400'
                          }`}
                        >
                          {format(day, 'd')}
                        </span>

                        {dayData.totalCount > 0 && isCurrentMonth && (
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                              dayData.deadlines.length > 0
                                ? 'bg-rose-100 text-rose-800'
                                : dayData.starts.length > 0
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-zinc-100 text-zinc-600'
                            }`}
                          >
                            {dayData.totalCount}
                          </span>
                        )}
                      </div>

                      {/* Middle & Bottom: Clean Milestone Pills or Ongoing Dots */}
                      <div className="space-y-1 mt-1.5 min-h-[36px]">
                        {/* 1. DEADLINE PILL (Highest Priority) */}
                        {dayData.deadlines.slice(0, 1).map((prog) => (
                          <div
                            key={`d-${prog.id}`}
                            className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-800 border border-rose-200/90 truncate flex items-center gap-1 shadow-2xs"
                            title={`Batas Pendaftaran: ${prog.title}`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 animate-pulse" />
                            <span className="truncate">
                              Deadline: {PROGRAM_SHORT_NAMES[prog.id] || prog.title}
                            </span>
                          </div>
                        ))}

                        {/* 2. START PILL (Hari Mulai) */}
                        {dayData.starts.slice(0, 1).map((prog) => (
                          <div
                            key={`s-${prog.id}`}
                            className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/90 truncate flex items-center gap-1 shadow-2xs"
                            title={`Hari Mulai: ${prog.title}`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                            <span className="truncate">
                              Mulai: {PROGRAM_SHORT_NAMES[prog.id] || prog.title}
                            </span>
                          </div>
                        ))}

                        {/* 3. END PILL (Hari Selesai) */}
                        {dayData.ends.slice(0, 1).map((prog) => (
                          <div
                            key={`e-${prog.id}`}
                            className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-800 border border-purple-200/90 truncate flex items-center gap-1 shadow-2xs"
                            title={`Penutupan: ${prog.title}`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                            <span className="truncate">
                              Selesai: {PROGRAM_SHORT_NAMES[prog.id] || prog.title}
                            </span>
                          </div>
                        ))}

                        {/* 4. ONGOING PROGRAMS (Rendered as sleek color dots + count rather than cluttered 50-char blocks) */}
                        {!dayData.hasMilestone && dayData.ongoing.length > 0 && isCurrentMonth && (
                          <div className="pt-0.5">
                            <div className="text-[10px] text-zinc-600 font-semibold px-1 py-0.5 rounded bg-zinc-100 border border-zinc-200/80 truncate flex items-center justify-between">
                              <span className="truncate">
                                {PROGRAM_SHORT_NAMES[dayData.ongoing[0].id] || dayData.ongoing[0].title}
                              </span>
                              {dayData.ongoing.length > 1 && (
                                <span className="text-[9px] text-zinc-400 font-bold shrink-0 ml-1">
                                  +{dayData.ongoing.length - 1}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1 mt-1 pl-1">
                              {dayData.ongoing.map((p) => {
                                const pCol = PILLAR_COLORS[p.pillarId]?.dot || 'bg-zinc-400';
                                return (
                                  <span
                                    key={p.id}
                                    className={`w-1.5 h-1.5 rounded-full ${pCol}`}
                                    title={p.title}
                                  />
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* If day has milestone AND also has other ongoing programs, show subtle dot row */}
                        {dayData.hasMilestone && dayData.ongoing.length > 0 && isCurrentMonth && (
                          <div className="flex items-center gap-1 pt-0.5 pl-0.5">
                            <span className="text-[9px] text-zinc-400 font-medium">Aktif:</span>
                            {dayData.ongoing.slice(0, 3).map((p) => {
                              const pCol = PILLAR_COLORS[p.pillarId]?.dot || 'bg-zinc-400';
                              return (
                                <span
                                  key={p.id}
                                  className={`w-1.5 h-1.5 rounded-full ${pCol}`}
                                  title={p.title}
                                />
                              );
                            })}
                            {dayData.ongoing.length > 3 && (
                              <span className="text-[9px] text-zinc-400">+{dayData.ongoing.length - 3}</span>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT: AGENDA INSPECTOR & UPCOMING DEADLINES (4 of 12 columns) */}
          <div className="lg:col-span-4 space-y-5 sticky top-24">
            {/* Inspector Card */}
            <div className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-terracotta-700" />
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 leading-tight">
                      Agenda Tanggal Terpilih
                    </h4>
                    <span className="text-[11px] text-zinc-500">
                      {selectedDay
                        ? format(selectedDay, 'EEEE, d MMMM yyyy', { locale: localeId })
                        : 'Pilih salah satu tanggal'}
                    </span>
                  </div>
                </div>

                {selectedDayBreakdown && selectedDayBreakdown.totalCount > 0 && (
                  <Badge variant="terracotta" size="xs">
                    {selectedDayBreakdown.totalCount} Agenda
                  </Badge>
                )}
              </div>

              {/* Program list on selected date */}
              <AnimatePresence mode="wait">
                {selectedDayBreakdown && selectedDayBreakdown.totalCount > 0 ? (
                  <motion.div
                    key={selectedDay.toISOString()}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3 max-h-[380px] overflow-y-auto pr-1"
                  >
                    {/* Deadlines first */}
                    {selectedDayBreakdown.deadlines.map((prog) => {
                      const isBookmarked = bookmarkedProgramIds.includes(prog.id);
                      return (
                        <div
                          key={`insp-d-${prog.id}`}
                          className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/50 space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-600 text-white flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                              Batas Pendaftaran Hari Ini!
                            </span>
                            <button
                              onClick={() => toggleBookmark(prog.id)}
                              className="text-zinc-400 hover:text-terracotta-700 p-1 cursor-pointer"
                              title={isBookmarked ? 'Hapus bookmark' : 'Simpan minat'}
                            >
                              {isBookmarked ? (
                                <BookmarkCheck className="w-4 h-4 text-terracotta-700" />
                              ) : (
                                <Bookmark className="w-4 h-4" />
                              )}
                            </button>
                          </div>

                          <h5 className="text-xs font-bold text-zinc-900 leading-snug">
                            {prog.title}
                          </h5>

                          <p className="text-[11px] text-zinc-600 line-clamp-2 leading-relaxed">
                            {prog.summary}
                          </p>

                          <div className="pt-1.5 flex items-center justify-between text-[11px]">
                            <span className="text-terracotta-700 font-semibold flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              <span className="truncate max-w-[140px]">{prog.location}</span>
                            </span>
                            <Link
                              href="/programs"
                              className="text-terracotta-700 font-bold hover:underline inline-flex items-center gap-0.5"
                            >
                              <span>Daftar</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      );
                    })}

                    {/* Start Days */}
                    {selectedDayBreakdown.starts.map((prog) => (
                      <div
                        key={`insp-s-${prog.id}`}
                        className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-2"
                      >
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white inline-block">
                          🚀 Hari Pertama Pelaksanaan
                        </span>
                        <h5 className="text-xs font-bold text-zinc-900 leading-snug">
                          {prog.title}
                        </h5>
                        <p className="text-[11px] text-zinc-600 line-clamp-2 leading-relaxed">
                          {prog.summary}
                        </p>
                        <div className="pt-1.5 flex items-center justify-between text-[11px]">
                          <span className="text-zinc-500">
                            Periode: {prog.startDate} s/d {prog.endDate}
                          </span>
                          <Link href="/programs" className="font-bold text-emerald-800 hover:underline">
                            Detail →
                          </Link>
                        </div>
                      </div>
                    ))}

                    {/* End Days */}
                    {selectedDayBreakdown.ends.map((prog) => (
                      <div
                        key={`insp-e-${prog.id}`}
                        className="p-3.5 rounded-xl border border-purple-200 bg-purple-50/50 space-y-2"
                      >
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-600 text-white inline-block">
                          🏁 Penutupan / Expo Hasil Karya
                        </span>
                        <h5 className="text-xs font-bold text-zinc-900 leading-snug">
                          {prog.title}
                        </h5>
                        <div className="pt-1 text-[11px]">
                          <Link href="/paspor" className="font-bold text-terracotta-800 hover:underline">
                            Lihat Piagam Resmi →
                          </Link>
                        </div>
                      </div>
                    ))}

                    {/* Ongoing programs */}
                    {selectedDayBreakdown.ongoing.map((prog) => (
                      <div
                        key={`insp-o-${prog.id}`}
                        className="p-3 rounded-xl border border-zinc-200 bg-zinc-50/70 space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-semibold text-zinc-600 bg-zinc-200/80 px-2 py-0.5 rounded-md">
                            Sesi Berjalan ({prog.pillarName})
                          </span>
                          <span className="text-[10px] font-semibold text-terracotta-700">Sertifikat Resmi</span>
                        </div>
                        <h5 className="text-xs font-bold text-zinc-900 truncate">{prog.title}</h5>
                        <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-0.5">
                          <span>{prog.location}</span>
                          <Link href="/programs" className="text-terracotta-700 font-semibold hover:underline">
                            Buka →
                          </Link>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                ) : (
                  <div className="py-6 text-center space-y-2">
                    <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center mx-auto text-zinc-400">
                      <CalendarIcon className="w-5 h-5" />
                    </div>
                    <p className="text-xs text-zinc-500 font-medium">
                      Tidak ada agenda khusus pada tanggal ini.
                    </p>
                    <p className="text-[11px] text-zinc-400">
                      Klik tanggal lain yang memiliki badge untuk melihat agenda.
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Upcoming Deadlines Quick Jump Card */}
            <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-rose-600" />
                <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                  Batas Pendaftaran Terdekat Bulan Ini
                </h4>
              </div>

              <div className="space-y-2">
                {upcomingDeadlinesInMonth.slice(0, 4).map((prog) => {
                  const deadlineDate = parseISO(prog.registrationDeadline);
                  const isSelected = selectedDay && isSameDay(selectedDay, deadlineDate);

                  return (
                    <button
                      key={prog.id}
                      onClick={() => setSelectedDay(deadlineDate)}
                      className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all flex items-center justify-between gap-2 cursor-pointer ${
                        isSelected
                          ? 'bg-rose-50 border-rose-300 text-rose-950 font-bold'
                          : 'bg-white border-zinc-200/90 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="text-[11px] font-bold truncate">{prog.title}</div>
                        <div className="text-[10px] text-zinc-500">
                          Batas: {format(deadlineDate, 'd MMMM yyyy', { locale: localeId })}
                        </div>
                      </div>
                      <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                        {format(deadlineDate, 'd MMM')}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. TIMELINE CHRONOLOGICAL VIEW */}
      {viewMode === 'timeline' && (
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="relative pl-6 sm:pl-8 border-l-2 border-terracotta-200 space-y-8">
            {filteredPrograms.map((prog) => {
              const status = calculateProgramStatus(prog);
              const isBookmarked = bookmarkedProgramIds.includes(prog.id);
              const partnersList = (prog.partners || prog.collaborators || []).join(', ');

              return (
                <div key={prog.id} className="relative group">
                  {/* Timeline dot marker */}
                  <div
                    className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 border-white transition-all ${
                      status.urgent
                        ? 'bg-rose-600 ring-4 ring-rose-100'
                        : isBookmarked
                        ? 'bg-amber-500 ring-4 ring-amber-100'
                        : 'bg-terracotta-600 ring-4 ring-terracotta-100'
                    }`}
                  />

                  <Card className="p-6 space-y-4 hover:shadow-card transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="space-y-2 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant={status.variant} size="xs">
                            {status.label}
                          </Badge>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-terracotta-700">
                            {prog.pillarName}
                          </span>
                          <span className="text-xs text-zinc-300">•</span>
                          <span className="text-xs text-zinc-700 font-semibold">
                            {prog.startDate} s/d {prog.endDate}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold font-display text-zinc-900">
                          {prog.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-zinc-600 line-clamp-2 leading-relaxed">
                          {prog.summary}
                        </p>
                      </div>

                      <div className="shrink-0 flex items-center gap-2">
                        <button
                          onClick={() => toggleBookmark(prog.id)}
                          className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                            isBookmarked
                              ? 'bg-amber-100 border-amber-300 text-amber-900'
                              : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50'
                          }`}
                        >
                          {isBookmarked ? (
                            <BookmarkCheck className="w-4 h-4 text-amber-700" />
                          ) : (
                            <Bookmark className="w-4 h-4" />
                          )}
                          <span>{isBookmarked ? 'Ditandai' : 'Tandai'}</span>
                        </button>

                        <Link href="/programs">
                          <Button size="sm" variant="primary">
                            Rincian
                          </Button>
                        </Link>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-zinc-100 text-xs text-zinc-700">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-terracotta-600 shrink-0" />
                        <span className="truncate">{prog.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{prog.capacity} Kuota</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-terracotta-600 shrink-0" />
                        <span className="font-semibold text-zinc-900">Sertifikat Resmi</span>
                      </div>
                      <div className="text-right text-zinc-500 truncate">
                        Mitra: {partnersList}
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
