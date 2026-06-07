'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

export function PullQuote() {
  const words =
    'We quit our jobs, shipped an MVP in six weeks, and got our first paying customer the same month. Two years later, we\u2019re profitable and growing \u2014 on our own terms.'.split(
      ' ',
    );

  return (
    <section className="section-padding">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl p-8 md:p-12 lg:p-16">
          <div className="from-accent-subtle via-accent-light/50 to-accent-subtle absolute inset-0 bg-gradient-to-br" />
          <Image
            src="/images/home/hero-bg.webp"
            alt=""
            fill
            className="object-cover opacity-10 mix-blend-multiply dark:opacity-5 dark:mix-blend-soft-light"
          />
          <div className="relative z-10">
            {/* Quote mark — scales in */}
            <motion.span
              className="font-display text-accent/30 text-6xl leading-none select-none md:text-7xl"
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              &ldquo;
            </motion.span>

            {/* Quote text — word-by-word reveal */}
            <p className="font-display -mt-6 max-w-3xl text-2xl leading-snug tracking-tight md:text-3xl lg:text-4xl">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ opacity: 0, filter: 'blur(4px)', y: 8 }}
                  whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </p>

            {/* Attribution — slides up */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: words.length * 0.03 + 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <p className="text-sm font-medium">James Moreno</p>
              <p className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
                Founder, Kinto
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
