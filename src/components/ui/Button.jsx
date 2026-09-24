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
    // Sleek High-Contrast Black Palette ("button sebaiknya warna hitam aja")
    primary:
      'bg-black hover:bg-zinc-800 text-white border border-black shadow-xs hover:shadow-md focus:ring-black active:bg-zinc-900',
    secondary:
      'bg-zinc-100 hover:bg-black text-zinc-900 hover:text-white border border-zinc-300/80 focus:ring-black active:bg-zinc-900',
    outline:
      'bg-white hover:bg-black text-black hover:text-white border-2 border-black shadow-2xs hover:shadow-xs focus:ring-black active:scale-[0.99]',
    dark:
      'bg-black hover:bg-zinc-800 text-white border border-black shadow-xs focus:ring-black active:bg-zinc-900',
    ghost:
      'text-zinc-900 hover:bg-zinc-100 hover:text-black border border-transparent focus:ring-zinc-300',
    accent:
      'bg-black hover:bg-zinc-800 text-white border-2 border-zinc-700 shadow-xs focus:ring-black',
    danger:
      'bg-rose-600 hover:bg-rose-700 text-white border border-rose-600 focus:ring-rose-500 shadow-xs',

    // Compatibility aliases
    default:
      'bg-black hover:bg-zinc-800 text-white border border-black shadow-xs hover:shadow-md focus:ring-black',
    destructive:
      'bg-rose-600 hover:bg-rose-700 text-white border border-rose-600 focus:ring-rose-500',
    link:
      'text-black underline-offset-4 hover:underline p-0 h-auto font-bold border-0 bg-transparent shadow-none',
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
          ? { y: -2.5, scale: 1.015, transition: { type: 'spring', stiffness: 480, damping: 24 } }
          : undefined
      }
      whileTap={!disabled && !loading ? { scale: 0.97, y: 0 } : undefined}
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
