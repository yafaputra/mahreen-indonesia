'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Milestone,
  CheckCircle2,
  Clock,
  ArrowRight,
  Compass,
  Layers,
  ChevronRight,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';

export default function RoadmapPage() {
  const phases = [
    {
      phaseNumber: 'Fase 1',
      title: 'Fondasi Ekosistem & Peta Talenta',
      status: 'Selesai & Aktif (Live)',
      statusVariant: 'emerald',
      timeline: 'Q1 - Q2 2026',
      progressPercent: 100,
      description:
        'Pembangunan platform dasar MAHREEN OS, meliputi landing page ekosistem, onboarding quiz dengan pemetaan 4 dimensi karakter, kalender program, graph interaktif 6 pilar, galeri Karya Wall, dan dashboard kendali personal.',
      deliverables: [
        'Arsitektur Front-End Modular Next.js & Tailwind CSS',
        'Onboarding Quiz Wizard & Generator Profil Karakter',
        'Kalender Program dengan Deteksi Konflik Jadwal Otomatis',
        'Graph Interaktif Mahreen Map berbasis React Flow',
        'Karya Wall dengan Reaksi Majemuk & Diskusi Bersarang',
        'Sistem Lencana Kehormatan & Portofolio Digital',
      ],
      isCurrent: false,
      href: '/programs',
      actionLabel: 'Jelajahi Program',
    },
    {
      phaseNumber: 'Fase 2',
      title: 'UMKM Connect & Sinergi Bangsa',
      status: 'Sedang Dibangun (In Progress)',
      statusVariant: 'terracotta',
      timeline: 'Q3 2026',
      progressPercent: 65,
      description:
        'Membuka ruang kolaborasi langsung antara 64 juta UMKM Indonesia dengan ribuan talenta muda terverifikasi. Memfasilitasi penerbitan brief tantangan bisnis nyata daerah dan pendampingan inkubasi.',
      deliverables: [
        'Katalog Kebutuhan Inovasi UMKM Daerah (Marketplace Brief)',
        'Sistem Kontrak Gotong-Royong Standar Proyek Pemuda',
        'Dashboard Pantau Kenaikan Omzet & Dampak Digitalisasi',
        'Integrasi Kurator Produk Wastra & Olahan Pangan Lokal',
      ],
      isCurrent: true,
      href: '/umkm-connect',
      actionLabel: 'Buka UMKM Connect',
    },
    {
      phaseNumber: 'Fase 3',
      title: 'Mentorship Hub & Leaderboard Nasional',
      status: 'Tahap Rancang (Planned)',
      statusVariant: 'amber',
      timeline: 'Q4 2026',
      progressPercent: 20,
      description:
        'Menyediakan bimbingan privat 1-on-1 dari 150+ praktisi industri dan tokoh nasional. Memperkenalkan sistem leaderboard meritokratis lintas provinsi untuk mengapresiasi talenta paling berdampak.',
      deliverables: [
        'Pencocokan Otomatis Mentor-Mentee Berdasarkan Profil Quiz',
        'Kalender Sesi Mentoring Privat 1-on-1 & Review Karya',
        'Leaderboard Kontribusi Pemuda 34 Provinsi Terintegrasi',
        'Penyaluran Hibah Prototipe & Beasiswa Karya Nusantara',
      ],
      isCurrent: false,
      href: '/mentorship',
      actionLabel: 'Buka Mentorship Hub',
    },
    {
      phaseNumber: 'Fase 4',
      title: 'Skala Nasional & Festival Karya Nusantara',
      status: 'Visi Jangka Panjang (Vision)',
      statusVariant: 'indigo',
      timeline: '2027',
      progressPercent: 5,
      description:
        'Memperluas jangkauan ke seluruh pelosok tanah air. Menyelenggarakan festival karya tahunan di 5 pulau besar Indonesia dan menghubungkan karya pemuda dengan modal ventura dampak sosial global.',
      deliverables: [
        'Festival Karya Nusantara Luring di 5 Kota Besar Indonesia',
        'Penyatuan Data Portofolio Pemuda ke Jaringan Talenta Nasional',
        'Konsorsium Investor Hijau & Filantropi Pendidikan Indonesia',
        'Akreditasi Resmi Pelatihan Vokasi Mahreen oleh Lembaga Terkait',
      ],
      isCurrent: false,
      href: '/festival',
      actionLabel: 'Buka Festival Nusantara',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 min-h-screen">
      {/* 1. HEADER SECTION (CLEAN WHITE / AIRY AESTHETIC) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-200">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-terracotta-800 text-xs font-semibold border border-orange-200 shadow-xs">
            <Milestone className="w-3.5 h-3.5 text-terracotta-700" />
            <span>Peta Jalan Masa Depan</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-zinc-900 tracking-tight">
            Roadmap Ekosistem <br />
            <span className="text-terracotta-700">Mahreen OS.</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
            Peta perjalanan strategis dari fondasi platform digital hingga gerakan kolaboratif berdampak skala nasional untuk generasi emas Indonesia.
          </p>
        </div>

        {/* Right side: Stats */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div className="p-3 rounded-2xl bg-zinc-50 border border-zinc-200 text-center min-w-[80px]">
            <div className="text-lg sm:text-xl font-bold font-display text-zinc-900">4</div>
            <div className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Fase Evolusi</div>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-center min-w-[80px]">
            <div className="text-lg sm:text-xl font-bold font-display text-emerald-700">Fase 2</div>
            <div className="text-[10px] font-semibold text-emerald-800 uppercase tracking-wider">Status Aktif</div>
          </div>
          <div className="p-3 rounded-2xl bg-orange-50/60 border border-orange-200 text-center min-w-[80px]">
            <div className="text-lg sm:text-xl font-bold font-display text-terracotta-700">2026-27</div>
            <div className="text-[10px] font-semibold text-terracotta-800 uppercase tracking-wider">Horizon Waktu</div>
          </div>
        </div>
      </div>

      {/* 2. TIMELINE CARDS */}
      <div className="relative pl-6 sm:pl-10 border-l-2 border-terracotta-200 space-y-12">
        {phases.map((phase, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline Dot Indicator */}
            <div
              className={`absolute -left-[31px] sm:-left-[47px] top-6 w-5 h-5 rounded-full border-4 border-ivory-50 transition-transform group-hover:scale-125 ${
                phase.statusVariant === 'emerald'
                  ? 'bg-emerald-600'
                  : phase.statusVariant === 'terracotta'
                  ? 'bg-terracotta-600 ring-4 ring-terracotta-200 animate-pulse'
                  : 'bg-ivory-300'
              }`}
            />

            <Card className="p-6 sm:p-8 space-y-6">
              {/* Header Phase */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-ivory-200">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold font-display uppercase tracking-wider text-terracotta-700">
                      {phase.phaseNumber}
                    </span>
                    <span className="text-ivory-300">•</span>
                    <span className="text-xs font-semibold text-nusantara-charcoalMuted flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {phase.timeline}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-nusantara-charcoal">
                    {phase.title}
                  </h3>
                </div>

                <Badge variant={phase.statusVariant} size="sm">
                  {phase.status}
                </Badge>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-nusantara-charcoal">
                  <span>Tingkat Kesiapan Inisiatif</span>
                  <span>{phase.progressPercent}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-ivory-200 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-1000 ${
                      phase.statusVariant === 'emerald'
                        ? 'bg-emerald-600'
                        : phase.statusVariant === 'terracotta'
                        ? 'bg-terracotta-600'
                        : 'bg-amber-500'
                    }`}
                    style={{ width: `${phase.progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-nusantara-charcoalMuted leading-relaxed">
                {phase.description}
              </p>

              {/* Deliverables Checklist */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-nusantara-charcoal">
                  Target Capaian & Fitur Utama:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-nusantara-charcoal">
                  {phase.deliverables.map((item, dIdx) => (
                    <div
                      key={dIdx}
                      className="p-2.5 rounded-xl bg-ivory-100 border border-ivory-200/60 flex items-start gap-2"
                    >
                      {phase.statusVariant === 'emerald' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <Clock className="w-4 h-4 text-nusantara-charcoalMuted shrink-0 mt-0.5" />
                      )}
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button linking to feature */}
              {phase.href && (
                <div className="pt-2 flex justify-end">
                  <Link href={phase.href}>
                    <Button
                      variant={phase.isCurrent ? 'primary' : 'outline'}
                      size="sm"
                      rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                    >
                      {phase.actionLabel}
                    </Button>
                  </Link>
                </div>
              )}
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
