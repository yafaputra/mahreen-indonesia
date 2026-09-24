'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * ShimmerButton component from Aceternity UI
 * Creates an eye-catching CTA with an animated shimmering border/beam that travels around
 * the perimeter, giving it an undeniable premium focal point.
 */
export default function ShimmerButton({
  children,
  onClick,
  className = '',
  shimmerColor = '#ffffff',
  shimmerSize = '0.1em',
  borderRadius = '0px',
  shimmerDuration = '2.4s',
  background = '#C84B31',
  as = 'button',
  type = 'button',
  disabled = false,
  ...props
}) {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
      className={`group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap px-6 py-3 text-white font-semibold text-sm transition-all duration-300 rounded-none shadow-lg shadow-terracotta-600/25 hover:shadow-xl hover:shadow-terracotta-600/35 active:shadow-md disabled:pointer-events-none disabled:opacity-50 ${className}`}
      style={{
        '--radius': borderRadius,
        '--duration': shimmerDuration,
        '--shimmer-size': shimmerSize,
      }}
      {...props}
    >
      {/* 1. Spark / Shimmer Container */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-[100%] z-[-2] animate-shimmer-spin"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, ${shimmerColor} 60deg, transparent 120deg, transparent 360deg)`,
        }}
      />

      {/* 2. Inner Button Background Fill */}
      <div
        className="absolute inset-[1.5px] z-[-1] rounded-none transition-all duration-300 group-hover:brightness-105"
        style={{
          background: background,
          borderRadius: borderRadius,
        }}
      />

      {/* 3. Button Content */}
      <span className="relative z-10 flex items-center justify-center gap-2 font-bold tracking-wide">
        {children}
      </span>
    </motion.button>
  );
}
