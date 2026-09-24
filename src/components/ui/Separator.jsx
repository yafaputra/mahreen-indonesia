'use client';

import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Separator component from shadcn/ui
 * A clean 1px hairline horizontal or vertical divider.
 */
export default function Separator({
  className = '',
  orientation = 'horizontal',
  decorative = true,
  ...props
}) {
  return (
    <div
      role={decorative ? 'none' : 'separator'}
      aria-orientation={orientation}
      className={cn(
        'shrink-0 bg-zinc-200/80',
        orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
        className
      )}
      {...props}
    />
  );
}
