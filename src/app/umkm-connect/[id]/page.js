'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Building2,
  MapPin,
  Clock,
  Send,
  Coins,
  CheckCircle2,
  Award,
  Users,
  Briefcase,
  FileCheck2,
  ExternalLink,
  ShieldCheck,
  Tag,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import briefsData from '@/data/umkm-briefs.json';
import { useMahreenStore } from '@/store/useMahreenStore';

export default function UmkmBriefDetailPage() {
  const params = useParams();
  const router = useRouter();
  const briefId = params?.id;

  const brief = useMemo(() => {
    return briefsData.find((b) => b.id === briefId) || briefsData[0];
  }, [briefId]);

  const currentUser = useMahreenStore((state) => state.currentUser);
  const submitProposal = useMahreenStore((state) => state.submitProposal);
  const submittedProposals = useMahreenStore((state) => state.submittedProposals);
  const showToast = useMahreenStore((state) => state.showToast);

  // Form State
  const [teamName, setTeamName] = useState('');
  const [conceptNotes, setConceptNotes] = useState('');
  const [estimatedWeeks, setEstimatedWeeks] = useState(brief?.duration || '4 Minggu');
  const [portfolioLink, setPortfolioLink] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Check if current user already submitted proposal for this brief
  const existingProposal = useMemo(() => {
    return submittedProposals.find((p) => p.briefId === brief.id);
  }, [submittedProposals, brief.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!conceptNotes.trim()) {
      showToast('Mohon tuliskan gagasan konsep solusimu secara ringkas.', 'error');
      return;
    }

    submitProposal(brief.id, {
      briefTitle: brief.title,
      umkmName: brief.umkmName,
      location: brief.location,
      teamName: teamName.trim() || currentUser?.name || 'Tim Sinergi Pemuda',
      conceptNotes: conceptNotes.trim(),
      estimatedWeeks,
      portfolioLink: portfolioLink.trim(),
    });

    setIsSuccess(true);
    showToast(`Proposal untuk ${brief.umkmName} berhasil dikirim!`, 'success');
  };

  return (
    <div className="min-h-screen py-10 sm:py-16 bg-batik-pattern">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-nusantara-charcoalMuted">
          <Link href="/umkm-connect" className="flex items-center gap-1.5 hover:text-terracotta-700 transition-colors font-semibold">
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke UMKM Connect</span>
          </Link>
          <span>/</span>
          <span className="text-nusantara-charcoal font-bold truncate max-w-xs">{brief.umkmName}</span>
        </div>

        {/* Hero Brief Overview */}
        <div className="p-8 sm:p-10 rounded-3xl bg-nusantara-charcoal text-white border border-nusantara-charcoalSoft shadow-subtle space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Badge variant="amber" size="sm">
                {brief.category}
              </Badge>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                +{brief.xpReward} XP Kontribusi
              </span>
            </div>
            <div className="text-xs text-ivory-300 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              <span>Batas Akhir: <strong>{brief.deadline}</strong></span>
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white leading-tight">
              {brief.title}
            </h1>
            <p className="text-xs sm:text-sm text-ivory-200 leading-relaxed max-w-3xl">
              {brief.challenge}
            </p>
          </div>

          {/* UMKM Profile Bar */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <img
                src={brief.avatar}
                alt={brief.owner}
                className="w-12 h-12 rounded-2xl object-cover border border-white/20"
              />
              <div>
                <h4 className="text-sm font-bold text-white">{brief.umkmName}</h4>
                <p className="text-xs text-ivory-300 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-terracotta-400" />
                  <span>{brief.location} • Penanggung Jawab: {brief.owner}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="text-right">
                <span className="text-[10px] text-ivory-300 uppercase block">Apresiasi Gotong Royong:</span>
                <span className="font-bold text-amber-300 text-sm">{brief.honorGotongRoyong}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2 COLUMN LAYOUT: BRIEF REQUIREMENTS & PROPOSAL FORM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: DELIVERABLES & REQUIREMENTS (5 COLS) */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="p-6 space-y-5">
              <div className="flex items-center gap-2 text-terracotta-700 font-bold text-sm">
                <FileCheck2 className="w-4 h-4" />
                <span>Target Luaran & Solusi (Deliverables)</span>
              </div>
              <ul className="space-y-3 text-xs text-nusantara-charcoal">
                {brief.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-ivory-100 border border-ivory-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6 space-y-4 text-xs text-nusantara-charcoal">
              <h4 className="font-bold text-sm text-nusantara-charcoal flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-terracotta-600" />
                <span>Ketentuan Kolaborasi</span>
              </h4>
              <div className="space-y-2 text-nusantara-charcoalMuted leading-relaxed">
                <p>• Tim pemuda terpilih akan menandatangani Perjanjian Gotong-Royong Standar Mahreen OS.</p>
                <p>• Hak Kekayaan Intelektual (HKI) merek tetap milik mitra UMKM lokal.</p>
                <p>• Honorarium ditransfer bertahap: 40% di muka, 60% setelah serah terima berkas luaran.</p>
              </div>

              {brief.tags && (
                <div className="pt-3 border-t border-ivory-200 flex flex-wrap gap-1.5">
                  {brief.tags.map((t, idx) => (
                    <span key={idx} className="text-[11px] px-2 py-0.5 rounded-md bg-ivory-100 text-terracotta-800 font-medium">
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* RIGHT: PROPOSAL SUBMISSION FORM (7 COLS) */}
          <div className="lg:col-span-7">
            <Card className="p-6 sm:p-8 space-y-6">
              {isSuccess || existingProposal ? (
                <div className="text-center py-8 space-y-5">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold font-display text-nusantara-charcoal">
                      Proposal Kolaborasi Terkirim!
                    </h3>
                    <p className="text-xs sm:text-sm text-nusantara-charcoalMuted max-w-md mx-auto leading-relaxed">
                      Konsep solusimu untuk <strong>{brief.umkmName}</strong> telah tercatat di akunmu. Pihak UMKM dan kurator Mahreen OS akan segera meninjau proposalmu.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-ivory-100 border border-ivory-200 text-xs text-left max-w-md mx-auto space-y-1">
                    <div className="font-semibold text-terracotta-800">
                      Tim: {existingProposal?.teamName || teamName || 'Tim Sinergi'}
                    </div>
                    <div className="text-nusantara-charcoalMuted italic">
                      "{existingProposal?.conceptNotes || conceptNotes}"
                    </div>
                    <div className="text-emerald-700 font-bold pt-1">
                      Status: {existingProposal?.status || 'Menunggu Kurasi'} • +25 XP Ditambahkan
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Button
                      variant="primary"
                      onClick={() => router.push('/umkm-connect')}
                      leftIcon={<ArrowLeft className="w-4 h-4" />}
                    >
                      Kembali ke UMKM Connect
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsSuccess(false)}
                    >
                      Edit Ulang Konsep
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-bold text-terracotta-700 uppercase tracking-wider block">
                      Formulir Pengajuan Konsep
                    </span>
                    <h3 className="text-xl font-bold font-display text-nusantara-charcoal mt-1">
                      Ajukan Solusi Karya untuk {brief.umkmName}
                    </h3>
                    <p className="text-xs text-nusantara-charcoalMuted mt-1">
                      Jelaskan pendekatan kreatif atau teknologi yang akan kamu kerjakan untuk menjawab tantangan di atas.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-nusantara-charcoal">
                        Nama Tim / Inisiator Pemuda
                      </label>
                      <input
                        type="text"
                        placeholder={currentUser?.name ? `${currentUser.name} & Tim` : 'Contoh: Tim Sinergi Kreatif Muda'}
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-300 bg-white text-xs sm:text-sm text-nusantara-charcoal focus:ring-2 focus:ring-terracotta-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-nusantara-charcoal">
                        Gagasan Solusi & Rencana Aksi Singkat <span className="text-terracotta-600">*</span>
                      </label>
                      <textarea
                        required
                        rows={5}
                        placeholder="Jelaskan secara ringkas pendekatan teknis, desain, atau bisnis yang akan kamu gunakan untuk menyelesaikan tantangan UMKM ini..."
                        value={conceptNotes}
                        onChange={(e) => setConceptNotes(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-300 bg-white text-xs sm:text-sm text-nusantara-charcoal focus:ring-2 focus:ring-terracotta-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-nusantara-charcoal">
                          Estimasi Durasi Pengerjaan
                        </label>
                        <select
                          value={estimatedWeeks}
                          onChange={(e) => setEstimatedWeeks(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-300 bg-white text-xs text-nusantara-charcoal font-medium focus:ring-2 focus:ring-terracotta-500"
                        >
                          <option value="2 Minggu">2 Minggu (Cepat / Sprint)</option>
                          <option value="4 Minggu">4 Minggu (Standar)</option>
                          <option value="6 Minggu">6 Minggu (Menyeluruh)</option>
                          <option value="8 Minggu">8 Minggu (Lanjutan)</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-nusantara-charcoal">
                          Tautan Portofolio / GitHub (Opsional)
                        </label>
                        <input
                          type="url"
                          placeholder="https://github.com/... atau Drive"
                          value={portfolioLink}
                          onChange={(e) => setPortfolioLink(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-ivory-300 bg-white text-xs text-nusantara-charcoal focus:ring-2 focus:ring-terracotta-500"
                        />
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-700 shrink-0" />
                      <span>
                        Mengajukan proposal kolaborasi UMKM memberikan <strong>+25 XP</strong> kontribusi ke profilmu!
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
                        Kirim Proposal Kolaborasi (+25 XP)
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
