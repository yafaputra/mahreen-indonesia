'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Compass,
  LayoutDashboard,
  Calendar,
  Image as ImageIcon,
  Users,
  Trophy,
  Globe2,
  Building2,
  Stamp,
  Network,
  ArrowRight,
  X,
  FileBadge,
  Layers,
} from 'lucide-react';

const SEARCH_ITEMS = [
  {
    title: 'Beranda Mahreen Indonesia',
    category: 'Halaman Utama',
    href: '/',
    desc: 'Halaman pengantar ekosistem Mahreen Indonesia',
    icon: Compass,
  },
  {
    title: 'Mengapa Mahreen? (7 Nilai Utama)',
    category: 'Tentang Kami',
    href: '/#mengapa-mahreen',
    desc: 'Standar agensi profesional, portofolio nyata, dan bimbingan berkelanjutan',
    icon: Users,
  },
  {
    title: '5 Pilar Bisnis & Sinergi Karya',
    category: 'Ekosistem Bisnis',
    href: '/#pilar-bisnis',
    desc: 'Talent Agency, Creative Production, Edutech, Peduli Mahreen, & Brand Partner',
    icon: Layers,
  },
  {
    title: 'Program Magang (Internship)',
    category: 'Karier & Magang',
    href: '/internship',
    desc: 'Lowongan magang proyek nyata divisi kerja Mahreen',
    icon: Building2,
  },
  {
    title: 'Katalog Program & Pelatihan',
    category: 'Program & Pelatihan',
    href: '/programs',
    desc: 'Direktori inkubasi UMKM, kelas kreatif, dan pelatihan intensif',
    icon: Layers,
  },
  {
    title: 'Event & Masterclass (Newsroom)',
    category: 'Event & Berita',
    href: '/newsroom',
    desc: 'Workshop, masterclass, webinar, dan info kegiatan Mahreen',
    icon: Calendar,
  },
  {
    title: 'Kemitraan & Kerjasama (Partnership)',
    category: 'Kemitraan',
    href: '/partnership',
    desc: 'Peluang kolaborasi institusi kampus, korporasi, UMKM, dan CSR',
    icon: Building2,
  },
  {
    title: 'Quiz Karakter & Rekomendasi Program',
    category: 'Asesmen Diri',
    href: '/quiz',
    desc: 'Temukan karakter kontribusimu dan rekomendasi program yang cocok',
    icon: Compass,
  },
  {
    title: 'Galeri Karya (Karya Wall)',
    category: 'Portofolio',
    href: '/karya',
    desc: 'Galeri karya dan proyek nyata talenta Mahreen',
    icon: ImageIcon,
  },
  {
    title: 'Kalender Agenda & Jadwal',
    category: 'Jadwal',
    href: '/kalender',
    desc: 'Linimasa jadwal kegiatan, batas pendaftaran, dan agenda bulanan',
    icon: Calendar,
  },
  {
    title: 'Paspor Digital & Verifikasi Sertifikat',
    category: 'Sertifikasi',
    href: '/paspor',
    desc: 'Verifikasi sertifikat resmi dan portofolio keikutsertaan program',
    icon: Stamp,
  },
];

export default function CommandPalette({ isOpen, setIsOpen }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Keyboard shortcut listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsOpen]);

  // Filter items
  const filtered = SEARCH_ITEMS.filter((item) => {
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.desc.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  const handleSelect = (href) => {
    setIsOpen(false);
    setQuery('');
    router.push(href);
  };

  const handleKeyDownInInput = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + (filtered.length || 1)) % (filtered.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        handleSelect(filtered[selectedIndex].href);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          className="w-full max-w-2xl bg-white rounded-2xl border border-ivory-300 shadow-2xl overflow-hidden space-y-0"
        >
          {/* Search Header */}
          <div className="p-4 border-b border-ivory-200 flex items-center gap-3 bg-ivory-50/60">
            <Search className="w-5 h-5 text-terracotta-600 shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDownInInput}
              placeholder="Cari fitur, inisiatif, atau halaman di Mahreen OS... (Gunakan panah ↑ ↓)"
              className="w-full bg-transparent text-sm text-nusantara-charcoal placeholder-nusantara-charcoalMuted focus:outline-none"
            />
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md text-nusantara-charcoalMuted hover:bg-ivory-200 text-xs"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
            {filtered.length === 0 ? (
              <div className="p-8 text-center text-xs text-nusantara-charcoalMuted">
                Tidak ada menu atau halaman yang cocok dengan &quot;{query}&quot;.
              </div>
            ) : (
              filtered.map((item, idx) => {
                const Icon = item.icon;
                const isSelected = idx === selectedIndex;
                return (
                  <button
                    key={item.href}
                    onClick={() => handleSelect(item.href)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full text-left p-3 rounded-xl flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'bg-terracotta-50 text-terracotta-900 border border-terracotta-200'
                        : 'hover:bg-ivory-50 text-nusantara-charcoal border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-terracotta-600 text-white' : 'bg-ivory-100 text-terracotta-700'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold truncate">{item.title}</span>
                          <span className="text-[10px] uppercase font-semibold px-2 py-0.2 rounded bg-ivory-200/80 text-nusantara-charcoalMuted">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-nusantara-charcoalMuted truncate mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <ArrowRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isSelected ? 'text-terracotta-700 translate-x-1' : 'text-nusantara-charcoalMuted opacity-40'
                      }`}
                    />
                  </button>
                );
              })
            )}
          </div>

          {/* Keyboard Helper Footer */}
          <div className="p-2.5 bg-ivory-100 border-t border-ivory-200 text-[11px] text-nusantara-charcoalMuted flex items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <span>
                Tekan <kbd className="px-1.5 py-0.5 rounded bg-white border border-ivory-300 font-mono text-[10px]">Enter</kbd> untuk buka
              </span>
              <span>
                Navigasi <kbd className="px-1.5 py-0.5 rounded bg-white border border-ivory-300 font-mono text-[10px]">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-white border border-ivory-300 font-mono text-[10px]">↓</kbd>
              </span>
            </div>
            <span>
              Tutup <kbd className="px-1.5 py-0.5 rounded bg-white border border-ivory-300 font-mono text-[10px]">Esc</kbd>
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
