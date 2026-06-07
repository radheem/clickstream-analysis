'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

import { TextReveal } from '@/components/elements/text-reveal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { ChangelogEntry } from '@/lib/changelog';

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease },
  },
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
}

export function ChangelogContent({
  grouped,
  latestVersion,
}: {
  grouped: [string, ChangelogEntry[]][];
  latestVersion: string | undefined;
}) {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/home/hero-bg.webp"
          alt=""
          fill
          className="object-cover opacity-60 blur-lg dark:opacity-20"
        />
        <div className="via-background/50 to-background absolute inset-0 bg-linear-to-b from-transparent" />
      </div>
      <section className="hero-padding relative z-10">
        <div className="group/changelog container max-w-4xl">
          {grouped.map(([year, yearEntries], groupIndex) => (
            <motion.div
              key={year}
              className="group/year relative mb-16 last:mb-0"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.12,
                    delayChildren: groupIndex === 0 ? 0 : 0.1,
                  },
                },
              }}
            >
              <TextReveal
                mode="animate"
                delay={groupIndex === 0 ? 0 : undefined}
                className="mb-8"
              >
                <span className="font-display text-accent/20 group-has-[[data-entry]:hover]/year:text-accent/40 text-6xl leading-none tracking-tighter transition-colors duration-300 md:text-8xl">
                  {year}
                </span>
              </TextReveal>

              <motion.div
                className="flex flex-col gap-8 md:ml-8"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.1 } },
                }}
              >
                {yearEntries.map((entry) => {
                  const isLatest = entry.version === latestVersion;

                  if (isLatest) {
                    return (
                      <motion.div
                        key={entry.version}
                        className="bg-foreground rounded-2xl p-6 md:p-8"
                        variants={fadeUp}
                      >
                        <div className="mb-3 flex flex-wrap items-center gap-2">
                          <Badge variant="amber" size="sm">
                            v{entry.version}
                          </Badge>
                          <span className="text-primary-foreground/40 font-mono text-xs">
                            {formatDate(entry.date)}
                          </span>
                        </div>
                        <h2 className="font-display text-primary-foreground text-2xl tracking-tight md:text-3xl">
                          {entry.title}
                        </h2>
                        <p className="text-primary-foreground/50 mt-2 max-w-lg text-sm leading-relaxed">
                          {entry.description}
                        </p>
                      </motion.div>
                    );
                  }

                  return (
                    <motion.div
                      key={entry.version}
                      data-entry
                      className="border-accent/20 hover:border-accent/60 border-l-2 py-1 pl-6 transition-[border-color,opacity] duration-300 group-hover/changelog:opacity-60 hover:!opacity-100"
                      variants={fadeUp}
                    >
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <Badge variant="amber" size="sm">
                          v{entry.version}
                        </Badge>
                        <span className="text-muted-foreground font-mono text-xs">
                          {formatDate(entry.date)}
                        </span>
                      </div>
                      <h2 className="font-display text-xl tracking-tight md:text-2xl">
                        {entry.title}
                      </h2>
                      <p className="text-muted-foreground mt-2 max-w-lg text-sm leading-relaxed">
                        {entry.description}
                      </p>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          ))}

          <motion.div
            className="py-10 text-center md:py-12"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
          >
            <Button asChild size="lg">
              <Link href="/login">Start writing free</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
