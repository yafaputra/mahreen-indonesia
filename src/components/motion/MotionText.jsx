'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * WordReveal: Splitting text into words and animating each word into view with spring physics.
 * Inspired by motion.dev text entrance animations.
 */
export function WordReveal({
  text,
  className = '',
  wordClassName = '',
  delay = 0,
  stagger = 0.05,
  once = true,
}) {
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 350,
        damping: 24,
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-40px' }}
      className={`inline-block ${className}`}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordVariants}
          className={`inline-block mr-[0.25em] last:mr-0 ${wordClassName}`}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

/**
 * TextShimmer: Subtle metallic/glowing sweep across text.
 */
export function TextShimmer({ children, className = '' }) {
  return (
    <span
      className={`inline-block bg-[linear-gradient(110deg,#18181b,45%,#a1a1aa,55%,#18181b)] bg-[length:250%_100%] animate-shimmer bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  );
}

export default {
  WordReveal,
  TextShimmer,
};
