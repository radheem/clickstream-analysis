'use client';

import { motion } from 'motion/react';

import { REVEAL_STAGGER, TextReveal } from '@/components/elements/text-reveal';
import { Button } from '@/components/ui/button';
import { NumberTicker } from '@/components/ui/number-ticker';

const MILESTONES = [
  {
    number: '01',
    title: 'The first blank page',
    description:
      'Kinto launched in a small beta with 200 writers and a single conviction: that the best journaling app is the one that gets out of your way. No onboarding. No tutorials. Just a cursor, blinking.',
  },
  {
    number: '02',
    title: 'One million entries',
    description:
      'Fourteen months after launch, the millionth entry was written at 3:47 a.m. by a nurse finishing a night shift in Melbourne. We didn\u2019t know her name \u2014 by design \u2014 but the milestone reminded us why encryption comes first.',
  },
  {
    number: '03',
    title: 'Writers in 40+ countries',
    description:
      'What started as a small English-language tool now supports journaling in 12 languages across six continents. The most active writing hour shifts around the clock \u2014 somewhere in the world, someone is always mid-sentence.',
  },
] as const;

const STATS = [
  { number: '12,000+', label: 'Writers journaling daily' },
  { number: '2.3M', label: 'Entries written to date' },
  { number: '89%', label: 'Journaling consistency rate' },
  { number: '4.8', label: 'Average mood improvement' },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

export function Stats() {
  return (
    <section className="section-padding">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ hidden: {}, visible: {} }}
        >
          <motion.div
            className="mb-12 md:mb-20"
            variants={{
              hidden: {},
              visible: {},
            }}
          >
            <TextReveal mode="animate">
              <h2 className="text-4xl leading-none tracking-tighter md:text-5xl lg:text-6xl">
                The story so far
              </h2>
            </TextReveal>
            <TextReveal mode="animate" delay={REVEAL_STAGGER} className="mt-4">
              <p className="text-muted-foreground max-w-lg text-lg leading-relaxed">
                A community of writers finding clarity, one entry at a time.
              </p>
            </TextReveal>
          </motion.div>

          <motion.div
            className="grid gap-16 md:grid-cols-12"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.2, delayChildren: 0.4 },
              },
            }}
          >
            {/* Left — Stats column */}
            <motion.div
              className="md:col-span-5"
              variants={{
                hidden: { opacity: 0, y: 32, filter: 'blur(4px)' },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                  transition: { duration: 0.7, ease },
                },
              }}
            >
              {/* Hero stat */}
              <motion.div
                className="mb-12"
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <span className="font-display text-accent text-7xl leading-none tracking-tighter md:text-8xl lg:text-[10rem]">
                  <NumberTicker
                    startValue={10000}
                    value={12000}
                    className="tracking-inherit text-inherit"
                  />
                  +
                </span>
                <span className="text-muted-foreground mt-2 block font-mono text-sm tracking-wider uppercase">
                  {STATS[0].label}
                </span>
              </motion.div>

              {/* Secondary stats */}
              <div className="grid grid-cols-3 gap-6 border-t border-dashed pt-8">
                {STATS.slice(1).map((stat) => (
                  <div key={stat.label} className="group/stat">
                    <div className="transition-transform duration-300 group-hover/stat:-translate-y-1">
                      <span className="font-display text-3xl leading-none tracking-tight md:text-4xl">
                        {stat.number}
                      </span>
                      <span className="text-muted-foreground mt-1 block font-mono text-xs tracking-wider uppercase">
                        {stat.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Editorial aside */}
              <motion.div
                className="bg-accent/5 mt-10 rounded-xl p-6"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <p className="font-display text-base leading-snug tracking-tight md:text-lg">
                  Every number here began as a blank page and the courage to
                  write the first word.
                </p>
                <Button variant="brand" size="sm" className="mt-4">
                  Start your story
                </Button>
              </motion.div>
            </motion.div>

            {/* Right — Milestones column */}
            <motion.div
              className="space-y-12 md:col-span-6 md:col-start-7 md:border-l md:border-dashed md:pl-12"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              {MILESTONES.map((milestone, i) => (
                <motion.div
                  key={milestone.number}
                  className="group"
                  variants={{
                    hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
                    visible: {
                      opacity: 1,
                      y: 0,
                      filter: 'blur(0px)',
                      transition: { duration: 0.5, ease },
                    },
                  }}
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-accent text-3xl leading-none tracking-tight transition-transform duration-300 group-hover:scale-110 md:text-4xl">
                      {milestone.number}
                    </span>
                    <h3 className="group-hover:text-accent text-xl leading-snug tracking-tight transition-colors duration-300 md:text-2xl">
                      {milestone.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground group-hover:text-foreground/70 mt-3 text-sm leading-relaxed transition-colors duration-300">
                    {milestone.description}
                  </p>
                  {i < MILESTONES.length - 1 && (
                    <div className="bg-accent/30 group-hover:bg-accent/60 mt-12 h-px w-12 transition-[width,background-color] duration-300 group-hover:w-20" />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
