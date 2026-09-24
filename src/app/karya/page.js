'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Image as ImageIcon,
  Heart,
  MessageSquare,
  ArrowRight,
  Filter,
  Flame,
  Lightbulb,
  ThumbsUp,
  Tag,
  ArrowUpDown,
  MapPin,
  Trophy,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import EmptyState from '@/components/ui/EmptyState';
import karyaData from '@/data/karya.json';
import { useMahreenStore } from '@/store/useMahreenStore';
import { Spotlight, BackgroundGrid, SparklesCore, CardSpotlight } from '@/components/aceternity';
import { StaggerContainer, StaggerItem, FadeInView } from '@/components/motion/MotionView';

export default function KaryaWallPage() {
  const [selectedCategory, setSelectedCategory] = useState('Semua'); // 'Semua' | 'Untuk UMKM' | 'Untuk Komunitas' | 'Untuk Daerah'
  const [sortBy, setSortBy] = useState('popular'); // 'popular' | 'latest' | 'recommended'

  // Store
  const userReactions = useMahreenStore((state) => state.userReactions);
  const toggleReaction = useMahreenStore((state) => state.toggleReaction);
  const customComments = useMahreenStore((state) => state.customComments);
  const characterProfile = useMahreenStore((state) => state.characterProfile);
  const showToast = useMahreenStore((state) => state.showToast);

  const categories = ['Semua', 'Untuk UMKM', 'Untuk Komunitas', 'Untuk Daerah'];

  // Calculate total reactions for sorting
  const getTotalReactions = (karya) => {
    const defaultTotal =
      (karya.reactions?.apresiasi || 0) +
      (karya.reactions?.inspiratif || 0) +
      (karya.reactions?.keren || 0);

    const userRx = userReactions[karya.id] || {};
    let added = 0;
    if (userRx.apresiasi) added++;
    if (userRx.inspiratif) added++;
    if (userRx.keren) added++;
    return defaultTotal + added;
  };

  // Filtered & Sorted Karya
  const processedKarya = useMemo(() => {
    let list = karyaData.filter((k) => {
      if (selectedCategory === 'Semua') return true;
      return k.category === selectedCategory;
    });

    if (sortBy === 'popular') {
      list.sort((a, b) => getTotalReactions(b) - getTotalReactions(a));
    } else if (sortBy === 'latest') {
      list.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
    } else if (sortBy === 'recommended') {
      // Prioritize matching user's quiz profile dominant pillar
      const userPillar = characterProfile?.dominantDimension || 'kreatif';
      list.sort((a, b) => {
        const aMatch = a.pillarId === userPillar ? 1 : 0;
        const bMatch = b.pillarId === userPillar ? 1 : 0;
        return bMatch - aMatch;
      });
    }

    return list;
  }, [selectedCategory, sortBy, userReactions, characterProfile]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 min-h-screen">
      {/* 1. HERO BANNER (CLEAN WHITE / AIRY AESTHETIC) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-200">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-terracotta-800 text-xs font-semibold border border-orange-200 shadow-xs">
            <ImageIcon className="w-3.5 h-3.5 text-terracotta-700" />
            <span>Tahap 2B: Galeri Etalase Bangsa</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-zinc-900 tracking-tight">
            Karya Wall: <br />
            <span className="text-terracotta-700">Jejak Nyata Pemuda.</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
            Eksplorasi mahakarya digital, inovasi IoT terapan, dan inisiatif sosial karya generasi muda untuk Indonesia. Berikan apresiasi dan bertukar ide.
          </p>
        </div>

        {/* Right side: Sorting dropdown & stats */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div className="p-3 rounded-2xl bg-zinc-50 border border-zinc-200 text-center min-w-[76px]">
            <div className="text-lg sm:text-xl font-bold font-display text-zinc-900">{karyaData.length}</div>
            <div className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Karya</div>
          </div>
          <div className="p-3 rounded-2xl bg-orange-50/60 border border-orange-200 text-center min-w-[76px]">
            <div className="text-lg sm:text-xl font-bold font-display text-terracotta-700">4.8k+</div>
            <div className="text-[10px] font-semibold text-terracotta-800 uppercase tracking-wider">Apresiasi</div>
          </div>

          <div className="flex items-center gap-2 bg-zinc-50 p-2 rounded-xl border border-zinc-200">
            <span className="text-xs text-zinc-600 font-medium flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-terracotta-600" /> Urutkan:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-zinc-300 bg-white text-xs font-semibold text-zinc-800 focus:ring-2 focus:ring-terracotta-500 focus:outline-none cursor-pointer"
            >
              <option value="popular">Terpopuler</option>
              <option value="latest">Terbaru</option>
              <option value="recommended">Rekomendasi Profil</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. CATEGORY PILLS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-terracotta-700 text-white shadow-xs'
                : 'bg-white text-nusantara-charcoal/80 border border-ivory-200 hover:bg-ivory-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3. KARYA GRID */}
      {processedKarya.length === 0 ? (
        <EmptyState
          title="Belum Ada Karya"
          description="Tidak ada karya dalam kategori ini saat ini."
        />
      ) : (
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {processedKarya.map((karya, index) => {
            const userRx = userReactions[karya.id] || {};
            const totalRx = getTotalReactions(karya);

            // Comments merge
            const allComments = [
              ...(customComments[karya.id] || []),
              ...(karya.comments || []),
            ];

            return (
              <StaggerItem key={karya.id}>
                <CardSpotlight className="!p-0 flex flex-col h-full group border-zinc-200/90 hover:border-terracotta-400 hover:shadow-md transition-all rounded-2xl overflow-hidden">
                  {/* Image Thumbnail with Link to /karya/[id] */}
                  <Link
                    href={`/karya/${karya.id}`}
                    className="relative h-52 w-full overflow-hidden bg-ivory-200 block"
                  >
                    <img
                      src={karya.image}
                      alt={karya.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    <Badge
                      variant={
                        karya.category === 'Untuk UMKM'
                          ? 'amber'
                          : karya.category === 'Untuk Daerah'
                          ? 'emerald'
                          : karya.category === 'Untuk Komunitas'
                          ? 'indigo'
                          : 'terracotta'
                      }
                      size="xs"
                      className="absolute top-3 left-3 shadow-xs"
                    >
                      {karya.category}
                    </Badge>

                    <span className="absolute top-3 right-3 text-[10px] font-semibold bg-zinc-900/75 backdrop-blur-md text-white px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-terracotta-400 flex-shrink-0" />
                      <span>{karya.creator.origin}</span>
                    </span>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[11px] font-bold bg-white/95 text-terracotta-800 border border-orange-200 shadow-sm px-2.5 py-1 rounded-full backdrop-blur-md inline-flex items-center gap-1.5">
                        <Trophy className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                        <span>{karya.impactMetric}</span>
                      </span>
                    </div>
                  </Link>

                  {/* Creator & Title Info */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      {/* Creator avatar & origin */}
                      <div className="flex items-center gap-3">
                        <img
                          src={karya.creator.avatar}
                          alt={karya.creator.name}
                          className="w-9 h-9 rounded-full object-cover border-2 border-orange-200"
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-nusantara-charcoal truncate">
                            {karya.creator.name}
                          </div>
                          <div className="text-[10px] text-terracotta-700 font-medium">
                            {karya.creator.origin}
                          </div>
                        </div>
                      </div>

                      <Link href={`/karya/${karya.id}`}>
                        <h3 className="text-base sm:text-lg font-bold text-nusantara-charcoal font-display group-hover:text-terracotta-700 transition-colors line-clamp-2">
                          {karya.title}
                        </h3>
                      </Link>
                      <p className="text-xs text-nusantara-charcoalMuted line-clamp-2 leading-relaxed">
                        {karya.summary}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {karya.tags?.slice(0, 3).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] px-2.5 py-0.5 rounded-full bg-orange-50/80 text-orange-900 border border-orange-200 font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Compound Reactions Bar & Comments Counter */}
                    <div className="pt-4 border-t border-ivory-100 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        {/* Compound reaction buttons */}
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => toggleReaction(karya.id, 'apresiasi')}
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-medium transition-all ${
                              userRx.apresiasi
                                ? 'bg-amber-100 text-amber-900 border border-amber-300 font-bold'
                                : 'bg-ivory-100 text-nusantara-charcoal hover:bg-ivory-200'
                            }`}
                            title="Apresiasi karya ini"
                          >
                            <ThumbsUp className="w-3.5 h-3.5 text-amber-600" />
                            <span>{(karya.reactions?.apresiasi || 0) + (userRx.apresiasi ? 1 : 0)}</span>
                          </button>

                          <button
                            onClick={() => toggleReaction(karya.id, 'inspiratif')}
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-medium transition-all ${
                              userRx.inspiratif
                                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold'
                                : 'bg-ivory-100 text-nusantara-charcoal hover:bg-ivory-200'
                            }`}
                            title="Karya sangat inspiratif"
                          >
                            <Lightbulb className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{(karya.reactions?.inspiratif || 0) + (userRx.inspiratif ? 1 : 0)}</span>
                          </button>

                          <button
                            onClick={() => toggleReaction(karya.id, 'keren')}
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-medium transition-all ${
                              userRx.keren
                                ? 'bg-rose-100 text-rose-900 border border-rose-300 font-bold'
                                : 'bg-ivory-100 text-nusantara-charcoal hover:bg-ivory-200'
                            }`}
                            title="Karya keren luar biasa"
                          >
                            <Flame className="w-3.5 h-3.5 text-rose-600" />
                            <span>{(karya.reactions?.keren || 0) + (userRx.keren ? 1 : 0)}</span>
                          </button>
                        </div>

                        {/* Comments & Detail link to dedicated page */}
                        <Link
                          href={`/karya/${karya.id}`}
                          className="flex items-center gap-1.5 text-xs text-nusantara-charcoalMuted hover:text-terracotta-700 transition-colors font-medium"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>{allComments.length}</span>
                          <span className="text-[11px] text-terracotta-700 ml-1">Detail →</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardSpotlight>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      )}
    </div>
  );
}
