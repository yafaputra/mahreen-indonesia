'use client';

import React from 'react';
import IndonesiaMapSection from '@/components/home/IndonesiaMapSection';

export default function MahreenMapPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col bg-white">
      {/* PURE GEOGRAPHIC MAP SECTION */}
      <div className="flex-1 bg-white py-6 px-2 sm:px-4">
        <IndonesiaMapSection />
      </div>
    </div>
  );
}
