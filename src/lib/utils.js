import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Standard shadcn/ui cn helper to merge Tailwind CSS classes cleanly
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
