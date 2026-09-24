'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  Search,
  Filter,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Users,
  Sparkles,
  MapPin,
  Tag,
  Share2,
  Video,
  Award,
  Zap,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import CardSpotlight from '@/components/aceternity/CardSpotlight';
import { StaggerContainer, StaggerItem, FadeInView } from '@/components/motion/MotionView';
import eventsData from '@/data/events.json';
import { useMahreenStore } from '@/store/useMahreenStore';
import MotionPillFilter from '@/components/motion/MotionPillFilter';

export default function NewsroomPage() {
  const { events, speakers } = eventsData;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Semua'); // 'Semua' | 'Terbaru' | 'PAID' | 'FREE' | 'WORKSHOP' | 'MASTERCLASS' | 'SEMINAR' | 'WEBINAR'
  const [selectedEventModal, setSelectedEventModal] = useState(null);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const { showToast, addActivityLog } = useMahreenStore();

  const filterTabs = [
    { id: 'Semua', label: 'Semua Event' },
    { id: 'Terbaru', label: 'Terbaru' },
    { id: 'PAID', label: 'PAID (Berbayar)' },
    { id: 'FREE', label: 'FREE (Gratis)' },
    { id: 'WORKSHOP', label: 'Workshop' },
    { id: 'MASTERCLASS', label: 'Masterclass' },
    { id: 'SEMINAR', label: 'Seminar' },
    { id: 'WEBINAR', label: 'Webinar' },
  ];

  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      const matchSearch =
        searchQuery === '' ||
        ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ev.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ev.speaker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ev.category.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchSearch) return false;

      if (selectedFilter === 'Semua') return true;
      if (selectedFilter === 'Terbaru') return true; // Already ordered chronologically
      if (selectedFilter === 'PAID') return ev.pricingType === 'PAID';
      if (selectedFilter === 'FREE') return ev.pricingType === 'FREE';
      return ev.category.toUpperCase() === selectedFilter.toUpperCase();
    });
  }, [events, searchQuery, selectedFilter]);

  const handleRegisterEvent = (event) => {
    if (registeredEvents.includes(event.id)) {
      showToast('Kamu sudah terdaftar di event ini!', 'info');
      return;
    }

    setRegisteredEvents((prev) => [...prev, event.id]);
    setRegisterSuccess(true);
    addActivityLog(
      'Mendaftar Event Mahreen',
      `Berhasil mendaftar ${event.category}: ${event.title}`,
      0,
      'event'
    );
    showToast(`Pendaftaran ${event.title} Berhasil!`, 'success');

    setTimeout(() => {
      setRegisterSuccess(false);
      setSelectedEventModal(null);
    }, 1800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 min-h-screen">
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-200">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-terracotta-50 text-terracotta-800 text-xs font-semibold border border-terracotta-200 shadow-xs">
            <Calendar className="w-3.5 h-3.5 text-terracotta-700" />
            <span>Mahreen Newsroom &amp; Events</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-zinc-900 tracking-tight">
            Daftar Event &amp; <br />
            <span className="text-terracotta-700">Masterclass Mahreen.</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
            Tingkatkan keahlian digital, desain, AI, dan strategi bisnis melalui workshop intensif, seminar inspiratif, dan masterclass bersertifikat langsung dari praktisi industri terbaik.
          </p>
        </div>

        {/* Quick Summary Badges */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div className="p-3 rounded-2xl bg-white border border-black text-center min-w-[80px]">
            <div className="text-lg sm:text-xl font-bold font-display text-black">{events.length}</div>
            <div className="text-[10px] font-semibold text-black uppercase tracking-wider">Event Aktif</div>
          </div>
          <div className="p-3 rounded-2xl bg-white border border-black text-center min-w-[80px]">
            <div className="text-lg sm:text-xl font-bold font-display text-black">4</div>
            <div className="text-[10px] font-semibold text-black uppercase tracking-wider">Keynote</div>
          </div>
          <div className="p-3 rounded-2xl bg-white border border-black text-center min-w-[80px]">
            <div className="text-lg sm:text-xl font-bold font-display text-black">100%</div>
            <div className="text-[10px] font-semibold text-black uppercase tracking-wider">Sertifikat</div>
          </div>
        </div>
      </div>

      {/* 2. SEARCH & FILTER SECTION (Cari event, Semua, Terbaru, dsb) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Cari event..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-300 bg-white text-xs sm:text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-terracotta-500 shadow-2xs"
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500">
            <span>Ditemukan: <strong className="text-zinc-900">{filteredEvents.length}</strong> event</span>
          </div>
        </div>

        {/* Filter Badges with Motion.dev sliding pill */}
        <MotionPillFilter
          items={filterTabs}
          activeId={selectedFilter}
          onChange={setSelectedFilter}
          layoutId="newsroomFilterPill"
        />
      </div>

      {/* 3. EVENT CARDS GRID (DAFTAR EVENT MAHREEN) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold font-display text-zinc-900">
            Daftar Event Mahreen
          </h2>
          <span className="text-xs text-zinc-500">
            Kalender Batch Akhir 2026
          </span>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="p-12 text-center bg-zinc-50 rounded-3xl border border-dashed border-zinc-300 space-y-3">
            <Calendar className="w-10 h-10 text-zinc-400 mx-auto" />
            <h3 className="text-base font-bold text-zinc-800">Tidak ada event yang sesuai</h3>
            <p className="text-xs text-zinc-500">Coba ubah kata kunci pencarian atau reset filter di atas.</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setSelectedFilter('Semua');
              }}
            >
              Reset Filter
            </Button>
          </div>
        ) : (
          <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((ev) => {
              const isPaid = ev.pricingType === 'PAID';
              const isRegistered = registeredEvents.includes(ev.id);

              return (
                <StaggerItem key={ev.id} className="h-full">
                  <CardSpotlight
                    spotlightColor="rgba(100, 59, 23, 0.14)"
                    borderColor="rgba(100, 59, 23, 0.45)"
                    className="flex flex-col justify-between h-full overflow-hidden bg-white border border-zinc-200 hover:border-terracotta-500 shadow-2xs hover:shadow-xs transition-all group rounded-2xl"
                  >
                    <div>
                      {/* Image Thumbnail with Overlay Badges */}
                      <div className="relative h-48 w-full overflow-hidden bg-zinc-100">
                        <img
                          src={ev.coverImage}
                          alt={ev.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        {/* Top Status Badges */}
                        <div className="absolute top-3 left-3 flex items-center gap-1.5">
                          <span
                            className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider shadow-xs ${
                              isPaid
                                ? 'bg-terracotta-100 text-terracotta-900 border border-terracotta-200'
                                : 'bg-terracotta-700 text-white'
                            }`}
                          >
                            {ev.pricingType}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-white/90 text-zinc-900 backdrop-blur-xs">
                            {ev.category}
                          </span>
                        </div>

                        {/* Date overlay at bottom of image */}
                        <div className="absolute bottom-3 left-3 text-white text-xs font-medium flex items-center gap-2">
                          <span className="bg-black/50 px-2 py-0.5 rounded-md backdrop-blur-xs">
                            {ev.dateDisplay}
                          </span>
                          <span className="bg-black/50 px-2 py-0.5 rounded-md backdrop-blur-xs flex items-center gap-1">
                            <Clock className="w-3 h-3 text-terracotta-200" />
                            {ev.time}
                          </span>
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-5 space-y-3">
                        <div className="text-[11px] font-bold text-terracotta-700 uppercase tracking-wider flex items-center gap-1.5">
                          <span>{ev.category}</span>
                          <span>•</span>
                          <span>{ev.dateDisplay}</span>
                        </div>

                        <h3 className="text-base sm:text-lg font-bold font-display text-zinc-900 group-hover:text-terracotta-800 transition-colors leading-snug line-clamp-2">
                          {ev.title}
                        </h3>

                        <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">
                          {ev.summary}
                        </p>

                        {/* Speaker Strip */}
                        <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center gap-2.5">
                          <img
                            src={ev.speaker.avatar}
                            alt={ev.speaker.name}
                            className="w-8 h-8 rounded-full object-cover border border-zinc-200"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-bold text-zinc-900 truncate">{ev.speaker.name}</div>
                            <div className="text-[10px] text-zinc-500 truncate">{ev.speaker.role}</div>
                          </div>
                        </div>

                        {/* Meta Info */}
                        <div className="pt-1 flex items-center justify-between text-xs text-zinc-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                            <span className="truncate max-w-[140px]">{ev.location}</span>
                          </span>
                          <span className="font-bold text-zinc-900">
                            {ev.price}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-5 pt-0 mt-2 border-t border-zinc-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => setSelectedEventModal(ev)}
                        className="text-xs font-bold text-terracotta-700 hover:text-terracotta-900 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>Detail Event</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <Button
                        variant={isRegistered ? 'secondary' : isPaid ? 'primary' : 'outline'}
                        size="sm"
                        onClick={() => handleRegisterEvent(ev)}
                        className="cursor-pointer text-xs"
                      >
                        {isRegistered ? 'Terdaftar' : isPaid ? 'Daftar Berbayar' : 'Daftar Gratis'}
                      </Button>
                    </div>
                  </CardSpotlight>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        )}
      </div>

      {/* 4. PEMBICARA UTAMA (KEYNOTE SPEAKERS) */}
      <section className="pt-6 border-t border-zinc-200 space-y-6">
        <div className="space-y-1 text-center sm:text-left">
          <Badge variant="terracotta" size="sm">
            Praktisi &amp; Pemimpin Industri
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-zinc-900">
            Pembicara Utama
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 max-w-xl">
            Belajar langsung dari para pendiri startup, konsultan AI, pakar branding, dan peneliti kelas dunia.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {speakers.map((spk) => (
            <div
              key={spk.id}
              className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-2xs hover:shadow-md hover:border-terracotta-500 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-zinc-200 group-hover:border-terracotta-300 transition-colors">
                  <img
                    src={spk.avatar}
                    alt={spk.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div>
                  <h3 className="text-base font-bold text-zinc-900 group-hover:text-terracotta-800 transition-colors">{spk.name}</h3>
                  <div className="text-xs font-semibold text-terracotta-700">{spk.role}</div>
                  <div className="text-[11px] text-zinc-400 font-medium mt-0.5">{spk.specialty}</div>
                </div>

                <p className="text-xs text-zinc-500 line-clamp-3 leading-relaxed">
                  {spk.bio}
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
                <div className="text-[10px] text-zinc-400">
                  <span>Topik: </span>
                  <strong className="text-zinc-700">{spk.events[0]}</strong>
                </div>
                <Link
                  href="/mentorship"
                  className="text-xs font-bold text-terracotta-700 hover:text-terracotta-900 group-hover:translate-x-1 transition-all inline-flex items-center gap-1"
                >
                  <span>Sesi 1-on-1 →</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. MODAL DETAIL EVENT */}
      <AnimatePresence>
        {selectedEventModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 max-h-[90vh] flex flex-col"
            >
              {/* Modal Header Cover */}
              <div className="relative h-44 w-full bg-zinc-900">
                <img
                  src={selectedEventModal.coverImage}
                  alt={selectedEventModal.title}
                  className="w-full h-full object-cover opacity-80"
                />
                <button
                  onClick={() => setSelectedEventModal(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
                >
                  ✕
                </button>
                <div className="absolute bottom-3 left-4 flex gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider ${
                      selectedEventModal.pricingType === 'PAID'
                        ? 'bg-terracotta-100 text-terracotta-900 border border-terracotta-200'
                        : 'bg-terracotta-700 text-white'
                    }`}
                  >
                    {selectedEventModal.pricingType}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-white text-zinc-900">
                    {selectedEventModal.category}
                  </span>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-4">
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-terracotta-700">
                    {selectedEventModal.dateDisplay} • {selectedEventModal.time}
                  </div>
                  <h3 className="text-xl font-bold font-display text-zinc-900">
                    {selectedEventModal.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  {selectedEventModal.description}
                </p>

                {/* Speaker Info */}
                <div className="p-3 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-center gap-3">
                  <img
                    src={selectedEventModal.speaker.avatar}
                    alt={selectedEventModal.speaker.name}
                    className="w-12 h-12 rounded-full object-cover border border-zinc-200"
                  />
                  <div>
                    <div className="text-xs text-zinc-400 uppercase font-bold tracking-wider">Pembicara Utama</div>
                    <div className="text-sm font-bold text-zinc-900">{selectedEventModal.speaker.name}</div>
                    <div className="text-xs text-zinc-500">{selectedEventModal.speaker.role}</div>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-100">
                    <div className="text-zinc-400 text-[11px]">Format / Lokasi:</div>
                    <div className="font-semibold text-zinc-800 mt-0.5">{selectedEventModal.location}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-100">
                    <div className="text-zinc-400 text-[11px]">Investasi:</div>
                    <div className="font-bold text-terracotta-700 text-sm mt-0.5">{selectedEventModal.price}</div>
                  </div>
                </div>

                {registerSuccess && (
                  <div className="p-3 rounded-xl bg-terracotta-50 border border-terracotta-200 text-terracotta-800 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-terracotta-700 shrink-0" />
                    <span>Pendaftaran berhasil! Akses webinar telah dikirim ke akunmu.</span>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-zinc-100 bg-zinc-50 flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedEventModal(null)}
                >
                  Tutup
                </Button>

                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handleRegisterEvent(selectedEventModal)}
                  disabled={registeredEvents.includes(selectedEventModal.id)}
                  className="cursor-pointer"
                >
                  {registeredEvents.includes(selectedEventModal.id)
                    ? 'Sudah Terdaftar'
                    : selectedEventModal.pricingType === 'PAID'
                    ? `Daftar Sekarang (${selectedEventModal.price})`
                    : 'Daftar Gratis'}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
