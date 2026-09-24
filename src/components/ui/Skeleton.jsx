'use client';

import React from 'react';

export default function Skeleton({ className = '', rounded = 'rounded-xl', ...props }) {
  return (
    <div
      className={`animate-shimmer bg-ivory-200/80 ${rounded} ${className}`}
      {...props}
    />
  );
}
