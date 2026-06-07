'use client';

import { motion } from 'motion/react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const toggle = async () => {
    const newTheme = isDark ? 'light' : 'dark';
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (!document.startViewTransition || prefersReducedMotion) {
      setTheme(newTheme);
      return;
    }

    document.documentElement.classList.add('theme-transition');
    const transition = document.startViewTransition(() => setTheme(newTheme));

    try {
      await transition.finished;
    } finally {
      document.documentElement.classList.remove('theme-transition');
    }
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggle}>
      <motion.svg
        viewBox="0 0 24 24"
        className="size-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        <motion.path
          d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76z"
          animate={{ fill: isDark ? 'currentColor' : 'transparent' }}
          transition={{ duration: 0.4 }}
        />
        <line x1="16" y1="8" x2="2" y2="22" />
        <motion.line
          x1="17.5"
          y1="15"
          x2="9"
          y2="15"
          animate={{ stroke: isDark ? 'var(--background)' : 'currentColor' }}
          transition={{ duration: 0.4 }}
        />
        {/* Interior portion of shaft visible through filled body */}
        <motion.line
          x1="13.5"
          y1="10.5"
          x2="5"
          y2="19"
          animate={{ stroke: isDark ? 'var(--background)' : 'transparent' }}
          transition={{ duration: 0.4 }}
        />
      </motion.svg>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
