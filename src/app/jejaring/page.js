'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe2,
  Users,
  Building2,
  MapPin,
  Trophy,
  ArrowRight,
  ExternalLink,
  Search,
  Linkedin,
  GraduationCap,
  Sparkles,
  Briefcase,
  Share2,
  CheckCircle2,
  HeartHandshake,
  Award,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import CardSpotlight from '@/components/aceternity/CardSpotlight';
import IndonesiaMapSection from '@/components/home/IndonesiaMapSection';
import { FadeInView, StaggerContainer, StaggerItem } from '@/components/motion/MotionView';
import { useMahreenStore } from '@/store/useMahreenStore';

// Data Ikatan Alumni Mahreen Indonesia
const ALUMNI_DATA = [
  {
    id: 'raka-pratama',
    name: 'Raka Pratama',
    role: 'Chief Design Officer',
    company: 'Mahreen Creative Studio',
    batch: 'Alumni Batch 10 (2024)',
    division: 'UI/UX & Product Design',
    trackKey: 'design',
    origin: 'Bandung, Jawa Barat',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com',
    quote: 'Mahreen membentuk cara berpikir strategis dan ketelitian eksekusi berstandar luxury agency. Portofolio proyek nyata yang kami bangun langsung diakui industri.',
    skills: ['Design Systems', 'Art Direction', 'Luxury UI/UX'],
    mentorAvailable: true,
  },
  {
    id: 'siti-mahreen',
    name: 'Siti Rahmawati',
    role: 'Lead Fullstack Developer',
    company: 'Digital Nusantara Hub',
    batch: 'Alumni Batch 8 (2023)',
    division: 'Tech & Engineering',
    trackKey: 'tech',
    origin: 'Jakarta Selatan, DKI Jakarta',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com',
    quote: 'Dari proyek IoT dan dashboard agensi Mahreen, saya belajar arsitektur kode modern yang scalable dan standar keamanan enterprise tingkat tinggi.',
    skills: ['Next.js', 'Cloud Architecture', 'PostgreSQL'],
    mentorAvailable: true,
  },
  {
    id: 'dimas-andre',
    name: 'Dimas Andrean',
    role: 'Growth Strategist & Analytics',
    company: 'Fintech Solutions Indonesia',
    batch: 'Alumni Batch 11 (2025)',
    division: 'Business & Growth Strategy',
    trackKey: 'business',
    origin: 'Surabaya, Jawa Timur',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com',
    quote: 'Mendampingi UMKM naik kelas di Jawa Timur memberi saya data empiris riil tentang funneling bisnis dan growth hacking pasar lokal Indonesia.',
    skills: ['Growth Hacking', 'Omnichannel Marketing', 'Data Analytics'],
    mentorAvailable: false,
  },
  {
    id: 'maya-kania',
    name: 'Maya Kania Putri',
    role: 'Senior Multimedia & Motion Director',
    company: 'Vanguard Visual Lab',
    batch: 'Alumni Batch 9 (2024)',
    division: 'Multimedia & Creative Content',
    trackKey: 'multimedia',
    origin: 'Sleman, DI Yogyakarta',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com',
    quote: 'Standar estetika Mahreen yang anggun, warm terracotta, dan presisi mengajarkan saya membedakan karya amatir dengan eksekusi visual kelas dunia.',
    skills: ['Cinema 4D', 'After Effects', 'Creative Direction'],
    mentorAvailable: true,
  },
  {
    id: 'fakhri-ramadhan',
    name: 'Fakhri Ramadhan',
    role: 'IoT Hardware Systems Engineer',
    company: 'AgriTech Nusantara',
    batch: 'Alumni Batch 11 (2025)',
    division: 'Tech & Engineering',
    trackKey: 'tech',
    origin: 'Malang, Jawa Timur',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com',
    quote: 'Mengembangkan stasiun sensor cuaca microhidro di pedesaan mengajarkan ketahanan hardware dan empati mendalam pada pengguna di pelosok.',
    skills: ['LoRaWAN', 'Embedded C++', 'Sensor Telemetry'],
    mentorAvailable: true,
  },
  {
    id: 'annisa-larasati',
    name: 'Annisa Larasati',
    role: 'Product Manager & EdTech Strategist',
    company: 'EduKarya Bangsa',
    batch: 'Alumni Batch 7 (2023)',
    division: 'Business & Growth Strategy',
    trackKey: 'business',
    origin: 'Semarang, Jawa Tengah',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com',
    quote: 'Ritme kolaborasi lintas bidang di Mahreen menempa kemampuan product discovery dan ownership yang langsung relevan di industri rintisan.',
    skills: ['Product Discovery', 'Scrum / Agile', 'User Research'],
    mentorAvailable: false,
  },
  {
    id: 'bagus-wicaksono',
    name: 'Bagus Wicaksono',
    role: 'Lead Brand Identity Specialist',
    company: 'Nusantara Heritage Studio',
    batch: 'Alumni Batch 10 (2024)',
    division: 'UI/UX & Product Design',
    trackKey: 'design',
    origin: 'Denpasar, Bali',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com',
    quote: 'Pendampingan wastra tenun dan kopi daerah membuktikan kearifan lokal Nusantara memiliki daya jual global bila dikemas secara kontemporer.',
    skills: ['Brand Identity', 'Eco Packaging', 'Design Research'],
    mentorAvailable: true,
  },
  {
    id: 'devi-maharani',
    name: 'Devi Maharani',
    role: 'Regional Community Partnership Lead',
    company: 'Inisiatif Bahari Timur',
    batch: 'Alumni Batch 9 (2024)',
    division: 'Social Impact & Partnerships',
    trackKey: 'social',
    origin: 'Kupang, Nusa Tenggara Timur',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com',
    quote: 'Jejaring Mahreen bukan sekadar platform magang, melainkan keluarga pejuang kemajuan pemuda dari pelosok kepulauan Nusantara.',
    skills: ['Community Organizing', 'Stakeholder Management', 'Social Impact Assessment'],
    mentorAvailable: true,
  },
];

