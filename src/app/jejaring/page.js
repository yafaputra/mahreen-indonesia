'use client';

import React from 'react';
import { Globe2 } from 'lucide-react';
import IndonesiaMapSection from '@/components/home/IndonesiaMapSection';

export default function JejaringPage() {
  return (
    <div className="space-y-10 sm:space-y-12 pb-20 bg-white min-h-screen">
      {/* 1. TOP HEADER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-200">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-100 text-zinc-900 text-xs font-semibold border border-zinc-200 shadow-2xs font-mono">
              <Globe2 className="w-3.5 h-3.5 text-zinc-900" />
              <span>Jejaring Nasional • 34 Provinsi Terkoneksi</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-zinc-900 tracking-tight leading-tight">
              Peta Sebaran &amp; <br />
              <span className="text-terracotta-700">Sentra Gotong Royong Mahreen.</span>
            </h1>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
              Jelajahi sentra pendampingan UMKM, laboratorium riset IoT tepat guna, dan ekspedisi pemuda di 34 provinsi Nusantara secara interaktif.
            </p>
          </div>

          {/* Quick Summary Badges */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="p-3 sm:px-4 rounded-xl bg-white border border-zinc-200 text-center min-w-[84px] shadow-2xs">
              <div className="text-xl sm:text-2xl font-bold font-display text-zinc-900">34</div>
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mt-0.5">Provinsi</div>
            </div>
            <div className="p-3 sm:px-4 rounded-xl bg-white border border-zinc-200 text-center min-w-[84px] shadow-2xs">
              <div className="text-xl sm:text-2xl font-bold font-display text-terracotta-700">127+</div>
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mt-0.5">UMKM Binaan</div>
            </div>
            <div className="p-3 sm:px-4 rounded-xl bg-white border border-zinc-200 text-center min-w-[84px] shadow-2xs">
              <div className="text-xl sm:text-2xl font-bold font-display text-zinc-900">5.240+</div>
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mt-0.5">Talenta</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PETA SEBARAN NUSANTARA (INTERACTIVE MAP SECTION) */}
      <IndonesiaMapSection />
    </div>
  );
}
