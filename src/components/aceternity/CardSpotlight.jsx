'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * CardSpotlight component from Aceternity UI
 * Creates an interactive card where a soft radial glow follows the user's cursor.
 * Elevated with smooth spring hover (y: -4) and NO image zooming.
 */
export default function CardSpotlight({
  children,
  className = '',
  spotlightColor = 'rgba(230, 74, 39, 0.12)',
  spotlightSize = 320,
  borderColor = 'rgba(230, 74, 39, 0.25)',
  onClick,
  ...props
}) {
  const cardRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 350, damping: 22 }}
      className={`group relative overflow-hidden rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:border-terracotta-300/80 hover:shadow-lg hover:shadow-terracotta-600/5 ${onClick ? 'cursor-pointer' : ''} ${className}`}
      {...props}
    >
      {/* Dynamic Cursor Spotlight Beam */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(${spotlightSize}px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />

      {/* Dynamic Border Glow Beam */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 z-0"
        style={{
          opacity,
          border: `1.5px solid ${borderColor}`,
          maskImage: `radial-gradient(${spotlightSize * 0.75}px circle at ${position.x}px ${position.y}px, black, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(${spotlightSize * 0.75}px circle at ${position.x}px ${position.y}px, black, transparent 100%)`,
        }}
      />

      {/* Content Container */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
