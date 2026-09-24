'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import CommandPalette from '@/components/layout/CommandPalette';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const navRef = useRef(null);

  // Dynamic Reading Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/internship', label: 'Magang' },
    { href: '/programs', label: 'Program' },
    { href: '/newsroom', label: 'Event' },
    { href: '/alumni', label: 'Alumni' },
    { href: '/partnership', label: 'Kemitraan' },
    { href: '/jejaring', label: 'Jejaring' },
  ];

  return (
    <header
      ref={navRef}
      className={`sticky top-0 z-40 transition-all duration-200 bg-white border-b border-zinc-200 ${
        isScrolled ? 'shadow-xs py-3' : 'py-3.5 sm:py-4'
      }`}
    >
      {/* Scroll Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-zinc-200" />
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2.5px] bg-zinc-900 origin-left z-50 pointer-events-none"
        style={{ scaleX }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* BRAND LOGO */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <img
            src="/images/logo-mahreen.png"
            alt="Logo Mahreen Indonesia"
            className="h-9 sm:h-10 w-auto object-contain group-hover:scale-105 transition-transform"
          />
          <div className="flex items-center gap-1.5">
            <span className="font-display font-bold text-lg tracking-tight text-zinc-900 group-hover:text-black transition-colors">
              MAHREEN INDONESIA
            </span>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
          {navLinks.map((link) => {
            const isActive =
              link.href === '/'
                ? pathname === '/'
                : pathname.startsWith(link.href) && !link.href.includes('#');

            return (
              <Link
                key={link.label}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-md text-xs xl:text-sm font-semibold transition-all duration-150 ${
                  isActive
                    ? 'text-zinc-950 bg-zinc-100 border border-zinc-300/80 shadow-2xs font-bold'
                    : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/70'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* MOBILE HAMBURGER BUTTON */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-zinc-700 hover:bg-zinc-100 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-b border-zinc-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-md overflow-hidden"
          >
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-semibold text-zinc-800 hover:bg-zinc-100 hover:text-black transition-colors"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-zinc-400" />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Command Palette (Ctrl + K) */}
      <CommandPalette isOpen={commandPaletteOpen} setIsOpen={setCommandPaletteOpen} />
    </header>
  );
}
