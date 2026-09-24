'use client';

import React from 'react';
import Button from './Button';
import { Compass } from 'lucide-react';

export default function EmptyState({
  icon: Icon = Compass,
  title = 'Belum Ada Data',
  description = 'Saat ini belum ada data yang dapat ditampilkan di kategori ini.',
  actionLabel,
  onAction,
  className = '',
}) {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-3xl bg-ivory-100/60 border border-dashed border-ivory-300 ${className}`}>
      <div className="w-16 h-16 rounded-2xl bg-terracotta-100 flex items-center justify-center text-terracotta-700 mb-4 shadow-sm">
        <Icon className="w-8 h-8" />
      </div>
      <h4 className="text-lg sm:text-xl font-bold text-nusantara-charcoal mb-2 font-display">
        {title}
      </h4>
      <p className="text-sm text-nusantara-charcoalMuted max-w-md mb-6 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary" size="sm">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
