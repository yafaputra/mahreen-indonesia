'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  ArrowLeft,
  Share2,
  Award,
  Video,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import CardSpotlight from '@/components/aceternity/CardSpotlight';
import eventsData from '@/data/events.json';
import { useMahreenStore } from '@/store/useMahreenStore';

export default function EventDetailPage() {
  const params = useParams();
  const slug = params?.slug;

  const { events, speakers } = eventsData;
  const event = events.find((ev) => ev.slug === slug) || events[0];

  const [isRegistered, setIsRegistered] = useState(false);
  const { addXp, showToast, addActivityLog } = useMahreenStore();

  const isPaid = event.pricingType === 'PAID';

  const handleRegister = () => {
    if (isRegistered) return;
    setIsRegistered(true);
    addXp(event.xpReward || 60, `Daftar Event: ${event.title}`);
    addActivityLog(
      'Mendaftar Event Mahreen',
      `Berhasil mendaftar ${event.category}: ${event.title}`,
      event.xpReward || 60,
      'event'
    );
    showToast(`Pendaftaran ${event.title} Berhasil! (+${event.xpReward || 60} XP)`, 'success');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-10 min-h-screen">
      {/* Back button */}
      <div>
        <Link
          href="/newsroom"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-500 hover:text-terracotta-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Daftar Event Mahreen</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 text-white p-6 sm:p-12 shadow-xl">
        <div className="absolute inset-0 opacity-40">
          <img
            src={event.coverImage}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/30" />

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider ${
                isPaid ? 'bg-amber-400 text-zinc-950' : 'bg-emerald-500 text-white'
              }`}
            >
              {event.pricingType}
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-bold bg-white/20 backdrop-blur-xs text-white">
              {event.category}
            </span>
            <span className="px-3 py-1 rounded-md text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30">
              +{event.xpReward} XP Reward
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold font-display leading-tight tracking-tight">
            {event.title}
          </h1>

          <p className="text-xs sm:text-base text-zinc-300 leading-relaxed font-normal">
            {event.summary}
          </p>

          {/* Quick Info Grid */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10 flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <div className="text-[10px] text-zinc-400">Tanggal:</div>
                <div className="font-semibold text-white">{event.dateDisplay}</div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10 flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <div className="text-[10px] text-zinc-400">Waktu:</div>
                <div className="font-semibold text-white">{event.time}</div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10 flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
              <div>
                <div className="text-[10px] text-zinc-400">Format:</div>
                <div className="font-semibold text-white truncate">{event.location}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Details & Registration Sidecar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Full Description & Speaker */}
        <div className="lg:col-span-2 space-y-8">
          {/* Detail Description */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200/90 shadow-2xs space-y-4">
            <h2 className="text-xl font-bold font-display text-zinc-900">
              Tentang Program &amp; Materi Pembelajaran
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              {event.description}
            </p>

            <div className="pt-4 border-t border-zinc-100 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Fasilitas &amp; Benefit Peserta:
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-zinc-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Sertifikat Resmi Mahreen Learning</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Akses Rekaman Video HD 30 Hari</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Materi Presentasi &amp; Design Framework</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Komunitas Diskusi Eksklusif</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Speaker Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200/90 shadow-2xs space-y-4">
            <h2 className="text-xl font-bold font-display text-zinc-900">
              Profil Pembicara Utama
            </h2>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
              <img
                src={event.speaker.avatar}
                alt={event.speaker.name}
                className="w-16 h-16 rounded-2xl object-cover border border-zinc-200"
              />
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="text-base font-bold text-zinc-900">{event.speaker.name}</h3>
                <div className="text-xs font-semibold text-terracotta-700">{event.speaker.role}</div>
                <p className="text-xs text-zinc-500 leading-relaxed pt-1">
                  Praktisi berpengalaman yang aktif membimbing talenta digital Indonesia dan memimpin proyek transformasi skala besar.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Registration Card */}
        <div className="p-6 rounded-3xl bg-zinc-50 border border-zinc-200/90 shadow-2xs space-y-5 sticky top-24">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Investasi Event:</span>
            <div className="text-2xl sm:text-3xl font-bold font-display text-zinc-900">
              {event.price}
            </div>
            <div className="text-xs text-zinc-500">
              Kapasitas: {event.registeredCount}/{event.capacity} Terisi
            </div>
          </div>

          <div className="w-full h-2 bg-zinc-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 rounded-full"
              style={{ width: `${Math.round((event.registeredCount / event.capacity) * 100)}%` }}
            />
          </div>

          {isRegistered ? (
            <div className="p-4 rounded-2xl bg-emerald-100/70 border border-emerald-200 text-emerald-900 text-xs font-semibold text-center space-y-1">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
              <div>Kamu Sudah Terdaftar!</div>
              <div className="text-[11px] font-normal text-emerald-800">
                Tautan sesi &amp; instruksi telah dikirimkan ke email terdaftarmu.
              </div>
            </div>
          ) : (
            <Button
              variant="primary"
              size="lg"
              onClick={handleRegister}
              className="w-full text-center justify-center font-bold cursor-pointer"
            >
              {isPaid ? `Daftar Sekarang (${event.price})` : 'Daftar Gratis Sekarang'}
            </Button>
          )}

          <div className="pt-2 border-t border-zinc-200/80 space-y-2 text-[11px] text-zinc-500">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Verifikasi Kehadiran &amp; Akreditasi Resmi Mahreen</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Dapatkan +{event.xpReward} XP Kontribusi</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
