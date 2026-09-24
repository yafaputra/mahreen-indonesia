'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Briefcase,
  Clock,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Send,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { useMahreenStore } from '@/store/useMahreenStore';
import { StaggerContainer, StaggerItem } from '@/components/motion/MotionView';
import CardSpotlight from '@/components/aceternity/CardSpotlight';
import positionsData from '@/data/internship-positions.json';
import MotionPillFilter from '@/components/motion/MotionPillFilter';

const positionImages = {
  'web-developer': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
  'ui-ux-designer': 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=80',
  'graphic-designer': 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80',
  'videographer': 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80',
  'marketing-growth': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
  'business-development': 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80',
};

function InternshipContent() {
  const searchParams = useSearchParams();
  const programQuery = searchParams.get('program');
  const positionQuery = searchParams.get('position');

  const { showToast, addActivityLog } = useMahreenStore();

  // Search & Filter Tabs (matching Newsroom screenshot structure)
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Semua');

  // Application Modal state
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState('form'); // 'detail' | 'form'
  const [selectedRole, setSelectedRole] = useState(positionsData[0]?.id || 'web-developer');
  const [selectedWorkMode, setSelectedWorkMode] = useState('wfh');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [appId, setAppId] = useState('');

  const [applyForm, setApplyForm] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    university: '',
    major: '',
    domicileCity: '',
    cvLink: '',
    portfolioLink: '',
    linkedinLink: '',
    toolsMastery: '',
    motivation: '',
  });

  const filterTabs = [
    { id: 'Semua', label: 'Semua Posisi' },
    { id: 'wfh', label: 'Remote (WFH)' },
    { id: 'hybrid', label: 'Hybrid' },
    { id: 'wfo', label: 'On-site (WFO)' },
    { id: 'Tech & Engineering', label: 'Tech & Engineering' },
    { id: 'Product Design', label: 'Product Design' },
    { id: 'Visual Creative', label: 'Visual Creative' },
    { id: 'Media Production', label: 'Media Production' },
    { id: 'Marketing & Growth', label: 'Marketing & Growth' },
    { id: 'Partnership & Corporate', label: 'Partnership & Corporate' },
  ];

  // Auto-scroll or open modal if position query param is set
  useEffect(() => {
    if (positionQuery) {
      const targetPos = positionsData.find((p) => p.id === positionQuery || p.slug === positionQuery);
      if (targetPos) {
        setSelectedRole(targetPos.id);
        setSelectedWorkMode(targetPos.workModeType);
        setModalTab('form');
        setIsApplyModalOpen(true);
      }
    }
  }, [positionQuery]);

  // Filtered positions based on search and pill tab
  const filteredPositions = useMemo(() => {
    return positionsData.filter((pos) => {
      const matchSearch =
        searchQuery === '' ||
        pos.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pos.division.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pos.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pos.responsibilities.some((r) => r.toLowerCase().includes(searchQuery.toLowerCase())) ||
        pos.requirements.some((rq) => rq.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchSearch) return false;

      if (selectedFilter === 'Semua') return true;
      if (selectedFilter === 'wfh' || selectedFilter === 'hybrid' || selectedFilter === 'wfo') {
        return pos.workModeType === selectedFilter;
      }
      return pos.division.toLowerCase() === selectedFilter.toLowerCase();
    });
  }, [searchQuery, selectedFilter]);

  const activePositionObj = positionsData.find((p) => p.id === selectedRole) || positionsData[0];

  // Open modal with detail view
  const handleOpenDetailModal = (pos) => {
    setSelectedRole(pos.id);
    setSelectedWorkMode(pos.workModeType);
    setModalTab('detail');
    setIsApplyModalOpen(true);
  };

  // Open modal directly with application form
  const handleOpenApplyModal = (pos) => {
    setSelectedRole(pos.id);
    setSelectedWorkMode(pos.workModeType);
    setModalTab('form');
    setIsApplyModalOpen(true);
  };

  // Handle application submission
  const handleApplySubmit = (e) => {
    e.preventDefault();
    const generatedId = `MHRN-APP-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    setAppId(generatedId);
    setFormSubmitted(true);

    addActivityLog(
      'Mengajukan Lamaran Magang',
      `Lamaran posisi ${activePositionObj.title} mode ${selectedWorkMode.toUpperCase()} (ID: ${generatedId})`,
      0,
      'internship'
    );
    showToast(`Lamaran untuk ${activePositionObj.title} berhasil diajukan!`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 sm:space-y-12 min-h-screen bg-white">
      {/* 1. HEADER SECTION (MATCHING SCREENSHOT WITH ELEGANT TYPOGRAPHY & STATS) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-200">
        <div className="space-y-2.5 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-terracotta-800 text-xs font-semibold border border-terracotta-200 shadow-xs">
            <Briefcase className="w-3.5 h-3.5 text-terracotta-700" />
            <span>Mahreen Internship Hub • Batch 2</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-zinc-900 tracking-tight leading-tight">
            Daftar Lowongan &amp; <br />
            <span className="text-terracotta-700">Program Magang Mahreen.</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
            Tingkatkan keahlian profesional melalui pengalaman proyek nyata berstandar agensi Mahreen Indonesia. Terbuka untuk mahasiswa dan talenta muda di seluruh Indonesia dengan pilihan WFH, Hybrid, dan On-site Studio.
          </p>
        </div>

        {/* Quick Summary Badges (Matching Screenshot Exactly) */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="p-3 sm:px-4 rounded-2xl bg-white border border-black text-center min-w-[84px] shadow-2xs">
            <div className="text-xl sm:text-2xl font-bold font-display text-black">{positionsData.length}</div>
            <div className="text-[10px] font-bold text-black uppercase tracking-wider mt-0.5">Posisi Aktif</div>
          </div>
          <div className="p-3 sm:px-4 rounded-2xl bg-white border border-black text-center min-w-[84px] shadow-2xs">
            <div className="text-xl sm:text-2xl font-bold font-display text-black">3</div>
            <div className="text-[10px] font-bold text-black uppercase tracking-wider mt-0.5">Mode Kerja</div>
          </div>
          <div className="p-3 sm:px-4 rounded-2xl bg-white border border-black text-center min-w-[84px] shadow-2xs">
            <div className="text-xl sm:text-2xl font-bold font-display text-black">100%</div>
            <div className="text-[10px] font-bold text-black uppercase tracking-wider mt-0.5">Sertifikat</div>
          </div>
        </div>
      </div>

      {/* 2. SEARCH & FILTER SECTION (Cari posisi, Filter pills) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Cari lowongan posisi magang atau keahlian..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-zinc-300 bg-white text-xs sm:text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-terracotta-500 shadow-2xs"
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500">
            <span>Ditemukan: <strong className="text-zinc-900">{filteredPositions.length}</strong> posisi lowongan</span>
          </div>
        </div>

        {/* Filter Badges with Motion.dev sliding spring pill */}
        <MotionPillFilter
          items={filterTabs}
          activeId={selectedFilter}
          onChange={setSelectedFilter}
          layoutId="internshipFilterPill"
        />
      </div>

      {/* 3. POSITION CARDS GRID (DAFTAR POSISI MAGANG MAHREEN) */}
      <div id="posisi-magang" className="space-y-6 scroll-mt-24">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold font-display text-zinc-900">
            Daftar Posisi Magang Mahreen
          </h2>
          <span className="text-xs text-zinc-500">
            Kalender Batch 2: Okt 2026 – Jan 2027
          </span>
        </div>

        {filteredPositions.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-dashed border-zinc-300 space-y-3">
            <Briefcase className="w-10 h-10 text-zinc-400 mx-auto" />
            <h3 className="text-base font-bold text-zinc-800">Tidak ada posisi yang sesuai</h3>
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
            {filteredPositions.map((pos) => {
              const coverImg = positionImages[pos.id] || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80';

              return (
                <StaggerItem key={pos.id} className="h-full">
                  <CardSpotlight
                    spotlightColor="rgba(230, 74, 39, 0.14)"
                    borderColor="rgba(230, 74, 39, 0.35)"
                    className="flex flex-col justify-between h-full overflow-hidden bg-white border border-zinc-200/90 rounded-3xl shadow-2xs hover:shadow-xs transition-all group"
                  >
                    <div>
                      {/* Image Thumbnail with Overlay Badges (Exact Newsroom Style) */}
                      <div className="relative h-44 w-full overflow-hidden bg-white">
                        <img
                          src={coverImg}
                          alt={pos.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        {/* Top Status Badges */}
                        <div className="absolute top-3 left-3 flex items-center gap-1.5">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-terracotta-700 text-white shadow-xs">
                            {pos.workMode}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-zinc-900 shadow-2xs backdrop-blur-xs">
                            {pos.division}
                          </span>
                        </div>

                        {/* Slots & Duration overlay at bottom of image */}
                        <div className="absolute bottom-2.5 left-3 text-white text-xs font-medium flex items-center gap-2">
                          <span className="bg-black/60 px-2.5 py-0.5 rounded-full backdrop-blur-xs text-[11px]">
                            {pos.slots} Kuota
                          </span>
                          <span className="bg-black/60 px-2.5 py-0.5 rounded-full backdrop-blur-xs text-[11px] flex items-center gap-1">
                            <Clock className="w-3 h-3 text-terracotta-200" />
                            4 Bulan
                          </span>
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-5 space-y-3">
                        <div className="text-[10px] font-bold text-terracotta-700 uppercase tracking-wider flex items-center gap-1.5">
                          <span>{pos.division}</span>
                          <span>•</span>
                          <span>{pos.workMode}</span>
                        </div>

                        <h3 className="text-base sm:text-lg font-bold font-display text-zinc-900 group-hover:text-terracotta-800 transition-colors leading-snug line-clamp-1">
                          {pos.title}
                        </h3>

                        <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2 min-h-[34px]">
                          {pos.responsibilities[0]}
                        </p>

                        {/* Stipend Strip */}
                        <div className="p-2.5 rounded-xl bg-white border border-zinc-200/80 flex items-center justify-between text-xs">
                          <span className="font-semibold text-zinc-500 text-[11px]">Kompensasi:</span>
                          <span className="font-bold text-zinc-900 text-xs truncate max-w-[170px]">{pos.stipend}</span>
                        </div>

                        {/* Meta Info */}
                        <div className="pt-1 flex items-center justify-between text-xs text-zinc-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                            <span className="truncate max-w-[140px] text-zinc-600 font-medium">{pos.location}</span>
                          </span>
                          <span className="text-[11px] text-zinc-400">
                            {pos.appliedCount} pelamar
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-5 pt-0 mt-2 border-t border-zinc-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleOpenDetailModal(pos)}
                        className="text-xs font-bold text-terracotta-700 hover:text-terracotta-900 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>Detail Posisi</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleOpenApplyModal(pos)}
                        className="cursor-pointer text-xs px-4"
                      >
                        Lamar Posisi Ini
                      </Button>
                    </div>
                  </CardSpotlight>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        )}
      </div>



      {/* 6. MODAL INTERAKTIF: RINCIAN POSISI & FORMULIR LAMARAN */}
      <AnimatePresence>
        {isApplyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                <div className="space-y-0.5">
                  <div className="text-[11px] font-bold text-terracotta-700 uppercase tracking-wider">
                    Mahreen Internship Recruitment • Batch 2
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold font-display text-zinc-900">
                    {activePositionObj.title}
                  </h3>
                </div>
                <button
                  onClick={() => setIsApplyModalOpen(false)}
                  className="text-zinc-400 hover:text-zinc-600 text-lg p-1.5 rounded-xl hover:bg-zinc-50 cursor-pointer transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Two Tabs Navigation: Rincian Posisi vs Formulir */}
              {!formSubmitted && (
                <div className="flex items-center gap-2 border-b border-zinc-100 pb-2">
                  <button
                    type="button"
                    onClick={() => setModalTab('detail')}
                    className={`px-4 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ${
                      modalTab === 'detail'
                        ? 'bg-black text-white shadow-xs'
                        : 'bg-zinc-100 text-zinc-600 hover:text-black hover:bg-zinc-200/70'
                    }`}
                  >
                    📋 Rincian &amp; Kualifikasi
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalTab('form')}
                    className={`px-4 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ${
                      modalTab === 'form'
                        ? 'bg-black text-white shadow-xs'
                        : 'bg-zinc-100 text-zinc-600 hover:text-black hover:bg-zinc-200/70'
                    }`}
                  >
                    ✍️ Formulir Lamaran
                  </button>
                </div>
              )}

              {formSubmitted ? (
                <div className="p-6 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold font-display text-zinc-900">Lamaran Terkirim!</h4>
                  <p className="text-xs text-zinc-600 leading-relaxed max-w-md mx-auto">
                    ID Lamaran: <strong className="font-mono text-terracotta-700">{appId}</strong>. Tim Talent Acquisition Mahreen akan meninjau CV &amp; portofoliomu.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setFormSubmitted(false);
                      setIsApplyModalOpen(false);
                    }}
                  >
                    Tutup
                  </Button>
                </div>
              ) : modalTab === 'detail' ? (
                /* TAB 1: FULL JOB DESCRIPTION & REQUIREMENTS */
                <div className="space-y-6 text-xs text-zinc-700">
                  {/* Meta strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 rounded-2xl bg-white border border-zinc-200 text-center">
                    <div>
                      <div className="text-[10px] text-zinc-400 uppercase font-semibold">Mode Kerja</div>
                      <div className="font-bold text-zinc-900 text-xs mt-0.5">{activePositionObj.workMode}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-zinc-400 uppercase font-semibold">Durasi</div>
                      <div className="font-bold text-zinc-900 text-xs mt-0.5">4 Bulan</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-zinc-400 uppercase font-semibold">Kuota</div>
                      <div className="font-bold text-terracotta-700 text-xs mt-0.5">{activePositionObj.slots} Posisi</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-zinc-400 uppercase font-semibold">Kompensasi</div>
                      <div className="font-bold text-zinc-900 text-xs mt-0.5">Insentif Proyek</div>
                    </div>
                  </div>

                  {/* Responsibilities */}
                  <div className="space-y-2">
                    <div className="font-bold text-zinc-900 uppercase tracking-wider text-[11px]">
                      Tanggung Jawab Utama:
                    </div>
                    <ul className="space-y-2">
                      {activePositionObj.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Requirements */}
                  <div className="space-y-2 pt-2 border-t border-zinc-100">
                    <div className="font-bold text-zinc-900 uppercase tracking-wider text-[11px]">
                      Kualifikasi yang Dicari:
                    </div>
                    <ul className="space-y-2">
                      {activePositionObj.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-terracotta-600 shrink-0 mt-1.5" />
                          <span className="leading-relaxed">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-2 pt-2 border-t border-zinc-100">
                    <div className="font-bold text-zinc-900 uppercase tracking-wider text-[11px]">
                      Fasilitas &amp; Keuntungan:
                    </div>
                    <ul className="space-y-1.5">
                      {activePositionObj.benefits.map((ben, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>{ben}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-zinc-100 flex items-center justify-end gap-2.5">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setIsApplyModalOpen(false)}
                    >
                      Tutup
                    </Button>
                    <Button
                      type="button"
                      variant="primary"
                      size="sm"
                      rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                      onClick={() => setModalTab('form')}
                    >
                      Lanjut Mengisi Formulir
                    </Button>
                  </div>
                </div>
              ) : (
                /* TAB 2: APPLICATION FORM */
                <form onSubmit={handleApplySubmit} className="space-y-4 text-xs">
                  {/* Role and Mode preview */}
                  <div className="p-3.5 rounded-2xl bg-white border border-zinc-200 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-zinc-900">{activePositionObj.title}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                        {activePositionObj.slots} Posisi
                      </span>
                    </div>
                    <div className="text-[11px] text-zinc-500">
                      <strong>Lokasi:</strong> {activePositionObj.location} • <strong>Benefit:</strong> {activePositionObj.stipend}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-zinc-700 mb-1">Posisi Magang *</label>
                      <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-terracotta-500 bg-white font-medium"
                      >
                        {positionsData.map((p) => (
                          <option key={p.id} value={p.id}>{p.title}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-zinc-700 mb-1">Mode Kerja yang Dipilih *</label>
                      <select
                        value={selectedWorkMode}
                        onChange={(e) => setSelectedWorkMode(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-terracotta-500 bg-white font-medium"
                      >
                        <option value="wfh">Remote (WFH)</option>
                        <option value="hybrid">Hybrid (WFO/WFH)</option>
                        <option value="wfo">On-site Studio Cimahi (WFO)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-zinc-700 mb-1">Nama Lengkap *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Rian Anggara"
                      value={applyForm.fullName}
                      onChange={(e) => setApplyForm({ ...applyForm, fullName: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-zinc-700 mb-1">Email Aktif *</label>
                      <input
                        type="email"
                        required
                        placeholder="nama@email.com"
                        value={applyForm.email}
                        onChange={(e) => setApplyForm({ ...applyForm, email: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-zinc-700 mb-1">No. WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        placeholder="081234567890"
                        value={applyForm.whatsapp}
                        onChange={(e) => setApplyForm({ ...applyForm, whatsapp: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-zinc-700 mb-1">Asal Kampus / Sekolah *</label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: IT Harapan Bangsa / IPB"
                        value={applyForm.university}
                        onChange={(e) => setApplyForm({ ...applyForm, university: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-zinc-700 mb-1">Kota Domisili *</label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Bandung, Cimahi, Jakarta"
                        value={applyForm.domicileCity}
                        onChange={(e) => setApplyForm({ ...applyForm, domicileCity: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-zinc-700 mb-1">Tautan CV (Google Drive link) *</label>
                    <input
                      type="url"
                      required
                      placeholder="https://drive.google.com/..."
                      value={applyForm.cvLink}
                      onChange={(e) => setApplyForm({ ...applyForm, cvLink: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-zinc-700 mb-1">Tautan Portofolio / GitHub / Behance *</label>
                    <input
                      type="url"
                      required
                      placeholder="GitHub / Figma / Behance / Drive"
                      value={applyForm.portfolioLink}
                      onChange={(e) => setApplyForm({ ...applyForm, portfolioLink: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-zinc-700 mb-1">Motivasi &amp; Ekspektasi Magang *</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Ceritakan mengapa kamu ingin mengasah keahlian di posisi ini bersama Mahreen..."
                      value={applyForm.motivation}
                      onChange={(e) => setApplyForm({ ...applyForm, motivation: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-zinc-300 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2.5">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setIsApplyModalOpen(false)}
                    >
                      Batal
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      size="sm"
                      rightIcon={<Send className="w-3.5 h-3.5" />}
                    >
                      Kirim Lamaran
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function InternshipPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-zinc-500">Memuat Lowongan Magang &amp; Sertifikasi Mahreen...</div>}>
      <InternshipContent />
    </Suspense>
  );
}
