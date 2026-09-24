'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, RotateCcw, Send } from 'lucide-react';
import { FaInstagram, FaTiktok, FaLinkedinIn, FaYoutube, FaWhatsapp, FaGithub } from 'react-icons/fa6';
import { BatikKawungIcon } from '@/components/icons/NusantaraIcons';
import { useMahreenStore } from '@/store/useMahreenStore';
import Button from '@/components/ui/Button';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const resetAllData = useMahreenStore((state) => state.resetAllData);
  const showToast = useMahreenStore((state) => state.showToast);

  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/internship', label: 'Magang' },
    { href: '/programs', label: 'Program' },
    { href: '/newsroom', label: 'Event' },
    { href: '/partnership', label: 'Kemitraan' },
    { href: '/jejaring', label: 'Jejaring' },
  ];

  const quickLinks = [
    { href: '/quiz', label: 'Quiz Karakter' },
    { href: '/karya', label: 'Galeri Karya' },
    { href: '/map', label: 'Peta Sebaran' },
    { href: '/paspor', label: 'Verifikasi Sertifikat' },
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Masukkan alamat email yang valid', 'info');
      return;
    }
    setSubscribed(true);
    showToast('Terima kasih telah bergabung dalam lingkar kabar Mahreen!', 'success');
  };

  const handleReset = () => {
    if (window.confirm('Apakah kamu yakin ingin mereset seluruh data simulasi (kuis, lencana, bookmark, reaksi) ke pengaturan awal?')) {
      resetAllData();
    }
  };

  return (
    <footer className="bg-white text-zinc-900 pt-16 pb-12 border-t border-zinc-200 mt-20 relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-zinc-200">
          {/* Brand & Manifesto */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <img
                src="/images/logo-mahreen.png"
                alt="Logo Mahreen Indonesia"
                className="h-10 sm:h-11 w-auto object-contain"
              />
              <div>
                <span className="font-display font-black text-xl text-zinc-900 tracking-tight block">
                  MAHREEN INDONESIA
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-sm">
              Memberdayakan bisnis, mahasiswa, komunitas, dan organisasi melalui kreativitas, teknologi, pendidikan, dan kolaborasi yang bermakna. Building Ideas. Creating Impact.
            </p>
            <div className="pt-2 flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-50 border border-zinc-200 text-xs text-zinc-700 w-fit">
                <BatikKawungIcon className="w-3.5 h-3.5 text-terracotta-700" />
                <span>Ekosistem Berkarya untuk Indonesia</span>
              </div>
              {/* Media Sosial dengan react-icons */}
              <div className="flex items-center gap-2 pt-1">
                <a
                  href="https://www.instagram.com/mahreenindonesia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 hover:text-white hover:bg-terracotta-700 hover:border-terracotta-700 transition-colors shadow-2xs"
                  aria-label="Instagram Mahreen"
                >
                  <FaInstagram className="w-4 h-4" />
                </a>
                <a
                  href="https://www.tiktok.com/@mahreenindonesia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 hover:text-white hover:bg-terracotta-700 hover:border-terracotta-700 transition-colors shadow-2xs"
                  aria-label="TikTok Mahreen"
                >
                  <FaTiktok className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 hover:text-white hover:bg-terracotta-700 hover:border-terracotta-700 transition-colors shadow-2xs"
                  aria-label="LinkedIn Mahreen"
                >
                  <FaLinkedinIn className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://www.youtube.com/@officialmahreenindonesia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 hover:text-white hover:bg-terracotta-700 hover:border-terracotta-700 transition-colors shadow-2xs"
                  aria-label="YouTube Mahreen"
                >
                  <FaYoutube className="w-4 h-4" />
                </a>
                <a
                  href="https://wa.me/6289652647385"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 hover:text-white hover:bg-terracotta-700 hover:border-terracotta-700 transition-colors shadow-2xs"
                  aria-label="WhatsApp Mahreen"
                >
                  <FaWhatsapp className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Navbar Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 font-sans">
              Navigasi
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-600">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-terracotta-700 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Access */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 font-sans">
              Akses Cepat
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-600">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-terracotta-700 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / Lingkar Sinergi */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 font-sans">
              Lingkar Sinergi
            </h4>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Dapatkan kurasi program hibah, inkubasi UMKM, dan peluang kolaborasi bulanan.
            </p>
            {subscribed ? (
              <p className="text-xs text-emerald-700 font-medium">
                ✓ Kamu telah tergabung dalam lingkar kabar!
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="email@kamu.id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-zinc-300 focus:outline-none focus:ring-1 focus:ring-terracotta-500 text-zinc-900 placeholder:text-zinc-400"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 p-1 rounded-lg bg-terracotta-700 hover:bg-terracotta-800 text-white transition-colors cursor-pointer"
                    aria-label="Kirim"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Reset Simulator */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-1.5 text-center sm:text-left">
            <span>Ditenagai oleh semangat</span>
            <Heart className="w-3.5 h-3.5 text-terracotta-600 fill-terracotta-600 inline" />
            <span>Mahreen Indonesia</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-terracotta-700 transition-colors p-1 cursor-pointer"
              title="Reset data kuis, lencana, dan bookmark di localStorage"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Data Demo</span>
            </button>
            <span>© {new Date().getFullYear()} MAHREEN INDONESIA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
