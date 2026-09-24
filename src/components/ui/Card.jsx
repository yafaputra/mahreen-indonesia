'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function Card({
  children,
  className = '',
  hoverEffect = true,
  onClick,
  as = 'div',
  ...props
}) {
  const hoverClass = hoverEffect
    ? 'card-terracotta-glow transition-all duration-300 hover:border-terracotta-300'
    : '';
  const cursorClass = onClick ? 'cursor-pointer' : '';

  const MotionComponent = as === 'div' ? motion.div : motion(as);

  return (
    <MotionComponent
      onClick={onClick}
      whileHover={
        hoverEffect
          ? {
              y: -4,
              transition: { type: 'spring', stiffness: 400, damping: 25 },
            }
          : undefined
      }
      whileTap={onClick ? { scale: 0.985 } : undefined}
      className={cn(
        'bg-white rounded-2xl border border-ivory-200/90 shadow-sm overflow-hidden',
        hoverClass,
        cursorClass,
        className
      )}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}

export function CardHeader({ className, ...props }) {
  return (
    <div
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }) {
  return (
    <h3
      className={cn('text-xl font-bold tracking-tight text-nusantara-charcoal', className)}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }) {
  return (
    <p
      className={cn('text-sm text-ivory-600 leading-relaxed', className)}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }) {
  return (
    <div className={cn('p-6 pt-0', className)} {...props} />
  );
}

export function CardFooter({ className, ...props }) {
  return (
    <div
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    />
  );
}
