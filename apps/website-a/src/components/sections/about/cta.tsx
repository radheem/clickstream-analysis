'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

import { REVEAL_STAGGER, TextReveal } from '@/components/elements/text-reveal';
import { Button } from '@/components/ui/button';

// Base delay — waits for the container to fade in before text reveals start
const BASE = 0.2;

export function AboutCta() {
  return (
    <section className="section-padding">
      <div className="container">
        <motion.div
          className="bg-foreground relative overflow-hidden rounded-3xl px-8 py-16 text-center md:px-16 md:py-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] },
            },
          }}
        >
          <Image
            src="/images/home/hero-bg.webp"
            alt=""
            fill
            className="object-cover opacity-20 mix-blend-overlay dark:opacity-10"
          />
          <div className="relative z-10">
            <TextReveal mode="animate" delay={BASE}>
              <p className="text-primary-foreground/50 mb-6 font-mono text-xs tracking-wider uppercase">
                Bootstrapped &amp; profitable
              </p>
            </TextReveal>
            <TextReveal mode="animate" delay={BASE + REVEAL_STAGGER}>
              <h2 className="text-primary-foreground mx-auto max-w-2xl text-3xl leading-none tracking-tighter md:text-5xl lg:text-6xl">
                Built by indie hackers, for people who{' '}
                <span className="text-accent">think.</span>
              </h2>
            </TextReveal>
            <TextReveal
              mode="animate"
              delay={BASE + REVEAL_STAGGER * 2}
              className="mt-6"
            >
              <p className="text-primary-foreground/50 mx-auto max-w-md text-sm leading-relaxed md:text-base">
                No investors to please, no ads to serve. Just a journaling app
                that earns its keep &mdash; one writer at a time.
              </p>
            </TextReveal>
            <TextReveal
              mode="animate"
              delay={BASE + REVEAL_STAGGER * 3}
              className="mt-10"
            >
              <div className="mx-auto flex w-[min(100%,24rem)] flex-col gap-3 sm:flex-row sm:justify-center">
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="flex-1"
                >
                  <Link href="/login">Begin your journal</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline-invert"
                  className="flex-1"
                >
                  <Link href="/pricing">View pricing</Link>
                </Button>
              </div>
            </TextReveal>
            <TextReveal
              mode="animate"
              delay={BASE + REVEAL_STAGGER * 4}
              className="mt-6"
            >
              <p className="text-primary-foreground/30 font-mono text-[0.625rem] tracking-wider">
                End-to-end encrypted &middot; Full data export &middot; Cancel
                anytime
              </p>
            </TextReveal>
          </div>
          <div
            className="absolute right-6 bottom-6 z-10 flex items-center gap-2 opacity-20"
            aria-hidden
          >
            <span className="bg-accent size-2.5 shrink-0 rounded-full" />
            <span className="font-display text-primary-foreground text-base">
              Kinto
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
