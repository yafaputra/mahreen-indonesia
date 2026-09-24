'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * AmbientNusantaraGlow: Soft, continuous, breathing gradient orbs floating in the background.
 * Creates an organic, living atmosphere (warm terracotta, golden amber, deep emerald)
 * without interfering with readability or interactions.
 */
export default function AmbientNusantaraGlow() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* 1. Warm Terracotta Orb (Top Left / Center) */}
      <motion.div
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -35, 20, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-32 -left-32 w-96 h-96 sm:w-[480px] sm:h-[480px] rounded-full bg-gradient-to-br from-terracotta-400/10 via-orange-400/5 to-transparent blur-3xl"
      />

      {/* 2. Golden Amber Solar Orb (Top Right) */}
      <motion.div
        animate={{
          x: [0, -45, 25, 0],
          y: [0, 30, -30, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute top-1/4 -right-32 w-80 h-80 sm:w-[420px] sm:h-[420px] rounded-full bg-gradient-to-bl from-amber-400/10 via-yellow-400/5 to-transparent blur-3xl"
      />

      {/* 3. Deep Emerald Forest Orb (Center / Bottom Left) */}
      <motion.div
        animate={{
          x: [0, 30, -35, 0],
          y: [0, -25, 35, 0],
          scale: [1, 1.1, 0.92, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute top-2/3 -left-20 w-88 h-88 sm:w-[440px] sm:h-[440px] rounded-full bg-gradient-to-tr from-emerald-500/8 via-teal-400/4 to-transparent blur-3xl"
      />

      {/* 4. Subtle Violet Royal Orb (Bottom Right) */}
      <motion.div
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 35, -25, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 3,
        }}
        className="absolute -bottom-32 right-1/4 w-80 h-80 sm:w-[400px] sm:h-[400px] rounded-full bg-gradient-to-tl from-terracotta-500/6 via-purple-400/4 to-transparent blur-3xl"
      />
    </div>
  );
}
