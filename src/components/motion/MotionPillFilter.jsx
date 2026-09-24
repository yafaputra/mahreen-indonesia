'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * MotionPillFilter:
 * Ultra-smooth sliding active pill indicator powered by Framer Motion layoutId.
 * Iconic signature seen across motion.dev and modern design engineering sites.
 */
export default function MotionPillFilter({
  items = [],
  activeId,
  onChange,
  layoutId = 'motionPillIndicator',
  className = '',
  pillClassName = '',
}) {
  return (
    <div className={`flex flex-wrap items-center gap-1.5 p-1 rounded-lg bg-zinc-100 border border-zinc-200/80 ${className}`}>
      {items.map((item) => {
        const isActive = activeId === item.id;
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className={`relative px-3.5 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors duration-150 cursor-pointer select-none ${
              isActive
                ? 'text-white font-bold'
                : 'text-zinc-600 hover:text-black hover:bg-zinc-200/50'
            } ${pillClassName}`}
          >
            {isActive && (
              <motion.div
                layoutId={layoutId}
                className="absolute inset-0 rounded-md bg-black shadow-xs"
                transition={{
                  type: 'spring',
                  stiffness: 460,
                  damping: 32,
                }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              {Icon && <Icon className="w-3.5 h-3.5" />}
              <span>{item.label}</span>
              {item.count !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                    isActive ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-200 text-zinc-600'
                  }`}
                >
                  {item.count}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
