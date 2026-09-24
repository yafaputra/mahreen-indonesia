'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * BackgroundLines component from Aceternity UI
 * Creates elegant, flowing vector lines across the canvas that pulse and flow.
 */
export function BackgroundLines({
  children,
  className = '',
  svgOptions = {},
}) {
  return (
    <div className={cn('relative w-full overflow-hidden', className)}>
      <SVG svgOptions={svgOptions} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

const SVG = ({ svgOptions }) => {
  const paths = [
    'M -400 120 Q 300 240 1000 60 T 2400 180',
    'M -400 240 Q 400 360 1200 160 T 2400 300',
    'M -400 360 Q 500 480 1400 260 T 2400 420',
    'M -400 480 Q 600 600 1600 360 T 2400 540',
  ];

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-0 h-full w-full select-none opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2000 600"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="aceternity-line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#643B17" stopOpacity="0" />
          <stop offset="30%" stopColor="#643B17" stopOpacity="0.3" />
          <stop offset="60%" stopColor="#E64A27" stopOpacity="0.4" />
          <stop offset="85%" stopColor="#F59E0B" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#18181B" stopOpacity="0" />
        </linearGradient>
      </defs>

      {paths.map((path, idx) => (
        <motion.path
          key={idx}
          d={path}
          stroke="url(#aceternity-line-gradient)"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathOffset: 0 }}
          animate={{ pathOffset: [0, 1] }}
          transition={{
            duration: 16 + idx * 4,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </svg>
  );
};

export default BackgroundLines;
