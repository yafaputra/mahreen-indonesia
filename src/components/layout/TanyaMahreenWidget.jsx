'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Send,
  Compass,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  Bot,
  Zap,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import Badge from '@/components/ui/Badge';

const PRESET_PROMPTS = [
  'Saya anak IT peduli lingkungan, harus mulai dari mana?',
  'Saya desainer grafis ingin bantu branding UMKM makanan.',
  'Saya ingin cari rekan tim / co-founder proyek baru.',
  'Saya pegiat sosial butuh bimbingan mentor praktisi.',
  'Saya pemula ingin belajar & dapat sertifikat resmi.',
];

function analyzeQuery(text) {
  const q = text.toLowerCase();

  if (
    q.includes('it') ||
    q.includes('koding') ||
    q.includes('coding') ||
    q.includes('software') ||
    q.includes('iot') ||
    q.includes('teknologi') ||
    q.includes('lingkungan') ||
    q.includes('hijau') ||
    q.includes('iklim')
  ) {
    return {
      title: 'Jalur Pengembangan Teknologi & Riset Terapan',
      summary: 'Keahlian teknologimu sangat dibutuhkan dalam pengembangan sistem digital, web development, dan inovasi terapan.',
      steps: [
        {
          no: 1,
          action: 'Lihat lowongan magang Web & IT Development di program Magang Batch 2.',
          link: '/internship',
          linkText: 'Lihat Lowongan Magang IT',
        },
        {
          no: 2,
          action: 'Ikuti Quiz Karakter Pemuda untuk memetakan kekuatan analisismu.',
          link: '/quiz',
          linkText: 'Mulai Quiz Karakter',
        },
        {
          no: 3,
          action: 'Eksplorasi portofolio teknologi dan studi kasus nyata di Galeri Karya.',
          link: '/karya',
          linkText: 'Buka Galeri Karya',
        },
      ],
    };
  }

  if (
    q.includes('desain') ||
    q.includes('grafis') ||
    q.includes('branding') ||
    q.includes('wastra') ||
    q.includes('kriya') ||
    q.includes('umkm') ||
    q.includes('makanan') ||
    q.includes('kuliner') ||
    q.includes('produk') ||
    q.includes('kemasan')
  ) {
    return {
      title: 'Jalur Akselerasi Desain & Re-Branding Mahreen Studio',
      summary: 'Sentuhan visual dan packaging modern darimu mampu melipatgandakan nilai jual produk dan brand lokal.',
      steps: [
        {
          no: 1,
          action: 'Daftar sebagai Graphic Designer atau Creative Content Creator di program Magang Mahreen.',
          link: '/internship',
          linkText: 'Daftar Magang Desain',
        },
        {
          no: 2,
          action: 'Telusuri inspirasi etalase desain dan portofolio visual di Galeri Karya.',
          link: '/karya',
          linkText: 'Lihat Portofolio Karya',
        },
        {
          no: 3,
          action: 'Ikuti workshop dan masterclass desain grafis di Newsroom Event.',
          link: '/newsroom',
          linkText: 'Jadwal Masterclass Desain',
        },
      ],
    };
  }

  if (
    q.includes('magang') ||
    q.includes('intern') ||
    q.includes('karier') ||
    q.includes('kerja') ||
    q.includes('cv') ||
    q.includes('portofolio')
  ) {
    return {
      title: 'Jalur Rekrutmen Magang Proyek Nyata Batch 2',
      summary: 'Bergabunglah bersama Mahreen Indonesia dengan pilihan kerja Remote, On-site Cimahi, atau Hybrid.',
      steps: [
        {
          no: 1,
          action: 'Pelajari deskripsi 6 posisi divisi kerja dan kualifikasi yang dibuka.',
          link: '/internship',
          linkText: 'Lihat Posisi Magang',
        },
        {
          no: 2,
          action: 'Pilih posisi magang dan konsultasikan portofoliomu bersama tim Talent Acquisition.',
          link: '/internship#posisi-magang',
          linkText: 'Pilih Posisi Magang',
        },
        {
          no: 3,
          action: 'Dapatkan verifikasi resmi keikutsertaan di Paspor Digital Mahreen.',
          link: '/paspor',
          linkText: 'Buka Paspor Digital',
        },
      ],
    };
  }

  if (
    q.includes('mitra') ||
    q.includes('kampus') ||
    q.includes('csr') ||
    q.includes('kerjasama') ||
    q.includes('kemitraan') ||
    q.includes('sponsor') ||
    q.includes('institusi')
  ) {
    return {
      title: 'Jalur Kemitraan Kampus, Korporasi & CSR',
      summary: 'Bangun kolaborasi bermakna bersama Mahreen Indonesia untuk pemberdayaan generasi muda.',
      steps: [
        {
          no: 1,
          action: 'Pelajari opsi MoU kemitraan kampus, program CSR korporasi, dan sinergi UMKM.',
          link: '/partnership',
          linkText: 'Portal Kemitraan Mahreen',
        },
        {
          no: 2,
          action: 'Ajukan proposal kemitraan langsung melalui formulir kontak MoU resmi.',
          link: '/partnership#proposal',
          linkText: 'Ajukan Kerjasama',
        },
        {
          no: 3,
          action: 'Lihat agenda kolaborasi dan event sinergi di Newsroom Mahreen.',
          link: '/newsroom',
          linkText: 'Agenda Newsroom',
        },
      ],
    };
  }

  if (
    q.includes('sertifikat') ||
    q.includes('paspor') ||
    q.includes('belajar') ||
    q.includes('pemula') ||
    q.includes('kursus') ||
    q.includes('bootcamp')
  ) {
    return {
      title: 'Jalur Sertifikasi Resmi & Pengembangan Talenta',
      summary: 'Mulai dari pemula dan bangun kredibilitas resmi yang diakui instansi nasional dan ekosistem industri.',
      steps: [
        {
          no: 1,
          action: 'Buka Paspor Digital untuk melihat sertifikat kelayakan dan status verifikasi akunmu.',
          link: '/paspor',
          linkText: 'Buka Paspor Digital',
        },
        {
          no: 2,
          action: 'Daftar ke pelatihan intensif dan program inkubasi di Katalog Program.',
          link: '/programs',
          linkText: 'Katalog Program Mahreen',
        },
        {
          no: 3,
          action: 'Ikuti Quiz Karakter untuk mendapatkan rekomendasi jalur belajar yang tepat.',
          link: '/quiz',
          linkText: 'Mulai Quiz Karakter',
        },
      ],
    };
  }

  // Fallback for general queries
  return {
    title: 'Panduan Ekosistem Mahreen Indonesia',
    summary: 'Berikut 3 langkah awal paling direkomendasikan untuk menjelajahi ekosistem Mahreen:',
    steps: [
      {
        no: 1,
        action: 'Temukan karakter kontribusi dan minat kariermu melalui Onboarding Quiz.',
        link: '/quiz',
        linkText: 'Mulai Onboarding Quiz',
      },
      {
        no: 2,
        action: 'Telusuri lowongan magang proyek nyata di program Magang Mahreen Batch 2.',
        link: '/internship',
        linkText: 'Buka Info Magang',
      },
      {
        no: 3,
        action: 'Jelajahi kalender agenda kegiatan dan masterclass di Newsroom.',
        link: '/newsroom',
        linkText: 'Buka Newsroom Event',
      },
    ],
  };
}

