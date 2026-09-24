'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  shape = 'default', // 'default' (rounded-md 6px) | 'none' (sharp) | 'full' (pill)
  className = '',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  onClick,
  type = 'button',
  ...props
}) {
  const shapes = {
    default: 'rounded-md',
    none: 'rounded-none',
    full: 'rounded-full',
  };

  const baseStyles = cn(
    'inline-flex items-center justify-center font-bold tracking-tight transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none group',
    shapes[shape] || shapes.default
  );

  const variants = {
    // Dual Style (Motion.dev Monochrome High-Contrast)
    primary:
      'bg-zinc-900 hover:bg-black text-white border border-zinc-900 shadow-xs hover:shadow-md focus:ring-zinc-950 active:bg-zinc-950',
    secondary:
      'bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border border-zinc-300/80 focus:ring-zinc-400 active:bg-zinc-300',
    outline:
      'bg-white hover:bg-zinc-900 text-zinc-900 hover:text-white border-2 border-zinc-900 shadow-2xs hover:shadow-xs focus:ring-zinc-950 active:scale-[0.99]',
    dark:
      'bg-white hover:bg-zinc-100 text-zinc-900 border border-white shadow-xs focus:ring-white active:bg-zinc-200',
    ghost:
      'text-zinc-800 hover:bg-zinc-100 hover:text-black border border-transparent focus:ring-zinc-300',
    accent:
      'bg-zinc-900 hover:bg-black text-white border-2 border-amber-500/80 shadow-xs focus:ring-amber-500',
    danger:
      'bg-rose-600 hover:bg-rose-700 text-white border border-rose-600 focus:ring-rose-500 shadow-xs',

    // Compatibility aliases
    default:
      'bg-zinc-900 hover:bg-black text-white border border-zinc-900 shadow-xs hover:shadow-md focus:ring-zinc-950',
    destructive:
      'bg-rose-600 hover:bg-rose-700 text-white border border-rose-600 focus:ring-rose-500',
    link:
      'text-zinc-900 underline-offset-4 hover:underline p-0 h-auto font-bold border-0 bg-transparent shadow-none',
  };

  // Substantial, confident sizes ("di buat cukup besar")
  const sizes = {
    xs: 'text-xs px-3 py-1.5 gap-1.5',
    sm: 'text-xs sm:text-sm px-4 py-2.5 gap-2 font-bold',
    md: 'text-sm px-5 sm:px-6 py-3 gap-2.5 font-bold',
    lg: 'text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 gap-3 font-bold tracking-tight',
    icon: 'h-10 w-10 p-0 flex items-center justify-center',
  };

  return (
    <motion.button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      whileHover={
        !disabled && !loading
          ? { y: -2, transition: { type: 'spring', stiffness: 450, damping: 25 } }
          : undefined
      }
      whileTap={!disabled && !loading ? { scale: 0.98, y: 0 } : undefined}
      className={cn(baseStyles, variants[variant] || variants.primary, sizes[size] || sizes.md, className)}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        leftIcon && (
          <span className="inline-flex shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5">
            {leftIcon}
          </span>
        )
      )}
      <span>{children}</span>
      {!loading && rightIcon && (
        <span className="inline-flex shrink-0 transition-transform duration-200 group-hover:translate-x-1">
          {rightIcon}
        </span>
      )}
    </motion.button>
  );
}
