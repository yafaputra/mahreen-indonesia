'use client';

import React, { useEffect, useState, useRef } from 'react';

export default function StatCounter({ end, suffix = '', duration = 2000, label, subtext }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) observer.unobserve(elementRef.current);
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime = null;
    let animationFrameId;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * end));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [hasStarted, end, duration]);

  return (
    <div ref={elementRef} className="text-center p-6 rounded-3xl bg-white/70 backdrop-blur-xs border border-ivory-200/80 shadow-xs">
      <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-terracotta-700 font-display tracking-tight mb-2">
        {count.toLocaleString('id-ID')}
        {suffix}
      </div>
      <div className="text-sm sm:text-base font-bold text-nusantara-charcoal mb-1">
        {label}
      </div>
      {subtext && (
        <div className="text-xs text-nusantara-charcoalMuted">
          {subtext}
        </div>
      )}
    </div>
  );
}
