'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export default function Badge({
  children,
  variant = 'neutral',
  size = 'md',
  shape = 'default', // 'default' (rounded-md) | 'full' (rounded-full) | 'none'
  className = '',
  icon,
  ...props
}) {
  const baseStyles = 'inline-flex items-center font-medium transition-colors select-none';

  const shapes = {
    default: 'rounded-md',
    full: 'rounded-full',
    none: 'rounded-none',
  };

  const variants = {
    // Monochrome motion.dev palette
    neutral: 'bg-zinc-100 text-zinc-900 border border-zinc-200/80',
    dark: 'bg-zinc-900 text-white border border-zinc-800',
    outline: 'bg-white text-zinc-800 border border-zinc-300',
    ghost: 'text-zinc-600 bg-transparent',

    // Subtle 5% micro-accents for liveness
    accent: 'bg-amber-500/10 text-amber-900 border border-amber-500/20 font-semibold',
    amber: 'bg-amber-500/10 text-amber-900 border border-amber-500/20 font-semibold',
    emerald: 'bg-emerald-500/10 text-emerald-900 border border-emerald-500/20 font-semibold',
    terracotta: 'bg-zinc-100 text-zinc-900 border border-zinc-200 font-semibold',
    rose: 'bg-rose-500/10 text-rose-900 border border-rose-500/20 font-semibold',
    indigo: 'bg-indigo-500/10 text-indigo-900 border border-indigo-500/20 font-semibold',
    purple: 'bg-purple-500/10 text-purple-900 border border-purple-500/20 font-semibold',

    // Aliases
    default: 'bg-zinc-900 text-white border border-zinc-900 shadow-2xs',
    secondary: 'bg-zinc-100 text-zinc-900 border border-zinc-200',
    destructive: 'bg-rose-600 text-white border border-rose-600',
  };

  const sizes = {
    xs: 'text-[10px] px-2 py-0.5 gap-1 font-semibold',
    sm: 'text-xs px-2.5 py-0.5 gap-1.5 font-medium',
    md: 'text-xs px-3 py-1 gap-1.5 font-semibold',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-bold',
  };

  return (
    <span
      className={cn(baseStyles, shapes[shape] || shapes.default, variants[variant] || variants.neutral, sizes[size] || sizes.md, className)}
      {...props}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
