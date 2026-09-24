'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * FadeInView: Smoothly fades and slides an element into view when scrolled into the viewport.
 */
export function FadeInView({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  direction = 'up', // 'up' | 'down' | 'left' | 'right' | 'none'
  distance = 28,
  once = true,
  ...props
}) {
  const directions = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    none: { x: 0, y: 0 },
  };

  const initialOffset = directions[direction] || directions.up;

  return (
    <motion.div
      initial={{ opacity: 0, ...initialOffset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: '-40px' }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerContainer: Wraps a group of StaggerItem children to animate them sequentially.
 */
export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.08,
  delayChildren = 0.1,
  once = true,
  ...props
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-40px' }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerItem: Individual animated item inside a StaggerContainer.
 */
export function StaggerItem({
  children,
  className = '',
  distance = 20,
  ...props
}) {
  const itemVariants = {
    hidden: { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className} {...props}>
      {children}
    </motion.div>
  );
}

/**
 * ScaleInView: Pop / spring scale-up animation upon entering viewport.
 */
export function ScaleInView({
  children,
  className = '',
  delay = 0,
  once = true,
  ...props
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once, margin: '-30px' }}
      transition={{
        type: 'spring',
        stiffness: 320,
        damping: 22,
        delay,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Float: Gentle perpetual bobbing for badges, avatars, and stickers to make them feel organic.
 */
export function Float({
  children,
  className = '',
  duration = 4,
  distance = 8,
  delay = 0,
  ...props
}) {
  return (
    <motion.div
      animate={{
        y: [-distance / 2, distance / 2, -distance / 2],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default {
  FadeInView,
  StaggerContainer,
  StaggerItem,
  ScaleInView,
  Float,
};
