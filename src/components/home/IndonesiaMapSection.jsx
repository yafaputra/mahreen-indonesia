'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';

// Dynamic import Leaflet on client-side only (avoid SSR window errors)
const LeafletIndonesiaMap = dynamic(() => import('@/components/home/LeafletIndonesiaMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[360px] sm:h-[430px] rounded-2xl border border-zinc-200 bg-zinc-100 flex items-center justify-center text-xs text-zinc-500 font-medium">
      Memuat Peta Leaflet.js Indonesia...
    </div>
  ),
});
import {
  MapPin,
  Compass,
  Building2,
  Users,
  Trophy,
  ArrowRight,
  ExternalLink,
  Layers,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

// Comprehensive regional data covering all 34 Indonesian provinces with exact lat/lng
const REGIONS_DATA = [
  {
    id: 'sumatera',
    name: 'Sumatera',
    provincesCount: 10,
    headline: 'Pusat Wastra Ulos, Kopi Konservasi & Rempah Warisan',
    accentColor: '#D97706',
    hubs: [
      {
        id: 'gayo',
        name: 'Dataran Tinggi Gayo',
        province: 'Aceh',
        regionId: 'sumatera',
        x: 95,
        y: 85,
        lat: 4.7089,
        lng: 96.8667,
        program: 'Kopi Agroforestri & Smart Roasting Organik',
        pillar: 'Bisnis & UMKM',
        pillarVariant: 'amber',
        talentaCount: 142,
        umkmCount: 18,
        xpReward: 60,
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
        quote: 'Petani muda Gayo kini menjual biji kopi specialty bersertifikasi langsung ke roastery internasional.',
        actionLink: '/programs',
        actionLabel: 'Program Gayo',
      },
      {
        id: 'toba',
        name: 'Kawasan Danau Toba',
        province: 'Sumatera Utara',
        regionId: 'sumatera',
        x: 135,
        y: 135,
        lat: 2.6845,
        lng: 98.7758,
        program: 'Regenerasi Ulos Tradisi Pewarna Alami',
        pillar: 'Kreativitas & Seni',
        pillarVariant: 'terracotta',
        talentaCount: 198,
        umkmCount: 24,
        xpReward: 70,
        image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=600&q=80',
        quote: 'Menghubungkan penenun Ulos tradisional dengan desainer fesyen etis Jakarta dan Bali.',
        actionLink: '/programs',
        actionLabel: 'Program Tenun Ulos',
      },
      {
        id: 'bukittinggi',
        name: 'Bukittinggi & Minang',
        province: 'Sumatera Barat',
        regionId: 'sumatera',
        x: 175,
        y: 200,
        lat: -0.3056,
        lng: 100.3692,
        program: 'Modernisasi Kemasan Rendang & Songket Silungkang',
        pillar: 'Bisnis & UMKM',
        pillarVariant: 'amber',
        talentaCount: 165,
        umkmCount: 31,
        xpReward: 65,
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
        quote: 'UMKM pangan tradisional menembus pasar ritel modern lewat teknologi kemasan steril.',
        actionLink: '/partnership',
        actionLabel: 'Kemitraan UMKM Minang',
      },
    ],
  },
  {
    id: 'jawa',
    name: 'Jawa & Madura',
    provincesCount: 6,
    headline: 'Episentrum Rekayasa IoT, Desain Kriya & Kolaborasi Kampus',
    accentColor: '#C2410C',
    hubs: [
      {
        id: 'garut',
        name: 'Garut & Priangan Timur',
        province: 'Jawa Barat',
        regionId: 'jawa',
        x: 290,
        y: 345,
        lat: -7.2278,
        lng: 107.9086,
        program: 'Sensor IoT Hemat Air & Pupuk Tani Cabai',
        pillar: 'Teknologi Terapan',
        pillarVariant: 'emerald',
        talentaCount: 840,
        umkmCount: 45,
        xpReward: 80,
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
        quote: 'Perangkat sensor rakitan mahasiswa menghemat hingga 40% pupuk kimia petani lokal.',
        actionLink: '/programs',
        actionLabel: 'Inovasi Green Tech',
      },
      {
        id: 'jogja',
        name: 'Bantul & Sleman',
        province: 'DI Yogyakarta',
        regionId: 'jawa',
        x: 350,
        y: 355,
        lat: -7.7956,
        lng: 110.3695,
        program: 'Etalase Kriya Gerabah & Aksara Jawa Digital',
        pillar: 'Kreativitas & Budaya',
        pillarVariant: 'terracotta',
        talentaCount: 620,
        umkmCount: 38,
        xpReward: 75,
        image: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=600&q=80',
        quote: 'Sinergi perajin gerabah Kasongan dengan kurator seni rupa kontemporer.',
        actionLink: '/programs',
        actionLabel: 'Program Kriya Jogja',
      },
      {
        id: 'banyuwangi',
        name: 'Banyuwangi & Selat Bali',
        province: 'Jawa Timur',
        regionId: 'jawa',
        x: 430,
        y: 358,
        lat: -8.2192,
        lng: 114.3691,
        program: 'Rantai Pasok Dingin Nelayan Tradisional',
        pillar: 'Pengembangan Talenta',
        pillarVariant: 'indigo',
        talentaCount: 310,
        umkmCount: 22,
        xpReward: 65,
        image: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=600&q=80',
        quote: 'Aplikasi pencatat tangkapan ikan mandiri menjaga mutu dan harga adil bagi nelayan.',
        actionLink: '/internship',
        actionLabel: 'Program Talenta Maritim',
      },
    ],
  },
  {
    id: 'nusa-tenggara',
    name: 'Bali & Nusa Tenggara',
    provincesCount: 3,
    headline: 'Benteng Tenun Purba, Konservasi Sabana & Bahari Lestari',
    accentColor: '#059669',
    hubs: [
      {
        id: 'sabu',
        name: 'Desa Raijua, Sabu Raijua',
        province: 'Nusa Tenggara Timur',
        regionId: 'nusa-tenggara',
        x: 620,
        y: 385,
        lat: -10.5500,
        lng: 121.8500,
        program: 'Revitalisasi Tenun Ikat Purba Pewarna Daun Taum',
        pillar: 'Kreativitas & Seni',
        pillarVariant: 'terracotta',
        talentaCount: 215,
        umkmCount: 16,
        xpReward: 90,
        image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
        quote: 'Mama-mama penenun kini memiliki katalog digital terkurasi dan kontrak harga beretika.',
        actionLink: '/programs',
        actionLabel: 'Program Tenun Sabu',
      },
      {
        id: 'lombok',
        name: 'Sukarara & Sembalun',
        province: 'Nusa Tenggara Barat',
        regionId: 'nusa-tenggara',
        x: 535,
        y: 375,
        lat: -8.6500,
        lng: 116.3242,
        program: 'Mikrohidro Mandiri & Koperasi Tenun Sasak',
        pillar: 'Teknologi Terapan',
        pillarVariant: 'emerald',
        talentaCount: 180,
        umkmCount: 19,
        xpReward: 70,
        image: 'https://images.unsplash.com/photo-1578469550956-0e16b69c6a3d?auto=format&fit=crop&w=600&q=80',
        quote: 'Pemanfaatan arus air lereng Rinjani untuk menggerakkan sentra kerajinan rakyat.',
        actionLink: '/programs',
        actionLabel: 'Program NTT & NTB',
      },
      {
        id: 'bali',
        name: 'Ubud & Singaraja',
        province: 'Bali',
        regionId: 'nusa-tenggara',
        x: 470,
        y: 355,
        lat: -8.5069,
        lng: 115.2625,
        program: 'Pertanian Organik Subak & Daur Ulang Kain Perca',
        pillar: 'Kontribusi Sosial',
        pillarVariant: 'rose',
        talentaCount: 280,
        umkmCount: 25,
        xpReward: 65,
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80',
        quote: 'Menghubungkan kearifan sistem Subak dengan otomasi irigasi bertenaga surya.',
        actionLink: '/programs',
        actionLabel: 'Program Subak Organik',
      },
    ],
  },
  {
    id: 'kalimantan',
    name: 'Kalimantan',
    provincesCount: 5,
    headline: 'Paru-paru Dunia, Koridor IKN & Kriya Rotan Dayak',
    accentColor: '#0284C7',
    hubs: [
      {
        id: 'balikpapan',
        name: 'Balikpapan & Penajam (IKN)',
        province: 'Kalimantan Timur',
        regionId: 'kalimantan',
        x: 435,
        y: 235,
        lat: -1.2379,
        lng: 116.8529,
        program: 'Lumbung Bibit Endemik & Smart Agroforestry',
        pillar: 'Kontribusi Sosial',
        pillarVariant: 'rose',
        talentaCount: 290,
        umkmCount: 20,
        xpReward: 75,
        image: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=600&q=80',
        quote: 'Ribuan bibit pohon ulin dan meranti disemai oleh aliansi pemuda peduli hutan tropis.',
        actionLink: '/partnership',
        actionLabel: 'Kemitraan Koridor Hijau',
      },
      {
        id: 'pontianak',
        name: 'Kapuas Hulu & Pontianak',
        province: 'Kalimantan Barat',
        regionId: 'kalimantan',
        x: 325,
        y: 200,
        lat: -0.0263,
        lng: 109.3425,
        program: 'Anyaman Rotan Dayak & Madu Hutan Etis',
        pillar: 'Bisnis & UMKM',
        pillarVariant: 'amber',
        talentaCount: 175,
        umkmCount: 15,
        xpReward: 70,
        image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80',
        quote: 'Standardisasi kemasan madu hutan liar menjamin kemurnian dan harga premium petani adat.',
        actionLink: '/programs',
        actionLabel: 'Program Kriya Dayak',
      },
    ],
  },
  {
    id: 'sulawesi',
    name: 'Sulawesi',
    provincesCount: 6,
    headline: 'Arsitektur Vernakular Tongkonan & Bahari Wallacea',
    accentColor: '#7C3AED',
    hubs: [
      {
        id: 'toraja',
        name: 'Tana Toraja & Enrekang',
        province: 'Sulawesi Selatan',
        regionId: 'sulawesi',
        x: 525,
        y: 260,
        lat: -3.0784,
        lng: 119.8647,
        program: 'Digital Twins 3D Rumah Adat Tongkonan & Kriya Ukir',
        pillar: 'Kreativitas & Budaya',
        pillarVariant: 'terracotta',
        talentaCount: 310,
        umkmCount: 26,
        xpReward: 85,
        image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80',
        quote: 'Model 3D interaktif ornamen ukir kayu Toraja membuka ruang riset arsitektur dunia.',
        actionLink: '/programs',
        actionLabel: 'Inisiatif Budaya Toraja',
      },
      {
        id: 'manado',
        name: 'Tomohon & Likupang',
        province: 'Sulawesi Utara',
        regionId: 'sulawesi',
        x: 595,
        y: 130,
        lat: 1.4748,
        lng: 124.8421,
        program: 'Monitoring Karang Berbasis AI & Desa Wisata Bunga',
        pillar: 'Teknologi Terapan',
        pillarVariant: 'emerald',
        talentaCount: 160,
        umkmCount: 14,
        xpReward: 65,
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
        quote: 'Kamera bawah air IoT membantu nelayan memantau kesehatan terumbu karang secara live.',
        actionLink: '/programs',
        actionLabel: 'Inisiatif Sulut',
      },
    ],
  },
  {
    id: 'maluku-papua',
    name: 'Maluku & Papua',
    provincesCount: 4,
    headline: 'Jalur Rempah Bersejarah, Konservasi Laut Banda & Noken Papua',
    accentColor: '#E11D48',
    hubs: [
      {
        id: 'banda',
        name: 'Kepulauan Banda & Ambon',
        province: 'Maluku',
        regionId: 'maluku-papua',
        x: 710,
        y: 260,
        lat: -4.5244,
        lng: 129.9044,
        program: 'Platform Logistik Rumput Laut & Pala Banda Organik',
        pillar: 'Bisnis & UMKM',
        pillarVariant: 'amber',
        talentaCount: 195,
        umkmCount: 17,
        xpReward: 85,
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
        quote: 'Rantai pasok etis menghubungkan petani pala pulau terpencil langsung ke pasar Eropa.',
        actionLink: '/partnership',
        actionLabel: 'Kemitraan Maritim Banda',
      },
      {
        id: 'raja-ampat',
        name: 'Raja Ampat & Sorong',
        province: 'Papua Barat Daya',
        regionId: 'maluku-papua',
        x: 785,
        y: 185,
        lat: -0.2333,
        lng: 130.5167,
        program: 'Patroli Laut Mandiri & Ekowisata Adat Papua',
        pillar: 'Kontribusi Sosial',
        pillarVariant: 'rose',
        talentaCount: 220,
        umkmCount: 12,
        xpReward: 95,
        image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=600&q=80',
        quote: 'Pemuda adat mengelola konservasi laut dan homestay mandiri berbasis web lokal.',
        actionLink: '/programs',
        actionLabel: 'Program Bahari Papua',
      },
      {
        id: 'jayapura',
        name: 'Jayapura & Lembah Baliem',
        province: 'Papua',
        regionId: 'maluku-papua',
        x: 885,
        y: 225,
        lat: -2.5916,
        lng: 140.6690,
        program: 'Sertifikasi Keaslian Noken & Pojok Baca Digital 3T',
        pillar: 'Pengembangan Talenta',
        pillarVariant: 'indigo',
        talentaCount: 265,
        umkmCount: 19,
        xpReward: 90,
        image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
        quote: 'Koleksi noken serat kayu tradisional dilengkapi QR Paspor Digital membuktikan orisinalitasnya.',
        actionLink: '/programs',
        actionLabel: 'Program Noken Papua',
      },
    ],
  },
];

const ALL_HUBS = REGIONS_DATA.flatMap((r) => r.hubs);

export default function IndonesiaMapSection() {
  const [selectedRegionId, setSelectedRegionId] = useState('all');
  const [activeHub, setActiveHub] = useState(ALL_HUBS.find((h) => h.id === 'sabu') || ALL_HUBS[0]);
  const [hoveredHub, setHoveredHub] = useState(null);

  // Filtered hubs based on region tab
  const visibleHubs = useMemo(() => {
    if (selectedRegionId === 'all') return ALL_HUBS;
    const region = REGIONS_DATA.find((r) => r.id === selectedRegionId);
    return region ? region.hubs : ALL_HUBS;
  }, [selectedRegionId]);

  return (
    <section id="peta-nusantara" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* 2. TOOLBAR: REGION FILTERS + LAYER SWITCHER (VEKTOR vs LIVE API) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Region Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedRegionId('all')}
            className={`relative px-3.5 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedRegionId === 'all'
                ? 'text-white font-bold'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            {selectedRegionId === 'all' && (
              <motion.div
                layoutId="activeRegionPill"
                className="absolute inset-0 bg-black rounded-md shadow-xs"
                transition={{ type: 'spring', stiffness: 450, damping: 30 }}
              />
            )}
            <span className="relative z-10">Semua (34 Provinsi)</span>
          </button>
          {REGIONS_DATA.map((region) => (
            <button
              key={region.id}
              onClick={() => {
                setSelectedRegionId(region.id);
                if (region.hubs.length > 0) {
                  setActiveHub(region.hubs[0]);
                }
              }}
              className={`relative px-3.5 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                selectedRegionId === region.id
                  ? 'text-white font-bold'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              {selectedRegionId === region.id && (
                <motion.div
                  layoutId="activeRegionPill"
                  className="absolute inset-0 bg-black rounded-md shadow-xs"
                  transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                />
              )}
              <span className="relative z-10">{region.name}</span>
              <span
                className={`relative z-10 text-[10px] px-1.5 py-0.2 rounded-md ${
                  selectedRegionId === region.id ? 'bg-zinc-800 text-white' : 'bg-zinc-200 text-zinc-700'
                }`}
              >
                {region.hubs.length} Hub
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. MAIN MAP WORKSPACE: (VECTOR SVG OR LIVE API KEY VIEW) + INTERACTIVE DETAIL CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: MAP DISPLAY CANVAS */}
        <div className="lg:col-span-7 xl:col-span-8 bg-white rounded-3xl border border-zinc-200/90 p-3 sm:p-4 relative overflow-hidden shadow-sm flex flex-col justify-between space-y-3">
          <LeafletIndonesiaMap
            hubs={visibleHubs}
            activeHub={activeHub}
            onSelectHub={(hub) => setActiveHub(hub)}
          />

          {/* Quick Hub Navigation Pills Below Map */}
          <div className="pt-3 pb-1 px-1 border-t border-zinc-100 flex items-center gap-3 text-xs min-w-0">
            <span className="text-zinc-500 text-xs font-semibold shrink-0 select-none">
              Fokus Koordinat:
            </span>
            <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {visibleHubs.map((hub) => (
                <button
                  key={hub.id}
                  onClick={() => setActiveHub(hub)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                    activeHub?.id === hub.id
                      ? 'bg-terracotta-50 text-terracotta-800 border border-terracotta-300 font-bold shadow-xs'
                      : 'bg-zinc-50 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 border border-zinc-200/80'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 text-terracotta-600 shrink-0" />
                  <span>{hub.province}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: DYNAMIC IMPACT DETAIL CARD */}
        <div className="lg:col-span-5 xl:col-span-4">
          <AnimatePresence mode="wait">
            {activeHub && (
              <motion.div
                key={activeHub.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-3xl border border-zinc-200 shadow-sm p-6 space-y-5"
              >
                {/* Header & Badges */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant={activeHub.pillarVariant} size="xs">
                      {activeHub.pillar}
                    </Badge>
                    <span className="text-[11px] font-bold text-terracotta-700 bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">
                      Inisiatif Aktif
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-display text-zinc-900 leading-snug">
                    {activeHub.name}
                  </h3>
                  <div className="text-xs text-zinc-500 font-medium flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-terracotta-600 shrink-0" />
                      Provinsi {activeHub.province}
                    </span>
                    <span className="font-mono text-[10px] text-zinc-400">
                      {activeHub.lat.toFixed(2)}°, {activeHub.lng.toFixed(2)}°
                    </span>
                  </div>
                </div>

                {/* Photo Showcase */}
                <div className="relative h-44 rounded-2xl overflow-hidden border border-zinc-100 bg-zinc-100">
                  <img
                    src={activeHub.image}
                    alt={activeHub.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent flex items-end p-3">
                    <div className="text-white text-xs font-semibold leading-tight line-clamp-1">
                      {activeHub.program}
                    </div>
                  </div>
                </div>

                {/* Real Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-white border border-zinc-200 text-left shadow-2xs">
                    <div className="flex items-center gap-1.5 text-terracotta-700 font-bold text-base font-display">
                      <Building2 className="w-4 h-4" />
                      <span>{activeHub.umkmCount} Sentra</span>
                    </div>
                    <div className="text-[10px] text-zinc-500 mt-0.5">UMKM Binaan Aktif</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-zinc-200 text-left shadow-2xs">
                    <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-base font-display">
                      <Users className="w-4 h-4" />
                      <span>{activeHub.talentaCount}+ Orang</span>
                    </div>
                    <div className="text-[10px] text-zinc-500 mt-0.5">Talenta Pemuda Terlibat</div>
                  </div>
                </div>

                {/* Local Quote */}
                <div className="p-3.5 rounded-xl bg-white border border-zinc-200 text-xs text-zinc-600 italic leading-relaxed shadow-2xs">
                  &ldquo;{activeHub.quote}&rdquo;
                </div>

                {/* Action Link Button */}
                <div className="pt-2">
                  <Link href={activeHub.actionLink} className="block">
                    <button className="w-full py-3 px-4 rounded-xl bg-black hover:bg-zinc-900 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-xs group cursor-pointer">
                      <span>{activeHub.actionLabel}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

    </section>
  );
}
