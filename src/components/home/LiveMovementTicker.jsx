'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';

const LIVE_EVENTS = [
  {
    id: 1,
    time: 'Baru saja',
    location: 'Dataran Tinggi Gayo, Aceh',
    text: 'Tim Rekayasa Pertanian pasang sensor kelembaban tanah bersama 15 petani kopi',
    tag: 'Teknologi Tepat Guna',
    link: '/programs',
  },
  {
    id: 2,
    time: '2 menit lalu',
    location: 'Sabu Raijua, NTT',
    text: 'Kelompok Tenun Mama Maria raih 24 pesanan wastra baru lewat program pendampingan UMKM',
    tag: 'UMKM Mandiri',
    link: '/programs',
  },
  {
    id: 3,
    time: '4 menit lalu',
    location: 'Ambon, Maluku',
    text: 'Sekar Ayu unggah karya riset pelestarian terumbu karang di Portofolio Karya',
    tag: 'Karya Bangsa',
    link: '/karya',
  },
  {
    id: 4,
    time: '6 menit lalu',
    location: 'Bandung & Cimahi, Jawa Barat',
    text: 'Pendaftaran Magang Proyek Nyata Batch 2 resmi dibuka untuk 6 divisi kerja',
    tag: 'Magang Batch 2',
    link: '/internship',
  },
  {
    id: 5,
    time: '8 menit lalu',
    location: 'Halmahera, Maluku Utara',
    text: 'Relawan Gerakan Buka Ruang Baca Pesisir selesaikan kemitraan CSR bersama mitra kampus',
    tag: 'Kemitraan Sosial',
    link: '/partnership',
  },
];

export default function LiveMovementTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % LIVE_EVENTS.length);
    }, 4200);

    return () => clearInterval(interval);
  }, [isPaused]);

  const current = LIVE_EVENTS[currentIndex];

  return (
    <div
      className="max-w-5xl mx-auto px-4 sm:px-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="p-3 sm:p-3.5 rounded-2xl bg-white border border-zinc-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 overflow-hidden">
        {/* Left Live Badge */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terracotta-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-terracotta-600" />
          </span>
          <span className="text-[11px] uppercase font-bold tracking-wider text-terracotta-800 bg-terracotta-50 px-2 py-0.5 rounded-md border border-terracotta-200">
            Denyut Aksi Terkini
          </span>
          <span className="text-[11px] text-zinc-400 hidden lg:inline">• 34 Provinsi Terkoneksi</span>
        </div>

        {/* Dynamic Transition Event Row */}
        <div className="flex-1 min-w-0 h-6 relative overflow-hidden flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="flex items-center gap-2 text-xs text-zinc-700 truncate w-full"
            >
              <span className="text-[10px] font-semibold text-terracotta-700 shrink-0">
                [{current.time}]
              </span>
              <span className="font-semibold text-zinc-900 truncate">
                {current.text}
              </span>
              <span className="hidden md:inline-flex items-center gap-1 text-[10px] text-zinc-400 shrink-0">
                <MapPin className="w-3 h-3 text-zinc-400" />
                {current.location}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Action Link */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
          <Link
            href={current.link}
            className="inline-flex items-center gap-1 text-xs font-bold text-terracotta-700 hover:text-terracotta-900 hover:underline transition-colors"
          >
            <span>Lihat Aksi</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
