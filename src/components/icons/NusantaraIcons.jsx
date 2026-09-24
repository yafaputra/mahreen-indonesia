import React from 'react';

/**
 * Custom SVG Icons bertema Nusantara untuk MAHREEN OS.
 * Komponen SVG murni (vector scaleable) dengan dukungan Tailwind CSS className.
 */

// Ikon Motif Batik Kawung 4 Daun
export function BatikKawungIcon({ className = 'w-5 h-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <circle cx="12" cy="12" r="2.5" fill="currentColor" fillOpacity="0.4" />
      <ellipse cx="12" cy="6" rx="3.5" ry="4.5" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="12" cy="18" rx="3.5" ry="4.5" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="6" cy="12" rx="4.5" ry="3.5" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="18" cy="12" rx="4.5" ry="3.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

// Ikon Gunungan Wayang Khas Nusantara
export function GununganIcon({ className = 'w-5 h-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path
        d="M12 2L4 16C4 18.5 6 21 12 21C18 21 20 18.5 20 16L12 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 21V11M12 11L9 14M12 11L15 14M12 7L10 9M12 7L14 9"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Ikon Tenun Nusantara Geometrik
export function TenunGridIcon({ className = 'w-5 h-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 9H21M3 15H21M9 3V21M15 3V21" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      <circle cx="12" cy="12" r="2" fill="currentColor" fillOpacity="0.3" />
    </svg>
  );
}

// Ikon Perahu Pinisi / Ekspedisi Bahari
export function PinisiBoatIcon({ className = 'w-5 h-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path
        d="M3 17C6 19 18 19 21 17L19 21H5L3 17Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 3V17M12 5L18 10H12M12 7L6 12H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Ikon Mahkota Nusantara / Bintang Mahreen
export function NusantaraStarIcon({ className = 'w-5 h-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path
        d="M12 2L14.8 8.6L22 9.2L16.6 14L18.2 21.2L12 17.5L5.8 21.2L7.4 14L2 9.2L9.2 8.6L12 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" fillOpacity="0.25" />
    </svg>
  );
}
