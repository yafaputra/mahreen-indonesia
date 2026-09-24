'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * FlipWords component from Aceternity UI
 * Smoothly flips through words with staggered letter blur and spring physics.
 */
export function FlipWords({
  words = [],
  duration = 3200,
  className = '',
}) {
  const [currentWord, setCurrentWord] = useState(words[0] || '');
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = useCallback(() => {
    const currentIndex = words.indexOf(currentWord);
    const nextWord = words[(currentIndex + 1) % words.length];
    setCurrentWord(nextWord);
    setIsAnimating(true);
  }, [currentWord, words]);

  useEffect(() => {
    if (!isAnimating) {
      const timer = setTimeout(() => {
        startAnimation();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isAnimating, duration, startAnimation]);

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        setIsAnimating(false);
      }}
    >
      <motion.span
        key={currentWord}
        initial={{
          opacity: 0,
          y: 12,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: -14,
          filter: 'blur(6px)',
          transition: { duration: 0.2 },
        }}
        transition={{
          type: 'spring',
          stiffness: 280,
          damping: 20,
        }}
        className={cn(
          'inline-block relative text-left',
          className
        )}
      >
        {currentWord.split(' ').map((word, wordIndex) => (
          <span key={word + wordIndex} className="inline-block whitespace-nowrap">
            {word.split('').map((letter, letterIndex) => (
              <motion.span
                key={word + letterIndex}
                initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  delay: wordIndex * 0.15 + letterIndex * 0.03,
                  duration: 0.25,
                  type: 'spring',
                  stiffness: 300,
                  damping: 24,
                }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
            <span className="inline-block">&nbsp;</span>
          </span>
        ))}
      </motion.span>
    </AnimatePresence>
  );
}

export default FlipWords;
