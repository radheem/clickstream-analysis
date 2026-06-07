'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import { useRef } from 'react';

import { REVEAL_STAGGER, TextReveal } from '@/components/elements/text-reveal';
import { Badge } from '@/components/ui/badge';

const PLATFORMS = ['iOS', 'Android', 'macOS', 'Windows', 'Web'] as const;
const ease = [0.22, 1, 0.36, 1] as const;

export function WebPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 95%', 'start 35%'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [8, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);

  const glowScale = useTransform(scrollYProgress, [0, 1], [0.4, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);

  return (
    <section className="section-padding overflow-x-clip">
      <div className="container">
        <div className="mb-12 gap-4 md:mb-20 md:flex md:items-end md:justify-between">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: {},
            }}
          >
            <TextReveal mode="animate">
              <h2 className="text-4xl leading-none tracking-tighter md:text-5xl lg:text-6xl">
                Beautiful on every screen
              </h2>
            </TextReveal>
            <TextReveal mode="animate" delay={REVEAL_STAGGER} className="mt-4">
              <p className="text-muted-foreground max-w-lg text-lg leading-relaxed">
                Your journal lives everywhere you do. A unified experience from
                phone to desktop, designed for deep focus.
              </p>
            </TextReveal>
          </motion.div>
          <motion.div
            className="mt-8 md:mt-0"
            initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease }}
          >
            <div className="flex flex-wrap gap-1.5 md:justify-end">
              {PLATFORMS.map((p) => (
                <Badge key={p} variant="amber" size="sm">
                  {p}
                </Badge>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="bigger-container">
        <div style={{ perspective: '2000px' }}>
          <motion.div
            ref={ref}
            style={{ y, opacity, scale, rotateX }}
            className="relative"
          >
            {/* Ambient warm glow */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -inset-32 -z-10"
              style={{ scale: glowScale, opacity: glowOpacity }}
            >
              <div className="bg-accent/10 absolute inset-0 rounded-full mask-radial-[70%_60%] mask-radial-from-70% mask-radial-to-100% blur-[140px] will-change-transform" />
            </motion.div>

            <div
              className="ring-foreground/[0.06] relative overflow-hidden rounded-lg ring-1 md:rounded-xl lg:rounded-2xl"
              style={{
                boxShadow:
                  '0 1px 2px rgba(0,0,0,0.02), 0 4px 8px rgba(0,0,0,0.03), 0 16px 32px rgba(0,0,0,0.05), 0 48px 96px rgba(0,0,0,0.07)',
              }}
            >
              <div
                aria-hidden
                className="via-foreground/10 absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent to-transparent"
              />
              <Image
                src="/images/home/web-dashboard.webp"
                alt="Kinto web dashboard"
                width={2200}
                height={1440}
                className="w-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
