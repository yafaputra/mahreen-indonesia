'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * BackgroundGradient component from Aceternity UI
 * Creates a mesmerizing, animated gradient glow around an element's border.
 * Elevates cards and focal features into glowing works of digital art.
 */
export default function BackgroundGradient({
  children,
  className = '',
  containerClassName = '',
  animate = true,
  gradient = 'radial-gradient(circle farthest-side at 0% 100%, #CA3412, transparent), radial-gradient(circle farthest-side at 100% 0%, #F59E0B, transparent), radial-gradient(circle farthest-side at 100% 100%, #10B981, transparent), radial-gradient(circle farthest-side at 0% 0%, #CA3412, #E64A27)',
}) {
  const variants = {
    initial: {
      backgroundPosition: '0 50%',
    },
    animate: {
      backgroundPosition: ['0, 50%', '100% 50%', '0 50%'],
    },
  };

  return (
    <div className={`relative p-[2px] group ${containerClassName}`}>
      {/* Blurred background glow */}
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? 'initial' : undefined}
        animate={animate ? 'animate' : undefined}
        transition={
          animate
            ? {
                duration: 6,
                repeat: Infinity,
                repeatType: 'reverse',
              }
            : undefined
        }
        style={{
          background: gradient,
          backgroundSize: animate ? '400% 400%' : undefined,
        }}
        className="absolute inset-0 rounded-none z-[1] opacity-60 group-hover:opacity-100 blur-xl transition duration-500 will-change-transform"
      />

      {/* Crisp border glow */}
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? 'initial' : undefined}
        animate={animate ? 'animate' : undefined}
        transition={
          animate
            ? {
                duration: 6,
                repeat: Infinity,
                repeatType: 'reverse',
              }
            : undefined
        }
        style={{
          background: gradient,
          backgroundSize: animate ? '400% 400%' : undefined,
        }}
        className="absolute inset-0 rounded-none z-[1] will-change-transform"
      />

      {/* Actual inner card content */}
      <div className={`relative z-10 rounded-none bg-white ${className}`}>
        {children}
      </div>
    </div>
  );
}
