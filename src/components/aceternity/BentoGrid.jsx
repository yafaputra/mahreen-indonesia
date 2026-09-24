'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * BentoGrid & BentoGridItem components from Aceternity UI
 * Creates a modern, high-contrast asymmetrical grid layout with subtle borders,
 * soft gradient backdrops, and elegant hover physics.
 */
export function BentoGrid({ className = '', children }) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto ${className}`}
    >
      {children}
    </div>
  );
}

export function BentoGridItem({
  className = '',
  title,
  description,
  header,
  icon,
  badge,
  badgeColor = 'bg-terracotta-100 text-terracotta-800 border-terracotta-200',
  accentColor = '#E64A27',
  onClick,
  children,
}) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 350, damping: 22 }}
      className={`row-span-1 rounded-3xl group/bento transition duration-300 shadow-sm border border-zinc-200/90 bg-white p-6 justify-between flex flex-col space-y-4 hover:border-terracotta-300 hover:shadow-xl hover:shadow-terracotta-900/5 relative overflow-hidden ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Subtle Top-Corner Accent Light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl opacity-15 transition-opacity duration-300 group-hover/bento:opacity-30"
        style={{ backgroundColor: accentColor }}
      />

      {/* Header visual or component */}
      {header && <div className="relative z-10 w-full">{header}</div>}

      {/* Content */}
      <div className="relative z-10 transition duration-200">
        <div className="flex items-center justify-between gap-2 mb-2">
          {icon && (
            <div className="w-10 h-10 rounded-2xl bg-zinc-50 border border-zinc-200/80 flex items-center justify-center text-zinc-800 transition-colors group-hover/bento:border-terracotta-300 group-hover/bento:text-terracotta-600">
              {icon}
            </div>
          )}
          {badge && (
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border tracking-wider uppercase ${badgeColor}`}
            >
              {badge}
            </span>
          )}
        </div>

        {title && (
          <h3 className="font-display font-bold text-zinc-900 text-lg sm:text-xl group-hover/bento:text-terracotta-700 transition-colors">
            {title}
          </h3>
        )}

        {description && (
          <p className="font-normal text-zinc-600 text-xs sm:text-sm mt-1.5 leading-relaxed">
            {description}
          </p>
        )}

        {children}
      </div>
    </motion.div>
  );
}
