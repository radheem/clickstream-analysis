'use client';

import { motion } from 'motion/react';
import Link from 'next/link';

import { REVEAL_STAGGER, TextReveal } from '@/components/elements/text-reveal';
import { Button } from '@/components/ui/button';

export function Cta() {
  return (
    <section className="pt-32 pb-24">
      <div className="relative container">
        {/* Decorative ornament */}
        <span
          aria-hidden
          className="font-display text-accent/10 pointer-events-none absolute top-8 left-1/2 -translate-x-1/2 -translate-y-2/3 text-[12rem] leading-none tracking-tighter select-none md:text-[16rem]"
        >
          &amp;
        </span>

        {/* CTA as editorial pull-quote */}
        <motion.div
          className="relative text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <TextReveal mode="animate">
            <h2 className="mx-auto max-w-4xl text-4xl leading-none tracking-tighter md:text-6xl lg:text-7xl">
              Your thoughts deserve a home.
            </h2>
          </TextReveal>
          <TextReveal mode="animate" delay={REVEAL_STAGGER} className="mt-8">
            <p className="text-muted-foreground mx-auto max-w-lg text-base leading-relaxed">
              Start writing today. Kinto is free, private, and designed for
              people who think best on paper &mdash; or on screen.
            </p>
          </TextReveal>
          <TextReveal
            mode="animate"
            delay={REVEAL_STAGGER * 2}
            className="mt-10"
          >
            <Button asChild variant="brand" size="lg">
              <Link href="/signup">Begin your journal</Link>
            </Button>
          </TextReveal>
          <TextReveal
            mode="animate"
            delay={REVEAL_STAGGER * 3}
            className="mt-4"
          >
            <p className="text-muted-foreground font-mono text-xs">
              Free forever &middot; No credit card required &middot; Takes 30
              seconds
            </p>
          </TextReveal>
        </motion.div>
      </div>
    </section>
  );
}
