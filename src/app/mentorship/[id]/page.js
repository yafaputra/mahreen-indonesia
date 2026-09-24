'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Users,
  Star,
  Calendar,
  Clock,
  Send,
  Video,
  CheckCircle2,
  Award,
  ShieldCheck,
  BookOpen,
  MessageSquare,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import mentorsData from '@/data/mentors.json';
import { useMahreenStore } from '@/store/useMahreenStore';

export default function MentorBookingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const mentorId = params?.id;

  const mentor = useMemo(() => {
    return mentorsData.find((m) => m.id === mentorId) || mentorsData[0];
  }, [mentorId]);

  const bookMentorSession = useMahreenStore((state) => state.bookMentorSession);
  const bookedSessions = useMahreenStore((state) => state.bookedSessions);
  const showToast = useMahreenStore((state) => state.showToast);

  // Form State
  const [sessionDate, setSessionDate] = useState('2026-10-15');
  const [sessionTime, setSessionTime] = useState('19:30 - 20:30 WIB');
  const [discussionTopic, setDiscussionTopic] = useState('');
  const [projectLink, setProjectLink] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  // Check if session already booked for this mentor
  const existingSession = useMemo(() => {
    return bookedSessions.find((s) => s.mentorId === mentor.id);
  }, [bookedSessions, mentor.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!discussionTopic.trim()) {
      showToast('Mohon tuliskan topik atau pertanyaan yang ingin dibahas.', 'error');
      return;
    }

    bookMentorSession(mentor.id, {
      mentorName: mentor.name,
      mentorRole: mentor.role,
      organization: mentor.organization,
      mentorAvatar: mentor.avatar,
      date: sessionDate,
      timeSlot: sessionTime,
      topic: discussionTopic.trim(),
      projectLink: projectLink.trim(),
    });

    setIsBooked(true);
    showToast(`Sesi 1-on-1 dengan ${mentor.name} berhasil dijadwalkan!`, 'success');
  };

  return (
    <div className="min-h-screen py-10 sm:py-16 bg-batik-pattern">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-nusantara-charcoalMuted">
          <Link href="/mentorship" className="flex items-center gap-1.5 hover:text-terracotta-700 transition-colors font-semibold">
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Mentorship Hub</span>
          </Link>
          <span>/</span>
          <span className="text-nusantara-charcoal font-bold">{mentor.name}</span>
        </div>

        {/* Mentor Profile Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#1E3547] text-white shadow-subtle border border-[#2B455B] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={mentor.avatar}
                alt={mentor.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white/20 shadow-md"
              />
              <div className="space-y-1">
                <Badge variant="amber" size="xs">
                  {mentor.category}
                </Badge>
                <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
                  {mentor.name}
                </h1>
                <p className="text-xs sm:text-sm text-ivory-200">
                  {mentor.role} • <span className="text-amber-300 font-semibold">{mentor.organization}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-amber-300 border border-white/15 text-xs font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{mentor.rating.toFixed(1)} ({mentor.reviewCount} Ulasan)</span>
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-ivory-200 leading-relaxed max-w-2xl border-t border-white/10 pt-4">
            {mentor.bio}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-ivory-300 pt-1">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-300" />
              <span>Hari Tersedia: <strong>{mentor.availableDays.join(', ')}</strong></span>
            </span>
            <span className="flex items-center gap-1.5">
              <Video className="w-3.5 h-3.5 text-emerald-400" />
              <span>Format: Google Meet 1-on-1 (45 Menit)</span>
            </span>
          </div>
        </div>

        {/* 2 COLUMN LAYOUT: TOPICS & BOOKING FORM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Topics Focus */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-2 text-terracotta-700 font-bold text-sm">
                <BookOpen className="w-4 h-4" />
                <span>Topik Fokus Bimbingan</span>
              </div>
              <p className="text-xs text-nusantara-charcoalMuted">
                {mentor.name} memiliki kepakaran terbukti pada bidang-bidang berikut:
              </p>
              <ul className="space-y-2.5">
                {mentor.topics.map((t, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-ivory-100 text-xs text-nusantara-charcoal font-medium border border-ivory-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6 space-y-3 text-xs text-nusantara-charcoal">
              <h4 className="font-bold text-sm text-nusantara-charcoal flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-terracotta-600" />
                <span>Etika Sesi Mentoring</span>
              </h4>
              <p className="text-nusantara-charcoalMuted leading-relaxed">
                • Hadir tepat waktu di ruang virtual Google Meet.<br />
                • Siapkan materi karya atau pertanyaan spesifik sebelumnya.<br />
                • Sesi bersifat bimbingan nirlaba bebas biaya bagi seluruh delegasi Mahreen OS.
              </p>
            </Card>
          </div>

          {/* Right Column: Booking Form */}
          <div className="lg:col-span-7">
            <Card className="p-6 sm:p-8 space-y-6">
              {isBooked || existingSession ? (
                <div className="text-center py-8 space-y-5">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold font-display text-nusantara-charcoal">
                      Jadwal Mentoring Terkonfirmasi!
                    </h3>
                    <p className="text-xs sm:text-sm text-nusantara-charcoalMuted max-w-md mx-auto leading-relaxed">
                      Sesi konsultasi privat dengan <strong>{mentor.name}</strong> telah dijadwalkan. Tautan Google Meet akan dikirimkan ke email akunmu.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-ivory-100 border border-ivory-200 text-xs text-left max-w-md mx-auto space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-nusantara-charcoalMuted">Tanggal:</span>
                      <span className="font-bold text-nusantara-charcoal flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-terracotta-600 flex-shrink-0" />
                        <span>{existingSession?.date || sessionDate}</span>
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-nusantara-charcoalMuted">Waktu:</span>
                      <span className="font-bold text-nusantara-charcoal flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-terracotta-600 flex-shrink-0" />
                        <span>{existingSession?.timeSlot || sessionTime}</span>
                      </span>
                    </div>
                    <div className="pt-2 border-t border-ivory-200">
                      <span className="text-nusantara-charcoalMuted block text-[11px]">Topik:</span>
                      <span className="italic text-nusantara-charcoal text-[11px]">"{existingSession?.topic || discussionTopic}"</span>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Button
                      variant="primary"
                      onClick={() => router.push('/mentorship')}
                      leftIcon={<ArrowLeft className="w-4 h-4" />}
                    >
                      Kembali ke Daftar Mentor
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsBooked(false)}
                    >
                      Ubah Jadwal Sesi
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-bold text-terracotta-700 uppercase tracking-wider block">
                      Reservasi Jadwal Bimbingan
                    </span>
                    <h3 className="text-xl font-bold font-display text-nusantara-charcoal mt-1">
                      Pilih Tanggal & Slot Konsultasi
                    </h3>
                    <p className="text-xs text-nusantara-charcoalMuted mt-1">
                      Tentukan waktu yang paling cocok dengan jadwalmu untuk berdiskusi langsung.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-nusantara-charcoal">
                          Pilih Tanggal Sesi <span className="text-terracotta-600">*</span>
                        </label>
                        <input
                          type="date"
                          required
                          value={sessionDate}
                          onChange={(e) => setSessionDate(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-300 bg-white text-xs sm:text-sm text-nusantara-charcoal focus:ring-2 focus:ring-terracotta-500"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-nusantara-charcoal">
                          Pilih Slot Waktu <span className="text-terracotta-600">*</span>
                        </label>
                        <select
                          value={sessionTime}
                          onChange={(e) => setSessionTime(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-300 bg-white text-xs sm:text-sm text-nusantara-charcoal font-medium focus:ring-2 focus:ring-terracotta-500"
                        >
                          <option value="16:00 - 17:00 WIB">16:00 - 17:00 WIB (Sore)</option>
                          <option value="19:00 - 20:00 WIB">19:00 - 20:00 WIB (Malam)</option>
                          <option value="19:30 - 20:30 WIB">19:30 - 20:30 WIB (Malam)</option>
                          <option value="20:00 - 21:00 WIB">20:00 - 21:00 WIB (Malam)</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-nusantara-charcoal">
                        Pertanyaan / Topik Portofolio yang Ingin Dibahas <span className="text-terracotta-600">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Contoh: Mohon masukan arsitektur aplikasi offline saya, atau review strategi branding kemasan tenun untuk pasar ekspor..."
                        value={discussionTopic}
                        onChange={(e) => setDiscussionTopic(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-300 bg-white text-xs sm:text-sm text-nusantara-charcoal focus:ring-2 focus:ring-terracotta-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-nusantara-charcoal">
                        Tautan Portofolio / Slide Presentasi (Opsional)
                      </label>
                      <input
                        type="url"
                        placeholder="https://drive.google.com/... atau GitHub"
                        value={projectLink}
                        onChange={(e) => setProjectLink(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-300 bg-white text-xs text-nusantara-charcoal focus:ring-2 focus:ring-terracotta-500"
                      />
                    </div>

                    <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-700 shrink-0" />
                      <span>
                        Sesi konsultasi 1-on-1 memberikan <strong>+20 XP</strong> kontribusi ke profilmu!
                      </span>
                    </div>

                    <div className="pt-4 border-t border-ivory-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.back()}
                      >
                        Batal
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                        rightIcon={<Send className="w-4 h-4" />}
                        className="w-full sm:w-auto shadow-terracotta"
                      >
                        Konfirmasi Jadwal Bimbingan (+20 XP)
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
