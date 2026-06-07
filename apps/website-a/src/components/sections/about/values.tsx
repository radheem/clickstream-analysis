'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

import { REVEAL_STAGGER, TextReveal } from '@/components/elements/text-reveal';
import { Badge } from '@/components/ui/badge';

const VALUES = [
  {
    title: 'Built with care',
    description:
      'Every feature is something we use ourselves. If it doesn\u2019t make journaling better, it doesn\u2019t ship.',
  },
  {
    title: 'Private by default',
    description:
      'End-to-end encryption from day one. We can\u2019t read your journal \u2014 and we never will.',
  },
  {
    title: 'AI that listens',
    description:
      'Our AI reflects back what it sees. It doesn\u2019t prompt, nudge, or shape your thinking.',
  },
] as const;

export function Values() {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="grid overflow-hidden rounded-3xl md:grid-cols-2">
          {/* Left — image */}
          <div className="relative min-h-72 md:min-h-0">
            <Image
              src="/images/about/values-3.png"
              alt=""
              fill
              className="object-cover"
            />
          </div>

          {/* Right — values */}
          <div className="bg-accent-subtle p-8 md:p-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.25 } },
              }}
            >
              <TextReveal mode="animate" className="mb-8">
                <Badge variant="subtle" shape="rounded" size="lg">
                  What we believe
                </Badge>
              </TextReveal>
              {VALUES.map((value, i) => (
                <motion.div
                  key={value.title}
                  className="mt-8 first:mt-0"
                  variants={{
                    hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
                    visible: {
                      opacity: 1,
                      y: 0,
                      filter: 'blur(0px)',
                      transition: {
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    },
                  }}
                >
                  <TextReveal mode="animate" duration={0.8}>
                    <h3 className="text-lg leading-snug tracking-tight md:text-xl">
                      {value.title}
                    </h3>
                  </TextReveal>
                  <TextReveal
                    mode="animate"
                    duration={0.8}
                    delay={REVEAL_STAGGER}
                    className="mt-2"
                  >
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </TextReveal>
                  {i < VALUES.length - 1 && (
                    <div className="bg-accent/20 mt-8 h-px w-12" />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
