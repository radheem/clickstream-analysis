'use client';

import { motion, useInView } from 'motion/react';
import Link from 'next/link';
import { useRef } from 'react';

import { REVEAL_STAGGER, TextReveal } from '@/components/elements/text-reveal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
const PRICING = {
  free: {
    badge: 'Free',
    name: 'Personal',
    price: '$0',
    period: '/ forever',
    description:
      'Everything you need to build a journaling practice that lasts. No trial period, no feature walls \u2014 just write.',
    features: [
      'Unlimited journal entries',
      'Basic mood tracking',
      '3 AI reflections per week',
      'End-to-end encryption',
      'Mobile and desktop apps',
    ],
    cta: 'Start writing free',
  },
  pro: {
    badge: 'Pro',
    name: 'Reflective',
    price: '$8',
    period: '/ month',
    description:
      'The full depth of AI journaling. Pattern recognition, weekly narratives, and insights that evolve alongside your practice.',
    features: [
      'Everything in Personal',
      'Unlimited AI reflections',
      'Weekly synthesis reports',
      'Advanced mood analytics & trends',
      'Theme & pattern tracking',
      'Yearly retrospective reports',
      'Export to PDF & markdown',
    ],
    cta: 'Start 14-day free trial',
  },
} as const;

export function Pricing({
  className = 'section-padding',
  showBadge = false,
}: {
  className?: string;
  showBadge?: boolean;
}) {
  return (
    <section className={className}>
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ hidden: {}, visible: {} }}
        >
          {/* Section Header */}
          <motion.div
            className="mb-12 md:mb-20"
            variants={{
              hidden: {},
              visible: {},
            }}
          >
            {showBadge && (
              <TextReveal mode="animate" className="mb-6">
                <Badge variant="subtle" shape="rounded" size="lg">
                  Pricing
                </Badge>
              </TextReveal>
            )}
            <TextReveal mode="animate" delay={showBadge ? REVEAL_STAGGER : 0}>
              <h2 className="text-4xl leading-none tracking-tighter md:text-5xl lg:text-6xl">
                One journal,{' '}
                {showBadge ? (
                  <span className="text-muted-foreground">two paths.</span>
                ) : (
                  'two paths'
                )}
              </h2>
            </TextReveal>
          </motion.div>

          {/* Pricing Columns */}
          <motion.div
            className="grid grid-cols-1 gap-0 md:grid-cols-2"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.15, delayChildren: 0.4 },
              },
            }}
          >
            {/* Free Tier */}
            <motion.div
              className="flex flex-col pb-10 md:border-r md:p-10"
              variants={{
                hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              <div className="invisible -mt-10 mb-8 hidden h-0.5 w-full md:block" />
              <span className="text-muted-foreground mb-2 block font-mono text-xs tracking-wider uppercase">
                {PRICING.free.badge}
              </span>
              <h3 className="text-3xl leading-snug tracking-tight">
                {PRICING.free.name}
              </h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="font-display text-foreground text-4xl leading-none tracking-tight">
                  {PRICING.free.price}
                </span>
                <span className="text-muted-foreground font-mono text-xs">
                  {PRICING.free.period}
                </span>
              </div>
              <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                {PRICING.free.description}
              </p>
              <hr className="bg-border my-6 h-px border-none" />
              <ul className="text-muted-foreground space-y-3 text-sm leading-relaxed">
                {PRICING.free.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <span className="text-accent shrink-0">&mdash;</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <Button asChild variant="outline" size="lg">
                  <Link href="/signup">{PRICING.free.cta}</Link>
                </Button>
              </div>
            </motion.div>

            {/* Pro Tier */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              <ProTier />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ProTier() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 1 });

  return (
    <div ref={ref} className="group/pro flex flex-col py-10 md:p-10">
      <div className="bg-accent -mt-10 mb-8 h-0.5 w-full transition-shadow duration-500 group-hover/pro:shadow-[0_0_12px_var(--accent)] md:-mt-10" />
      <span className="text-accent mb-2 block font-mono text-xs tracking-wider uppercase">
        {PRICING.pro.badge}
      </span>
      <h3 className="text-3xl leading-snug tracking-tight">
        {PRICING.pro.name}
      </h3>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="font-display text-foreground text-4xl leading-none tracking-tight">
          {PRICING.pro.price}
        </span>
        <span className="text-muted-foreground font-mono text-xs">
          {PRICING.pro.period}
        </span>
      </div>
      <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
        {PRICING.pro.description}
      </p>
      <hr className="bg-border my-6 h-px border-none" />
      <ul className="text-muted-foreground space-y-3 text-sm leading-relaxed">
        {PRICING.pro.features.map((feature) => (
          <li key={feature} className="flex gap-3">
            <span className="text-accent shrink-0">&mdash;</span>
            {feature === 'Everything in Personal' ? (
              <mark
                className={cn(
                  'hover:bg-accent-light rounded-sm px-0.5 transition-colors duration-700',
                  inView
                    ? 'bg-accent-subtle text-accent-hover'
                    : 'text-muted-foreground bg-transparent',
                )}
              >
                {feature}
              </mark>
            ) : (
              feature
            )}
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-8">
        <Button asChild size="lg">
          <Link href="/signup">{PRICING.pro.cta}</Link>
        </Button>
      </div>
    </div>
  );
}
