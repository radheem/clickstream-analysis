'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

import { Logo } from '@/components/layout/logo';

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease },
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Left — editorial */}
      <div className="bg-foreground relative hidden w-1/2 flex-col justify-between p-12 lg:flex">
        <Image
          src="/images/home/hero-bg.webp"
          alt=""
          fill
          className="object-cover opacity-20 mix-blend-overlay dark:opacity-80"
        />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1, delayChildren: 0.2 },
            },
          }}
          className="relative z-10 flex h-full flex-col justify-between"
        >
          <motion.div variants={fadeUp}>
            <Logo className="text-background" />
          </motion.div>
          <div>
            <motion.p
              className="font-display text-background/80 text-3xl leading-snug tracking-tight italic xl:text-4xl"
              variants={fadeUp}
            >
              &ldquo;The unexamined life is not worth living &mdash; but the
              examined life needs a place to breathe.&rdquo;
            </motion.p>
            <motion.div
              className="bg-accent mt-8 h-px w-12"
              variants={fadeUp}
            />
            <motion.p
              className="text-background/40 mt-4 font-mono text-xs tracking-wider uppercase"
              variants={fadeUp}
            >
              A founding principle
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Right — form */}
      <div className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <Logo className="lg:hidden" />
          {children}
        </div>
      </div>
    </div>
  );
}
