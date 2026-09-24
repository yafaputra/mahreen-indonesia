'use client';

import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * ScrollProgressRibbon: Nusantara-themed reading progress bar pinned at top of viewport.
 * Uses spring physics from motion.dev for organic tracking.
 */
export default function ScrollProgressRibbon() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[3px] z-[100] pointer-events-none select-none overflow-hidden"
    >
      <motion.div
        style={{ scaleX }}
        className="w-full h-full origin-left bg-terracotta-700 shadow-xs"
      />
    </div>
  );
}
