'use client';

import React from 'react';

/**
 * BackgroundGrid component from Aceternity UI
 * Creates a subtle architectural grid or dot matrix with a radial gradient mask
 * that fades smoothly towards the edges, giving depth without visual noise.
 */
export default function BackgroundGrid({
  children,
  className = '',
  pattern = 'dots', // 'dots' | 'grid'
  dotColor = 'rgba(230, 74, 39, 0.08)',
  fadeColor = 'white',
}) {
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {/* Pattern Layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 select-none"
        style={{
          backgroundImage:
            pattern === 'dots'
              ? `radial-gradient(${dotColor} 1.25px, transparent 1.25px)`
              : `linear-gradient(to right, ${dotColor} 1px, transparent 1px), linear-gradient(to bottom, ${dotColor} 1px, transparent 1px)`,
          backgroundSize: pattern === 'dots' ? '24px 24px' : '40px 40px',
          maskImage:
            'radial-gradient(ellipse 65% 55% at 50% 45%, black 25%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 65% 55% at 50% 45%, black 25%, transparent 75%)',
        }}
      />

      {/* Foreground Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
