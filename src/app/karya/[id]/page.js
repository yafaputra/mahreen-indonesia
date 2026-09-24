'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Share2,
  ChevronLeft,
  ChevronRight,
  Send,
  CornerDownRight,
  Flame,
  Lightbulb,
  ThumbsUp,
  MapPin,
  Tag,
  User,
  CheckCircle2,
  Trophy,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import karyaData from '@/data/karya.json';
import { useMahreenStore } from '@/store/useMahreenStore';

export default function KaryaDetailPage() {
  const params = useParams();
  const router = useRouter();
  const karyaId = params.id;

  const currentIndex = karyaData.findIndex((k) => k.id === karyaId);
  const karya = currentIndex !== -1 ? karyaData[currentIndex] : karyaData[0];

  const prevKarya = currentIndex > 0 ? karyaData[currentIndex - 1] : karyaData[karyaData.length - 1];
  const nextKarya = currentIndex < karyaData.length - 1 ? karyaData[currentIndex + 1] : karyaData[0];

  // Store
  const userReactions = useMahreenStore((state) => state.userReactions);
  const toggleReaction = useMahreenStore((state) => state.toggleReaction);
  const customComments = useMahreenStore((state) => state.customComments);
  const addComment = useMahreenStore((state) => state.addComment);
  const addReply = useMahreenStore((state) => state.addReply);
  const showToast = useMahreenStore((state) => state.showToast);

  // Comment input states
  const [commentInput, setCommentInput] = useState('');
  const [replyInput, setReplyInput] = useState({});
  const [activeReplyId, setActiveReplyId] = useState(null);

  // Reactions count calculation
  const defaultReactions = karya.reactions || { apresiasi: 0, inspiratif: 0, keren: 0 };
  const userRx = userReactions[karya.id] || {};

  const reactionCounts = {
    apresiasi: defaultReactions.apresiasi + (userRx.apresiasi ? 1 : 0),
    inspiratif: defaultReactions.inspiratif + (userRx.inspiratif ? 1 : 0),
    keren: defaultReactions.keren + (userRx.keren ? 1 : 0),
  };

  // Merge default and custom comments
  const defaultComments = karya.comments || [];
  const addedComments = customComments[karya.id] || [];
  const allComments = [...defaultComments, ...addedComments];

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    addComment(karya.id, commentInput);
    setCommentInput('');
  };

  const handleReplySubmit = (commentId) => {
    const text = replyInput[commentId];
    if (!text || !text.trim()) return;
    addReply(karya.id, commentId, text);
    setReplyInput((prev) => ({ ...prev, [commentId]: '' }));
    setActiveReplyId(null);
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      showToast('Tautan karya berhasil disalin!', 'info');
    }
  };

  return (
    <div className="min-h-screen py-10 sm:py-16 bg-batik-pattern">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* TOP BAR: BREADCRUMBS & PREV/NEXT NAVIGATION */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button
            onClick={() => router.push('/karya')}
            className="inline-flex items-center gap-2 text-xs font-bold text-terracotta-700 hover:text-terracotta-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Galeri Karya</span>
          </button>

          <div className="flex items-center gap-3">
            <Link
              href={`/karya/${prevKarya.id}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-ivory-300 bg-white hover:bg-ivory-100 text-xs font-semibold text-nusantara-charcoal"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Sebelumnya</span>
            </Link>
            <Link
              href={`/karya/${nextKarya.id}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-ivory-300 bg-white hover:bg-ivory-100 text-xs font-semibold text-nusantara-charcoal"
            >
              <span>Selanjutnya</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* MAIN SHOWCASE CONTAINER (2 COLUMNS) */}
        <div className="rounded-3xl border border-ivory-300 bg-white shadow-card overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* LEFT: IMAGE SHOWCASE & METRICS (7 COLS) */}
          <div className="lg:col-span-7 bg-[#1C1816] flex flex-col justify-between relative p-6 sm:p-8 text-white min-h-[420px]">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex-1 flex items-center justify-center bg-black/40">
              <img
                src={karya.image}
                alt={karya.title}
                className="max-h-[500px] w-full object-cover rounded-xl"
              />
            </div>

            {/* Impact badge */}
            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-amber-300 font-semibold">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>{karya.impact}</span>
              </div>
              <span className="text-ivory-300 text-[11px]">
                Karya {currentIndex + 1} dari {karyaData.length}
              </span>
            </div>
          </div>

          {/* RIGHT: STORY, CREATOR, REACTIONS & DISCUSSIONS (5 COLS) */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-white">
            <div className="space-y-5">
              {/* Category & Pillar */}
              <div className="flex items-center justify-between">
                <Badge variant="terracotta" size="xs">
                  {karya.category}
                </Badge>
                <Button variant="outline" size="xs" onClick={handleShare} leftIcon={<Share2 className="w-3.5 h-3.5" />}>
                  Bagikan
                </Button>
              </div>

              {/* Title */}
              <h1 className="text-xl sm:text-2xl font-bold font-display text-nusantara-charcoal leading-tight">
                {karya.title}
              </h1>

              {/* Creator Bio */}
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-ivory-100/80 border border-ivory-200">
                <img
                  src={karya.authorAvatar}
                  alt={karya.author}
                  className="w-10 h-10 rounded-full object-cover border border-ivory-300"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-nusantara-charcoal truncate">
                    {karya.author}
                  </h4>
                  <p className="text-[11px] text-nusantara-charcoalMuted truncate">
                    {karya.authorRole} • {karya.location}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-nusantara-charcoal leading-relaxed">
                {karya.description}
              </p>

              {/* Compound Reactions Bar */}
              <div className="p-3.5 rounded-2xl border border-ivory-200 bg-ivory-50/60 grid grid-cols-3 gap-2 text-center">
                <button
                  onClick={() => toggleReaction(karya.id, 'apresiasi')}
                  className={`p-2 rounded-xl transition-all flex flex-col items-center gap-1.5 ${
                    userRx.apresiasi
                      ? 'bg-amber-100 border border-amber-300 text-amber-900 font-bold scale-105'
                      : 'hover:bg-white text-nusantara-charcoal font-medium'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4 text-amber-600" />
                  <span className="text-[11px]">Apresiasi ({reactionCounts.apresiasi})</span>
                </button>

                <button
                  onClick={() => toggleReaction(karya.id, 'inspiratif')}
                  className={`p-2 rounded-xl transition-all flex flex-col items-center gap-1.5 ${
                    userRx.inspiratif
                      ? 'bg-amber-100 border border-amber-300 text-amber-900 font-bold scale-105'
                      : 'hover:bg-white text-nusantara-charcoal font-medium'
                  }`}
                >
                  <Lightbulb className="w-4 h-4 text-emerald-600" />
                  <span className="text-[11px]">Inspiratif ({reactionCounts.inspiratif})</span>
                </button>

                <button
                  onClick={() => toggleReaction(karya.id, 'keren')}
                  className={`p-2 rounded-xl transition-all flex flex-col items-center gap-1.5 ${
                    userRx.keren
                      ? 'bg-amber-100 border border-amber-300 text-amber-900 font-bold scale-105'
                      : 'hover:bg-white text-nusantara-charcoal font-medium'
                  }`}
                >
                  <Flame className="w-4 h-4 text-rose-600" />
                  <span className="text-[11px]">Keren ({reactionCounts.keren})</span>
                </button>
              </div>

              {/* Comments & Discussions */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-nusantara-charcoal">
                  Diskusi & Tanggapan ({allComments.length})
                </h4>

                <form onSubmit={handleCommentSubmit} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Tulis tanggapan apresiasimu..."
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border border-ivory-300 bg-white text-xs text-nusantara-charcoal focus:ring-2 focus:ring-terracotta-500 shadow-xs"
                  />
                  <Button type="submit" variant="primary" size="sm">
                    Kirim
                  </Button>
                </form>

                {/* Comment List */}
                <div className="max-h-64 overflow-y-auto space-y-3 pr-1 pt-2">
                  {allComments.map((cm) => (
                    <div key={cm.id} className="space-y-1.5 p-3 rounded-xl bg-ivory-50 border border-ivory-200">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-nusantara-charcoal">{cm.author}</span>
                        <span className="text-[10px] text-nusantara-charcoalMuted">{cm.timestamp}</span>
                      </div>
                      <p className="text-xs text-nusantara-charcoal">{cm.text}</p>

                      <button
                        onClick={() => setActiveReplyId(activeReplyId === cm.id ? null : cm.id)}
                        className="text-[10px] font-semibold text-terracotta-700 hover:text-terracotta-900"
                      >
                        {activeReplyId === cm.id ? 'Batal Balas' : 'Balas'}
                      </button>

                      {/* Reply input */}
                      {activeReplyId === cm.id && (
                        <div className="flex gap-2 pt-1 pl-3">
                          <input
                            type="text"
                            placeholder="Tulis balasan..."
                            value={replyInput[cm.id] || ''}
                            onChange={(e) => setReplyInput({ ...replyInput, [cm.id]: e.target.value })}
                            className="flex-1 px-2.5 py-1.5 rounded-lg border border-ivory-300 text-xs bg-white"
                          />
                          <Button size="xs" variant="primary" onClick={() => handleReplySubmit(cm.id)}>
                            Kirim
                          </Button>
                        </div>
                      )}

                      {/* Nested replies */}
                      {cm.replies?.map((r) => (
                        <div key={r.id} className="pl-4 pt-1 border-l-2 border-terracotta-300 mt-1 space-y-0.5">
                          <div className="flex items-center justify-between text-[11px] font-bold text-nusantara-charcoal">
                            <span>{r.author}</span>
                            <span className="text-[9px] text-nusantara-charcoalMuted font-normal">{r.timestamp}</span>
                          </div>
                          <p className="text-[11px] text-nusantara-charcoal">{r.text}</p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
