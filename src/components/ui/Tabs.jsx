'use client';

import React, { createContext, useContext, useState, useId } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const TabsContext = createContext({
  activeTab: '',
  setActiveTab: () => {},
  indicatorId: 'shadcnActiveTabIndicator',
});

export function Tabs({
  defaultValue,
  value,
  onValueChange,
  children,
  className = '',
}) {
  const generatedId = useId();
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const activeTab = value !== undefined ? value : internalValue;

  const handleTabChange = (val) => {
    if (value === undefined) {
      setInternalValue(val);
    }
    if (onValueChange) {
      onValueChange(val);
    }
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: handleTabChange, indicatorId: `tab-${generatedId}` }}>
      <div className={cn('w-full', className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className = '' }) {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center rounded-xl bg-zinc-100 p-1 text-zinc-600 border border-zinc-200/80',
        className
      )}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({
  value,
  children,
  className = '',
  disabled = false,
  icon,
}) {
  const { activeTab, setActiveTab, indicatorId } = useContext(TabsContext);
  const isActive = activeTab === value;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => setActiveTab(value)}
      className={cn(
        'relative inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3.5 py-1.5 text-xs font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
        isActive ? 'text-zinc-900 font-bold' : 'text-zinc-600 hover:text-zinc-900',
        className
      )}
    >
      {isActive && (
        <motion.div
          layoutId={indicatorId}
          className="absolute inset-0 rounded-lg bg-white shadow-xs border border-zinc-200/60"
          transition={{ type: 'spring', stiffness: 450, damping: 30 }}
        />
      )}
      <span className="relative z-10 flex items-center gap-1.5">
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </span>
    </button>
  );
}

export function TabsContent({ value, children, className = '' }) {
  const { activeTab } = useContext(TabsContext);
  if (activeTab !== value) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.2 }}
      className={cn('mt-3 focus-visible:outline-none', className)}
    >
      {children}
    </motion.div>
  );
}
