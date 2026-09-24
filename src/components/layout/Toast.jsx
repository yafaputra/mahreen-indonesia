'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import { useMahreenStore } from '@/store/useMahreenStore';

export default function Toast() {
  const activeToast = useMahreenStore((state) => state.activeToast);
  const clearToast = useMahreenStore((state) => state.clearToast);

  useEffect(() => {
    if (!activeToast) return;
    const timer = setTimeout(() => {
      clearToast();
    }, 3500);
    return () => clearTimeout(timer);
  }, [activeToast, clearToast]);

  if (!activeToast) return null;

  const iconMap = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
    info: <Info className="w-5 h-5 text-terracotta-600 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
  };

  const borderMap = {
    success: 'border-emerald-300 bg-white text-emerald-950',
    info: 'border-terracotta-300 bg-white text-nusantara-charcoal',
    warning: 'border-amber-300 bg-white text-amber-950',
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none max-w-sm w-full px-4 sm:px-0">
      <AnimatePresence>
        <motion.div
          key={activeToast.id}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-2xl border shadow-lg ${
            borderMap[activeToast.type] || borderMap.info
          }`}
        >
          <div className="flex items-center gap-3">
            {iconMap[activeToast.type] || iconMap.info}
            <p className="text-xs sm:text-sm font-medium leading-snug">
              {activeToast.message}
            </p>
          </div>
          <button
            onClick={clearToast}
            className="p-1 text-nusantara-charcoalMuted hover:text-nusantara-charcoal rounded-lg hover:bg-ivory-100 transition-colors shrink-0"
            aria-label="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