export default function TanyaMahreenWidget() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Salam Juang! 👋 Bingung harus mulai dari mana di antara banyaknya program Mahreen Indonesia? Tuliskan keahlian, minat, atau masalah yang ingin kamu selesaikan—saya petakan 3 langkah aksi terarah untukmu dalam 10 detik!',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate smart quick reasoning
    setTimeout(() => {
      const recommendation = analyzeQuery(text);
      const assistantMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: `Berdasarkan situasimu, ini rekomendasi 3 langkah aksi paling presisi untukmu:`,
        recommendation,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 700);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'assistant',
        text: 'Salam Juang! 👋 Bingung harus mulai dari mana di antara banyaknya program Mahreen Indonesia? Tuliskan keahlian, minat, atau masalah yang ingin kamu selesaikan—saya petakan 3 langkah aksi terarah untukmu dalam 10 detik!',
      },
    ]);
  };

  if (!mounted) return null;

  return (
    <>
      {/* 1. FLOATING PILL BUTTON (Bottom Right Corner) */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-terracotta-600 hover:bg-terracotta-700 text-white font-semibold text-xs sm:text-sm shadow-xl transition-all hover:scale-105 active:scale-95 group border-2 border-white"
              title="Tanya Mahreen (AI Navigator 10 Detik)"
            >
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                <Compass className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              </div>
              <span className="font-display tracking-tight">Tanya Mahreen</span>
              <span className="text-[10px] bg-amber-400 text-nusantara-charcoal font-bold px-1.5 py-0.5 rounded-full">
                AI Navigator
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* 2. CHAT DRAWER / DIALOG MODAL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[85vh] sm:max-h-[620px] bg-white rounded-3xl border border-ivory-300 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-terracotta-600 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm font-display tracking-tight">
                      Tanya Mahreen AI
                    </span>
                    <span className="text-[9px] bg-emerald-500 text-white font-bold px-1.5 py-0.2 rounded-full">
                      Aktif
                    </span>
                  </div>
                  <p className="text-[10px] text-ivory-200">
                    Navigator 10 Detik • Panduan Program Talenta 34 Provinsi
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleResetChat}
                  className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                  title="Reset Percakapan"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                  title="Tutup Navigator"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-ivory-50/60">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-terracotta-600 text-white rounded-br-xs'
                        : 'bg-white border border-ivory-200 text-nusantara-charcoal shadow-xs rounded-bl-xs'
                    }`}
                  >
                    <p>{m.text}</p>

                    {/* Recommendation Card */}
                    {m.recommendation && (
                      <div className="mt-3 pt-3 border-t border-ivory-200 space-y-3">
                        <div className="inline-flex items-center gap-1 text-[11px] font-bold text-terracotta-800">
                          <Compass className="w-3.5 h-3.5 text-terracotta-700" />
                          <span>{m.recommendation.title}</span>
                        </div>
                        <p className="text-[11px] text-nusantara-charcoalMuted">
                          {m.recommendation.summary}
                        </p>

                        {/* 3 Action Steps */}
                        <div className="space-y-2">
                          {m.recommendation.steps.map((st) => (
                            <div
                              key={st.no}
                              className="p-2.5 rounded-xl bg-ivory-50 border border-ivory-200 space-y-1.5"
                            >
                              <div className="flex items-start gap-2">
                                <span className="w-4 h-4 rounded-full bg-terracotta-100 text-terracotta-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                  {st.no}
                                </span>
                                <p className="text-[11px] text-nusantara-charcoal leading-snug">
                                  {st.action}
                                </p>
                              </div>
                              <div className="pl-6">
                                <Link
                                  href={st.link}
                                  onClick={() => setIsOpen(false)}
                                  className="inline-flex items-center gap-1 text-[10px] font-bold text-terracotta-700 hover:text-terracotta-900 group"
                                >
                                  <span>{st.linkText}</span>
                                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-white border border-ivory-200 w-max text-xs text-nusantara-charcoalMuted">
                  <Compass className="w-3.5 h-3.5 text-terracotta-600 animate-spin" />
                  <span>Menganalisis ekosistem & memetakan program...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts Suggestions */}
            <div className="px-3 py-2 bg-white border-t border-ivory-200">
              <span className="text-[10px] uppercase font-bold tracking-wider text-nusantara-charcoalMuted px-1">
                Pilihan Cepat:
              </span>
              <div className="flex gap-1.5 overflow-x-auto py-1.5 no-scrollbar">
                {PRESET_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(prompt)}
                    className="shrink-0 px-2.5 py-1 rounded-lg bg-ivory-100 hover:bg-terracotta-50 hover:text-terracotta-800 text-[11px] text-nusantara-charcoal font-medium border border-ivory-200 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white border-t border-ivory-200 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ketik keahlian atau masalahmu..."
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-ivory-300 focus:outline-none focus:border-terracotta-500 text-xs text-nusantara-charcoal placeholder:text-nusantara-charcoalMuted bg-ivory-50/50"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="p-2.5 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 disabled:opacity-50 text-white transition-colors"
                title="Kirim Pertanyaan"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
