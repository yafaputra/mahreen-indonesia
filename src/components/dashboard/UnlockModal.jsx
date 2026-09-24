'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useMahreenStore } from '@/store/useMahreenStore';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

export default function UnlockModal() {
  const latestUnlockedBadge = useMahreenStore((state) => state.latestUnlockedBadge);
  const dismissLatestBadge = useMahreenStore((state) => state.dismissLatestBadge);

  useEffect(() => {
    if (latestUnlockedBadge) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C84B31', '#D97706', '#059669', '#DE836E'],
        });
      } catch (err) {
        // graceful ignore if window/canvas not ready
      }
    }
  }, [latestUnlockedBadge]);

  if (!latestUnlockedBadge) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={dismissLatestBadge}
          className="fixed inset-0 bg-nusantara-charcoal/70 backdrop-blur-md"
        />

        {/* Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 text-center border border-ivory-300 shadow-card z-10 overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={dismissLatestBadge}
            className="absolute top-4 right-4 p-2 text-nusantara-charcoalMuted hover:text-nusantara-charcoal rounded-lg hover:bg-ivory-100 transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Trophy Icon */}
          <div className="mx-auto w-16 h-16 rounded-xl bg-terracotta-700 flex items-center justify-center text-white shadow-subtle mb-4">
            <Trophy className="w-8 h-8" />
          </div>

          <Badge variant="terracotta" size="sm" className="mb-2.5">
            Lencana Baru Terbuka
          </Badge>

          <h3 className="text-2xl font-black text-nusantara-charcoal font-display tracking-tight mb-2">
            {latestUnlockedBadge.name}
          </h3>

          <div className="inline-block px-2.5 py-0.5 rounded-full bg-ivory-100 text-xs font-semibold text-terracotta-800 border border-ivory-300 mb-3">
            Tingkat {latestUnlockedBadge.tier}
          </div>

          <p className="text-sm text-nusantara-charcoalMuted leading-relaxed mb-6">
            {latestUnlockedBadge.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-2.5">
            <Button
              onClick={dismissLatestBadge}
              variant="secondary"
              size="md"
              className="w-full sm:w-1/2"
            >
              Lanjutkan Aksi
            </Button>
            <Link href="/paspor" onClick={dismissLatestBadge} className="w-full sm:w-1/2">
              <Button
                variant="primary"
                size="md"
                className="w-full"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Lihat di Paspor Digital
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
