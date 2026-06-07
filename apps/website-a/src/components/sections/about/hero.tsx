'use client';

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

import { REVEAL_STAGGER, TextReveal } from '@/components/elements/text-reveal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function AboutHero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ['0%', '0%'] : ['0%', '20%'],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [1, 1] : [1, 1.1],
  );

  return (
    <section
      ref={ref}
      className="hero-padding relative overflow-hidden lg:min-h-[max(60vh,740px)]"
    >
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <Image
          src="/images/about/hero-stem.png"
          alt=""
          fill
          className="mask-b-from-10% mask-b-to-90% object-cover object-[80%_30%]"
        />
      </motion.div>
      <div className="from-background via-background/75 absolute inset-0 bg-gradient-to-r to-transparent" />
      <div className="relative z-10 container">
        <motion.div
          className="max-w-xl"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {},
          }}
        >
          <TextReveal mode="animate" delay={0.3}>
            <Badge variant="subtle" shape="rounded" size="lg" className="mb-6">
              About us
            </Badge>
          </TextReveal>
          <TextReveal mode="animate" delay={0.3 + REVEAL_STAGGER}>
            <h1 className="text-4xl leading-none tracking-tighter md:text-5xl lg:text-6xl">
              Built by two founders,
            </h1>
          </TextReveal>
          <TextReveal mode="animate" delay={0.3 + REVEAL_STAGGER * 2}>
            <p className="font-display text-muted-foreground text-4xl leading-none tracking-tighter md:text-5xl lg:text-6xl">
              not a committee.
            </p>
          </TextReveal>
          <TextReveal
            mode="animate"
            delay={0.3 + REVEAL_STAGGER * 3}
            className="mt-6"
          >
            <p className="text-muted-foreground max-w-md text-base leading-relaxed md:text-lg">
              Kinto is bootstrapped, profitable, and built by indie hackers who
              actually journal. No investors, no board meetings, no feature
              bloat &mdash; just a product we&apos;d want to use ourselves.
            </p>
          </TextReveal>
          <TextReveal
            mode="animate"
            delay={0.3 + REVEAL_STAGGER * 4}
            className="mt-8"
          >
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link href="/login">Start writing free</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/#features">How it works</Link>
              </Button>
            </div>
          </TextReveal>
        </motion.div>
      </div>
    </section>
  );
}