export default function JejaringPage() {
  const { showToast } = useMahreenStore();

  const handleCopyProfile = (alum) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(`${alum.name} - ${alum.role} at ${alum.company} (Ikatan Alumni Mahreen Indonesia)`);
      showToast(`Tautan profil ${alum.name} disalin!`, 'success');
    }
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-20 bg-white min-h-screen">
      {/* 1. TOP HEADER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-200">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-terracotta-50 text-terracotta-800 text-xs font-semibold border border-terracotta-200 shadow-2xs">
              <Globe2 className="w-3.5 h-3.5 text-terracotta-700" />
              <span>Jejaring Nasional • 34 Provinsi Terkoneksi</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-zinc-900 tracking-tight leading-tight">
              Peta Sebaran &amp; <br />
              <span className="text-terracotta-700">Jejaring Kebanggaan Mahreen.</span>
            </h1>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
              Jelajahi sentra pendampingan UMKM, laboratorium riset IoT tepat guna, dan ekspedisi pemuda di 34 provinsi Nusantara secara interaktif, serta kiprah para alumni Mahreen yang kini berkiprah di pucuk industri kreatif dan teknologi tanah air.
            </p>
          </div>

          {/* Quick Summary Badges (Matching Hub Aesthetic) */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="p-3 sm:px-4 rounded-2xl bg-white border border-black text-center min-w-[84px] shadow-2xs">
              <div className="text-xl sm:text-2xl font-bold font-display text-black">34</div>
              <div className="text-[10px] font-bold text-black uppercase tracking-wider mt-0.5">Provinsi</div>
            </div>
            <div className="p-3 sm:px-4 rounded-2xl bg-white border border-black text-center min-w-[84px] shadow-2xs">
              <div className="text-xl sm:text-2xl font-bold font-display text-black">127+</div>
              <div className="text-[10px] font-bold text-black uppercase tracking-wider mt-0.5">UMKM Binaan</div>
            </div>
            <div className="p-3 sm:px-4 rounded-2xl bg-white border border-black text-center min-w-[84px] shadow-2xs">
              <div className="text-xl sm:text-2xl font-bold font-display text-black">5.240+</div>
              <div className="text-[10px] font-bold text-black uppercase tracking-wider mt-0.5">Talenta</div>
            </div>
            <div className="p-3 sm:px-4 rounded-2xl bg-white border border-black text-center min-w-[84px] shadow-2xs">
              <div className="text-xl sm:text-2xl font-bold font-display text-black">1.2K+</div>
              <div className="text-[10px] font-bold text-black uppercase tracking-wider mt-0.5">Alumni</div>
            </div>
          </div>
        </div>

      </section>

      {/* 3. PETA SEBARAN NUSANTARA (INTERACTIVE MAP SECTION) */}
      <IndonesiaMapSection />
    </div>
  );
}
