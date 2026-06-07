'use client';

import { motion, useInView } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useLayoutEffect, useRef, useState } from 'react';

import { REVEAL_STAGGER, TextReveal } from '@/components/elements/text-reveal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const STATS = [
  { number: '12,000+', label: 'Writers journaling daily' },
  { number: '2.3M', label: 'Entries written to date' },
  { number: '$0', label: 'Raised from investors' },
  { number: '2', label: 'Founders, zero managers' },
] as const;

export function WhoWeAre() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const inView = useInView(headerRef, { once: true, amount: 0.3 });

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const inViewport = rect.top < window.innerHeight && rect.bottom > 0;

    // Wait for about hero to finish if in viewport, otherwise ready on next tick
    const delay = inViewport ? REVEAL_STAGGER * 4 * 1000 : 0;
    const timer = setTimeout(() => setReady(true), delay);
    return () => clearTimeout(timer);
  }, []);

  // Animate when both ready AND in viewport
  const shouldAnimate = ready && inView;

  return (
    <section ref={sectionRef} className="section-padding">
      <div className="container">
        {/* Header — split layout */}
        <div ref={headerRef} className="grid gap-6 md:grid-cols-2">
          <motion.div
            initial="hidden"
            animate={shouldAnimate ? 'visible' : 'hidden'}
            variants={{
              hidden: {},
              visible: {},
            }}
          >
            <TextReveal mode="animate">
              <Badge
                variant="subtle"
                shape="rounded"
                size="lg"
                className="mb-6"
              >
                Who we are
              </Badge>
            </TextReveal>
            <TextReveal mode="animate" delay={REVEAL_STAGGER}>
              <h2 className="text-3xl leading-none tracking-tighter md:text-4xl lg:text-5xl">
                Bootstrapped &amp; built with{' '}
                <span className="text-muted-foreground">intention.</span>
              </h2>
            </TextReveal>
          </motion.div>
          <motion.div
            initial="hidden"
            animate={shouldAnimate ? 'visible' : 'hidden'}
            variants={{
              hidden: {},
              visible: {},
            }}
            className="self-end"
          >
            <TextReveal mode="animate" delay={0.2}>
              <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
                We scratched our own itch. Two indie hackers who wanted a
                journaling app that respected their time and privacy &mdash; so
                we built one. No venture capital, no growth hacks. Just a
                product that earns its keep.
              </p>
            </TextReveal>
          </motion.div>
        </div>

        {/* Stats — frosted glass cards */}
        <div className="relative mt-12 flex min-h-80 items-center overflow-hidden rounded-3xl px-6 py-6 md:min-h-96 md:px-14 md:py-8">
          <div className="from-accent-subtle via-accent-light to-accent-subtle absolute inset-0 bg-gradient-to-br" />
          <Image
            src="/images/home/hero-bg.webp"
            alt=""
            fill
            className="object-cover opacity-15 mix-blend-multiply dark:opacity-10 dark:mix-blend-soft-light"
          />

          <div className="relative z-10 grid w-full grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={cn(
                  'rounded-2xl text-center backdrop-blur-xl',
                  i === 1 || i === 2
                    ? 'bg-background/50 p-5 sm:p-8 md:p-10'
                    : 'bg-background/30 p-5 sm:p-8 md:p-10',
                )}
              >
                <span
                  className={cn(
                    'font-display text-foreground leading-none tracking-tight',
                    i === 1 || i === 2
                      ? 'text-4xl md:text-5xl lg:text-6xl'
                      : 'text-3xl md:text-4xl lg:text-5xl',
                  )}
                >
                  {stat.number}
                </span>
                <span className="text-foreground/60 mt-5 block text-sm">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Hiring banner */}
        <TextReveal
          mode="whileInView"
          viewportAmount={0.3}
          className="mt-6 md:mt-4"
        >
          <div className="bg-secondary/60 rounded-3xl p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-3">
                  <p className="text-sm font-medium md:text-base">
                    Want to be part of the team?
                  </p>
                  <Badge variant="subtle" shape="rounded">
                    2 open roles
                  </Badge>
                </div>
                <p className="text-muted-foreground text-xs leading-relaxed md:text-sm">
                  We&apos;re growing from two to four. If you want to work
                  directly with founders and ship fast, we&apos;d love to hear
                  from you.
                </p>
              </div>
              <Button asChild className="shrink-0 rounded-xl">
                <Link href="/about#team">Meet the team</Link>
              </Button>
            </div>
          </div>
        </TextReveal>
      </div>
    </section>
  );
}
