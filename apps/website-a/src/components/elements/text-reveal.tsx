'use client';

import { motion, useInView, type Variants } from 'motion/react';
import { useRef } from 'react';

import { cn } from '@/lib/utils';

/** Strong ease-out — fast start, very gradual deceleration with long tail */
const REVEAL_EASE = [0.16, 1, 0.3, 1] as const;

/** Default reveal duration — import this to coordinate content that follows a TextReveal */
export const REVEAL_DURATION = 1.15;

/** Default stagger interval between sequential TextReveals */
export const REVEAL_STAGGER = 0.1;

interface TextRevealProps {
  children: React.ReactNode;
  mode?: 'animate' | 'whileInView';
  duration?: number;
  delay?: number;
  viewportAmount?: number;
  className?: string;
}

export function TextReveal({
  children,
  mode = 'whileInView',
  duration = REVEAL_DURATION,
  delay = 0,
  viewportAmount = 0.3,
  className,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: viewportAmount });

  const variants: Variants = {
    hidden: { y: '110%', filter: 'blur(4px)' },
    visible: {
      y: '0%',
      filter: 'blur(0px)',
      transition: {
        duration,
        ease: REVEAL_EASE,
        delay,
      },
    },
  };

  if (mode === 'animate') {
    return (
      <div className={cn('overflow-clip', className)}>
        <motion.div
          className="mb-[-0.25em] pb-[0.25em] will-change-transform"
          variants={variants}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  return (
    <div ref={ref} className={cn('overflow-clip', className)}>
      <motion.div
        className="mb-[-0.25em] pb-[0.25em] will-change-transform"
        variants={variants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {children}
      </motion.div>
    </div>
  );
}
