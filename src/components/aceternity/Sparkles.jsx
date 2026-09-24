'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * Sparkles component inspired by Aceternity UI Sparkles
 * Renders lightweight, ambient floating twinkling stars / sparks
 * around key badges and section titles.
 */
export default function Sparkles({
  count = 16,
  className = '',
  colors = ['#E64A27', '#F59E0B', '#10B981', '#CA3412'],
  minSize = 2,
  maxSize = 4,
}) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (maxSize - minSize) + minSize,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 2 + 1.5,
      delay: Math.random() * 2,
    }));
  }, [count, colors, minSize, maxSize]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none z-0 ${className}`}
    >
      {particles.map((p) => (
        <motion.span
          key={p.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.9, 0],
            scale: [0, 1.2, 0],
            y: [0, -15, -30],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '9999px',
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
}
